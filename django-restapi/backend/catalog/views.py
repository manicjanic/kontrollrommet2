from rest_framework import viewsets         

from .serializers import PACOVTypeSerializer, PACOVSubTypeSerializer, RelationTypeSerializer, RelationSubTypeSerializer
from .models import PACOVType, PACOVSubType, RelationType, RelationSubType

class PACOVTypeView(viewsets.ModelViewSet):
    serializer_class = PACOVTypeSerializer          
    queryset = PACOVType.objects.all()              

class RelationTypeView(viewsets.ModelViewSet):
    serializer_class = RelationTypeSerializer          
    queryset = RelationType.objects.all()              

class PACOVSubTypeView(viewsets.ModelViewSet):
    serializer_class = PACOVSubTypeSerializer          
    queryset = PACOVSubType.objects.all()              

class RelationSubTypeView(viewsets.ModelViewSet):
    serializer_class = RelationSubTypeSerializer          
    queryset = RelationSubType.objects.all()              
