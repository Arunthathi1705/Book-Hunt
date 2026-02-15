import React from "react";
import { Card, Text, Image, Center } from "@mantine/core";
import notFound from "../../Assets/not-found.png";

const NoBooksFound = () => {
  return (
    <Center className="mt-16">
      <Card shadow="sm" padding="md" radius="lg" style={{ maxWidth: 400, textAlign: "center" }}>
        <Image
          src={notFound}
          alt="No Books Found"
          height={200}
          fit="contain"
          style={{ marginBottom: 20 }}
        />
        <p className="font-bold">
          <span className="text-red-500 pr-2">Oops!</span>No Books Found
        </p>
        <Text c="dimmed" size="sm">
          Explore other kinds of books
        </Text>
      </Card>
    </Center>
  );
};

export default NoBooksFound;
