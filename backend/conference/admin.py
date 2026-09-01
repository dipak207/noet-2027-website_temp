from django.contrib import admin
from .models import Registration, AbstractSubmission

@admin.register(Registration)
class RegistrationAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'participant_type', 'transaction_id', 'created_at')
    search_fields = ('full_name', 'email', 'transaction_id')
    list_filter = ('created_at', 'participant_type')

@admin.register(AbstractSubmission)
class AbstractSubmissionAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'institution', 'submitted_at')
    search_fields = ('name', 'email')
    list_filter = ('submitted_at',)
