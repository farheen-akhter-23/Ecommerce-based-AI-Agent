from django.urls import path
from . import views
from django.contrib import admin

urlpatterns = [
    path('products/', views.product_list, name='product_list'),
    path('product/', views.product_detail, name='product_detail'),
    path('interaction/', views.interaction, name='interaction'),
    path('recommend/', views.recommend_products_view, name='recommend_products'),
    path('admin/api/recommend/', views.recommend_products_view, name='recommend_products'),  # Custom admin API URL
       # Admin URLs
    path('admin/', admin.site.urls),
]

