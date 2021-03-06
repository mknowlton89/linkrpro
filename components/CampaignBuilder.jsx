import React, { useState, useEffect } from 'react'
import { HelperText, PageContentWrapper, StyledLoading } from '../styles/StyledComponents'
import Button from './Button';
import TextInput from './TextInput'
import API from '../utils/API'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const CampaignBuilder = () => {
    const { user } = useContext(UserContext);
    const [optionalFields, setOptionalFields] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [generatedLink, setGeneratedLink] = useState('');
    const [generatedLinkWrapper, setGeneratedLinkWrapper] = useState(false);
    const [isLinkCopied, setIsLinkCopied] = useState(false);
    const [linkInputs, setLinkInputs] = useState({
        campaignUrl: '',
        campaignSource: '',
        campaignMedium: '',
        campaignName: '',
        campaignId: '',
        campaignTerm: '',
        campaignContext: '',
    });
    const [utmParameters, setUtmParameters] = useState({})


    const handleOptionalFields = () => {
        if (optionalFields === true) {
            setOptionalFields(false);
        } else {
            setOptionalFields(true);
        }
    }

    const saveUtmParameters = () => {
        for (const parameter in linkInputs) {
            if (!linkInputs[parameter]) {
                return;
            }
            if (!utmParameters[parameter].includes(linkInputs[parameter])) {
                API.createUtmParameter(parameter, linkInputs[parameter], user._id)
            } else {
                console.log("Already in DB", parameter)
            };
        }
    }

    const saveLink = (link) => {
        API.createNewLink(link, user._id)
        saveUtmParameters()
    };

    const generateLink = () => {
        setGeneratedLink(`
            ${linkInputs.campaignUrl}?utm_source=${linkInputs.campaignSource}&utm_medium=${linkInputs.campaignMedium}&utm_campaign=${linkInputs.campaignName}${linkInputs.campaignId && `&utm_id=${linkInputs.campaignId}`}${linkInputs.campaignTerm && `&utm_term=${linkInputs.campaignTerm}`}${linkInputs.campaignContext && `&utm_context=${linkInputs.campaignContext}`}
        `);
        setGeneratedLinkWrapper(true);
        if (isLinkCopied) {
            setIsLinkCopied(false);
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLink)
        setIsLinkCopied(true);
    }

    useEffect(() => {
        if (generatedLink) {
            let link = generatedLink
            saveLink(link);
        }
    }, [generatedLink])

    useEffect(() => {
        if (linkInputs.campaignUrl && linkInputs.campaignMedium && linkInputs.campaignSource && linkInputs.campaignName) {
            setIsButtonDisabled(false);
        }
    }, [linkInputs])

    useEffect(() => {
        if (user) {

            let utmParameterOptions = [
                'campaignUrl',
                'campaignSource',
                'campaignMedium',
                'campaignName',
                'campaignId',
                'campaignTerm',
                'campaignContext',
            ]

            utmParameterOptions.forEach((parameter) => {
                API.getUtmParameters(user._id, parameter)
                    .then((res) => {
                        setUtmParameters(prevState => {
                            return {
                                ...prevState,
                                [parameter]: res.data,
                            }
                        })
                    })
                    .catch(err => console.log(err))
            })
        }
    }, [user]);

    return (
            <>
                <PageContentWrapper>
                    <h1>Build a Trackable URL</h1>
                    <h4>Fill out all of the required fields and we'll generate a link for you.</h4>

                    <div className="required-text-div">
                        <span className="required-text-span">* Indicates a field is required</span>
                    </div>

                    <div>
                        <TextInput
                            fieldPreviewText="Destination URL *"
                            fieldName="campaignUrl"
                            fieldType="url"
                            linkInputs={linkInputs}
                            setLinkInputs={setLinkInputs}
                            options={utmParameters}
                        />
                        <HelperText>The full website URL where you want traffic to go. (e.g. https://www.example.com)</HelperText>
                    </div>

                    <div className="source-medium-name-wrapper">
                        <div>
                            <TextInput
                                fieldPreviewText="Campaign Source *"
                                fieldName="campaignSource"
                                fieldType="string"
                                linkInputs={linkInputs}
                                setLinkInputs={setLinkInputs}
                                options={utmParameters}
                            />
                            <HelperText>The referrer (e.g. google, newsletter)</HelperText>
                        </div>

                        <div className="middle-input">
                            <TextInput
                                fieldPreviewText="Campaign Medium *"
                                fieldName="campaignMedium"
                                fieldType="string"
                                linkInputs={linkInputs}
                                setLinkInputs={setLinkInputs}
                                options={utmParameters}
                            />
                            <HelperText>Marketing medium (e.g. cpc, banner, email)</HelperText>
                        </div>

                        <div>
                            <TextInput
                                fieldPreviewText="Campaign Name *"
                                fieldName="campaignName"
                                fieldType="string"
                                linkInputs={linkInputs}
                                setLinkInputs={setLinkInputs}
                                options={utmParameters}
                            />
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
                            <TextInput
                                fieldPreviewText="Campaign ID"
                                fieldName="campaignId"
                                fieldType="string"
                                linkInputs={linkInputs}
                                setLinkInputs={setLinkInputs}
                                options={utmParameters}
                            />
                            <HelperText>The ads campaign id.</HelperText>
                        </div>


                        <div>
                            <TextInput
                                fieldPreviewText="Campaign Term"
                                fieldName="campaignTerm"
                                fieldType="string"
                                linkInputs={linkInputs}
                                setLinkInputs={setLinkInputs}
                                options={utmParameters}
                            />
                            <HelperText>Identify the paid keywords</HelperText>
                        </div>

                        <div>
                            <TextInput
                                fieldPreviewText="Campaign Context"
                                fieldName="campaignContext"
                                fieldType="string"
                                linkInputs={linkInputs}
                                setLinkInputs={setLinkInputs}
                                options={utmParameters}
                            />
                            <HelperText>Use to differentiate ads</HelperText>
                        </div>
                    </div>

                    <Button
                        onClick={() => generateLink()}
                        primary
                        disabled={isButtonDisabled && 'disabled'}>
                        Generate Link</Button>

                    <div
                        className={`link-wrapper ${!generatedLinkWrapper ? 'hidden' : ''}`}>
                        <p className="generated-link">
                            {generatedLink}
                        </p>
                        <p
                            onClick={copyToClipboard}
                            className="copy-btn">
                            {!isLinkCopied ? 'COPY TO CLIPBOARD' : 'COPIED!'}
                        </p>
                    </div>
                </PageContentWrapper>

                <style jsx>{`
            h1 {
                margin-bottom: 0px;
                margin-top: 27px;
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

            .source-medium-name-wrapper div {
                width: 100%;
            }

            .middle-input {
                padding: 0px 10px 0px 10px;
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
                padding: 0px 10px 0px 10px;
                text-align: center;
            }

            .copy-btn:hover {
                cursor: pointer;
            }

            .generated-link {
                font-weight: bold;
                overflow-wrap: anywhere;
                padding: 0px 10px 0px 10px;
            }

            .hidden {
                display: none;
            }

            @media only screen and (max-width: 1250px) {
                .source-medium-name-wrapper {
                    flex-direction: column;
                }

                .middle-input {
                    padding: 0px;
                }
              }

            @media only screen and (max-width: 615px) {
            .link-wrapper {
                flex-direction: column;
            }
            }

            `}</style>
            </>
        )
}

export default CampaignBuilder
