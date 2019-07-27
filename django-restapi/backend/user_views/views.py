from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import generics


from .serializers import PepparAsUserSerializer
from .serializers import PepparRelationAsUserSerializer
from .models import PepparAsUser                 
from .models import PepparRelationAsUser                 


class PepparAsUserView(viewsets.ModelViewSet):       
    serializer_class = PepparAsUserSerializer                     
    lookup_field = 'uuid_field'

    def get_queryset(self):
        user = self.request.user
        return PepparAsUser.objects.filter(user=user)

class PepparRelationAsUserView(viewsets.ModelViewSet):       
    serializer_class = PepparRelationAsUserSerializer                     
    lookup_field = 'uuid_field'

    def get_queryset(self):
        user = self.request.user
        return PepparRelationAsUser.objects.filter(user=user)

class UserMe(generics.RetrieveAPIView):
    serializer_class = PepparAsUserSerializer                     
    
    def get_queryset(self):
        user = self.request.user
        return PepparAsUser.objects.filter(user=user, level='0')


# Create your views here.
