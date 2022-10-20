from pyexpat import model
from rest_framework import serializers

from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth import get_user_model
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'username',
                  'password', 'phone', 'gender', 'token', 'image']
        read_only_fields = ['token']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        UserModel = get_user_model()

        user = UserModel(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            username=validated_data['username'],
            phone=validated_data['phone'],
            gender=validated_data['gender'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        instance.first_name = validated_data['first_name']
        instance.last_name = validated_data['last_name']
        instance.email = validated_data['email']

        password = (validated_data.get('password'))

        if password == '' or password == 'undefined':
            pass
        else:
            if not instance.check_password(password):
                instance.set_password(password)
        instance.username = validated_data['username']
        instance.phone = validated_data['phone']
        instance.gender = validated_data['gender']
        instance.save()
        return instance
