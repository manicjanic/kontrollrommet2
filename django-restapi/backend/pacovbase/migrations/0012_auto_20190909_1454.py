# Generated by Django 2.2.4 on 2019-09-09 14:54

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pacovbase', '0011_auto_20190909_1417'),
    ]

    operations = [
        migrations.AlterField(
            model_name='relation',
            name='idcode',
            field=models.CharField(blank=True, max_length=25, null=True),
        ),
        migrations.AlterField(
            model_name='relation',
            name='specific_data',
            field=django.contrib.postgres.fields.jsonb.JSONField(blank=True, default=dict, null=True),
        ),
    ]