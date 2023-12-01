from rest_framework import serializers
from .models import ChatMessage
from users.serializers import User_Serializer
from doctors.serializers import DoctorinfoSerializer
from users.models import User

class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [ 'id',  'name',  'email', 'userimage' ]
    
    def __init__(self, *args, **kwargs):
        super(ProfileSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        if request and request.method=='POST':
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3
            
class MessageSerializer(serializers.ModelSerializer):
    sender_profile = User_Serializer(read_only=True)
    reciever_profile = User_Serializer(read_only=True)

    class Meta:
        model = ChatMessage
        fields = ['id', 'sender','sender_profile', 'reciever',  'reciever_profile', 'message', 'is_read', 'date']

    def __init__(self, *args, **kwargs):
        super(MessageSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        if request and request.method=='POST':
            self.Meta.depth = 0
        else:
            self.Meta.depth = 2

# class MessageSerializer(serializers.ModelSerializer):
#     sender_profile = User_Serializer(read_only=True)
#     reciever_profile = DoctorinfoSerializer(read_only=True)

#     class Meta:
#         model = ChatMessage
#         fields = ['id', 'doctor_id', 'user', 'doctor', 'sender', 'reciever', 'is_read', 'message', 'date', 'sender_profile', 'reciever_profile']
