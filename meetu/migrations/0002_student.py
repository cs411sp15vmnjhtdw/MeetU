# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meetu', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('email', models.CharField(max_length=200)),
                ('name', models.CharField(max_length=200)),
                ('age', models.IntegerField()),
                ('gender', models.BooleanField(default=False)),
                ('lastAccessTime', models.DateField()),
            ],
        ),
    ]
