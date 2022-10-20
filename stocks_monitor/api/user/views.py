import random
import json

from django.http import JsonResponse

from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth import get_user_model, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import requires_csrf_token, ensure_csrf_cookie
from django.utils.decorators import method_decorator


from django.shortcuts import get_object_or_404, redirect, reverse

from django.views.generic import View

from rest_framework.decorators import api_view, permission_classes, renderer_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserSerializer
# Create your views here.


def generate_session_token(length=20):
    return ''.join(random.SystemRandom().choice([chr(i) for i in range(97, 123)] + [str(i) for i in range(10)]) for _ in range(length))


@method_decorator(csrf_exempt, name='dispatch')
class UserDataView(View):
    def get(self, request):
        UserModel = get_user_model()
        # TODO QUERY PARAMS CHECK TOKEN
        token = request.GET['token']

        try:
            user = UserModel.objects.get(token=token)
        except UserModel.DoesNotExist:
            return JsonResponse({'error': 'Invalid token, please re-login', 'code': '0'})

        user_serializer = UserSerializer(user)
        
        if user.token != token:
            return JsonResponse({'error': 'Invalid token, please re-login', 'code': '0'})

        return JsonResponse({'user': user_serializer.data, 'code': '1'})

    def post(self, request):
        # QUERY PARAMS CHECK TOKEN
        token = request.GET['token']

        # Getting the user to update his data
        UserModel = get_user_model()
        user = UserModel.objects.get(token=token)
        errors = []

        if user.token != token:
            return JsonResponse({'error': 'Invalid token, please re-login'})

        # Check FORM data for updating user
        old_password = str(request.POST['old_password'])
        new_email = request.POST['email']
        new_username = request.POST['username']

        try:
            image = request.FILES["image"]
            user.image = image
        except:
            print("NO IMAGE")

        # Data Checks
        print(old_password)
        if old_password == '' or old_password == 'undefined':
            pass
        else:
            if not user.check_password(old_password):
                errors.append('Wrong password')

        if user.email != new_email and UserModel.objects.filter(email=new_email).exists():
            errors.append('Email already exists!')

        if user.username != new_username and UserModel.objects.filter(username=new_username).exists():
            errors.append('Username already exists')

        print(errors)
        data = {
            'first_name': request.POST['first_name'],
            'last_name': request.POST['last_name'],
            'email': request.POST['email'],
            'password': request.POST['password'],
            'gender': request.POST['gender'],
            'phone': request.POST['phone'],
            'username': request.POST['username'],
        }
        print(data)
        # Response
        if len(errors) == 0:
            serializer = UserSerializer(instance=user, data=data)
            print(serializer.initial_data)
            print(serializer.is_valid())
            if serializer.is_valid():
                user = serializer.save()
            return redirect(reverse('user-data')+f'?token={token}')
        return JsonResponse({'errors': errors, 'code': '0'})


@method_decorator(csrf_exempt, name='dispatch')
class SignUp(View):
    def post(self, request):
        data = {
            'first_name': request.POST['first_name'],
            'last_name': request.POST['last_name'],
            'email': request.POST['email'],
            'password': request.POST['password'],
            'gender': request.POST['gender'],
            'phone': request.POST['phone'],
            'username': request.POST['username'],
        }

        serializer = UserSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'message': ['Successful Registration'], 'code': '1'})
        else:
            return JsonResponse({'errors': serializer.errors}, 'code', '0')


class SignIn(APIView):
    def post(self, request):
        username = request.POST['username']
        password = request.POST['password']
        print(username, password)
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(username=username)
        except UserModel.DoesNotExist:
            return JsonResponse({'error': "Username doesn't exists!", 'code': '0'})

        if not user.check_password(password):
            return JsonResponse({'error': 'Wrong password!', 'code': '0'})

        pk = user.pk
        if user.token != '0':
            user.token = '0'
            user.save()
            return JsonResponse({'error': 'Previous token exists!', 'code': '0'})
        elif user.token == '0':
            token = generate_session_token()
            user.token = token
            user.save()
            login(request, user)
            return JsonResponse({'token': token, 'code': '1'})
            # return redirect(reverse('user-data')+f'?pk={pk}&token={token}')


@method_decorator(csrf_exempt, name='dispatch')
class Signout(View):
    def post(self, request):
        UserModel = get_user_model()
        token = request.POST['token']
        user = UserModel.objects.get(token=token)
        request.user = user
        if token == user.token:
            user.token = '0'
            user.save()
            logout(request)

            return JsonResponse({'message': 'logged out', 'code': '1'})
        return JsonResponse({'error': 'Invalid token, please re-login', 'code': '0'})
