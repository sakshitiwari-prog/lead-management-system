import { CONSTANT } from "./constant";
import { mockData } from "./mockData";

export function exportLeadsToCSV(leads) {
    if (!leads.length) return;
    const saved = localStorage.getItem("leadAppState");
    let parsed
    if (saved)
        parsed = JSON.parse(saved);
    const headers = Object.keys(leads[0]);
    const updatedHeader = headers.map((item) => ({ title: camelToTitle(item), value: item }))
    const csvRows = [
        updatedHeader.map((item) => item.title).join(","), // header row
        ...leads.map(lead =>
            updatedHeader.map(h => JSON.stringify(h.value === 'priority' ?
                CONSTANT.priorityList.find((priority) => priority.value === lead[h.value])?.title
                : h.value === 'stage' ?
                    camelToTitle(parsed.stageList.find((stage) => stage.value === lead[h.value])?.title) :
                    h.value === 'assignedSalesAgent' ?
                        mockData.salesAgentList.find((agent) => agent.id === lead[h.value])?.name : lead[h.value]
                        ?? "")).join(",")
        )
    ];

    const csvString = csvRows.join("\n");

    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "leads_export.csv";
    a.click();

    window.URL.revokeObjectURL(url);
}

export function camelToTitle(str) {
    if (!str) return
    return str
        .replace(/([A-Z])/g, '$1')   // insert space before capital letters
        .replace(/^./, char => char.toUpperCase()); // capitalize first letter
}
