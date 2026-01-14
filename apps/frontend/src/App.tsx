import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Component imports
import Navbar from "@/components/Navbar";
import Home from "@/routes/Home";
import AdminDatabase from "@/routes/AdminDatabase";
import ServiceRequestHub from "@/routes/ServiceRequestHub.tsx";
import AllServiceRequests from "@/routes/AllServiceRequests.tsx";
import Directions from "@/routes/Directions.tsx";
import Auth0Profile from "@/components/Auth0Profile.tsx";
import MapEditor from "@/routes/MapEditor.tsx";
import VoiceDirectory from "@/routes/VoiceDirectory.tsx";
import PortfolioDisclaimer from "@/components/PortfolioDisclaimer";

// Route protection components
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminRoute } from "./components/AdminRoute";
import { PatientRoute } from "./components/PatientRoute";

// Service request components
import SanitationRequest from "@/components/ServiceRequest/SanitationRequest/SanitationRequest.tsx";

// Forum components
import AllPost from "@/routes/Forum/AllPost.tsx";
import DetailPost from "@/routes/Forum/DetailPost.tsx";

/**
 * Main application component that sets up routing and renders the application structure.
 * 
 * This component:
 * - Wraps the app in BrowserRouter for client-side routing
 * - Displays the portfolio disclaimer modal on first visit
 * - Defines all application routes with appropriate access controls
 * - Separates public, protected, and admin-only routes
 */
function App() {
    return (
        <div className="h-screen bg-accent flex flex-col parent">
            <PortfolioDisclaimer />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navbar />}>
                        {/* Home page - accessible to everyone */}
                        <Route index element={<Home />} />
                        
                        {/* Public routes - accessible to everyone */}
                        <Route path="directions" element={<Directions editor={false} />} />
                        <Route path="directory" element={<VoiceDirectory />} />
                        <Route path="voice-directory" element={<VoiceDirectory />} />
                        <Route path="servicerequesthub" element={<ServiceRequestHub />} />
                        <Route path="all-post" element={<AllPost />} />
                        <Route path="detailed-post/:postId" element={<DetailPost />} />
                        
                        {/* Admin-only routes - requires admin access */}
                        <Route element={<AdminRoute />}>
                            <Route path="admin-database" element={<AdminDatabase />} />
                            <Route path="all-service-requests" element={<AllServiceRequests />} />
                            <Route path="map-editor" element={<MapEditor />} />
                        </Route>

                        {/* Protected routes - requires authentication (not demo mode) */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="profile" element={<Auth0Profile />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
