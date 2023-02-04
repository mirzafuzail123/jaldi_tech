from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from .manager import UserManager
# Create your models here.
class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )

    UserRole=(
        ('Admin' , 'Admin'),
        ('Agent' , 'Agent')
    )
    username=models.CharField(max_length=300)
    role=models.CharField(choices=UserRole , max_length=50 , default='Admin')
    parent=models.ForeignKey('self' , null=True ,blank=True , on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username' , 'role' , 'parent' ]

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin



class FacebookIntegration(models.Model):
    user=models.OneToOneField(User , on_delete=models.CASCADE)
    facebookToken=models.TextField()
    facebookUserId=models.BigIntegerField()
    pageId=models.BigIntegerField()
    pageName=models.CharField(max_length=1000)
    pageToken=models.TextField()
    adAccountId=models.CharField(max_length=200)
    adAccountName=models.CharField(max_length=1000)

    def __str__(self):
        return self.user.email



statusChoices=(
    ('Active' , 'Active'),
    ('Archived' , 'Archived'),
    ('Paused' , 'Paused'),
)

class CampaignDetail(models.Model):
    agents=models.ManyToManyField(User)
    name=models.CharField(max_length=1000)
    campaignName=models.CharField( max_length=1000)
    campaignId=models.BigIntegerField()
    status=models.CharField(choices=statusChoices , default='Active' , max_length=100)
    created=models.DateField(auto_now_add=True , null=False)

    def __str__(self) :
        return self.name


class Ad(models.Model):
    campaign=models.ForeignKey(CampaignDetail , on_delete=models.CASCADE  )
    agents=models.ManyToManyField(User )
    adId=models.BigIntegerField()
    adName=models.CharField(max_length=1000)

    def __str__(self) :
        return self.adName
    


