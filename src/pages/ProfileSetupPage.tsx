import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Heart, Target, Scale, Ruler, Calendar, AlertCircle, Activity, Clock, Users, Flame } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export const ProfileSetupPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);
  const [showPlan, setShowPlan] = useState(false);

  const [formData, setFormData] = useState({
    age: '',
    height: '',
    weight: '',
    activityLevel: '',
    fitnessGoals: [] as string[],
    dietaryRestrictions: [] as string[],
    medicalConditions: [] as string[],
    culturalPreferences: [] as string[]
  });

  const totalSteps = 4;

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary', description: 'Little to no exercise' },
    { value: 'light', label: 'Light', description: '1-3 days per week' },
    { value: 'moderate', label: 'Moderate', description: '3-5 days per week' },
    { value: 'active', label: 'Very Active', description: '6-7 days per week' },
    { value: 'extra', label: 'Extra Active', description: 'Physical job + exercise' }
  ];

  const fitnessGoalOptions = [
    'Weight Loss', 'Weight Gain', 'Muscle Building', 'Endurance', 'General Health', 'Athletic Performance'
  ];

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Low-Carb', 'Paleo', 'Mediterranean'
  ];

  const medicalOptions = [
    'Diabetes', 'Hypertension', 'High Cholesterol', 'Heart Disease', 'Food Allergies', 'Thyroid Issues'
  ];

  const culturalOptions = [
    'Asian', 'Mediterranean', 'Latin American', 'Middle Eastern', 'African', 'Indian', 'European'
  ];

  const calculateBMI = () => {
    if (formData.height && formData.weight) {
      const heightInMeters = parseFloat(formData.height) / 100;
      const weightInKg = parseFloat(formData.weight);
      return (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return null;
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { category: 'Normal', color: 'text-leaf-green' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-citrus-glow' };
    return { category: 'Obese', color: 'text-coral-energy' };
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].includes(value)
        ? (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
        : [...(prev[field as keyof typeof prev] as string[]), value]
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      // First, update the profile
      const { error } = await supabase
        .from('profiles')
        .update({
          age: parseInt(formData.age),
          height: parseFloat(formData.height),
          weight: parseFloat(formData.weight),
          activity_level: formData.activityLevel,
          fitness_goals: formData.fitnessGoals,
          dietary_restrictions: formData.dietaryRestrictions,
          medical_conditions: formData.medicalConditions,
          cultural_preferences: formData.culturalPreferences,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      // After profile is saved, generate AI diet plan
      await generateInitialDietPlan();
      
      // Show the generated plan on screen
      setShowPlan(true);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateInitialDietPlan = async () => {
    try {
      // Get the updated profile data
      const profile = {
        age: parseInt(formData.age),
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        activity_level: formData.activityLevel,
        fitness_goals: formData.fitnessGoals,
        dietary_restrictions: formData.dietaryRestrictions,
        medical_conditions: formData.medicalConditions,
        cultural_preferences: formData.culturalPreferences
      };

      // Import deepseekAI dynamically to avoid circular imports
      const { deepseekAI } = await import('../lib/deepseek');
      
      // Generate meal plan using Deepseek AI
      const aiMealPlan = await deepseekAI.generateMealPlan(profile);
      
      // Calculate total daily calories from the first day
      const firstDay = Object.values(aiMealPlan)[0];
      const dailyCalories = Object.values(firstDay).reduce((total: number, meal: any) => total + meal.calories, 0);

      // Save the generated meal plan to database
      const newPlan = {
        user_id: user.id,
        plan_name: 'Welcome Plan - AI Generated',
        calories_target: dailyCalories,
        meals: aiMealPlan
      };

      const { data, error } = await supabase
        .from('meal_plans')
        .insert([newPlan])
        .select()
        .single();

      if (error) throw error;
      
      // Store the generated plan to display
      setGeneratedPlan(data);

    } catch (error) {
      console.error('Error generating initial diet plan:', error);
      // Don't throw error here - profile setup should still complete
    }
  };
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <User className="h-12 w-12 text-vital-mint mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-graphite-ink">Basic Information</h2>
              <p className="text-gray-600">Let's start with some basic details about you</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-graphite-ink mb-2">
                  <Calendar className="inline h-4 w-4 mr-2" />
                  Age
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vital-mint focus:border-vital-mint bg-soft-cloud"
                  placeholder="25"
                  min="13"
                  max="120"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-graphite-ink mb-2">
                  <Ruler className="inline h-4 w-4 mr-2" />
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vital-mint focus:border-vital-mint bg-soft-cloud"
                  placeholder="170"
                  min="100"
                  max="250"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-graphite-ink mb-2">
                  <Scale className="inline h-4 w-4 mr-2" />
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vital-mint focus:border-vital-mint bg-soft-cloud"
                  placeholder="70"
                  min="30"
                  max="300"
                />
              </div>
            </div>

            {/* BMI Calculator */}
            {formData.height && formData.weight && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-vital-mint/10 to-citrus-glow/10 p-6 rounded-xl"
              >
                <h3 className="font-semibold text-graphite-ink mb-2">Your BMI</h3>
                <div className="text-3xl font-bold text-vital-mint">
                  {calculateBMI()}
                </div>
                {calculateBMI() && (
                  <div className={`text-sm font-medium ${getBMICategory(parseFloat(calculateBMI()!)).color}`}>
                    {getBMICategory(parseFloat(calculateBMI()!)).category}
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <Activity className="h-12 w-12 text-vital-mint mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-graphite-ink">Activity Level</h2>
              <p className="text-gray-600">How active are you on a typical day?</p>
            </div>

            <div className="space-y-3">
              {activityLevels.map((level) => (
                <motion.div
                  key={level.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleInputChange('activityLevel', level.value)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                    formData.activityLevel === level.value
                      ? 'bg-gradient-primary text-white'
                      : 'bg-soft-cloud hover:bg-gray-100'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{level.label}</h3>
                      <p className={`text-sm ${formData.activityLevel === level.value ? 'text-white/80' : 'text-gray-600'}`}>
                        {level.description}
                      </p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 ${
                      formData.activityLevel === level.value
                        ? 'border-white bg-white'
                        : 'border-gray-300'
                    }`}>
                      {formData.activityLevel === level.value && (
                        <div className="w-2 h-2 bg-vital-mint rounded-full mx-auto mt-1"></div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <Target className="h-12 w-12 text-vital-mint mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-graphite-ink">Fitness Goals & Diet</h2>
              <p className="text-gray-600">What are you trying to achieve? (Select multiple)</p>
            </div>

            <div className="space-y-6">
              {/* Fitness Goals */}
              <div>
                <h3 className="font-semibold text-graphite-ink mb-3">Fitness Goals</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {fitnessGoalOptions.map((goal) => (
                    <motion.button
                      key={goal}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleArrayToggle('fitnessGoals', goal)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        formData.fitnessGoals.includes(goal)
                          ? 'bg-gradient-primary text-white'
                          : 'bg-soft-cloud hover:bg-gray-100 text-graphite-ink'
                      }`}
                    >
                      {goal}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Dietary Preferences */}
              <div>
                <h3 className="font-semibold text-graphite-ink mb-3">Dietary Preferences</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {dietaryOptions.map((diet) => (
                    <motion.button
                      key={diet}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleArrayToggle('dietaryRestrictions', diet)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        formData.dietaryRestrictions.includes(diet)
                          ? 'bg-gradient-primary text-white'
                          : 'bg-soft-cloud hover:bg-gray-100 text-graphite-ink'
                      }`}
                    >
                      {diet}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <Heart className="h-12 w-12 text-vital-mint mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-graphite-ink">Health & Culture</h2>
              <p className="text-gray-600">Help us personalize your experience</p>
            </div>

            <div className="space-y-6">
              {/* Medical Conditions */}
              <div>
                <h3 className="font-semibold text-graphite-ink mb-3 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Medical Conditions (Optional)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {medicalOptions.map((condition) => (
                    <motion.button
                      key={condition}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleArrayToggle('medicalConditions', condition)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        formData.medicalConditions.includes(condition)
                          ? 'bg-gradient-primary text-white'
                          : 'bg-soft-cloud hover:bg-gray-100 text-graphite-ink'
                      }`}
                    >
                      {condition}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Cultural Preferences */}
              <div>
                <h3 className="font-semibold text-graphite-ink mb-3">Cultural Food Preferences</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {culturalOptions.map((culture) => (
                    <motion.button
                      key={culture}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleArrayToggle('culturalPreferences', culture)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        formData.culturalPreferences.includes(culture)
                          ? 'bg-gradient-primary text-white'
                          : 'bg-soft-cloud hover:bg-gray-100 text-graphite-ink'
                      }`}
                    >
                      {culture}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.age && formData.height && formData.weight;
      case 2:
        return formData.activityLevel;
      case 3:
        return formData.fitnessGoals.length > 0;
      case 4:
        return true; // Optional step
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-cloud to-white pt-20 font-poppins">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-graphite-ink">Profile Setup</h1>
            <span className="text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-primary h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6 py-3 text-graphite-ink bg-gray-100 rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentStep === totalSteps ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating Your AI Diet Plan...
                  </div>
                ) : (
                  'Complete Setup & Generate Diet Plan'
                )}
              </motion.button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="px-6 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};