from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from rest_framework.permissions import IsAdminUser, IsAuthenticated

from shop.models import Product, Review
from shop.serializers import ProductSerializer

from rest_framework import status


@api_view(['GET'])
def get_products(request):
    query = request.query_params.get('keyword', '')

    products = Product.objects.filter(name__icontains=query)

    page = request.query_params.get('page', 1)
    paginator = Paginator(products, 5)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    serialized_products = ProductSerializer(products, many=True)

    return Response({
        'products': serialized_products.data,
        'page': page,
        'pages': paginator.num_pages
        })


@api_view(['GET'])
def get_product(request, pk):
    # product = next(
    #     (prod for prod in products if prod['_id'] == pk),
    #     None
    # )

    product = Product.objects.get(_id=pk)
    serialized_product = ProductSerializer(product)
    return Response(serialized_product.data)


@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


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

    Product.objects.filter(_id=pk).update(
        name=data['name'],
        price=data['price'],
        brand=data['brand'],
        countInStock=data['countInStock'],
        category=data['category'],
        description=data['description']
    )
    product = Product.objects.get(_id=pk)
    serialized_product = ProductSerializer(product)
    return Response(serialized_product.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):

    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product Deleted')


@api_view(['POST'])
@permission_classes([IsAdminUser])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()

    return Response('Image was uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    # 1 - Review already exists
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - No Rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = sum(review.rating for review in reviews)

        product.rating = total / len(reviews)
        product.save()

        return Response('Review Added')
