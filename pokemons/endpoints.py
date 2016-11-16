from django.conf.urls import url
from .api import PokemonsAPI, PokemonAPI


urlpatterns = [
    url(r'^$', PokemonsAPI.as_view({
        'get': 'list',
        'post': 'create',
    }), name="pokemons"),

    url(r'^(?P<pokemon_id>[0-9]+)/$', PokemonAPI.as_view({
        'get': 'detail',
        'put': 'update',
        'post': 'delete',
    }), name="pokemon"),
]