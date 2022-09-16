from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated, IsAdminUser

from shop.models import Product
from shop.serializers import ProductSerializer


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


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):

    product = Product.objects.get(_id=pk)
    product.delete()
    return ('Product Deleted')
