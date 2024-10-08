# Generated by Django 4.2.16 on 2024-10-07 04:14

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('travel', '0034_remove_bookticket_departureplace_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blog',
            name='tag',
        ),
        migrations.AddField(
            model_name='tag',
            name='blog',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='travel.blog'),
        ),
        migrations.AlterField(
            model_name='bookhotel',
            name='Checkin',
            field=models.DateTimeField(default=datetime.datetime(2024, 10, 7, 11, 14, 42, 701792)),
        ),
        migrations.AlterField(
            model_name='bookhotel',
            name='Checkout',
            field=models.DateTimeField(default=datetime.datetime(2024, 10, 7, 11, 14, 42, 701792)),
        ),
    ]
