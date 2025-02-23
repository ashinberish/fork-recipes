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
    <Button variant="outline" onClick={onClick}>
      {direction === 'left' ? (
        <ChevronLeft size={24} />
      ) : (
        <ChevronRight size={24} />
      )}
    </Button>
  );
}
