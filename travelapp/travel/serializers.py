from django.contrib.auth.password_validation import validate_password
from drf_yasg.utils import swagger_auto_schema
from rest_framework import serializers
from travel.models import *


class TransportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transport
        fields = ['Name', 'License']


class DeparturePlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ['Place_Name']


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['name']


class DepartureTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduleTime
        fields = ['DepartureTime']


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = '__all__'


class BookHotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookHotel
        fields = '__all__'


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'Path', 'album_id']


class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ['id']


class TourSerializer(serializers.ModelSerializer):
    vehicle = TransportSerializer()
    DeparturePlace = DeparturePlaceSerializer()
    Destination = DeparturePlaceSerializer()
    DepartureTime = DepartureTimeSerializer()

    class Meta:
        model = Tour
        fields = '__all__'


class HotelRoomSerializer(serializers.ModelSerializer):
    id_room = RoomSerializer()

    class Meta:
        model = HotelRoom
        fields = ['id_room', 'Price']


class TourSerializerDetail(serializers.ModelSerializer):
    vehicle = TransportSerializer()
    DeparturePlace = DeparturePlaceSerializer()
    Destination = DeparturePlaceSerializer()
    DepartureTime = DepartureTimeSerializer()
    cmt_tour = serializers.SerializerMethodField()
    rating_tour = serializers.SerializerMethodField()
    album = AlbumSerializer()

    def get_cmt_tour(self, pk):
        tour_cmt = pk.cmt_tour_set.all()
        return [{'user': a.user.username, 'content': a.content} for a in tour_cmt]

    def get_like_tour(self, pk):
        tour_like = pk.like_tour_set.all()
        return [{'user': a.user.first_name + " " + a.user.last_name, 'Active': a.Active} for a in tour_like]

    def get_rating_tour(self, pk):
        tour_rating = pk.rating_tour_set.all()
        return [{'user': rt.user.first_name + " " + rt.user.last_name, 'NumberOfStar': rt.NumberOfStar} for rt in
                tour_rating]

    class Meta:
        model = Tour
        fields = ['album', 'cmt_tour', 'rating_tour', 'Id_Tour', 'Tour_Name', 'DeparturePlace', 'Destination',
                  'vehicle', 'DepartureTime', 'Description', 'Days', 'Nights', 'Adult_price', 'Children_price']


class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        data = validated_data.copy()
        user = User(**data)
        user.set_password(user.password)
        user.save()

        return user

    class Meta:
        model = User

        fields = ['id', 'first_name', 'last_name', 'email', 'username', 'password', 'address', 'vaitro', 'Avatar',
                  'sdt', 'Cover']

        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }


# class CustomerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Customer
#         fields = UserSerializer.Meta.fields + ['user_ptr_id']


class AdminSerializer(UserSerializer):
    class Meta:
        model = Admin
        fields = UserSerializer.Meta.fields + ['DateAdd']


class ChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ['password']

    def update(self, instance, validated_data):
        instance.set_password(validated_data['password'])
        instance.save()

        return instance


class BookHotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookHotel
        fields = '__all__'


class BookTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookTicket
        fields = ['OneOrReturn', 'Quantity_Adult', 'Quantity_Children', 'SeatClass',
                  'user_book']


class CustomerSerializer(serializers.ModelSerializer):

    def create(self, validate_data):
        return Customer.objects.create_user(**validate_data)

    class Meta:
        model = Customer

        fields = '__all__'

        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }


class TourSerializer1(serializers.ModelSerializer):
    class Meta:
        model = Tour
        fields = ['Tour_Name']


class BookTourSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookTour
        fields = '__all__'


class BlogSerializer(serializers.ModelSerializer):
    cmt_blog = serializers.SerializerMethodField()

    def get_cmt_blog(self, pk):
        blog_cmt = pk.cmt_blog_set.all()
        return [{'user': a.user.first_name + " " + a.user.last_name, 'content': a.content} for a in blog_cmt]

    def get_like_blog(self, pk):
        blog_like = pk.like_blog_set.all()
        return [{'user': a.user.first_name + " " + a.user.last_name, 'Active': a.Active} for a in blog_like]

    class Meta:
        model = Blog
        fields = ['name', 'content', 'cmt_blog']


class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'


class Like_TourSerializer(serializers.ModelSerializer):
    tour = TourSerializer()

    class Meta:
        model = Like_Tour
        fields = ['tour', 'Active']


class Like_BlogSerializer(serializers.ModelSerializer):
    blog = BlogSerializer()

    class Meta:
        model = Like_Blog
        fields = ['blog', 'Active']


class Like_NewsSerializer(serializers.ModelSerializer):
    news = NewsSerializer()

    class Meta:
        model = Like_News
        fields = ['news', 'Active']


class CMTSerializer(serializers.ModelSerializer):
    class Meta:
        model = CMT
        fields = ['content', 'user']


class RatingTourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating_Tour
        fields = '__all__'


class CMT_TourSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = CMT_Tour
        fields = ['id', 'content', 'image', 'user']


class CMT_BlogSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = CMT_Blog
        fields = ['id', 'content', 'image', 'user']


class CMT_NewsSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = CMT_News
        fields = ['id', 'content', 'image', 'user']


class LocationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = location
        fields = ['kdo','vdo','diadiem','id','locationofuser','DatePost']



class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ['Name_News', 'image_thumbnail', 'content']

class NewsDetailSerializer(NewsSerializer):
    cmt_news = serializers.SerializerMethodField()


    def get_cmt_news(self, pk):
        news_cmt = pk.cmt_news_set.all()
        return [{'user': a.user.first_name + " " + a.user.last_name,'avatar':a.user.Avatar, 'content': a.content} for a in news_cmt]

    def get_like_news(self, pk):
        news_like = pk.like_news_set.all()
        return [{'user': a.user.first_name + " " + a.user.last_name,'id':a.user.id, 'Active': a.Active} for a in news_like]

    class Meta:
        model = News
        fields = ['id','Name_News','content','image_thumbnail','cmt_news']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'





# class AuthenticatedTourDetailsSerializer(TourSerializerDetail):
#     liked = serializers.SerializerMethodField()
#
#     def get_liked(self, tour):
#         return tour.like_set.filter(active=True).exists()
#
#     class Meta:
#         model = TourSerializerDetail.Meta.model
#         fields = ['__all__','like']
