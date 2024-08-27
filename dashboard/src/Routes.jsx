/* eslint-disable react/prop-types */
import { Suspense, lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

const Login = lazy(() => import("./components/Login"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const PatientManagement = lazy(() => import("./components/PatientManagement"));
const CampaignManagement = lazy(() => import("./components/CampaignManagement"));
const FeedbackManagement = lazy(() => import("./components/FeedbackManagement"));
const Notifications = lazy(() => import("./components/Notifications"));
const NotFound = lazy(() => import("./NotFound"));

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

const AppRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/patients" element={<PatientManagement />} />
                    <Route path="/campaign" element={<CampaignManagement />} />
                    <Route path="/feedback" element={<FeedbackManagement />} />
                    <Route path="/notifications" element={<Notifications />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;