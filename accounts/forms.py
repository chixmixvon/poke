from django import forms
from django.contrib.auth import authenticate
from django.contrib.auth.forms import AuthenticationForm


class LoginForm(AuthenticationForm):
    """ user login form
    """
    error_msg = "Email/Password is incorrect"

    def clean(self):
        """ validate user's credentials
        """
        email = self.cleaned_data.get('username')
        password = self.cleaned_data.get('password')

        if not (email or password):
            raise forms.ValidationError(self.error_msg, code="invalid_login")

        # check if user's credentials are valid
        self.user_cache = authenticate(email=email, password=password)
        if self.user_cache is None or \
            not self.user_cache.is_active:
            raise forms.ValidationError(self.error_msg, code="invalid_login")

        return self.cleaned_data