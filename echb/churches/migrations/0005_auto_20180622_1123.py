# Generated by Django 2.0.6 on 2018-06-22 08:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('churches', '0004_auto_20180621_1347'),
    ]

    operations = [
        migrations.AlterField(
            model_name='church',
            name='img',
            field=models.FileField(blank=True, null=True, upload_to='churches'),
        ),
    ]
