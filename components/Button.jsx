import React from 'react'
import { StyledButton } from '../styles/StyledComponents'
// interface Props {
//     onClick?: any,
//     children: string,
//     primary?: boolean,
//     disabled?: any,
// };

const Button = ({onClick, children, primary, disabled}) => {
    return (
            <StyledButton disabled={disabled} primary={primary} onClick={onClick}>{children}</StyledButton>
    )
}

export default Button
