from rest_framework import viewsets         

from .serializers import CoreTypeSerializer, CategorySerializer, CoreRelationTypeSerializer, DefaultSchemeSerializer
from .models import CoreType, Category, CoreRelationType, DefaultScheme

class CoreTypeView(viewsets.ModelViewSet):
    serializer_class = CoreTypeSerializer          
    queryset = CoreType.objects.all()              

class CoreRelationTypeView(viewsets.ModelViewSet):
    serializer_class = CoreRelationTypeSerializer          
    queryset = CoreRelationType.objects.all()              

class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer          
    queryset = Category.objects.all()              

class DefaultSchemeView(viewsets.ModelViewSet):
    serializer_class = DefaultSchemeSerializer   
    queryset = DefaultScheme.objects.all()              
