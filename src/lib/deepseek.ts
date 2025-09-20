// Deepseek AI integration removed
// Using mock data for meal planning

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

class MockNutritionAI {
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

  async generateMealPlan(profile: UserProfile): Promise<WeeklyMealPlan> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const targetCalories = this.calculateBMR(profile);
    const breakfastCals = Math.round(targetCalories * 0.25);
    const lunchCals = Math.round(targetCalories * 0.35);
    const dinnerCals = Math.round(targetCalories * 0.30);
    const snackCals = Math.round(targetCalories * 0.10);

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
      },
      wednesday: {
        breakfast: {
          name: 'Smoothie Bowl',
          calories: breakfastCals,
          protein: Math.round(breakfastCals * 0.18 / 4),
          carbs: Math.round(breakfastCals * 0.62 / 4),
          fats: Math.round(breakfastCals * 0.20 / 9),
          ingredients: ['Banana', 'Berries', 'Protein powder', 'Granola'],
          instructions: ['Blend fruits with protein powder', 'Pour into bowl', 'Top with granola']
        },
        lunch: {
          name: 'Mediterranean Bowl',
          calories: lunchCals,
          protein: Math.round(lunchCals * 0.22 / 4),
          carbs: Math.round(lunchCals * 0.48 / 4),
          fats: Math.round(lunchCals * 0.30 / 9),
          ingredients: ['Chickpeas', 'Cucumber', 'Feta cheese', 'Olive oil'],
          instructions: ['Combine chickpeas and vegetables', 'Add feta', 'Drizzle with olive oil']
        },
        dinner: {
          name: 'Baked Cod with Sweet Potato',
          calories: dinnerCals,
          protein: Math.round(dinnerCals * 0.28 / 4),
          carbs: Math.round(dinnerCals * 0.42 / 4),
          fats: Math.round(dinnerCals * 0.30 / 9),
          ingredients: ['Cod fillet', 'Sweet potato', 'Green beans', 'Herbs'],
          instructions: ['Bake cod with herbs', 'Roast sweet potato', 'Steam green beans']
        },
        snacks: {
          name: 'Trail Mix',
          calories: snackCals,
          protein: Math.round(snackCals * 0.16 / 4),
          carbs: Math.round(snackCals * 0.44 / 4),
          fats: Math.round(snackCals * 0.40 / 9),
          ingredients: ['Mixed nuts', 'Dried fruits', 'Dark chocolate chips'],
          instructions: ['Mix all ingredients', 'Store in container']
        }
      },
      thursday: {
        breakfast: {
          name: 'Protein Pancakes',
          calories: breakfastCals,
          protein: Math.round(breakfastCals * 0.25 / 4),
          carbs: Math.round(breakfastCals * 0.55 / 4),
          fats: Math.round(breakfastCals * 0.20 / 9),
          ingredients: ['Protein powder', 'Banana', 'Eggs', 'Berries'],
          instructions: ['Mix protein powder with eggs and banana', 'Cook like pancakes', 'Top with berries']
        },
        lunch: {
          name: 'Asian Lettuce Wraps',
          calories: lunchCals,
          protein: Math.round(lunchCals * 0.28 / 4),
          carbs: Math.round(lunchCals * 0.32 / 4),
          fats: Math.round(lunchCals * 0.40 / 9),
          ingredients: ['Ground turkey', 'Lettuce cups', 'Water chestnuts', 'Sesame oil'],
          instructions: ['Cook turkey with seasonings', 'Add water chestnuts', 'Serve in lettuce cups']
        },
        dinner: {
          name: 'Vegetarian Chili',
          calories: dinnerCals,
          protein: Math.round(dinnerCals * 0.20 / 4),
          carbs: Math.round(dinnerCals * 0.55 / 4),
          fats: Math.round(dinnerCals * 0.25 / 9),
          ingredients: ['Black beans', 'Kidney beans', 'Tomatoes', 'Bell peppers'],
          instructions: ['Sauté vegetables', 'Add beans and tomatoes', 'Simmer until thick']
        },
        snacks: {
          name: 'Cottage Cheese with Fruit',
          calories: snackCals,
          protein: Math.round(snackCals * 0.35 / 4),
          carbs: Math.round(snackCals * 0.45 / 4),
          fats: Math.round(snackCals * 0.20 / 9),
          ingredients: ['Cottage cheese', 'Pineapple', 'Cinnamon'],
          instructions: ['Mix cottage cheese with fruit', 'Sprinkle with cinnamon']
        }
      },
      friday: {
        breakfast: {
          name: 'Chia Pudding',
          calories: breakfastCals,
          protein: Math.round(breakfastCals * 0.16 / 4),
          carbs: Math.round(breakfastCals * 0.44 / 4),
          fats: Math.round(breakfastCals * 0.40 / 9),
          ingredients: ['Chia seeds', 'Almond milk', 'Vanilla', 'Fresh berries'],
          instructions: ['Mix chia seeds with almond milk', 'Let sit overnight', 'Top with berries']
        },
        lunch: {
          name: 'Tuna Salad Sandwich',
          calories: lunchCals,
          protein: Math.round(lunchCals * 0.32 / 4),
          carbs: Math.round(lunchCals * 0.38 / 4),
          fats: Math.round(lunchCals * 0.30 / 9),
          ingredients: ['Tuna', 'Whole grain bread', 'Avocado', 'Spinach'],
          instructions: ['Mix tuna with avocado', 'Add spinach to bread', 'Assemble sandwich']
        },
        dinner: {
          name: 'Chicken Curry with Rice',
          calories: dinnerCals,
          protein: Math.round(dinnerCals * 0.26 / 4),
          carbs: Math.round(dinnerCals * 0.44 / 4),
          fats: Math.round(dinnerCals * 0.30 / 9),
          ingredients: ['Chicken breast', 'Coconut milk', 'Curry spices', 'Brown rice'],
          instructions: ['Cook chicken with curry spices', 'Add coconut milk', 'Serve over rice']
        },
        snacks: {
          name: 'Hummus with Vegetables',
          calories: snackCals,
          protein: Math.round(snackCals * 0.18 / 4),
          carbs: Math.round(snackCals * 0.52 / 4),
          fats: Math.round(snackCals * 0.30 / 9),
          ingredients: ['Hummus', 'Carrots', 'Celery', 'Bell peppers'],
          instructions: ['Cut vegetables into sticks', 'Serve with hummus']
        }
      },
      saturday: {
        breakfast: {
          name: 'Weekend Breakfast Bowl',
          calories: breakfastCals,
          protein: Math.round(breakfastCals * 0.22 / 4),
          carbs: Math.round(breakfastCals * 0.48 / 4),
          fats: Math.round(breakfastCals * 0.30 / 9),
          ingredients: ['Quinoa', 'Scrambled eggs', 'Avocado', 'Salsa'],
          instructions: ['Cook quinoa', 'Scramble eggs', 'Top with avocado and salsa']
        },
        lunch: {
          name: 'Grilled Vegetable Wrap',
          calories: lunchCals,
          protein: Math.round(lunchCals * 0.18 / 4),
          carbs: Math.round(lunchCals * 0.52 / 4),
          fats: Math.round(lunchCals * 0.30 / 9),
          ingredients: ['Zucchini', 'Bell peppers', 'Whole wheat tortilla', 'Goat cheese'],
          instructions: ['Grill vegetables', 'Spread goat cheese on tortilla', 'Roll with vegetables']
        },
        dinner: {
          name: 'Pork Tenderloin with Roasted Vegetables',
          calories: dinnerCals,
          protein: Math.round(dinnerCals * 0.30 / 4),
          carbs: Math.round(dinnerCals * 0.35 / 4),
          fats: Math.round(dinnerCals * 0.35 / 9),
          ingredients: ['Pork tenderloin', 'Brussels sprouts', 'Carrots', 'Olive oil'],
          instructions: ['Season and roast pork', 'Roast vegetables with olive oil', 'Serve together']
        },
        snacks: {
          name: 'Energy Balls',
          calories: snackCals,
          protein: Math.round(snackCals * 0.14 / 4),
          carbs: Math.round(snackCals * 0.46 / 4),
          fats: Math.round(snackCals * 0.40 / 9),
          ingredients: ['Dates', 'Almonds', 'Coconut', 'Cocoa powder'],
          instructions: ['Blend dates and almonds', 'Form into balls', 'Roll in coconut']
        }
      },
      sunday: {
        breakfast: {
          name: 'Sunday Brunch Plate',
          calories: breakfastCals,
          protein: Math.round(breakfastCals * 0.24 / 4),
          carbs: Math.round(breakfastCals * 0.46 / 4),
          fats: Math.round(breakfastCals * 0.30 / 9),
          ingredients: ['Smoked salmon', 'Whole grain bagel', 'Cream cheese', 'Capers'],
          instructions: ['Toast bagel', 'Spread cream cheese', 'Top with salmon and capers']
        },
        lunch: {
          name: 'Buddha Bowl',
          calories: lunchCals,
          protein: Math.round(lunchCals * 0.20 / 4),
          carbs: Math.round(lunchCals * 0.50 / 4),
          fats: Math.round(lunchCals * 0.30 / 9),
          ingredients: ['Quinoa', 'Roasted chickpeas', 'Kale', 'Tahini dressing'],
          instructions: ['Cook quinoa', 'Roast chickpeas', 'Massage kale', 'Combine with dressing']
        },
        dinner: {
          name: 'Sunday Roast Chicken',
          calories: dinnerCals,
          protein: Math.round(dinnerCals * 0.32 / 4),
          carbs: Math.round(dinnerCals * 0.38 / 4),
          fats: Math.round(dinnerCals * 0.30 / 9),
          ingredients: ['Whole chicken', 'Potatoes', 'Green beans', 'Herbs'],
          instructions: ['Roast chicken with herbs', 'Roast potatoes', 'Steam green beans']
        },
        snacks: {
          name: 'Dark Chocolate and Nuts',
          calories: snackCals,
          protein: Math.round(snackCals * 0.12 / 4),
          carbs: Math.round(snackCals * 0.38 / 4),
          fats: Math.round(snackCals * 0.50 / 9),
          ingredients: ['Dark chocolate', 'Mixed nuts'],
          instructions: ['Break chocolate into pieces', 'Serve with nuts']
        }
      }
    };
  }

  async generateMealSuggestions(profile: UserProfile, mealType: string, preferences?: string[]): Promise<Meal[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const targetCalories = this.calculateBMR(profile);
    const mealCalories = {
      breakfast: Math.round(targetCalories * 0.25),
      lunch: Math.round(targetCalories * 0.35),
      dinner: Math.round(targetCalories * 0.30),
      snack: Math.round(targetCalories * 0.10)
    };

    const calories = mealCalories[mealType as keyof typeof mealCalories] || 400;

    // Mock suggestions based on meal type
    const suggestions: Meal[] = [
      {
        name: `Healthy ${mealType.charAt(0).toUpperCase() + mealType.slice(1)} Option 1`,
        calories,
        protein: Math.round(calories * 0.20 / 4),
        carbs: Math.round(calories * 0.50 / 4),
        fats: Math.round(calories * 0.30 / 9),
        ingredients: ['Fresh ingredients', 'Balanced nutrition', 'Quality proteins'],
        instructions: ['Prepare with care', 'Cook thoroughly', 'Enjoy mindfully']
      },
      {
        name: `Nutritious ${mealType.charAt(0).toUpperCase() + mealType.slice(1)} Option 2`,
        calories: calories + 50,
        protein: Math.round((calories + 50) * 0.25 / 4),
        carbs: Math.round((calories + 50) * 0.45 / 4),
        fats: Math.round((calories + 50) * 0.30 / 9),
        ingredients: ['Organic produce', 'Lean proteins', 'Healthy fats'],
        instructions: ['Season well', 'Cook to perfection', 'Serve fresh']
      },
      {
        name: `Balanced ${mealType.charAt(0).toUpperCase() + mealType.slice(1)} Option 3`,
        calories: calories - 30,
        protein: Math.round((calories - 30) * 0.18 / 4),
        carbs: Math.round((calories - 30) * 0.52 / 4),
        fats: Math.round((calories - 30) * 0.30 / 9),
        ingredients: ['Whole grains', 'Fresh vegetables', 'Natural flavors'],
        instructions: ['Combine ingredients', 'Mix well', 'Serve immediately']
      }
    ];

    return suggestions;
  }
}

export const mockNutritionAI = new MockNutritionAI();
export type { UserProfile, MealPlan, WeeklyMealPlan, Meal };