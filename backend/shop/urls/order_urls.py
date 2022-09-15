from django.urls import path
from shop.views import order_views

urlpatterns = [
    path('add/', order_views.addOrderItems, name='orders_add'),
]
