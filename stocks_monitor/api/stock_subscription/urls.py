from django.urls import path, include

from .views import ManageUserStock
urlpatterns = [
    path('manage-stock/', ManageUserStock.as_view(), name='manage-stock')
]
