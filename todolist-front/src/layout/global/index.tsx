import { Flex } from "@chakra-ui/react";
import Header from "../../components/header";
import Footer from "../../components/footer";

interface TemplateProps {
  children: React.ReactNode;
}

const Template: React.FC<TemplateProps> = ({ children, ...props }) => {
  return (
    <>
      <Header key="header" />

      <Flex
        key="content"
        overflowY="auto"
        flexDirection="column"
        scrollBehavior="smooth"
        justifyContent="space-between"
        height="calc(100vh - 67px)"
      >
        <Flex
          width="100%"
          flexDirection="column"
          max-height="calc(100vh - 45px)"
          {...props}
        >
          {children}
        </Flex>
        <Footer />
      </Flex>
    </>
  );
};

export default Template;
