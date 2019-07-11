from django.contrib import admin

from .models import PepparRelation

# Register your models here.
class PepparRelationAdmin(admin.ModelAdmin):
    list_display = ('get_pepparA', 'name', 'get_pepparB', 'uuid_field',)

    def get_pepparA(self, obj):
        return obj.pepparA.name
    
    def get_pepparB(self, obj):
        return obj.pepparB.name

# Register your models here.
admin.site.register(PepparRelation, PepparRelationAdmin)
