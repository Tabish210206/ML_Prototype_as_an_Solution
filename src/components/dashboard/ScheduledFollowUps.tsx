import { Calendar, Clock, CheckCircle2, RotateCcw, MessageSquare, Baby, Syringe, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const mockFollowUps = [
  {
    id: 1,
    type: "immunization",
    title: "Week 6 - Photo Metadata Capture",
    childName: "Baby of Sunita Devi",
    tempId: "TIRN-2024-UP-VNS-00843",
    scheduledDate: "2024-02-26",
    scheduledTime: "10:00 AM",
    status: "upcoming",
    notes: "First immunization visit - capture photo metadata only",
  },
  {
    id: 2,
    type: "verification",
    title: "Address Verification",
    childName: "Arjun Kumar",
    tempId: "TIRN-2024-UP-VNS-00844",
    scheduledDate: "2024-01-20",
    scheduledTime: "11:30 AM",
    status: "today",
    notes: "Parent address verification pending",
  },
  {
    id: 3,
    type: "immunization",
    title: "Week 14 - Photo Quality Check",
    childName: "Lakshmi Sharma",
    tempId: "TIRN-2024-UP-VNS-00846",
    scheduledDate: "2024-04-20",
    scheduledTime: "09:00 AM",
    status: "upcoming",
    notes: "Second photo quality verification",
  },
  {
    id: 4,
    type: "biometric",
    title: "Age 5 - Biometric Eligibility",
    childName: "Rahul Verma",
    tempId: "TIRN-2019-UP-VNS-00123",
    scheduledDate: "2024-03-15",
    scheduledTime: "02:00 PM",
    status: "upcoming",
    notes: "Child now eligible for biometric enrollment",
  },
];

export function ScheduledFollowUps() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "immunization":
        return <Syringe className="w-5 h-5" />;
      case "verification":
        return <MapPin className="w-5 h-5" />;
      case "biometric":
        return <Baby className="w-5 h-5" />;
      default:
        return <Calendar className="w-5 h-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "today":
        return <Badge className="bg-accent text-accent-foreground">Today</Badge>;
      case "upcoming":
        return <Badge variant="secondary">Upcoming</Badge>;
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Scheduled Follow-Ups</h2>
          <p className="text-sm text-muted-foreground">
            Auto-generated reminders for identity lifecycle updates
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            View Calendar
          </Button>
        </div>
      </div>

      {/* Timeline Legend */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Identity Lifecycle Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span>Birth (Demographic)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-info" />
              <span>Week 6: Photo Metadata</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span>Week 14: Quality Check</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span>Month 9: Stability Update</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span>Age 5: Biometric Eligible</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            <strong>Note:</strong> No raw biometrics stored • Metadata only • Confidence score auto-updated
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {mockFollowUps.map((followUp) => (
          <Card key={followUp.id} className="card-hover">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  followUp.status === "today" 
                    ? "bg-accent/10 text-accent" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {getTypeIcon(followUp.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{followUp.title}</h3>
                        {getStatusBadge(followUp.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {followUp.childName}
                        <span className="mx-2">•</span>
                        <span className="font-mono text-xs">{followUp.tempId}</span>
                      </p>
                    </div>
                    
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-4 h-4" />
                        {new Date(followUp.scheduledDate).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Clock className="w-3 h-3" />
                        {followUp.scheduledTime}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-2">{followUp.notes}</p>
                  
                  <div className="flex items-center gap-2 mt-4">
                    <Button size="sm" className="bg-success hover:bg-success/90">
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Mark Completed
                    </Button>
                    <Button size="sm" variant="outline">
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Reschedule
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Add Remarks
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
