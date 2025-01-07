import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import useRequiredField from "../../../core/hooks/use-required-field";
import InputComponent from "../../input";
import { TodolistAPIInstance } from "../../../model/todolist";
import { useMst } from "../../../model/rootstore";
import Request from "../../../core/utils/Request";

type CreateTodolistModalProps = {
  isOpen: boolean;
  handleOnClose: () => void;
};

const CreateTodolistModal: React.FC<CreateTodolistModalProps> = ({
  isOpen,
  handleOnClose,
}) => {
  const store = useMst();

  const titleField = useRequiredField("", (value) => value.length >= 4);
  const descriptionField = useRequiredField("", (value) => value.length >= 0);

  const handleOnConfirm = () => {
    const isValid = !(titleField.isError && descriptionField.isError);
    const url = `${import.meta.env.VITE_API_URL}/todolist`;
    const request = new Request<TodolistAPIInstance>();

    if (isValid) {
      const data = {
        title: titleField.bind.value,
        description: descriptionField.bind.value,
      };

      const body = JSON.stringify(data);

      request
        .postAPI(url, body)
        .then((value) => {
          const response: TodolistAPIInstance = {
            id: value.id,
            title: data.title,
            description: data.description,
            taskLength: 0,
          };

          console.groupCollapsed("ARMAZENAR NO STORE");
          console.log(response);
          console.groupEnd();
          store.addTodo(response);
        })
        .finally(() => handleOnClose());
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Nova Lista</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputComponent
            label="Nome"
            handleOnChangeValue={titleField.bind.handleOnChange}
            isError={titleField.isError}
            value={titleField.bind.value}
            formErrorMessage="O título da lista deve ter no mínimo 4 caracteres"
            isRequired={true}
          />
          <InputComponent
            label="Descrição"
            handleOnChangeValue={descriptionField.bind.handleOnChange}
            isError={descriptionField.isError}
            value={descriptionField.bind.value}
            formErrorMessage=""
          />
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={handleOnClose}>
            Cancelar
          </Button>
          <Button variant="solid" colorScheme="green" onClick={handleOnConfirm}>
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateTodolistModal;
