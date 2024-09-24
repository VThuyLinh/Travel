from django.contrib import admin
from django.urls import path, re_path, include
import ckeditor_uploader
from rest_framework import routers
from travel import views

r = routers.DefaultRouter()
r.register('User', views.UserViewSet, 'User')
r.register('Tour', views.TourViewSet, 'Tour')
r.register('TourDetail', views.TourViewSetDetail, 'TourDetail')
# r.register('Album', views.AlbumViewSet, 'Album')
r.register('Image',views.ImageViewSet,'Image')
r.register('Customer', views.CustomerViewSet, 'Customer')
r.register('Hotel', views.HotelViewSet, 'Hotel')
r.register('HotelRoom', views.RoomHotelViewSet,'RoomHotel')
r.register('BookTour', views.BookTourViewSet, 'BookTour')
r.register('BookTourDetail', views.BookTourDetailViewSet, 'BookTourDetail')
r.register('News', views.NewsViewSet, 'News')
r.register('NewsDetail', views.NewsDetailViewSet, 'NewsDetail')
r.register('CMT_Tour', views.CMT_TourViewSet, basename='CMT_Tour')
r.register('CMT_News', views.CMT_NewsViewSet, basename='CMT_News')
r.register('Rating_Tour', views.Rating_TourViewSet, basename='Rating_Tour')
r.register('Blog', views.BlogViewSet, basename='Blog')
r.register('BookTicket', views.BookTicketViewSet, basename='BookTicket')
r.register('BookHotel', views.BookHotelViewSet, basename='BookHotel')
r.register('Tag', views.TagViewSet, basename='Tag')
urlpatterns = [
    path('', include(r.urls)),

]
