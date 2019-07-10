import uuid
from django.db import models

# PEPPAR CORE MODELS
class Person(models.Model):
    name = models.CharField(max_length=120)
    uuid_field = models.UUIDField(default=uuid.uuid4, unique=True)
    def _str_(self):
        return self.name

class Entity(models.Model):
    name = models.CharField(max_length=120)
    uuid_field = models.UUIDField(default=uuid.uuid4, unique=True)
    def _str_(self):
        return self.name

class Property(models.Model):
    name = models.CharField(max_length=120)
    uuid_field = models.UUIDField(default=uuid.uuid4, unique=True)
    def _str_(self):
        return self.name

class Plan(models.Model):
    name = models.CharField(max_length=120)
    uuid_field = models.UUIDField(default=uuid.uuid4, unique=True)
    def _str_(self):
        return self.name

class Action(models.Model):
    name = models.CharField(max_length=120)
    uuid_field = models.UUIDField(default=uuid.uuid4, unique=True)
    def _str_(self):
        return self.name

class Result(models.Model):
    name = models.CharField(max_length=120)
    uuid_field = models.UUIDField(default=uuid.uuid4, unique=True)
    def _str_(self):
        return self.name
        