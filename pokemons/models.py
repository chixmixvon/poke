from django.db import models
from accounts.models import Account



class Pokemon(models.Model):

    name = models.CharField(max_length=255)
    latitude = models.CharField(max_length=200)
    longitude = models.CharField(max_length=200)
    author = models.ForeignKey(Account, null=True, blank=True)

    def __str__(self):
        return "{}".format(self.name)

    def get_full_path(self):
        return "/api/pokemon/"