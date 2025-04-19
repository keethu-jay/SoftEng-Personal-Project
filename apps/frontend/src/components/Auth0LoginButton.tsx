import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <div className="">
            <button onClick={() => loginWithRedirect()}
                    className="text-2xl border-4 w-80 border-white rounded-full text-center bg-black/30 hover:bg-black/60 text-white
                    animate-in fade-in zoom-in duration-500 p-4 font-nunito hover:scale-110 cursor-pointer"
            >
                LOGIN
            </button>
        </div>
    )
};

export default LoginButton;