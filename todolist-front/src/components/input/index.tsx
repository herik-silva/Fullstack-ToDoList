import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { ChangeEvent, HTMLInputTypeAttribute } from "react";

type InputComponentProps = {
  label: string;
  formErrorMessage?: string;
  handleOnChangeValue: (event: ChangeEvent<HTMLInputElement>) => void;
  isError?: boolean;
  type?: HTMLInputTypeAttribute;
  value?: string;
  isRequired?: boolean;
};

const InputComponent: React.FC<InputComponentProps> = ({
  label = "",
  handleOnChangeValue = () => {
    throw "Função onChangeValue deve ser implementada";
  },
  formErrorMessage = "",
  isError = false,
  type = "text",
  value = "",
  isRequired = false,
}) => {
  return (
    <FormControl
      isRequired={isRequired}
      isInvalid={isRequired ? isError : false}
    >
      <FormLabel>{label}</FormLabel>
      <Input
        variant="outline"
        borderColor="var(--footer-bg)"
        type={type}
        onChange={handleOnChangeValue}
        value={value}
      />
      {isError && <FormErrorMessage>❌ {formErrorMessage}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputComponent;
