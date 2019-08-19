from rest_framework import serializers
from django.shortcuts import get_object_or_404

from .models import PACOVInsight
from .models import RelationInsight
from pacovbase.serializers import PACOVSerializer

# PACOV Insight by User
class PACOVInsightSerializer(serializers.ModelSerializer):
    # Flattened representation of basic data from related PACOV
    pacov_uuid = serializers.CharField(source='pacov.uuid')
    pacov_type = serializers.IntegerField(source='pacov.type.id')
    pacov_name = serializers.CharField(source='pacov.name')
    # Method field that builds and object with visible data, based on type and user's insight level
    added_data = serializers.SerializerMethodField()
    
    class Meta:
        model = PACOVInsight
        fields = ('uuid', 'level', 'pacov_uuid', 'pacov_name', 'pacov_type', 'added_data')


    #Method for making dynamic object with visible data
    def get_added_data(self, obj):
        #PERSON
        if obj.pacov.type.type == "PERSON":
            if obj.level == '0':
                return {
                    'pacov_nameA' : obj.pacov.nameA,
                    'pacov_nameB' : obj.pacov.nameB,
                    'pacov_dateA' : obj.pacov.dateA,
                    'pacov_dateB' : obj.pacov.dateB,
                    'pacov_idcode' : obj.pacov.idcode,
                    'pacov_question' : obj.pacov.question,
                }
            elif obj.level == '1':
                return {
                    'pacov_nameA' : obj.pacov.nameA,
                    'pacov_nameB' : obj.pacov.nameB,
                } 
            elif obj.level == '2':
                return {
                    'pacov_nameA' : obj.pacov.nameA,
                    'pacov_nameB' : obj.pacov.nameB,
                }     
            elif obj.level == '3':
                return {
                    'pacov_nameA' : obj.pacov.nameA,
                    'pacov_nameB' : obj.pacov.nameB,
                }
        # ENTITY
        if obj.pacov.type.type == "ENTITY":
            if obj.level == '1':
                return {
                    'pacov_nameA' : obj.pacov.nameA,
                    'pacov_nameB' : obj.pacov.nameB,
                    'pacov_dateA' : obj.pacov.dateA,
                    'pacov_dateB' : obj.pacov.dateB,
                    'pacov_idcode' : obj.pacov.idcode,
                    'pacov_question' : obj.pacov.question,
                }
            if obj.level == '2':
                return {
                    'pacov_nameA' : obj.pacov.nameA,
                    'pacov_nameB' : obj.pacov.nameB,
                }
            if obj.level == '3':
                return {
                    'pacov_nameA' : obj.pacov.nameA,
                    'pacov_nameB' : obj.pacov.nameB,
                }
        # PROPERTY        
        if obj.pacov.type.type == "PROPERTY":
            if obj.level == '1':
                return {
                    'pacov_nameA' : obj.pacov.nameA,
                    'pacov_nameB' : obj.pacov.nameB,
                    'pacov_dateA' : obj.pacov.dateA,
                    'pacov_dateB' : obj.pacov.dateB,
                    'pacov_idcode' : obj.pacov.idcode,
                    'pacov_question' : obj.pacov.question,
                }
            if obj.level == '2':
                return {
                    'pacov_nameA' : obj.pacov.nameA,
                    'pacov_nameB' : obj.pacov.nameB,
                }
            if obj.level == '3':
                return {
                    'pacov_nameA' : obj.pacov.nameA,
                    'pacov_nameB' : obj.pacov.nameB,
                }
        #PLAN
        if obj.pacov.type.type == "PLAN":
            if obj.level == '1':
                return {
                    'pacov_nameA' : obj.pacov.nameA,
                    'pacov_nameB' : obj.pacov.nameB,
                    'pacov_dateA' : obj.pacov.dateA,
                    'pacov_dateB' : obj.pacov.dateB,
                    'pacov_idcode' : obj.pacov.idcode,
                    'pacov_question' : obj.pacov.question,
                }
            elif obj.level == '2':
                return {
                    'pacov_nameA' : obj.pacov.nameA,
                    'pacov_nameB' : obj.pacov.nameB,
                } 
            elif obj.level == '3':
                return {
                    'pacov_nameA' : obj.pacov.nameA,
                    'pacov_nameB' : obj.pacov.nameB,
                }     
        
        #ACTION fields
        if obj.pacov.type.type == "ACTION":
            if obj.level == '1':
                return {
                    'pacov_nameA' : obj.pacov.nameA,
                    'pacov_nameB' : obj.pacov.nameB,
                    'pacov_dateA' : obj.pacov.dateA,
                    'pacov_dateB' : obj.pacov.dateB,
                    'pacov_idcode' : obj.pacov.idcode,
                    'pacov_question' : obj.pacov.question,
                }
            elif obj.level == '2':
                return {
                    'pacov_nameA' : obj.pacov.nameA,
                    'pacov_nameB' : obj.pacov.nameB,
                }     
            elif obj.level == '3':
                return {
                    'pacov_nameA' : obj.pacov.nameA,
                    'pacov_nameB' : obj.pacov.nameB,
                }     
                   
        #RESULT fields
        if obj.pacov.type.type == "RESULT":
            if obj.level == '1':
                return {
                    'pacov_nameA' : obj.pacov.nameA,
                    'pacov_nameB' : obj.pacov.nameB,
                    'pacov_dateA' : obj.pacov.dateA,
                    'pacov_dateB' : obj.pacov.dateB,
                    'pacov_idcode' : obj.pacov.idcode,
                    'pacov_question' : obj.pacov.question,
                }
            elif obj.level == '2':
                return {
                    'pacov_nameA' : obj.pacov.nameA,
                    'pacov_nameB' : obj.pacov.nameB,
                }     
            elif obj.level == '3':
                return {
                    'pacov_nameA' : obj.pacov.nameA,
                    'pacov_nameB' : obj.pacov.nameB,
                }     
        
#Relation Insight by User
class RelationInsightSerializer(serializers.ModelSerializer):
    # Flattened representation of basic data from related Relation
    relation_uuid = serializers.CharField(source='relation.uuid')
    relation_type = serializers.IntegerField(source='relation.type.id')
    relation_name = serializers.CharField(source='relation.name')
    # Reference to the PACOV Objects in the relation
    pacovA = PACOVSerializer(fields=('pacov_uuid', 'pacov_type', 'pacov_name'), source='relation.pacovA')
    pacovB = PACOVSerializer(fields=('pacov_uuid', 'pacov_type', 'pacov_name'), source='relation.pacovB')
    # Method field that builds and object with visible data, based on type and user's insight level
    added_data = serializers.SerializerMethodField()
    
    class Meta:
        model = RelationInsight
        fields = ('uuid', 'level', 'relation_uuid', 'relation_type', 'relation_name', 'pacovA', 'pacovB', 'added_data')

    #Method for making dynamic object with visible data
    def get_added_data(self, obj):
        # Data for Level 1
        if obj.level == '1':
            return {
                'relation_dateA' : obj.relation.dateA,
                'relation_dateB' : obj.relation.dateB,
                'relation_idcode' : obj.relation.idcode,
                'relation_question' : obj.relation.question,
            }
        # Data for Level 2
        elif obj.level == '2':
            return {
            } 
        #Data for level 3
        elif obj.level == '3':
            return {
            } 
