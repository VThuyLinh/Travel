# Generated by Django 4.2.16 on 2024-09-24 00:29

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('travel', '0025_alter_bookhotel_checkin_alter_bookhotel_checkout_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bookhotel',
            name='Checkin',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 24, 7, 29, 25, 114950)),
        ),
        migrations.AlterField(
            model_name='bookhotel',
            name='Checkout',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 24, 7, 29, 25, 114950)),
        ),
        migrations.AlterField(
            model_name='bookhotel',
            name='id_book_hotel',
            field=models.CharField(default='OK', max_length=10),
        ),
        migrations.AlterField(
            model_name='bookhotel',
            name='id_user_book_hotel',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Customer.bookhotel_set+', to='travel.customer'),
        ),
        migrations.AlterField(
            model_name='bookticket',
            name='id_bookticket',
            field=models.CharField(default='OK', max_length=10),
        ),
        migrations.AlterField(
            model_name='news',
            name='Name_News',
            field=models.CharField(max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name='tag',
            name='name',
            field=models.CharField(max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name='tour',
            name='Id_Tour',
            field=models.CharField(max_length=40, unique=True),
        ),
        migrations.AlterField(
            model_name='tour',
            name='Tour_Name',
            field=models.CharField(max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name='transport',
            name='License',
            field=models.CharField(max_length=15, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='sdt',
            field=models.CharField(max_length=10, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(default='OK', max_length=20, unique=True),
        ),
    ]
