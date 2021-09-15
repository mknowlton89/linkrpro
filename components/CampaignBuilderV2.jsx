import React, { useState } from 'react'
import { FlexColumnDiv, HelperText, PageContentWrapper, StyledListItem, StyledInput } from '../styles/StyledComponents'
import Button from './Button';
import TextInput from './TextInput'

const CampaignBuilder = () => {
    const [optionalFields, setOptionalFields] = useState(false);
    const [generatedLink, setGeneratedLink] = useState('');
    const [generatedLinkWrapper, setGeneratedLinkWrapper] = useState(false);
    const [filteredList, setFilteredList] = useState<string[]>([]);
    const [urlDropDownActive, setUrlDropDownActive] = useState<boolean>(false);
    const [urlValue, setUrlValue] = useState<string>('');
    const [sourceDropDownActive, setSourceDropDownActive] = useState<boolean>(false);
    const [sourceValue, setSourceValue] = useState<string>('');

    const handleOptionalFields = () => {
        if (optionalFields === true) {
            setOptionalFields(false);
        } else {
            setOptionalFields(true);
        }
    }

    const handleGenerateLink = () => {
        setGeneratedLink('https://www.google.com?utm_source=google&utm_medium=search&utm_campaign=mk-roofing-clicks');

        if (generatedLinkWrapper === false) {
            setGeneratedLinkWrapper(true);
        }
    }

    const handleInputFilter = () => {
        let filteredInputs = mediumOptions.filter((option) => option.includes(urlValue));
        // console.log(filteredInputs);
        setFilteredList(filteredInputs)
    }

    const handleInputChange = (e: any) => {

        if (e.target.name === "url") {
            setUrlValue(e.target.value);
            setUrlDropDownActive(true);
            handleInputFilter();
        } else if (e.target.name === "source") {
            setSourceValue(e.target.value);
            setSourceDropDownActive(true);
            handleInputFilter();
        }
    }

    const handleSelection = (value: string) => {
        setUrlValue(value);
        setDropDownActive(false)
    }

    const closeDropDown = () => {
        setDropDownActive(false)
    }

    const mediumOptions = [
        'Facebook',
        'FB',
        'Facebook Ads',
        'Google',
        'YouTube',
        'Pinterest'
    ];

    console.log(sourceValue)

    return (
        <>
            <PageContentWrapper>
                <h1>Build a Trackable URL</h1>
                <h5>Fill out all of the required fields and we'll generate a link for you.</h5>

                <div className="required-text-div">
                    <span className="required-text-span">* Indicates a field is required</span>
                </div>

                <div className="wrapper" onClick={() => closeDropDown()}>
                    <form>
                        <StyledInput
                            type="text"
                            name="url"
                            value={urlValue ? urlValue : ''}
                            placeholder="Enter the Destination URL"
                            onChange={(e: any) => handleInputChange(e)}>
                        </StyledInput>
                    </form>
                    <div className={`options ${!urlDropDownActive ? 'hidden' : ''}`}>
                        <FlexColumnDiv>
                            {filteredList.map((option) => {
                                return <StyledListItem
                                    value={option}
                                    key={option}
                                    // name="url"
                                    onClick={(e: any) => handleSelection(e.target.innerText)}>{option}
                                </StyledListItem>
                            })}
                        </FlexColumnDiv>
                    </div>
                </div>

                <div className="source-medium-name-wrapper">
                    {/* <div>
                        <TextInput fieldType="Campaign Source *" />
                        <HelperText>The referrer (e.g. google, newsletter)</HelperText>
                    </div> */}

                    <div className="wrapper" onClick={() => closeDropDown()}>
                        <form>
                            <StyledInput
                                type="text"
                                name="source"
                                value={sourceValue ? sourceValue : ''}
                                placeholder="Enter Campaign Source"
                                onChange={(e: any) => handleInputChange(e)}>
                            </StyledInput>
                        </form>
                        <div className={`options ${!dropDownActive ? 'hidden' : ''}`}>
                            <FlexColumnDiv>
                                {filteredList.map((option) => {
                                    return <StyledListItem
                                        value={option}
                                        key={option}
                                        onClick={(e: any) => handleSelection(e.target.innerText)}>{option}
                                    </StyledListItem>
                                })}
                            </FlexColumnDiv>
                        </div>
                    </div>

                    <div>
                        <TextInput fieldType="Campaign Medium *" />
                        <HelperText>Marketing medium (e.g. cpc, banner, email)</HelperText>
                    </div>

                    <div>
                        <TextInput fieldType="Campaign Name *" />
                        <HelperText>Product, promo code, or slogan (e.g. spring_sale) One of campaign name or campaign id are required.</HelperText>
                    </div>
                </div>

                <div>
                    <p className="show-optional-fields" onClick={() => handleOptionalFields()}>
                        {optionalFields ? "- - - - Hide Optional Fields - - - - -" : "- - - - - Show Optional Fields - - - - -"}
                    </p>
                </div>
                <div className={!optionalFields ? 'hidden' : ''}>
                    <div>
                        <TextInput fieldType="Campaign ID" />
                        <HelperText>The ads campaign id.</HelperText>
                    </div>


                    <div>
                        <TextInput fieldType="Campaign Term" />
                        <HelperText>Identify the paid keywords</HelperText>
                    </div>

                    <div>
                        <TextInput fieldType="Campaign Context" />
                        <HelperText>Use to differentiate ads</HelperText>
                    </div>
                </div>

                <Button onClick={() => handleGenerateLink()} primary>Generate Link</Button>

                <div className={`link-wrapper ${!generatedLinkWrapper ? 'hidden' : ''}`}>
                    <p className="generated-link">{generatedLink}</p>
                    <p className="copy-btn">COPY TO CLIPBOARD</p>
                </div>
            </PageContentWrapper>

            <style jsx>{`
            h1 {
                margin-bottom: 0px;
            }

            h5 {
                margin-top: 10px;
            }

            .required {
                font-weight: bold;
            }

            .required-text-div {
                display: flex;
                align-self: flex-end;
            }

            .source-medium-name-wrapper {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }

            .required-text-span {
                font-size: 14px;
                font-style: italic;
            }


            .show-optional-fields {
                text-align: center;
                padding-top: 30px;
            }

            .show-optional-fields:hover {
                cursor: pointer;
            }

            .link-wrapper {
                background-color: white;
                border-radius: 5px;
                font-size: 18px;
                padding: 20px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            }

            .copy-btn {
                font-style: italic;
                font-size: 14px;
            }

            .copy-btn:hover {
                cursor: pointer;
            }

            .generated-link {
                font-weight: bold;
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

export default CampaignBuilder
