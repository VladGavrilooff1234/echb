# Generated by Django 2.0.7 on 2018-09-17 08:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('galleries', '0006_auto_20180628_0845'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='gallery',
            name='temp_id',
        ),
    ]
