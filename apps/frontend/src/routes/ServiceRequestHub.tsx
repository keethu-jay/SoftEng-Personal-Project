import React from 'react';
import {faLanguage} from "@fortawesome/free-solid-svg-icons";
import {faHandHoldingDroplet} from "@fortawesome/free-solid-svg-icons";
import {faScrewdriverWrench} from "@fortawesome/free-solid-svg-icons";
import {faShield} from "@fortawesome/free-solid-svg-icons";
import TranslatorRequestPopup from "@/components/ServiceRequest/TranslatorRequest/TranslatorRequestPopup.tsx";
import SanitationPopup  from "@/components/ServiceRequest/SanitationRequest/SanitationPopup.tsx";
import EquipmentRequestPopup from "@/components/ServiceRequest/EquipmentRequest/EquipmentRequestPopup.tsx";
import SecurityRequestPopup from "@/components/ServiceRequest/SecurityRequest/SecurityRequestPopup.tsx";
import ServiceHubBackground from "../public/ServiceHubBackground.png";



const ServiceRequestHub = () => {
    return (
        <div>
                <img src={ServiceHubBackground} className="absolute h-screen w-screen z-0 filter brightness-75 contrast-125" />


                <div className="relative flex justify-center">
                    <div className="relative z-10 flex items-center justify-center mt-12 bg-gray-300/60 h-20 w-110 rounded-full text-5xl font-bold font-nunito">
                        Service Requests</div>
                </div>
                <div className="relative flex items-center justify-center h-screen w-screen overflow-hidden">
                    <div className="flex flex-row items-center justify-evenly bg-blue-900/80 w-300 h-100 rounded-md">
                        <TranslatorRequestPopup
                            title="Translator Request "
                            iconName={faLanguage} />
                        <SanitationPopup
                            title="Sanitation Request"
                            iconName={faHandHoldingDroplet} />
                        <EquipmentRequestPopup
                            title="Equipment Request "
                            iconName={faScrewdriverWrench} />
                        <SecurityRequestPopup
                            title="Security Request"
                            iconName={faShield} />
                    </div>
                </div>
            </div>
    )
}

export default ServiceRequestHub;