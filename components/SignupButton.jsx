import React from "react";
import { useAuth0 } from '@auth0/auth0-react'

const SignupButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
                <button
                    id="qsLoginBtn"
                    color="primary"
                    className="btn-margin"
                    onClick={() => loginWithRedirect({
                      screen_hint: 'signup',
                      appState: {
                        returnTo: '/signupinfo'
                      }
                    })}
                  >
                    Sign up
                  </button>
        );
}

export default SignupButton