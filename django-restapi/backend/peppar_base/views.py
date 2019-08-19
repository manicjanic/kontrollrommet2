from rest_framework import viewsets         

from .serializers import PepparSerializer
from .models import PACOV                 

# For testing purposes. Gives the whole database
class PepparView(viewsets.ModelViewSet):
    
    permission_classes = []

    serializer_class = PepparSerializer          
    queryset = PACOV.objects.all()              
    lookup_field = 'uuid'
