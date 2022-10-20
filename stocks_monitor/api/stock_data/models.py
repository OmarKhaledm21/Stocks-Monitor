from django.db import models

# Create your models here.


class StockData(models.Model):
    currency = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    symbol = models.CharField(max_length=100)
