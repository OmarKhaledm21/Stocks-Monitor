# Generated by Django 4.1 on 2022-10-14 09:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_user_token'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='token',
            field=models.CharField(default='0', max_length=25, null=True),
        ),
    ]