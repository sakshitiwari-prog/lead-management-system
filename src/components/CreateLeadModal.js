import { Modal, chakra, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { mockData } from "../utils/mockData";
import { CONSTANT } from "../utils/constant";
import { leadValue } from "../utils/initialValues";
import { globalStyles } from "../common/theme/styles";

export function CreateLeadModal({ isOpen, onClose, onSave, stageList, mode, lead }) {
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState(leadValue);

  const colors = globalStyles.colors
  useEffect(() => {

    if (lead && Object.keys(lead) && mode === 'edit') {
      setForm(lead)
    }
  }, [lead])


  function handleChange(e) {
    const { name, value } = e.target;

    if (value.startsWith(' ')) return;

    setForm({ ...form, [name]: value });

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  }

  function validateForm() {
    let temp = {};

    if (!form.leadName.trim()) {
      temp.leadName = CONSTANT.leads.leadNameError;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email && !emailRegex.test(form.email)) {
      temp.email = CONSTANT.leads.validEmailError;
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  }
  function handleSave() {

    if (!validateForm()) return;

    if (mode === "edit") {
      onSave({
        ...form,
        assignedSalesAgent: Number(form.assignedSalesAgent),
      });
    } else {
      onSave({
        id: "lead_" + crypto.randomUUID(),
        ...form,
        assignedSalesAgent: Number(form.assignedSalesAgent),
      });
    }

    onClose();
    setForm(leadValue);
    setErrors({});
  }


  function closeHandler() {
    onClose()
    setForm(leadValue)
    setErrors({});
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
      p={{ base: "16px", md: "0" }}
      isOpen={isOpen} onClose={() => { closeHandler() }} isCentered>
      <ModalOverlay />
      <ModalContent bg={colors.white}
        borderRadius="12px"
        p={{ base: "20px", md: "24px" }}
        w={{ base: "100%", sm: "450px", md: "550px" }}
        maxW="550px"
        maxH={{ base: "90vh", md: "auto" }}
        overflowY={{ base: "auto", md: "visible" }}
      >
        <ModalHeader fontSize={{ base: "18px", md: "20px" }}>{mode === 'create' ? CONSTANT.leads.createLead : CONSTANT.leads.editLead}</ModalHeader>
        <ModalBody display="flex" flexDirection="column" gap="12px" >
          <div>
            <Input
              placeholder={CONSTANT.leads.leadName}
              name="leadName"
              value={form.leadName}
              onChange={handleChange}
              border={`1px solid ${errors.leadName ? colors.error : colors.leadField}`}
            />
            {errors.leadName && (
              <chakra.p color="red" fontSize="12px" mt="4px">
                {errors.leadName}
              </chakra.p>
            )}
          </div>
          <div>
            <Input
              placeholder={CONSTANT.leads.email}
              name="email"
              value={form.email}
              onChange={handleChange}
              border={`1px solid ${errors.email ? colors.error : colors.leadField}`}
            />
            {errors.email && (
              <chakra.p color="red" fontSize="12px" mt="4px">
                {errors.email}
              </chakra.p>
            )}
          </div>

          <Select name="assignedSalesAgent" value={form.assignedSalesAgent} placeholder={CONSTANT.leads.selectAgent} onChange={handleChange}>
            {mockData.salesAgentList.map((a) => (
              <option value={a.id}>{a.name}</option>
            ))}
          </Select>

          <Select name="priority"  value={form.priority} onChange={handleChange}>
            {CONSTANT.priorityList.map(p => <option value={p.value}>{p.title}</option>)}
          </Select>

          <Select name="stage"  value={form.stage} onChange={handleChange}>
            {stageList.map(s => <option value={s.value}>{s.title}</option>)}
          </Select>

          <Textarea placeholder={CONSTANT.leads.notes} name="notes" value={form.notes} onChange={handleChange} />
        </ModalBody>

        <ModalFooter display="flex" gap="12px" justifyContent="flex-end" flexDirection={'row'}>
          <Button onClick={() => {
            closeHandler()
          }} colorScheme={colors.gray}
            variant="outline"
            w={{ base: "50%", sm: "auto" }}>
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
            onClick={handleSave}
            w={{ base: "50%", sm: "auto" }}
            _hover={{
              background: colors.primaryHover
            }}
          >
            {CONSTANT.leads.save}
          </chakra.button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
