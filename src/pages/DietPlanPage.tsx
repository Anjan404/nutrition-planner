import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Clock, Flame, Users, RefreshCw, Download, Share2, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockNutritionAI, type WeeklyMealPlan } from '../lib/deepseek';

interface MealPlan {
  id: string;
  plan_name: string;
  meals: any;
  calories_target: number;
  created_at: string;
}

export const DietPlanPage: React.FC = () => {
  const { user } = useAuth();
  const [currentPlan, setCurrentPlan] = useState<MealPlan | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateNewPlan = async () => {
    if (!user) return;
    
    setGenerating(true);
    setError(null);
    
    try {
      // Mock profile data
      const profile = {
        age: 30,
        height: 170,
        weight: 70,
        activity_level: 'moderate',
        fitness_goals: ['General Health'],
        dietary_restrictions: [],
        medical_conditions: [],
        cultural_preferences: []
      };

      // Generate meal plan using mock AI
      const aiMealPlan = await mockNutritionAI.generateMealPlan(profile);
      
      // Calculate total daily calories from the first day
      const firstDay = Object.values(aiMealPlan)[0];
      const dailyCalories = Object.values(firstDay).reduce((total: number, meal: any) => total + meal.calories, 0);

      const newPlan = {
        id: Math.random().toString(36).substr(2, 9),
        plan_name: 'AI-Generated Personalized Plan',
        calories_target: dailyCalories,
        meals: aiMealPlan,
        created_at: new Date().toISOString()
      };

      setCurrentPlan(newPlan);
    } catch (error) {
      console.error('Error generating meal plan:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate meal plan');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-cloud to-white pt-20 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-graphite-ink mb-2">Your Diet Plan</h1>
            <p className="text-gray-600">AI-powered personalized nutrition plan tailored just for you</p>
          </div>
          
          <div className="flex space-x-3 mt-4 md:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generateNewPlan}
              disabled={generating}
              className="bg-gradient-primary text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center space-x-2 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${generating ? 'animate-spin' : ''}`} />
              <span>{generating ? 'Generating...' : 'New Plan'}</span>
            </motion.button>
            
            {currentPlan && (
              <>
                <button className="bg-white border-2 border-vital-mint text-vital-mint px-4 py-3 rounded-lg font-semibold hover:bg-vital-mint hover:text-white transition-all duration-200 flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
                <button className="bg-white border-2 border-coral-energy text-coral-energy px-4 py-3 rounded-lg font-semibold hover:bg-coral-energy hover:text-white transition-all duration-200 flex items-center space-x-2">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-alert-red/10 border border-alert-red/20 text-alert-red px-6 py-4 rounded-lg mb-6"
          >
            <p className="font-medium">Error generating meal plan:</p>
            <p className="text-sm mt-1">{error}</p>
          </motion.div>
        )}

        {!currentPlan ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Target className="h-24 w-24 text-vital-mint mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-graphite-ink mb-4">Ready to Start?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Generate your first AI-powered nutrition plan. Our mock AI will create a personalized 
              weekly meal plan with balanced nutrition and delicious recipes.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generateNewPlan}
              disabled={generating}
              className="bg-gradient-primary text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50"
            >
              {generating ? (
                <div className="flex items-center">
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  AI is creating your personalized plan...
                </div>
              ) : (
                'Generate AI Diet Plan'
              )}
            </motion.button>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {/* Plan Overview */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-graphite-ink mb-6">{currentPlan.plan_name}</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-gradient-primary p-3 rounded-xl w-fit mx-auto mb-2">
                    <Flame className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-graphite-ink">{currentPlan.calories_target}</div>
                  <div className="text-sm text-gray-600">Daily Calories</div>
                </div>
                
                <div className="text-center">
                  <div className="bg-gradient-secondary p-3 rounded-xl w-fit mx-auto mb-2">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-graphite-ink">7</div>
                  <div className="text-sm text-gray-600">Days Planned</div>
                </div>
                
                <div className="text-center">
                  <div className="bg-citrus-glow p-3 rounded-xl w-fit mx-auto mb-2">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-graphite-ink">4</div>
                  <div className="text-sm text-gray-600">Meals/Day</div>
                </div>
                
                <div className="text-center">
                  <div className="bg-leaf-green p-3 rounded-xl w-fit mx-auto mb-2">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-graphite-ink">1</div>
                  <div className="text-sm text-gray-600">Person</div>
                </div>
              </div>
            </div>

            {/* Weekly Meal Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {Object.entries(currentPlan.meals).slice(0, 2).map(([day, meals]: [string, any]) => (
                <motion.div
                  key={day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-xl p-6"
                >
                  <h3 className="text-xl font-bold text-graphite-ink mb-4 capitalize">
                    {day}
                  </h3>
                  
                  <div className="space-y-4">
                    {Object.entries(meals).map(([mealType, meal]: [string, any]) => (
                      <div
                        key={mealType}
                        className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-graphite-ink capitalize">{mealType}</h4>
                            <p className="text-gray-600 text-sm">{meal.name}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-vital-mint">{meal.calories}</div>
                            <div className="text-xs text-gray-500">calories</div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-4 text-xs">
                          <span className="bg-coral-energy/10 text-coral-energy px-2 py-1 rounded">
                            P: {meal.protein}g
                          </span>
                          <span className="bg-citrus-glow/10 text-yellow-700 px-2 py-1 rounded">
                            C: {meal.carbs}g
                          </span>
                          <span className="bg-vital-mint/10 text-vital-mint px-2 py-1 rounded">
                            F: {meal.fats}g
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Daily Total:</span>
                      <span className="text-lg font-bold text-graphite-ink">
                        {Object.values(meals).reduce((total: number, meal: any) => total + meal.calories, 0)} cal
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white border-2 border-vital-mint text-vital-mint px-6 py-3 rounded-lg font-semibold hover:bg-vital-mint hover:text-white transition-all duration-200"
              >
                View Full Week
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-primary text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
              >
                Start Today's Plan
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};