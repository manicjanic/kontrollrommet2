# Generated by Django 2.2.4 on 2019-08-28 23:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0004_delete_relationsubtype'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='coretype',
            name='sub_data',
        ),
    ]
