const ServiceStorage = {
    setToken: function (token: string) {
        return sessionStorage.setItem(`@hide:token`, token)
    },

    getToken: function () {
        return sessionStorage.getItem(`@hide:token`)
    },

    removeToken: function () {
        sessionStorage.removeItem(`@hide:token`)
    },
}

export default ServiceStorage
