import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

type ScrollButtonProps = {
  direction: 'left' | 'right';
  onClick: () => void;
};
export default function ScrollButton({
  direction,
  onClick,
}: ScrollButtonProps) {
  return (
    <Button
      variant="outline"
      className={`absolute ${direction === 'left' ? 'left-0' : 'right-0'} z-10 p-2 bg-white shadow-md rounded-full`}
      onClick={onClick}
    >
      {direction === 'left' ? (
        <ChevronLeft size={24} />
      ) : (
        <ChevronRight size={24} />
      )}
    </Button>
  );
}
