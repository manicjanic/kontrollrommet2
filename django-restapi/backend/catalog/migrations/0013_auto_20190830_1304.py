# Generated by Django 2.2.4 on 2019-08-30 13:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0012_corerelationtype_defaultscheme'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='defaultscheme',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='category_related', to='catalog.DefaultScheme'),
        ),
        migrations.AlterField(
            model_name='corerelationtype',
            name='defaultscheme',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='corerelation_related', to='catalog.DefaultScheme'),
        ),
    ]