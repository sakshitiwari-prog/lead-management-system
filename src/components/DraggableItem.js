import { useEffect, useRef, useState } from "react";
import Lead from "./Lead";
import {
  useDraggable,
  useDroppable
} from "@dnd-kit/core";

import { chakra } from "@chakra-ui/react";
import { LeadMenu } from "./LeadMenu";
import { globalStyles } from "../common/theme/styles";
export const DraggableItem = ({ id, lead, stage, onEditLead, onDeleteLead }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id, data: lead });
  const { setNodeRef: setDropRef } = useDroppable({ id, data: lead });

  const colors = globalStyles.colors
  return (
    <chakra.div mb="12px"
      ref={(node) => {
        setNodeRef(node);
        setDropRef(node);
      }}
      style={{
        margin: "10px",
        background: colors.dragItem,
        borderRadius: "8px",
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
        cursor: "grab",
      }}
      {...listeners}
      {...attributes}
    >
      <Lead lead={lead} onEditLead={onEditLead} onDeleteLead={onDeleteLead} ></Lead>

    </chakra.div>
  );
};