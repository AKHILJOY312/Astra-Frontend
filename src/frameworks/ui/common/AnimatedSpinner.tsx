import { LoaderCircle } from "lucide-react";

export default function AnimatedIconSpinner({
  isLoading,
}: {
  isLoading: boolean;
}) {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="my-auto me-2">
      <LoaderCircle
        className="animate-spin"
        size={16} // Set the size
        color="white" // Set the color
        role="status"
        aria-label="Loading Spinner"
      />
    </div>
  );
}
