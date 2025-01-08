import { ChangeEvent, useState } from "react";

const useRequiredField = (
  initialValue = "",
  callback: (value: string) => boolean
) => {
  const [field, setField] = useState(initialValue);
  const [isError, setIsError] = useState(!callback(initialValue));

  const handleOnChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setIsError(!callback(value));
    setField(value);
  };

  const resetField = () => {
    setField(initialValue);
    setIsError(true);
  };

  return {
    field,
    isError,
    bind: {
      value: field,
      handleOnChange: handleOnChange,
    },
    resetField,
  };
};

export default useRequiredField;
