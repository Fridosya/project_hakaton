from django.urls import path

from . import views


urlpatterns = [
    path("login/", views.LoginApiView.as_view(), name="login"),
    path("logout/", views.LogoutApiView.as_view(), name="logout"),
    path("current-user/", views.CurrentUserView.as_view(), name="current_user"),
    path("contractors/", views.ContractorListCreateAPIView.as_view(), name="contractors"),
    path("contractors/<int:pk>/", views.ContractorRetrieveUpdateDeleteAPIView.as_view(), name="retrieve_update_delete_contractor"),
    path("user/<int:pk>/", views.UserRetrieveUpdateDeleteAPIView.as_view(), name="retrieve_update_delete_user"),
    path("customers/", views.CustomerListCreateAPIView.as_view(), name="customers"),
    path("customers/<int:pk>/", views.CustomerRetrieveUpdateDeleteAPIView.as_view(), name="retrieve_update_delete_customer"),
]
