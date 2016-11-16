from django.conf import settings
from django.shortcuts import get_object_or_404

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status

from .models import Pokemon
from .serializers import PokemonSerializer


class PokemonsAPI(ViewSet):
    """ endpoint for pokemon list
    """
    def list(self, *args, **kwargs):
        pokemons = Pokemon.objects.all()
        serializer = PokemonSerializer(pokemons, many=True)

        return Response(serializer.data, status=200)

    def create(self, *args, **kwargs):
        data = self.request.data.copy()
        serializer = PokemonSerializer(data=data)

        if serializer.is_valid():
            serializer.save(author=self.request.user)

            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class PokemonAPI(ViewSet):
    """ endpoint for the pokemon info
    """
    def detail(self, *args, **kwargs):
        pokemon = get_object_or_404(Pokemon, id=kwargs['pokemon_id'])
        serializer = PokemonSerializer(pokemon)

        return Response(serializer.data, status=200)

    def update(self, *args, **kwargs):
        pokemon = get_object_or_404(Pokemon, id=kwargs['pokemon_id'])
        serializer = PokemonSerializer(pokemon, data=self.request.data)
        if serializer.is_valid():
            instance = serializer.save()

            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)

    def delete(self, *args, **kwargs):
        pokemon = get_object_or_404(Pokemon, id=kwargs['pokemon_id'])
        pokemon.delete()

        return Response(status=204)








