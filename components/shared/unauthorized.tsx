import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Unauthorized() {
  return (
    <Card className="h-full border-0 shadow-none">
      <CardContent className="h-full">
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <ShieldAlert className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="mt-4 text-2xl font-semibold">Access Denied</h2>
          <p className="mt-2 text-muted-foreground text-center max-w-md">
            You do not have permission to view this page. Please contact your
            administrator if you believe this is a mistake.
          </p>
          <div className="mt-8 flex gap-4">
            <Button asChild>
              <Link href="/">Go Back Home</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
