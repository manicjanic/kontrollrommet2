# Generated by Django 2.2.4 on 2019-08-03 18:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('peppar_relational', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='relation',
            name='description',
        ),
    ]