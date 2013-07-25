from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'api_app.views.home', name='home'),
    url(r'^api/$', 'api_app.apis.home', name='home'),
    # main consumer method
    url(r'^api/consumer/add$', 'api_app.consumer.add', name='home'),
    url(r'^api/consumer/authenticate$', 'api_app.consumer.auth', name='home'),
    )
