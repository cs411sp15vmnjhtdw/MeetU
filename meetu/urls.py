from django.conf.urls import url

from . import views
from . import controllers

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^universities/$', controllers.universities.index, name='index'),
    url(r'^universities/(?P<id>[0-9]+)/$', controllers.universities.specific, name='specific'),
    url(r'^likes/$', controllers.likes.index , name='index')
]
