from django.db import models
import uuid
from datetime import datetime
from django.contrib.auth.models import User

from peppar_base.models import Peppar
from peppar_relational.models import PepparRelation

#Users sight scope into Peppars
class PepparAsUser(models.Model):
    ACCESS_LEVELS = [
        ('0', 'Me'),
        ('1', 'Full info'),
        ('2', 'Limited info'),
        ('3', 'Hidden'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    peppar = models.ForeignKey(Peppar, on_delete=models.CASCADE)
    level = models.CharField(max_length=1, choices=ACCESS_LEVELS, blank=True)
    #Timestamps
    timestamp_updated = models.DateTimeField(editable=False)

    def save(self):
        self.timestamp_updated = datetime.now()
        super(PepparAsUser, self).save()

    def _str_(self):
        return self.peppar + ' ' + self.level

#Users sight scope into Peppars
class PepparRelationAsUser(models.Model):
    ACCESS_LEVELS = [
        ('0', 'Me'),
        ('1', 'Full info'),
        ('2', 'Limited info'),
        ('3', 'Hidden'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pepparrelation = models.ForeignKey(PepparRelation, on_delete=models.CASCADE)
    level = models.CharField(max_length=1, choices=ACCESS_LEVELS, blank=True)
    #Timestamps
    timestamp_updated = models.DateTimeField(editable=False)

    def save(self):
        self.timestamp_updated = datetime.now()
        super(PepparRelationAsUser, self).save()

    def _str_(self):
        return self.peppar + ' ' + self.level
