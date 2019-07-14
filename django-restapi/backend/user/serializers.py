from rest_framework import serializers

from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from peppar_base.serializers import PepparSerializer
from peppar_relational.serializers import PepparRelationSerializer

from .models import UserPeppar
from .models import UserPepparRelation
from peppar_base.models import Peppar
from peppar_relational.models import PepparRelation

# Serializer using Peppar as base, choosing with fields to reveal at a basic 'for all' level
class PepparSkeletonSerializer(PepparSerializer):
    
    class Meta:
        model = Peppar
        fields = ('type', 'name', 'uuid_field')

# Serializer of Peppar that identifies user and makes an extra dynamic field, 
# based on users sight into the specific peppar object    
class UserPepparSerializer(serializers.ModelSerializer):
    peppar = PepparSkeletonSerializer(read_only=True)
    checkit = serializers.SerializerMethodField()
    
    class Meta:
        model = UserPeppar
        fields = ('id','peppar', 'level', 'checkit')

    def get_checkit(self, obj):
        if obj.level == '0':
            return {
                'email' : obj.peppar.person_contact_email
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
class UserPepparRelationSerializer(serializers.ModelSerializer):
    pepparrelation = PepparRelationSkeletonSerializer(read_only=True)
    checkit = serializers.SerializerMethodField()
    
    class Meta:
        model = UserPepparRelation
        fields = ('id', 'pepparrelation', 'level', 'checkit')

    def get_checkit(self, obj):
        if obj.level == '1':
            return {
                'name' : obj.pepparrelation.name
            }
        elif obj.level == '2':
            return {
                
            }

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'], 
            username=validated_data['username']
            )
        user.set_password(validated_data['password'])
        user.save()
        Token.objects.create(user=user)
        return user