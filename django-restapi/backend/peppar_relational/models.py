import uuid
from django.db import models
from peppar_base.models import Person, Entity, Property, Plan, Action, Result

# PEPPAR RELATIONAL MODELS
#PEP TRIANGLE
class PersonToEntity(models.Model):
    name = models.CharField(max_length=120)
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    entity = models.ForeignKey(Entity, on_delete=models.CASCADE)
    uuid_field = models.UUIDField(default=uuid.uuid4, unique=True)
    def _str_(self):
        return self.name

class EntityToProperty(models.Model):
    name = models.CharField(max_length=120)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    entity = models.ForeignKey(Entity, on_delete=models.CASCADE)
    uuid_field = models.UUIDField(default=uuid.uuid4, unique=True)
    def _str_(self):
        return self.name

class PropertyToPerson(models.Model):
    name = models.CharField(max_length=120)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    uuid_field = models.UUIDField(default=uuid.uuid4, unique=True)
    def _str_(self):
        return self.name

#PAR TRIANGLE
class PlanToAction(models.Model):
    name = models.CharField(max_length=120)
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE)
    action = models.ForeignKey(Action, on_delete=models.CASCADE)
    uuid_field = models.UUIDField(default=uuid.uuid4, unique=True)
    def _str_(self):
        return self.name

class ActionToResult(models.Model):
    name = models.CharField(max_length=120)
    action = models.ForeignKey(Action, on_delete=models.CASCADE)
    result = models.ForeignKey(Result, on_delete=models.CASCADE)
    uuid_field = models.UUIDField(default=uuid.uuid4, unique=True)
    def _str_(self):
        return self.name

class ResultToPlan(models.Model):
    name = models.CharField(max_length=120)
    result = models.ForeignKey(Result, on_delete=models.CASCADE)
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE)
    uuid_field = models.UUIDField(default=uuid.uuid4, unique=True)
    def _str_(self):
        return self.name
        
#OUTLINE
class PersonToPlan(models.Model):
    name = models.CharField(max_length=120)
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE)
    uuid_field = models.UUIDField(default=uuid.uuid4, unique=True)
    def _str_(self):
        return self.name

class PlanToProperty(models.Model):
    name = models.CharField(max_length=120)
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    uuid_field = models.UUIDField(default=uuid.uuid4, unique=True)
    def _str_(self):
        return self.name

class PropertyToResult(models.Model):
    name = models.CharField(max_length=120)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    result = models.ForeignKey(Result, on_delete=models.CASCADE)
    uuid_field = models.UUIDField(default=uuid.uuid4, unique=True)
    def _str_(self):
        return self.name

class ResultToEntity(models.Model):
    name = models.CharField(max_length=120)
    result = models.ForeignKey(Result, on_delete=models.CASCADE)
    entity = models.ForeignKey(Entity, on_delete=models.CASCADE)
    uuid_field = models.UUIDField(default=uuid.uuid4, unique=True)
    def _str_(self):
        return self.name

class EntityToAction(models.Model):
    name = models.CharField(max_length=120)
    entity = models.ForeignKey(Entity, on_delete=models.CASCADE)
    action = models.ForeignKey(Action, on_delete=models.CASCADE)
    uuid_field = models.UUIDField(default=uuid.uuid4, unique=True)
    def _str_(self):
        return self.name

class ActionToPerson(models.Model):
    name = models.CharField(max_length=120)
    action = models.ForeignKey(Action, on_delete=models.CASCADE)
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    uuid_field = models.UUIDField(default=uuid.uuid4, unique=True)
    def _str_(self):
        return self.name

#CROSSOVERS
class PersonToResult(models.Model):
    name = models.CharField(max_length=120)
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    result = models.ForeignKey(Result, on_delete=models.CASCADE)
    uuid_field = models.UUIDField(default=uuid.uuid4, unique=True)
    def _str_(self):
        return self.name

class ActionToProperty(models.Model):
    name = models.CharField(max_length=120)
    action = models.ForeignKey(Action, on_delete=models.CASCADE)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    uuid_field = models.UUIDField(default=uuid.uuid4, unique=True)
    def _str_(self):
        return self.name

class EntityToPlan(models.Model):
    name = models.CharField(max_length=120)
    entity = models.ForeignKey(Entity, on_delete=models.CASCADE)
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE)
    uuid_field = models.UUIDField(default=uuid.uuid4, unique=True)
    def _str_(self):
        return self.name





