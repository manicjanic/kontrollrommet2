from rest_framework import viewsets         

from .serializers import PACOVTypeSerializer, RelationTypeSerializer
from .models import PACOVType, RelationType

class PACOVTypeView(viewsets.ModelViewSet):
    
    serializer_class = PACOVTypeSerializer          
    queryset = PACOVType.objects.all()              

class RelationTypeView(viewsets.ModelViewSet):
    
    serializer_class = RelationTypeSerializer          
    queryset = RelationType.objects.all()              
