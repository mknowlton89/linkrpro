import axios from "axios";

export default {
    getAuthToken: async function () {
        if (typeof window !== 'undefined') {
            authToken = localStorage.getItem('authToken');
        };

        if (authToken) {
            return authToken;
        } else {
            return false;
        }
    }
}
