import { chakra } from "@chakra-ui/react";
import { CONSTANT } from "../utils/constant";
import { globalStyles } from "../common/theme/styles";
function Header({ setIsCreateStageOpen, setIsCreateLeadOpen }) {

  const colors = globalStyles.colors
  return (
    <chakra.div
      display="flex"
      padding={{ base: "10px", md: "15px" }}
      justifyContent="space-between"
      alignItems={{ base: "flex-start", md: "center" }}
      flexDirection={{ base: "column", md: "row" }}
      gap={{ base: "12px", md: "0" }}
    >
      <chakra.h3 fontWeight={700} fontSize={{ base: "20px", md: "24px" }}>
        {CONSTANT.common.appTitle}
      </chakra.h3>
      <chakra.div display={'flex'} gap={4} flexWrap="wrap">
        <chakra.button
          padding={{ base: "10px 16px", md: "13px 20px" }}
          border="1px solid"
          borderColor={colors.primaryBtn}
          background={colors.primaryBtn}
          color={colors.white}
          fontWeight="500"
          fontSize={{ base: "16px", md: "18px" }}
          cursor={'pointer'}
          borderRadius="8px"
          onClick={() => setIsCreateStageOpen(true)}
          _hover={{
            background: colors.primaryHover
          }}
        >
          {CONSTANT.Header.createStage}
        </chakra.button>
        <chakra.button
          padding={{ base: "10px 16px", md: "13px 20px" }}
          border="1px solid"
          borderColor={colors.secondaryBtn}
          background={colors.secondaryBtn}
          color={colors.white}
          fontWeight="500"
          fontSize={{ base: "16px", md: "18px" }}
          cursor={'pointer'}
          borderRadius="8px"
          onClick={() => setIsCreateLeadOpen(true)}
          _hover={{
            background: colors.secondaryHover
          }}
        >
          {CONSTANT.Header.createLead}
        </chakra.button>
      </chakra.div>
    </chakra.div>
  )
}

export default Header