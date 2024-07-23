from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from tasks.models.task_model import Task
from tasks.serializers.task_serializer import TaskSerializer
from tasks.controllers.task_controller import TaskController

class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

    def get_queryset(self):
        return TaskController.get_tasks_for_user(self.request.user)

    def perform_create(self, serializer):
        TaskController.create_task(self.request.user, serializer.validated_data)

    def perform_update(self, serializer):
        TaskController.update_task(serializer.instance.id, serializer.validated_data)

    def perform_destroy(self, instance):
        TaskController.delete_task(instance.id)