# Generated by Django 2.2.4 on 2019-09-18 11:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0015_auto_20190918_1114'),
    ]

    operations = [
        migrations.RenameField(
            model_name='category',
            old_name='defaultscheme',
            new_name='schema',
        ),
        migrations.RenameField(
            model_name='corerelationtype',
            old_name='defaultscheme',
            new_name='schema',
        ),
    ]
