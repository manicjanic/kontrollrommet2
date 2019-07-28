from django.db import models
from datetime import datetime
import uuid

from django.contrib.auth.models import User
from peppar_base.models import Peppar
from peppar_relational.models import PepparRelation

#Users sight scope into Peppars
class PepparAsUser(models.Model):
    #Defining the different Sight Levels
    SIGHT_LEVELS = [
        ('0', 'Myself'),
        ('1', 'Full sight'),
        ('2', 'Limited sight'),
        ('3', 'Hidden'),
    ]
    #Identification fields
    uuid_field = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    name = models.CharField(max_length=120, editable=False, blank=True)
    #Connection
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    peppar = models.ForeignKey(Peppar, on_delete=models.CASCADE)
    #Sight Level into Peppar
    level = models.CharField(max_length=1, choices=SIGHT_LEVELS)
    #Timestamps
    timestamp_created = models.DateTimeField(auto_now_add=True, editable=False)
    timestamp_updated = models.DateTimeField(auto_now=True, editable=False)

    #Constructing the Name field based on data in other fields
    def save(self):
        name = self.peppar.name + ' Level:' + self.level
        self.name = name
        super(PepparAsUser, self).save()

    def _str_(self):
        return self.name

#Users sight scope into Peppars
class PepparRelationAsUser(models.Model):
    SIGHT_LEVELS = [
        ('0', 'Myself'),
        ('1', 'Full sight'),
        ('2', 'Limited sight'),
        ('3', 'Hidden'),
    ]
    #Identification fields
    uuid_field = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    name = models.CharField(max_length=120, editable=False, blank=True)
    #Connection
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pepparrelation = models.ForeignKey(PepparRelation, on_delete=models.CASCADE)
    #Sight Level into PepparRelation
    level = models.CharField(max_length=1, choices=SIGHT_LEVELS, blank=True)
    #Timestamps
    timestamp_created = models.DateTimeField(auto_now_add=True, editable=False)
    timestamp_updated = models.DateTimeField(auto_now=True, editable=False)

    #Constructing the Name field based on data in other fields
    def save(self):
        name = self.pepparrelation.name + ' Level:' + self.level
        self.name = name
        super(PepparRelationAsUser, self).save()

    def _str_(self):
        return self.name

