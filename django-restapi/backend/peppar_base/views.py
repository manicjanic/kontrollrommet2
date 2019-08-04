from rest_framework import viewsets         

from .serializers import PepparSerializer
from .models import Peppar                 

# For testing purposes. Gives the whole database
class PepparView(viewsets.ModelViewSet):
    
    serializer_class = PepparSerializer          
    queryset = Peppar.objects.all()              
    lookup_field = 'uuid'
