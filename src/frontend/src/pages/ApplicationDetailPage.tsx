import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Edit2,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  Loader2,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { PortalCredential } from "../backend";
import { BillsSection } from "../components/BillsSection";
import { PharmacistDetailsSection } from "../components/PharmacistDetailsSection";
import { PlanLayoutModal } from "../components/PlanLayoutModal";
import { StatusBadge } from "../components/StatusBadge";
import { useBackend } from "../hooks/useBackend";
import type {
  Application,
  ApplicationPharmacist,
  CompanyInfo,
  FdaOfficeDetails,
  PharmacistDetails,
  PlanLayoutDetails,
  UpdateApplicationInput,
} from "../types";
import { ApplicationStatus, ServiceType } from "../types";
import {
  formatCurrency,
  formatDate,
  formatDateTime,
  getServiceTypeLabel,
} from "../utils";
import {
  FORM_TYPES,
  type PlanLayoutPrintData,
  printForm,
} from "../utils/formTemplates";

const STATUS_OPTIONS = Object.values(ApplicationStatus);
const SERVICE_OPTIONS = Object.values(ServiceType);

function dateNsToInput(ns?: bigint | null): string {
  if (!ns) return "";
  return new Date(Number(ns / 1_000_000n)).toISOString().split("T")[0];
}
function inputToNs(val: string): bigint | undefined {
  if (!val) return undefined;
  return BigInt(new Date(val).getTime()) * 1_000_000n;
}

interface EditForm {
  firmId: string;
  businessName: string;
  proprietorName: string;
  firmAddress: string;
  mobileNumber: string;
  email: string;
  businessType: string;
  serviceType: ServiceType;
  status: ApplicationStatus;
  applicationDate: string;
  expectedCompletionDate: string;
  renewalDate: string;
  totalFees: string;
  amountCollected: string;
  // Change of Premise
  changePremiseOldAddress: string;
  changePremiseNewAddress: string;
  // Alteration of Premise
  alterationOldArea: string;
  alterationProposedArea: string;
  // FDA Covering Letter address
  fdaAddress: string;
  // Old Pharmacist Resignation (for Add Pharmacist)
  resignOldPharmacist: boolean;
  oldPharmacistName: string;
  oldPharmacistRegNo: string;
  oldPharmacistResignationDate: string;
}

function buildEditForm(app: Application, fallbackFdaAddress = ""): EditForm {
  return {
    firmId: app.firmId,
    businessName: app.businessName,
    proprietorName: app.proprietorName,
    firmAddress: app.firmAddress,
    mobileNumber: app.mobileNumber,
    email: app.email,
    businessType: app.businessType,
    serviceType: app.serviceType,
    status: app.status,
    applicationDate: dateNsToInput(app.applicationDate),
    expectedCompletionDate: dateNsToInput(app.expectedCompletionDate),
    renewalDate: dateNsToInput(app.renewalDate),
    totalFees: String(app.totalFees),
    amountCollected: String(app.amountCollected),
    changePremiseOldAddress: app.changePremiseOldAddress ?? "",
    changePremiseNewAddress: app.changePremiseNewAddress ?? "",
    alterationOldArea:
      app.alterationOldArea != null ? String(app.alterationOldArea) : "",
    alterationProposedArea:
      app.alterationProposedArea != null
        ? String(app.alterationProposedArea)
        : "",
    fdaAddress: app.fdaAddress || fallbackFdaAddress,
    resignOldPharmacist: app.resignOldPharmacist ?? false,
    oldPharmacistName: app.oldPharmacistName ?? "",
    oldPharmacistRegNo: app.oldPharmacistRegNo ?? "",
    oldPharmacistResignationDate: app.oldPharmacistResignationDate ?? "",
  };
}

