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
import React from "react";

type ActionConfirmModalProps = {
  isOpen: boolean;
  itemName: string;
  handleOnClose: () => void;
  handleOnConfirm: () => void;
};

const ActionConfirmModal: React.FC<ActionConfirmModalProps> = ({
  isOpen,
  itemName,
  handleOnClose,
  handleOnConfirm,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={handleOnClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Remoção da lista de afazeres</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Tem certeza de que deseja remover <strong>{itemName}</strong>? Essa
          ação não pode ser desfeita.
        </ModalBody>
        <ModalFooter gap="10px">
          <Button variant="ghost" onClick={handleOnClose}>
            Cancelar
          </Button>
          <Button variant="solid" colorScheme="red" onClick={handleOnConfirm}>
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ActionConfirmModal;
