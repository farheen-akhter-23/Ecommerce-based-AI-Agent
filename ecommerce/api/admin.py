

# Register your models here.
from .models import Product, UserInteraction

from django.contrib import admin


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'category')  # Fields to display in the list view
    fields = ('name', 'image', 'price', 'category')  # Fields to include in the add/edit form

admin.site.register(Product, ProductAdmin)
admin.site.register(UserInteraction)
