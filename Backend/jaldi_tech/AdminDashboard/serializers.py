from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import make_password


# Register Serializer
class PasswordField(serializers.CharField):
    def to_internal_value(self, data):
        return make_password(data)

class RegisterSerializer(serializers.ModelSerializer):
    email=serializers.EmailField()
    password=PasswordField()
    class Meta:
        model=User
        fields='__all__'
        extra_kwargs={
            'password':{'write_only':True}
        }


# Login Serializer
class LoginSerializer(serializers.Serializer):
    email=serializers.EmailField()
    class Meta:
        model=User
        fields=['email' , 'password']



# Create Agent
class CreateAgentSerializer(serializers.ModelSerializer):
    email=serializers.EmailField()
    password=PasswordField()
    parent=serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    class Meta:
        model=User
        fields='__all__'
        extra_kwargs={
            'password':{'write_only':True}
        }


# Retreive Agents
class AgentsListSerializer(serializers.ModelSerializer):
    email=serializers.EmailField()
    id=serializers.IntegerField()
    class Meta:
        model=User
        fields=['id' ,'parent' , 'username' , 'email' , 'role' , 'last_login']


# FacebookIntegrationSerializer
class FacebookIntegrationSerializer(serializers.ModelSerializer):
    user=serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    class Meta:
        model=FacebookIntegration
        fields='__all__'



# Save Campaign
class SaveCamapignSerializer(serializers.ModelSerializer):
    agents=serializers.PrimaryKeyRelatedField(queryset=User.objects.all() , many=True)
    class Meta:
        model=CampaignDetail
        fields=['id','name' , 'campaignId' , 'campaignName' , 'agents' ,  ]

    def create(self, validated_data):
        name=validated_data['name']
        campaignId=validated_data['campaignId']
        campaignName=validated_data['campaignName']
        agentsList=validated_data['agents']
        campaign=CampaignDetail.objects.create(name=name , campaignId=campaignId , campaignName=campaignName )
        campaign.save()
        campaign.agents.set(agentsList)
        campaign.save()
        return campaign


# Save Ads
class SaveAdsSerializer(serializers.ModelSerializer):
    campaign=serializers.PrimaryKeyRelatedField(queryset=CampaignDetail.objects.all())
    agents=serializers.PrimaryKeyRelatedField(queryset=User.objects.all() , many=True)
    class Meta:
        model=Ad
        fields=['adId' , 'adName' , 'campaign' ,'agents']

    def create(self, validated_data):
        adId=validated_data.get('adId')
        adName=validated_data.get('adName')
        campaign=validated_data.get('campaign')
        ad=Ad.objects.create(adId=adId ,adName=adName, campaign=campaign )
        ad.save()
        ad.agents.set(validated_data['agents'])
        ad.save()
        return ad



# Campaign List
class CampaignListSerializer(serializers.ModelSerializer):
    id=serializers.IntegerField()
    created=serializers.DateField()
    class Meta:
        model=CampaignDetail
        fields=['id' , 'name' , 'created' , 'status']
