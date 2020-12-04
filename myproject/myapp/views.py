from django.shortcuts import render
from django.shortcuts import HttpResponse, redirect
from .import forms
from .forms import Loginform
# Create your views here.
#function base views
#class base views
#def home(request):
#     return HttpResponse("Hello! this is my web page")
# def about(request):
#     return HttpResponse("Hello! this is my about page")
# def contact(request):
#     return HttpResponse("Hello! this is my contact page")
def home(request):
    return render(request,"myapp/home.html")  

#def form_view(request):
#     if request.method=="POST":
#         form=forms.Loginform(request.POST)
#         if form.is_valid():
#             print("Congratulations! Your data has been approved.")
#             print("Name:"+ form.cleaned_data['name'])
#             print("Name:"+ form.cleaned_data['Email'])
#             print("Name:"+ form.cleaned_data['text'])

#     form=forms.Loginform
#     return render(request,"myapp/index.html",{'form':form})

def create(request):
    
    if request.method=="POST":
        form=forms.Loginform(request.POST)
        
        if form.is_valid():
            try:
                form.save()
                return redirect("success")
            except:
                print("Error saving")
            
    else:
        form=forms.Loginform()
        
    return render(request,'myapp/index.html',{'form':form})

def success(request,register=""):
    register=register.objects.all()
    # Loginform=Loginform.objects.all()
    return render (request,'myapp/success.html',{'Loginform':Loginform})