import axios from "axios";

export default {
    createNewUser: function (user) {
        console.log('This is working', user)
        return axios.post('https://dev-cruh5r48.us.auth0.com/dbconnections/signup', {
            "client_id": "xbxEuwDRkgfqlmRowli2SDyFD4pw300m",
            "email": user.email,
            "password": user.password,
            "connection": "MongoDB"
        })
    },
}