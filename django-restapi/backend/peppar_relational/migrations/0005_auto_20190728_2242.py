# Generated by Django 2.2.3 on 2019-07-28 22:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('peppar_relational', '0004_auto_20190728_2226'),
    ]

    operations = [
        migrations.RenameField(
            model_name='relation',
            old_name='type_name',
            new_name='type',
        ),
    ]
