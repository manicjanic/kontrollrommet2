from rest_framework import generics
from rest_framework.response import Response
from django.http import Http404
from rest_framework import status

from pacovbase.serializers import PACOVSerializer, RelationSerializer
from .register_serializers import RegisterPacovSerializer, RegisterRelationSerializer
from pacovbase.models import PACOV, Relation
from .models import PACOVInsight, RelationInsight

#View of for register new PACOV, by User
class RegisterPacovView(generics.CreateAPIView):       
    serializer_class = RegisterPacovSerializer                    

    # Overrides perform save to make many=true dynamic. Means api point can accept single og list of objects to create.
    def perform_create(self, serializer):
        serializer = self.get_serializer(data=self.request.data, many=isinstance(self.request.data,list), context={'request': self.request})
        serializer.is_valid()
        serializer.save()
        

#View for register new Relation, by User
class RegisterRelationView(generics.CreateAPIView):       
    serializer_class = RegisterRelationSerializer             

    # Overrides perform save to make many=true dynamic. Means api point can accept single og list of objects to create.
    def perform_create(self, serializer):
        serializer = self.get_serializer(data=self.request.data, many=isinstance(self.request.data,list), context={'request': self.request})
        serializer.is_valid()
        serializer.save()

