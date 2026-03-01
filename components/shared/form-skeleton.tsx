import { Skeleton } from '@/components/ui/skeleton';

interface FormSkeletonProps {
  numberOfFields?: number;
}

const FormSkeleton: React.FC<FormSkeletonProps> = ({ numberOfFields = 14 }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="w-full flex flex-col gap-5">
        {/* Generate enough skeletons to match fields (approx 14) */}
        {Array.from({ length: numberOfFields }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            {/* Label Skeleton */}
            <Skeleton className="h-4 w-32" />
            {/* Input/Select Skeleton */}
            <Skeleton className="h-10 w-full" />
          </div>
        ))}

        {/* Button Skeleton */}
        <Skeleton className="h-10 w-full sm:w-40 mt-2" />
      </div>
    </div>
  );
};

export default FormSkeleton;
