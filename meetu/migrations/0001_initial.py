# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='EmailDomain',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('domain', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Likes',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('liked', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('url', models.TextField(db_column=b'data', blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('birthdate', models.DateField()),
                ('gender', models.BooleanField()),
                ('gender_preference', models.BooleanField()),
                ('email_domain', models.ForeignKey(to='meetu.EmailDomain')),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='University',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100)),
                ('state', models.CharField(max_length=2)),
                ('city', models.CharField(max_length=50)),
            ],
        ),
        migrations.AddField(
            model_name='photo',
            name='student',
            field=models.ForeignKey(to='meetu.Student'),
        ),
        migrations.AddField(
            model_name='likes',
            name='likee',
            field=models.ForeignKey(related_name='likee', to='meetu.Student'),
        ),
        migrations.AddField(
            model_name='likes',
            name='liker',
            field=models.ForeignKey(related_name='liker', to='meetu.Student'),
        ),
        migrations.AddField(
            model_name='emaildomain',
            name='university',
            field=models.ForeignKey(to='meetu.University'),
        ),
        migrations.AlterUniqueTogether(
            name='likes',
            unique_together=set([('liker', 'likee')]),
        ),
    ]
