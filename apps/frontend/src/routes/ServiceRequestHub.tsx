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
        <div className="relative min-h-screen w-full overflow-hidden">
            <img 
                src={ServiceHubBackground} 
                alt="Service Request Hub Background" 
                className="absolute inset-0 h-full w-full object-cover z-0 filter brightness-75 contrast-125" 
            />

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg mb-4">
                        Service Requests
                    </h1>
                    <p className="text-lg sm:text-xl text-white/90 drop-shadow-md max-w-2xl mx-auto">
                        Select a service type to submit your request
                    </p>
                </div>

                {/* Service Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full px-4">
                    <TranslatorRequestPopup
                        title="Translator Request"
                        iconName={faLanguage} 
                    />
                    <SanitationPopup
                        title="Sanitation Request"
                        iconName={faHandHoldingDroplet} 
                    />
                    <EquipmentRequestPopup
                        title="Equipment Request"
                        iconName={faScrewdriverWrench} 
                    />
                    <SecurityRequestPopup
                        title="Security Request"
                        iconName={faShield} 
                    />
                </div>
            </div>
        </div>
    )
}

export default ServiceRequestHub;