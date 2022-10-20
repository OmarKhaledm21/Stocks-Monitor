from django.urls import path, include

from .views import fetch_news
urlpatterns = [
    path('', fetch_news, name='news'),
]
