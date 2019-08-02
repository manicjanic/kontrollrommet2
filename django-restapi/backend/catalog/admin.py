from django.contrib import admin

from .models import PepparType, RelationType

class PepparTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'type',)    

class RelationTypeAdmin(admin.ModelAdmin):
    list_display = ('name',)    

admin.site.register(PepparType, PepparTypeAdmin)
admin.site.register(RelationType, RelationTypeAdmin)
