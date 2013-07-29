import simplejson

import sys, traceback

from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate

from data_models import Consumer
from data_models import Address



@csrf_exempt
def add(request):
    if request.POST:
        try:
            post_data= request.raw_post_data
            d= simplejson.loads(post_data)
            d['address']= Address(**d.pop('address'))
            print d
            consumer= Consumer(**d)
            #consumer= Consumer(**simplejson.loads(post_data))
            consumer.create()
        except e:
            traceback.print_exc(file=sys.stdout)
            print e



        #mc.insert(simplejson.loads(post_data), collection='test')

        '''
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
        '''
        return HttpResponse (simplejson.dumps({'status':200, 'message':'OK'}))
    else:
        return HttpResponse (simplejson.dumps({'status':403, 'message': 'Forbidden'}))

def return_consumer(request):
    print request.GET
    return HttpResponse (simplejson.dumps(Consumer.get(**request.GET)))


@csrf_exempt
def auth(request):
    if request.POST:
        user= authenticate (username= request.POST['username'],
                password= request.POST['password'])
        if user:
            login(request, user)
            return HttpResponse (simplejson.dumps({'status':200, 'message':'OK'}))
        else:
            return HttpResponse (simplejson.dumps({'status':403, 'message':'Forbidden'}))

