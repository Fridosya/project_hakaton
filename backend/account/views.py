from django.contrib.auth import login, logout
from django.db import IntegrityError
from rest_framework import permissions, status, views, generics
from rest_framework.response import Response

from .models import ContractorAccount, User, CustomerAccount
from .serializers import ContractorAccountSerializer, LoginSerializer, UserSerializer, CustomerAccountSerializer


def method_permission_classes(classes):
    def decorator(func):
        def decorated_func(self, *args, **kwargs):
            self.permission_classes = classes
            # this call is needed for request permissions
            self.check_permissions(self.request)
            return func(self, *args, **kwargs)
        return decorated_func
    return decorator


class LoginApiView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            login(request=request, user=serializer.validated_data["user"])

        return Response(
            {
                "success": True,
                "csrftoken": "",
                "session": {
                    "id": request.session.session_key,
                    'expiry_date': request.session.get_expiry_date(),
                    'expiry_age': request.session.get_expiry_age(),
                }
            },
            status=status.HTTP_200_OK
        )


class LogoutApiView(views.APIView):
    def post(self, request):
        logout(request=request)
        return Response({"success": True}, status=status.HTTP_200_OK)


class UserRetrieveUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ContractorListCreateAPIView(generics.ListCreateAPIView):
    queryset = ContractorAccount.objects.all()
    serializer_class = ContractorAccountSerializer
    permission_classes = [permissions.AllowAny]

    @method_permission_classes([permissions.IsAuthenticated])
    def get(self, request, *args, **kwargs):
        return super(ContractorListCreateAPIView, self).get(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
        except IntegrityError:
            return Response({'email': "Пользователь с таким e-mail уже существует"}, status=status.HTTP_400_BAD_REQUEST)

        return response


class ContractorRetrieveUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ContractorAccount.objects.all()
    serializer_class = ContractorAccountSerializer


class CustomerListCreateAPIView(generics.ListCreateAPIView):
    queryset = CustomerAccount.objects.all()
    serializer_class = CustomerAccountSerializer
    permission_classes = [permissions.AllowAny]

    @method_permission_classes([permissions.IsAuthenticated])
    def get(self, request, *args, **kwargs):
        return super(CustomerListCreateAPIView, self).get(request, *args, **kwargs)


class CustomerRetrieveUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomerAccount.objects.all()
    serializer_class = CustomerAccountSerializer
