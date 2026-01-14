import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from '@/components/ui/dialog.tsx';
import {Card, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import SecurityServiceRequest from "@/components/ServiceRequest/SecurityRequest/SecurityServiceRequest.tsx";

const SecurityRequestPopup: React.FC<{title: string, iconName: IconDefinition}> = ({title, iconName}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card className="relative bg-[#0077b6] hover:bg-[#005a8a] border-2 border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center h-64 w-full text-white cursor-pointer group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50">
                    <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                        <FontAwesomeIcon icon={iconName} className="text-5xl sm:text-6xl" />
                    </div>
                    <CardHeader className="text-center p-4">
                        <CardTitle className="text-xl sm:text-2xl font-semibold">
                            {title}
                        </CardTitle>
                    </CardHeader>
                </Card>
            </DialogTrigger>

            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-500 border-2 border-[#0077b6] bg-white shadow-2xl">
                <SecurityServiceRequest />
            </DialogContent>
        </Dialog>
    );
}

export default SecurityRequestPopup;