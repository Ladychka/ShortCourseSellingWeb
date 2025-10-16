from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userauths', '0003_user_refresh_token'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='full_name',
            field=models.CharField(max_length=100, blank=True, null=True),
        ),
    ]
