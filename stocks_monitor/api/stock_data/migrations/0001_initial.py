# Generated by Django 4.1 on 2022-10-14 12:30

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='StockDataModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('currency', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=100)),
                ('symbol', models.CharField(max_length=100)),
            ],
        ),
    ]