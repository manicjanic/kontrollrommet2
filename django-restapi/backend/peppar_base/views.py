from django.shortcuts import render
from rest_framework import viewsets         

from .serializers import PersonSerializer, EntitySerializer, PropertySerializer, PlanSerializer, ActionSerializer, ResultSerializer
from .models import Person, Entity, Property, Plan, Action, Result                    

class PersonView(viewsets.ModelViewSet):       
    serializer_class = PersonSerializer          
    queryset = Person.objects.all()              
    lookup_field = 'uuid_field'

class EntityView(viewsets.ModelViewSet):       
    serializer_class = EntitySerializer          
    queryset = Entity.objects.all()              
    lookup_field = 'uuid_field'

class PropertyView(viewsets.ModelViewSet):       
    serializer_class = PropertySerializer          
    queryset = Property.objects.all()              
    lookup_field = 'uuid_field'

class PlanView(viewsets.ModelViewSet):       
    serializer_class = PlanSerializer          
    queryset = Plan.objects.all()              
    lookup_field = 'uuid_field'

class ActionView(viewsets.ModelViewSet):       
    serializer_class = ActionSerializer          
    queryset = Action.objects.all()              
    lookup_field = 'uuid_field'

class ResultView(viewsets.ModelViewSet):       
    serializer_class = ResultSerializer          
    queryset = Result.objects.all()              
    lookup_field = 'uuid_field'
