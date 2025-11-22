import { useOutsideClick } from "@chakra-ui/hooks";
import { chakra } from "@chakra-ui/react";
import { useRef } from "react";
import { CONSTANT } from "../utils/constant";
import { globalStyles } from "../common/theme/styles";
export const StageMenu = ({ stage, onEdit, onDelete, onClose }) => {
    const ref = useRef();

    const colors = globalStyles.colors
    useOutsideClick({
        ref,
        handler: onClose,
    });

    return (
        <chakra.div
            position="absolute"
            top="40px"
            right="10px"
            bg={colors.white}
            border={`1px solid ${colors.menuBorder}`}
            borderRadius="8px"
            boxShadow={`0 4px 12px ${colors.menuBorderShadow}`}
            zIndex={10}
            minW="120px"
        >
            <chakra.p
                padding="10px 16px"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
                onPointerDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                }}
                onClick={() => {
                    onEdit(stage);
                    onClose();
                }}
            >
                {CONSTANT.common.edit}
            </chakra.p>

            <chakra.p
                padding="10px 16px"
                cursor="pointer"
                onPointerDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                }}
                color="red.500"
                _hover={{ bg: "red.50" }}
                onClick={() => {
                    onDelete(stage);
                    onClose();
                }}
            >
                {CONSTANT.common.delete}
            </chakra.p>
        </chakra.div>
    );
};
