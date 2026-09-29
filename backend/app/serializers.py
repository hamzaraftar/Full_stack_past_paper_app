from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Paper, University, Subject


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "A user with this email already exists."
            )

        return value


class UniversitySerializer(serializers.ModelSerializer):

    class Meta:
        model = University
        fields = ['id', 'name']


class SubjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subject
        fields = ['id', 'name']


class PaperSerializer(serializers.ModelSerializer):
    university = UniversitySerializer(read_only=True)
    subject = SubjectSerializer(read_only=True)
    uploaded_by = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Paper
        fields = [
            'id',
            'title',
            'university',
            'subject',
            'file',
            'uploaded_at',
            'uploaded_by'
        ]

    def validate_title(self, value):
        if not value.strip():
            raise serializers.ValidationError(
                "Title can't be empty."
            )

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