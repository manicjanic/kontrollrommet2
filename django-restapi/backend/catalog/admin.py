from django.contrib import admin

from .models import CoreType, CoreRelationType, Category, DefaultScheme

class CoreTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'pacov_type',)    

class CoreRelationTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'coretypeA', 'coretypeB')    

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'coretype', 'defaultscheme')    

class DefaultSchemeAdmin(admin.ModelAdmin):
    list_display = ('scheme',)    

admin.site.register(CoreType, CoreTypeAdmin)
admin.site.register(CoreRelationType, CoreRelationTypeAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(DefaultScheme, DefaultSchemeAdmin)
