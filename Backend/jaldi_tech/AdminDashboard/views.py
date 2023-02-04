from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny , IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from django.contrib.auth import authenticate
from .token import get_tokens_for_user
from django.forms.models import model_to_dict
import requests
# Create your views here.



# Register User
class RegisterView(APIView):
    def post(self , request , format=None):
        data=request.data.get('data')
        email=data['email']

        if User.objects.filter(email=email).exists():
            return Response({'error':'Email already exists'} , status=status.HTTP_400_BAD_REQUEST)

        serializer=RegisterSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# Login User
class LoginView(APIView):
    def post(self , request , format=None):
        data=request.data.get('data')
        email=data['email']
        password=data['password']
        serializer=LoginSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        user=authenticate(email=email , password=password)
        if user is not None and user.role=='Admin':
            token=get_tokens_for_user(user)
            data={
                'access_token': token['access'],
                'refresh_token': token['refresh'],                            
                'email':user.email,
                'username':user.username,
                'last_login':user.last_login
            }
            integration=FacebookIntegration.objects.filter(user=user)
            if integration :
                data['facebookToken']=integration.first().facebookToken
                data['adAccountId']=integration.first().adAccountId
            
            return Response(data ,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


# Create Agent
class CreateAgentView(APIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    def post(self , request , format=None):
        data=request.data.get('data')

        # Checking if email exists
        email=data['email']
        if User.objects.filter(email=email).exists():
            return Response({'error':'Email already exists'} , status=status.HTTP_400_BAD_REQUEST)
        
        user=request.user
        data['parent']=user.id
        data['role']='Agent'
        serializer=CreateAgentSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)



# Retreiveing Agents
class AgentsListView(APIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    def get(self , request , format=None):
        user=request.user
        agents=User.objects.filter(parent=user)
        agentsList=[]
        for agent in agents:
            data={
                'id':agent.id,
                'parent':agent.parent.id,
                'username':agent.username,
                'email':agent.email,
                'role':agent.role,
                'last_login':agent.last_login,
            }
            agentsList.append(data)
        serializer=AgentsListSerializer(data=agentsList , many=True)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



#Subscribing Page
def FbPageSubscription( page_id , page_token):
    #Subscribing
    params={
        'access_token':page_token
    }
    data={
    'object': 'page',
    'callback_url': 'https://mirzafuzail.pythonanywhere.com/webhook/callback/',
    'subscribed_fields': ['leadgen'],
    'verify_token': '123',
}    
    response = requests.post(
            f'https://graph.facebook.com/v15.0/{page_id}/subscribed_apps',
            params=params,
            json=data
        )
    return response

# Saving Facebook Integration
class FacebookIntegrationView(APIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]

    def post(self , request , format=None):
        data=request.data.get('data')
        user=request.user
        data['user']=user.id
        serializer=FacebookIntegrationSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data ,status=status.HTTP_201_CREATED)


# Saving Campaign Detail
class SaveCampaignView(APIView):
    def post(self ,request , format=None ):
        data=request.data

        # Saving Campaign
        campaignData=data.get('campaignData')
        campaignSerializer=SaveCamapignSerializer(data=campaignData)
        campaignSerializer.is_valid(raise_exception=True)
        campaignSerializer.save()

        # Saving Ads
        adsData=data.get('adsData')
        adsList=adsData.get('ads')
        agents=adsData.get('agents')
        for ad in adsList:
            ad['adId'] = ad.pop('id')
            ad['adName']=ad.pop('name')
            ad['campaign']=campaignSerializer.data['id']
            ad['agents']=agents
        adSerializer=SaveAdsSerializer(data=adsList , many=True)
        adSerializer.is_valid(raise_exception=True)
        adSerializer.save()
        return Response(status=status.HTTP_201_CREATED)


# CampaignList
class CammpaignListView(APIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    def get(self , request , format=None):
        user=request.user
        campaigns=CampaignDetail.objects.filter(agents=user)
        campaignList=[]
        if campaigns.exists():
            for campaign in campaigns:
                campaignDict=model_to_dict(campaign)
                campaignDict['created']=campaign.created
                campaignList.append(campaignDict)
            serializer=CampaignListSerializer(data=campaignList , many=True)
            serializer.is_valid(raise_exception=True)
            return Response(serializer.data , status=status.HTTP_200_OK)
        else:
            return Response(campaignList ,status=status.HTTP_200_OK )



#Webhook
class FacebookWebhook(APIView):
    def get(self, request):
        hub_challenge = request.GET.get("hub.challenge")
        hub_verify_token = request.GET.get("hub.verify_token")
        if int(hub_verify_token) == 123:
                return Response(int(hub_challenge))
        else:
            return Response('invalid Token')
        
    def post(self, request, *args, **kwargs):
        lead_data = request.data

        # lead_id=lead_data['entry'][0]['changes'][0]['value']['leadgen_id']
        # page_id=lead_data['entry'][0]['changes'][0]['value']['page_id']
        # page=FbInfo.objects.filter(page_id=page_id).first()
        # page_token=page.page_token

        # params={
        #     'access_token':page_token
        # }
        # response=requests.get(f'{api_endpoint}/438896918362471?fields=ad_id,id,campaign_id,campaign_name,field_data,form_id' , params=params)
        # json_response=response.json()

        # ad_id=json_response['ad_id']
        # campaign_id=json_response['campaign_id']
        # campaign_name=json_response['campaign_name']
        # full_name=''
        # email=''
        # phone_number=''
        # city=''
        # note=[]
        # for data in json_response['field_data']:
        #     if data['name']=='full_name':
        #         full_name=data['values'][0]  

        #     elif data['name']=='email':
        #         email=data['values'][0]   

        #     elif data['name']=='phone_number':
        #         phone_number=data['values'][0]  

        #     elif data['name']=='city':
        #         city=data['values'][0]
        #     else:
        #         note.append({data['name']:data['values']})
        
        # #Checking if lead is for selected ad
        # ad=Ad.objects.get(ad_id=ad_id)
        # if ad:
        #     agents = ad.agents.all()
        #     print(agents)
        #     leads=Lead.objects.create(lead_id=lead_id , ad_id=ad_id, campaign_id=campaign_id, campaign_name=campaign_name , full_name=full_name , email=email , phone_number=phone_number , city=city , note=note )
        #     leads.save()
        #     leads.agents.set(agents)
        #     leads.save()
        # else:
        #     pass
        # store lead_data in database
        return Response(status=status.HTTP_200_OK)