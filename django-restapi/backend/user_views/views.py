from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import generics
from django.shortcuts import get_object_or_404


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

class Me(generics.RetrieveAPIView):
    serializer_class = PepparAsUserSerializer                     
    
    def get_object(self):
        user = self.request.user
        return get_object_or_404(PepparAsUser, user=user, level='0')

class MyRelations(generics.ListAPIView):
    serializer_class = PepparRelationAsUserSerializer                     
    lookup_field = 'uuid_field'

    def get_queryset(self):
        user = self.request.user
        return PepparRelationAsUser.objects.filter(user=user, level='0')


class InnerCircle(generics.ListAPIView):
    serializer_class = PepparAsUserSerializer                     
    lookup_field = 'uuid_field'
    
    def get_queryset(self):
        user = self.request.user
        return PepparAsUser.objects.filter(user=user, level='1')

class InnerCircleRelations(generics.ListAPIView):
    serializer_class = PepparRelationAsUserSerializer                     
    lookup_field = 'uuid_field'

    def get_queryset(self):
        user = self.request.user
        return PepparRelationAsUser.objects.filter(user=user, level='1')


# Create your views here.
