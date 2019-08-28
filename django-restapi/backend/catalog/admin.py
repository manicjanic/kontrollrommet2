from django.contrib import admin

from .models import CoreType, CoreRelationType, PACOVSubType, RelationSubType, DefaultScheme

class CoreTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'pacov_type',)    

class CoreRelationTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'pacovrelation_type')    

class PACOVSubTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'coretype', 'defaultscheme')    

class RelationSubTypeAdmin(admin.ModelAdmin):
    list_display = ('name','coretype', 'defaultscheme')    

class DefaultSchemeAdmin(admin.ModelAdmin):
    list_display = ('scheme',)    

admin.site.register(CoreType, CoreTypeAdmin)
admin.site.register(CoreRelationType, CoreRelationTypeAdmin)
admin.site.register(PACOVSubType, PACOVSubTypeAdmin)
admin.site.register(RelationSubType, RelationSubTypeAdmin)
admin.site.register(DefaultScheme, DefaultSchemeAdmin)
