from rest_framework import serializers
from .models import Pokemon

from accounts.serializers import AccountSerializer


class PokemonSerializer(serializers.ModelSerializer):
    """ pokemon model serializer
    """
    author = AccountSerializer(required=False)

    class Meta:
        model = Pokemon
        fields = ('id', 'name', 'longitude', 'latitude', 'author')
