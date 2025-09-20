import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, Search, Plus, Scan, Utensils, BarChart3 } from 'lucide-react';
import Webcam from 'react-webcam';

export const FoodTrackerPage: React.FC = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const webcamRef = useRef<Webcam>(null);

  const todaysMeals = [
    {
      id: 1,
      meal: 'Breakfast',
      time: '8:30 AM',
      food: 'Oatmeal with Berries',
      calories: 320,
      protein: 12,
      carbs: 58,
      fats: 6,
      image: 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 2,
      meal: 'Lunch',
      time: '12:45 PM',
      food: 'Grilled Chicken Salad',
      calories: 450,
      protein: 35,
      carbs: 20,
      fats: 18,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const dailyTotals = {
    calories: 770,
    target: 2000,
    protein: 47,
    carbs: 78,
    fats: 24
  };

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      setShowCamera(false);
      analyzeFood(imageSrc);
    }
  };

  const analyzeFood = async (imageData: string | null) => {
    if (!imageData) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult({
        food: 'Grilled Salmon with Vegetables',
        confidence: 95,
        calories: 420,
        protein: 35,
        carbs: 12,
        fats: 22,
        ingredients: ['Salmon', 'Broccoli', 'Carrots', 'Olive Oil'],
        portion: 'Medium (200g)'
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCapturedImage(result);
        analyzeFood(result);
      };
      reader.readAsDataURL(file);
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
            <Camera className="h-16 w-16 text-vital-mint mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-graphite-ink mb-4">
              Food Intake <span className="text-vital-mint">Tracker</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Snap a photo of your meal and get instant AI-powered nutritional analysis and calorie tracking
            </p>
          </motion.div>
        </div>

        {/* Daily Progress */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-graphite-ink">Today's Progress</h2>
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="relative mb-4">
                <div className="w-20 h-20 mx-auto">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="#00C9A7"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 36}`}
                      strokeDashoffset={`${2 * Math.PI * 36 * (1 - dailyTotals.calories / dailyTotals.target)}`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-graphite-ink">
                      {Math.round((dailyTotals.calories / dailyTotals.target) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-xl font-bold text-graphite-ink">{dailyTotals.calories}</div>
              <div className="text-sm text-gray-600">of {dailyTotals.target} calories</div>
            </div>

            <div className="text-center">
              <div className="bg-coral-energy p-3 rounded-xl w-fit mx-auto mb-2">
                <Utensils className="h-6 w-6 text-white" />
              </div>
              <div className="text-xl font-bold text-coral-energy">{dailyTotals.protein}g</div>
              <div className="text-sm text-gray-600">Protein</div>
            </div>

            <div className="text-center">
              <div className="bg-citrus-glow p-3 rounded-xl w-fit mx-auto mb-2">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div className="text-xl font-bold text-yellow-700">{dailyTotals.carbs}g</div>
              <div className="text-sm text-gray-600">Carbs</div>
            </div>

            <div className="text-center">
              <div className="bg-vital-mint p-3 rounded-xl w-fit mx-auto mb-2">
                <Scan className="h-6 w-6 text-white" />
              </div>
              <div className="text-xl font-bold text-vital-mint">{dailyTotals.fats}g</div>
              <div className="text-sm text-gray-600">Fats</div>
            </div>
          </div>
        </div>

        {/* Food Scanning Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Camera/Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <h2 className="text-2xl font-bold text-graphite-ink mb-6">Add New Meal</h2>

            {!showCamera && !capturedImage && (
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCamera(true)}
                  className="w-full bg-gradient-primary text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-3"
                >
                  <Camera className="h-6 w-6" />
                  <span>Take Photo</span>
                </motion.button>

                <div className="text-center text-gray-500">or</div>

                <label className="w-full block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-soft-cloud border-2 border-dashed border-gray-300 py-8 px-6 rounded-xl cursor-pointer hover:border-vital-mint hover:bg-vital-mint/5 transition-all duration-200 flex flex-col items-center space-y-2"
                  >
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="text-gray-600 font-medium">Upload from Gallery</span>
                    <span className="text-sm text-gray-500">PNG, JPG up to 10MB</span>
                  </motion.div>
                </label>

                <div className="text-center">
                  <button className="text-vital-mint font-semibold hover:text-vital-mint/80 transition-colors flex items-center space-x-2 mx-auto">
                    <Search className="h-4 w-4" />
                    <span>Search Food Database</span>
                  </button>
                </div>
              </div>
            )}

            {showCamera && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="relative">
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    className="w-full rounded-xl"
                  />
                  <div className="absolute inset-0 border-4 border-vital-mint rounded-xl pointer-events-none animate-pulse"></div>
                </div>
                
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={capture}
                    className="flex-1 bg-gradient-primary text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    Capture
                  </motion.button>
                  <button
                    onClick={() => setShowCamera(false)}
                    className="flex-1 bg-gray-100 text-graphite-ink py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}

            {capturedImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="relative">
                  <img
                    src={capturedImage}
                    alt="Captured meal"
                    className="w-full rounded-xl"
                  />
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                      <div className="bg-white p-6 rounded-lg text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-vital-mint mx-auto mb-3"></div>
                        <p className="text-graphite-ink font-medium">Analyzing your meal...</p>
                      </div>
                    </div>
                  )}
                </div>

                {!isAnalyzing && (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setCapturedImage(null);
                        setAnalysisResult(null);
                      }}
                      className="flex-1 bg-gray-100 text-graphite-ink py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Retake
                    </button>
                    <button className="flex-1 bg-gradient-primary text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200">
                      Analyze
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Analysis Results */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <h2 className="text-2xl font-bold text-graphite-ink mb-6">Analysis Results</h2>

            {!analysisResult ? (
              <div className="text-center py-12">
                <Scan className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Upload or capture a photo to see AI analysis</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-graphite-ink">{analysisResult.food}</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-leaf-green rounded-full"></div>
                      <span className="text-sm text-leaf-green font-medium">
                        {analysisResult.confidence}% confident
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">Portion: {analysisResult.portion}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-vital-mint/10 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-vital-mint">{analysisResult.calories}</div>
                      <div className="text-sm text-gray-600">Calories</div>
                    </div>
                    <div className="bg-coral-energy/10 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-coral-energy">{analysisResult.protein}g</div>
                      <div className="text-sm text-gray-600">Protein</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-citrus-glow/10 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-yellow-700">{analysisResult.carbs}g</div>
                      <div className="text-sm text-gray-600">Carbs</div>
                    </div>
                    <div className="bg-leaf-green/10 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-leaf-green">{analysisResult.fats}g</div>
                      <div className="text-sm text-gray-600">Fats</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-graphite-ink mb-2">Detected Ingredients:</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.ingredients.map((ingredient: string) => (
                        <span
                          key={ingredient}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-primary text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add to Food Log</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Today's Meals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >
          <h2 className="text-2xl font-bold text-graphite-ink mb-6">Today's Meals</h2>

          <div className="space-y-4">
            {todaysMeals.map((meal) => (
              <motion.div
                key={meal.id}
                whileHover={{ scale: 1.01 }}
                className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={meal.image}
                    alt={meal.food}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-graphite-ink">{meal.food}</h3>
                      <span className="text-sm text-gray-500">{meal.time}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="bg-vital-mint/10 text-vital-mint px-2 py-1 rounded">
                        {meal.calories} cal
                      </span>
                      <span className="bg-coral-energy/10 text-coral-energy px-2 py-1 rounded">
                        P: {meal.protein}g
                      </span>
                      <span className="bg-citrus-glow/10 text-yellow-700 px-2 py-1 rounded">
                        C: {meal.carbs}g
                      </span>
                      <span className="bg-leaf-green/10 text-leaf-green px-2 py-1 rounded">
                        F: {meal.fats}g
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">{meal.meal}</div>
                    <button className="text-vital-mint hover:text-vital-mint/80 transition-colors text-sm font-medium">
                      Edit
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-6">
            <button className="text-vital-mint font-semibold hover:text-vital-mint/80 transition-colors">
              View Full Food Log
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};