import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from '@/components/ui/dialog.tsx';
import {Card, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import TranslatorServiceRequest from "@/components/ServiceRequest/TranslatorRequest/TranslatorServiceRequest.tsx";

const TranslatorRequestPopup: React.FC<{title: string, iconName: IconDefinition}> = ({title, iconName}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card className="relative bg-[#0077b6]/90 hover:bg-[#005a8a] border border-white/40 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center gap-3 px-4 py-6 sm:px-6 sm:py-8 rounded-3xl w-full text-white cursor-pointer group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50">
                    <div className="flex justify-center w-full">
                        <FontAwesomeIcon icon={iconName} className="text-3xl sm:text-4xl md:text-5xl transform group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <CardHeader className="p-0 w-full flex items-center justify-center">
                        <CardTitle className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold whitespace-normal text-center">
                            {title}
                        </CardTitle>
                    </CardHeader>
                </Card>
            </DialogTrigger>
            <DialogContent className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-500 border-2 border-[#0077b6] bg-white shadow-2xl rounded-3xl">
                <TranslatorServiceRequest />
            </DialogContent>
        </Dialog>
    );
}

export default TranslatorRequestPopup;