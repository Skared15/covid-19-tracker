from django.contrib import admin
from django.urls import path, include
from myapp import views

urlpatterns = [
    path("home", views.home, name="home"),
    path("register/",views.create,name="Register" ),
    path("success",views.success,name="success"),
]