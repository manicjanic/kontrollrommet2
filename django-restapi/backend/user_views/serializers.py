from rest_framework import serializers

from peppar_base.serializers import PepparSerializer
from peppar_relational.serializers import PepparRelationSerializer

from .models import PepparAsUser
from .models import PepparRelationAsUser

from peppar_base.models import Peppar
from peppar_relational.models import PepparRelation

# Serializer using Peppar as base, choosing with fields to reveal at a basic 'for all' level
class PepparSkeletonSerializer(PepparSerializer):
    
    class Meta:
        model = Peppar
        fields = ('type', 'name', 'uuid_field')

# Serializer of Peppar that identifies user and makes an extra dynamic field, 
# based on users sight into the specific peppar object    
class PepparAsUserSerializer(serializers.ModelSerializer):
    peppar = PepparSkeletonSerializer(read_only=True)
    checkit = serializers.SerializerMethodField()
    
    class Meta:
        model = PepparAsUser
        fields = ('id','peppar', 'level', 'checkit')

    def get_checkit(self, obj):
        if obj.level == '0':
            return {
                'email' : obj.peppar.person_email
            }
        elif obj.level == '1':
            return {
                
            }

# Serializer using Peppar as base, choosing with fields to reveal at a basic 'for all' level
class PepparRelationSkeletonSerializer(PepparRelationSerializer):
    
    class Meta:
        model = PepparRelation
        fields = ('pepparA', 'name', 'pepparB', 'uuid_field')

# Serializer of PepparRelation that identifies user and makes an extra dynamic field, 
# based on users sight into the specific pepparrelation object    
class PepparRelationAsUserSerializer(serializers.ModelSerializer):
    pepparrelation = PepparRelationSkeletonSerializer(read_only=True)
    checkit = serializers.SerializerMethodField()
    
    class Meta:
        model = PepparRelationAsUser
        fields = ('id', 'pepparrelation', 'level', 'checkit')

    def get_checkit(self, obj):
        if obj.level == '1':
            return {
                'name' : obj.pepparrelation.name
            }
        elif obj.level == '2':
            return {
                
            }
