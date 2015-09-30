from django.conf.urls import url

from . import views
from . import controllers

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^universities/$', controllers.universities.index, name='index')
]
