from django.urls import path
from AdminDashboard.views import *
urlpatterns = [
    path('api/register/' , RegisterView.as_view() , name='register'),
    path('api/login/' , LoginView.as_view() , name='login'),
    path('webhook/callback/' , FacebookWebhook.as_view() , name='facebookWebhook'),

    path('api/createAgent/' , CreateAgentView.as_view() , name='createAgent'),
    path('api/agentsList/' , AgentsListView.as_view() , name='createAgent'),

    path('api/saveCampaign/' , SaveCampaignView.as_view() , name='saveCampaign'),
    path('api/cammpaignList/' , CammpaignListView.as_view() , name='cammpaignList'),

    path('api/facebookIntegration/' , FacebookIntegrationView.as_view() , name='facebookIntegration'),
]
