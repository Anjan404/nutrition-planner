import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Clock, Flame, Users, RefreshCw, Download, Share2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

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
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    loadCurrentPlan();
  }, [user]);

  const loadCurrentPlan = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('meal_plans')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (data) {
        setCurrentPlan(data);
      }
    } catch (error) {
      console.error('Error loading meal plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateNewPlan = async () => {
    if (!user) return;
    
    setGenerating(true);
    
    // Simulate AI plan generation
    const mockPlan = {
      user_id: user.id,
      plan_name: 'Personalized Weekly Plan',
      calories_target: 2000,
      meals: {
        monday: {
          breakfast: { name: 'Oatmeal with Berries', calories: 350, protein: 12, carbs: 60, fats: 8 },
          lunch: { name: 'Grilled Chicken Salad', calories: 450, protein: 35, carbs: 20, fats: 18 },
          dinner: { name: 'Salmon with Quinoa', calories: 550, protein: 40, carbs: 45, fats: 22 },
          snacks: { name: 'Greek Yogurt with Nuts', calories: 200, protein: 15, carbs: 10, fats: 12 }
        },
        tuesday: {
          breakfast: { name: 'Avocado Toast with Eggs', calories: 400, protein: 20, carbs: 35, fats: 22 },
          lunch: { name: 'Turkey and Hummus Wrap', calories: 480, protein: 28, carbs: 45, fats: 18 },
          dinner: { name: 'Lean Beef Stir-fry', calories: 520, protein: 35, carbs: 40, fats: 20 },
          snacks: { name: 'Apple with Almond Butter', calories: 180, protein: 6, carbs: 20, fats: 12 }
        }
        // More days would be generated here...
      }
    };

    try {
      const { data, error } = await supabase
        .from('meal_plans')
        .insert([mockPlan])
        .select()
        .single();

      if (data) {
        setCurrentPlan(data);
      }
    } catch (error) {
      console.error('Error generating meal plan:', error);
    } finally {
      setGenerating(false);
    }
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-soft-cloud to-white pt-20 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vital-mint"></div>
          </div>
        </div>
      </div>
    );
  }

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

        {!currentPlan ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Target className="h-24 w-24 text-vital-mint mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-graphite-ink mb-4">Ready to Start?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Generate your first AI-powered nutrition plan based on your profile, goals, and preferences. 
              Our smart algorithm will create a personalized weekly meal plan just for you.
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
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Generating Your Plan...
                </div>
              ) : (
                'Generate My Diet Plan'
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