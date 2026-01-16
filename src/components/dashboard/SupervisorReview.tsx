import { 
  BarChart3, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Users, 
  FileSearch, 
  Flag,
  TrendingUp,
  Clock,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const mockStats = {
  todayRegistrations: 24,
  weekRegistrations: 156,
  pendingApprovals: 8,
  errorAlerts: 3,
  duplicateWarnings: 2,
};

const mockAlerts = [
  {
    id: 1,
    type: "duplicate",
    severity: "high",
    title: "Potential Duplicate Record Detected",
    description: "TIRN-2024-UP-VNS-00848 may be a duplicate of TIRN-2024-UP-VNS-00832",
    time: "10 minutes ago",
  },
  {
    id: 2,
    type: "mismatch",
    severity: "medium",
    title: "CRS Data Mismatch",
    description: "Birth date mismatch between CRS and registration for TIRN-2024-UP-VNS-00845",
    time: "1 hour ago",
  },
  {
    id: 3,
    type: "consent",
    severity: "low",
    title: "Consent Expiry Warning",
    description: "5 records have consent validity expiring in next 7 days",
    time: "2 hours ago",
  },
];

const mockPendingApprovals = [
  {
    id: "COR-2024-001",
    type: "Name Correction",
    childName: "Baby of Sunita Devi → Aarav Kumar",
    operator: "OP-12345",
    time: "15 min ago",
  },
  {
    id: "COR-2024-004",
    type: "Address Update",
    childName: "Priya Singh",
    operator: "OP-12346",
    time: "45 min ago",
  },
  {
    id: "COR-2024-005",
    type: "Parent Details",
    childName: "Rahul Verma",
    operator: "OP-12347",
    time: "2 hours ago",
  },
];

export function SupervisorReview() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-destructive bg-destructive/10";
      case "medium":
        return "text-warning bg-warning/10";
      case "low":
        return "text-info bg-info/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Supervisor Review Panel</h2>
          <p className="text-sm text-muted-foreground">
            Daily summary, approvals, and audit controls
          </p>
        </div>
        <Button variant="outline">
          <FileSearch className="w-4 h-4 mr-2" />
          View Audit Trail
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Today's Registrations</p>
                <p className="text-2xl font-bold mt-1">{mockStats.todayRegistrations}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold mt-1">{mockStats.weekRegistrations}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Pending Approvals</p>
                <p className="text-2xl font-bold mt-1">{mockStats.pendingApprovals}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Error Alerts</p>
                <p className="text-2xl font-bold mt-1">{mockStats.errorAlerts}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Duplicate Warnings</p>
                <p className="text-2xl font-bold mt-1">{mockStats.duplicateWarnings}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Alerts Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Active Alerts
            </CardTitle>
            <CardDescription>Issues requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockAlerts.map((alert) => (
              <div key={alert.id} className="p-3 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getSeverityColor(alert.severity)}`}>
                      {alert.type === "duplicate" ? (
                        <Users className="w-4 h-4" />
                      ) : alert.type === "mismatch" ? (
                        <AlertTriangle className="w-4 h-4" />
                      ) : (
                        <Shield className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{alert.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                    </div>
                  </div>
                  <Badge variant={alert.severity === "high" ? "destructive" : "secondary"} className="shrink-0">
                    {alert.severity}
                  </Badge>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Investigate</Button>
                    <Button size="sm" variant="ghost">Dismiss</Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-warning" />
              Pending Approvals
            </CardTitle>
            <CardDescription>Correction requests awaiting review</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockPendingApprovals.map((approval) => (
              <div key={approval.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-muted-foreground">{approval.id}</span>
                  <Badge variant="secondary">{approval.type}</Badge>
                </div>
                <p className="font-medium text-sm">{approval.childName}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-muted-foreground">
                    By {approval.operator} • {approval.time}
                  </span>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-success hover:bg-success/90">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive">
                      <XCircle className="w-3 h-3 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Daily Progress */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Daily Registration Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Completed Registrations</span>
                <span className="font-medium">24 / 30 target</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Consent Capture Rate</span>
                <span className="font-medium">96%</span>
              </div>
              <Progress value={96} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>CRS Sync Success</span>
                <span className="font-medium">98%</span>
              </div>
              <Progress value={98} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
