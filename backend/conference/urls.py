from django.urls import path

from .views import AbstractSubmissionCreateView, RegistrationCreateView

urlpatterns = [
    path("register/", RegistrationCreateView.as_view(), name="register"),
    path("submit-abstract/", AbstractSubmissionCreateView.as_view(), name="submit_abstract"),
]
