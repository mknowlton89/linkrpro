import React from 'react'

const LoginLogoutWrapper = ({children}) => {
    return (
        <>
            <div className="page-wrapper">
                <div className="left-third">
                        <div className="logo-wrapper">
                            <a href="/" className="logo">Sourcely</a>
                        </div>

                </div>

                <div className="right-third">
                    <div className="signup-form">
                        <div className="logo-wrapper">
                            <a href="/" className="logo">Sourcely</a>
                        </div>
                        {children}
                        <div className="footer-wrapper">
                            <a href="/" className="privacy-policy">Privacy Policy</a>
                        </div>
                    </div>
            </div>
            </div>

            <style jsx>{`

            .page-wrapper {
                display: flex;
                flex-direction: row;
                min-height: 100vh;
                margin: 0;
                padding: 0;
            }
            .signup-form {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                min-height: 100vh;
                box-sizing: border-box;
            }

            .logo-wrapper, .footer-wrapper  {
                padding: 50px;
            }

            .footer-wrapper {
                display: flex;
                justify-content: flex-start;
            }

            a {
                text-decoration: none;
                color: black;
                text-align: left;
            }

            a:hover {
                cursor: pointer;
            }

            .logo {
                font-size: 35px;
                font-weight: bold;
            }

            .left-third {
                background: rgb(208,214,255);
                background: linear-gradient(143deg, rgba(208,214,255,0.6068802521008403) 0%, rgba(144,175,176,0.23433123249299714) 100%);
                min-width: 35%;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
            }

            .right-third {
                width: 65%;
            }

            @media only screen and (min-width: 900px) {
                .signup-form .logo-wrapper a {
                    display: none;
                }
            }

            @media only screen and (max-width: 900px) {
                .page-wrapper {
                    justify-content: center;
                }

                .left-third {
                    display: none;
                }

                .right-third {
                    width: 100%;
                }

                .signup-form .logo-wrapper a{
                    display: block;
                }
            }

            `}</style>
        </>
    )
}

export default LoginLogoutWrapper
