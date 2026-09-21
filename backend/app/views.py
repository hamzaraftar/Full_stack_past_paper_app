from django.shortcuts import render
from .models import Paper
from .serializers import UserSerializer,PaperSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response

#---------------------------------------- for User 
class UserInfo(APIView):
    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAuthenticated()]    

    def get(self,request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def post(self,request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message":"User was created successfully "},status=201)
        return Response(serializer.errors, status=400)

#---------------------------------------- for Papers
class PaperAPIView(APIView):
    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self,request,pk=None):
        if pk is not None:
            try:
                paper = Paper.objects.get(pk=pk,uploaded_by=request.user)
            except Paper.DoesNotExist:
                return Response({"error":f"Paper with id {pk} is not found"}, status=404)
            
            serializer = PaperSerializer(paper)
            return Response(serializer.data)

        paper = Paper.objects.all()
        serializer = PaperSerializer(paper, many=True)
        return Response(serializer.data)

    def post(self,request):
        serializer = PaperSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(uploaded_by=request.user)
            return Response (serializer.data,status=201)
        return Response(serializer.errors ,status=400)
    
    def put(self,request,pk):
        try:
            paper = Paper.objects.get(pk=pk,uploaded_by=request.user)
        except Paper.DoesNotExist:
            return Response({"error":"not found"},status=404)

        serializer = PaperSerializer(paper,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def patch(self,request,pk):
        try:
            paper = Paper.objects.get(pk=pk , uploaded_by=request.user)
        except Paper.DoesNotExist:
            return Response({"error":"not found"},status=404)

        serializer = PaperSerializer(paper , data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)    

    def delete(self,request,pk):
        try:
            paper = Paper.objects.get(pk=pk,uploaded_by=request.user)
        except Paper.DoesNotExist:
            return Response({"error":"not found"},status=404)

        paper.delete()
        return Response({"message":"Paper Delete successfully "})        