# Generated by Django 2.2.4 on 2019-08-23 07:00

from django.db import migrations
import jsonfield.fields


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0002_auto_20190822_2053'),
    ]

    operations = [
        migrations.AddField(
            model_name='pacovtype',
            name='sub_data',
            field=jsonfield.fields.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='relationtype',
            name='sub_data',
            field=jsonfield.fields.JSONField(blank=True, null=True),
        ),
    ]
