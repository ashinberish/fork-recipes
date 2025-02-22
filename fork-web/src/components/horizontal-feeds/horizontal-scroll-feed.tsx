import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { RecipeCard } from './recipe-card';
import ScrollButton from './scroll-button';
import RecipesService from '@/services/recipes';

export default function HorizontalScrollFeed() {
  // eslint-disable-next-line
  const [recipes, setRecipes] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const fetchRecipes = async () => {
    await RecipesService.getRecipes().then((recipes) => {
      setRecipes(recipes);
    });
  };
  useEffect(() => {
    fetchRecipes();
  }, []);

  const scroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      <h2 className="text-xl font-bold mb-4">Trending Recipes</h2>
      <div className="relative flex items-center">
        <ScrollButton direction="left" onClick={() => scroll(-300)} />
        <motion.div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide"
          style={{ scrollBehavior: 'smooth', whiteSpace: 'nowrap' }}
        >
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </motion.div>
        <ScrollButton direction="right" onClick={() => scroll(300)} />
      </div>
    </div>
  );
}
