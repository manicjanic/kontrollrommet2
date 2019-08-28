from django.contrib import admin

from .models import PACOVType, RelationType, PACOVSubType, RelationSubType, DefaultScheme

class PACOVTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'type',)    

class RelationTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'type')    

class PACOVSubTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'maintype', 'defaultscheme')    

class RelationSubTypeAdmin(admin.ModelAdmin):
    list_display = ('name','maintype', 'defaultscheme')    

class DefaultSchemeAdmin(admin.ModelAdmin):
    list_display = ('scheme',)    

admin.site.register(PACOVType, PACOVTypeAdmin)
admin.site.register(RelationType, RelationTypeAdmin)
admin.site.register(PACOVSubType, PACOVSubTypeAdmin)
admin.site.register(RelationSubType, RelationSubTypeAdmin)
admin.site.register(DefaultScheme, DefaultSchemeAdmin)
