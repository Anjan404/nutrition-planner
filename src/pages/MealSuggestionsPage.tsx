import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, Flame, Users, Star, Heart, ChefHat, Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { deepseekAI, type Meal } from '../lib/deepseek';
import { supabase } from '../lib/supabase';

export const MealSuggestionsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMealType, setSelectedMealType] = useState('all');
  const [aiSuggestions, setAiSuggestions] = useState<Meal[]>([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { value: 'all', label: 'All Cuisines' },
    { value: 'asian', label: 'Asian' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'italian', label: 'Italian' },
    { value: 'indian', label: 'Indian' }
  ];

  const mealTypes = [
    { value: 'all', label: 'All Meals' },
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snack', label: 'Snacks' }
  ];

  const mockMeals = [
    {
      id: 1,
      name: 'Mediterranean Quinoa Bowl',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'mediterranean',
      mealType: 'lunch',
      calories: 420,
      protein: 18,
      carbs: 52,
      fats: 14,
      cookTime: 25,
      servings: 2,
      rating: 4.8,
      difficulty: 'Easy',
      tags: ['Vegetarian', 'Gluten-Free', 'High-Protein']
    },
    {
      id: 2,
      name: 'Asian Salmon Teriyaki',
      image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'asian',
      mealType: 'dinner',
      calories: 380,
      protein: 32,
      carbs: 28,
      fats: 16,
      cookTime: 20,
      servings: 1,
      rating: 4.9,
      difficulty: 'Medium',
      tags: ['High-Protein', 'Low-Carb', 'Omega-3']
    },
    {
      id: 3,
      name: 'Avocado Toast Supreme',
      image: 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'all',
      mealType: 'breakfast',
      calories: 320,
      protein: 12,
      carbs: 28,
      fats: 20,
      cookTime: 10,
      servings: 1,
      rating: 4.6,
      difficulty: 'Easy',
      tags: ['Vegetarian', 'Quick', 'Healthy-Fats']
    },
    {
      id: 4,
      name: 'Indian Curry Lentil Dal',
      image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'indian',
      mealType: 'dinner',
      calories: 290,
      protein: 16,
      carbs: 45,
      fats: 8,
      cookTime: 35,
      servings: 4,
      rating: 4.7,
      difficulty: 'Medium',
      tags: ['Vegan', 'High-Fiber', 'Spicy']
    },
    {
      id: 5,
      name: 'Mexican Chicken Burrito Bowl',
      image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'mexican',
      mealType: 'lunch',
      calories: 450,
      protein: 28,
      carbs: 38,
      fats: 18,
      cookTime: 15,
      servings: 1,
      rating: 4.5,
      difficulty: 'Easy',
      tags: ['High-Protein', 'Customizable', 'Meal-Prep']
    },
    {
      id: 6,
      name: 'Italian Zucchini Pasta',
      image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'italian',
      mealType: 'dinner',
      calories: 250,
      protein: 8,
      carbs: 32,
      fats: 11,
      cookTime: 30,
      servings: 2,
      rating: 4.4,
      difficulty: 'Medium',
      tags: ['Low-Calorie', 'Vegetarian', 'Keto-Friendly']
    }
  ];

  const filteredMeals = mockMeals.filter(meal => {
    const matchesSearch = meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meal.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || meal.category === selectedCategory;
    const matchesMealType = selectedMealType === 'all' || meal.mealType === selectedMealType;
    
    return matchesSearch && matchesCategory && matchesMealType;
  });

  const generateAISuggestions = async () => {
    if (!user) return;
    
    setLoadingAI(true);
    setError(null);
    
    try {
      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        throw new Error('Please complete your profile setup first');
      }

      // Generate AI meal suggestions
      const mealType = selectedMealType === 'all' ? 'lunch' : selectedMealType;
      const preferences = selectedCategory !== 'all' ? [selectedCategory] : [];
      
      const suggestions = await deepseekAI.generateMealSuggestions(profile, mealType, preferences);
      setAiSuggestions(suggestions);
    } catch (error) {
      console.error('Error generating AI suggestions:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate AI suggestions');
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-cloud to-white pt-20 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-graphite-ink mb-4">
              Adaptive Meal <span className="text-vital-mint">Suggestions</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover personalized meal recommendations that adapt to your preferences, dietary needs, and cultural background
            </p>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search meals, ingredients, or tags..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vital-mint focus:border-vital-mint bg-soft-cloud"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vital-mint focus:border-vital-mint bg-soft-cloud"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Meal Type Filter */}
            <div className="lg:w-48">
              <select
                value={selectedMealType}
                onChange={(e) => setSelectedMealType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vital-mint focus:border-vital-mint bg-soft-cloud"
              >
                {mealTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Advanced Filters Button */}
            <button className="px-6 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>

            {/* AI Suggestions Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={generateAISuggestions}
              disabled={loadingAI}
              className="px-6 py-3 bg-gradient-secondary text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center space-x-2 disabled:opacity-50"
            >
              {loadingAI ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              <span>{loadingAI ? 'Generating...' : 'AI Suggestions'}</span>
            </motion.button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-alert-red/10 border border-alert-red/20 text-alert-red px-6 py-4 rounded-lg mb-6"
          >
            <p className="font-medium">Error:</p>
            <p className="text-sm mt-1">{error}</p>
          </motion.div>
        )}

        {/* AI Suggestions Section */}
        {aiSuggestions.length > 0 && (
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-vital-mint/10 to-citrus-glow/10 rounded-2xl p-6 mb-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6 text-vital-mint" />
                <h2 className="text-2xl font-bold text-graphite-ink">AI-Generated Suggestions</h2>
              </div>
              <p className="text-gray-600">
                Personalized meal recommendations based on your profile and preferences
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {aiSuggestions.map((meal, index) => (
                <motion.div
                  key={`ai-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group border-2 border-vital-mint/20"
                >
                  {/* AI Badge */}
                  <div className="bg-gradient-primary p-4 text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Sparkles className="h-5 w-5 text-white" />
                      <span className="text-white font-semibold">AI Generated</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{meal.name}</h3>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Nutrition Info */}
                    <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-graphite-ink">{meal.calories}</div>
                        <div className="text-xs text-gray-500">Calories</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-coral-energy">{meal.protein}g</div>
                        <div className="text-xs text-gray-500">Protein</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-citrus-glow">{meal.carbs}g</div>
                        <div className="text-xs text-gray-500">Carbs</div>
                      </div>
                    </div>

                    {/* Ingredients */}
                    {meal.ingredients && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-graphite-ink mb-2 text-sm">Ingredients:</h4>
                        <div className="flex flex-wrap gap-1">
                          {meal.ingredients.slice(0, 3).map((ingredient, i) => (
                            <span
                              key={i}
                              className="bg-vital-mint/10 text-vital-mint px-2 py-1 rounded text-xs"
                            >
                              {ingredient}
                            </span>
                          ))}
                          {meal.ingredients.length > 3 && (
                            <span className="text-xs text-gray-500">+{meal.ingredients.length - 3} more</span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-gradient-primary text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        <ChefHat className="h-4 w-4" />
                        <span>Cook This</span>
                      </motion.button>
                      <button className="bg-soft-cloud text-graphite-ink py-3 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200">
                        Save
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-graphite-ink">{filteredMeals.length}</span> meal suggestions
            {aiSuggestions.length > 0 && (
              <span className="ml-2 text-vital-mint font-semibold">
                + {aiSuggestions.length} AI-generated
              </span>
            )}
          </p>
        </div>

        {/* Meal Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMeals.map((meal, index) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {meal.difficulty}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
                    <Heart className="h-4 w-4 text-coral-energy" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-graphite-ink">{meal.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-citrus-glow fill-current" />
                    <span className="text-sm font-medium text-gray-600">{meal.rating}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {meal.tags.slice(0, 2).map(tag => (
                    <span
                      key={tag}
                      className="bg-vital-mint/10 text-vital-mint px-2 py-1 rounded text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Nutrition Info */}
                <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-graphite-ink">{meal.calories}</div>
                    <div className="text-xs text-gray-500">Calories</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-coral-energy">{meal.protein}g</div>
                    <div className="text-xs text-gray-500">Protein</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-citrus-glow">{meal.carbs}g</div>
                    <div className="text-xs text-gray-500">Carbs</div>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{meal.cookTime} min</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{meal.servings} serving{meal.servings > 1 ? 's' : ''}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gradient-primary text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <ChefHat className="h-4 w-4" />
                    <span>Cook This</span>
                  </motion.button>
                  <button className="bg-soft-cloud text-graphite-ink py-3 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200">
                    View Recipe
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        {filteredMeals.length > 0 && (
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white border-2 border-vital-mint text-vital-mint px-8 py-3 rounded-lg font-semibold hover:bg-vital-mint hover:text-white transition-all duration-200"
            >
              Load More Suggestions
            </motion.button>
          </div>
        )}

        {/* Empty State */}
        {filteredMeals.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <ChefHat className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-graphite-ink mb-2">No meals found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters to find more meal suggestions.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};