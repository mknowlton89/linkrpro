import React, { useState, useEffect } from 'react'
import { StyledInput, StyledListItem, FlexColumnDiv } from '../styles/StyledComponents'

// interface Props {
//     fieldPreviewText: string,
//     fieldName: string,
//     setLinkInputs: any,
//     linkInputs: any,
//     fieldType: string,
//     error?: boolean,
// }

const TextInput = ({ fieldPreviewText, fieldName, setLinkInputs, linkInputs, error }) => {
    const [filteredList, setFilteredList] = useState([]);
    const [dropDownActive, setDropDownActive] = useState(false);
    const [isValid, setIsValid] = useState(true);

    // TODO: Figure out how to define options as an object that contains arrays of strings
    let options = {
        campaignUrl: [
            'https://www.google.com',
            'https://www.facebook.com',
            'https://www.twitter.com'
        ],
        campaignMedium: [
            'facebook',
            'fb',
            'facebook ads',
            'google',
            'youTube',
            'pinterest'
        ],
        campaignSource: [
            'facebook',
            'fb',
            'facebook ads',
            'google',
            'youtube',
            'pinterest'
        ],
        campaignName: [
            'campaign1',
            'campaign2',
            'campaign3'
        ],
        campaignId: [
            'campaign1',
            'campaign2',
            'campaign3'
        ],
        campaignTerm: [
            'campaign1',
            'campaign2',
            'campaign3'
        ],
        campaignContext: [
            'campaign1',
            'campaign2',
            'campaign3'
        ],
    }

    const handleInputFilter = (input) => {
        setFilteredList(options[fieldName].filter((option) => option.includes(input)))
    }

    const handleInputChange = (input, fieldName) => {
        setLinkInputs({ ...linkInputs, [fieldName]: input })
        handleInputFilter(input);
    }

    const handleSelection = (value, fieldName) => {
        setLinkInputs({ ...linkInputs, [fieldName]: value })
        setDropDownActive(false)
    }

    const closeDropDown = () => {
        setDropDownActive(false)
    }

    useEffect(() => {
        if (filteredList.length > 0) {
            setDropDownActive(true)
        }

        if ((dropDownActive) && (linkInputs.campaignUrl === '' || filteredList.length === 0)) {
            setDropDownActive(false)
        }
    }, [filteredList])

    return (
        <div className="wrapper" onClick={() => closeDropDown()}>
            <form>
                <StyledInput
                    type="text"
                    error={!isValid}
                    fieldName={fieldName}
                    value={linkInputs[fieldName] ? linkInputs[fieldName] : ''}
                    placeholder={`Enter ${fieldPreviewText}`}
                    onChange={(e) => handleInputChange(e.target.value.toLowerCase(), fieldName)}>
                </StyledInput>
            </form>
            <div className={`options ${!dropDownActive ? 'hidden' : ''}`}>
                <FlexColumnDiv>
                    {filteredList.map((option) => {
                        return <StyledListItem
                            value={option}
                            fieldName={fieldName}
                            key={option}
                            onClick={(e) => handleSelection(e.target.innerText, fieldName)}>{option}
                        </StyledListItem>
                    })}
                </FlexColumnDiv>
            </div>


            <style jsx>{`
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

                .required {
                    font-weight: bold;
                }

            `}</style>
        </div>
    )
}

export default TextInput
