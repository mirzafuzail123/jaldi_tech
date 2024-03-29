# Generated by Django 4.1.5 on 2023-02-04 09:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('AdminDashboard', '0006_alter_facebookintegration_adaccountid'),
    ]

    operations = [
        migrations.CreateModel(
            name='CampaignDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=1000)),
                ('campaignName', models.CharField(max_length=1000)),
                ('campaignId', models.BigIntegerField()),
                ('created', models.DateField(auto_now_add=True)),
                ('agents', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Ad',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('adId', models.BigIntegerField()),
                ('adName', models.CharField(max_length=1000)),
                ('agents', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
                ('campaign', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='AdminDashboard.campaigndetail')),
            ],
        ),
    ]
