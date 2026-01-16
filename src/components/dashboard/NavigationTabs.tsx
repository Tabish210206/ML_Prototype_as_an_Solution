import { 
  Baby, 
  ClipboardList, 
  FileCheck, 
  CalendarClock, 
  Edit3, 
  UserCheck 
} from "lucide-react";

export type TabType = 
  | "new-registration" 
  | "pending-records" 
  | "consent-documents" 
  | "follow-ups" 
  | "corrections" 
  | "supervisor-review";

interface NavigationTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  pendingCount?: number;
  followUpCount?: number;
  correctionCount?: number;
}

export function NavigationTabs({ 
  activeTab, 
  onTabChange, 
  pendingCount = 0, 
  followUpCount = 0, 
  correctionCount = 0 
}: NavigationTabsProps) {
  const tabs = [
    { 
      id: "new-registration" as TabType, 
      label: "New Birth Registration", 
      icon: Baby,
      count: null 
    },
    { 
      id: "pending-records" as TabType, 
      label: "Pending Identity Records", 
      icon: ClipboardList,
      count: pendingCount 
    },
    { 
      id: "consent-documents" as TabType, 
      label: "Consent & Documents", 
      icon: FileCheck,
      count: null 
    },
    { 
      id: "follow-ups" as TabType, 
      label: "Scheduled Follow-Ups", 
      icon: CalendarClock,
      count: followUpCount 
    },
    { 
      id: "corrections" as TabType, 
      label: "Corrections & Updates", 
      icon: Edit3,
      count: correctionCount 
    },
    { 
      id: "supervisor-review" as TabType, 
      label: "Supervisor Review", 
      icon: UserCheck,
      count: null 
    },
  ];

  return (
    <nav className="bg-card border-b">
      <div className="flex overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`nav-tab flex items-center gap-2 whitespace-nowrap ${
                isActive ? "active" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== null && tab.count > 0 && (
                <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                  isActive 
                    ? "bg-accent text-accent-foreground" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
