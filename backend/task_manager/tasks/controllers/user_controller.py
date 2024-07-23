from django.contrib.auth.models import User
from tasks.models.user_model import UserProfile

class UserController:
    @staticmethod
    def get_all_users():
        return User.objects.all()

    @staticmethod
    def create_user(user_data):
        profile_data = user_data.pop('profile', {})
        password = user_data.pop('password')
        user = User.objects.create_user(**user_data)
        user.set_password(password)
        user.save()
        UserProfile.objects.update_or_create(user=user, defaults=profile_data)
        return user

    @staticmethod
    def update_user(user_id, user_data):
        user = User.objects.get(id=user_id)
        profile_data = user_data.pop('profile', {})
        for key, value in user_data.items():
            setattr(user, key, value)
        user.save()
        if profile_data:
            UserProfile.objects.update_or_create(user=user, defaults=profile_data)
        return user

    @staticmethod
    def delete_user(user_id):
        User.objects.get(id=user_id).delete()