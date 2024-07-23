export default class TaskModel {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.createdAt = new Date(data.created_at);
        this.updatedAt = new Date(data.updated_at);
        this.userId = data.user;
    }
}