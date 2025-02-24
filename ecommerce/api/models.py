from django.db import models
from django.utils import timezone

# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(default="No description available")  
    image = models.ImageField(upload_to='products/')  # Use ImageField
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=255)

    def __str__(self):
        return self.name
class UserInteraction(models.Model):
    user_id = models.CharField(max_length=50)
    product_id = models.IntegerField()
    scroll_length = models.IntegerField(default=0)
    dwell_time = models.FloatField()
    is_clicked = models.BooleanField(default=False)
    timestamp = models.DateTimeField(default=timezone.now)  # Timestamp of the interaction
    def __str__(self):
        return f"User {self.user_id} - Product {self.product_id}"
