from rest_framework import viewsets         

from .serializers import CoreTypeSerializer, CategorySerializer, CoreRelationTypeSerializer, DefaultSchemeSerializer
from .models import CoreType, Category, CoreRelationType, DefaultScheme

class CoreTypeView(viewsets.ReadOnlyModelViewSet):
    serializer_class = CoreTypeSerializer          
    queryset = CoreType.objects.all()              

class CoreRelationTypeView(viewsets.ReadOnlyModelViewSet):
    serializer_class = CoreRelationTypeSerializer          
    queryset = CoreRelationType.objects.all()              

class CategoryView(viewsets.ReadOnlyModelViewSet):
    serializer_class = CategorySerializer          
    queryset = Category.objects.all()              

class DefaultSchemeView(viewsets.ReadOnlyModelViewSet):
    serializer_class = DefaultSchemeSerializer   
    queryset = DefaultScheme.objects.all()              
