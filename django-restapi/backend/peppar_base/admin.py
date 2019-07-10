from django.contrib import admin

from .models import Person, Entity, Property, Plan, Action, Result

# Register your models here.
class PersonAdmin(admin.ModelAdmin):
    list_display = ('name', 'uuid_field',)

class EntityAdmin(admin.ModelAdmin):
    list_display = ('name', 'uuid_field',)

class PropertyAdmin(admin.ModelAdmin):
    list_display = ('name', 'uuid_field',)

class PlanAdmin(admin.ModelAdmin):
    list_display = ('name', 'uuid_field',)

class ActionAdmin(admin.ModelAdmin):
    list_display = ('name', 'uuid_field',)

class ResultAdmin(admin.ModelAdmin):
    list_display = ('name', 'uuid_field',)

# Register your models here.
admin.site.register(Person, PersonAdmin)
admin.site.register(Entity, EntityAdmin)
admin.site.register(Property, PropertyAdmin)
admin.site.register(Plan, PlanAdmin)
admin.site.register(Action, ActionAdmin)
admin.site.register(Result, ResultAdmin)
