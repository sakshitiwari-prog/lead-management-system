import {
  useDroppable
} from "@dnd-kit/core";
import { chakra } from "@chakra-ui/react";
export const DroppableContainer = ({ id, children, ...rest }) => {
  const { setNodeRef, isOver } = useDroppable({ id, data: rest });

  return (
    <chakra.div
      ref={setNodeRef}
      minW={{ base: "280px", md: "300px" }}
      maxW={{ base: "280px", md: "300px" }}
      bg="#f4f7ff"
      borderRadius="12px"
      border="1px solid #ddd"
      flexShrink={0}
    >
      {children}
    </chakra.div>
  );
};