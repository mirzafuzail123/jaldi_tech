# Generated by Django 4.1.5 on 2023-02-02 13:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AdminDashboard', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('Admin', 'Admin'), ('Agent', 'Agent')], default='Admin', max_length=50),
        ),
    ]