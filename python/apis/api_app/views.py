# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render_to_response
from api_app.models import Person


def home(request):
    p= Person(first_name='Jane', last_name='Doe')
    p.save()
    return render_to_response('index.html',{'this_is_a_template_variable':'Hello Dolly'})

