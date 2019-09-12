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
    
    # Overrides create method to make many=true dynamic. Api can accept single or list of objects to create.
    def create(self, request, *args, **kwargs):
            serializer = self.get_serializer(data=request.data, many=isinstance(request.data,list))
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)        

#View for register new Relation, by User
class RegisterRelationView(generics.CreateAPIView):       
    serializer_class = RegisterRelationSerializer             

    # Overrides create method to make many=true dynamic. Api can accept single or list of objects to create.
    def create(self, request, *args, **kwargs):
            serializer = self.get_serializer(data=request.data, many=isinstance(request.data,list))
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)        
