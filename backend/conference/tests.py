from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient

from .models import AbstractSubmission, Registration


class PublicApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_health(self):
        response = self.client.get(reverse("health"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok"})

    def test_registration_is_create_only(self):
        get_response = self.client.get("/api/register/")
        self.assertEqual(get_response.status_code, 405)

        post_response = self.client.post(
            "/api/register/",
            {
                "full_name": "Test Participant",
                "email": "test@example.com",
                "institution": "IIT ISM",
                "participant_type": "Others",
                "payment_mode": "UPI",
                "transaction_id": "TEST-123",
            },
            format="json",
        )
        self.assertEqual(post_response.status_code, 201)
        self.assertEqual(Registration.objects.count(), 1)
        self.assertNotIn("email", post_response.json())

    def test_abstract_upload_validates_extension_and_size(self):
        invalid = SimpleUploadedFile(
            "abstract.exe", b"not an accepted document", content_type="application/octet-stream"
        )
        invalid_response = self.client.post(
            "/api/submit-abstract/",
            {
                "name": "Test Participant",
                "email": "test@example.com",
                "institution": "IIT ISM",
                "document": invalid,
            },
            format="multipart",
        )
        self.assertEqual(invalid_response.status_code, 400)
        self.assertEqual(AbstractSubmission.objects.count(), 0)

        valid_pdf = SimpleUploadedFile(
            "abstract.pdf", b"%PDF-1.4\n% minimal test file\n", content_type="application/pdf"
        )
        valid_response = self.client.post(
            "/api/submit-abstract/",
            {
                "name": "Test Participant",
                "email": "test@example.com",
                "institution": "IIT ISM",
                "document": valid_pdf,
            },
            format="multipart",
        )
        self.assertEqual(valid_response.status_code, 201)
        self.assertEqual(AbstractSubmission.objects.count(), 1)
        self.assertIn("message", valid_response.json())
        self.assertIn("id", valid_response.json())

    def test_abstract_endpoint_is_post_only(self):
        response = self.client.get("/api/submit-abstract/")
        self.assertEqual(response.status_code, 405)
