from django.contrib import admin

from .models import Peppar

# Register your models here.
class PepparAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'uuid',)

# Register your models here.
admin.site.register(Peppar, PepparAdmin)
