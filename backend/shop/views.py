from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product

from .serializers import ProductSerializer


@api_view(['GET'])
def get_routes(request):

    routes = [
        'api/products/',
        'api/products/create/',

        'api/products/<id>/reviews/',

        'api/products/top',
        'api/products/<id>/',

        'api/products/delete/<id>',
        'api/products/<update>/<id>',
    ]

    return Response(routes)


@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serialized_products = ProductSerializer(products, many=True)
    return Response(serialized_products.data)


@api_view(['GET'])
def get_product(request, pk):
    # product = next(
    #     (prod for prod in products if prod['_id'] == pk),
    #     None
    # )

    product = Product.objects.get(_id=pk)
    serialized_product = ProductSerializer(product)
    return Response(serialized_product.data)
