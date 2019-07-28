from rest_framework import serializers

from peppar_base.serializers import PepparSerializer
from peppar_relational.serializers import PepparRelationSerializer

from .models import PepparInsight
from .models import PepparRelationAsUser

from peppar_base.models import Peppar
from peppar_relational.models import PepparRelation

# Serializer of Peppar that identifies user and makes an extra dynamic field, 
# based on users sight into the specific peppar object    
class PepparInsightSerializer(serializers.ModelSerializer):
    # Nested representation of Peppar object, limited fields
    peppar = PepparSerializer(read_only=True, fields=('uuid', 'name', 'type'))
    # Method field that builds other data, dependent on sight level
    checkit = serializers.SerializerMethodField()
    
    class Meta:
        model = PepparInsight
        fields = ('uuid','peppar', 'level', 'checkit')

    def get_checkit(self, obj):
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
                    #PLAN fields
                    
                    #ACTION fields
                    
                    #RESULT fields

# Serializer of PepparRelation that identifies user and makes an extra dynamic field, 
# based on users sight into the specific pepparrelation object    
class PepparRelationAsUserSerializer(serializers.ModelSerializer):
    # Nested representation of PepparRelation object, limited fields
    pepparrelation = PepparRelationSerializer(read_only=True, fields=('uuid', 'name', 'pepparA', 'type_name', 'pepparB'))
    # Method field that builds other data, dependent on sight level
    checkit = serializers.SerializerMethodField()
    
    class Meta:
        model = PepparRelationAsUser
        fields = ('id', 'pepparrelation', 'level', 'checkit')

    def get_checkit(self, obj):
        if obj.level == '1':
            return {
            }
        elif obj.level == '2':
            return {
            }
