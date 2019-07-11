import uuid
from django.db import models

# PEPPAR CORE MODEL
class Peppar(models.Model):
    PERSON = 'A'
    ENTITY = 'B'
    PROPERTY = 'C'
    PLAN = 'D'
    ACTION = 'E'
    RESULT = 'F'
    PEPPAR_BREAKDOWN = [
        (PERSON, 'Person'),
        (ENTITY, 'Entity'),
        (PROPERTY, 'Property'),
        (PLAN, 'Plan'),
        (ACTION, 'Action'),
        (RESULT, 'Result'),
    ]
    name = models.CharField(max_length=120)
    type = models.CharField(max_length=1, choices=PEPPAR_BREAKDOWN, blank=True)
    uuid_field = models.UUIDField(default=uuid.uuid4, unique=True)
    
    def _str_(self):
        return self.name
