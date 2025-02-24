from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.product_list, name='product_list'),
    path('product/', views.product_detail, name='product_detail'),
    path('interaction/', views.interaction, name='interaction'),
]

