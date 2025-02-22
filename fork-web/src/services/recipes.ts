const RecipesService = {
  async getRecipes() {
    try {
      const res = await fetch('./dummies/recipes.json');
      const data = await res.json();
      return data.recipes;
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      return [];
    }
  },
};

export default RecipesService;
