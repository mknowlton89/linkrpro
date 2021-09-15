import React, { useState } from 'react'
import { FlexColumnDiv, StyledListItem } from '../styles/StyledComponents'

// interface Props {
//     title: string
// }

const DropDown = ({title}) => {
    const [dropDownActive, setDropDownActive] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleDropDownClick = () => {
        if (dropDownActive){
            setDropDownActive(false);
        } else {
            setDropDownActive(true);
        }
    }

    const handleSelection = (value) => {
        setInputValue(value);
        setDropDownActive(false);
    }

    const options = [
        'Facebook',
        'Google',
        'YouTube',
        'Pinterest',
    ]

    return (
        <>
            <div className="drop-down-selector" onClick={handleDropDownClick}>
                  <p>{!inputValue ? title : inputValue}</p>
                  <p className={`carrot ${dropDownActive ? 'active' : ''}`}></p>
            </div>
            <div className={`options ${!dropDownActive ? 'hidden' : ''}`}>
                    <FlexColumnDiv>
                        {options.map((option) => {
                            return <StyledListItem value={option} key={option} onClick={(e) => handleSelection(e.target.innerText)}>{option}</StyledListItem>
                        })}
                    </FlexColumnDiv>
            </div>

            <style jsx>{`
                .drop-down-selector {
                    background-color: white;
                    min-height: 55px;
                    border: none;
                    border-radius: 5px;
                    display: flex;
                    align-items: center;
                    padding: 0px 20px;
                    font-size: 22px;
                    justify-content: space-between;
                }

                .carrot {
                    border: 4px solid;
                    border-color: transparent transparent #000 #000;
                    height: 15px;
                    width: 15px;
                    transform: rotate(-45deg);
                }

                .carrot:hover {
                    cursor: pointer;
                }

                .active {
                    transform: rotate(134deg);
                }

                .options {
                    background-color: white;
                    min-height: 55px;
                    border: none;
                    border-radius: 5px;
                    display: flex;
                    align-items: center;
                    font-size: 22px;
                    margin: 10px;
                    z-index: 10;
                }

                .hidden {
                    display: none;
                }

            `}</style>
        </>
    )
}

export default DropDown
