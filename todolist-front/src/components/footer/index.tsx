import { Flex, Text } from "@chakra-ui/react";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <Flex
      as="footer"
      height="35px"
      alignItems="center"
      justifyContent="center"
      bg="var(--footer-bg)"
      color="var(--footer-text-color)"
    >
      <Text fontWeight="bold">&copy; {year} feito por Herik</Text>
    </Flex>
  );
};

export default Footer;
