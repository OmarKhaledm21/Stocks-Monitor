# Generated by Django 4.1 on 2022-10-14 12:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stock_data', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='StockDataModel',
            new_name='StockData',
        ),
    ]