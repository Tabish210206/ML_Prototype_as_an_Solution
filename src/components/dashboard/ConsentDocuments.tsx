import { FileCheck, Download, Eye, Clock, CheckCircle2, AlertCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockConsents = [
  {
    id: "TIRN-2024-UP-VNS-00843",
    childName: "Baby of Sunita Devi",
    consentDate: "2024-01-15",
    consentType: "Full",
    purposes: ["Identity Initiation", "Health Linkage", "Notifications"],
    signatureType: "OTP",
    validity: "Active",
    expiryDate: "2039-01-15",
  },
  {
    id: "TIRN-2024-UP-VNS-00844",
    childName: "Arjun Kumar",
    consentDate: "2024-01-14",
    consentType: "Partial",
    purposes: ["Identity Initiation"],
    signatureType: "e-Sign",
    validity: "Active",
    expiryDate: "2039-01-14",
  },
  {
    id: "TIRN-2024-UP-VNS-00845",
    childName: "Baby of Priya Singh",
    consentDate: "2024-01-13",
    consentType: "Full",
    purposes: ["Identity Initiation", "Health Linkage", "Notifications"],
    signatureType: "OTP",
    validity: "Revoked",
    expiryDate: "-",
  },
];

export function ConsentDocuments() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Consent & Documents</h2>
          <p className="text-sm text-muted-foreground">
            DPDP Act 2023 compliant consent management
          </p>
        </div>
      </div>

      {/* Compliance Info */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="border-success/30 bg-success/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium">Purpose-Bound</p>
                <p className="text-xs text-muted-foreground">All consents are limited to stated purposes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-warning/30 bg-warning/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm font-medium">Revocable</p>
                <p className="text-xs text-muted-foreground">Parents can withdraw consent anytime</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-info/30 bg-info/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-info" />
              </div>
              <div>
                <p className="text-sm font-medium">DPDP Compliant</p>
                <p className="text-xs text-muted-foreground">Follows Digital Personal Data Protection Act 2023</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Consent Records Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Consent Records</CardTitle>
          <CardDescription>View and manage consent documentation</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Child / Temp ID</TableHead>
                <TableHead>Consent Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Purposes</TableHead>
                <TableHead>Signature</TableHead>
                <TableHead>Validity</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockConsents.map((consent) => (
                <TableRow key={consent.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{consent.childName}</p>
                      <p className="text-xs text-muted-foreground font-mono">{consent.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(consent.consentDate).toLocaleDateString("en-IN")}
                  </TableCell>
                  <TableCell>
                    <Badge variant={consent.consentType === "Full" ? "default" : "secondary"}>
                      {consent.consentType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {consent.purposes.map((purpose, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {purpose}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{consent.signatureType}</TableCell>
                  <TableCell>
                    {consent.validity === "Active" ? (
                      <Badge className="badge-consent">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Revoked
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
