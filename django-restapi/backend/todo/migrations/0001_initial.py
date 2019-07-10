# Generated by Django 2.2.3 on 2019-07-09 23:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('todo_description', models.CharField(max_length=120)),
                ('todo_responsible', models.CharField(max_length=120)),
                ('todo_priority', models.CharField(max_length=120)),
                ('todo_completed', models.BooleanField(default=False)),
            ],
        ),
    ]