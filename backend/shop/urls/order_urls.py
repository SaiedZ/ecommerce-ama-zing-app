from django.urls import path
from shop.views import order_views

urlpatterns = [
    path('add/', order_views.addOrderItems, name='orders_add'),
    path('myorders/', order_views.getMyOrders, name='myorders'),
    path('<str:pk>/', order_views.getOrderById, name='user_order'),
    path('<str:pk>/pay/', order_views.updateOrderToPaid, name='pay'),
]
