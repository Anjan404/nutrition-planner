import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Target, 
  Smartphone, 
  Camera, 
  TrendingUp, 
  Users, 
  Star, 
  Apple,
  Dumbbell,
  Zap,
  Shield,
  Globe
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleFeatureClick = async (featureTitle: string) => {
    // If user is not logged in, redirect to sign up
    if (!user) {
      navigate('/signup');
      return;
    }

    // Handle different feature clicks
    switch (featureTitle) {
      case 'AI Powered Plans':
        navigate('/diet-plan');
        break;
      case 'Food Recognition':
        // Request camera permission and navigate to food tracker
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          // Stop the stream immediately after getting permission
          stream.getTracks().forEach(track => track.stop());
          navigate('/food-tracker');
        } catch (error) {
          alert('Camera access is required for food recognition. Please enable camera permissions and try again.');
        }
        break;
      case 'Wearable Integration':
        navigate('/wearable-integration');
        break;
      case 'Cultural Preferences':
        navigate('/cultural-preferences');
        break;
      case 'Progress Tracking':
        navigate('/progress-tracker');
        break;
      case 'Medical Integration':
        navigate('/profile-setup');
        break;
      default:
        navigate('/diet-plan');
    }
  };

  const features = [
    {
      icon: Target,
      title: 'AI Powered Plans',
      description: 'Personalized nutrition plans tailored to your unique body composition, lifestyle, and goals.'
    },
    {
      icon: Camera,
      title: 'Food Recognition',
      description: 'Simply snap a photo of your meal and get instant nutritional analysis and calorie tracking.'
    },
    {
      icon: Smartphone,
      title: 'Wearable Integration',
      description: 'Sync with your fitness tracker to automatically adjust your nutrition plan based on activity.'
    },
    {
      icon: Globe,
      title: 'Cultural preferences',
      description: 'Enjoy meals from your culture while meeting your nutritional goals with our diverse recipe database.'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Visual dashboards and insights help you stay motivated and track your health journey.'
    },
    {
      icon: Shield,
      title: 'Medical Integration',
      description: 'Safe nutrition recommendations that consider your medical conditions and dietary restrictions.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Fitness Enthusiast',
      content: 'HOMH12 transformed my relationship with food. The AI recommendations are spot-on!',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Marcus Johnson',
      role: 'Busy Professional',
      content: 'The cultural meal suggestions help me stay connected to my roots while hitting my fitness goals.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Elena Rodriguez',
      role: 'Health Coach',
      content: 'I recommend HOMH12 to all my clients. The medical condition awareness is exceptional.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/4047152/pexels-photo-4047152.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const floatingIcons = [
    { icon: Apple, delay: 0, x: 100, y: 50 },
    { icon: Heart, delay: 1, x: -80, y: 30 },
    { icon: Dumbbell, delay: 2, x: 120, y: -40 },
    { icon: Zap, delay: 0.5, x: -100, y: -30 }
  ];

  return (
    <div className="font-poppins">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-hero flex items-center justify-center overflow-hidden">
        {/* Animated Background Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {floatingIcons.map((item, index) => (
            <motion.div
              key={index}
              className="absolute text-white/20"
              initial={{ opacity: 0, x: item.x, y: item.y }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                x: [item.x, item.x + 20, item.x],
                y: [item.y, item.y - 30, item.y],
              }}
              transition={{
                duration: 6,
                delay: item.delay,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{
                left: `${50 + (item.x / 10)}%`,
                top: `${50 + (item.y / 10)}%`,
              }}
            >
              <item.icon className="h-16 w-16" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Smarter Nutrition
              <span className="block text-citrus-glow">Starts Here</span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto"
            >
              AI-powered plans tailored to your body, lifestyle, and culture
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/signup"
                className="group bg-white text-vital-mint px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Start Your Plan</span>
                <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </Link>
              
              <button className="text-white border-2 border-white/50 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 hover:border-white transition-all duration-300">
                See How It Works
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-graphite-ink mb-6">
              Revolutionize Your <span className="text-vital-mint">Nutrition</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-driven platform combines cutting-edge technology with personalized care to transform how you approach nutrition and wellness.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                onClick={() => handleFeatureClick(feature.title)}
                className="bg-soft-cloud p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="bg-gradient-primary p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-graphite-ink mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-4 flex items-center text-vital-mint font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span>Learn More</span>
                  <motion.div
                    className="ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                  >
                    →
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-b from-soft-cloud to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-graphite-ink mb-6">
              How It <span className="text-coral-energy">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started with HOMH12 in just three simple steps and begin your personalized nutrition journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Complete Your Profile',
                description: 'Tell us about your health goals, dietary preferences, medical conditions, and cultural background.',
                color: 'vital-mint'
              },
              {
                step: '02',
                title: 'Get AI-Powered Plan',
                description: 'Our advanced AI analyzes your data to create a personalized nutrition plan that fits your lifestyle.',
                color: 'coral-energy'
              },
              {
                step: '03',
                title: 'Track & Optimize',
                description: 'Use our smart tools to track progress, scan meals, and continuously optimize your nutrition journey.',
                color: 'citrus-glow'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                <div className={`text-6xl font-bold text-${item.color} opacity-20 mb-4`}>
                  {item.step}
                </div>
                <div className={`w-16 h-16 bg-${item.color} rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6 -mt-10 relative z-10`}>
                  {index + 1}
                </div>
                <h3 className="text-2xl font-bold text-graphite-ink mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-graphite-ink mb-6">
              What Our Users <span className="text-vital-mint">Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied users who have transformed their nutrition and health with NutriGen.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-soft-cloud p-8 rounded-2xl hover:shadow-xl transition-all duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-citrus-glow fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-bold text-graphite-ink">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Health?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already started their personalized nutrition journey with NutriGen.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/signup"
                className="bg-white text-vital-mint px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Start Your Free Trial
              </Link>
              <div className="text-white/80 text-sm">
                ✓ No credit card required ✓ 7-day free trial
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};