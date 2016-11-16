from django.conf import settings
from django.contrib.auth import login, logout
from django.core.urlresolvers import reverse
from django.shortcuts import render, get_object_or_404

from django.views.generic import TemplateView, View
from braces.views import LoginRequiredMixin
from django.http import HttpResponseRedirect
from .forms import LoginForm


class LoginView(TemplateView):
    """ login view
    """
    template_name = 'login.html'

    def get(self, *args, **kwargs):
        form = LoginForm()
        return render(self.request, self.template_name, {'form': form})