# Generated by Django 4.2.16 on 2024-09-13 14:47

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('travel', '0008_blog_user_post_bookticket_user_book'),
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('DatePost', models.DateTimeField(auto_now_add=True)),
                ('DateUpdate', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=1000)),
                ('description', models.CharField(max_length=7000)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='bookticket',
            name='id_bookticket',
            field=models.CharField(default='', max_length=10),
        ),
        migrations.AddField(
            model_name='booktour',
            name='id_booktour',
            field=models.CharField(default='', max_length=10),
        ),
        migrations.AddField(
            model_name='hotel',
            name='address',
            field=models.CharField(default='', max_length=1000),
        ),
        migrations.CreateModel(
            name='BookHotel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('DatePost', models.DateTimeField(auto_now_add=True)),
                ('DateUpdate', models.DateTimeField(auto_now=True)),
                ('id_book_hotel', models.CharField(default='', max_length=10)),
                ('GuestOrSomeone', models.BooleanField(default=True)),
                ('BreakfastOrNone', models.BooleanField(default=True)),
                ('Checkin', models.DateTimeField(default=datetime.datetime(2024, 9, 13, 21, 47, 14, 787056))),
                ('Checkout', models.DateTimeField(default=datetime.datetime(2024, 9, 13, 21, 47, 14, 787056))),
                ('Quantity_Adult', models.IntegerField(default=1)),
                ('Quantity_Children', models.IntegerField(default=0)),
                ('Room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='travel.room')),
                ('id_hotel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='travel.hotel')),
                ('id_user_book_hotel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='User.bookhotel_set+', to=settings.AUTH_USER_MODEL)),
                ('user_book', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
