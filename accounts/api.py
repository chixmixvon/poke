from django.conf import settings
from django.contrib.auth import login

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status

from .serializers import LoginSerializer


class LoginAPI(ViewSet):
    """ login endpoint
    """
    def login(self, *args, **kwargs):
        serializer = LoginSerializer(data=self.request.data)
        if serializer.is_valid():
            login(self.request, serializer.user_cache)
            return Response(status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_403_FORBIDDEN)