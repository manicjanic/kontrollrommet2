from django.contrib import admin
from .models import Todo # add this
# Register your models here.
class TodoAdmin(admin.ModelAdmin):  # add this
    list_display = ('todo_description', 'todo_responsible', 'todo_priority', 'todo_completed') # add this

# Register your models here.
admin.site.register(Todo, TodoAdmin) # add this