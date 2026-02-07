import React from 'react';
import Lottie from "lottie-react";

const SuccessAnimation = ({ visible }) => {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm">
            <div className="w-64 h-64 bg-white rounded-2xl shadow-2xl flex items-center justify-center p-5">
                <Lottie 
                    animationData={{
                        // Simple Green Tick Animation JSON URL
                        uri: "https://fonts.gstatic.com/s/i/short-term/release/googlestandardsymbols/check_circle/default/24px.svg" 
                    }}
                    // Note: Use a standard Lottie JSON for better effect.
                    // For now, let's use a high-quality hosted JSON:
                    animationData={require("../../assets/success-tick.json")} 
                    loop={false}
                />
            </div>
        </div>
    );
};

export default SuccessAnimation;