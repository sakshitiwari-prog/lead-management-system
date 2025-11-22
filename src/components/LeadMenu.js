import { chakra } from "@chakra-ui/react";
import { CONSTANT } from "../utils/constant";
import { globalStyles } from "../common/theme/styles";
export function LeadMenu({ onEdit, onDelete, onClose, menuRef }) {

    const colors = globalStyles.colors
  return (
    <chakra.div
      ref={menuRef}
      position="absolute"
      top="35px"
      right="10px"
      bg={colors.white}
      border={`1px solid ${colors.menuBorder}`}
      borderRadius="8px"
      boxShadow={`0 4px 12px ${colors.menuBorderShadow}`}
      zIndex={10}
      minW="120px"
    >
      <chakra.div
        padding="10px 16px"
        cursor="pointer"
        onPointerDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        _hover={{ bg: "gray.100" }}
        onClick={() => {
          onEdit();
          onClose();
        }}
      >
        {CONSTANT.common.edit}
      </chakra.div>
      <chakra.div
        padding="10px 16px"
        cursor="pointer"
        onPointerDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        color="red.500"
        _hover={{ bg: "red.50" }}
        onClick={() => {
          onDelete();
          onClose();
        }}
      >
        {CONSTANT.common.delete}

      </chakra.div>
    </chakra.div>
  );
}
