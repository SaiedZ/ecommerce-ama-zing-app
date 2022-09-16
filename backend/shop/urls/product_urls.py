from django.urls import path
from shop.views import product_views

urlpatterns = [
    path('', product_views.get_products, name="products"),
    path('create/', product_views.createProduct, name="product-create"),
    path('update/<str:pk>/',
         product_views.updateProduct,
         name="product-update"),
    path('delete/<str:pk>/',
         product_views.deleteProduct,
         name="product-delete"),
    path('<str:pk>/', product_views.get_product, name="product"),
]
