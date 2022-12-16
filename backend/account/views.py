from django.contrib.auth import login, logout
from django.contrib.auth.models import AnonymousUser
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
            user = serializer.validated_data["user"]
            login(request=request, user=user)

        user_serializer = UserSerializer(instance=user)

        account_serializer = None

        if user.is_contractor:
            account = ContractorAccount.objects.get(user__id=user.id)
            account_serializer = ContractorAccountSerializer(instance=account)

        if user.is_customer:
            account = CustomerAccount.objects.get(user__id=user.id)
            account_serializer = CustomerAccountSerializer(instance=account)

        return Response(
            {
                "success": True,
                "user": user_serializer.data,
                "account": None if not account_serializer else account_serializer.data,
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


class CurrentUserView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        account_serializer = None
        user = request.user or None

        user_serializer = UserSerializer(instance=user)

        if not isinstance(user, AnonymousUser):
            if user.is_contractor:
                account = ContractorAccount.objects.get(user__id=user.id)
                account_serializer = ContractorAccountSerializer(instance=account)

            if user.is_customer:
                account = CustomerAccount.objects.get(user__id=user.id)
                account_serializer = CustomerAccountSerializer(instance=account)

        return Response(
            {
                "success": True,
                "user": user_serializer.data,
                "account": None if not account_serializer else account_serializer.data,
            },
            status=status.HTTP_200_OK
        ) 
