import datetime

from django.shortcuts import render
from rest_framework import viewsets, generics, status, parsers, permissions
from travel.models import *
from travel import serializers, permission
import datetime
from rest_framework.decorators import action
from rest_framework.response import Response
from travel import paginators


# Create your views here.


# class AlbumViewSet(viewsets.ViewSet, generics.RetrieveAPIView):
#     queryset = Album.objects
#     serializer_class = serializers.AlbumSerializer

# @action(methods=['delete'], url_path='DeleteAlbum', detail=True)
# def delete(self, request, pk):
#     queryset = Album.objects.get(pk=pk)
#     queryset.delete()
#     return Response(status=status.HTTP_204_NO_CONTENT)


class ImageViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Image.objects
    serializer_class = serializers.ImageSerializer


class CustomerViewSet(viewsets.ViewSet, generics.ListCreateAPIView):
    queryset = Customer.objects
    serializer_class = serializers.CustomerSerializer

    def get_queryset(self):
        queryset = self.queryset
        q = self.request.query_params.get('username')
        if q:
            queryset = queryset.filter(username=q, lastname=q)
        return queryset

    @action(methods=['get'], url_path='getCustomerId', detail=True)
    def get_customer(self, request, pk):
        customer = Customer.objects.get(pk=pk)
        return Response(serializers.UserSerializer(customer).data,
                        status=status.HTTP_200_OK)

    @action(methods=['get'], url_path='getCustomerId', detail=True)
    def get_customer(self, request, pk):
        customer = Customer.objects.get(pk=pk)
        return Response(serializers.UserSerializer(customer).data,
                        status=status.HTTP_200_OK)

    @action(methods=['delete'], url_path='delete_customer', detail=True)
    def delete(self, request, pk):
        queryset = Customer.objects.filter(vaitro="VaiTro.Customer")
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TourViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Tour.objects.filter(Active=True)
    serializer_class = serializers.TourSerializer
    pagination_class = paginators.TourPaginator

    def get_queryset(self):
        queryset = self.queryset
        q = self.request.query_params.get('Price')
        if q:
            queryset = queryset.filter(Adult_price=float(q))

        DeparturePlace = self.request.query_params.get('noidi')
        Destination = self.request.query_params.get('noiden')
        if DeparturePlace:
            queryset = queryset.filter(DeparturePlace__Place_Name__icontains=DeparturePlace)
        if Destination:
            queryset = queryset.filter(Destination__Place_Name__icontains=Destination)
        DepartureTime = self.request.query_params.get('thoigiandi')

        if DepartureTime:
            queryset = queryset.filter(DepartureTime__DepartureDay__icontains=DepartureTime)
        return queryset


class TourViewSetDetail(viewsets.ViewSet, generics.RetrieveAPIView):
    queryset = Tour.objects.filter(Active=True)
    serializer_class = serializers.TourSerializerDetail

    @action(methods=['post'], url_path='create_cmt_tour', detail=True)
    def create_cmt_tour(self, request, pk):
        cmt_tour = self.get_object().cmt_tour_set.create(content=request.data.get('content'), user=request.user)
        return Response(serializers.CMT_TourSerializer(cmt_tour).data)

    @action(methods=['post'], url_path='create_rating_tour', detail=True)
    def create_rating_tour(self, request, pk):
        rating_tour = self.get_object().rating_tour_set.create(NumberOfStart=request.data.get('NumberOfStart'),
                                                               user=request.user)
        return Response(serializers.CMT_TourSerializer(rating_tour).data)

    @action(methods=['get'], url_path='get_like_tour', detail=True)
    def like_tour(self, request, pk):
        like_tour = Like_Tour.objects
        return Response(serializers.Like_TourSerializer(like_tour, many=True).data)

    @action(methods=['post'], url_path='like_tour', detail=True)
    def like(self, request, pk):
        li, created = Like_Tour.objects.get_or_create(tour=self.get_object(),
                                                      user=request.user)

        if not created:
            li.Active = not li.Active
            li.save()

        return Response(serializers.TourSerializerDetail(self.get_object()).data, status=status.HTTP_201_CREATED)


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = serializers.UserSerializer
    parser_classes = [parsers.MultiPartParser, ]

    @action(methods=['patch'], url_path='changepassword', detail=False)
    def get_change_password(self, request):
        user = request.user
        if request.method.__eq__('PATCH'):
            for k, v in request.data.items():
                setattr(user, k, v)
            user.save()

        return Response(serializers.UserSerializer(user).data)

    def get_permissions(self):
        if self.action in ['get_current_user']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get', 'patch'], url_path='current-user', detail=False)
    def get_current_user(self, request):
        user = request.user
        if request.method.__eq__('PATCH'):
            for k, v in request.data.items():
                setattr(user, k, v)
            user.save()

        return Response(serializers.UserSerializer(user).data)


