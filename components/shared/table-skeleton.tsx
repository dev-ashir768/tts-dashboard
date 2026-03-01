import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DatatableSkeletonProps {
  rowCount?: number;
  columnCount?: number;
  hasBadge?: boolean;
}

const TableSkeleton = ({
  rowCount = 10,
  columnCount = 6,
  hasBadge = false,
}: DatatableSkeletonProps) => {
  return (
    <>
      <div className="w-full">
        {/* Toolbar Skeleton */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
          <div className="relative w-full sm:w-auto">
            {/* Search Input Skeleton */}
            <Skeleton className="h-9 w-full sm:w-[300px] rounded-md" />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Export Button Skeleton */}
            <Skeleton className="h-9 w-[80px] rounded-md" />
            {/* View Button Skeleton */}
            <Skeleton className="h-9 w-[80px] rounded-md" />
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="w-full mb-4">
          <div className="[&>div]:rounded-t-md">
            <Table>
              <TableHeader className="bg-[#f8fafc]">
                <TableRow className="hover:bg-transparent">
                  {Array.from({ length: columnCount }).map((_, i) => (
                    <TableHead key={i} className="h-10 px-4">
                      <Skeleton className="h-4 w-[100px]" />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: rowCount }).map((_, i) => (
                  <TableRow key={i} className="h-11">
                    {Array.from({ length: columnCount }).map((_, j) => (
                      <TableCell key={j} className="px-4 py-2">
                        {/* Simulate badge or text */}
                        {hasBadge && j === columnCount - 1 ? (
                          <Skeleton className="h-6 w-16 rounded-full" />
                        ) : (
                          <Skeleton className="h-4 w-full max-w-[140px]" />
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination Skeleton */}
        <div className="flex flex-col md:flex-row items-center justify-between px-2 space-y-4 md:space-y-0">
          {/* Showing X to Y of Z Skeleton */}
          <div className="flex-1">
            <Skeleton className="h-4 w-[200px]" />
          </div>

          {/* Right Side: Pagination Controls Skeleton */}
          <div className="flex items-center space-x-6 lg:space-x-8">
            {/* Rows per page Skeleton */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-[30px]" />
              <Skeleton className="h-8 w-[70px] rounded-md" />
              <Skeleton className="h-4 w-[40px]" />
            </div>

            {/* Navigation Buttons Skeleton */}
            <div className="flex items-center space-x-1.5">
              <Skeleton className="h-8 w-8 rounded-md" /> {/* Prev */}
              <div className="hidden md:flex items-center space-x-1">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
              <Skeleton className="h-6 w-[60px] md:hidden rounded-md" />{' '}
              {/* Mobile page info */}
              <Skeleton className="h-8 w-8 rounded-md" /> {/* Next */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableSkeleton;
