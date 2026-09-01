from django.db import migrations, models
from django.core.validators import FileExtensionValidator
import conference.models


class Migration(migrations.Migration):
    dependencies = [
        ('conference', '0003_rename_name_registration_full_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='abstractsubmission',
            name='document',
            field=models.FileField(
                upload_to='abstracts/',
                validators=[
                    FileExtensionValidator(allowed_extensions=['pdf', 'doc', 'docx']),
                    conference.models.validate_abstract_document_size,
                ],
            ),
        ),
    ]
