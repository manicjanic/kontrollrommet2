# Generated by Django 2.2.4 on 2019-08-29 00:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0007_category_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='corerelationtype',
            name='categoryA',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='categoryA', to='catalog.Category'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='corerelationtype',
            name='categoryB',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='categoryB', to='catalog.Category'),
            preserve_default=False,
        ),
    ]