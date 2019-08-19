from rest_framework import viewsets         

from .serializers import PepparSerializer
from .models import PACOV                 
from .serializers import RelationSerializer
from .models import Relation                 


# For testing purposes. Gives the whole database
class PepparView(viewsets.ModelViewSet):
    
    permission_classes = []

    serializer_class = PepparSerializer          
    queryset = PACOV.objects.all()              
    lookup_field = 'uuid'

#For testing purposes. Gives whole database    
class RelationView(viewsets.ModelViewSet):

    serializer_class = RelationSerializer          
    queryset = Relation.objects.all()              
    lookup_field = 'uuid'
