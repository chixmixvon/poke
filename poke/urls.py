from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin

from pokemons.views import HomeView

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^accounts/', include('accounts.urls')),
    url(r'^$', HomeView.as_view(), name='home'),

    #################
    # API ENDPOINTS #
    #################
    url(r'^api/pokemons/', include('pokemons.endpoints')),

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)