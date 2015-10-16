from django.db import models

class University(models.Model):
    name = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    city = models.CharField(max_length=200)

class Student(models.Model):
    university = models.ForeignKey(University)
    email = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    age = models.IntegerField()
    gender = models.BooleanField(default=False)
    lastAccessTime = models.DateField()
