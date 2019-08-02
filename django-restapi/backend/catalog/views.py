from rest_framework import viewsets         

from .serializers import PepparTypeSerializer, RelationTypeSerializer
from .models import PepparType, RelationType

class PepparTypeView(viewsets.ModelViewSet):
    
    serializer_class = PepparTypeSerializer          
    queryset = PepparType.objects.all()              

class RelationTypeView(viewsets.ModelViewSet):
    
    serializer_class = RelationTypeSerializer          
    queryset = RelationType.objects.all()              
