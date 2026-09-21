from django.contrib import admin
from .models import Paper

@admin.register(Paper)
class PaperAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'university', 'subject', 'file', 'uploaded_at']