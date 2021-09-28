import { Container, Heading } from "@chakra-ui/layout";
import React from "react";

const RequestIndex = () => {
  return (
    <Container px={6} maxW="container.xl" py={4}>
      <Heading mb={10} size="2xl" color="white" as="h3">
        Request
      </Heading>
    </Container>
  );
};

export default RequestIndex;
