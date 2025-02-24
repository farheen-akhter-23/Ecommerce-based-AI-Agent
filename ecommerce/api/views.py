from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product, UserInteraction
from .serializers import ProductSerializer, UserInteractionSerializer

@api_view(['GET'])
def product_list(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def product_detail(request):
    try:
        product = Product.objects.get(id=request.data.get('id'))
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ProductSerializer(product)
    return Response(serializer.data)

@api_view(['POST'])
def interaction(request):
    serializer = UserInteractionSerializer(data=request.data)
    if serializer.is_valid():
        # save interaction to database
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)