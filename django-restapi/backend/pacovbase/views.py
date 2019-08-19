from rest_framework import viewsets         

from .serializers import PACOVSerializer
from .models import PACOV                 
from .serializers import RelationSerializer
from .models import Relation                 


# For testing purposes. Gives the whole database
class PACOVView(viewsets.ModelViewSet):
    
    permission_classes = []

    serializer_class = PACOVSerializer          
    queryset = PACOV.objects.all()              
    lookup_field = 'uuid'

#For testing purposes. Gives whole database    
class RelationView(viewsets.ModelViewSet):

    serializer_class = RelationSerializer          
    queryset = Relation.objects.all()              
    lookup_field = 'uuid'
