from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'api_app.views.home', name='home'),
    url(r'^apis/$', 'api_app.apis.home', name='home'),
    url(r'^apis/(\d+)/careplan$', 'api_app.apis.careplan', name='home'),
    # url(r'^apis/', include('apis.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
