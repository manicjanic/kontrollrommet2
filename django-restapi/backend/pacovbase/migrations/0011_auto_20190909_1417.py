# Generated by Django 2.2.4 on 2019-09-09 14:17

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pacovbase', '0010_auto_20190909_1407'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pacov',
            name='specific_data',
            field=django.contrib.postgres.fields.jsonb.JSONField(blank=True, default=dict, null=True),
        ),
    ]