# Generated by Django 2.2.3 on 2019-07-28 23:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_views', '0009_remove_pepparinsight_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='relationinsight',
            name='name',
        ),
    ]