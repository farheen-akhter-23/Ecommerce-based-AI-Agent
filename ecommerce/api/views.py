from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product, UserInteraction
from .serializers import ProductSerializer, InteractionSerializer

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
    serializer = InteractionSerializer(data=request.data)
    if serializer.is_valid():
        # save interaction to database
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .recommendations import recommend_products
from django.contrib.auth.models import User


def recommend_products_view(request):
    # Get the username and role from query parameters
    username = request.GET.get('username', 'admin')  # Default to 'admin' if no username is provided
    role = request.GET.get('role', 'customer')  # Default to 'customer' if no role is provided

    # Ensure the user exists
    user = get_object_or_404(User, username=username)

    # Get recommendations based on the user's role
    recommendations = recommend_products(username, role)

    # Format the response
    recommended_products = [
        {
            "name": product.name,
            "price": float(product.price),
            "category": product.category,
            "image_url": request.build_absolute_uri(product.image.url)  # Add image URL
        }
        for product in recommendations
    ]

    return JsonResponse({"recommendations": recommended_products})