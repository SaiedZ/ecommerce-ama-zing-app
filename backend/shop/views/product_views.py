from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from rest_framework.permissions import IsAdminUser

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


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    product = Product.objects.create(
        user=request.user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        countInStock=0,
        category='Sample Category',
        description=''
    )
    serialized_product = ProductSerializer(product)
    return Response(serialized_product.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):

    data = request.data

    product = Product.objects.get(_id=pk)
    product.update(
        name=data['name'],
        price=data['price'],
        brand=data['brand'],
        countInStock=data['countInStock'],
        category=data['category'],
        description=data['description']
    )
    serialized_product = ProductSerializer(product)
    return Response(serialized_product.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):

    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product Deleted')
