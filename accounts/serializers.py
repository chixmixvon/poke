from django.contrib.auth import authenticate

from rest_framework.validators import UniqueValidator
from rest_framework import serializers
from .models import Account


class LoginSerializer(serializers.Serializer):
    """ user login serializer
    """
    _error_msg = "Email/Password is incorrect"

    username = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        """ validate user's credentials
        """
        email = data.get('username')
        password = data.get('password')

        # check if user's credentials are valid
        if not (email or password):
            raise serializers.ValidationError(self._error_msg)

        self.user_cache = authenticate(email=email, password=password)
        if self.user_cache is None or \
            not self.user_cache.is_active:
            raise serializers.ValidationError(self._error_msg)

        return data


class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = "__all__"


class AccountSerializer(serializers.ModelSerializer):
    friends = FriendSerializer(many=True)
    class Meta:
        model = Account
        fields = "__all__"