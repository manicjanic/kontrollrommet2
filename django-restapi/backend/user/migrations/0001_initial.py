# Generated by Django 2.2.3 on 2019-07-11 20:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('peppar_base', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserAccess',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('level', models.CharField(blank=True, choices=[('0', 'Me'), ('1', 'All Access'), ('2', 'Limited Access'), ('3', 'Hidden')], max_length=1)),
                ('uuid_field', models.UUIDField(default=uuid.uuid4, unique=True)),
                ('peppar', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='peppar_base.Peppar')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]