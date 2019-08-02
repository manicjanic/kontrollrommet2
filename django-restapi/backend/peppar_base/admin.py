from django.contrib import admin

from .models import Peppar, PepparType

# Register your models here.
class PepparAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'uuid',)

class PepparTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'type',)    

# Register your models here.
admin.site.register(Peppar, PepparAdmin)
admin.site.register(PepparType, PepparTypeAdmin)
