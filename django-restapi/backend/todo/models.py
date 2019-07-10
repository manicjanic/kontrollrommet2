import uuid
from django.db import models

# Create your models here.

class Todo(models.Model):
    todo_description = models.CharField(max_length=120)
    todo_responsible = models.CharField(max_length=120)
    todo_priority = models.CharField(max_length=120)
    todo_completed = models.BooleanField(default=False)
    uuid_field = models.UUIDField(default=uuid.uuid4, unique=True)
    def _str_(self):
        return self.todo_description
        