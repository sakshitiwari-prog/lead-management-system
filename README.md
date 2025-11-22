# Lead Management Kanban Board

A fully interactive Lead Management System built using React, Chakra UI, and dnd-kit, featuring customizable stages, drag-and-drop lead management, filters, and CSV export.
This project was bootstrapped with Create React App.


## Features
### 1. Dynamic Stages

- Default stages: New Lead, Contacted, Qualified, Won, Lost

- Add new stages and leads

- Rename stages and edit leads

- Delete stages and leads

- Drag & drop leads between stages

- Reorder leads within the same stage

### 2. Lead Cards

- Each lead card includes:
  - Lead Name
  - Contact Info (Email / Phone)
  - Status / Stage
  - Priority (High/Medium/Low)
  - Assigned Sales Agent
  - Notes
### 3. Sales Agents

- Maintain a list of agents (e.g., John, Priya, Ahmed)
- Assign a lead to any agent
- Filter leads by agents
 
### 4. Search & Filters

- Filter leads by Lead name, Stage, Assigned agent
- Search is real-time with debouncing for performance.
 
### 5. Dashboard Stats

- Leads per stage
- Leads per agent
 
### 6. Drag & Drop

- Powered by @dnd-kit:
  - Move leads between stages
  - Change priority
  - Reorder within the same stage

### 7. LocalStorage Persistence

- All leads, stages, agents, and filters are saved in localStorage, so data stays even after reload.
 
### 8. Export Leads to CSV

- Export the entire leads list (or filtered list) as a CSV file.

### 7. Responsive UI

- Mobile-friendly.
- Smooth scrolling columns.
- Adaptive layouts
 
 
 ## Tech Stack
- React 19
- Chakra UI 
- dnd-kit (Drag & Drop)
- React Toastify
- JavaScript 

 ## Folder Structure (High-Level)
```
src/
│
├── components/
│   ├── Header/
│   ├── Lead/
│   ├── DroppableContainer/
│   ├── DraggableItem/
│   ├── CreateStageModal/
│   ├── CreateLeadModal/
│   ├── SearchFilter/
│   └── LeadPerSales/
│   
├── utils/
│   ├── mockData.js
│   ├── constant.js
│   └── helper.js
│
├── common/
│   ├── images/
│   └── theme/
│
├── App.js
└── index.js
```
## Getting Started 

This project was bootstrapped with Create React App..

### 1. Install Dependencies

```bash
  npm install
```
### 2. Start Development Server

```bash
  npm start
```
- Runs the app in development mode.
- Open [http://localhost:3000](http://localhost:3000) 
 in your browser.
### 3. Build for Production

```bash
  npm run build
```
## Available Scripts

### `npm test`

Launches tests in watch mode.

### `npm run build`

Creates a production build.

### `npm run eject`

Irreversible. Gives full control of CRA configuration.

## Author

- Sakshi Tiwari


