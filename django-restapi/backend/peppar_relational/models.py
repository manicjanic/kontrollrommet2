import uuid
from django.db import models
from peppar_base.models import Peppar

# PEPPAR RELATIONAL MODEL
class PepparRelation(models.Model):
    name = models.CharField(max_length=120)
    pepparA = models.ForeignKey(Peppar, related_name="pepparA", on_delete=models.CASCADE)
    pepparB = models.ForeignKey(Peppar, related_name="pepparB", on_delete=models.CASCADE)
    uuid_field = models.UUIDField(default=uuid.uuid4, unique=True)
    def _str_(self):
        return self.name

