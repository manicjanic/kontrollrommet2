# Generated by Django 2.2.4 on 2019-08-03 18:15

from django.db import migrations, models
import uuid


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
                ('uuid', models.UUIDField(default=uuid.uuid4, unique=True)),
            ],
        ),
    ]
