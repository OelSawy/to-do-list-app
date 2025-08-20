const apiRoutes = {
    register: '/users',
    login: '/users/login',
    logout: '/users/logout',
    requestOtp: '/users/reset',
    validateOtp: '/users/validate',
    changePassword: '/users/change',
    addTask: '/tasks/create',
    editTask: (id) => `/tasks/edit/${id}`,
    getTasks: '/tasks',
    getTask: (id) => `/tasks/${id}`,
    deleteTask: (id) => `/tasks/${id}`,
    toggleTaskStatus: (id) => `/tasks/toggle/${id}`
}

export default apiRoutes;