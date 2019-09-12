# Generated by Django 2.2.4 on 2019-09-09 12:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0013_auto_20190830_1304'),
        ('pacovbase', '0005_auto_20190830_1304'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='pacov',
            options={},
        ),
        migrations.AlterField(
            model_name='pacov',
            name='category',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='catalog.Category'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='pacov',
            name='idcode',
            field=models.CharField(blank=True, max_length=25, null=True),
        ),
        migrations.AlterUniqueTogether(
            name='pacov',
            unique_together={('category', 'idcode')},
        ),
    ]