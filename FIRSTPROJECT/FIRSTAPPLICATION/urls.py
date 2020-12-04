from django.contrib import admin
from django.urls import path, include
from FIRSTAPPLICATION import views

urlpatterns=[
    path('home',views.home, name='home'),
]