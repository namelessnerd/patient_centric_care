import simplejson

from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate

@csrf_exempt
def add(request):
    if request.POST:
        post_data= request.POST
        print post_data['first_name']
        print post_data['last_name']
        print post_data['email']
        u= User(first_name= post_data['first_name'],
                last_name= post_data['last_name'],
                email=post_data['email'],
                username= post_data['username'])
        u.save()
        u.set_password('1234')
        u.save()

        return HttpResponse (simplejson.dumps({'status':'200 OK'}))
    else:
        return HttpResponse (simplejson.dumps({'status':'403 Forbidden'}))

@csrf_exempt
def auth(request):
    if request.POST:
        user= authenticate (username= request.POST['username'],
                password= request.POST['password'])
        if user:
            login(request, user)
            return HttpResponse (simplejson.dumps({'status':'200 OK'}))
        else:
            return HttpResponse (simplejson.dumps({'status':'403 NOK'}))

