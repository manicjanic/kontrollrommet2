from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import generics
from django.shortcuts import get_object_or_404


from .serializers import PACOVInsightSerializer
from .serializers import RelationInsightSerializer
from .models import PACOVInsight                 
from .models import RelationInsight                 

#General View of PACOVInsigt, by User
class PACOVInsightView(viewsets.ReadOnlyModelViewSet):       
    serializer_class = PACOVInsightSerializer                     
    lookup_field = 'pacov__uuid'

    def get_queryset(self):
        user = self.request.user
        return PACOVInsight.objects.filter(user=user)

#General View of RelationInsigt, by User
class RelationInsightView(viewsets.ReadOnlyModelViewSet):       
    serializer_class = RelationInsightSerializer                     
    lookup_field = 'relation__uuid'

    def get_queryset(self):
        user = self.request.user
        return RelationInsight.objects.filter(user=user)

# Retrieval view of PACOV that is the User
class PACOVLevelZero(generics.RetrieveAPIView):
    serializer_class = PACOVInsightSerializer                     
    
    def get_object(self):
        user = self.request.user
        return get_object_or_404(PACOVInsight, user=user, level='0')

#List View of PACOVInsight by User at insight level 1  
class PACOVLevelOne(generics.ListAPIView):
    serializer_class = PACOVInsightSerializer                     
    lookup_field = 'uuid'
    
    def get_queryset(self):
        user = self.request.user
        return PACOVInsight.objects.filter(user=user, level='1')
        
#List View of PACOVInsight by User at insight level 2  
class PACOVLevelTwo(generics.ListAPIView):
    serializer_class = PACOVInsightSerializer                     
    lookup_field = 'uuid'
    
    def get_queryset(self):
        user = self.request.user
        return PACOVInsight.objects.filter(user=user, level='2')

#List View of PACOVInsight by User at insight level 3
class PACOVLevelThree(generics.ListAPIView):
    serializer_class = PACOVInsightSerializer                     
    lookup_field = 'uuid'
    
    def get_queryset(self):
        user = self.request.user
        return PACOVInsight.objects.filter(user=user, level='3')

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
