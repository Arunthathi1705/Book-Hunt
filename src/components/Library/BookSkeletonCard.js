import { Skeleton } from "@mantine/core";

const BookSkeletonCard = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Book cover */}
      <Skeleton height={160} width={96} radius="md" animate />

      {/* Title lines */}
      <Skeleton height={10} width={80} radius="xl" animate />
      <Skeleton height={10} width={64} radius="xl" animate />
    </div>
  );
};

export default BookSkeletonCard;
