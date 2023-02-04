from django.contrib.auth.models import (
     BaseUserManager
)

class UserManager(BaseUserManager):
    def create_user(self, email, username, role,parent, password=None):
        """
        Creates and saves a User with the given email, username , 
        role and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            role=role,
            parent=parent,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, role,parent, password=None):
        """
        Creates and saves a superuser with the given email, username ,
        role and password.
        """
        user = self.create_user(
            email,
            password=password,
            username=username,
            role=role,
            parent=parent,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user