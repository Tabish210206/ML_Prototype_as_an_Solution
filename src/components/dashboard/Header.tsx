import { Wifi, WifiOff, RefreshCw, CheckCircle2, AlertCircle, User, Clock, Building2 } from "lucide-react";

interface HeaderProps {
  hospitalName: string;
  district: string;
  state: string;
  crsId: string;
  operatorName: string;
  operatorId: string;
  shiftTiming: string;
  networkStatus: "online" | "offline";
  crsSync: "synced" | "syncing" | "error";
  uidaiSync: "synced" | "syncing" | "error";
}

export function Header({
  hospitalName,
  district,
  state,
  crsId,
  operatorName,
  operatorId,
  shiftTiming,
  networkStatus,
  crsSync,
  uidaiSync,
}: HeaderProps) {
  const getSyncIcon = (status: "synced" | "syncing" | "error") => {
    switch (status) {
      case "synced":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "syncing":
        return <RefreshCw className="w-4 h-4 text-warning animate-spin" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
    }
  };

  const getSyncText = (status: "synced" | "syncing" | "error") => {
    switch (status) {
      case "synced":
        return "Synced";
      case "syncing":
        return "Syncing...";
      case "error":
        return "Error";
    }
  };

  return (
    <header className="gov-header text-primary-foreground">
      {/* Top Bar - Status Indicators */}
      <div className="bg-primary/90 px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            {networkStatus === "online" ? (
              <Wifi className="w-4 h-4 text-success" />
            ) : (
              <WifiOff className="w-4 h-4 text-destructive" />
            )}
            <span>{networkStatus === "online" ? "Online" : "Offline"}</span>
          </div>
          <div className="flex items-center gap-2">
            {getSyncIcon(crsSync)}
            <span>CRS: {getSyncText(crsSync)}</span>
          </div>
          <div className="flex items-center gap-2">
            {getSyncIcon(uidaiSync)}
            <span>UIDAI: {getSyncText(uidaiSync)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="px-6 py-4">
        <div className="flex items-start justify-between">
          {/* Hospital Info */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-primary-foreground/10 rounded-lg flex items-center justify-center border border-primary-foreground/20">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight">JANM-PEHCHAAN DESK</h1>
                <span className="px-2 py-0.5 bg-accent text-accent-foreground text-xs font-semibold rounded">
                  v2.1
                </span>
              </div>
              <p className="text-primary-foreground/80 text-sm mt-0.5">
                Hospital Birth Registration & Identity Initiation
              </p>
              <div className="flex items-center gap-4 mt-2 text-xs text-primary-foreground/70">
                <span>{hospitalName}</span>
                <span className="w-1 h-1 rounded-full bg-primary-foreground/40" />
                <span>{district}, {state}</span>
                <span className="w-1 h-1 rounded-full bg-primary-foreground/40" />
                <span>CRS ID: {crsId}</span>
              </div>
            </div>
          </div>

          {/* Operator Info */}
          <div className="flex items-center gap-3 bg-primary-foreground/10 rounded-lg px-4 py-3 border border-primary-foreground/20">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
              <User className="w-5 h-5 text-accent-foreground" />
            </div>
            <div className="text-right">
              <p className="font-semibold">{operatorName}</p>
              <p className="text-xs text-primary-foreground/70">ID: {operatorId}</p>
              <p className="text-xs text-primary-foreground/70">{shiftTiming}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
