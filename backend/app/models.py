from django.db import models
from django.contrib.auth.models import User

class Paper(models.Model):
    title = models.CharField(max_length=200)
    university = models.CharField(max_length=200)
    subject = models.CharField(max_length=200)
    file = models.FileField(upload_to='papers/')
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE ,related_name='Student')
    uploaded_at = models.DateTimeField(auto_now_add=True)