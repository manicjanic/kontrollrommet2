# Generated by Django 2.2.4 on 2019-08-19 23:41

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PACOVType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('type', models.CharField(choices=[('PERSON', 'PERSON'), ('ACTION', 'ACTION'), ('CONCEPT', 'CONCEPT'), ('OBJECT', 'OBJECT'), ('VALUE', 'VALUE')], max_length=8)),
            ],
            options={
                'ordering': ['type'],
            },
        ),
        migrations.CreateModel(
            name='RelationType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('type', models.CharField(choices=[('PER-OBJ', '(PER-OBJ)'), ('PER-ACT', '(PER-ACT)'), ('PER-CON', '(PER-CON)'), ('OBJ-VAL', '(OBJ-VAL)'), ('ACT-VAL', '(ACT-VAL)'), ('ACT-OBJ', '(ACT-OBJ)'), ('CON-ACT', '(CON-ACT)'), ('CON-VAL', '(CON-VAL)'), ('CON-OBJ', '(CON-OBJ)')], max_length=7)),
            ],
            options={
                'ordering': ['type'],
            },
        ),
    ]
