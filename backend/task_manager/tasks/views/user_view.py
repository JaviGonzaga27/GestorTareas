from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
from tasks.serializers.user_serializer import UserSerializer
from tasks.controllers.user_controller import UserController

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        print("Datos recibidos:", request.data)
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            print("Errores de validación:", serializer.errors)
        serializer.is_valid(raise_exception=True)
        user = UserController.create_user(serializer.validated_data)
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)

    def get_queryset(self):
        return UserController.get_all_users()

    def perform_update(self, serializer):
        UserController.update_user(serializer.instance.id, serializer.validated_data)

    def perform_destroy(self, instance):
        UserController.delete_user(instance.id)