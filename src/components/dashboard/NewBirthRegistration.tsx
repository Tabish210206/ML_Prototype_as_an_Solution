import { useState } from "react";
import { 
  Calendar, 
  MapPin, 
  FileText, 
  Baby, 
  Users, 
  Shield, 
  Fingerprint,
  CheckCircle2,
  AlertTriangle,
  Phone,
  Mail,
  Home,
  ChevronRight,
  Printer,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Step = 1 | 2 | 3 | 4 | 5;

export function NewBirthRegistration() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    // Birth Event
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "District General Hospital, Varanasi",
    crsNumber: "",
    deliveryType: "",
    // Child Details
    childName: "",
    gender: "",
    // Parent Details
    motherName: "",
    motherAadhaar: "",
    fatherName: "",
    fatherAadhaar: "",
    mobileNumber: "",
    address: "",
    // Consent
    consentIdentity: false,
    consentHealth: false,
    consentNotifications: false,
    consentLanguage: "hindi",
    signatureType: "",
  });

  const steps = [
    { number: 1, title: "Birth Event", icon: Calendar },
    { number: 2, title: "Child Details", icon: Baby },
    { number: 3, title: "Parent/Guardian", icon: Users },
    { number: 4, title: "Consent Capture", icon: Shield },
    { number: 5, title: "Identity Initiation", icon: Fingerprint },
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8 px-4">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = currentStep === step.number;
        const isCompleted = currentStep > step.number;
        
        return (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isCompleted
                    ? "bg-success text-success-foreground"
                    : isActive
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>
              <span
                className={`text-xs mt-2 font-medium ${
                  isActive ? "text-accent" : isCompleted ? "text-success" : "text-muted-foreground"
                }`}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-16 h-0.5 mx-2 ${
                  currentStep > step.number ? "bg-success" : "bg-muted"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );

  const renderStep1 = () => (
    <Card className="animate-slide-in">
      <CardHeader className="form-section-header border-b-0 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-accent" />
          </div>
          <div>
            <CardTitle className="text-lg">Birth Event Details</CardTitle>
            <CardDescription>Auto-filled and semi-automatic capture</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth *</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              className="text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeOfBirth">Time of Birth *</Label>
            <Input
              id="timeOfBirth"
              type="time"
              value={formData.timeOfBirth}
              onChange={(e) => handleInputChange("timeOfBirth", e.target.value)}
              className="text-base"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="placeOfBirth">Place of Birth</Label>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <Input
              id="placeOfBirth"
              value={formData.placeOfBirth}
              disabled
              className="bg-muted text-base"
            />
            <Badge variant="secondary" className="shrink-0">Auto-filled</Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="crsNumber">CRS Birth Registration Number *</Label>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <Input
                id="crsNumber"
                placeholder="Enter CRS Number"
                value={formData.crsNumber}
                onChange={(e) => handleInputChange("crsNumber", e.target.value)}
                className="text-base"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="deliveryType">Delivery Type *</Label>
            <Select
              value={formData.deliveryType}
              onValueChange={(value) => handleInputChange("deliveryType", value)}
            >
              <SelectTrigger className="text-base">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal Delivery</SelectItem>
                <SelectItem value="csection">C-Section</SelectItem>
                <SelectItem value="assisted">Assisted Delivery</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="animate-slide-in">
      <CardHeader className="form-section-header border-b-0 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Baby className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg">Child Demographic Details</CardTitle>
            <CardDescription>Core identity information - editable later</CardDescription>
          </div>
          <Badge className="badge-demographic">
            <Fingerprint className="w-3 h-3 mr-1" />
            Demographic-only | No Biometrics
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="childName">Child Name (can be updated later)</Label>
          <Input
            id="childName"
            placeholder="Enter child's name"
            value={formData.childName}
            onChange={(e) => handleInputChange("childName", e.target.value)}
            className="text-base"
          />
          <p className="text-xs text-muted-foreground">
            Name can be registered within 21 days as per CRS norms
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="gender">Gender *</Label>
            <Select
              value={formData.gender}
              onValueChange={(value) => handleInputChange("gender", value)}
            >
              <SelectTrigger className="text-base">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Date of Birth</Label>
            <Input
              value={formData.dateOfBirth || "As entered in Step 1"}
              disabled
              className="bg-muted text-base"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Place of Birth</Label>
          <Input
            value={formData.placeOfBirth}
            disabled
            className="bg-muted text-base"
          />
          <Badge variant="secondary" className="mt-1">Auto-linked from Birth Event</Badge>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card className="animate-slide-in">
      <CardHeader className="form-section-header border-b-0 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-accent" />
          </div>
          <div>
            <CardTitle className="text-lg">Parent / Guardian Details</CardTitle>
            <CardDescription>Aadhaar linkage optional but recommended</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="motherName">Mother's Name *</Label>
            <Input
              id="motherName"
              placeholder="Enter mother's full name"
              value={formData.motherName}
              onChange={(e) => handleInputChange("motherName", e.target.value)}
              className="text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="motherAadhaar">Mother's Aadhaar Number (Optional)</Label>
            <Input
              id="motherAadhaar"
              placeholder="XXXX XXXX XXXX"
              value={formData.motherAadhaar}
              onChange={(e) => handleInputChange("motherAadhaar", e.target.value)}
              className="text-base"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fatherName">Father's Name *</Label>
            <Input
              id="fatherName"
              placeholder="Enter father's full name"
              value={formData.fatherName}
              onChange={(e) => handleInputChange("fatherName", e.target.value)}
              className="text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fatherAadhaar">Father's Aadhaar Number (Optional)</Label>
            <Input
              id="fatherAadhaar"
              placeholder="XXXX XXXX XXXX"
              value={formData.fatherAadhaar}
              onChange={(e) => handleInputChange("fatherAadhaar", e.target.value)}
              className="text-base"
            />
          </div>
        </div>

        <div className="p-3 bg-warning/5 border border-warning/20 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-warning mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-warning">Duplicate Check Active</p>
              <p className="text-muted-foreground text-xs mt-1">
                System will warn if parent records already exist in the database
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="mobileNumber">Mobile Number (OTP Verified) *</Label>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 flex-1">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <Input
                  id="mobileNumber"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.mobileNumber}
                  onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                  className="text-base"
                />
              </div>
              <Button variant="outline" size="sm">
                Send OTP
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address (CRS-Linked)</Label>
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4 text-muted-foreground" />
              <Input
                id="address"
                placeholder="Auto-populated from CRS"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="text-base"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep4 = () => (
    <Card className="animate-slide-in">
      <CardHeader className="form-section-header border-b-0 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-success" />
          </div>
          <div>
            <CardTitle className="text-lg">Consent Capture</CardTitle>
            <CardDescription>Mandatory - DPDP Act 2023 Compliant</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Consent Language</Label>
          <Select
            value={formData.consentLanguage}
            onValueChange={(value) => handleInputChange("consentLanguage", value)}
          >
            <SelectTrigger className="text-base w-64">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hindi">हिन्दी (Hindi)</SelectItem>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="tamil">தமிழ் (Tamil)</SelectItem>
              <SelectItem value="telugu">తెలుగు (Telugu)</SelectItem>
              <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
              <SelectItem value="bengali">বাংলা (Bengali)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-medium">Digital Consent Checkboxes</p>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 border rounded-lg bg-card">
              <Checkbox
                id="consentIdentity"
                checked={formData.consentIdentity}
                onCheckedChange={(checked) => handleInputChange("consentIdentity", checked as boolean)}
              />
              <div className="flex-1">
                <Label htmlFor="consentIdentity" className="font-medium cursor-pointer">
                  Identity Initiation Consent
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  I consent to the initiation of my child's identity record with demographic details only. 
                  No biometric data will be collected at this stage.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 border rounded-lg bg-card">
              <Checkbox
                id="consentHealth"
                checked={formData.consentHealth}
                onCheckedChange={(checked) => handleInputChange("consentHealth", checked as boolean)}
              />
              <div className="flex-1">
                <Label htmlFor="consentHealth" className="font-medium cursor-pointer">
                  Health & Immunization Linkage
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  I consent to linking this identity record with immunization and health tracking systems.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 border rounded-lg bg-card">
              <Checkbox
                id="consentNotifications"
                checked={formData.consentNotifications}
                onCheckedChange={(checked) => handleInputChange("consentNotifications", checked as boolean)}
              />
              <div className="flex-1">
                <Label htmlFor="consentNotifications" className="font-medium cursor-pointer">
                  Future Update Notifications
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  I consent to receive notifications for scheduled identity updates and verification.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium">Parent Signature</p>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant={formData.signatureType === "esign" ? "default" : "outline"}
              className="h-20 flex flex-col items-center justify-center gap-2"
              onClick={() => handleInputChange("signatureType", "esign")}
            >
              <FileText className="w-6 h-6" />
              <span>e-Sign</span>
            </Button>
            <Button
              variant={formData.signatureType === "otp" ? "default" : "outline"}
              className="h-20 flex flex-col items-center justify-center gap-2"
              onClick={() => handleInputChange("signatureType", "otp")}
            >
              <Phone className="w-6 h-6" />
              <span>OTP-Based Consent</span>
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Badge className="badge-consent">Purpose-bound</Badge>
          <Badge className="badge-pending">Revocable</Badge>
          <Badge className="badge-compliance">DPDP Act Compliant</Badge>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep5 = () => (
    <Card className="animate-slide-in">
      <CardHeader className="form-section-header border-b-0 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
            <Fingerprint className="w-5 h-5 text-success" />
          </div>
          <div>
            <CardTitle className="text-lg">Identity Initiation</CardTitle>
            <CardDescription>Generate Temporary Identity Reference</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-6 bg-success/5 border border-success/20 rounded-lg text-center">
          <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Ready for Identity Initiation</h3>
          <p className="text-sm text-muted-foreground mb-4">
            All required information has been captured. Click below to generate the Temporary Identity Reference Number.
          </p>
          
          <div className="bg-card p-4 rounded-lg border mb-4">
            <p className="text-xs text-muted-foreground mb-1">Temporary Identity Reference Number</p>
            <p className="text-2xl font-mono font-bold text-primary">TIRN-2024-UP-VNS-00847</p>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span>Auto-linked with CRS Birth Certificate</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span>Consent recorded and timestamped</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span>Immunization schedule initialized</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">
            <Printer className="w-4 h-4 mr-2" />
            Print Acknowledgement
          </Button>
          <Button variant="outline" className="flex-1">
            <MessageSquare className="w-4 h-4 mr-2" />
            Send SMS Receipt
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      default:
        return renderStep1();
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {renderStepIndicator()}
      {renderCurrentStep()}
      
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1) as Step)}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        
        {currentStep < 5 ? (
          <Button
            onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1) as Step)}
            className="bg-accent hover:bg-accent/90"
          >
            Continue
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button className="bg-success hover:bg-success/90">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Complete Birth Identity Registration
          </Button>
        )}
      </div>
    </div>
  );
}
