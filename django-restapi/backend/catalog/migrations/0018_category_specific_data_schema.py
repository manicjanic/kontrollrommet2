# Generated by Django 2.2.4 on 2019-09-18 12:01

from django.db import migrations
import jsonfield.fields


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0017_auto_20190918_1123'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='specific_data_schema',
            field=jsonfield.fields.JSONField(blank=True, default=dict, null=True),
        ),
    ]
