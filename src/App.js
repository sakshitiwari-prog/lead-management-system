import { act, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Button, ChakraProvider, Input } from "@chakra-ui/react";
import system from "./common/theme/theme";

import {
  DndContext,
} from "@dnd-kit/core";
import { chakra } from "@chakra-ui/react";
import './common/theme/globalStyle.css'
import { ToastContainer, toast } from 'react-toastify';

import { CONSTANT } from "./utils/constant";
import { mockData } from "./utils/mockData";

import Lead from "./components/Lead";
import dottedMenu from './common/images/dottedMenu.png'
import { StageMenu } from "./components/StageMenu";
import { DroppableContainer } from "./components/DroppableContainer";
import Header from "./components/Header";
import { DraggableItem } from "./components/DraggableItem";
import { CreateStageModal } from "./components/CreateStageModal";
import { CreateLeadModal } from "./components/CreateLeadModal";
import { SearchFilter } from "./components/SearchFilter";
import LeadPerSales from "./components/LeadPerSales";
import { globalStyles } from "./common/theme/styles";

export default function App() {
  const inputRef = useRef(null);
  const [isCreateStageOpen, setIsCreateStageOpen] = useState(false);
  const [isCreateLeadInfo, setIsCreateLeadInfo] = useState({
    isLeadModalOpen: false,
    mode: 'create',
    lead: {}
  });
  const colors = globalStyles.colors
  const [leads, setLeads] = useState(mockData.leadData);
  const [filteredLeads, setFilteredLeads] = useState(mockData.leadData);

  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("");
  const [agentFilter, setAgentFilter] = useState("");

  const [stageList, setStageList] = useState(CONSTANT.stageList)
  const [openMenu, setOpenMenu] = useState(null);
  const [editingStage, setEditingStage] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [stageError, setStageError] = useState({})

  function handleCreateStage(title) {
    const newStage = {
      id: "stage_" + crypto.randomUUID(),
      title,
      value: title.toLowerCase().replace(/\s+/g, "_"),
      index: stageList.length
    };

    setStageList([...stageList, newStage]);
  }
  function handleCreateLead(data) {
    const exists = filteredLeads.findIndex(item => item.id === data.id) !== -1;

    if (exists) {
      setLeads(prev =>
        prev.map(item => (item.id === data.id ? data : item))
      );

      setFilteredLeads(prev =>
        prev.map(item => (item.id === data.id ? data : item))
      );
      localStorage.setItem('updatedInitialLeads', JSON.stringify(leads.map(item => (item.id === data.id ? data : item))))
    } else {
      setLeads(prev => [...prev, data]);
      setFilteredLeads(prev => [...prev, data]);
      localStorage.setItem('updatedInitialLeads', JSON.stringify([...leads, data]))
    }
    reapplyFilters();
  }
  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeLead = leads.find(l => l.id === activeId);
    const overLead = leads.find(l => l.id === overId);
    console.log(activeLead, overLead, 'activeLead && overLead');

    if (activeLead?.id === overLead?.id) return
    if (activeLead && overLead && activeLead.stage === overLead.stage) {
      const newLeads = [...leads];

      const stageLeads = newLeads.filter(l => l.stage === activeLead.stage);

      const oldIndex = stageLeads.findIndex(l => l.id === activeId);
      const newIndex = stageLeads.findIndex(l => l.id === overId);

      stageLeads.splice(oldIndex, 1);
      stageLeads.splice(newIndex, 0, activeLead);

      const updatedLeads = newLeads.map(l => {
        if (l.stage === activeLead.stage) {
          return stageLeads.shift();
        }
        return l;
      });

      setLeads(updatedLeads);
      setFilteredLeads(updatedLeads.filter(l =>
        !stageFilter || l.stage === stageFilter
      ));

      localStorage.setItem('updatedInitialLeads', JSON.stringify(updatedLeads));

      return;
    }


    const newStage = over.data.current.stage;


    setLeads(prev =>
      prev.map(lead =>
        lead.id === activeId ? { ...lead, stage: newStage } : lead
      )
    );
    setFilteredLeads(prev =>
      prev.map(lead =>
        lead.id === activeId ? { ...lead, stage: newStage } : lead
      )
    );
    localStorage.setItem('updatedInitialLeads', JSON.stringify(leads.map(lead =>
      lead.id === activeId ? { ...lead, stage: newStage } : lead
    )));


  };
  useEffect(() => {
    console.log(filteredLeads, 'filteredLeads');

  }, [filteredLeads])

  useEffect(() => {
    function handleClickOutside(e) {
      if (editingStage && inputRef.current && !inputRef.current.contains(e.target)) {
        stageChecker(stageList.find(s => s.id === editingStage));
        setEditingStage(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [editingStage, editValue, stageList]);

  function stageChecker(stage) {
    const oldTitle = stage.title;
    const exists = stageList.some(
      s => s.title.toLowerCase() === editValue.toLowerCase() && s.id !== stage.id
    );

    if (!editValue.trim() || exists) {
      setEditValue(oldTitle);
      setEditingStage(null);
      setStageError(prev => ({ ...prev, [stage.id]: false }));
      return;
    }

    // 3. UPDATE normally
    setStageList(prev =>
      prev.map(s =>
        s.id === stage.id ? { ...s, title: editValue } : s
      )
    );
    reapplyFilters();

  }
  function stageHandler(e, stage) {
    const exists = stageList.some(
      s => s.title.toLowerCase() === e.target.value.toLowerCase() && s.id !== stage.id
    );
    if (exists) {
      toast.error(CONSTANT.common.stageTitleExist, {
        position: "top-right",
        autoClose: 3000,
      });
      setStageError(prev => ({ ...prev, [stage.id]: true }));
    }
    setEditValue(e.target.value)
  }
  function debounce(fn, delay = 500) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }
  function applyFilters(searchVal, stageVal, agentVal) {
    const initialUpdatedLeads = localStorage.getItem("updatedInitialLeads");
    if (initialUpdatedLeads) {
      const parsed = JSON.parse(initialUpdatedLeads);

      let result = parsed.filter(l => {


        const matchesSearch = l.leadName.toLowerCase().includes(searchVal.toLowerCase());

        const matchesStage = stageVal ? l.stage === stageVal : true;

        const matchesAgent = agentVal ? l.assignedSalesAgent == agentVal : true;

        return matchesSearch && matchesStage && matchesAgent;
      });

      setFilteredLeads(result);
    }
  }

  const debouncedSearch = debounce((value) => {
    applyFilters(value, stageFilter, agentFilter);
  }, 1000);
  function handleStageFilter(value) {

    setStageFilter(value);
    applyFilters(search, value, agentFilter);
  }

  function handleAgentFilter(value) {
    setAgentFilter(value);
    applyFilters(search, stageFilter, value);
  }
  function handleSearchInput(value) {
    setSearch(value);
    debouncedSearch(value);
  }

  function clearFilters() {
    setSearch("");
    setStageFilter("");
    setAgentFilter("");
    setFilteredLeads(leads);
  }
  function handleEditLead(lead) {

    setIsCreateLeadInfo({ isLeadModalOpen: true, mode: 'edit', lead })
  }
  function reapplyFilters() {
    applyFilters(search, stageFilter, agentFilter);
  }

  function handleDeleteLead(lead) {
    const updated = leads.filter(l => l.id !== lead.id);

    setLeads(updated);
    setFilteredLeads(updated);
    localStorage.setItem("updatedInitialLeads", JSON.stringify(updated));

    applyFilters(search, stageFilter, agentFilter);

  }
  const [isHydrated, setIsHydrated] = useState(false);



  useEffect(() => {
    if (isHydrated) return;

    const saved = localStorage.getItem("leadAppState");
    const initialUpdatedLeads = localStorage.getItem("updatedInitialLeads");
    if (saved) {
      const parsed = JSON.parse(saved);
      setSearch(parsed.search || "");
      setStageList(parsed.stageList || CONSTANT.stageList)
      setStageFilter(parsed.stageFilter || "");
      setAgentFilter(parsed.agentFilter || "");
      setFilteredLeads(parsed.filteredLeads || []);
    }
    if (initialUpdatedLeads) {
      const parsedInitalLeads = JSON.parse(initialUpdatedLeads);
      setLeads(parsedInitalLeads || [])
    } else {
      localStorage.setItem("updatedInitialLeads", JSON.stringify(leads));

    }

    setIsHydrated(true);
  }, [isHydrated]);

  useEffect(() => {

    const state = {
      filteredLeads,
      search,
      stageFilter,
      agentFilter,
      stageList
    };

    localStorage.setItem("leadAppState", JSON.stringify(state));
  }, [search, stageFilter, agentFilter, stageList, filteredLeads]);


  return (
    <ChakraProvider value={system}>
      <DndContext onDragEnd={handleDragEnd}>
        <ToastContainer />
        <Header setIsCreateStageOpen={setIsCreateStageOpen} setIsCreateLeadOpen={(data) =>
          setIsCreateLeadInfo({ isLeadModalOpen: data, mode: 'create', lead: {} })}></Header>
        <SearchFilter
          search={search}
          setSearch={handleSearchInput}
          stageFilter={stageFilter}
          leads={filteredLeads}
          setStageFilter={handleStageFilter}
          agentFilter={agentFilter}
          setAgentFilter={handleAgentFilter}
          clearFilters={clearFilters}
          stageList={stageList}
          agentList={mockData.salesAgentList}
        />

        <LeadPerSales leads={leads}></LeadPerSales>
        <Box w={'100%'} border={1} background={colors.divider} height={'0.5px'}></Box>
        <Box display="flex"
          gap="20px"
          margin={{ base: "10px", md: "15px" }}
          overflowX="auto"
          overflowY="hidden"
          pb="10px"
          css={{
            '&::-webkit-scrollbar': {
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: colors.stageContainerTrackBg,
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: colors.stageContainerThnumbBg,
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: colors.stageContainerThnumbHoverBg,
            },
          }}>
          {stageList.map((stage) => {
            return (
              <DroppableContainer id={stage.id} stage={stage.value}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  position="relative"
                >
                  {/* Stage Title or Input */}
                  {editingStage === stage.id ? (
                    <Input
                      value={editValue}
                      w={{ base: "45%", md: "50%" }}
                      ref={inputRef}
                      onChange={(e) => stageHandler(e, stage)}
                      borderRadius="4px"
                      p="6px"
                      m="12px"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          stageChecker(stage);
                        }
                      }}
                      onBlur={() => stageChecker(stage)}
                    />
                  ) : (
                    <Box display="flex"
                      justifyContent="space-between"
                      alignItems="center">
                      <chakra.h3 textAlign="center"
                        padding={{ base: "10px", md: "15px" }}
                        fontSize={{ base: "14px", md: "16px" }}>
                        {stage.title}
                      </chakra.h3>
                      <chakra.h3 textAlign="center"
                        padding={{ base: "4px 8px", md: "4px 10px" }}
                        bg={colors.stageCount}
                        fontSize={{ base: "13px", md: "14px" }}
                      >
                        {filteredLeads.filter((item) => item.stage === stage.value).length ?? 0}
                      </chakra.h3>
                    </Box>
                  )}

                  {/* Menu Icon */}
                  <chakra.img
                    src={dottedMenu}
                    alt="stage menu"
                    w="20px"
                    marginRight={'10px'}
                    h="20px"
                    cursor={'pointer'}
                    borderRadius="full"
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    onClick={() =>
                      setOpenMenu(openMenu === stage.id ? null : stage.id)
                    }
                  />
                  {/* Popup Menu */}
                  {openMenu === stage.id && (
                    <StageMenu
                      stage={stage}
                      onEdit={(stage) => {
                        setEditingStage(stage.id);
                        setEditValue(stage.title);
                      }}
                      onDelete={(stage) => {
                        setStageList(prev => prev.filter(s => s.id !== stage.id));
                        localStorage.setItem("updatedInitialLeads", JSON.stringify(leads.filter((lead) => lead.stage !== stage.value)));

                        reapplyFilters();
                      }}
                      onClose={() => {
                        setOpenMenu(null)
                      }}
                    />
                  )}
                </Box>
                <Box w={'100%'} border={1} background={colors.divider} height={'0.5px'}></Box>
                <Box padding={{ base: "10px", md: "15px" }}
                >
                  {filteredLeads
                    .filter((lead) => lead.stage === stage.value)
                    .map((lead) => (<DraggableItem
                      key={lead.id}
                      id={lead.id}
                      lead={lead}
                      stage={stage}
                      onEditLead={handleEditLead}
                      onDeleteLead={handleDeleteLead}
                    />

                    ))}
                </Box>
              </DroppableContainer>
            );
          })}
        </Box>
        <CreateStageModal
          isOpen={isCreateStageOpen}
          onClose={() => setIsCreateStageOpen(false)}
          onCreate={handleCreateStage}
        />

        <CreateLeadModal
          lead={isCreateLeadInfo.lead}
          mode={isCreateLeadInfo.mode}
          isOpen={isCreateLeadInfo.isLeadModalOpen}
          onClose={() => {
            setIsCreateLeadInfo({ isLeadModalOpen: false, mode: '', lead: {} })
          }}
          onSave={handleCreateLead}
          stageList={stageList}
        />

      </DndContext>
    </ChakraProvider>

  );
}
