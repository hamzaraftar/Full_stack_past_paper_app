from django.contrib import admin
from .models import Paper,University

@admin.register(Paper)
class PaperAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'course_code', 'university', 'file','uploaded_by', 'uploaded_at']

@admin.register(University)
class UniversityAdmin(admin.ModelAdmin):
    list_display = ['id','name']