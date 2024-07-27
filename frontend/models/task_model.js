export default class TaskModel {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.completed = data.completed;
        this.userId = data.user;
    }
}