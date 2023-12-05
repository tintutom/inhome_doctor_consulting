from channels.routing import ProtocolTypeRouter, URLRouter
from chat.routing import websocket_urlpatterns

application = ProtocolTypeRouter(
    {
        "websocket": URLRouter(websocket_urlpatterns),
      
    }
)


# from channels.routing import ProtocolTypeRouter, URLRouter
# from channels.auth import AuthMiddlewareStack
# from django.urls import path
# from chat.routing import websocket_urlpatterns

# application = ProtocolTypeRouter(
#     {
#         "websocket": AuthMiddlewareStack(
#             URLRouter(
#                 websocket_urlpatterns
#             )
#         ),
#     }
# )
