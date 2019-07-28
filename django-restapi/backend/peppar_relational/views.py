from django.shortcuts import render
from rest_framework import viewsets         

from .serializers import RelationSerializer
from .models import Relation                 

class RelationView(viewsets.ModelViewSet):
    #NB! For testing purposes!
    permission_classes = ()       
    
    serializer_class = RelationSerializer          
    queryset = Relation.objects.all()              
    lookup_field = 'uuid'
