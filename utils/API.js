import axios from "axios";

export default {
    authorizeUser: function (authToken) {
        return axios.post("/api/auth/", {
          params: {
            token: authToken
          }
        });
      },
    createNewLink: function (newLink, user) {
        console.log(newLink, user)
        return axios.post('/api/links/new', {
            link: newLink,
            user: user,
        })
    },
    createNewUser: function (newUser) {
            return axios.post("/api/user", newUser);
    },
    createCheckoutSession: function (lookup_key) {
        return axios.post('/api/payment/create-checkout-session', {
            lookup_key: lookup_key
        })
    },
    createUtmParameter: function (parameter, utmParameter, user) {
        return axios.post(`/api/utm-parameters/create-all`, {
            parameter: parameter,
            parameterValue: utmParameter,
            user: user,
        })
    },
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
    loginUser: function (userLoginData) {
        return axios.get("/api/login/", {
            params: {
            email: userLoginData.email,
            password: userLoginData.password
            }
        });
    },
    paymentIntent: function () {
        return axios.post("api/payment/payment-intent", {})
    },
}
