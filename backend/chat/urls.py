# from django.urls import path
# from chat import views
# from chat.views import *

# urlpatterns = [
#     path('my-messages/<int:id>/', views.MyInbox.as_view(), name='user-inbox'),
#     # path('my-messages/<int:doctor_id>/', views.MyInbox.as_view(), name='doctor-inbox'),
#     path('get-messages/<int:sender_id>/<int:reciever_id>/', views.GetMessages.as_view(), name='get-messages'),
#     path('send-messages/', views.SendMessage.as_view(), name='send-messages'),
    
#     # Get/Filter data
#     path('profile/<int:pk>/', views.ProfileDetails.as_view(), name='send-messages'),
#     path('search/<username>/', views.SearchUser.as_view(), name='send-messages'),

# ]

# chat/urls.py
# from django.urls import path
# from .views import websocket_url

# urlpatterns = [
#     path('websocket-url/<int:sender_id>/<int:receiver_id>/', websocket_url, name='websocket_url'),
#     # Add other URL patterns as needed.
# ]
