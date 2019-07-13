from django.shortcuts import render
from rest_framework import viewsets         

from .serializers import PepparSerializer
from .models import Peppar                 

class PepparView(viewsets.ModelViewSet):
    permission_classes = ()       
    
    serializer_class = PepparSerializer          
    queryset = Peppar.objects.all()              
    lookup_field = 'uuid_field'
