interface UserProfile {
  age?: number;
  height?: number;
  weight?: number;
  activity_level?: string;
  fitness_goals?: string[];
  dietary_restrictions?: string[];
  medical_conditions?: string[];
  cultural_preferences?: string[];
}

interface MealPlan {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks: Meal;
}

interface Meal {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients?: string[];
  instructions?: string[];
}

interface WeeklyMealPlan {
  [key: string]: MealPlan;
}

class DeepseekAI {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY || '';
    this.apiUrl = import.meta.env.VITE_DEEPSEEK_API_URL || 'https://api.deepseek.com/v1/chat/completions';
  }

  private calculateBMR(profile: UserProfile): number {
    if (!profile.age || !profile.height || !profile.weight) return 2000;
    
    // Mifflin-St Jeor Equation (assuming average between male/female)
    const bmr = (10 * profile.weight) + (6.25 * profile.height) - (5 * profile.age) + 5;
    
    // Activity level multipliers
    const activityMultipliers: { [key: string]: number } = {
      'sedentary': 1.2,
      'light': 1.375,
      'moderate': 1.55,
      'active': 1.725,
      'extra': 1.9
    };
    
    const multiplier = activityMultipliers[profile.activity_level || 'moderate'] || 1.55;
    return Math.round(bmr * multiplier);
  }

  private createPrompt(profile: UserProfile, targetCalories: number): string {
    const culturalPrefs = profile.cultural_preferences?.length 
      ? `Cultural preferences: ${profile.cultural_preferences.join(', ')}`
      : '';
    
    const dietaryRestrictions = profile.dietary_restrictions?.length
      ? `Dietary restrictions: ${profile.dietary_restrictions.join(', ')}`
      : '';
    
    const medicalConditions = profile.medical_conditions?.length
      ? `Medical considerations: ${profile.medical_conditions.join(', ')}`
      : '';
    
    const fitnessGoals = profile.fitness_goals?.length
      ? `Fitness goals: ${profile.fitness_goals.join(', ')}`
      : '';

    return `Create a personalized 7-day meal plan for a person with the following profile:

Age: ${profile.age} years
Height: ${profile.height} cm
Weight: ${profile.weight} kg
Activity Level: ${profile.activity_level}
Daily Calorie Target: ${targetCalories} calories

${fitnessGoals}
${culturalPrefs}
${dietaryRestrictions}
${medicalConditions}

Please provide a detailed weekly meal plan in JSON format with the following structure:
{
  "monday": {
    "breakfast": {
      "name": "Meal name",
      "calories": 350,
      "protein": 20,
      "carbs": 45,
      "fats": 12,
      "ingredients": ["ingredient1", "ingredient2"],
      "instructions": ["step1", "step2"]
    },
    "lunch": { ... },
    "dinner": { ... },
    "snacks": { ... }
  },
  "tuesday": { ... },
  ... for all 7 days
}

Requirements:
1. Each day should total approximately ${targetCalories} calories
2. Include balanced macronutrients (protein: 20-30%, carbs: 45-65%, fats: 20-35%)
3. Respect all dietary restrictions and cultural preferences
4. Consider medical conditions for safe recommendations
5. Align with fitness goals (weight loss, muscle gain, etc.)
6. Include variety across the week
7. Provide realistic, achievable meals
8. Include cooking instructions for each meal

Return ONLY the JSON object, no additional text.`;
  }

  async generateMealPlan(profile: UserProfile): Promise<WeeklyMealPlan> {
    if (!this.apiKey) {
      throw new Error('Deepseek API key not configured. Please add VITE_DEEPSEEK_API_KEY to your environment variables.');
    }

    const targetCalories = this.calculateBMR(profile);
    const prompt = this.createPrompt(profile, targetCalories);

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: 'You are a professional nutritionist and dietitian with expertise in creating personalized meal plans. Always respond with valid JSON format only.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 4000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Deepseek API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error('No content received from Deepseek API');
      }

      // Parse the JSON response
      try {
        const mealPlan = JSON.parse(content);
        return mealPlan;
      } catch (parseError) {
        console.error('Failed to parse Deepseek response:', content);
        throw new Error('Invalid JSON response from Deepseek API');
      }

    } catch (error) {
      console.error('Deepseek API Error:', error);
      
      // Fallback to mock data if API fails
      return this.generateFallbackMealPlan(targetCalories);
    }
  }

  private generateFallbackMealPlan(targetCalories: number): WeeklyMealPlan {
    // Fallback meal plan if API fails
    const dailyCalories = Math.round(targetCalories);
    const breakfastCals = Math.round(dailyCalories * 0.25);
    const lunchCals = Math.round(dailyCalories * 0.35);
    const dinnerCals = Math.round(dailyCalories * 0.30);
    const snackCals = Math.round(dailyCalories * 0.10);

    return {
      monday: {
        breakfast: {
          name: 'Oatmeal with Berries and Nuts',
          calories: breakfastCals,
          protein: Math.round(breakfastCals * 0.15 / 4),
          carbs: Math.round(breakfastCals * 0.60 / 4),
          fats: Math.round(breakfastCals * 0.25 / 9),
          ingredients: ['Rolled oats', 'Mixed berries', 'Almonds', 'Greek yogurt'],
          instructions: ['Cook oats with water', 'Top with berries and nuts', 'Add yogurt']
        },
        lunch: {
          name: 'Grilled Chicken Salad',
          calories: lunchCals,
          protein: Math.round(lunchCals * 0.30 / 4),
          carbs: Math.round(lunchCals * 0.40 / 4),
          fats: Math.round(lunchCals * 0.30 / 9),
          ingredients: ['Chicken breast', 'Mixed greens', 'Cherry tomatoes', 'Olive oil'],
          instructions: ['Grill chicken', 'Toss salad with dressing', 'Combine and serve']
        },
        dinner: {
          name: 'Salmon with Quinoa and Vegetables',
          calories: dinnerCals,
          protein: Math.round(dinnerCals * 0.25 / 4),
          carbs: Math.round(dinnerCals * 0.45 / 4),
          fats: Math.round(dinnerCals * 0.30 / 9),
          ingredients: ['Salmon fillet', 'Quinoa', 'Broccoli', 'Carrots'],
          instructions: ['Bake salmon', 'Cook quinoa', 'Steam vegetables', 'Serve together']
        },
        snacks: {
          name: 'Greek Yogurt with Honey',
          calories: snackCals,
          protein: Math.round(snackCals * 0.20 / 4),
          carbs: Math.round(snackCals * 0.50 / 4),
          fats: Math.round(snackCals * 0.30 / 9),
          ingredients: ['Greek yogurt', 'Honey', 'Walnuts'],
          instructions: ['Mix yogurt with honey', 'Top with nuts']
        }
      },
      // Add similar structure for other days...
      tuesday: {
        breakfast: {
          name: 'Avocado Toast with Eggs',
          calories: breakfastCals,
          protein: Math.round(breakfastCals * 0.20 / 4),
          carbs: Math.round(breakfastCals * 0.45 / 4),
          fats: Math.round(breakfastCals * 0.35 / 9),
          ingredients: ['Whole grain bread', 'Avocado', 'Eggs', 'Tomato'],
          instructions: ['Toast bread', 'Mash avocado', 'Cook eggs', 'Assemble']
        },
        lunch: {
          name: 'Turkey and Hummus Wrap',
          calories: lunchCals,
          protein: Math.round(lunchCals * 0.25 / 4),
          carbs: Math.round(lunchCals * 0.50 / 4),
          fats: Math.round(lunchCals * 0.25 / 9),
          ingredients: ['Whole wheat tortilla', 'Turkey breast', 'Hummus', 'Vegetables'],
          instructions: ['Spread hummus', 'Add turkey and vegetables', 'Roll wrap']
        },
        dinner: {
          name: 'Lean Beef Stir-fry',
          calories: dinnerCals,
          protein: Math.round(dinnerCals * 0.30 / 4),
          carbs: Math.round(dinnerCals * 0.40 / 4),
          fats: Math.round(dinnerCals * 0.30 / 9),
          ingredients: ['Lean beef', 'Mixed vegetables', 'Brown rice', 'Soy sauce'],
          instructions: ['Stir-fry beef', 'Add vegetables', 'Serve over rice']
        },
        snacks: {
          name: 'Apple with Almond Butter',
          calories: snackCals,
          protein: Math.round(snackCals * 0.15 / 4),
          carbs: Math.round(snackCals * 0.55 / 4),
          fats: Math.round(snackCals * 0.30 / 9),
          ingredients: ['Apple', 'Almond butter'],
          instructions: ['Slice apple', 'Serve with almond butter']
        }
      }
    };
  }

  async generateMealSuggestions(profile: UserProfile, mealType: string, preferences?: string[]): Promise<Meal[]> {
    if (!this.apiKey) {
      throw new Error('Deepseek API key not configured');
    }

    const targetCalories = this.calculateBMR(profile);
    const mealCalories = {
      breakfast: Math.round(targetCalories * 0.25),
      lunch: Math.round(targetCalories * 0.35),
      dinner: Math.round(targetCalories * 0.30),
      snack: Math.round(targetCalories * 0.10)
    };

    const calories = mealCalories[mealType as keyof typeof mealCalories] || 400;

    const prompt = `Generate 5 different ${mealType} meal suggestions for a person with:
- Target calories per ${mealType}: ${calories}
- Cultural preferences: ${profile.cultural_preferences?.join(', ') || 'None'}
- Dietary restrictions: ${profile.dietary_restrictions?.join(', ') || 'None'}
- Additional preferences: ${preferences?.join(', ') || 'None'}

Return as JSON array with this structure:
[
  {
    "name": "Meal name",
    "calories": ${calories},
    "protein": 20,
    "carbs": 45,
    "fats": 12,
    "ingredients": ["ingredient1", "ingredient2"],
    "instructions": ["step1", "step2"]
  }
]

Return ONLY the JSON array, no additional text.`;

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: 'You are a professional nutritionist. Always respond with valid JSON format only.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.8,
          max_tokens: 2000,
        }),
      });

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;

      if (content) {
        return JSON.parse(content);
      }
    } catch (error) {
      console.error('Error generating meal suggestions:', error);
    }

    // Fallback suggestions
    return [
      {
        name: `Healthy ${mealType}`,
        calories,
        protein: Math.round(calories * 0.20 / 4),
        carbs: Math.round(calories * 0.50 / 4),
        fats: Math.round(calories * 0.30 / 9),
        ingredients: ['Fresh ingredients', 'Balanced nutrition'],
        instructions: ['Prepare with care', 'Enjoy mindfully']
      }
    ];
  }
}

export const deepseekAI = new DeepseekAI();
export type { UserProfile, MealPlan, WeeklyMealPlan, Meal };