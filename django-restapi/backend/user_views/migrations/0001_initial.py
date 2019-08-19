# Generated by Django 2.2.4 on 2019-08-19 22:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('peppar_relational', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('pacovbase', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='RelationInsight',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('level', models.CharField(blank=True, choices=[('0', 'Me'), ('1', 'My'), ('2', 'Close'), ('3', 'Distant')], max_length=1)),
                ('timestamp_created', models.DateTimeField(auto_now_add=True)),
                ('timestamp_updated', models.DateTimeField(auto_now=True)),
                ('relation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='peppar_relational.Relation')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='PepparInsight',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('level', models.CharField(choices=[('0', 'Me'), ('1', 'My'), ('2', 'Close'), ('3', 'Distant')], max_length=1)),
                ('timestamp_created', models.DateTimeField(auto_now_add=True)),
                ('timestamp_updated', models.DateTimeField(auto_now=True)),
                ('peppar', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pacovbase.PACOV')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
