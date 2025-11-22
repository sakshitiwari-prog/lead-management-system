import React, { useEffect, useState } from "react";
import { chakra } from "@chakra-ui/react";
import { mockData } from "../utils/mockData";
import { CONSTANT } from "../utils/constant";
import dottedMenu from '../common/images/dottedMenu.png'
import { LeadMenu } from "./LeadMenu";
import { globalStyles } from "../common/theme/styles";
function Lead({ lead, onDeleteLead, onEditLead }) {
    const menuRef = React.useRef(null);
    const [openLeadMenu, setOpenLeadMenu] = useState(null);

  const colors = globalStyles.colors
    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenLeadMenu(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const selectedPriority = CONSTANT.priorityList.find((p) => p.value === lead.priority)
    return (
        <chakra.div
            p="14px"
            bg={colors.white}
            borderRadius="12px"
            boxShadow={`0 2px 6px ${colors.leadCardBg}`}
            border="1px solid #e3cccc"
            display="flex"
            flexDirection="column"
            gap="12px"
            cursor="grab"
            position={'relative'}
            minW={{ base: "200px", md: "230px" }}
            w="100%"
        >

            <chakra.div display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap="8px">
                <chakra.p fontSize={{ base: "14px", md: "16px" }} fontWeight="700" color="gray.800">
                    {lead.leadName}
                </chakra.p>
                <chakra.div display="flex" justifyContent="space-between" alignItems="center" gap={'5px'}>

                    <chakra.span
                        px="6px"
                        py="2px"
                        bg={selectedPriority?.bg}
                        color={selectedPriority?.color}
                        borderRadius="6px"
                        borderColor={selectedPriority?.color}
                        fontSize="11px"
                        border={'0.5px solid'}
                        fontWeight="600"
                    >
                        {selectedPriority?.title}
                    </chakra.span>
                    <chakra.img
                        src={dottedMenu}
                        alt="lead menu"
                        w="20px"
                        h="20px"
                        cursor="pointer"
                        borderRadius="full"
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenLeadMenu(openLeadMenu === lead.id ? null : lead.id);
                        }}
                    />

                </chakra.div>
            </chakra.div>

            {/* Line 2: Email + Agent */}
            <chakra.div
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                flexDirection={{ base: "column", sm: "row" }}
                gap={{ base: "12px", sm: "8px" }}
            >
                <chakra.div display={'flex'} flexDirection={'column'}>
                    <chakra.p fontSize={{ base: "13px", md: "14px" }} fontWeight={500} color="gray.600">
                        {CONSTANT.leads.email}
                    </chakra.p>
                    <chakra.p fontSize={{ base: "12px", md: "13px" }} color="gray.600" wordBreak="break-word">
                        {lead.email}
                    </chakra.p>
                </chakra.div>

                <chakra.div display={'flex'} flexDirection={'column'}>
                    <chakra.p fontSize={{ base: "13px", md: "14px" }} fontWeight={500} color="gray.600">
                        {CONSTANT.leads.assignedAgent}
                    </chakra.p>
                    <chakra.p fontSize={{ base: "12px", md: "13px" }} color="gray.600">
                        {
                            mockData.salesAgentList.find(
                                (agent) => agent.id === lead.assignedSalesAgent
                            )?.name
                        }
                    </chakra.p>
                </chakra.div>
            </chakra.div>

            <chakra.p fontSize={{ base: "13px", md: "14px" }} fontWeight={500} color="gray.600">
                {'Notes :-'}
            </chakra.p>
            <chakra.p
                fontSize={{ base: "12px", md: "13px" }}
                color="gray.700"
                bg="gray.50"
                border={`1px solid ${colors.leadNotesBorder}`}
                borderRadius="8px"
                p="8px"
                noOfLines={2}
            >
                {lead.notes || CONSTANT.leads.noNotesAdded}
            </chakra.p>

            {openLeadMenu === lead.id && (
                <LeadMenu
                    menuRef={menuRef}
                    onEdit={() => onEditLead(lead)}
                    onDelete={() => onDeleteLead(lead)}
                    onClose={() => setOpenLeadMenu(null)}
                />
            )}
        </chakra.div>
    );
}

export default Lead;
