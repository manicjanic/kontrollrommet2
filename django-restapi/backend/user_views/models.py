from django.db import models
from datetime import datetime
import uuid as uuid_field

from django.contrib.auth.models import User
from pacovbase.models import PACOV, Relation

#Users sight scope into PACOVs
class PACOVInsight(models.Model):
    #Defining the different Sight Levels
    LEVEL = [
        ('0', 'Me'),
        ('1', 'My'),
        ('2', 'Close'),
        ('3', 'Distant'),
    ]
    # Uniquie Identification
    uuid = models.UUIDField(default=uuid_field.uuid4, unique=True, editable=False)
    # Specified User
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    #The Object observed
    pacov = models.ForeignKey(PACOV, on_delete=models.CASCADE)
    #Insight Level
    level = models.CharField(max_length=1, choices=LEVEL)
    
    #Timestamps
    timestamp_created = models.DateTimeField(auto_now_add=True, editable=False)
    timestamp_updated = models.DateTimeField(auto_now=True, editable=False)

    class Meta:
        unique_together = ['user', 'pacov']

    def __str__(self):
        return self.user.username + " - " + self.level + " - " + self.pacov.name

#Users sight scope into Relations
class RelationInsight(models.Model):
    LEVEL = [
        ('1', 'My'),
        ('2', 'Close'),
        ('3', 'Distant'),
    ]

    # Uniquie Identification
    uuid = models.UUIDField(default=uuid_field.uuid4, unique=True, editable=False)
    # Specified User
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    #The Object observed
    relation = models.ForeignKey(Relation, on_delete=models.CASCADE)
    #Insight Level
    level = models.CharField(max_length=1, choices=LEVEL, blank=True)
    
    #Timestamps
    timestamp_created = models.DateTimeField(auto_now_add=True, editable=False)
    timestamp_updated = models.DateTimeField(auto_now=True, editable=False)

    class Meta:
        unique_together = ['user', 'relation']

    def __str__(self):
        return self.user.username + " Level " + self.level + " " + self.relation.name

