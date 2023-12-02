# chat/consumers.py
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import ChatMessage
from users.models import User
from doctors.models import Doctorinfo
from channels.db import database_sync_to_async

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.sender_id = self.scope['url_route']['kwargs']['sender_id']
        self.receiver_id = self.scope['url_route']['kwargs']['receiver_id']

        await self.channel_layer.group_add(
            f'chat_{self.sender_id}_{self.receiver_id}',
            self.channel_name
        )

        await self.accept()
    

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            f'chat_{self.sender_id}_{self.receiver_id}',
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']

        await self.save_message(message)

        await self.channel_layer.group_send(
            f'chat_{self.sender_id}_{self.receiver_id}',
            {
                'type': 'chat.message',
                'message': message,
            }
        )

    async def chat_message(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'message': message,
        }))
    
    @database_sync_to_async
    def get_user_instance(self, id):
        try:
            user = User.objects.get(id=id)
            return user
        except User.DoesNotExist:
            print("no userrrrrrrrr")
            
    @database_sync_to_async
    def get_doctor_instance(self, doctor_id):
        try:
            doctor = Doctorinfo.objects.get(id=doctor_id)
            return doctor
        except Doctorinfo.DoesNotExist:
            print("failed to find the doctor")
    async def save_message(self, message):
        sender = await self.get_user_instance(self.sender_id)
        receiver = await self.get_doctor_instance(self.receiver_id)

        await self.save_message_to_db(sender, receiver, message)

    @database_sync_to_async
    def save_message_to_db(self, sender, receiver, message):
        ChatMessage.objects.create(
            sender=sender,
            receiver=receiver,
            message=message
        )
