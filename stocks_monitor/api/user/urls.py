from rest_framework import routers
from django.urls import path, include
from . import views
from django.conf import settings
from django.conf.urls.static import static
router = routers.DefaultRouter()

#router.register(r'user_data', views.UserViewSet, basename='user_data')

urlpatterns = [
    path('user-data/', views.UserDataView.as_view(), name='user-data'),
    path("signup/", views.SignUp.as_view(), name="signup"),
    path("signin/", views.SignIn.as_view(), name='signin'),
    path("signout/", views.Signout.as_view(), name="signout"),
    path('', include(router.urls))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
