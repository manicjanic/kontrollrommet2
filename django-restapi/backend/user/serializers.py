from rest_framework import serializers

from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from peppar_base.serializers import PepparSerializer
from .models import UserPeppar

class UserPepparSerializer(serializers.ModelSerializer):
    peppar = PepparSerializer(read_only=True)
    class Meta:
        model = UserPeppar
        fields = ('peppar', 'level',)
        read_only_fields = ('uuid_field',)
        lookup_field = 'uuid_field'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid_field'}
        }

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'], 
            username=validated_data['username']
            )
        user.set_password(validated_data['password'])
        user.save()
        Token.objects.create(user=user)
        return user