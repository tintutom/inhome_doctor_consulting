from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from users.models import User
from doctors.models import Doctorinfo
from .serializers import MessageSerializer
from users.serializers import User_Serializer
from .models import ChatMessage
from django.shortcuts import render
from django.http import JsonResponse
from django.db.models import Subquery,OuterRef,Q

# Create your views here.
from rest_framework import generics
from django.db.models import Q, OuterRef, Subquery
from .models import ChatMessage
from .serializers import MessageSerializer

class MyInbox(generics.ListAPIView):
    serializer_class =MessageSerializer
    
    def get_queryset(self):
        user_id=self.kwargs['id']
        
        messages=ChatMessage.objects.filter(
            id__in=Subquery(
                User.objects.filter(
                    Q(sender__reciever=user_id)|
                    Q(reciever__sender=user_id)
                ).distinct().annotate(
                    last_msg=Subquery(
                        ChatMessage.objects.filter(
                            Q(sender=OuterRef('id'),reciever=user_id)|
                            Q(reciever=OuterRef('id'),sender=user_id)
                        ).order_by('-id')[:1].values_list('id',flat=True)
                    )
                ).values_list('last_msg',flat=True).order_by('-id')
            )
        ).order_by('-id')
        
        return messages
class GetMessages(generics.ListAPIView):
    serializer_class=MessageSerializer
    
    def get_queryset(self):
        sender_id=self.kwargs['sender_id']
        reciever_id=self.kwargs['reciever_id']
        
        messages=ChatMessage.objects.filter(
            sender__in=[sender_id,reciever_id],
            reciever__in=[sender_id,reciever_id]
        )
        
        return messages
    
class SendMessage(generics.CreateAPIView):
    serializer_class = MessageSerializer
    
class ProfileDetails(generics.RetrieveUpdateAPIView):
    serializer_class=User_Serializer
    queryset=User.objects.all()
    

class SearchUser(generics.ListAPIView):
    serializer_class=User_Serializer
    queryset=User.objects.all()
    
    def list(self, request, *args, **kwargs):
        username=self.kwargs['username']
        logged_in_user=self.request.user
        users=User.objects.filter(
            Q(name__icontains=username)|
            Q(email__icontains=username)|
            Q(userimage__icontains=username)
        )
        
        if not users.exists():
            return Response(
                {"details":"No users founds"},
                status=status.HTTP_404_NOT_FOUND
            )
    
        serializer=self.get_serializer(users,many=True)
        return Response(serializer.data)

