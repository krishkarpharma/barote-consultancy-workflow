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
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { hashPassword } from "@/contexts/AuthContext";
import { useBackend } from "@/hooks/useBackend";
import { type FeeItem, ServiceType } from "@/types";
import type {
  CompanyInfo,
  FdaOfficeDetails,
  FeeTemplate,
  ServiceCharge,
} from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Building2,
  Check,
  ChevronDown,
  ChevronUp,
  DollarSign,
  FlaskConical,
  Lock,
  Pencil,
  Plus,
  Receipt,
  Trash2,
  X,
} from "lucide-react";
import {
  type ElementType,
  type FormEvent,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

// ── Helpers ─────────────────────────────────────────────────────────────────

const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  [ServiceType.DrugLicenceNewFirm]: "Drug Licence – New Firm",
  [ServiceType.DrugLicenceRenewal]: "Drug Licence – Renewal",
  [ServiceType.DrugLicenceChangePremise]: "Drug Licence – Change Premise",
  [ServiceType.DrugLicenceAlterationOfPremise]:
    "Drug Licence – Alteration of Premise",
  [ServiceType.DrugLicenceChangeConstitution]:
    "Drug Licence – Change Constitution",
  [ServiceType.DrugLicenceAddPharmacist]: "Drug Licence – Add Pharmacist",
  [ServiceType.DrugLicenceRemovePharmacist]: "Drug Licence – Remove Pharmacist",
  [ServiceType.FoodLicenceNew]: "Food Licence / FSSAI – New",
  [ServiceType.FoodLicenceRenewal]: "Food Licence / FSSAI – Renewal",
  [ServiceType.GSTRegistration]: "GST Registration",
  [ServiceType.MSMEUdyam]: "MSME / Udyam",
  [ServiceType.Other]: "Other",
};

function serviceLabel(st: ServiceType | undefined | null): string {
  if (!st) return "All Types";
  return SERVICE_TYPE_LABELS[st] ?? st;
}

// ── Section Wrapper ──────────────────────────────────────────────────────────

function Section({
  id,
  icon: Icon,
  title,
  subtitle,
  children,
  defaultOpen = false,
}: {
  id: string;
  icon: ElementType;
  title: string;
  subtitle: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      data-ocid={`settings.${id}.section`}
      className="bg-card border border-border rounded-xl overflow-hidden"
    >
      <button
        type="button"
        className="w-full flex items-center justify-between px-4 sm:px-6 py-4 hover:bg-muted/30 transition-colors duration-200 min-h-[56px]"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary">
            <Icon size={18} />
          </span>
          <div className="text-left">
            <p className="text-sm font-semibold text-foreground">{title}</p>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        {open ? (
          <ChevronUp size={16} className="text-muted-foreground" />
        ) : (
          <ChevronDown size={16} className="text-muted-foreground" />
        )}
      </button>
      {open && (
        <div className="border-t border-border px-4 sm:px-6 py-5">
          {children}
        </div>
      )}
    </div>
  );
}

// ── Company Info Section ─────────────────────────────────────────────────────

const DEFAULT_FDA_ADDRESS =
  "Assistant Commissioner, Food & Drug Administration (Drug) Buldhana (MH)";

function CompanyInfoSection() {
  const { getCompanyInfo, setCompanyInfo } = useBackend();
  const [form, setForm] = useState<CompanyInfo>({
    name: "",
    address: "",
    phone: "",
    email: "",
    fdaAddress: "",
  });

  const { data, isLoading } = useQuery<CompanyInfo>({
    queryKey: ["companyInfo"],
    queryFn: getCompanyInfo,
  });

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const mutation = useMutation({
    mutationFn: (info: CompanyInfo) => setCompanyInfo(info),
    onSuccess: () => toast.success("Company info saved successfully"),
    onError: () => toast.error("Failed to save company info"),
  });

  function handleChange(field: keyof CompanyInfo, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    mutation.mutate(form);
  }

  if (isLoading) {
    return (
      <div className="space-y-3" data-ocid="settings.company.loading_state">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-9 w-full rounded-md" />
        ))}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      data-ocid="settings.company.form"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="company-name">Company Name</Label>
          <Input
            id="company-name"
            data-ocid="settings.company_name.input"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Barote Consultancy"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="company-phone">Phone</Label>
          <Input
            id="company-phone"
            data-ocid="settings.company_phone.input"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+91 98765 43210"
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="company-address">Address</Label>
          <Input
            id="company-address"
            data-ocid="settings.company_address.input"
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="123 Main Street, City, State – PIN"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="company-email">Email</Label>
          <Input
            id="company-email"
            type="email"
            data-ocid="settings.company_email.input"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="info@baroteconsultancy.com"
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="company-fda-address">Default FDA Address</Label>
          <Textarea
            id="company-fda-address"
            data-ocid="settings.company_fda_address.input"
            value={form.fdaAddress || ""}
            onChange={(e) => handleChange("fdaAddress", e.target.value)}
            placeholder={DEFAULT_FDA_ADDRESS}
            rows={3}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground">
            This address pre-fills in all new application FDA Covering Letters
          </p>
        </div>
      </div>
      <div className="flex justify-end pt-1">
        <Button
          type="submit"
          data-ocid="settings.company.submit_button"
          disabled={mutation.isPending}
          className="min-w-[110px]"
        >
          {mutation.isPending ? "Saving…" : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}

