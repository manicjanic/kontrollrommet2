# Generated by Django 2.2.4 on 2019-08-28 23:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='corerelationtype',
            options={'ordering': ['pacovrelation_type']},
        ),
        migrations.RenameField(
            model_name='pacovsubtype',
            old_name='maintype',
            new_name='coretype',
        ),
        migrations.RenameField(
            model_name='relationsubtype',
            old_name='maintype',
            new_name='coretype',
        ),
    ]