from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('user/', include('api.user.urls')),
    path('news/', include('api.news.urls')),
    path('stock_data/', include('api.stock_subscription.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
