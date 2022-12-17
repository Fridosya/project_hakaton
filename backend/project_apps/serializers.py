from rest_framework import serializers

from account.serializers import UserSerializer
from .models import ProjectApplication


class ProjectApplicationSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)

    work_type_display = serializers.CharField(source="get_work_type_display", read_only=True)
    status_display = serializers.CharField(source="get_status_display", read_only=True)

    deadline_from = serializers.DateField(format="%d.%m.%Y")
    deadline_to = serializers.DateField(format="%d.%m.%Y")

    class Meta:
        model = ProjectApplication
        fields = ["id", "owner", "title", "description", "work_type", "deadline_from", "deadline_to", "budget_from", "budget_to", "tasks", "status", "work_type_display", "status_display", 'updated_at', 'created_at']

    def save(self, **kwargs):
        return super().save(**kwargs, owner=self.context["request"].user)

    # def get_work_type(self, obj):
    #     return obj.get_work_type_display()

    # def get_status(self, obj):
    #     return obj.get_status_display()

