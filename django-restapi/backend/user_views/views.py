from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import generics
from django.shortcuts import get_object_or_404


from .serializers import PepparInsightSerializer
from .serializers import PepparRelationAsUserSerializer
from .models import PepparInsight                 
from .models import PepparRelationAsUser                 


class PepparInsightView(viewsets.ModelViewSet):       
    serializer_class = PepparInsightSerializer                     
    lookup_field = 'uuid'

    def get_queryset(self):
        user = self.request.user
        return PepparInsight.objects.filter(user=user)

class PepparRelationAsUserView(viewsets.ModelViewSet):       
    serializer_class = PepparRelationAsUserSerializer                     
    lookup_field = 'uuid'

    def get_queryset(self):
        user = self.request.user
        return PepparRelationAsUser.objects.filter(user=user)

class Me(generics.RetrieveAPIView):
    serializer_class = PepparInsightSerializer                     
    
    def get_object(self):
        user = self.request.user
        return get_object_or_404(PepparInsight, user=user, level='0')

class MyRelations(generics.ListAPIView):
    serializer_class = PepparRelationAsUserSerializer                     
    lookup_field = 'uuid'

    def get_queryset(self):
        user = self.request.user
        return PepparRelationAsUser.objects.filter(user=user, level='0')


class InnerCircle(generics.ListAPIView):
    serializer_class = PepparInsightSerializer                     
    lookup_field = 'uuid'
    
    def get_queryset(self):
        user = self.request.user
        return PepparInsight.objects.filter(user=user, level='1')

class InnerCircleRelations(generics.ListAPIView):
    serializer_class = PepparRelationAsUserSerializer                     
    lookup_field = 'uuid'

    def get_queryset(self):
        user = self.request.user
        return PepparRelationAsUser.objects.filter(user=user, level='1')


# Create your views here.
