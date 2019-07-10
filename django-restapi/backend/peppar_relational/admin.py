from django.contrib import admin

from .models import PersonToEntity, EntityToProperty, PropertyToPerson, PlanToAction, ActionToResult, ResultToPlan
from .models import PersonToPlan, PlanToProperty, PropertyToResult, ResultToEntity, EntityToAction, ActionToPerson
from .models import PersonToResult, ActionToProperty, EntityToPlan

# Register your models here.
class PersonToEntityAdmin(admin.ModelAdmin):
    list_display = ('name', 'person', 'entity', 'uuid_field',)

class EntityToProperyAdmin(admin.ModelAdmin):
    list_display = ('name', 'entity', 'property', 'uuid_field',)

class PropertyToPersonAdmin(admin.ModelAdmin):
    list_display = ('name', 'property', 'person', 'uuid_field',)

class PlanToActionAdmin(admin.ModelAdmin):
    list_display = ('name', 'plan', 'action', 'uuid_field',)

class ActionToResultAdmin(admin.ModelAdmin):
    list_display = ('name', 'action', 'result', 'uuid_field',)

class ResultToPlanAdmin(admin.ModelAdmin):
    list_display = ('name', 'result', 'plan', 'uuid_field',)

#
class PersonToPlanAdmin(admin.ModelAdmin):
    list_display = ('name', 'person', 'plan', 'uuid_field',)

class PlanToPropertyAdmin(admin.ModelAdmin):
    list_display = ('name', 'plan', 'property', 'uuid_field',)

class PropertyToResultAdmin(admin.ModelAdmin):
    list_display = ('name', 'property', 'result', 'uuid_field',)

class ResultToEntityAdmin(admin.ModelAdmin):
    list_display = ('name', 'result', 'entity', 'uuid_field',)

class EntityToActionAdmin(admin.ModelAdmin):
    list_display = ('name', 'entity', 'action', 'uuid_field',)

class ActionToPersonAdmin(admin.ModelAdmin):
    list_display = ('name', 'action', 'person', 'uuid_field',)
#
class PersonToResultAdmin(admin.ModelAdmin):
    list_display = ('name', 'person', 'result', 'uuid_field',)

class ActionToPropertyAdmin(admin.ModelAdmin):
    list_display = ('name', 'action', 'property', 'uuid_field',)

class EntityToPlanAdmin(admin.ModelAdmin):
    list_display = ('name', 'entity', 'plan', 'uuid_field',)


# Register your models here.
admin.site.register(PersonToEntity, PersonToEntityAdmin)
admin.site.register(EntityToProperty, EntityToProperyAdmin)
admin.site.register(PropertyToPerson, PropertyToPersonAdmin)
admin.site.register(PlanToAction, PlanToActionAdmin)
admin.site.register(ActionToResult, ActionToResultAdmin)
admin.site.register(ResultToPlan, ResultToPlanAdmin)
admin.site.register(PersonToPlan, PersonToPlanAdmin)
admin.site.register(PlanToProperty, PlanToPropertyAdmin)
admin.site.register(PropertyToResult, PropertyToResultAdmin)
admin.site.register(ResultToEntity, ResultToEntityAdmin)
admin.site.register(EntityToAction, EntityToActionAdmin)
admin.site.register(ActionToPerson, ActionToPersonAdmin)
admin.site.register(PersonToResult, PersonToResultAdmin)
admin.site.register(ActionToProperty, ActionToPropertyAdmin)
admin.site.register(EntityToPlan, EntityToPlanAdmin)
