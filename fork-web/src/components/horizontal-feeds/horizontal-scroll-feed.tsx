import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { RecipeCard } from './recipe-card';
import ScrollButton from './scroll-button';
import RecipesService from '@/services/recipes';
import { Button } from '../ui/button';

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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Trending Recipes</h2>
        <div className="flex">
          <Button variant="outline" className="mr-2">
            View All
          </Button>
          <div className="flex gap-2">
            <ScrollButton direction="left" onClick={() => scroll(-300)} />
            <ScrollButton direction="right" onClick={() => scroll(300)} />
          </div>
        </div>
      </div>

      <div className="relative flex items-center">
        {/* <ScrollButton direction="left" onClick={() => scroll(-300)} /> */}
        <motion.div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide no-scrollbar"
          style={{ scrollBehavior: 'smooth', whiteSpace: 'nowrap' }}
        >
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </motion.div>
        {/* <ScrollButton direction="right" onClick={() => scroll(300)} /> */}
      </div>
    </div>
  );
}
