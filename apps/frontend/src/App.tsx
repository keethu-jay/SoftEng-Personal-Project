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
import MapEditor from "@/routes/MapEditor.tsx";
import VoiceDirectory from "@/routes/VoiceDirectory.tsx";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminRoute } from "./components/AdminRoute";
import { PatientRoute } from "./components/PatientRoute";
import SanitationRequest from "@/components/ServiceRequest/SanitationRequest/SanitationRequest.tsx";
import AllPost from "@/routes/Forum/AllPost.tsx";
import DetailPost from "@/routes/Forum/DetailPost.tsx";

function App() {
    return (
        <div className="h-screen bg-accent flex flex-col parent">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navbar />}>
                        <Route index element={<Home />} />
                        
                        {/* Public routes - accessible to everyone */}
                        <Route path="directory" element={<Directions editor={false} />} />
                        <Route path="voice-directory" element={<VoiceDirectory />} />
                        <Route path="servicerequesthub" element={<ServiceRequestHub />} />
                        <Route path="all-post" element={<AllPost />} />
                        <Route path="detailed-post/:postId" element={<DetailPost />} />
                        
                        {/* Directory Management - admin only */}
                        <Route element={<AdminRoute />}>
                            <Route path="admin-database" element={<AdminDatabase />} />
                        </Route>

                        {/* Protected routes - all authenticated users (not demo mode) */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="profile" element={<Auth0Profile />} />
                        </Route>

                        {/* Admin-only routes (admin in demo mode, or authenticated admin) */}
                        <Route element={<AdminRoute />}>
                            <Route path="all-service-requests" element={<AllServiceRequests />} />
                            <Route path="map-editor" element={<MapEditor />} />
                        </Route>
                    </Route>
                </Routes>

            </BrowserRouter>
        </div>
    );
}

export default App;


