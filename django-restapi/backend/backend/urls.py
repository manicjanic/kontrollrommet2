"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers                    

from todo import views 
from peppar_base import views as base_views                           

router = routers.DefaultRouter()                      
router.register(r'todos', views.TodoView, 'todo')     

router.register(r'persons', base_views.PersonView, 'person')     
router.register(r'entitys', base_views.EntityView, 'entity') 
router.register(r'propertys', base_views.PropertyView, 'property') 
router.register(r'plans', base_views.PlanView, 'plan')
router.register(r'actions', base_views.ActionView, 'action')      
router.register(r'results', base_views.ResultView, 'result')      

urlpatterns = [
    path('admin/', admin.site.urls), path('api/', include(router.urls))                
]
