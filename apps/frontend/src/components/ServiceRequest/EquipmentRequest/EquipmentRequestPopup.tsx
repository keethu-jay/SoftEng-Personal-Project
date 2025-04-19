import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from '@/components/ui/dialog.tsx';
import {Card, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import EquipmentServiceRequest from "@/components/ServiceRequest/EquipmentRequest/EquipmentServiceRequest.tsx";

const EquipmentRequestPopup: React.FC<{title: string, iconName: IconDefinition}> = ({title, iconName}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card className="relative bg-[#d0ccd0] hover:bg-[#addde5] justify-center h-70 w-60 text-black">
                    <FontAwesomeIcon icon={iconName} size="2x" className="text-6xl"/>
                    <CardHeader className="place-content-center">
                        <CardTitle className="text-3xl">
                            <p>{title}</p>
                        </CardTitle>
                    </CardHeader>
                </Card>
            </DialogTrigger>

            <DialogContent className="place-content-center animate-in fade-in zoom-in duration-500 border-zinc-200 bg-zinc-200 h-150">
                <EquipmentServiceRequest />
            </DialogContent>
        </Dialog>
    );
}

export default EquipmentRequestPopup;