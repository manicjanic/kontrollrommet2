from rest_framework import serializers
from django.shortcuts import get_object_or_404

from .models import PACOVInsight, RelationInsight
from pacovbase.models import PACOV, Relation
from catalog.models import CoreType, CoreRelationType

# PACOV Insight by User
class PACOVInsightSerializer(serializers.ModelSerializer):
    # Representation of data from related the PACOV
    uuid = serializers.SlugRelatedField(source='pacov', slug_field='uuid', queryset=PACOV.objects.all())
    category = serializers.SlugRelatedField(source='pacov.category', slug_field='id', queryset=CoreType.objects.all())
    # Method field that builds and object with visible data, based on type and user's insight level
    insight_data = serializers.SerializerMethodField()
    
    class Meta:
        model = PACOVInsight
        fields = ('level', 'uuid', 'category', 'insight_data')

    #Method for making dynamic object with visible data
    def get_insight_data(self, obj):
        if obj.level == '0':
            return {
                'name' : obj.pacov.name,
                'started' : obj.pacov.started,
                'ended' : obj.pacov.ended,
                'idcode' : obj.pacov.idcode,
                'question' : obj.pacov.question,
                'specific_data': obj.pacov.specific_data
            }
        elif obj.level == '1':
            return {
                'name' : obj.pacov.name,
                'started' : obj.pacov.started,
                'ended' : obj.pacov.ended,
                'idcode' : obj.pacov.idcode,
                'question' : obj.pacov.question,
                'specific_data': obj.pacov.specific_data
            } 
        elif obj.level == '2':
            return {
                'name' : obj.pacov.name,
            }     
        elif obj.level == '3':
            return {
                'name' : obj.pacov.name,
            }

#Relation Insight by User
class RelationInsightSerializer(serializers.ModelSerializer):
    # Flattened representation of basic data from related Relation
    uuid = serializers.SlugRelatedField(source='relation', slug_field='uuid', queryset=Relation.objects.all())
    type = serializers.SlugRelatedField(source='relation.type', slug_field='id', read_only=True)
    # Reference to the PACOV Objects in the relation
    pacovA = serializers.SlugRelatedField(source='relation.pacovA', slug_field='uuid', read_only=True)
    pacovB = serializers.SlugRelatedField(source='relation.pacovB', slug_field='uuid', read_only=True)
    # Method field that builds and object with visible data, based on type and user's insight level
    insight_data = serializers.SerializerMethodField()
    
    class Meta:
        model = RelationInsight
        fields = ('level', 'uuid', 'type', 'pacovA', 'pacovB', 'insight_data')

    #Method for making dynamic object with visible data
    def get_insight_data(self, obj):
        # Data for Level 1
        if obj.level == '1':
            return {
                'started' : obj.relation.started,
                'ended' : obj.relation.ended,
                'idcode' : obj.relation.idcode,
                'question' : obj.relation.question,
                'specific_data': obj.relation.specific_data
            }
        # Data for Level 2
        elif obj.level == '2':
            return {
            } 
        #Data for level 3
        elif obj.level == '3':
            return {
            } 