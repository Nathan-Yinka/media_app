from rest_framework import permissions
from users.models import Role

class isADMINISTRATOR(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == Role.ADMINISTRATOR


class IsAuthorOrAdminOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True
        # Write permissions are only allowed to the author of the post.
        return obj.author == request.user or request.user.role == Role.ADMINISTRATOR