export default function ApplicationDetailPage() {
  const { id } = useParams({ from: "/applications/$id" });
  const navigate = useNavigate();
  const qc = useQueryClient();
  const {
    getApplication,
    updateApplication,
    deleteApplication,
    addNote,
    getCompanyInfo,
    getPharmacistDetails,
    getFdaOfficeDetails,
    getApplicationPharmacists,
    setApplicationPlanLayout,
    addPortalCredential,
    updatePortalCredential,
    removePortalCredential,
  } = useBackend();

  const { data: app, isLoading } = useQuery<Application | null>({
    queryKey: ["application", id],
    queryFn: () => getApplication(BigInt(id)),
    refetchInterval: 60_000,
  });

  const { data: companyInfo } = useQuery<CompanyInfo>({
    queryKey: ["companyInfo"],
    queryFn: getCompanyInfo,
  });

  const { data: pharmacistDetails } = useQuery<PharmacistDetails | null>({
    queryKey: ["pharmacistDetails"],
    queryFn: getPharmacistDetails,
  });

  const { data: fdaOfficeDetails } = useQuery<FdaOfficeDetails | null>({
    queryKey: ["fdaOfficeDetails"],
    queryFn: getFdaOfficeDetails,
  });

  // Per-application pharmacists — with safe Array guard
  const { data: appPharmacistsResult } = useQuery({
    queryKey: ["appPharmacists", id],
    queryFn: () => getApplicationPharmacists(BigInt(id)),
  });
  const appPharmacists: ApplicationPharmacist[] = (() => {
    if (!appPharmacistsResult) return [];
    if (appPharmacistsResult.__kind__ === "ok") {
      const raw = appPharmacistsResult.ok;
      return Array.isArray(raw) ? raw : [];
    }
    return [];
  })();

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<EditForm | null>(null);
  const [noteText, setNoteText] = useState("");
  const [showForms, setShowForms] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);

  // Inline Firm ID edit
  const [editingFirmId, setEditingFirmId] = useState(false);
  const [firmIdDraft, setFirmIdDraft] = useState("");
  // Inline Portal Password edit
  const [editingPassword, setEditingPassword] = useState(false);
  const [passwordDraft, setPasswordDraft] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordDisplay, setShowPasswordDisplay] = useState(false);
  // Inline Direct Link edit
  const [editingDirectLink, setEditingDirectLink] = useState(false);
  const [directLinkDraft, setDirectLinkDraft] = useState("");

  // Portal Credentials modal state
  const PORTAL_NAMES = [
    "FDA",
    "FSSAI",
    "GST",
    "Udyam",
    "MCA",
    "Shops",
    "Custom",
  ] as const;
  const [showCredModal, setShowCredModal] = useState(false);
  const [credModalMode, setCredModalMode] = useState<"add" | "edit">("add");
  const [credDraft, setCredDraft] = useState<PortalCredential>({
    id: "",
    portalName: "FDA",
    userId: "",
    password: "",
    directLink: "",
  });
  const [credShowPassword, setCredShowPassword] = useState(false);
  const [credDeleteId, setCredDeleteId] = useState<string | null>(null);
  const [credPasswordVisible, setCredPasswordVisible] = useState<
    Record<string, boolean>
  >({});

  const savePlanLayout = useMutation({
    mutationFn: (details: PlanLayoutDetails) =>
      setApplicationPlanLayout(BigInt(id), details),
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        toast.error(res.err);
        return;
      }
      qc.setQueryData(["application", id], res.ok);
      qc.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: () => toast.error("Failed to save plan layout"),
  });

  const updateMutation = useMutation({
    mutationFn: (input: UpdateApplicationInput) => updateApplication(input),
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        toast.error(res.err);
        return;
      }
      toast.success("Application updated");
      qc.setQueryData(["application", id], res.ok);
      qc.invalidateQueries({ queryKey: ["applications"] });
      setIsEditing(false);
    },
    onError: () => toast.error("Update failed"),
  });

  const firmIdMutation = useMutation({
    mutationFn: (newFirmId: string) =>
      updateApplication({ id: BigInt(id), firmId: newFirmId }),
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        toast.error(res.err);
        return;
      }
      toast.success("Firm ID updated");
      qc.setQueryData(["application", id], res.ok);
      qc.invalidateQueries({ queryKey: ["applications"] });
      setEditingFirmId(false);
    },
    onError: () => toast.error("Failed to update Firm ID"),
  });

  const firmPasswordMutation = useMutation({
    mutationFn: (newPassword: string) =>
      updateApplication({ id: BigInt(id), firmPassword: newPassword }),
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        toast.error(res.err);
        return;
      }
      toast.success("Portal password updated");
      qc.setQueryData(["application", id], res.ok);
      qc.invalidateQueries({ queryKey: ["applications"] });
      setEditingPassword(false);
      setPasswordDraft("");
    },
    onError: () => toast.error("Failed to update portal password"),
  });

  const directLinkMutation = useMutation({
    mutationFn: (newLink: string) =>
      updateApplication({ id: BigInt(id), directLink: newLink }),
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        toast.error(res.err);
        return;
      }
      toast.success("Portal link updated");
      qc.setQueryData(["application", id], res.ok);
      qc.invalidateQueries({ queryKey: ["applications"] });
      setEditingDirectLink(false);
      setDirectLinkDraft("");
    },
    onError: () => toast.error("Failed to update portal link"),
  });

  const completeMutation = useMutation({
    mutationFn: () =>
      updateApplication({
        id: BigInt(id),
        status: ApplicationStatus.Completed,
      }),
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        toast.error(res.err);
        return;
      }
      toast.success("Application marked as Completed");
      qc.setQueryData(["application", id], res.ok);
      qc.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: () => toast.error("Failed to mark as Completed"),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteApplication(BigInt(id)),
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        toast.error(res.err);
        return;
      }
      toast.success("Application deleted");
      qc.invalidateQueries({ queryKey: ["applications"] });
      navigate({ to: "/applications" });
    },
    onError: () => toast.error("Delete failed"),
  });

  const noteMutation = useMutation({
    mutationFn: (text: string) => addNote(BigInt(id), text),
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        toast.error(res.err);
        return;
      }
      qc.setQueryData(["application", id], res.ok);
      setNoteText("");
      toast.success("Note added");
    },
  });

  // Portal Credential mutations
  const addCredMutation = useMutation({
    mutationFn: (cred: PortalCredential) =>
      addPortalCredential(BigInt(id), cred),
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        toast.error(res.err);
        return;
      }
      qc.setQueryData(["application", id], res.ok);
      setShowCredModal(false);
      toast.success("Credential added");
    },
    onError: () => toast.error("Failed to add credential"),
  });

  const updateCredMutation = useMutation({
    mutationFn: ({
      credId,
      cred,
    }: { credId: string; cred: PortalCredential }) =>
      updatePortalCredential(BigInt(id), credId, cred),
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        toast.error(res.err);
        return;
      }
      qc.setQueryData(["application", id], res.ok);
      setShowCredModal(false);
      toast.success("Credential updated");
    },
    onError: () => toast.error("Failed to update credential"),
  });

  const removeCredMutation = useMutation({
    mutationFn: (credId: string) => removePortalCredential(BigInt(id), credId),
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        toast.error(res.err);
        return;
      }
      qc.setQueryData(["application", id], res.ok);
      setCredDeleteId(null);
      toast.success("Credential removed");
    },
    onError: () => toast.error("Failed to remove credential"),
  });

  function startEdit() {
    if (!app) return;
    const fallbackFda = companyInfo?.fdaAddress ?? "";
    setEditForm(buildEditForm(app, fallbackFda));
    setIsEditing(true);
  }

  function cancelEdit() {
    setIsEditing(false);
    setEditForm(null);
  }

  function saveEdit() {
    if (!editForm) return;
    const isChangePremise =
      editForm.serviceType === ServiceType.DrugLicenceChangePremise;
    const isAlteration =
      editForm.serviceType === ServiceType.DrugLicenceAlterationOfPremise;
    const isAddPharmacist =
      editForm.serviceType === ServiceType.DrugLicenceAddPharmacist;
    const input: UpdateApplicationInput = {
      id: BigInt(id),
      firmId: editForm.firmId,
      businessName: editForm.businessName,
      proprietorName: editForm.proprietorName,
      firmAddress: editForm.firmAddress,
      mobileNumber: editForm.mobileNumber,
      email: editForm.email,
      businessType: editForm.businessType,
      serviceType: editForm.serviceType,
      status: editForm.status,
      applicationDate: inputToNs(editForm.applicationDate),
      expectedCompletionDate: inputToNs(editForm.expectedCompletionDate),
      renewalDate: inputToNs(editForm.renewalDate),
      totalFees: BigInt(Math.round(Number(editForm.totalFees) || 0)),
      amountCollected: BigInt(
        Math.round(Number(editForm.amountCollected) || 0),
      ),
      fdaAddress: editForm.fdaAddress,
      ...(isChangePremise && {
        changePremiseOldAddress: editForm.changePremiseOldAddress,
        changePremiseNewAddress: editForm.changePremiseNewAddress,
      }),
      ...(isAlteration && {
        alterationOldArea: editForm.alterationOldArea
          ? Number(editForm.alterationOldArea)
          : undefined,
        alterationProposedArea: editForm.alterationProposedArea
          ? Number(editForm.alterationProposedArea)
          : undefined,
      }),
      ...(isAddPharmacist && {
        resignOldPharmacist: editForm.resignOldPharmacist,
        oldPharmacistName: editForm.oldPharmacistName,
        oldPharmacistRegNo: editForm.oldPharmacistRegNo,
        oldPharmacistResignationDate: editForm.oldPharmacistResignationDate,
      }),
    };
    updateMutation.mutate(input);
  }

  function setEF<K extends keyof EditForm>(k: K, v: EditForm[K]) {
    setEditForm((f) => (f ? { ...f, [k]: v } : f));
  }

  if (isLoading) {
    return (
      <div className="space-y-4" data-ocid="application_detail.loading_state">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-48 w-full rounded-lg" />
        <Skeleton className="h-48 w-full rounded-lg" />
      </div>
    );
  }

  if (!app) {
    return (
      <div
        className="flex flex-col items-center justify-center py-24"
        data-ocid="application_detail.error_state"
      >
        <FileText className="w-12 h-12 text-muted-foreground mb-4" />
        <p className="text-lg font-semibold">Application not found</p>
        <Button
          variant="link"
          onClick={() => navigate({ to: "/applications" })}
        >
          Back to Applications
        </Button>
      </div>
    );
  }

  const amountPending = app.totalFees - app.amountCollected;
  const sortedNotes = [...app.notes].sort((a, b) =>
    Number(b.createdAt - a.createdAt),
  );

  const BASIC_FIELDS: Array<[string, keyof EditForm]> = [
    ["Firm ID", "firmId"],
    ["Business Name", "businessName"],
    ["Proprietor Name", "proprietorName"],
    ["Mobile Number", "mobileNumber"],
    ["Email", "email"],
    ["Business Type", "businessType"],
  ];

  const DATE_FIELDS: Array<[string, keyof EditForm]> = [
    ["Application Date", "applicationDate"],
    ["Expected Completion", "expectedCompletionDate"],
    ["Renewal Date", "renewalDate"],
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-5 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            data-ocid="application_detail.back_button"
            onClick={() => navigate({ to: "/applications" })}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-display font-bold font-mono">
                {app.applicationId}
              </h1>
              <StatusBadge status={app.status} />
            </div>
            <p className="text-sm text-muted-foreground">{app.businessName}</p>
          </div>
        </div>
        <div className="flex gap-2 ml-11 sm:ml-0">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                size="sm"
                data-ocid="application_detail.cancel_button"
                onClick={cancelEdit}
              >
                <X className="w-3.5 h-3.5 mr-1.5" />
                Cancel
              </Button>
              <Button
                size="sm"
                data-ocid="application_detail.save_button"
                onClick={saveEdit}
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? (
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                ) : (
                  <Save className="w-3.5 h-3.5 mr-1.5" />
                )}
                Save
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                data-ocid="application_detail.edit_button"
                onClick={startEdit}
              >
                <Edit2 className="w-3.5 h-3.5 mr-1.5" />
                Edit
              </Button>
              {/* Mark as Completed — hidden once already Completed */}
              {app.status !== ApplicationStatus.Completed && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      data-ocid="application_detail.complete_button"
                      className="bg-sky-500 hover:bg-sky-600 text-white border-0"
                      disabled={completeMutation.isPending}
                    >
                      {completeMutation.isPending ? (
                        <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                      )}
                      Mark as Completed
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent data-ocid="application_detail.complete_dialog">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Mark Application as Completed?
                      </AlertDialogTitle>
                      <AlertDialogDescription asChild>
                        <div className="space-y-3">
                          <p>
                            This will mark the application as{" "}
                            <strong>Completed</strong>. This action indicates
                            all work for this application is done.
                          </p>
                          <div className="rounded-lg bg-muted/40 border border-border px-4 py-3 text-sm space-y-1">
                            <div>
                              <span className="text-muted-foreground">
                                Firm ID:{" "}
                              </span>
                              <span className="font-semibold text-foreground">
                                {app.firmId || app.applicationId}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Service Type:{" "}
                              </span>
                              <span className="font-semibold text-foreground">
                                {getServiceTypeLabel(app.serviceType)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel data-ocid="application_detail.complete_cancel_button">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        data-ocid="application_detail.complete_confirm_button"
                        className="bg-sky-500 hover:bg-sky-600 text-white"
                        onClick={() => completeMutation.mutate()}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-1.5" />
                        Mark as Completed
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    data-ocid="application_detail.delete_button"
                    className="text-destructive border-destructive/30 hover:bg-destructive/5"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent data-ocid="application_detail.dialog">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Application?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete{" "}
                      <strong>{app.applicationId}</strong> ({app.businessName}).
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel data-ocid="application_detail.cancel_button">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      data-ocid="application_detail.confirm_button"
                      onClick={() => deleteMutation.mutate()}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {deleteMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Delete"
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <section className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          Basic Information
        </h2>
        {isEditing && editForm ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BASIC_FIELDS.map(([label, field]) => (
              <div key={field} className="space-y-1.5">
                <Label htmlFor={`edit-${field}`}>{label}</Label>
                <Input
                  id={`edit-${field}`}
                  data-ocid={`application_detail.${field}.input`}
                  value={editForm[field] as string}
                  onChange={(e) => setEF(field, e.target.value)}
                />
              </div>
            ))}
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="edit-firmAddress">Firm Address</Label>
              <Input
                id="edit-firmAddress"
                data-ocid="application_detail.firmAddress.input"
                value={editForm.firmAddress}
                onChange={(e) => setEF("firmAddress", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-serviceType">Service Type</Label>
              <Select
                value={editForm.serviceType}
                onValueChange={(v) => setEF("serviceType", v as ServiceType)}
              >
                <SelectTrigger
                  id="edit-serviceType"
                  data-ocid="application_detail.serviceType.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {getServiceTypeLabel(s)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={editForm.status}
                onValueChange={(v) => setEF("status", v as ApplicationStatus)}
              >
                <SelectTrigger
                  id="edit-status"
                  data-ocid="application_detail.status.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s.replace(/([A-Z])/g, " $1").trim()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {DATE_FIELDS.map(([label, field]) => (
              <div key={field} className="space-y-1.5">
                <Label htmlFor={`edit-${field}`}>{label}</Label>
                <Input
                  id={`edit-${field}`}
                  type="date"
                  data-ocid={`application_detail.${field}.input`}
                  value={editForm[field] as string}
                  onChange={(e) => setEF(field, e.target.value)}
                />
              </div>
            ))}

            {/* Change of Premise — Old/New Address */}
            {editForm.serviceType === ServiceType.DrugLicenceChangePremise && (
              <>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="edit-changePremiseOldAddress">
                    Old Premises Address
                  </Label>
                  <Textarea
                    id="edit-changePremiseOldAddress"
                    data-ocid="application_detail.change_premise_old_address.input"
                    value={editForm.changePremiseOldAddress}
                    onChange={(e) =>
                      setEF("changePremiseOldAddress", e.target.value)
                    }
                    placeholder="Enter old/previous premises address"
                    className="min-h-[72px] resize-none"
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="edit-changePremiseNewAddress">
                    New Premises Address
                  </Label>
                  <Textarea
                    id="edit-changePremiseNewAddress"
                    data-ocid="application_detail.change_premise_new_address.input"
                    value={editForm.changePremiseNewAddress}
                    onChange={(e) =>
                      setEF("changePremiseNewAddress", e.target.value)
                    }
                    placeholder="Enter new/proposed premises address"
                    className="min-h-[72px] resize-none"
                  />
                </div>
              </>
            )}

            {/* Alteration of Premise — Old Area / Proposed Area */}
            {editForm.serviceType ===
              ServiceType.DrugLicenceAlterationOfPremise && (
              <>
                <div className="space-y-1.5">
                  <Label htmlFor="edit-alterationOldArea">
                    Old Area of Firm (Sq. Ft.)
                  </Label>
                  <Input
                    id="edit-alterationOldArea"
                    data-ocid="application_detail.alteration_old_area.input"
                    type="number"
                    min="0"
                    value={editForm.alterationOldArea}
                    onChange={(e) => setEF("alterationOldArea", e.target.value)}
                    placeholder="e.g. 150"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="edit-alterationProposedArea">
                    Proposed Area After Alteration (Sq. Ft.)
                  </Label>
                  <Input
                    id="edit-alterationProposedArea"
                    data-ocid="application_detail.alteration_proposed_area.input"
                    type="number"
                    min="0"
                    value={editForm.alterationProposedArea}
                    onChange={(e) =>
                      setEF("alterationProposedArea", e.target.value)
                    }
                    placeholder="e.g. 200"
                  />
                </div>
              </>
            )}

            {/* FDA Covering Letter Address */}
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="edit-fdaAddress">
                Covering Letter — FDA Address
              </Label>
              <Textarea
                id="edit-fdaAddress"
                data-ocid="application_detail.fda_address.input"
                value={editForm.fdaAddress}
                onChange={(e) => setEF("fdaAddress", e.target.value)}
                placeholder="Assistant Commissioner, Food & Drug Administration (Drug) Buldhana (MH)"
                className="min-h-[72px] resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Used when generating the FDA Covering Letter for this
                application
              </p>
            </div>

            {/* Add Pharmacist — Resign Old Pharmacist toggle */}
            {editForm.serviceType === ServiceType.DrugLicenceAddPharmacist && (
              <div className="sm:col-span-2 space-y-3 border border-border rounded-lg p-4 bg-muted/10">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="edit-resignOldPharmacist"
                    data-ocid="application_detail.resign_old_pharmacist.checkbox"
                    checked={editForm.resignOldPharmacist}
                    onCheckedChange={(v) => setEF("resignOldPharmacist", !!v)}
                  />
                  <Label
                    htmlFor="edit-resignOldPharmacist"
                    className="font-medium cursor-pointer"
                  >
                    Also Resign Old Pharmacist?
                  </Label>
                </div>
                {editForm.resignOldPharmacist && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border">
                    <p className="sm:col-span-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Resignation of Old Pharmacist
                    </p>
                    <div className="space-y-1.5">
                      <Label htmlFor="edit-oldPharmacistName">
                        Old Pharmacist Name
                      </Label>
                      <Input
                        id="edit-oldPharmacistName"
                        data-ocid="application_detail.old_pharmacist_name.input"
                        value={editForm.oldPharmacistName}
                        onChange={(e) =>
                          setEF("oldPharmacistName", e.target.value)
                        }
                        placeholder="Full name of old pharmacist"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="edit-oldPharmacistRegNo">
                        Old Pharmacist Registration No.
                      </Label>
                      <Input
                        id="edit-oldPharmacistRegNo"
                        data-ocid="application_detail.old_pharmacist_reg_no.input"
                        value={editForm.oldPharmacistRegNo}
                        onChange={(e) =>
                          setEF("oldPharmacistRegNo", e.target.value)
                        }
                        placeholder="e.g. MH-12345"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="edit-oldPharmacistResignationDate">
                        Date of Resignation
                      </Label>
                      <Input
                        id="edit-oldPharmacistResignationDate"
                        type="date"
                        data-ocid="application_detail.old_pharmacist_resignation_date.input"
                        value={editForm.oldPharmacistResignationDate}
                        onChange={(e) =>
                          setEF("oldPharmacistResignationDate", e.target.value)
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
            {[
              ["Application ID", app.applicationId],
              ["Business Name", app.businessName],
              ["Proprietor", app.proprietorName],
              ["Mobile", app.mobileNumber],
              ["Email", app.email || "—"],
              ["Business Type", app.businessType],
              ["Service Type", getServiceTypeLabel(app.serviceType)],
              ["Application Date", formatDate(app.applicationDate)],
              [
                "Expected Completion",
                formatDate(app.expectedCompletionDate) || "—",
              ],
              ["Renewal Date", formatDate(app.renewalDate) || "—"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd className="text-sm font-medium text-foreground mt-0.5 break-words">
                  {value}
                </dd>
              </div>
            ))}
            {/* Firm ID — inline editable */}
            <div>
              <dt className="text-xs text-muted-foreground">Firm ID</dt>
              <dd className="mt-0.5">
                {editingFirmId ? (
                  <div className="flex items-center gap-1.5">
                    <Input
                      className="h-7 text-sm py-0 px-2"
                      data-ocid="application_detail.firm_id_inline.input"
                      value={firmIdDraft}
                      onChange={(e) => setFirmIdDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && firmIdDraft.trim()) {
                          firmIdMutation.mutate(firmIdDraft.trim());
                        } else if (e.key === "Escape") {
                          setEditingFirmId(false);
                        }
                      }}
                      autoFocus
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-primary"
                      data-ocid="application_detail.firm_id_save.button"
                      disabled={!firmIdDraft.trim() || firmIdMutation.isPending}
                      onClick={() => {
                        if (firmIdDraft.trim())
                          firmIdMutation.mutate(firmIdDraft.trim());
                      }}
                      aria-label="Save Firm ID"
                    >
                      {firmIdMutation.isPending ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Check className="w-3.5 h-3.5" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground"
                      data-ocid="application_detail.firm_id_cancel.button"
                      onClick={() => setEditingFirmId(false)}
                      aria-label="Cancel Firm ID edit"
                    >
                      <X className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 group">
                    <span className="text-sm font-medium text-foreground break-words">
                      {app.firmId || "—"}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      data-ocid="application_detail.firm_id_edit.button"
                      onClick={() => {
                        setFirmIdDraft(app.firmId);
                        setEditingFirmId(true);
                      }}
                      aria-label="Edit Firm ID"
                    >
                      <Pencil className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </dd>
            </div>

            {/* Portal Password — inline editable */}
            <div>
              <dt className="text-xs text-muted-foreground">Portal Password</dt>
              <dd className="mt-0.5">
                {editingPassword ? (
                  <div className="flex items-center gap-1.5">
                    <div className="relative flex items-center">
                      <Input
                        className="h-7 text-sm py-0 px-2 pr-7"
                        type={showPassword ? "text" : "password"}
                        data-ocid="application_detail.firm_password.input"
                        value={passwordDraft}
                        onChange={(e) => setPasswordDraft(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter")
                            firmPasswordMutation.mutate(passwordDraft);
                          else if (e.key === "Escape")
                            setEditingPassword(false);
                        }}
                        autoFocus
                      />
                      <button
                        type="button"
                        aria-label="Toggle password visibility"
                        className="absolute right-1.5 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword((v) => !v)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-3.5 h-3.5" />
                        ) : (
                          <Eye className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-primary"
                      data-ocid="application_detail.firm_password_save.button"
                      disabled={firmPasswordMutation.isPending}
                      onClick={() => firmPasswordMutation.mutate(passwordDraft)}
                      aria-label="Save portal password"
                    >
                      {firmPasswordMutation.isPending ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Check className="w-3.5 h-3.5" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground"
                      data-ocid="application_detail.firm_password_cancel.button"
                      onClick={() => setEditingPassword(false)}
                      aria-label="Cancel password edit"
                    >
                      <X className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 group">
                    <span className="text-sm font-medium text-foreground">
                      {app.firmPassword?.[0] ? (
                        showPasswordDisplay ? (
                          app.firmPassword[0]
                        ) : (
                          "••••••••"
                        )
                      ) : (
                        <span className="text-muted-foreground">Not set</span>
                      )}
                    </span>
                    {app.firmPassword?.[0] && (
                      <button
                        type="button"
                        aria-label="Toggle show/hide password"
                        className="text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPasswordDisplay((v) => !v)}
                      >
                        {showPasswordDisplay ? (
                          <EyeOff className="w-3.5 h-3.5" />
                        ) : (
                          <Eye className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      data-ocid="application_detail.firm_password_edit.button"
                      onClick={() => {
                        setPasswordDraft(app.firmPassword?.[0] ?? "");
                        setShowPassword(false);
                        setEditingPassword(true);
                      }}
                      aria-label="Edit portal password"
                    >
                      <Pencil className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </dd>
            </div>

            {/* Direct Link — inline editable */}
            <div>
              <dt className="text-xs text-muted-foreground">Portal Link</dt>
              <dd className="mt-0.5">
                {editingDirectLink ? (
                  <div className="flex items-center gap-1.5">
                    <Input
                      className="h-7 text-sm py-0 px-2"
                      type="url"
                      data-ocid="application_detail.direct_link.input"
                      value={directLinkDraft}
                      onChange={(e) => setDirectLinkDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter")
                          directLinkMutation.mutate(directLinkDraft.trim());
                        else if (e.key === "Escape")
                          setEditingDirectLink(false);
                      }}
                      autoFocus
                      placeholder="https://..."
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-primary"
                      data-ocid="application_detail.direct_link_save.button"
                      disabled={directLinkMutation.isPending}
                      onClick={() =>
                        directLinkMutation.mutate(directLinkDraft.trim())
                      }
                      aria-label="Save portal link"
                    >
                      {directLinkMutation.isPending ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Check className="w-3.5 h-3.5" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground"
                      data-ocid="application_detail.direct_link_cancel.button"
                      onClick={() => setEditingDirectLink(false)}
                      aria-label="Cancel link edit"
                    >
                      <X className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 group">
                    {app.directLink?.[0] ? (
                      <a
                        href={app.directLink[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary hover:underline flex items-center gap-1 break-all"
                        data-ocid="application_detail.direct_link.link"
                      >
                        {app.directLink[0]}
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Not set
                      </span>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      data-ocid="application_detail.direct_link_edit.button"
                      onClick={() => {
                        setDirectLinkDraft(app.directLink?.[0] ?? "");
                        setEditingDirectLink(true);
                      }}
                      aria-label="Edit portal link"
                    >
                      <Pencil className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </dd>
            </div>

            <div className="sm:col-span-2">
              <dt className="text-xs text-muted-foreground">Address</dt>
              <dd className="text-sm font-medium text-foreground mt-0.5 break-words">
                {app.firmAddress}
              </dd>
            </div>

            {/* Change of Premise — display old/new address */}
            {app.serviceType === ServiceType.DrugLicenceChangePremise &&
              (app.changePremiseOldAddress || app.changePremiseNewAddress) && (
                <>
                  {app.changePremiseOldAddress && (
                    <div className="sm:col-span-2">
                      <dt className="text-xs text-muted-foreground">
                        Old Premises Address
                      </dt>
                      <dd className="text-sm font-medium text-foreground mt-0.5 break-words">
                        {app.changePremiseOldAddress}
                      </dd>
                    </div>
                  )}
                  {app.changePremiseNewAddress && (
                    <div className="sm:col-span-2">
                      <dt className="text-xs text-muted-foreground">
                        New Premises Address
                      </dt>
                      <dd className="text-sm font-medium text-foreground mt-0.5 break-words">
                        {app.changePremiseNewAddress}
                      </dd>
                    </div>
                  )}
                </>
              )}

            {/* Alteration of Premise — display old/proposed area */}
            {app.serviceType === ServiceType.DrugLicenceAlterationOfPremise &&
              (app.alterationOldArea != null ||
                app.alterationProposedArea != null) && (
                <>
                  {app.alterationOldArea != null && (
                    <div>
                      <dt className="text-xs text-muted-foreground">
                        Old Area of Firm
                      </dt>
                      <dd className="text-sm font-medium text-foreground mt-0.5">
                        {app.alterationOldArea} Sq. Ft.
                      </dd>
                    </div>
                  )}
                  {app.alterationProposedArea != null && (
                    <div>
                      <dt className="text-xs text-muted-foreground">
                        Proposed Area After Alteration
                      </dt>
                      <dd className="text-sm font-medium text-foreground mt-0.5">
                        {app.alterationProposedArea} Sq. Ft.
                      </dd>
                    </div>
                  )}
                </>
              )}

            {/* FDA Covering Letter Address */}
            {app.fdaAddress && (
              <div className="sm:col-span-2">
                <dt className="text-xs text-muted-foreground">
                  Covering Letter — FDA Address
                </dt>
                <dd className="text-sm font-medium text-foreground mt-0.5 break-words whitespace-pre-wrap">
                  {app.fdaAddress}
                </dd>
              </div>
            )}

            {/* Old Pharmacist Resignation — display */}
            {app.serviceType === ServiceType.DrugLicenceAddPharmacist &&
              app.resignOldPharmacist && (
                <>
                  <div className="sm:col-span-3 mt-1">
                    <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Old Pharmacist Resignation
                    </dt>
                  </div>
                  {app.oldPharmacistName && (
                    <div>
                      <dt className="text-xs text-muted-foreground">
                        Old Pharmacist Name
                      </dt>
                      <dd className="text-sm font-medium text-foreground mt-0.5">
                        {app.oldPharmacistName}
                      </dd>
                    </div>
                  )}
                  {app.oldPharmacistRegNo && (
                    <div>
                      <dt className="text-xs text-muted-foreground">
                        Old Pharmacist Reg. No.
                      </dt>
                      <dd className="text-sm font-medium text-foreground mt-0.5">
                        {app.oldPharmacistRegNo}
                      </dd>
                    </div>
                  )}
                  {app.oldPharmacistResignationDate && (
                    <div>
                      <dt className="text-xs text-muted-foreground">
                        Date of Resignation
                      </dt>
                      <dd className="text-sm font-medium text-foreground mt-0.5">
                        {app.oldPharmacistResignationDate}
                      </dd>
                    </div>
                  )}
                </>
              )}
          </dl>
        )}
      </section>

      {/* Fees */}
      <section className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          Fees
        </h2>
        {isEditing && editForm ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="edit-totalFees">Total Fees (₹)</Label>
              <Input
                id="edit-totalFees"
                data-ocid="application_detail.total_fees.input"
                type="number"
                min="0"
                value={editForm.totalFees}
                onChange={(e) => setEF("totalFees", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-amountCollected">Amount Collected (₹)</Label>
              <Input
                id="edit-amountCollected"
                data-ocid="application_detail.amount_collected.input"
                type="number"
                min="0"
                value={editForm.amountCollected}
                onChange={(e) => setEF("amountCollected", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Amount Pending (₹)</Label>
              <div className="form-input flex items-center font-semibold text-accent">
                ₹
                {Math.max(
                  0,
                  Number(editForm.totalFees || 0) -
                    Number(editForm.amountCollected || 0),
                ).toLocaleString("en-IN")}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1">Total Fees</p>
              <p className="text-xl font-bold text-foreground">
                {formatCurrency(app.totalFees)}
              </p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1">Collected</p>
              <p className="text-xl font-bold text-foreground">
                {formatCurrency(app.amountCollected)}
              </p>
            </div>
            <div
              className={`text-center p-4 rounded-lg ${amountPending > 0n ? "alert-warning" : "bg-muted/30"}`}
            >
              <p className="text-xs text-muted-foreground mb-1">Pending</p>
              <p
                className={`text-xl font-bold ${amountPending > 0n ? "text-accent" : "text-foreground"}`}
              >
                {formatCurrency(amountPending > 0n ? amountPending : 0n)}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Pharmacist Details — shown for Drug Licence subtypes */}
      {(app.serviceType === ServiceType.DrugLicenceNewFirm ||
        app.serviceType === ServiceType.DrugLicenceAddPharmacist ||
        app.serviceType === ServiceType.DrugLicenceRemovePharmacist) && (
        <PharmacistDetailsSection
          appId={BigInt(id)}
          serviceType={app.serviceType}
        />
      )}

      {/* Notes */}
      <section className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          Notes
        </h2>
        <div className="space-y-3 mb-4">
          {sortedNotes.length === 0 ? (
            <p className="text-sm text-muted-foreground">No notes yet.</p>
          ) : (
            sortedNotes.map((note) => (
              <div
                key={note.id.toString()}
                className="p-3 rounded-md bg-muted/20 border border-border"
              >
                <p className="text-sm text-foreground whitespace-pre-wrap">
                  {note.text}
                </p>
                <p className="text-xs text-muted-foreground mt-1.5">
                  {formatDateTime(note.createdAt)}
                </p>
              </div>
            ))
          )}
        </div>
        <div className="flex gap-2">
          <Textarea
            data-ocid="application_detail.note.textarea"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Add a note…"
            rows={2}
            className="flex-1 resize-none"
          />
          <Button
            data-ocid="application_detail.add_note.button"
            onClick={() => {
              if (noteText.trim()) noteMutation.mutate(noteText.trim());
            }}
            disabled={!noteText.trim() || noteMutation.isPending}
            className="self-end"
          >
            {noteMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Add"
            )}
          </Button>
        </div>
      </section>

      {/* Portal Credentials */}
      <section
        className="bg-card border border-border rounded-lg p-6"
        data-ocid="portal_credentials.section"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Portal Credentials
          </h2>
          <Button
            size="sm"
            variant="outline"
            data-ocid="portal_credentials.open_modal_button"
            onClick={() => {
              setCredModalMode("add");
              setCredDraft({
                id: "",
                portalName: "FDA",
                userId: "",
                password: "",
                directLink: "",
              });
              setCredShowPassword(false);
              setShowCredModal(true);
            }}
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Add New
          </Button>
        </div>

        {/* Credential Cards */}
        {(() => {
          const creds = Array.isArray(app.portalCredentials)
            ? app.portalCredentials
            : [];
          if (creds.length === 0) {
            return (
              <div
                className="text-center py-6 text-muted-foreground"
                data-ocid="portal_credentials.empty_state"
              >
                <p className="text-sm">No portal credentials saved yet.</p>
                <p className="text-xs mt-1">
                  Click "Add New" to save government portal login details.
                </p>
              </div>
            );
          }
          return (
            <div className="space-y-3">
              {creds.map((cred, idx) => (
                <div
                  key={cred.id}
                  className="rounded-lg border border-border bg-muted/10 p-4"
                  data-ocid={`portal_credentials.item.${idx + 1}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <Badge
                      variant="secondary"
                      className="text-xs font-semibold"
                    >
                      {cred.portalName}
                    </Badge>
                    <div className="flex gap-1 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-primary"
                        data-ocid={`portal_credentials.edit_button.${idx + 1}`}
                        aria-label="Edit credential"
                        onClick={() => {
                          setCredDraft({ ...cred });
                          setCredModalMode("edit");
                          setCredShowPassword(false);
                          setShowCredModal(true);
                        }}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                        data-ocid={`portal_credentials.delete_button.${idx + 1}`}
                        aria-label="Delete credential"
                        onClick={() => setCredDeleteId(cred.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div>
                      <dt className="text-xs text-muted-foreground">User ID</dt>
                      <dd className="font-medium text-foreground break-all mt-0.5">
                        {cred.userId || "—"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground">
                        Password
                      </dt>
                      <dd className="font-medium text-foreground mt-0.5 flex items-center gap-1.5">
                        <span className="break-all">
                          {credPasswordVisible[cred.id]
                            ? cred.password || "—"
                            : cred.password
                              ? "••••••••"
                              : "—"}
                        </span>
                        {cred.password && (
                          <button
                            type="button"
                            aria-label="Toggle password visibility"
                            className="text-muted-foreground hover:text-foreground shrink-0"
                            data-ocid={`portal_credentials.toggle.${idx + 1}`}
                            onClick={() =>
                              setCredPasswordVisible((v) => ({
                                ...v,
                                [cred.id]: !v[cred.id],
                              }))
                            }
                          >
                            {credPasswordVisible[cred.id] ? (
                              <EyeOff className="w-3.5 h-3.5" />
                            ) : (
                              <Eye className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}
                      </dd>
                    </div>
                    {cred.directLink && (
                      <div className="sm:col-span-2">
                        <dt className="text-xs text-muted-foreground">
                          Portal Link
                        </dt>
                        <dd className="mt-0.5">
                          <a
                            href={cred.directLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-sm flex items-center gap-1 break-all"
                            data-ocid={`portal_credentials.link.${idx + 1}`}
                          >
                            {cred.directLink}
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              ))}
            </div>
          );
        })()}

        {/* Add/Edit Modal */}
        {showCredModal && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50"
            data-ocid="portal_credentials.dialog"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowCredModal(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") setShowCredModal(false);
            }}
          >
            <div className="bg-card border border-border rounded-t-2xl sm:rounded-xl w-full sm:max-w-md p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground">
                  {credModalMode === "add"
                    ? "Add Portal Credential"
                    : "Edit Portal Credential"}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  data-ocid="portal_credentials.close_button"
                  onClick={() => setShowCredModal(false)}
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="cred-portal-name">Portal Name</Label>
                  <Select
                    value={credDraft.portalName}
                    onValueChange={(v) =>
                      setCredDraft((d) => ({ ...d, portalName: v }))
                    }
                  >
                    <SelectTrigger
                      id="cred-portal-name"
                      data-ocid="portal_credentials.portalName.select"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PORTAL_NAMES.map((name) => (
                        <SelectItem key={name} value={name}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cred-user-id">User ID / Username</Label>
                  <Input
                    id="cred-user-id"
                    data-ocid="portal_credentials.userId.input"
                    value={credDraft.userId}
                    onChange={(e) =>
                      setCredDraft((d) => ({ ...d, userId: e.target.value }))
                    }
                    placeholder="Enter user ID or username"
                    autoComplete="off"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cred-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="cred-password"
                      data-ocid="portal_credentials.password.input"
                      type={credShowPassword ? "text" : "password"}
                      value={credDraft.password}
                      onChange={(e) =>
                        setCredDraft((d) => ({
                          ...d,
                          password: e.target.value,
                        }))
                      }
                      placeholder="Enter portal password"
                      className="pr-9"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      aria-label="Toggle password visibility"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setCredShowPassword((v) => !v)}
                    >
                      {credShowPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cred-direct-link">
                    Direct Portal Link (URL)
                  </Label>
                  <Input
                    id="cred-direct-link"
                    data-ocid="portal_credentials.directLink.input"
                    type="url"
                    value={credDraft.directLink}
                    onChange={(e) =>
                      setCredDraft((d) => ({
                        ...d,
                        directLink: e.target.value,
                      }))
                    }
                    placeholder="https://..."
                  />
                </div>
                <div className="flex gap-2 pt-1">
                  <Button
                    variant="outline"
                    className="flex-1"
                    data-ocid="portal_credentials.cancel_button"
                    onClick={() => setShowCredModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1"
                    data-ocid="portal_credentials.submit_button"
                    disabled={
                      addCredMutation.isPending || updateCredMutation.isPending
                    }
                    onClick={() => {
                      if (!credDraft.portalName.trim()) return;
                      if (credModalMode === "add") {
                        const newCred: PortalCredential = {
                          ...credDraft,
                          id: `cred-${Date.now()}-${Math.random().toString(36).slice(2)}`,
                        };
                        addCredMutation.mutate(newCred);
                      } else {
                        updateCredMutation.mutate({
                          credId: credDraft.id,
                          cred: credDraft,
                        });
                      }
                    }}
                  >
                    {addCredMutation.isPending ||
                    updateCredMutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : credModalMode === "add" ? (
                      "Add"
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirm Dialog */}
        <AlertDialog
          open={credDeleteId !== null}
          onOpenChange={(open) => {
            if (!open) setCredDeleteId(null);
          }}
        >
          <AlertDialogContent data-ocid="portal_credentials.dialog">
            <AlertDialogHeader>
              <AlertDialogTitle>Remove Credential?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently remove this portal credential. This cannot
                be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                data-ocid="portal_credentials.cancel_button"
                onClick={() => setCredDeleteId(null)}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                data-ocid="portal_credentials.confirm_button"
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                disabled={removeCredMutation.isPending}
                onClick={() => {
                  if (credDeleteId) removeCredMutation.mutate(credDeleteId);
                }}
              >
                {removeCredMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Remove"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>

      {/* Generate Forms */}
      <section className="bg-card border border-border rounded-lg p-6">
        {/* Prominent Covering Letter CTA */}
        <div className="mb-4 p-4 rounded-lg bg-primary/5 border border-primary/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                FDA Covering Letter
              </p>
              <p className="text-xs text-muted-foreground">
                Generate a formal covering letter addressed to the FDA for this
                application
              </p>
            </div>
          </div>
          <Button
            data-ocid="application_detail.generate_covering_letter.primary_button"
            className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
            onClick={() =>
              printForm(
                "fda_covering_letter",
                app,
                {
                  pharmacist: pharmacistDetails,
                  fda: fdaOfficeDetails,
                  companyInfo: companyInfo ?? null,
                },
                appPharmacists,
              )
            }
          >
            <FileText className="w-4 h-4 mr-2" />
            Generate Covering Letter
          </Button>
        </div>

        <button
          type="button"
          data-ocid="application_detail.forms.toggle"
          className="flex items-center justify-between w-full text-left"
          onClick={() => setShowForms((v) => !v)}
        >
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Generate Forms
            <Badge variant="secondary" className="ml-2">
              {FORM_TYPES.length}
            </Badge>
          </h2>
          {showForms ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
        {showForms && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* View Ledger shortcut */}
            <div className="flex items-center justify-between p-3 rounded-md border border-border bg-muted/10">
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm font-medium truncate">
                  View Ledger
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                data-ocid="application_detail.view_ledger.button"
                onClick={() => navigate({ to: "/reports" })}
                className="ml-2 shrink-0"
              >
                Open
              </Button>
            </div>
            {FORM_TYPES.map((formType) => (
              <div
                key={formType.key}
                className="flex items-center justify-between p-3 rounded-md border border-border bg-muted/10"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm font-medium truncate">
                    {formType.label}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  data-ocid={`application_detail.print_form.${formType.key}`}
                  onClick={() => {
                    if (formType.key === "plan_layout") {
                      setShowPlanModal(true);
                    } else {
                      printForm(
                        formType.key,
                        app,
                        {
                          pharmacist: pharmacistDetails,
                          fda: fdaOfficeDetails,
                          companyInfo: companyInfo ?? null,
                        },
                        appPharmacists,
                      );
                    }
                  }}
                  className="ml-2 shrink-0"
                >
                  Print
                </Button>
              </div>
            ))}

            {/* Old Pharmacist Resignation Letter — only when toggle is on */}
            {app.resignOldPharmacist && (
              <div className="flex items-center justify-between p-3 rounded-md border border-primary/30 bg-primary/5">
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm font-medium truncate">
                    Old Pharmacist Resignation Letter
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  data-ocid="application_detail.print_form.old_pharmacist_resignation"
                  onClick={() =>
                    printForm(
                      "old_pharmacist_resignation",
                      app,
                      {
                        pharmacist: pharmacistDetails,
                        fda: fdaOfficeDetails,
                        companyInfo: companyInfo ?? null,
                      },
                      appPharmacists,
                    )
                  }
                  className="ml-2 shrink-0"
                >
                  Print
                </Button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Plan Layout Modal */}
      {showPlanModal && (
        <PlanLayoutModal
          initial={app.planLayoutDetails ?? null}
          mobileNumber={app.mobileNumber}
          onClose={() => setShowPlanModal(false)}
          onGenerate={(details: PlanLayoutPrintData) => {
            // Save only the PlanLayoutDetails fields (not the transient entrance data)
            const saveDetails: PlanLayoutDetails = {
              boundaryEast: details.boundaryEast,
              boundaryWest: details.boundaryWest,
              boundaryNorth: details.boundaryNorth,
              boundarySouth: details.boundarySouth,
              premisesLength: details.premisesLength,
              premisesWidth: details.premisesWidth,
              rooms: details.rooms,
              frontOfShop: details.frontOfShop,
            };
            savePlanLayout.mutate(saveDetails);
            setShowPlanModal(false);
            printForm(
              "plan_layout",
              app,
              { pharmacist: pharmacistDetails, fda: fdaOfficeDetails },
              appPharmacists,
              details,
            );
          }}
        />
      )}

      {/* Bills & Receipts */}
      <BillsSection
        app={app}
        companyInfo={
          companyInfo ?? {
            name: "Barote Consultancy",
            address: "",
            phone: "",
            email: "",
            fdaAddress: "",
          }
        }
      />
    </div>
  );
}
