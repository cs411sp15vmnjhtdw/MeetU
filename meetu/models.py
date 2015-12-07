from django.db import models
from django.contrib.auth.models import User

class University(models.Model):
    name = models.CharField(max_length=100)
    state = models.CharField(max_length=2)
    city = models.CharField(max_length=50)

class EmailDomain(models.Model):
    domain = models.CharField(max_length=50)
    university = models.ForeignKey(University)

class Student(models.Model):
    user = models.OneToOneField(User)
    birthdate = models.DateField()
    gender = models.BooleanField() # 1 is male, 0 is female
    gender_preference = models.BooleanField() # 1 is male, 0 is female
    email_domain = models.ForeignKey(EmailDomain)

class Photo(models.Model):
    url = models.TextField(db_column='data', blank=True)
    student = models.ForeignKey(Student)

class Likes(models.Model):
    liker = models.ForeignKey(Student, related_name="liker")
    likee = models.ForeignKey(Student, related_name="likee")
    liked = models.BooleanField()
    class Meta:
        unique_together = ('liker', 'likee',)
