from django.contrib import admin

from .models import PACOV

# Register your models here.
class PACOVAdmin(admin.ModelAdmin):
    list_display = ('name', 'type',)

# Register your models here.
admin.site.register(PACOV, PACOVAdmin)
