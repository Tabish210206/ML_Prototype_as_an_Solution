import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { NavigationTabs, TabType } from "@/components/dashboard/NavigationTabs";
import { SafeguardBanner } from "@/components/dashboard/SafeguardBanner";
import { NewBirthRegistration } from "@/components/dashboard/NewBirthRegistration";
import { PendingRecords } from "@/components/dashboard/PendingRecords";
import { ConsentDocuments } from "@/components/dashboard/ConsentDocuments";
import { ScheduledFollowUps } from "@/components/dashboard/ScheduledFollowUps";
import { CorrectionsUpdates } from "@/components/dashboard/CorrectionsUpdates";
import { SupervisorReview } from "@/components/dashboard/SupervisorReview";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>("new-registration");

  const renderContent = () => {
    switch (activeTab) {
      case "new-registration":
        return <NewBirthRegistration />;
      case "pending-records":
        return <PendingRecords />;
      case "consent-documents":
        return <ConsentDocuments />;
      case "follow-ups":
        return <ScheduledFollowUps />;
      case "corrections":
        return <CorrectionsUpdates />;
      case "supervisor-review":
        return <SupervisorReview />;
      default:
        return <NewBirthRegistration />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        hospitalName="District General Hospital"
        district="Varanasi"
        state="Uttar Pradesh"
        crsId="UP-VNS-DGH-001"
        operatorName="Priya Sharma"
        operatorId="OP-12345"
        shiftTiming="Morning Shift (8 AM - 2 PM)"
        networkStatus="online"
        crsSync="synced"
        uidaiSync="synced"
      />
      <SafeguardBanner />
      <NavigationTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        pendingCount={5}
        followUpCount={12}
        correctionCount={3}
      />
      <main className="bg-secondary/30 min-h-[calc(100vh-200px)]">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
