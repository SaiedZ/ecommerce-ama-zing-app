from django.urls import path
from . import views

urlpatterns = [
    path('', views.getUsers, name="users"),
    path('login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('profile/', views.getUserProfile, name="users-profile"),
    path('profile/update/',
         views.updateUserProfile,
         name="user-profile-update"),
    path('register/', views.registerUser, name='register'),
    path('delete/<str:pk>/', views.deleteUser, name='user-delete'),
    path('<str:pk>/', views.getUserById, name='user'),
]

"""
urlpatterns = [

    path('update/<str:pk>/', views.updateUser, name='user-update'),

]
"""
