from django.shortcuts import render
from rest_framework import viewsets         

from .serializers import RelationSerializer
from .models import Relation                 

#For testing purposes. Gives whole database    
class RelationView(viewsets.ModelViewSet):

    serializer_class = RelationSerializer          
    queryset = Relation.objects.all()              
    lookup_field = 'uuid'
