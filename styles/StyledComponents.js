import styled from 'styled-components'

export const StyledButton = styled.button`
        background: ${props => props.primary ? "#3e3eaf" : "white"};
        color: ${props => props.primary ? "white" : "#3e3eaf"};
        border: ${props => !props.primary ? "3px solid #3e3eaf" : "none"};
        height: 55px;
        border-radius: 5px;
        font-size: 22px;
        padding: 0px 30px;
        margin: 10px 0px;
        background: ${props => props.disabled && "gray"};

        :hover {
        ${'' /* cursor: pointer; */}
        cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
    }
`

export const StyledInput = styled.input`
    border-radius: 5px;
    height: 55px;
    border: 1px solid;
    border-color: ${props => props.error ? "tomato" : "black"};
    margin: 20px 0px 0px 0px;
    font-size: 16px;
    color: black;
    width: 100%;
    box-sizing: border-box;
    padding-left:25px;
    background-color: white;
    word-wrap: normal;

    :focus {
        outline: none;
    }

    ::placeholder {
        color: black;
        ${'' /* padding-left: 25px; */}
    }

    @media only screen and (max-width: 975px) {
        font-size: 15px;
    }

    @media only screen and (max-width: 500px) {
        font-size: 13px;
    }
`

export const StyledSelect = styled.select`
    border-radius: 5px;
    height: 55px;
    background: transparent;
    border: 3px solid black;
    margin: 10px;
    font-size: 22px;
    padding: 0px 20px;

    :focus {
        outline: none;
    }
`

export const SubHeader = styled.h2`
    font-size: 30px;
    margin: 10px;
`

export const StyledDropDown = styled.div`
    background-color: white;
    min-height: 55px;
    border: none;
    border-radius: 5px;
    display: flex;
    align-items: center;
    ${'' /* padding: 0px 20px; */}
    font-size: 22px;
    margin: 10px;

    :first-child {
        padding: 0px 20px;
    }
`

export const StyledListItem = styled.li`
    list-style: none;
    padding: 15px 20px;
    width: 100%;

    :hover {
        background-color: #fff8ff;
        cursor: pointer;
    }

    :hover :first-child {
        border-radius: 5px 5px 0px 0px;
    }

    :hover :last-child {
        border-radius: 0px 0px 5px 5px;
    }
`

export const FlexColumnDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const FlexCentered = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`

export const PageContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 20px 35px;
    background-color: #f3f3f3;
    width: 100%;
    box-sizing: border-box;
`

export const HelperText = styled.p`
    font-style: italic;
    margin: 5px 20px 0px 20px;
    font-size: 13px;
`

export const StyledLoading = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    width: 100vw;
    height: 100vh;
`

export const StyledLink = styled.a`
    background: palevioletred;
    color: white;
    border-radius: 5px;
    font-size: 22px;
    padding: 10px 30px;
    margin: 10px;
    text-decoration: none;
`

export const StyledSecondaryLink = styled.a`
    border-radius: 5px;
    font-size: 22px;
    padding: 10px 30px;
    margin: 10px;
    text-decoration: none;
    background: white;
    color: palevioletred;
    border: 3px solid palevioletred;
`
