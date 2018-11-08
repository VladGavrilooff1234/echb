# Generated by Django 2.0.7 on 2018-11-08 04:51

from django.db import migrations


def add_galleries_folder_to_images(apps, editor):

    # apps.get_model('app_name', 'model_name')
    Image = apps.get_model('galleries', 'Image')

    for image in Image.objects.all():
        if image.thumbnail.name.find('galleries/') == -1 and image.image.name.find('galleries/') == -1:
            image.thumbnail.name = 'galleries/' + image.thumbnail.name
            image.image.name = 'galleries/' + image.image.name
            image.save()


def add_galleries_folder_to_gallery(apps, editor):

    # apps.get_model('app_name', 'model_name')
    Gallery = apps.get_model('galleries', 'Gallery')
    for gallery in Gallery.objects.all():
        if gallery.main_image.name.find('galleries/') == -1:
            gallery.main_image.name = 'galleries/' + gallery.main_image.name
            gallery.save()


class Migration(migrations.Migration):

    dependencies = [
        ('galleries', '0007_remove_gallery_temp_id'),
    ]

    operations = [
        migrations.RunPython(add_galleries_folder_to_images),
        migrations.RunPython(add_galleries_folder_to_gallery)
    ]