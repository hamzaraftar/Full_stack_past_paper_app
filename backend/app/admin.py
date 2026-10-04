from django.contrib import admin
from .models import Paper

@admin.register(Paper)
class PaperAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'course_code', 'university', 'file', 'uploaded_at']