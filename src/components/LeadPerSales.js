import React from 'react'


import { Box, chakra } from "@chakra-ui/react";
import { mockData } from '../utils/mockData';
import { CONSTANT } from '../utils/constant';
import { globalStyles } from '../common/theme/styles';
function LeadPerSales({ leads }) {

    const colors = globalStyles.colors
  return (
    <Box display="flex"
      flexDirection={{ base: "column", md: "row" }}
      gap="12px"
      p={{ base: "10px", md: "12px" }}
      bg={colors.white}
      flexWrap="wrap">
      {mockData.salesAgentList.map((agent, index) => {
        const count = leads.filter(l => l.assignedSalesAgent === agent.id).length;
        return (
          <Box
          key={agent.id} 
          p="12px" 
          bg="blue.50" 
          borderRadius="8px"
          w={{ base: "100%", md: "auto" }}
          >
             <chakra.p fontSize="14px" fontWeight="600">
            {agent.name}: {count} {CONSTANT.search.leads}
          </chakra.p>
          </Box>
        );
      })}
    </Box>

  )
}

export default LeadPerSales