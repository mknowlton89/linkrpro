import axios from "axios";

export default {
    createNewLink: function (newLink, user) {
        console.log(newLink, user)
        return axios.post('/api/links/new', {
            link: newLink,
            user: user,
        })
    },
    createNewUser: function (newUser) {
        // console.log(newUser)
            return axios.post("/api/user", newUser);
          },
    createUtmParameter: function (parameter, utmParameter, user) {
        return axios.post(`/api/utm-parameters/${parameter}`, {
            parameter: utmParameter,
            user: user,
        })
    },
    createUtmSource: function (campaignSource, user) {
        return axios.post('/api/utm-parameters/new-source', {
            campaignSource: campaignSource,
            user: user,
        })
    },
    createUtmUrl: function (campaignUrl, user) {
        return axios.post('/api/utm-parameters/new-url', {
            campaignUrl: campaignUrl,
            user: user,
        })
    },
    // getLinkHistoryById: function (mongoId) {
    //     let userId = mongoId.split('|')
    //     return axios.get('/api/links/history', {
    //         params: {
    //             id: userId[1]
    //         }
    //     })
    // },
    getLinkHistoryById: function (userId) {
        return axios.get('/api/links/history', {
            params: {
                id: userId
            }
        })
    },
    getUtmParameters: function (user, parameter) {
        return axios.get('/api/utm-parameters/get-all', {
            params: {
                user: user,
                parameter: parameter,
            }
        })
    },
    //   authorizeUser: function (authToken) {
    //     return axios.post("/api/users/auth/", {
    //       params: {
    //         token: authToken
    //       }
    //     });
    //   },
    //   cancelEvent: function (id) {
    //     return axios.post(`/api/appointments/cancel/:${id}`, {
    //       params: {
    //         _id: id
    //       }
    //     })
    //   },
    //   createNewPackage: function (id, newPackage) {
    //     return axios.post("/api/packages/new", newPackage);
    //   },
    //   createNewUser: function (newUser) {
    //     return axios.post("/api/users", newUser);
    //   },
    //   getAddress: function (options) {
    //     return axios.request(options)
    //   },
    //   getAppointments: async function (appointmentData) {
    //     return await axios.get("/api/appointments", {
    //       params: {
    //         date: appointmentData.date
    //       }
    //     });
    //   },
    //   getDashboardData: function (userId) {
    //     return axios.get('/api/appointments/dashboard', {
    //       params: {
    //         photographerId: userId
    //       }
    //     })
    //   },
    //   getPackageData: function (userId) {
    //     // console.log(userId)
    //     return axios.get('/api/packages/', {
    //       params: {
    //         _id: userId
    //       }
    //     })
    //   },
    //   getUserDataByEmail: function (userEmail) {
    //     return axios.get(`/api/users/${userEmail}`, {
    //       params: {
    //         email: userEmail
    //       }
    //     })
    //   },
    //   loginUser: function (userLoginData) {
    //     return axios.get("/api/users/", {
    //       params: {
    //         email: userLoginData.email,
    //         password: userLoginData.password
    //       }
    //     });
    //   },
    //   saveAppointment: function (appointmentData) {
    //     return axios.post("/api/appointments", appointmentData);
    //   },
    //   updateUser: function (id, update) {
    //     console.log(update)
    //     return axios.post(`api/users/update/:${id}`, {
    //       params: {
    //         _id: id,
    //         update
    //       }
    //     })
    //   },
}
