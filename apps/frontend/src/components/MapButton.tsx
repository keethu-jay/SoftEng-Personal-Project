import React from "react";
import { useNavigate } from "react-router-dom";

const MapButton: React.FC = () => {
    const navigate = useNavigate();

    const redirectToDirections = () => {
        navigate("/directions");
    };

    return (
        <div className="w-full sm:w-auto">
            <button
                onClick={redirectToDirections}
                className="text-xl sm:text-2xl w-full sm:w-80 border-4 border-white rounded-full text-center bg-black/40 hover:bg-black/70 text-white
                    animate-in fade-in zoom-in duration-500 px-8 py-4 font-semibold hover:scale-105 transition-all duration-300 cursor-pointer
                    focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 shadow-lg hover:shadow-xl"
            >
                DIRECTIONS
            </button>
        </div>
    );
};

export default MapButton;

