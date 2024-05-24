from rest_framework.pagination import LimitOffsetPagination

class CustomPagination(LimitOffsetPagination):
    def paginate_queryset(self, queryset, request, view=None):
        if request.path == '/classes/all/':  # Special path to disable pagination
            return None  # Disables pagination
        return super().paginate_queryset(queryset, request, view)
