from rest_framework import viewsets         

from .serializers import CoreTypeSerializer, CategorySerializer, CoreRelationTypeSerializer, SchemaSerializer
from .models import CoreType, Category, CoreRelationType, Schema

class CoreTypeView(viewsets.ReadOnlyModelViewSet):
    serializer_class = CoreTypeSerializer          
    queryset = CoreType.objects.all()              

class CoreRelationTypeView(viewsets.ReadOnlyModelViewSet):
    serializer_class = CoreRelationTypeSerializer          
    queryset = CoreRelationType.objects.all()              

class CategoryView(viewsets.ReadOnlyModelViewSet):
    serializer_class = CategorySerializer          
    queryset = Category.objects.all()              

class SchemaView(viewsets.ReadOnlyModelViewSet):
    serializer_class = SchemaSerializer   
    queryset = Schema.objects.all()              
