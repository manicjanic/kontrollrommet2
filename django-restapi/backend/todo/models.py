from django.db import models

# Create your models here.

class Todo(models.Model):
    todo_description = models.CharField(max_length=120)
    todo_responsible = models.CharField(max_length=120)
    todo_priority = models.CharField(max_length=120)
    todo_completed = models.BooleanField(default=False)

    def _str_(self):
        return self.todo_description
        