from django.contrib import admin

from .models import CoreType, CoreRelationType, Category, DefaultScheme

class CoreTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'pacov_type',)
    ordering = ['name']
    
class CoreRelationTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'coretypeA', 'coretypeB')    
    ordering = ['name']

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'coretype', 'defaultscheme')    
    ordering = ['coretype', 'name']

class DefaultSchemeAdmin(admin.ModelAdmin):
    list_display = ('scheme',)    

admin.site.register(CoreType, CoreTypeAdmin)
admin.site.register(CoreRelationType, CoreRelationTypeAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(DefaultScheme, DefaultSchemeAdmin)
