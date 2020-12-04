from django import forms
from django.core import validators
from django.forms import ModelForm
from .models import Login

class Loginform(forms.ModelForm):
    class Meta:
        model=Login
        fields="__all__"


#def check(value):
#    if len(value)<8:
#        raise forms.ValidationError("Please provide more than 8 characters.")

#def check(value):
#    if value[0].lower()!='a':
#        raise forms.Validation Error("It must be start with 'a'")

#def clean(self):
#       email=self.cleaned_data['Email']
#       vemail=self.cleaned_data['Varify Email']
#
#       if email!=vemail:
 #           raise forms.ValidationError("Your Email doesn't match")"""