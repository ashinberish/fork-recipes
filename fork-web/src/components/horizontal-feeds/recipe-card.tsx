import { Card, CardContent } from '../ui/card';

// TODO: Do customization and add Typescript types
//  eslint-disable-next-line @typescript-eslint/no-explicit-any
export function RecipeCard({ recipe }: any) {
  return (
    <Card className="min-w-[250px] shadow-md rounded-lg">
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full h-40 object-cover"
      />
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{recipe.name}</h3>
      </CardContent>
    </Card>
  );
}