class NewsViewSet(viewsets.ViewSet, generics.ListCreateAPIView):
    queryset = News.objects.filter(active=True)
    serializer_class = serializers.NewsSerializer

    def get_queryset(self):
        queryset = self.queryset
        q = self.request.query_params.get('news')
        if q:
            queryset = queryset.filter(Name_News__icontains=q)
        return queryset


class NewsDetailViewSet(viewsets.ViewSet, generics.RetrieveAPIView):
    queryset = News.objects
    serializer_class = serializers.NewsDetailSerializer

    @action(methods=['delete'], url_path='delete_news', detail=True)
    def delete(self, request, pk):
        queryset = News.objects.get(pk=pk)
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(methods=['post'], url_path='create_cmt_news', detail=True)
    def create_cmt_tour(self, request, pk):
        cmt_news = self.get_object().cmt_news_set.create(content=request.data.get('content'), user=request.user)
        return Response(serializers.CMT_NewsSerializer(cmt_news).data)

    @action(methods=['post'], url_path='like_news', detail=True)
    def like(self, request, pk):
        li, created = Like_News.objects.get_or_create(news=self.get_object(),
                                                      user=request.user)

        if not created:
            li.Active = not li.Active
            li.save()

        return Response(serializers.NewsDetailSerializer(self.get_object()).data, status=status.HTTP_201_CREATED)


class BookTourViewSet(viewsets.ViewSet, generics.ListCreateAPIView):
    queryset = BookTour.objects
    serializer_class = serializers.BookTourSerializer
    parser_classes = [parsers.MultiPartParser, ]

    @action(methods=['get'], url_path='BooktourId', detail=True)
    def get_queryset(self):
        queryset = self.queryset
        id = self.request.query_params.get('id')
        if id:
            queryset = queryset.filter(id_booktour__icontains=id)
        return queryset

    @action(methods=['delete'], url_path='delete_booktour', detail=True)
    def delete(self, request, pk):
        queryset = BookTour.objects.get(pk=pk)
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(methods=['get'], url_path='getBookTourUId', detail=True)
    def get_booktour_Uid(self, request, pk):
        customerbt = BookTour.objects.get(id_customer_bt_id=pk)
        return Response(serializers.BookTourSerializer(customerbt).data,
                        status=status.HTTP_200_OK)


class BookHotelViewSet(viewsets.ViewSet, generics.ListCreateAPIView):
    queryset = BookHotel.objects
    serializer_class = serializers.BookHotelSerializer
    parser_classes = [parsers.MultiPartParser, ]

    @action(methods=['delete'], url_path='deleteBookHotel', detail=True)
    def delete(self, request, pk):
        queryset = BookHotel.objects.get(pk=pk)
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(methods=['get'], url_path='getBookTourUId', detail=True)
    def get_bookhotel_uid(self, request, pk):
        customerbh = BookHotel.objects.get(id_user_book_hotel_id=pk)
        return Response(serializers.BookHotelSerializer(customerbh).data,
                        status=status.HTTP_200_OK)

    @action(methods=['get'], url_path='BookHotelId', detail=True)
    def get_queryset(self):
        queryset = self.queryset
        id = self.request.query_params.get('id')
        if id:
            queryset = queryset.filter(id_book_hotel__icontains=id)
        return queryset


class BookTicketViewSet(viewsets.ViewSet, generics.ListCreateAPIView):
    queryset = BookTicket.objects
    serializer_class = serializers.BookTicketSerializer
    parser_classes = [parsers.MultiPartParser, ]

    @action(methods=['delete'], url_path='delete_booktour', detail=True)
    def delete(self, request, pk):
        queryset = BookTour.objects.get(pk=pk)
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(methods=['get'], url_path='getBookTicketUId', detail=True)
    def get_bookticket_uid(self, request, pk):
        customerbticket = BookHotel.objects.get(id_book_ticket=pk)
        return Response(serializers.BookHotelSerializer(customerbticket).data,
                        status=status.HTTP_200_OK)

    @action(methods=['get'], url_path='get_bookticket', detail=True)
    def get_queryset(self):
        queryset = self.queryset
        id = self.request.query_params.get('id')
        if id:
            queryset = queryset.filter(id__icontains=id)
        return queryset


