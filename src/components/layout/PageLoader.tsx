import { Skeleton } from '@/components/ui/skeleton';

const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center" role="status" aria-label="Carregando">
    <div className="space-y-4 w-full max-w-md px-4">
      <Skeleton className="h-8 w-3/4 mx-auto" />
      <Skeleton className="h-4 w-1/2 mx-auto" />
      <div className="grid grid-cols-2 gap-4 mt-8">
        <Skeleton className="aspect-[2/3] rounded-xl" />
        <Skeleton className="aspect-[2/3] rounded-xl" />
      </div>
    </div>
  </div>
);

export default PageLoader;
