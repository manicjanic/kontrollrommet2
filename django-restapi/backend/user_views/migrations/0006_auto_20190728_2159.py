# Generated by Django 2.2.3 on 2019-07-28 21:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_views', '0005_auto_20190728_2142'),
    ]

    operations = [
        migrations.RenameField(
            model_name='pepparasuser',
            old_name='uuid_field',
            new_name='uuid',
        ),
        migrations.RenameField(
            model_name='pepparrelationasuser',
            old_name='uuid_field',
            new_name='uuid',
        ),
    ]
