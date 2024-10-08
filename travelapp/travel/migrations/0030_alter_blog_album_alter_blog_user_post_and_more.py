# Generated by Django 4.2.16 on 2024-10-03 03:17

import cloudinary.models
import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('travel', '0029_blog_album_alter_blog_user_post_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='album',
            field=models.ForeignKey(default=14, null=True, on_delete=django.db.models.deletion.CASCADE, to='travel.album'),
        ),
        migrations.AlterField(
            model_name='blog',
            name='user_post',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='travel.customer'),
        ),
        migrations.AlterField(
            model_name='bookhotel',
            name='Checkin',
            field=models.DateTimeField(default=datetime.datetime(2024, 10, 3, 10, 17, 44, 785232)),
        ),
        migrations.AlterField(
            model_name='bookhotel',
            name='Checkout',
            field=models.DateTimeField(default=datetime.datetime(2024, 10, 3, 10, 17, 44, 785232)),
        ),
        migrations.AlterField(
            model_name='cmt_blog',
            name='content',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='cmt_blog',
            name='image',
            field=cloudinary.models.CloudinaryField(default='https://cloundinary', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='cmt_blog',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='travel.customer'),
        ),
        migrations.AlterField(
            model_name='cmt_news',
            name='content',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='cmt_news',
            name='image',
            field=cloudinary.models.CloudinaryField(default='https://cloundinary', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='cmt_news',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='travel.customer'),
        ),
        migrations.AlterField(
            model_name='cmt_tour',
            name='content',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='cmt_tour',
            name='image',
            field=cloudinary.models.CloudinaryField(default='https://cloundinary', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='cmt_tour',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='travel.customer'),
        ),
        migrations.AlterField(
            model_name='user',
            name='sdt',
            field=models.CharField(max_length=10),
        ),

    ]
