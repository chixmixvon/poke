from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^$', LoginView.as_view(), name="login"),
]


#################
# API ENDPOINTS #
#################
from .api import *

urlpatterns += [
    url(r'^api/login/$', LoginAPI.as_view({
        'post': 'login',
    }), name="api_login"),
]