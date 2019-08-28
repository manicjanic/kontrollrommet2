from rest_framework import viewsets

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

