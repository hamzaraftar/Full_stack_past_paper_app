from django.db import models
from django.contrib.auth.models import User

class University(models.Model):
    name = models.CharField(max_length=200,unique=True)

class Paper(models.Model):
    title = models.CharField(max_length=200)
    course_code = models.CharField(max_length=50)
    university = models.ForeignKey(University , on_delete=models.CASCADE , related_name='papers')
    file = models.FileField(upload_to='papers/')
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE ,related_name='Student')
    uploaded_at = models.DateTimeField(auto_now_add=True)