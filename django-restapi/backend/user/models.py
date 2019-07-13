import uuid
from django.db import models
from django.contrib.auth.models import User

from peppar_base.models import Peppar

# Create your models here.
class UserPeppar(models.Model):
    ACCESS_LEVELS = [
        ('0', 'Me'),
        ('1', 'Full info'),
        ('2', 'Limited info'),
        ('3', 'Hidden'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    peppar = models.ForeignKey(Peppar, on_delete=models.CASCADE)
    level = models.CharField(max_length=1, choices=ACCESS_LEVELS, blank=True) 
    uuid_field = models.UUIDField(default=uuid.uuid4, unique=True)
    
    def _str_(self):
        return self.uuid_field
