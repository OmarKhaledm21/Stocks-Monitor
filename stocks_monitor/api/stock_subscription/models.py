from django.db import models
from api.user.models import User
from api.stock_data.models import StockData
# Create your models here.


class UserStocks(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stock = models.ForeignKey(StockData, on_delete=models.CASCADE)
