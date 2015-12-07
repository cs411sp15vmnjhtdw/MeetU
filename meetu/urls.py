from django.conf.urls import patterns, url

from . import views
from . import controllers

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^universities/$', controllers.universities.index, name='index'),
    url(r'^universities/(?P<id>[0-9]+)/$', controllers.universities.specific, name='specific'),
    url(r'^likes/$', controllers.likes.index , name='index'),
    url(r'^profile/(?P<id>[0-9]+)/$', controllers.profile.delete, name='delete'),
    url(r'^profile/$', controllers.profile.index , name='index'),
    url(r'^students/$', controllers.students.index, name='index'),
    url(r'^students/update$', controllers.students.update, name='update'),
    url(r'^students/auth/$', controllers.students.auth, name='auth'),
    url(r'^recommendations/$', controllers.recommendations.index, name='index'),
    url(r'^matches/$', controllers.profile.matches, name='matches')
]