class BlogViewSet(viewsets.ViewSet, generics.ListCreateAPIView):
    queryset = Blog.objects
    serializer_class = serializers.BlogSerializer
    parser_classes = [parsers.MultiPartParser, ]

    @action(methods=['get'], url_path='get_blog', detail=True)
    def get_queryset(self):
        queryset = self.queryset
        id = self.request.query_params.get('id')
        if id:
            queryset = queryset.filter(id__icontains=id)
        return queryset

    @action(methods=['delete'], url_path='delete_blog', detail=True)
    def delete(self, request, pk):
        queryset = Blog.objects.get(pk=pk)
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(methods=['post'], url_path='create_cmt_blog', detail=True)
    def create_cmt_blog(self, request, pk):
        cmt_blog = self.get_object().cmt_blog_set.create(content=request.data.get('content'), user=request.user)
        return Response(serializers.CMT_TourSerializer(cmt_blog).data)

    @action(methods=['get'], url_path='get_like_blog', detail=True)
    def like_blog(self, request, pk):
        like_blog = Like_Blog.objects
        return Response(serializers.Like_BlogSerializer(like_blog, many=True).data)

    @action(methods=['post'], url_path='like_blog', detail=True)
    def like(self, request, pk):
        li, created = Like_Blog.objects.get_or_create(blog=self.get_object(),
                                                      user=request.user)

        if not created:
            li.Active = not li.Active
            li.save()

        return Response(serializers.BlogSerializer(self.get_object()).data, status=status.HTTP_201_CREATED)


# class DeleteUserViewSet(viewsets.ViewSet, generics.DestroyAPIView):

# class AdminViewSet(viewsets.ViewSet, generics.CreateAPIView):
#     serializer_class = serializers.UserSerializer
#     parser_classes = [parsers.MultiPartParser, ]
#
#     def get_queryset(self):
#         queryset = self.queryset
#         ten = self.request.query_params.get('Name')
#         if ten:
#             queryset = queryset.filter(last_name__icontains=ten)
#         return queryset
#
#     @action(methods=['delete'], url_path='delete_admin', detail=True)
#     def delete(self, request, pk):
#         queryset = Admin.objects.filter(vaitro="VaiTro.Admin")
#         queryset.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
#
#     @action(methods=['get'], url_path='get_admin', detail=True)
#     def get_admin(self, request, pk):
#         admins = Admin.objects.get(pk=pk)
#         return Response(serializers.UserSerializer(admins).data,
#                         status=status.HTTP_200_OK)

class RoomHotelViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = HotelRoom.objects
    serializer_class = serializers.HotelRoomSerializer

    def get_queryset(self):
        queryset = self.queryset
        q = self.request.query_params.get('type')
        p = self.request.query_params.get('Price')
        if q:
            queryset = queryset.filter(id_room=q)
        if p:
            queryset = queryset.filter(Price=q)
        return queryset


class HotelViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Hotel.objects
    serializer_class = serializers.HotelSerializer

    def get_queryset(self):
        queryset = self.queryset
        q = self.request.query_params.get('Name')
        if q:
            queryset = queryset.filter(nameofhotel=q)
        return queryset

    @action(methods=['get'], url_path='get_like_hotel', detail=True)
    def like_hotel(self, request, pk):
        like_hotel = Like_Hotel.objects
        return Response(serializers.Like_BlogSerializer(like_hotel, many=True).data)

    @action(methods=['post'], url_path='like_hotel', detail=True)
    def like(self, request, pk):
        li, created = Like_Hotel.objects.get_or_create(hotel=self.get_object(),
                                                       user=request.user)

        if not created:
            li.Active = not li.Active
            li.save()

        return Response(serializers.HotelSerializer(self.get_object()).data, status=status.HTTP_201_CREATED)


class BookTourDetailViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = BookTour.objects
    serializer_class = serializers.BookTourSerializer


class CMT_TourViewSet(viewsets.ViewSet, generics.RetrieveAPIView, generics.DestroyAPIView, generics.UpdateAPIView):
    queryset = CMT_Tour.objects.all()
    serializer_class = serializers.CMT_TourSerializer
    permission_classes = [permission.CMTOwner]


class CMT_NewsViewSet(viewsets.ViewSet, generics.DestroyAPIView, generics.RetrieveAPIView, generics.UpdateAPIView):
    queryset = CMT_News.objects.all()
    serializer_class = serializers.CMT_NewsSerializer
    permission_classes = [permission.CMTOwner]


class CMT_BlogViewSet(viewsets.ViewSet, generics.DestroyAPIView, generics.RetrieveAPIView, generics.UpdateAPIView):
    queryset = CMT_Blog.objects.all()
    serializer_class = serializers.CMT_BlogSerializer
    permission_classes = [permission.CMTOwner]


class Rating_TourViewSet(viewsets.ViewSet, generics.RetrieveAPIView, generics.DestroyAPIView):
    queryset = Rating_Tour.objects.all()
    serializer_class = serializers.RatingTourSerializer
    permission_classes = [permission.CMTOwner]


class TagViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = serializers.TagSerializer
