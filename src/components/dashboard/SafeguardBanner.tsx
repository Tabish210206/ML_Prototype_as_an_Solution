import { ShieldAlert, Scale, Lock, FileSearch } from "lucide-react";

export function SafeguardBanner() {
  return (
    <div className="bg-warning/5 border-y border-warning/20 px-6 py-2">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-warning">
            <ShieldAlert className="w-4 h-4" />
            <span className="font-medium">No Biometrics at Birth</span>
          </div>
          <div className="flex items-center gap-2 text-success">
            <Scale className="w-4 h-4" />
            <span>Supreme Court Compliant</span>
          </div>
          <div className="flex items-center gap-2 text-info">
            <Lock className="w-4 h-4" />
            <span>DPDP Act 2023 Enabled</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <FileSearch className="w-4 h-4" />
            <span>Full Audit Trail Active</span>
          </div>
        </div>
        <span className="text-muted-foreground">
          Demographic-Only Identity • CRS-Linked • Purpose-Bound Consent
        </span>
      </div>
    </div>
  );
}
