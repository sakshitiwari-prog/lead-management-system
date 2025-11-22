export const CONSTANT = {
    common: {
        stageTitleExist: "A stage with this name already exists.",
        appTitle: 'Lead Management System',
        edit: "Edit",
        delete: "Delete",
        cancel: "Cancel"
    },
    Header: {
        createStage: "Create Stage",
        createLead: "Create Lead"
    },
    search: {
        searchByName: "Search by name...",
        filterByStage: "Filter by Stage",
        filterByAgent: "Filter by Agent",
        clearFilters: "Clear Filters",
        exportLeadsCSV: "Export Leads CSV",
        leads: "leads"
    },
    leads: {
        email: 'Email :-',
        assignedAgent: 'Assigned Agent :-',
        noNotesAdded: "No notes added",
        createLead: 'Create Lead',
        editLead: 'Edit Lead',
        leadName: "Lead Name",
        email: "Email",
        selectAgent: "Select sales agent",
        selectPriority: "Select priority",
        selectStage: "Select stage",
        notes: "Notes",
        save: "Save",
        leadNameError:"Lead name is required",
        validEmailError:"Enter a valid email"
    },
    stage: {
        createNewStage: "Create New Stage",
        stageTitlePlaceholder: "Enter stage title",
        stageTitleError: "Stage title is required",
        create: "Create"
    },
    stageList: [
        { id: 'stage1', title: "New Lead", value: "new_lead" },
        { id: 'stage2', title: "Contacted", value: "contacted" },
        { id: 'stage3', title: "Qualified", value: "qualified" },
        { id: 'stage4', title: "Won", value: "won" },
        { id: 'stage5', title: "Lost", value: "lost" }
    ],
    priorityList: [
        { id: 1, title: "High", value: "high", color: "red.500", bg: "red.100" },
        { id: 2, title: "Low", value: "low", color: "green.600", bg: "green.100" },
        { id: 3, title: "Medium", value: "medium", color: "orange.600", bg: "orange.100" },
    ],
    agentColors: [
        { bg: "#E3F2FD", border: "#42A5F5", text: "#0D47A1" },
        { bg: "#F3E5F5", border: "#AB47BC", text: "#4A148C" },
        { bg: "#FFF3E0", border: "#FFA726", text: "#E65100" },
    ]


}