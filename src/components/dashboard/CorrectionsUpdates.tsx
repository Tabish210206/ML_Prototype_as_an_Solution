import { useState } from "react";
import { Edit3, AlertCircle, CheckCircle2, Clock, User, FileText, Home, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const mockCorrectionRequests = [
  {
    id: "COR-2024-001",
    type: "name",
    tempId: "TIRN-2024-UP-VNS-00843",
    childName: "Baby of Sunita Devi",
    requestedBy: "OP-12345",
    requestedAt: "2024-01-16 10:30 AM",
    status: "pending",
    currentValue: "Baby of Sunita Devi",
    proposedValue: "Aarav Kumar",
    reason: "Name finalized by parents",
  },
  {
    id: "COR-2024-002",
    type: "address",
    tempId: "TIRN-2024-UP-VNS-00844",
    childName: "Arjun Kumar",
    requestedBy: "OP-12346",
    requestedAt: "2024-01-15 03:45 PM",
    status: "approved",
    currentValue: "123, Old Colony, Varanasi",
    proposedValue: "456, New Township, Varanasi",
    reason: "Family relocated",
  },
  {
    id: "COR-2024-003",
    type: "parent",
    tempId: "TIRN-2024-UP-VNS-00845",
    childName: "Baby of Priya Singh",
    requestedBy: "OP-12345",
    requestedAt: "2024-01-14 11:00 AM",
    status: "rejected",
    currentValue: "Rajesh Singh",
    proposedValue: "Ramesh Singh",
    reason: "Spelling correction",
    rejectionReason: "Supporting documents not provided",
  },
];

export function CorrectionsUpdates() {
  const [selectedType, setSelectedType] = useState("");
  const [reason, setReason] = useState("");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "name":
        return <User className="w-4 h-4" />;
      case "address":
        return <Home className="w-4 h-4" />;
      case "parent":
        return <User className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "name":
        return "Name Correction";
      case "address":
        return "Address Update";
      case "parent":
        return "Parent Details";
      default:
        return type;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="badge-pending"><Clock className="w-3 h-3 mr-1" /> Pending Approval</Badge>;
      case "approved":
        return <Badge className="badge-consent"><CheckCircle2 className="w-3 h-3 mr-1" /> Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Corrections & Updates</h2>
          <p className="text-sm text-muted-foreground">
            Controlled correction flow with supervisor approval
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Edit3 className="w-4 h-4 mr-2" />
              New Correction Request
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Request Correction</DialogTitle>
              <DialogDescription>
                Submit a correction request. All changes require supervisor approval.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Temporary ID</Label>
                <Input placeholder="Enter TIRN number" />
              </div>
              <div className="space-y-2">
                <Label>Correction Type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name Spelling Correction</SelectItem>
                    <SelectItem value="parent">Parent Detail Update</SelectItem>
                    <SelectItem value="address">Address Correction</SelectItem>
                    <SelectItem value="dob">Date of Birth Correction</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Current Value</Label>
                <Input placeholder="Current information" />
              </div>
              <div className="space-y-2">
                <Label>Proposed Value</Label>
                <Input placeholder="New corrected information" />
              </div>
              <div className="space-y-2">
                <Label>Reason for Correction</Label>
                <Select value={reason} onValueChange={setReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spelling">Spelling Error</SelectItem>
                    <SelectItem value="name-finalized">Name Finalized</SelectItem>
                    <SelectItem value="relocation">Family Relocation</SelectItem>
                    <SelectItem value="data-entry">Data Entry Error</SelectItem>
                    <SelectItem value="document-update">Document Update</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Additional Notes</Label>
                <Textarea placeholder="Any additional information..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Submit for Approval</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="mb-6 border-warning/30 bg-warning/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
            <div>
              <p className="font-medium text-sm">Supervisor Approval Required</p>
              <p className="text-xs text-muted-foreground mt-1">
                All correction requests must be reviewed and approved by a supervisor before changes are applied. 
                Audit trail is maintained for all modifications.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {mockCorrectionRequests.map((request) => (
          <Card key={request.id} className="card-hover">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    request.status === "pending" 
                      ? "bg-warning/10 text-warning" 
                      : request.status === "approved"
                      ? "bg-success/10 text-success"
                      : "bg-destructive/10 text-destructive"
                  }`}>
                    {getTypeIcon(request.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">{request.id}</span>
                      <Badge variant="secondary" className="text-xs">
                        {getTypeLabel(request.type)}
                      </Badge>
                      {getStatusBadge(request.status)}
                    </div>
                    <p className="font-medium mt-1">{request.childName}</p>
                    <p className="text-xs text-muted-foreground font-mono">{request.tempId}</p>
                    
                    <div className="mt-3 p-3 bg-muted rounded-lg">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Current Value</p>
                          <p className="font-medium">{request.currentValue}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Proposed Value</p>
                          <p className="font-medium text-accent">{request.proposedValue}</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        <strong>Reason:</strong> {request.reason}
                      </p>
                      {request.rejectionReason && (
                        <p className="text-xs text-destructive mt-1">
                          <strong>Rejection Reason:</strong> {request.rejectionReason}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-right text-xs text-muted-foreground">
                  <p>Requested by: {request.requestedBy}</p>
                  <p>{request.requestedAt}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
