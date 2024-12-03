import { cn } from "@/lib/utils";

function SkeletonDefault({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export function Skeleton() {
  return (
    <div className="flex items-center space-x-4">
      <SkeletonDefault className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <SkeletonDefault className="h-4 w-[250px]" />
        <SkeletonDefault className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
