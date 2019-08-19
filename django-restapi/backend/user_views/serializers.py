from rest_framework import serializers
from django.shortcuts import get_object_or_404

from .models import PepparInsight
from .models import RelationInsight
from pacovbase.serializers import PepparSerializer

# Peppar Insight by User
class PepparInsightSerializer(serializers.ModelSerializer):
    # Flattened representation of basic data from related Peppar
    peppar_uuid = serializers.CharField(source='peppar.uuid')
    peppar_type = serializers.IntegerField(source='peppar.type.id')
    peppar_name = serializers.CharField(source='peppar.name')
    # Method field that builds and object with visible data, based on type and user's insight level
    added_data = serializers.SerializerMethodField()
    
    class Meta:
        model = PepparInsight
        fields = ('uuid', 'level', 'peppar_uuid', 'peppar_name', 'peppar_type', 'added_data')


    #Method for making dynamic object with visible data
    def get_added_data(self, obj):
        #PERSON
        if obj.peppar.type.type == "PERSON":
            if obj.level == '0':
                return {
                    'peppar_nameA' : obj.peppar.nameA,
                    'peppar_nameB' : obj.peppar.nameB,
                    'peppar_dateA' : obj.peppar.dateA,
                    'peppar_dateB' : obj.peppar.dateB,
                    'peppar_idcode' : obj.peppar.idcode,
                    'peppar_question' : obj.peppar.question,
                }
            elif obj.level == '1':
                return {
                    'peppar_nameA' : obj.peppar.nameA,
                    'peppar_nameB' : obj.peppar.nameB,
                } 
            elif obj.level == '2':
                return {
                    'peppar_nameA' : obj.peppar.nameA,
                    'peppar_nameB' : obj.peppar.nameB,
                }     
            elif obj.level == '3':
                return {
                    'peppar_nameA' : obj.peppar.nameA,
                    'peppar_nameB' : obj.peppar.nameB,
                }
        # ENTITY
        if obj.peppar.type.type == "ENTITY":
            if obj.level == '1':
                return {
                    'peppar_nameA' : obj.peppar.nameA,
                    'peppar_nameB' : obj.peppar.nameB,
                    'peppar_dateA' : obj.peppar.dateA,
                    'peppar_dateB' : obj.peppar.dateB,
                    'peppar_idcode' : obj.peppar.idcode,
                    'peppar_question' : obj.peppar.question,
                }
            if obj.level == '2':
                return {
                    'peppar_nameA' : obj.peppar.nameA,
                    'peppar_nameB' : obj.peppar.nameB,
                }
            if obj.level == '3':
                return {
                    'peppar_nameA' : obj.peppar.nameA,
                    'peppar_nameB' : obj.peppar.nameB,
                }
        # PROPERTY        
        if obj.peppar.type.type == "PROPERTY":
            if obj.level == '1':
                return {
                    'peppar_nameA' : obj.peppar.nameA,
                    'peppar_nameB' : obj.peppar.nameB,
                    'peppar_dateA' : obj.peppar.dateA,
                    'peppar_dateB' : obj.peppar.dateB,
                    'peppar_idcode' : obj.peppar.idcode,
                    'peppar_question' : obj.peppar.question,
                }
            if obj.level == '2':
                return {
                    'peppar_nameA' : obj.peppar.nameA,
                    'peppar_nameB' : obj.peppar.nameB,
                }
            if obj.level == '3':
                return {
                    'peppar_nameA' : obj.peppar.nameA,
                    'peppar_nameB' : obj.peppar.nameB,
                }
        #PLAN
        if obj.peppar.type.type == "PLAN":
            if obj.level == '1':
                return {
                    'peppar_nameA' : obj.peppar.nameA,
                    'peppar_nameB' : obj.peppar.nameB,
                    'peppar_dateA' : obj.peppar.dateA,
                    'peppar_dateB' : obj.peppar.dateB,
                    'peppar_idcode' : obj.peppar.idcode,
                    'peppar_question' : obj.peppar.question,
                }
            elif obj.level == '2':
                return {
                    'peppar_nameA' : obj.peppar.nameA,
                    'peppar_nameB' : obj.peppar.nameB,
                } 
            elif obj.level == '3':
                return {
                    'peppar_nameA' : obj.peppar.nameA,
                    'peppar_nameB' : obj.peppar.nameB,
                }     
        
        #ACTION fields
        if obj.peppar.type.type == "ACTION":
            if obj.level == '1':
                return {
                    'peppar_nameA' : obj.peppar.nameA,
                    'peppar_nameB' : obj.peppar.nameB,
                    'peppar_dateA' : obj.peppar.dateA,
                    'peppar_dateB' : obj.peppar.dateB,
                    'peppar_idcode' : obj.peppar.idcode,
                    'peppar_question' : obj.peppar.question,
                }
            elif obj.level == '2':
                return {
                    'peppar_nameA' : obj.peppar.nameA,
                    'peppar_nameB' : obj.peppar.nameB,
                }     
            elif obj.level == '3':
                return {
                    'peppar_nameA' : obj.peppar.nameA,
                    'peppar_nameB' : obj.peppar.nameB,
                }     
                   
        #RESULT fields
        if obj.peppar.type.type == "RESULT":
            if obj.level == '1':
                return {
                    'peppar_nameA' : obj.peppar.nameA,
                    'peppar_nameB' : obj.peppar.nameB,
                    'peppar_dateA' : obj.peppar.dateA,
                    'peppar_dateB' : obj.peppar.dateB,
                    'peppar_idcode' : obj.peppar.idcode,
                    'peppar_question' : obj.peppar.question,
                }
            elif obj.level == '2':
                return {
                    'peppar_nameA' : obj.peppar.nameA,
                    'peppar_nameB' : obj.peppar.nameB,
                }     
            elif obj.level == '3':
                return {
                    'peppar_nameA' : obj.peppar.nameA,
                    'peppar_nameB' : obj.peppar.nameB,
                }     
        
#Relation Insight by User
class RelationInsightSerializer(serializers.ModelSerializer):
    # Flattened representation of basic data from related Relation
    relation_uuid = serializers.CharField(source='relation.uuid')
    relation_type = serializers.IntegerField(source='relation.type.id')
    relation_name = serializers.CharField(source='relation.name')
    # Reference to the Peppar Objects in the relation
    pepparA = PepparSerializer(fields=('peppar_uuid', 'peppar_type', 'peppar_name'), source='relation.pepparA')
    pepparB = PepparSerializer(fields=('peppar_uuid', 'peppar_type', 'peppar_name'), source='relation.pepparB')
    # Method field that builds and object with visible data, based on type and user's insight level
    added_data = serializers.SerializerMethodField()
    
    class Meta:
        model = RelationInsight
        fields = ('uuid', 'level', 'relation_uuid', 'relation_type', 'relation_name', 'pepparA', 'pepparB', 'added_data')

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
