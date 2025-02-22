import { Toaster } from '@/components/ui/sonner';
import AppRoutes from '@/routes';

function App() {
  return (
    <>
      <AppRoutes />
      <Toaster richColors expand closeButton position="top-right" />
    </>
  );
}

export default App;
