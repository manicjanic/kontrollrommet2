from rest_framework import viewsets         

from .serializers import CoreTypeSerializer, PACOVSubTypeSerializer, CoreRelationTypeSerializer, RelationSubTypeSerializer
from .models import CoreType, PACOVSubType, CoreRelationType, RelationSubType

class CoreTypeView(viewsets.ModelViewSet):
    serializer_class = CoreTypeSerializer          
    queryset = CoreType.objects.all()              

class CoreRelationTypeView(viewsets.ModelViewSet):
    serializer_class = CoreRelationTypeSerializer          
    queryset = CoreRelationType.objects.all()              

class PACOVSubTypeView(viewsets.ModelViewSet):
    serializer_class = PACOVSubTypeSerializer          
    queryset = PACOVSubType.objects.all()              

class RelationSubTypeView(viewsets.ModelViewSet):
    serializer_class = RelationSubTypeSerializer          
    queryset = RelationSubType.objects.all()              
