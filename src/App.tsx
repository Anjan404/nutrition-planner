import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { ProfileSetupPage } from './pages/ProfileSetupPage';
import { DietPlanPage } from './pages/DietPlanPage';
import { MealSuggestionsPage } from './pages/MealSuggestionsPage';
import { ProgressTrackerPage } from './pages/ProgressTrackerPage';
import { CulturalPreferencesPage } from './pages/CulturalPreferencesPage';
import { WearableIntegrationPage } from './pages/WearableIntegrationPage';
import { FoodTrackerPage } from './pages/FoodTrackerPage';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-soft-cloud">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/profile-setup" element={
              <ProtectedRoute>
                <ProfileSetupPage />
              </ProtectedRoute>
            } />
            <Route path="/diet-plan" element={
              <ProtectedRoute>
                <DietPlanPage />
              </ProtectedRoute>
            } />
            <Route path="/meal-suggestions" element={
              <ProtectedRoute>
                <MealSuggestionsPage />
              </ProtectedRoute>
            } />
            <Route path="/progress-tracker" element={
              <ProtectedRoute>
                <ProgressTrackerPage />
              </ProtectedRoute>
            } />
            <Route path="/cultural-preferences" element={
              <ProtectedRoute>
                <CulturalPreferencesPage />
              </ProtectedRoute>
            } />
            <Route path="/wearable-integration" element={
              <ProtectedRoute>
                <WearableIntegrationPage />
              </ProtectedRoute>
            } />
            <Route path="/food-tracker" element={
              <ProtectedRoute>
                <FoodTrackerPage />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;