# Generated by Django 4.2.16 on 2024-09-19 02:00

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('travel', '0011_alter_bookhotel_checkin_alter_bookhotel_checkout_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bookhotel',
            name='Checkin',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 19, 9, 0, 4, 883306)),
        ),
        migrations.AlterField(
            model_name='bookhotel',
            name='Checkout',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 19, 9, 0, 4, 884036)),
        ),
        migrations.AlterField(
            model_name='image',
            name='Path',
            field=models.ImageField(upload_to='static/imageTour/%Y/%m'),
        ),
    ]
