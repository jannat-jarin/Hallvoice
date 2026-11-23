from django.http import JsonResponse
from .serializers import LoginSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.middleware.csrf import get_token
from django.views.decorators.http import require_GET, require_POST
from django.contrib.auth import login, logout
from django.views.decorators.csrf import csrf_protect
def api_status(request):
    return JsonResponse({
        "message": "HallVoice API is running"
    })

@require_GET
def csrf_token_view(request):
    return JsonResponse({
        "csrfToken": get_token(request)
    })
@csrf_protect
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
    login(request, user)
    return Response({
        
       "message": "Logged in successfully.",
        "user": {
            "username": user.username,
            "role": user.role,
        },  
    })
@require_GET
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"isAuthenticated": False})

    return JsonResponse({
        "isAuthenticated": True,
        "user": {
            "username": request.user.username,
            "role": request.user.role,
        },
    })
@require_POST
@csrf_protect
def logout_view(request):
    logout(request)

    return JsonResponse({
        "message": "Logged out successfully."
    })