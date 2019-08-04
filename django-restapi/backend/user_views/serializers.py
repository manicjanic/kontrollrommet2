from rest_framework import serializers
from django.shortcuts import get_object_or_404

from .models import PepparInsight
from .models import RelationInsight
from peppar_base.serializers import PepparSerializer

# Peppar Insight by User
class PepparInsightSerializer(serializers.ModelSerializer):
    # Flattened representation of basic data from related Peppar
    peppar_uuid = serializers.SerializerMethodField()
    peppar_type_id = serializers.SerializerMethodField()
    peppar_name = serializers.SerializerMethodField()
    # Method field that builds and object with visible data, based on type and user's insight level
    added_data = serializers.SerializerMethodField()
    
    class Meta:
        model = PepparInsight
        fields = ('uuid', 'level', 'peppar_uuid', 'peppar_type_id', 'peppar_name', 'added_data')

    #Methods to get relevant fields from related Peppar
    def get_peppar_uuid(self, obj):
        return obj.peppar.uuid

    def get_peppar_name(self, obj):
        return obj.peppar.name

    def get_peppar_type_id(self, obj):
        return obj.peppar.type.id


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
    relation_uuid = serializers.SerializerMethodField()
    relation_name = serializers.SerializerMethodField()
    relation_type_id = serializers.SerializerMethodField()
    # Reference to the Peppar Objects in the relation
    pepparA = serializers.SerializerMethodField()
    pepparB = serializers.SerializerMethodField()
    # Method field that builds and object with visible data, based on type and user's insight level
    added_data = serializers.SerializerMethodField()
    
    class Meta:
        model = RelationInsight
        fields = ('uuid', 'level', 'relation_uuid', 'relation_type_id', 'relation_name', 'pepparA', 'pepparB', 'added_data')

    #Methods to get relevant fields from related Relation
    def get_relation_uuid(self, obj):
        return obj.relation.uuid

    def get_relation_type_id(self, obj):
        return obj.relation.type.id

    def get_relation_name(self, obj):
        return obj.relation.name

    #Reference to the two Peppar Objects in the relation
    def get_pepparA(self, obj):
        peppar = obj.relation.pepparA
        return PepparSerializer(peppar, fields=('uuid', 'type', 'name',)).data
        
    def get_pepparB(self, obj):
        peppar = obj.relation.pepparB
        return PepparSerializer(peppar, fields=('uuid', 'type', 'name',)).data

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
