from django.http import JsonResponse
from .serializers import LoginSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
def api_status(request):
    return JsonResponse({
        "message": "HallVoice API is running"
    })
@api_view(["POST"])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = authenticate(
        request=request,
        username=serializer.validated_data["identifier"],
        password=serializer.validated_data["password"],
    )

    if user is None:
        return Response(
            {"message": "Invalid username or password."},
            status=401,
        )

    return Response({
        "message": "Credentials verified."
    })