from pathlib import Path

from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator
from django.db import models


def validate_abstract_document_size(value):
    max_size = 10 * 1024 * 1024  # 10 MB
    if value.size > max_size:
        raise ValidationError("The abstract file must be 10 MB or smaller.")


class Registration(models.Model):
    PARTICIPANT_CHOICES = [
        ('Industrial Personnel', 'Industrial Personnel'),
        ('Faculty/Scientist', 'Faculty/Scientist'),
        ('Student/Scholar', 'Student/Scholar'),
        ('Others', 'Others'),
    ]

    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    participant_type = models.CharField(max_length=50, choices=PARTICIPANT_CHOICES, default='Others')
    institution = models.CharField(max_length=200, blank=True, null=True)
    qualification = models.CharField(max_length=100, blank=True, null=True)
    designation = models.CharField(max_length=100, blank=True, null=True)
    department = models.CharField(max_length=100, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    pin = models.CharField(max_length=20, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    accommodation = models.BooleanField(default=False)
    payment_mode = models.CharField(max_length=50, blank=True, null=True)
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    payment_date = models.DateField(null=True, blank=True)
    transaction_id = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} - {self.email}"


class AbstractSubmission(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    institution = models.CharField(max_length=200, blank=True)
    document = models.FileField(
        upload_to='abstracts/',
        validators=[
            FileExtensionValidator(allowed_extensions=['pdf', 'doc', 'docx']),
            validate_abstract_document_size,
        ],
    )
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.email})"
