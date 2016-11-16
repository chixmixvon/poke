from django.shortcuts import render
from django.views.generic import TemplateView


class HomeView(TemplateView):
    template_name = 'angular.html'
    context = {}

    def get(self, *args, **kwargs):
        return render(self.request, self.template_name, self.context)
