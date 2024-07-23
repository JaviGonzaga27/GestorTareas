from tasks.models.task_model import Task
from tasks.serializers.task_serializer import TaskSerializer

class TaskController:
    @staticmethod
    def get_tasks_for_user(user):
        return Task.objects.filter(user=user)

    @staticmethod
    def create_task(user, task_data):
        serializer = TaskSerializer(data=task_data)
        if serializer.is_valid():
            serializer.save(user=user)
            return serializer.data
        return None

    @staticmethod
    def update_task(task_id, task_data):
        task = Task.objects.get(id=task_id)
        serializer = TaskSerializer(task, data=task_data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return serializer.data
        return None

    @staticmethod
    def delete_task(task_id):
        Task.objects.get(id=task_id).delete()