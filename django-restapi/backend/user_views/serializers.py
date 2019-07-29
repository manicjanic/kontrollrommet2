from rest_framework import serializers
from django.shortcuts import get_object_or_404


from peppar_base.models import Peppar
from peppar_relational.models import Relation
from .models import PepparInsight
from .models import RelationInsight
from peppar_base.serializers import PepparSerializer

class PepparInsightSerializer(serializers.ModelSerializer):
    # Flattened representation of basic data from related Peppar
    peppar_uiid = serializers.SerializerMethodField()
    peppar_type = serializers.SerializerMethodField()
    peppar_name = serializers.SerializerMethodField()
    # Method field that builds and object with visible data, based on type and user's insight level
    visible_data = serializers.SerializerMethodField()
    
    class Meta:
        model = PepparInsight
        fields = ('uuid', 'level', 'peppar_uiid', 'peppar_type', 'peppar_name', 'visible_data')

    #Methods to get relevant fields from related Peppar
    def get_peppar_uiid(self, obj):
        return obj.peppar.uuid

    def get_peppar_type(self, obj):
        return obj.peppar.type

    def get_peppar_name(self, obj):
        return obj.peppar.name

    #Method for making dynamic object with visible data
    def get_visible_data(self, obj):
        if obj.peppar.type == "PERSON":
            if obj.level == '0':
                return {
                    #PERSON fields
                    'person_firstname' : obj.peppar.person_firstname,
                    'person_lastname' : obj.peppar.person_lastname,
                    'person_email' : obj.peppar.person_email,
                    'person_cellphone' : obj.peppar.person_cellphonenumber,
                    #more private data
                }
            elif obj.level == '1':
                return {
                    #PERSON fields
                    'person_firstname' : obj.peppar.person_firstname,
                    'person_lastname' : obj.peppar.person_lastname,
                    'person_email' : obj.peppar.person_email,
                    'person_cellphone' : obj.peppar.person_cellphonenumber,
                } 
            elif obj.level == '2':
                return {
                    #PERSON fields
                    'person_firstname' : obj.peppar.person_firstname,
                    'person_lastname' : obj.peppar.person_lastname,
                }     
            elif obj.level == '3':
                return {
                    #PERSON fields
                    'person_firstname' : obj.peppar.person_firstname,
                    'person_lastname' : obj.peppar.person_lastname,
                }     
        if obj.peppar.type == "ENTITY":
            if obj.level == '1':
                return {
                    #ENTITY fields
                    'entity_name' : obj.peppar.entity_name,
                    'entity_orgnr' : obj.peppar.entity_orgnr,
                }
            if obj.level == '2':
                return {
                    #ENTITY fields
                    'entity_name' : obj.peppar.entity_name,
                }
            if obj.level == '3':
                return {
                    #ENTITY fields
                    'entity_name' : obj.peppar.entity_name,
                }
        if obj.peppar.type == "PROPERTY":
            if obj.level == '1':
                return {
                    #PROPERTY fields
                    'property_streetname' : obj.peppar.property_streetname,
                    'property_streetnumber' : obj.peppar.property_streetnumber, 
                    'property_zipcode' : obj.peppar.property_zipcode,
                    'property_city' : obj.peppar.property_city,
                    'property_country' : obj.peppar.property_country,
                }
            if obj.level == '2':
                return {
                    #PROPERTY fields
                    'property_streetname' : obj.peppar.property_streetname,
                    'property_streetnumber' : obj.peppar.property_streetnumber, 
                }
            if obj.level == '3':
                return {
                    #PROPERTY fields
                    'property_streetname' : obj.peppar.property_streetname,
                    'property_streetnumber' : obj.peppar.property_streetnumber, 
                }
                    #PLAN fields
                    
                    #ACTION fields
                    
                    #RESULT fields

class RelationInsightSerializer(serializers.ModelSerializer):
    # Flattened representation of basic data from related Peppar
    relation_uiid = serializers.SerializerMethodField()
    relation_type = serializers.SerializerMethodField()
    relation_name = serializers.SerializerMethodField()
    # Reference to the tho Peppar Objects in the relation
    pepparA = serializers.SerializerMethodField()
    pepparB = serializers.SerializerMethodField()
    
    # Method field that builds and object with visible data, based on type and user's insight level
    visible_data = serializers.SerializerMethodField()
    
    class Meta:
        model = RelationInsight
        fields = ('uuid', 'level', 'relation_uiid', 'relation_type', 'relation_name', 'pepparA', 'pepparB', 'visible_data')

    #Methods to get relevant fields from related Relation
    def get_relation_uiid(self, obj):
        return obj.relation.uuid

    def get_relation_type(self, obj):
        return obj.relation.type

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
    def get_visible_data(self, obj):
        if obj.level == '1':
            return {
            #Data content for level 1
            }
        elif obj.level == '2':
            return {
            #Data content for level 2
            }
        elif obj.level == '3':
            return {
            #Data content for level 3
            }
