import { useState } from "react";
import { Button, Input } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter, chakra,
  ModalBody,
} from "@chakra-ui/react";
import { CONSTANT } from "../utils/constant";
import { globalStyles } from "../common/theme/styles";


export function CreateStageModal({ isOpen, onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(false)

  const colors = globalStyles.colors
  function handleCreate() {
    if (!title.trim()) {
      setError(true)
      return;
    }

    onCreate(title);
    setTitle("");
    onClose();
  }
  function onCloseHandler() {
    setTitle('')
    onClose()
    setError(false)
  }

  return (
    <Modal
      display={isOpen ? "flex" : "none"}
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      bg={colors.stageModalContainer}
      alignItems="center"
      justifyContent="center"
      zIndex={1000}
      isOpen={isOpen} onClose={onCloseHandler} isCentered>
      <ModalOverlay />
      <ModalContent bg={colors.white}
        borderRadius="12px"
        p={{ base: "20px", md: "24px" }}
        w={{ base: "90%", sm: "400px", md: "500px" }}
        maxW="500px">
        <ModalHeader fontSize={{ base: "18px", md: "20px" }} fontWeight="600" mb="16px">{CONSTANT.stage.createNewStage}</ModalHeader>

        <ModalBody>
          <Input
            placeholder={CONSTANT.stage.stageTitlePlaceholder}
            value={title}
            border={`1px solid ${error ? "red.500" : colors.black}`}
            onChange={(e) => {
              setError(false)
              const value = e.target.value
              if (value.startsWith(' ')) return
              setTitle(value)
            }}
          />
          {error && <chakra.p

            color="red.500"

          >
            {CONSTANT.stage.stageTitleError}
          </chakra.p>}
        </ModalBody>

        <ModalFooter display="flex" gap="12px" justifyContent="flex-end" flexDirection={'row'}>
          <Button onClick={() => {
            onCloseHandler()
          }} colorScheme={colors.gray}
            variant="outline"
            w={{ base: "100%", sm: "auto" }}>
            {CONSTANT.common.cancel}
          </Button>
          <chakra.button
            padding="8px 16px"
            border="1px solid"
            borderColor={colors.primaryBtn}
            background={colors.primaryBtn}
            color={colors.white}
            fontWeight="500"
            fontSize="16px"
            cursor={'pointer'}
            borderRadius="8px"
            onClick={handleCreate}
            w={{ base: "100%", sm: "auto" }}
            _hover={{
              background:colors.primaryHover
            }}
          >
            {CONSTANT.stage.create}
          </chakra.button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
