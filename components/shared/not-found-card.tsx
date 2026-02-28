import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const NotFoundCard = () => {
  return (
    <Card className="w-full h-full border-0 shadow-none min-h-svh">
      <CardContent className="flex flex-col items-center justify-center text-center max-w-md mx-auto h-full flex-1">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
        <p className="mt-2 text-muted-foreground">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It
          might have been removed, renamed, or doesn&apos;t exist.
        </p>
        <div className="mt-8 flex gap-4">
          <Button asChild>
            <Link href="/">Go Back Home</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotFoundCard;
