# Generated by Django 2.0.7 on 2018-11-09 07:07

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('galleries', '0009_auto_20181108_1224'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gallery',
            name='date',
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='gallery',
            name='main_image',
            field=models.FileField(default='', upload_to='galleries'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='gallery',
            name='tags',
            field=models.ManyToManyField(related_name='galleries', to='galleries.Tag'),
        ),
        migrations.AlterField(
            model_name='gallery',
            name='title',
            field=models.CharField(default='', max_length=200),
            preserve_default=False,
        ),
    ]