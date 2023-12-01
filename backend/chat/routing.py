# your_app/routing.py

from channels.routing import ProtocolTypeRouter, URLRouter
from channels_socketio import SocketRouter
from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<room_name>\w+)/$', consumers.ChatConsumer.as_asgi()),
]

application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter(
            SocketRouter(websocket_urlpatterns)
        )
    ),
})
