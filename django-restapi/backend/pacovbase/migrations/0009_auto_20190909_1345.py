# Generated by Django 2.2.4 on 2019-09-09 13:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pacovbase', '0008_auto_20190909_1338'),
    ]

    operations = [
        migrations.AlterField(
            model_name='relation',
            name='type',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='catalog.CoreRelationType'),
        ),
        migrations.AlterUniqueTogether(
            name='pacov',
            unique_together=set(),
        ),
    ]