// ── Fee Templates Section ─────────────────────────────────────────────────────

type FeeFormState = {
  name: string;
  serviceType: ServiceType | "";
  amount: string;
  description: string;
};

const EMPTY_FEE_FORM: FeeFormState = {
  name: "",
  serviceType: "",
  amount: "",
  description: "",
};

function FeeFormFields({
  form,
  onChange,
}: {
  form: FeeFormState;
  onChange: (f: FeeFormState) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <Label>Fee Name</Label>
        <Input
          data-ocid="settings.fee_name.input"
          value={form.name}
          onChange={(e) => onChange({ ...form, name: e.target.value })}
          placeholder="e.g., Drug Licence Application Fee"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label>Service Type</Label>
          <Select
            value={form.serviceType || "all"}
            onValueChange={(v) =>
              onChange({
                ...form,
                serviceType: v === "all" ? "" : (v as ServiceType),
              })
            }
          >
            <SelectTrigger data-ocid="settings.fee_service_type.select">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {Object.values(ServiceType).map((st) => (
                <SelectItem key={st} value={st}>
                  {SERVICE_TYPE_LABELS[st]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Amount (₹)</Label>
          <Input
            type="number"
            min="0"
            data-ocid="settings.fee_amount.input"
            value={form.amount}
            onChange={(e) => onChange({ ...form, amount: e.target.value })}
            placeholder="0"
            required
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label>Description</Label>
        <Input
          data-ocid="settings.fee_description.input"
          value={form.description}
          onChange={(e) => onChange({ ...form, description: e.target.value })}
          placeholder="Optional description"
        />
      </div>
    </div>
  );
}

function FeeTemplatesSection() {
  const {
    listFeeTemplates,
    createFeeTemplate,
    updateFeeTemplate,
    deleteFeeTemplate,
  } = useBackend();
  const queryClient = useQueryClient();

  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState<FeeFormState>(EMPTY_FEE_FORM);

  const [editingId, setEditingId] = useState<bigint | null>(null);
  const [editForm, setEditForm] = useState<FeeFormState>(EMPTY_FEE_FORM);

  const [deleteTarget, setDeleteTarget] = useState<FeeTemplate | null>(null);

  const { data: templates = [], isLoading } = useQuery<FeeTemplate[]>({
    queryKey: ["feeTemplates"],
    queryFn: listFeeTemplates,
  });

  const createMutation = useMutation({
    mutationFn: (f: FeeFormState) =>
      createFeeTemplate(
        f.name,
        f.serviceType ? (f.serviceType as ServiceType) : null,
        BigInt(f.amount || "0"),
        f.description,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeTemplates"] });
      toast.success("Fee template added");
      setShowAddModal(false);
      setAddForm(EMPTY_FEE_FORM);
    },
    onError: () => toast.error("Failed to add fee template"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, f }: { id: bigint; f: FeeFormState }) =>
      updateFeeTemplate(
        id,
        f.name || null,
        f.serviceType
          ? { __kind__: "Some" as const, value: f.serviceType as ServiceType }
          : { __kind__: "Some" as const, value: null },
        f.amount ? BigInt(f.amount) : null,
        f.description || null,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeTemplates"] });
      toast.success("Fee template updated");
      setEditingId(null);
    },
    onError: () => toast.error("Failed to update fee template"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: bigint) => deleteFeeTemplate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeTemplates"] });
      toast.success("Fee template deleted");
      setDeleteTarget(null);
    },
    onError: () => toast.error("Failed to delete fee template"),
  });

  function startEdit(t: FeeTemplate) {
    setEditingId(t.id);
    setEditForm({
      name: t.name,
      serviceType: (t.serviceType as ServiceType | undefined) ?? "",
      amount: t.amount.toString(),
      description: t.description,
    });
  }

  function cancelEdit() {
    setEditingId(null);
  }

  if (isLoading) {
    return (
      <div className="space-y-2" data-ocid="settings.fees.loading_state">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-12 w-full rounded-md" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {templates.length} template{templates.length !== 1 ? "s" : ""} defined
        </p>
        <Button
          size="sm"
          data-ocid="settings.fees.add_button"
          onClick={() => {
            setAddForm(EMPTY_FEE_FORM);
            setShowAddModal(true);
          }}
        >
          <Plus size={14} className="mr-1.5" />
          Add Fee Template
        </Button>
      </div>

      {templates.length === 0 ? (
        <div
          data-ocid="settings.fees.empty_state"
          className="text-center py-10 text-muted-foreground text-sm border border-dashed border-border rounded-lg"
        >
          No fee templates yet. Add one to get started.
        </div>
      ) : (
        <div className="rounded-lg border border-border overflow-hidden overflow-x-auto">
          <table className="w-full text-sm min-w-[400px]">
            <thead>
              <tr className="bg-muted/40 border-b border-border">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Fee Name
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Service Type
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Amount
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground w-24">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody data-ocid="settings.fees.table">
              {templates.map((t, idx) =>
                editingId === t.id ? (
                  <tr
                    key={t.id.toString()}
                    data-ocid={`settings.fees.item.${idx + 1}`}
                    className="border-b border-border last:border-0 bg-primary/5"
                  >
                    <td colSpan={4} className="px-4 py-3">
                      <FeeFormFields form={editForm} onChange={setEditForm} />
                      <div className="flex gap-2 mt-3 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          data-ocid="settings.fees.edit_cancel_button"
                          onClick={cancelEdit}
                        >
                          <X size={14} className="mr-1" />
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          data-ocid="settings.fees.edit_save_button"
                          disabled={updateMutation.isPending}
                          onClick={() =>
                            updateMutation.mutate({ id: t.id, f: editForm })
                          }
                        >
                          <Check size={14} className="mr-1" />
                          {updateMutation.isPending ? "Saving…" : "Save"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr
                    key={t.id.toString()}
                    data-ocid={`settings.fees.item.${idx + 1}`}
                    className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 font-medium text-foreground">
                      {t.name}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {serviceLabel(t.serviceType as ServiceType | undefined)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-medium">
                      ₹{t.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          data-ocid={`settings.fees.edit_button.${idx + 1}`}
                          onClick={() => startEdit(t)}
                          aria-label="Edit fee template"
                        >
                          <Pencil size={13} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive hover:text-destructive"
                          data-ocid={`settings.fees.delete_button.${idx + 1}`}
                          onClick={() => setDeleteTarget(t)}
                          aria-label="Delete fee template"
                        >
                          <Trash2 size={13} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Modal */}
      <Dialog
        open={showAddModal}
        onOpenChange={(v) => {
          setShowAddModal(v);
          if (!v) setAddForm(EMPTY_FEE_FORM);
        }}
      >
        <DialogContent data-ocid="settings.fees.add_dialog">
          <DialogHeader>
            <DialogTitle>Add Fee Template</DialogTitle>
          </DialogHeader>
          <FeeFormFields form={addForm} onChange={setAddForm} />
          <DialogFooter>
            <Button
              variant="outline"
              data-ocid="settings.fees.add_cancel_button"
              onClick={() => setShowAddModal(false)}
            >
              Cancel
            </Button>
            <Button
              data-ocid="settings.fees.add_submit_button"
              disabled={
                createMutation.isPending || !addForm.name || !addForm.amount
              }
              onClick={() => createMutation.mutate(addForm)}
            >
              {createMutation.isPending ? "Adding…" : "Add Template"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
      >
        <AlertDialogContent data-ocid="settings.fees.delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Fee Template?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete <strong>{deleteTarget?.name}</strong>
              . This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="settings.fees.delete_cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="settings.fees.delete_confirm_button"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteMutation.isPending}
              onClick={() =>
                deleteTarget && deleteMutation.mutate(deleteTarget.id)
              }
            >
              {deleteMutation.isPending ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ── Fee Master Section ───────────────────────────────────────────────────────

const FEE_CATEGORIES = [
  "Government",
  "Professional",
  "Miscellaneous",
  "Other",
] as const;
type FeeCategory = (typeof FEE_CATEGORIES)[number];

type FeeItemFormState = {
  name: string;
  defaultAmount: string;
  category: FeeCategory | "";
  description: string;
};

const EMPTY_FEE_ITEM_FORM: FeeItemFormState = {
  name: "",
  defaultAmount: "",
  category: "",
  description: "",
};

function FeeMasterFormFields({
  form,
  onChange,
}: {
  form: FeeItemFormState;
  onChange: (f: FeeItemFormState) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <Label>Fee Name</Label>
        <Input
          data-ocid="settings.fee_master_name.input"
          value={form.name}
          onChange={(e) => onChange({ ...form, name: e.target.value })}
          placeholder="e.g., Professional Fees, Government Fees"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label>Default Amount (₹)</Label>
          <Input
            type="number"
            min="0"
            step="0.01"
            data-ocid="settings.fee_master_amount.input"
            value={form.defaultAmount}
            onChange={(e) =>
              onChange({ ...form, defaultAmount: e.target.value })
            }
            placeholder="0.00"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label>Category</Label>
          <Select
            value={form.category || ""}
            onValueChange={(v) =>
              onChange({ ...form, category: v as FeeCategory })
            }
          >
            <SelectTrigger data-ocid="settings.fee_master_category.select">
              <SelectValue placeholder="Select category…" />
            </SelectTrigger>
            <SelectContent>
              {FEE_CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-1.5">
        <Label>
          Description{" "}
          <span className="text-muted-foreground text-xs">(optional)</span>
        </Label>
        <Input
          data-ocid="settings.fee_master_description.input"
          value={form.description}
          onChange={(e) => onChange({ ...form, description: e.target.value })}
          placeholder="Brief description of this fee item"
        />
      </div>
    </div>
  );
}

const CATEGORY_BADGE_STYLES: Record<string, string> = {
  Government: "bg-blue-100 text-blue-700",
  Professional: "bg-purple-100 text-purple-700",
  Miscellaneous: "bg-orange-100 text-orange-700",
  Other: "bg-muted text-muted-foreground",
};

function FeeMasterSection() {
  const { listFeeItems, createFeeItem, updateFeeItem, deleteFeeItem } =
    useBackend();
  const queryClient = useQueryClient();

  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState<FeeItemFormState>(EMPTY_FEE_ITEM_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] =
    useState<FeeItemFormState>(EMPTY_FEE_ITEM_FORM);
  const [deleteTarget, setDeleteTarget] = useState<FeeItem | null>(null);

  const { data: items = [], isLoading } = useQuery<FeeItem[]>({
    queryKey: ["feeItems"],
    queryFn: listFeeItems,
  });

  const createMutation = useMutation({
    mutationFn: (f: FeeItemFormState) =>
      createFeeItem(
        f.name,
        f.description || null,
        Number.parseFloat(f.defaultAmount || "0"),
        f.category || "Other",
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeItems"] });
      toast.success("Fee item added");
      setShowAddModal(false);
      setAddForm(EMPTY_FEE_ITEM_FORM);
    },
    onError: () => toast.error("Failed to add fee item"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, f }: { id: string; f: FeeItemFormState }) =>
      updateFeeItem(
        id,
        f.name || null,
        f.description
          ? { __kind__: "Some" as const, value: f.description }
          : { __kind__: "Some" as const, value: null },
        f.defaultAmount ? Number.parseFloat(f.defaultAmount) : null,
        f.category || null,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeItems"] });
      toast.success("Fee item updated");
      setEditingId(null);
    },
    onError: () => toast.error("Failed to update fee item"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteFeeItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeItems"] });
      toast.success("Fee item deleted");
      setDeleteTarget(null);
    },
    onError: () => toast.error("Failed to delete fee item"),
  });

  function startEdit(item: FeeItem) {
    setEditingId(item.id);
    setEditForm({
      name: item.name,
      defaultAmount: item.defaultAmount.toString(),
      category: (item.category as FeeCategory) ?? "",
      description: item.description ?? "",
    });
  }

  if (isLoading) {
    return (
      <div className="space-y-2" data-ocid="settings.fee_master.loading_state">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-12 w-full rounded-md" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {items.length} fee item{items.length !== 1 ? "s" : ""} defined
        </p>
        <Button
          size="sm"
          data-ocid="settings.fee_master.add_button"
          onClick={() => {
            setAddForm(EMPTY_FEE_ITEM_FORM);
            setShowAddModal(true);
          }}
        >
          <Plus size={14} className="mr-1.5" />
          Add Fee Item
        </Button>
      </div>

      {items.length === 0 ? (
        <div
          data-ocid="settings.fee_master.empty_state"
          className="text-center py-10 text-muted-foreground text-sm border border-dashed border-border rounded-lg"
        >
          No fee items yet. Add pre-defined fees to auto-populate bills.
        </div>
      ) : (
        <div className="rounded-lg border border-border overflow-hidden overflow-x-auto">
          <table className="w-full text-sm min-w-[400px]">
            <thead>
              <tr className="bg-muted/40 border-b border-border">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Fee Name
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Category
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Default Amount
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground w-24">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody data-ocid="settings.fee_master.table">
              {items.map((item, idx) =>
                editingId === item.id ? (
                  <tr
                    key={item.id}
                    data-ocid={`settings.fee_master.item.${idx + 1}`}
                    className="border-b border-border last:border-0 bg-primary/5"
                  >
                    <td colSpan={4} className="px-4 py-3">
                      <FeeMasterFormFields
                        form={editForm}
                        onChange={setEditForm}
                      />
                      <div className="flex gap-2 mt-3 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          data-ocid="settings.fee_master.edit_cancel_button"
                          onClick={() => setEditingId(null)}
                        >
                          <X size={14} className="mr-1" />
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          data-ocid="settings.fee_master.edit_save_button"
                          disabled={updateMutation.isPending}
                          onClick={() =>
                            updateMutation.mutate({ id: item.id, f: editForm })
                          }
                        >
                          <Check size={14} className="mr-1" />
                          {updateMutation.isPending ? "Saving…" : "Save"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr
                    key={item.id}
                    data-ocid={`settings.fee_master.item.${idx + 1}`}
                    className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors duration-150"
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{item.name}</p>
                      {item.description && (
                        <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-[220px]">
                          {item.description}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          CATEGORY_BADGE_STYLES[item.category] ??
                          CATEGORY_BADGE_STYLES.Other
                        }`}
                      >
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-medium text-foreground">
                      ₹
                      {item.defaultAmount.toLocaleString("en-IN", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          data-ocid={`settings.fee_master.edit_button.${idx + 1}`}
                          onClick={() => startEdit(item)}
                          aria-label="Edit fee item"
                        >
                          <Pencil size={13} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive hover:text-destructive"
                          data-ocid={`settings.fee_master.delete_button.${idx + 1}`}
                          onClick={() => setDeleteTarget(item)}
                          aria-label="Delete fee item"
                        >
                          <Trash2 size={13} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Modal */}
      <Dialog
        open={showAddModal}
        onOpenChange={(v) => {
          setShowAddModal(v);
          if (!v) setAddForm(EMPTY_FEE_ITEM_FORM);
        }}
      >
        <DialogContent data-ocid="settings.fee_master.add_dialog">
          <DialogHeader>
            <DialogTitle>Add Fee Item</DialogTitle>
          </DialogHeader>
          <FeeMasterFormFields form={addForm} onChange={setAddForm} />
          <DialogFooter>
            <Button
              variant="outline"
              data-ocid="settings.fee_master.add_cancel_button"
              onClick={() => setShowAddModal(false)}
            >
              Cancel
            </Button>
            <Button
              data-ocid="settings.fee_master.add_submit_button"
              disabled={
                createMutation.isPending ||
                !addForm.name ||
                !addForm.defaultAmount ||
                !addForm.category
              }
              onClick={() => createMutation.mutate(addForm)}
            >
              {createMutation.isPending ? "Adding…" : "Add Fee Item"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
      >
        <AlertDialogContent data-ocid="settings.fee_master.delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Fee Item?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete <strong>{deleteTarget?.name}</strong>
              . This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="settings.fee_master.delete_cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="settings.fee_master.delete_confirm_button"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteMutation.isPending}
              onClick={() =>
                deleteTarget && deleteMutation.mutate(deleteTarget.id)
              }
            >
              {deleteMutation.isPending ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ── Service Charges Section ───────────────────────────────────────────────────

type ChargeFormState = {
  serviceType: ServiceType | "";
  description: string;
  amount: string;
};

const EMPTY_CHARGE_FORM: ChargeFormState = {
  serviceType: "",
  description: "",
  amount: "",
};

function ChargeFormFields({
  form,
  onChange,
  requireServiceType = true,
}: {
  form: ChargeFormState;
  onChange: (f: ChargeFormState) => void;
  requireServiceType?: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <Label>Service Type</Label>
        <Select
          value={form.serviceType || ""}
          onValueChange={(v) =>
            onChange({ ...form, serviceType: v as ServiceType })
          }
          required={requireServiceType}
        >
          <SelectTrigger data-ocid="settings.charge_service_type.select">
            <SelectValue placeholder="Select service type…" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(ServiceType).map((st) => (
              <SelectItem key={st} value={st}>
                {SERVICE_TYPE_LABELS[st]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label>Description</Label>
        <Input
          data-ocid="settings.charge_description.input"
          value={form.description}
          onChange={(e) => onChange({ ...form, description: e.target.value })}
          placeholder="e.g., Government Fee, Professional Charges"
          required
        />
      </div>
      <div className="space-y-1.5">
        <Label>Amount (₹)</Label>
        <Input
          type="number"
          min="0"
          step="0.01"
          data-ocid="settings.charge_amount.input"
          value={form.amount}
          onChange={(e) => onChange({ ...form, amount: e.target.value })}
          placeholder="0.00"
          required
        />
      </div>
    </div>
  );
}

function ServiceChargesSection() {
  const {
    listServiceCharges,
    createServiceCharge,
    updateServiceCharge,
    deleteServiceCharge,
  } = useBackend();
  const queryClient = useQueryClient();

  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState<ChargeFormState>(EMPTY_CHARGE_FORM);
  const [editingId, setEditingId] = useState<bigint | null>(null);
  const [editForm, setEditForm] = useState<ChargeFormState>(EMPTY_CHARGE_FORM);
  const [deleteTarget, setDeleteTarget] = useState<ServiceCharge | null>(null);

  const { data: charges = [], isLoading } = useQuery<ServiceCharge[]>({
    queryKey: ["serviceCharges"],
    queryFn: listServiceCharges,
  });

  // Group by service type for display
  const grouped = Object.values(ServiceType).reduce<
    Record<string, ServiceCharge[]>
  >((acc, st) => {
    const items = charges.filter((c) => c.serviceType === st);
    if (items.length > 0) acc[st] = items;
    return acc;
  }, {});

  const createMutation = useMutation({
    mutationFn: (f: ChargeFormState) =>
      createServiceCharge(
        f.serviceType as ServiceType,
        f.description,
        Number.parseFloat(f.amount || "0"),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceCharges"] });
      toast.success("Service charge added");
      setShowAddModal(false);
      setAddForm(EMPTY_CHARGE_FORM);
    },
    onError: () => toast.error("Failed to add service charge"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, f }: { id: bigint; f: ChargeFormState }) =>
      updateServiceCharge(
        id,
        f.serviceType ? (f.serviceType as ServiceType) : null,
        f.description || null,
        f.amount ? Number.parseFloat(f.amount) : null,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceCharges"] });
      toast.success("Service charge updated");
      setEditingId(null);
    },
    onError: () => toast.error("Failed to update service charge"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: bigint) => deleteServiceCharge(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceCharges"] });
      toast.success("Service charge deleted");
      setDeleteTarget(null);
    },
    onError: () => toast.error("Failed to delete service charge"),
  });

  function startEdit(c: ServiceCharge) {
    setEditingId(c.id);
    setEditForm({
      serviceType: c.serviceType,
      description: c.description,
      amount: c.amount.toString(),
    });
  }

  if (isLoading) {
    return (
      <div className="space-y-2" data-ocid="settings.charges.loading_state">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-12 w-full rounded-md" />
        ))}
      </div>
    );
  }

  // Flat list with index for data-ocid
  const flatCharges = charges;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {charges.length} charge{charges.length !== 1 ? "s" : ""} defined
        </p>
        <Button
          size="sm"
          data-ocid="settings.charges.add_button"
          onClick={() => {
            setAddForm(EMPTY_CHARGE_FORM);
            setShowAddModal(true);
          }}
        >
          <Plus size={14} className="mr-1.5" />
          Add Service Charge
        </Button>
      </div>

      {charges.length === 0 ? (
        <div
          data-ocid="settings.charges.empty_state"
          className="text-center py-10 text-muted-foreground text-sm border border-dashed border-border rounded-lg"
        >
          No service charges defined yet. Add charges per service type to
          auto-populate bills.
        </div>
      ) : (
        <div className="space-y-3" data-ocid="settings.charges.list">
          {Object.entries(grouped).map(([st, items]) => (
            <div
              key={st}
              className="rounded-lg border border-border overflow-hidden"
            >
              <div className="bg-primary/5 px-4 py-2 border-b border-border">
                <p className="text-xs font-semibold text-primary uppercase tracking-wide">
                  {SERVICE_TYPE_LABELS[st as ServiceType]}
                </p>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  {items.map((c) => {
                    const flatIdx = flatCharges.findIndex((x) => x.id === c.id);
                    return editingId === c.id ? (
                      <tr
                        key={c.id.toString()}
                        data-ocid={`settings.charges.item.${flatIdx + 1}`}
                        className="border-b border-border last:border-0 bg-primary/5"
                      >
                        <td colSpan={3} className="px-4 py-3">
                          <ChargeFormFields
                            form={editForm}
                            onChange={setEditForm}
                          />
                          <div className="flex gap-2 mt-3 justify-end">
                            <Button
                              size="sm"
                              variant="outline"
                              data-ocid="settings.charges.edit_cancel_button"
                              onClick={() => setEditingId(null)}
                            >
                              <X size={14} className="mr-1" />
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              data-ocid="settings.charges.edit_save_button"
                              disabled={updateMutation.isPending}
                              onClick={() =>
                                updateMutation.mutate({
                                  id: c.id,
                                  f: editForm,
                                })
                              }
                            >
                              <Check size={14} className="mr-1" />
                              {updateMutation.isPending ? "Saving…" : "Save"}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <tr
                        key={c.id.toString()}
                        data-ocid={`settings.charges.item.${flatIdx + 1}`}
                        className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors duration-150"
                      >
                        <td className="px-4 py-3 text-foreground">
                          {c.description}
                        </td>
                        <td className="px-4 py-3 text-right font-mono font-medium text-foreground">
                          ₹
                          {c.amount.toLocaleString("en-IN", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-4 py-3 w-20">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              data-ocid={`settings.charges.edit_button.${flatIdx + 1}`}
                              onClick={() => startEdit(c)}
                              aria-label="Edit charge"
                            >
                              <Pencil size={13} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive hover:text-destructive"
                              data-ocid={`settings.charges.delete_button.${flatIdx + 1}`}
                              onClick={() => setDeleteTarget(c)}
                              aria-label="Delete charge"
                            >
                              <Trash2 size={13} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      <Dialog
        open={showAddModal}
        onOpenChange={(v) => {
          setShowAddModal(v);
          if (!v) setAddForm(EMPTY_CHARGE_FORM);
        }}
      >
        <DialogContent data-ocid="settings.charges.add_dialog">
          <DialogHeader>
            <DialogTitle>Add Service Charge</DialogTitle>
          </DialogHeader>
          <ChargeFormFields form={addForm} onChange={setAddForm} />
          <DialogFooter>
            <Button
              variant="outline"
              data-ocid="settings.charges.add_cancel_button"
              onClick={() => setShowAddModal(false)}
            >
              Cancel
            </Button>
            <Button
              data-ocid="settings.charges.add_submit_button"
              disabled={
                createMutation.isPending ||
                !addForm.serviceType ||
                !addForm.description ||
                !addForm.amount
              }
              onClick={() => createMutation.mutate(addForm)}
            >
              {createMutation.isPending ? "Adding…" : "Add Charge"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
      >
        <AlertDialogContent data-ocid="settings.charges.delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Service Charge?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <strong>{deleteTarget?.description}</strong>. This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="settings.charges.delete_cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="settings.charges.delete_confirm_button"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteMutation.isPending}
              onClick={() =>
                deleteTarget && deleteMutation.mutate(deleteTarget.id)
              }
            >
              {deleteMutation.isPending ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ── FDA Office Details Section ────────────────────────────────────────────────

const EMPTY_FDA: FdaOfficeDetails = {
  officeName: "",
  address: "",
  officerName: "",
  contact: "",
};

function FdaOfficeDetailsSection() {
  const { getFdaOfficeDetails, setFdaOfficeDetails } = useBackend();
  const [form, setForm] = useState<FdaOfficeDetails>(EMPTY_FDA);

  const { data, isLoading } = useQuery<FdaOfficeDetails | null>({
    queryKey: ["fdaOfficeDetails"],
    queryFn: getFdaOfficeDetails,
  });

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const mutation = useMutation({
    mutationFn: (details: FdaOfficeDetails) => setFdaOfficeDetails(details),
    onSuccess: () => toast.success("FDA Office details saved"),
    onError: () => toast.error("Failed to save FDA Office details"),
  });

  function handleChange(field: keyof FdaOfficeDetails, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    mutation.mutate(form);
  }

  if (isLoading) {
    return (
      <div className="space-y-3" data-ocid="settings.fda.loading_state">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-9 w-full rounded-md" />
        ))}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      data-ocid="settings.fda.form"
    >
      <p className="text-xs text-muted-foreground">
        These details auto-fill into Plan Layout and other forms requiring FDA
        Office information.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="fda-office-name">Office Name</Label>
          <Input
            id="fda-office-name"
            data-ocid="settings.fda_office_name.input"
            value={form.officeName}
            onChange={(e) => handleChange("officeName", e.target.value)}
            placeholder="FDA Office, Mumbai Division"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="fda-officer-name">Officer Name</Label>
          <Input
            id="fda-officer-name"
            data-ocid="settings.fda_officer_name.input"
            value={form.officerName}
            onChange={(e) => handleChange("officerName", e.target.value)}
            placeholder="Mr. / Mrs. Officer Name"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="fda-contact">Contact Number</Label>
          <Input
            id="fda-contact"
            data-ocid="settings.fda_contact.input"
            value={form.contact}
            onChange={(e) => handleChange("contact", e.target.value)}
            placeholder="+91 22 1234 5678"
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="fda-address">Office Address</Label>
          <Textarea
            id="fda-address"
            data-ocid="settings.fda_address.input"
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="Full office address"
            rows={3}
            className="resize-none"
          />
        </div>
      </div>
      <div className="flex justify-end pt-1">
        <Button
          type="submit"
          data-ocid="settings.fda.submit_button"
          disabled={mutation.isPending || !form.officeName}
          className="min-w-[120px]"
        >
          {mutation.isPending ? "Saving…" : "Save Details"}
        </Button>
      </div>
    </form>
  );
}

// ── Change Password Section ───────────────────────────────────────────────────

function ChangePasswordSection() {
  const { session } = useAuth();
  const { changePassword } = useBackend();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const mutation = useMutation({
    mutationFn: async ({
      userId,
      newPw,
    }: {
      userId: bigint;
      newPw: string;
    }) => {
      const newHash = await hashPassword(newPw);
      const result = await changePassword(userId, newHash);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      toast.success("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setConfirmError("");
    },
    onError: (err: Error) =>
      toast.error(err.message || "Failed to change password"),
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setConfirmError("Passwords do not match");
      return;
    }
    setConfirmError("");
    if (!session) return;
    mutation.mutate({
      userId: BigInt(session.userId),
      newPw: newPassword,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md"
      data-ocid="settings.password.form"
    >
      <div className="space-y-1.5">
        <Label htmlFor="current-password">Current Password</Label>
        <Input
          id="current-password"
          type="password"
          data-ocid="settings.current_password.input"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Enter current password"
          required
          autoComplete="current-password"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="new-password">New Password</Label>
        <Input
          id="new-password"
          type="password"
          data-ocid="settings.new_password.input"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          required
          autoComplete="new-password"
          minLength={6}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="confirm-password">Confirm New Password</Label>
        <Input
          id="confirm-password"
          type="password"
          data-ocid="settings.confirm_password.input"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (confirmError) setConfirmError("");
          }}
          placeholder="Re-enter new password"
          required
          autoComplete="new-password"
        />
        {confirmError && (
          <p
            data-ocid="settings.confirm_password.field_error"
            className="text-xs text-destructive mt-1"
          >
            {confirmError}
          </p>
        )}
      </div>
      <div className="flex justify-end pt-1">
        <Button
          type="submit"
          data-ocid="settings.password.submit_button"
          disabled={
            mutation.isPending ||
            !currentPassword ||
            !newPassword ||
            !confirmPassword
          }
          className="min-w-[150px]"
        >
          {mutation.isPending ? "Updating…" : "Change Password"}
        </Button>
      </div>
      {mutation.isSuccess && (
        <p
          data-ocid="settings.password.success_state"
          className="text-sm text-green-600 font-medium"
        >
          Password updated successfully.
        </p>
      )}
    </form>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  return (
    <div
      data-ocid="settings.page"
      className="space-y-4 max-w-4xl mx-auto py-6 px-4 sm:px-6"
    >
      <div className="mb-2">
        <h1 className="text-xl sm:text-2xl font-display font-bold text-foreground">
          Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage company information, service charges, master data, and account
          security.
        </p>
      </div>

      <Section
        id="company"
        icon={Building2}
        title="Company Information"
        subtitle="Name, address, phone and email shown on reports and forms"
        defaultOpen
      >
        <CompanyInfoSection />
      </Section>

      <Section
        id="fee_master"
        icon={Receipt}
        title="Fee Master / Pre-defined Fees"
        subtitle="Reusable fee items (Professional, Government, etc.) for itemized bill generation"
      >
        <FeeMasterSection />
      </Section>

      <Section
        id="fees"
        icon={DollarSign}
        title="Predefined Fees"
        subtitle="Fee templates used when creating or updating applications"
      >
        <FeeTemplatesSection />
      </Section>

      <Section
        id="charges"
        icon={DollarSign}
        title="Service Charges"
        subtitle="Predefined itemized charges per service type — auto-populate into Bills"
      >
        <ServiceChargesSection />
      </Section>

      <Section
        id="fda"
        icon={FlaskConical}
        title="FDA Office Details"
        subtitle="Auto-fill into Plan Layout and other FDA-related forms"
      >
        <FdaOfficeDetailsSection />
      </Section>

      <Section
        id="password"
        icon={Lock}
        title="Change Password"
        subtitle="Update your admin account password"
      >
        <ChangePasswordSection />
      </Section>
    </div>
  );
}
