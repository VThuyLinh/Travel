# Generated by Django 4.2.16 on 2024-09-19 03:09

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('travel', '0013_alter_bookhotel_checkin_alter_bookhotel_checkout_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='album',
            name='image_id',
        ),
        migrations.AddField(
            model_name='image',
            name='album_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='travel.album'),
        ),
        migrations.AlterField(
            model_name='bookhotel',
            name='Checkin',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 19, 10, 9, 42, 544497)),
        ),
        migrations.AlterField(
            model_name='bookhotel',
            name='Checkout',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 19, 10, 9, 42, 544497)),
        ),
    ]
