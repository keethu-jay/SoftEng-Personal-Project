import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "@/components/Navbar";
import Home from "@/routes/Home";
import Map from "@/routes/Map";
import Directory from "@/routes/Directory";
import WithinHospital from "@/routes/WithinHospital";
import ToHospital from "@/routes/ToHospital";
import AdminDatabase from "@/routes/AdminDatabase";
import ServiceRequestHub from "@/routes/ServiceRequestHub.tsx";
import AllServiceRequests from "@/routes/AllServiceRequests.tsx";
import Directions from "@/routes/Directions.tsx";
import Auth0Profile from "@/components/Auth0Profile.tsx";

import { ProtectedRoute } from "./components/ProtectedRoute";
import SanitationRequest from "@/components/ServiceRequest/SanitationRequest/SanitationRequest.tsx";

function App() {
    return (
        <div className="h-screen bg-accent flex flex-col parent">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navbar />}>
                        <Route index element={<Home />} />
                        <Route path="directory" element={<Directions editor={false} />} />
                        <Route path="servicerequesthub" element={<ServiceRequestHub />} />

                        {/* Protected routes wrapped in ProtectedRoute */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="admin-database" element={<AdminDatabase />} />
                            <Route path="map-editor" element={<Directions editor={true} />} />
                            <Route path="all-service-requests" element={<AllServiceRequests />} />
                            <Route path="profile" element={<Auth0Profile />} />
                        </Route>
                    </Route>
                </Routes>

            </BrowserRouter>
        </div>
    );
}

export default App;


