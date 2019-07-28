from django.shortcuts import render
from rest_framework import viewsets         

from .serializers import PepparRelationSerializer
from .models import PepparRelation                 

class PepparRelationView(viewsets.ModelViewSet):
    #NB! For testing purposes!
    permission_classes = ()       
    
    serializer_class = PepparRelationSerializer          
    queryset = PepparRelation.objects.all()              
    lookup_field = 'uuid'
