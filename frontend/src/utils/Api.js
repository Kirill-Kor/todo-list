import checkResponse from "./checkResponse";

class Api {
    constructor(options) {
        this._options = { ...options };
    }

    _fetch(path, method = 'GET', body) {
        return fetch(`${this._options.baseUrl}${path}`, {
            headers: {
                ...this._options.headers,
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }, method, body: body
        })
            .then(checkResponse)
    }

    getAllUsers() {
        return this._fetch('users');
    }

    createUser(user) {
        return this._fetch('signup', 'POST', JSON.stringify({
            first_name: user.name,
            last_name: user.lastname,
            login: user.login,
            password: user.password,
            lead_id: user.leadId
        }))

    }

    login(userData) {
        return this._fetch('signin', 'POST', JSON.stringify(userData))
    }

    checkTokenValidity() {
        return this._fetch('users/me');
    }

    getTasks() {
        return this._fetch('tasks');
    }

    getTaskById(taskId) {
        return this._fetch(`tasks/${taskId}`);
    }

    createTask(task) {
        return this._fetch('tasks', 'POST', JSON.stringify(task));
    }

    updateTask(task, taskId) {
        return this._fetch(`tasks/${taskId}`, 'PATCH', JSON.stringify(task))
    }
}

const api = new Api({
    baseUrl: 'http://localhost:3000/',


    headers: {
        "Content-Type": "application/json"
    }
});

export default api;