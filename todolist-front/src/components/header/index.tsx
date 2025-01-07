import { Flex, Heading } from "@chakra-ui/react";

const Header: React.FC = () => {
  return (
    <Flex
      as="header"
      bg="var(--footer-bg)"
      p="15px"
      color="var(--primary-color)"
    >
      <Heading size="lg">Todolist</Heading>
    </Flex>
  );
};

export default Header;
