from django.db import models
from datetime import datetime
import uuid as uuid_field

from django.contrib.auth.models import User
from peppar_base.models import Peppar
from peppar_relational.models import Relation

#Users sight scope into Peppars
class PepparInsight(models.Model):
    #Defining the different Sight Levels
    LEVEL = [
        ('0', 'Me'),
        ('1', 'My'),
        ('2', 'Close'),
        ('3', 'Distant'),
    ]
    #Identification fields
    uuid = models.UUIDField(default=uuid_field.uuid4, unique=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    #Insight Level
    level = models.CharField(max_length=1, choices=LEVEL)
    #Object
    peppar = models.ForeignKey(Peppar, on_delete=models.CASCADE)
    
    #Timestamps
    timestamp_created = models.DateTimeField(auto_now_add=True, editable=False)
    timestamp_updated = models.DateTimeField(auto_now=True, editable=False)

    def _str_(self):
        return self.uiid

#Users sight scope into Peppars
class RelationInsight(models.Model):
    LEVEL = [
        ('0', 'Me'),
        ('1', 'My'),
        ('2', 'Close'),
        ('3', 'Distant'),
    ]
    #Identification fields
    uuid = models.UUIDField(default=uuid_field.uuid4, unique=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    #Insight Level
    level = models.CharField(max_length=1, choices=LEVEL, blank=True)
    #Object
    relation = models.ForeignKey(Relation, on_delete=models.CASCADE)
    
    #Timestamps
    timestamp_created = models.DateTimeField(auto_now_add=True, editable=False)
    timestamp_updated = models.DateTimeField(auto_now=True, editable=False)

    def _str_(self):
        return self.uuid

