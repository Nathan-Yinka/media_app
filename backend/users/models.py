from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _


class Role(models.TextChoices):
    CONTENT_CREATOR = 'CC', _('Content Creator')
    ADMINISTRATOR = 'AD', _('Administrator')

class CustomUserManager(BaseUserManager):
    def create_user(self, username=None, email=None, mobile=None, password=None, role=Role.CONTENT_CREATOR, **extra_fields):
        if not username and not email and not mobile:
            raise ValueError(_('You must provide at least one identifier: email, mobile, or username'))

        email = self.normalize_email(email) if email else None
        user = self.model(username=username, email=email, mobile=mobile, role=role, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, username=None, email=None, mobile=None, password=None, role=Role.ADMINISTRATOR, **extra_fields):
        if not password:
            raise ValueError(_('Superusers must have a password.'))

        if not username:
            raise ValueError(_('Superusers must have a username.'))

        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(username=username, email=email, mobile=mobile, password=password,role=role, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    role = models.CharField(max_length=2,choices=Role.choices,default=Role.CONTENT_CREATOR)
    email = models.EmailField(_('email address'), unique=True, null=True, blank=True)
    mobile = models.CharField(_('mobile number'), max_length=15, unique=True, null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    first_name = models.CharField(_("first_name"),max_length=50)
    last_name = models.CharField(_("last_name"),max_length=50)
    username = models.CharField(_("username"), max_length=50, unique=True,null=True, blank=True)
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = [] 

    objects = CustomUserManager()

    def __str__(self):
        return self.email if self.email else self.mobile
