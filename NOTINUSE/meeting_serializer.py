from rest_framework import serializers
from pacovbase.serializers import PACOVSerializer, RelationSerializer

class MeetingSerializer(serializers.Serializer):
    pacov = PACOVSerializer(many=True)
    halfrelation = RelationSerializer(many=True, Fields=('type', 'pacovA', 'started', 'ended', 'idcode', 'question'))
    
