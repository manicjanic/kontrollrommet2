from django.contrib import admin

from .models import CoreType, CoreRelationType, Category, Schema

class CoreTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'pacov_type',)
    ordering = ['name']
    
class CoreRelationTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'coretypeA', 'coretypeB', 'specific_data_schema',)    
    ordering = ['name']

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'coretype', 'specific_data_schema', 'schema')    
    ordering = ['coretype', 'name']

class SchemaAdmin(admin.ModelAdmin):
    list_display = ('specific_data_schema',)    

admin.site.register(CoreType, CoreTypeAdmin)
admin.site.register(CoreRelationType, CoreRelationTypeAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Schema, SchemaAdmin)
