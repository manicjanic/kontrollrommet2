# Generated by Django 2.2.4 on 2019-08-09 10:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('peppar_base', '0006_remove_peppar_question_meaning'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='peppar',
            name='dateA_meaning',
        ),
        migrations.RemoveField(
            model_name='peppar',
            name='dateB_meaning',
        ),
        migrations.RemoveField(
            model_name='peppar',
            name='idcode_meaning',
        ),
    ]
