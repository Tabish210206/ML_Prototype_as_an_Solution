import { Search, Filter, MoreVertical, Eye, Edit2, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockRecords = [
  {
    id: "TIRN-2024-UP-VNS-00843",
    childName: "Baby of Sunita Devi",
    dateOfBirth: "2024-01-15",
    consentStatus: "complete",
    immunizationStatus: "scheduled",
    nextAction: "Week 6 Photo Capture",
    nextActionDate: "2024-02-26",
  },
  {
    id: "TIRN-2024-UP-VNS-00844",
    childName: "Arjun Kumar",
    dateOfBirth: "2024-01-14",
    consentStatus: "pending",
    immunizationStatus: "pending",
    nextAction: "Consent Required",
    nextActionDate: "2024-01-21",
  },
  {
    id: "TIRN-2024-UP-VNS-00845",
    childName: "Baby of Priya Singh",
    dateOfBirth: "2024-01-13",
    consentStatus: "complete",
    immunizationStatus: "overdue",
    nextAction: "Overdue - Week 6 Visit",
    nextActionDate: "2024-02-24",
  },
  {
    id: "TIRN-2024-UP-VNS-00846",
    childName: "Lakshmi Sharma",
    dateOfBirth: "2024-01-12",
    consentStatus: "complete",
    immunizationStatus: "completed",
    nextAction: "Week 14 Scheduled",
    nextActionDate: "2024-04-20",
  },
  {
    id: "TIRN-2024-UP-VNS-00847",
    childName: "Baby of Meera Yadav",
    dateOfBirth: "2024-01-16",
    consentStatus: "crs-mismatch",
    immunizationStatus: "pending",
    nextAction: "CRS Verification Required",
    nextActionDate: "2024-01-17",
  },
];

export function PendingRecords() {
  const getConsentBadge = (status: string) => {
    switch (status) {
      case "complete":
        return <Badge className="badge-consent"><CheckCircle2 className="w-3 h-3 mr-1" /> Complete</Badge>;
      case "pending":
        return <Badge className="badge-pending"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case "crs-mismatch":
        return <Badge variant="destructive"><AlertTriangle className="w-3 h-3 mr-1" /> CRS Mismatch</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getImmunizationBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" /> Scheduled</Badge>;
      case "pending":
        return <Badge className="badge-pending">Pending</Badge>;
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      case "completed":
        return <Badge className="badge-consent">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Pending Identity Records</h2>
          <p className="text-sm text-muted-foreground">
            {mockRecords.length} records requiring attention
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by name or ID..." className="pl-9 w-64" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Records</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="consent-pending">Consent Pending</SelectItem>
              <SelectItem value="crs-mismatch">CRS Mismatch</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-lg bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Child Name / Temp ID</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Consent Status</TableHead>
              <TableHead>Immunization Status</TableHead>
              <TableHead>Next Scheduled Action</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{record.childName}</p>
                    <p className="text-xs text-muted-foreground font-mono">{record.id}</p>
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(record.dateOfBirth).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>{getConsentBadge(record.consentStatus)}</TableCell>
                <TableCell>{getImmunizationBadge(record.immunizationStatus)}</TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm">{record.nextAction}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(record.nextActionDate).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit Record
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
