from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import status 
from rest_framework.response import Response
from django.contrib.auth import authenticate

from .serializers import UserSerializer      

#Create_user endpoint. Will only create
class UserCreate(generics.CreateAPIView):
    permission_classes = ()
    authentication_classes = ()
    
    serializer_class = UserSerializer

#User_login endpoint.
class UserLoginView(APIView):
    permission_classes = ()

    def post(self, request,):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user:
            return Response({"token": user.auth_token.key})
        else:
            print("Running wrong credentials")
            return Response({"error": "Wrong Credentials"}, status=status.HTTP_400_BAD_REQUEST)
