from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import generics
from django.shortcuts import get_object_or_404


from .serializers import PepparInsightSerializer
from .serializers import RelationInsightSerializer
from .models import PepparInsight                 
from .models import RelationInsight                 

#General View of PepparInsigt, by User
class PepparInsightView(viewsets.ModelViewSet):       
    serializer_class = PepparInsightSerializer                     
    lookup_field = 'uuid'

    def get_queryset(self):
        user = self.request.user
        return PepparInsight.objects.filter(user=user)

#General View of RelationInsigt, by User
class RelationInsightView(viewsets.ModelViewSet):       
    serializer_class = RelationInsightSerializer                     
    lookup_field = 'uuid'

    def get_queryset(self):
        user = self.request.user
        return RelationInsight.objects.filter(user=user)

# Retrieval view of Peppar that is the User
class PepparLevelZero(generics.RetrieveAPIView):
    serializer_class = PepparInsightSerializer                     
    
    def get_object(self):
        user = self.request.user
        return get_object_or_404(PepparInsight, user=user, level='0')

#List View of PepparInsight by User at insight level 1  
class PepparLevelOne(generics.ListAPIView):
    serializer_class = PepparInsightSerializer                     
    lookup_field = 'uuid'
    
    def get_queryset(self):
        user = self.request.user
        return PepparInsight.objects.filter(user=user, level='1')
        
#List View of PepparInsight by User at insight level 2  
class PepparLevelTwo(generics.ListAPIView):
    serializer_class = PepparInsightSerializer                     
    lookup_field = 'uuid'
    
    def get_queryset(self):
        user = self.request.user
        return PepparInsight.objects.filter(user=user, level='2')

#List View of PepparInsight by User at insight level 3
class PepparLevelThree(generics.ListAPIView):
    serializer_class = PepparInsightSerializer                     
    lookup_field = 'uuid'
    
    def get_queryset(self):
        user = self.request.user
        return PepparInsight.objects.filter(user=user, level='3')

#List View of RelationInsight by User at insight level 1
class RelationLevelOne(generics.ListAPIView):
    serializer_class = RelationInsightSerializer                     
    lookup_field = 'uuid'

    def get_queryset(self):
        user = self.request.user
        return RelationInsight.objects.filter(user=user, level='1')

#List View of RelationInsight by User at insight level 2
class RelationLevelTwo(generics.ListAPIView):
    serializer_class = RelationInsightSerializer                     
    lookup_field = 'uuid'

    def get_queryset(self):
        user = self.request.user
        return RelationInsight.objects.filter(user=user, level='2')

#List View of RelationInsight by User at insight level 3
class RelationLevelThree(generics.ListAPIView):
    serializer_class = RelationInsightSerializer                     
    lookup_field = 'uuid'

    def get_queryset(self):
        user = self.request.user
        return RelationInsight.objects.filter(user=user, level='3')
