import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit2, Loader2, Plus, Trash2, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useBackend } from "../hooks/useBackend";
import type { ApplicationPharmacist } from "../types";
import { ServiceType } from "../types";

const QUALIFICATIONS = ["D.Pharm", "B.Pharm", "M.Pharm"] as const;

const EMPTY_FORM: Omit<ApplicationPharmacist, "id"> = {
  fullName: "",
  registrationNumber: "",
  qualification: "D.Pharm",
  aadhaarNumber: "",
  mobileNumber: "",
  address: "",
  dateOfJoining: "",
  dateOfLeaving: "",
  resignationDate: "",
};

function genId() {
  return `ph-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

interface Props {
  appId: bigint;
  serviceType: ServiceType;
}

export function PharmacistDetailsSection({ appId, serviceType }: Props) {
  const qc = useQueryClient();
  const {
    getApplicationPharmacists,
    addApplicationPharmacist,
    updateApplicationPharmacist,
    removeApplicationPharmacist,
  } = useBackend();

  const isRemoveCtx = serviceType === ServiceType.DrugLicenceRemovePharmacist;

  const { data: rawPharmacists, isLoading } = useQuery<ApplicationPharmacist[]>(
    {
      queryKey: ["appPharmacists", appId.toString()],
      queryFn: async () => {
        const res = await getApplicationPharmacists(appId);
        if (res.__kind__ === "err") return [];
        const raw = res.ok;
        return Array.isArray(raw) ? raw : [];
      },
    },
  );
  // Guard against null/undefined — destructuring default only covers undefined, not null
  const pharmacists: ApplicationPharmacist[] = Array.isArray(rawPharmacists)
    ? rawPharmacists
    : [];

  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<ApplicationPharmacist | null>(
    null,
  );
  const [deleteTarget, setDeleteTarget] =
    useState<ApplicationPharmacist | null>(null);
  const [form, setForm] =
    useState<Omit<ApplicationPharmacist, "id">>(EMPTY_FORM);

  function openAdd() {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  }

  function openEdit(ph: ApplicationPharmacist) {
    setEditTarget(ph);
    setForm({
      fullName: ph.fullName,
      registrationNumber: ph.registrationNumber,
      qualification: ph.qualification,
      aadhaarNumber: ph.aadhaarNumber,
      mobileNumber: ph.mobileNumber,
      address: ph.address,
      dateOfJoining: ph.dateOfJoining,
      dateOfLeaving: ph.dateOfLeaving,
      resignationDate: ph.resignationDate ?? "",
    });
    setShowForm(true);
  }

  function setF<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  function invalidate() {
    qc.invalidateQueries({
      queryKey: ["appPharmacists", appId.toString()],
    });
    qc.invalidateQueries({ queryKey: ["application", appId.toString()] });
  }

  const addMutation = useMutation({
    mutationFn: (ph: ApplicationPharmacist) =>
      addApplicationPharmacist(appId, ph),
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        toast.error(res.err);
        return;
      }
      toast.success("Pharmacist added");
      invalidate();
      setShowForm(false);
    },
    onError: () => toast.error("Failed to add pharmacist"),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      pharmacistId,
      ph,
    }: {
      pharmacistId: string;
      ph: ApplicationPharmacist;
    }) => updateApplicationPharmacist(appId, pharmacistId, ph),
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        toast.error(res.err);
        return;
      }
      toast.success("Pharmacist updated");
      invalidate();
      setShowForm(false);
    },
    onError: () => toast.error("Failed to update pharmacist"),
  });

  const deleteMutation = useMutation({
    mutationFn: (pharmacistId: string) =>
      removeApplicationPharmacist(appId, pharmacistId),
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        toast.error(res.err);
        return;
      }
      toast.success("Pharmacist removed");
      invalidate();
      setDeleteTarget(null);
    },
    onError: () => toast.error("Failed to remove pharmacist"),
  });

  function handleSubmit() {
    const ph: ApplicationPharmacist = {
      id: editTarget?.id ?? genId(),
      ...form,
    };
    if (editTarget) {
      updateMutation.mutate({ pharmacistId: editTarget.id, ph });
    } else {
      addMutation.mutate(ph);
    }
  }

  const isPending = addMutation.isPending || updateMutation.isPending;

  return (
    <section
      className="bg-card border border-border rounded-lg p-6"
      data-ocid="pharmacist_details.section"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Pharmacist Details
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isRemoveCtx
              ? "Pharmacists being removed from this licence"
              : "Pharmacists associated with this application"}
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          data-ocid="pharmacist_details.add_button"
          onClick={openAdd}
          className="gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Pharmacist
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3" data-ocid="pharmacist_details.loading_state">
          <Skeleton className="h-20 w-full rounded-lg" />
          <Skeleton className="h-20 w-full rounded-lg" />
        </div>
      ) : pharmacists.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-10 text-center"
          data-ocid="pharmacist_details.empty_state"
        >
          <User className="w-8 h-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            No pharmacists added yet.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Click "Add Pharmacist" to add one.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {pharmacists.map((ph, idx) => (
            <div
              key={ph.id}
              data-ocid={`pharmacist_details.item.${idx + 1}`}
              className="p-4 rounded-lg border border-border bg-muted/10"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-foreground">
                      {ph.fullName}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {ph.qualification}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Reg. No.: {ph.registrationNumber}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 mt-2">
                    {ph.mobileNumber && (
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">
                          Mobile:
                        </span>{" "}
                        {ph.mobileNumber}
                      </p>
                    )}
                    {ph.aadhaarNumber && (
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">
                          Aadhaar:
                        </span>{" "}
                        {ph.aadhaarNumber}
                      </p>
                    )}
                    {ph.dateOfJoining && (
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">
                          Joining:
                        </span>{" "}
                        {ph.dateOfJoining}
                      </p>
                    )}
                    {isRemoveCtx && ph.dateOfLeaving && (
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">
                          Leaving:
                        </span>{" "}
                        {ph.dateOfLeaving}
                      </p>
                    )}
                    {isRemoveCtx && ph.resignationDate && (
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">
                          Resignation Date:
                        </span>{" "}
                        {ph.resignationDate}
                      </p>
                    )}
                    {ph.address && (
                      <p className="text-xs text-muted-foreground sm:col-span-2">
                        <span className="font-medium text-foreground">
                          Address:
                        </span>{" "}
                        {ph.address}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    data-ocid={`pharmacist_details.edit_button.${idx + 1}`}
                    onClick={() => openEdit(ph)}
                    aria-label="Edit pharmacist"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive hover:text-destructive"
                    data-ocid={`pharmacist_details.delete_button.${idx + 1}`}
                    onClick={() => setDeleteTarget(ph)}
                    aria-label="Delete pharmacist"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Dialog */}
      <Dialog
        open={showForm}
        onOpenChange={(v) => {
          if (!v) setShowForm(false);
        }}
      >
        <DialogContent
          className="max-w-lg max-h-[90vh] overflow-y-auto"
          data-ocid="pharmacist_details.dialog"
        >
          <DialogHeader>
            <DialogTitle>
              {editTarget ? "Edit Pharmacist" : "Add Pharmacist"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="ph-fullName">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="ph-fullName"
                  data-ocid="pharmacist_details.full_name.input"
                  value={form.fullName}
                  onChange={(e) => setF("fullName", e.target.value)}
                  placeholder="e.g. Dr. Ramesh Patil"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ph-regNo">
                  Registration No. <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="ph-regNo"
                  data-ocid="pharmacist_details.registration_number.input"
                  value={form.registrationNumber}
                  onChange={(e) => setF("registrationNumber", e.target.value)}
                  placeholder="e.g. MH-12345"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ph-qual">Qualification</Label>
                <Select
                  value={form.qualification}
                  onValueChange={(v) => setF("qualification", v)}
                >
                  <SelectTrigger
                    id="ph-qual"
                    data-ocid="pharmacist_details.qualification.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {QUALIFICATIONS.map((q) => (
                      <SelectItem key={q} value={q}>
                        {q}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ph-aadhaar">Aadhaar Number</Label>
                <Input
                  id="ph-aadhaar"
                  data-ocid="pharmacist_details.aadhaar_number.input"
                  value={form.aadhaarNumber}
                  onChange={(e) => setF("aadhaarNumber", e.target.value)}
                  placeholder="XXXX XXXX XXXX"
                  maxLength={14}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ph-mobile">Mobile Number</Label>
                <Input
                  id="ph-mobile"
                  data-ocid="pharmacist_details.mobile_number.input"
                  value={form.mobileNumber}
                  onChange={(e) => setF("mobileNumber", e.target.value)}
                  placeholder="+91 98765 43210"
                  type="tel"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="ph-address">Address</Label>
                <Input
                  id="ph-address"
                  data-ocid="pharmacist_details.address.input"
                  value={form.address}
                  onChange={(e) => setF("address", e.target.value)}
                  placeholder="Full residential address"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ph-joining">Date of Joining</Label>
                <Input
                  id="ph-joining"
                  data-ocid="pharmacist_details.date_of_joining.input"
                  value={form.dateOfJoining}
                  onChange={(e) => setF("dateOfJoining", e.target.value)}
                  placeholder="DD/MM/YYYY"
                />
              </div>
              {isRemoveCtx && (
                <div className="space-y-1.5">
                  <Label htmlFor="ph-leaving">
                    Date of Leaving <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="ph-leaving"
                    data-ocid="pharmacist_details.date_of_leaving.input"
                    value={form.dateOfLeaving}
                    onChange={(e) => setF("dateOfLeaving", e.target.value)}
                    placeholder="DD/MM/YYYY"
                  />
                </div>
              )}
              {isRemoveCtx && (
                <div className="space-y-1.5">
                  <Label htmlFor="ph-resignation-date">Resignation Date</Label>
                  <Input
                    id="ph-resignation-date"
                    type="date"
                    data-ocid="pharmacist_details.resignation_date.input"
                    value={form.resignationDate}
                    onChange={(e) => setF("resignationDate", e.target.value)}
                    placeholder="DD/MM/YYYY"
                  />
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              data-ocid="pharmacist_details.cancel_button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
            <Button
              data-ocid="pharmacist_details.submit_button"
              disabled={
                isPending ||
                !form.fullName.trim() ||
                !form.registrationNumber.trim()
              }
              onClick={handleSubmit}
              className="gap-1.5"
            >
              {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {editTarget ? "Save Changes" : "Add Pharmacist"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
      >
        <AlertDialogContent data-ocid="pharmacist_details.delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Pharmacist?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove{" "}
              <strong>{deleteTarget?.fullName}</strong> from this application.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="pharmacist_details.delete_cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="pharmacist_details.delete_confirm_button"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteMutation.isPending}
              onClick={() =>
                deleteTarget && deleteMutation.mutate(deleteTarget.id)
              }
            >
              {deleteMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Remove"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
