from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import status 
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

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
        is_tokened = Token.objects.filter(user=user).exists()
        if user and is_tokened:
            return Response({"username": username, "token": user.auth_token.key})
        else:
            if user and (not is_tokened):
                print("User has no Token")
                return Response("Found no Token", status.HTTP_401_UNAUTHORIZED)
            else:
                print("Wrong credentials")
                return Response({"errortext": "Wrong Credentials"}, status.HTTP_400_BAD_REQUEST)
