# Generated by Django 2.2.4 on 2019-08-03 18:19

from django.db import migrations
import jsonfield.fields


class Migration(migrations.Migration):

    dependencies = [
        ('peppar_relational', '0002_remove_relation_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='relation',
            name='specific_data',
            field=jsonfield.fields.JSONField(blank=True, null=True),
        ),
    ]
