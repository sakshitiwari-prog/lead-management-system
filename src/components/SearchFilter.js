import { chakra, Box, Input, Button, } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { exportLeadsToCSV } from "../utils/helper";
import { CONSTANT } from "../utils/constant";
import { globalStyles } from "../common/theme/styles";

export function SearchFilter({ search,
  setSearch,
  stageFilter,
  leads,
  setStageFilter,
  agentFilter,
  setAgentFilter,
  clearFilters,
  stageList,
  agentList, }) {

  const colors = globalStyles.colors
  return (
    <Box
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      gap="12px"
      p={{ base: "10px", md: "12px" }}
      bg={colors.white}
      flexWrap="wrap"
    >
      <Input
        w={{ base: "100%", md: "400px" }}
        placeholder={CONSTANT.search.searchByName}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Box display={'flex'} justifyContent={'space-between'} gap={'12px'}>

        <chakra.select
          w={{ base: "100%", md: "200px" }}
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
          padding="8px"
          borderRadius="6px"
          border="1px solid"
          borderColor="gray.300"
        >
          <option value="">
            {CONSTANT.search.filterByStage}
          </option>
          {stageList.map(s => (
            <option key={s.id} value={s.value}>{s.title}</option>
          ))}
        </chakra.select>


        <chakra.select
          w={{ base: "100%", md: "200px" }}
          value={agentFilter}
          onChange={(e) => setAgentFilter(e.target.value)}
          padding="8px"
          borderRadius="6px"
          border="1px solid"
          borderColor="gray.300"
        >

          <option value="">
            {CONSTANT.search.filterByAgent}
          </option>
          {agentList.map(a => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </chakra.select>
      </Box>
      <Box display={'flex'} justifyContent={'space-between'} gap={'12px'}>
        <Button
          onClick={clearFilters}
          colorScheme={colors.gray}
          variant="outline"
          w={{ base: "100%", md: "auto" }}
        >
          {CONSTANT.search.clearFilters}
        </Button>

        <Button
          colorScheme="blue"
          onClick={() => { exportLeadsToCSV(leads) }}
          w={{ base: "100%", md: "auto" }}
        >
          {CONSTANT.search.exportLeadsCSV}
        </Button>
      </Box>
    </Box>
  );
}
