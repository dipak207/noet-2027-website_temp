from rest_framework import generics, permissions, status
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.response import Response

from .models import AbstractSubmission, Registration
from .serializers import AbstractSubmissionSerializer, RegistrationSerializer


class RegistrationCreateView(generics.CreateAPIView):
    """Public endpoint: create a registration only.

    Deliberately does not expose GET/PUT/PATCH/DELETE for attendee records.
    Organizers manage registrations through Django Admin.
    """

    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.AllowAny]
    parser_classes = [JSONParser]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"message": "Registration submitted successfully."},
            status=status.HTTP_201_CREATED,
        )


class AbstractSubmissionCreateView(generics.CreateAPIView):
    """Public endpoint for abstract uploads."""

    queryset = AbstractSubmission.objects.all()
    serializer_class = AbstractSubmissionSerializer
    permission_classes = [permissions.AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        submission = serializer.save()
        return Response(
            {
                "message": "Abstract submitted successfully!",
                "id": submission.id,
            },
            status=status.HTTP_201_CREATED,
        )
