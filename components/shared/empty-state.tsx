interface EmptyStateProps {
  message?: string;
}

const EmptyState = ({ message = 'No data available' }: EmptyStateProps) => {
  return (
    <div className="flex h-40 w-full items-center justify-center rounded-lg border border-dashed text-muted-foreground">
      {message}
    </div>
  );
};

export default EmptyState;
