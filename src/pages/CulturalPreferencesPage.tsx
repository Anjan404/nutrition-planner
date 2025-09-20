import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Heart, ChefHat, Star } from 'lucide-react';

export const CulturalPreferencesPage: React.FC = () => {
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [dietaryNeeds, setDietaryNeeds] = useState<string[]>([]);

  const cuisines = [
    { 
      id: 'asian', 
      name: 'Asian', 
      flag: '🇯🇵', 
      description: 'Japanese, Chinese, Korean, Thai cuisine',
      image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    { 
      id: 'mediterranean', 
      name: 'Mediterranean', 
      flag: '🇬🇷', 
      description: 'Greek, Italian, Turkish, Lebanese dishes',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    { 
      id: 'indian', 
      name: 'Indian', 
      flag: '🇮🇳', 
      description: 'Spicy curries, dal, biryanis, and more',
      image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    { 
      id: 'mexican', 
      name: 'Mexican', 
      flag: '🇲🇽', 
      description: 'Tacos, burritos, fresh salsas',
      image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    { 
      id: 'middle-eastern', 
      name: 'Middle Eastern', 
      flag: '🇱🇧', 
      description: 'Hummus, kebabs, fresh herbs',
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    { 
      id: 'african', 
      name: 'African', 
      flag: '🇳🇬', 
      description: 'Rich stews, grains, bold flavors',
      image: 'https://images.pexels.com/photos/5560762/pexels-photo-5560762.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    { 
      id: 'latin-american', 
      name: 'Latin American', 
      flag: '🇧🇷', 
      description: 'Brazilian, Argentinian, Colombian cuisine',
      image: 'https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    { 
      id: 'european', 
      name: 'European', 
      flag: '🇫🇷', 
      description: 'French, German, Scandinavian dishes',
      image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    }
  ];

  const dietaryOptions = [
    'Halal', 'Kosher', 'Vegetarian', 'Vegan', 'Gluten-Free', 
    'Dairy-Free', 'Nut-Free', 'Low-Sodium', 'Diabetic-Friendly'
  ];

  const popularDishes = [
    { name: 'Pad Thai', cuisine: 'Asian', calories: 350, rating: 4.8 },
    { name: 'Greek Salad', cuisine: 'Mediterranean', calories: 280, rating: 4.6 },
    { name: 'Butter Chicken', cuisine: 'Indian', calories: 420, rating: 4.9 },
    { name: 'Fish Tacos', cuisine: 'Mexican', calories: 380, rating: 4.7 }
  ];

  const handleCuisineToggle = (cuisineId: string) => {
    setSelectedCuisines(prev => 
      prev.includes(cuisineId)
        ? prev.filter(id => id !== cuisineId)
        : [...prev, cuisineId]
    );
  };

  const handleDietaryToggle = (option: string) => {
    setDietaryNeeds(prev => 
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
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
            <Globe className="h-16 w-16 text-vital-mint mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-graphite-ink mb-4">
              Cultural Food <span className="text-vital-mint">Preferences</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover and enjoy nutritious meals from your favorite cultures while meeting your health goals
            </p>
          </motion.div>
        </div>

        {/* Cuisine Selection */}
        <div className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-graphite-ink mb-6 text-center"
          >
            Select Your Favorite Cuisines
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cuisines.map((cuisine, index) => (
              <motion.div
                key={cuisine.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                onClick={() => handleCuisineToggle(cuisine.id)}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  selectedCuisines.includes(cuisine.id)
                    ? 'ring-4 ring-vital-mint shadow-2xl'
                    : 'hover:shadow-2xl'
                }`}
              >
                <div className="relative">
                  <img
                    src={cuisine.image}
                    alt={cuisine.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    {selectedCuisines.includes(cuisine.id) && (
                      <div className="bg-vital-mint text-white rounded-full p-1">
                        <Heart className="h-4 w-4 fill-current" />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">{cuisine.flag}</span>
                    <h3 className="text-lg font-bold text-graphite-ink">{cuisine.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{cuisine.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dietary Needs */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-graphite-ink mb-6 text-center">
            Dietary Requirements
          </h2>
          
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {dietaryOptions.map((option) => (
              <motion.button
                key={option}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDietaryToggle(option)}
                className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  dietaryNeeds.includes(option)
                    ? 'bg-gradient-primary text-white'
                    : 'bg-soft-cloud hover:bg-gray-100 text-graphite-ink'
                }`}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Popular Dishes from Selected Cuisines */}
        {selectedCuisines.length > 0 && (
          <div className="mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-graphite-ink mb-6 text-center"
            >
              Popular Dishes from Your Selected Cuisines
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularDishes
                .filter(dish => selectedCuisines.some(cuisine => 
                  cuisines.find(c => c.id === cuisine)?.name === dish.cuisine
                ))
                .map((dish, index) => (
                  <motion.div
                    key={dish.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-graphite-ink">{dish.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-citrus-glow fill-current" />
                        <span className="text-sm">{dish.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{dish.cuisine} Cuisine</p>
                    <p className="text-lg font-semibold text-vital-mint">{dish.calories} cal</p>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-3 bg-gradient-primary text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <ChefHat className="h-4 w-4" />
                      <span>View Recipe</span>
                    </motion.button>
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* Personalized Recommendations */}
        <div className="bg-gradient-to-r from-vital-mint/10 to-citrus-glow/10 rounded-2xl p-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-graphite-ink mb-4">
              Get Personalized Cultural Meal Plans
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Based on your selected cuisines and dietary needs, we'll create custom meal plans 
              that celebrate your cultural preferences while meeting your nutritional goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-primary text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
              >
                Generate Cultural Meal Plan
              </motion.button>
              <button className="bg-white border-2 border-vital-mint text-vital-mint px-6 py-3 rounded-lg font-semibold hover:bg-vital-mint hover:text-white transition-all duration-200">
                Explore More Cuisines
              </button>
            </div>
          </motion.div>
        </div>

        {/* Summary */}
        {(selectedCuisines.length > 0 || dietaryNeeds.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 bg-white rounded-2xl shadow-xl p-6"
          >
            <h3 className="text-xl font-bold text-graphite-ink mb-4">Your Preferences Summary</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-graphite-ink mb-2">Selected Cuisines:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCuisines.map(cuisineId => {
                    const cuisine = cuisines.find(c => c.id === cuisineId);
                    return (
                      <span
                        key={cuisineId}
                        className="bg-vital-mint/10 text-vital-mint px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1"
                      >
                        <span>{cuisine?.flag}</span>
                        <span>{cuisine?.name}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-graphite-ink mb-2">Dietary Requirements:</h4>
                <div className="flex flex-wrap gap-2">
                  {dietaryNeeds.map(need => (
                    <span
                      key={need}
                      className="bg-coral-energy/10 text-coral-energy px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {need}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};