from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import generics
from rest_framework import status 
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate

from .serializers import UserSerializer      
from .serializers import UserPepparSerializer
from .models import UserPeppar                 

class UserPepparView(viewsets.ModelViewSet):       
    serializer_class = UserPepparSerializer                     
    lookup_field = 'uuid_field'

    def get_queryset(self):
        user = self.request.user
        return UserPeppar.objects.filter(user=user)

class UserCreate(generics.CreateAPIView):
    authentication_classes = ()
    permission_classes = ()
    serializer_class = UserSerializer

class UserLoginView(APIView):
    permission_classes = ()
    
    def post(self, request,):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user:
            return Response({"token": user.auth_token.key})
        else:
            return Response({"error": "Wrong Credentials"}, status=status.HTTP_400_BAD_REQUEST)
