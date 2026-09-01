from rest_framework import serializers

from .models import AbstractSubmission, Registration


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = [
            "full_name",
            "email",
            "institution",
            "participant_type",
            "payment_mode",
            "transaction_id",
        ]

    def validate_full_name(self, value):
        value = value.strip()
        if len(value) < 2:
            raise serializers.ValidationError("Please enter your full name.")
        return value


class AbstractSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AbstractSubmission
        fields = ["id", "name", "email", "institution", "document", "submitted_at"]
        read_only_fields = ["id", "submitted_at"]

    def validate_name(self, value):
        value = value.strip()
        if len(value) < 2:
            raise serializers.ValidationError("Please enter your full name.")
        return value
