import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormControlProps,
} from "@chakra-ui/react";
import { ChangeEvent, HTMLInputTypeAttribute } from "react";

type InputComponentProps = FormControlProps & {
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
  ...args
}) => {
  return (
    <FormControl
      isRequired={isRequired}
      isInvalid={isRequired ? isError : false}
      {...args}
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
