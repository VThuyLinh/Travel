# Generated by Django 4.2.16 on 2024-09-20 04:24

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('travel', '0017_remove_room_hotel_alter_bookhotel_checkin_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='schedule',
            name='DatePost',
        ),
        migrations.RemoveField(
            model_name='schedule',
            name='DateUpdate',
        ),
        migrations.AlterField(
            model_name='bookhotel',
            name='Checkin',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 20, 11, 24, 49, 741533)),
        ),
        migrations.AlterField(
            model_name='bookhotel',
            name='Checkout',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 20, 11, 24, 49, 741533)),
        ),
    ]
