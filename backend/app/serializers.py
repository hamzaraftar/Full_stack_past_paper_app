from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Paper


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email','password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class PaperSerializer(serializers.ModelSerializer):

    class Meta:
        model = Paper
        fields = ['id','title','university','subject','file','uploaded_at']

        def validate_title(self,value):
            if not value.strip():
                raise serializers.ValidationError("Title can't be empty")
            return value

        def validate_university(self,value):
            if not value.strip():
                raise serializers.ValidationError("Content can't be empty")            
            return value 
        
        def validate_subject(self,value):
            if not value.strip():
                raise serializers.ValidationError("Content can't be empty")            
            return value  
        
        def validate_file(self, value):
                if not value.name.lower().endswith('.pdf'):
                    raise serializers.ValidationError(
                        "Only PDF files are allowed."
                    )

                if value.size > 20 * 1024 * 1024:
                    raise serializers.ValidationError(
                        "File size cannot exceed 20 MB."
                    )
                return value         
        