import { c as createLucideIcon, j as jsxRuntimeExports, o as Building2, p as Lock, r as reactExports, L as Label, I as Input, B as Button, d as useQueryClient, X, S as ServiceType, k as useAuth, q as hashPassword } from "./index-BaKwMJOS.js";
import { R as Receipt, T as Textarea, P as Pencil, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter, A as AlertDialog, e as AlertDialogContent, f as AlertDialogHeader, g as AlertDialogTitle, h as AlertDialogDescription, i as AlertDialogFooter, j as AlertDialogCancel, k as AlertDialogAction } from "./dialog-ClEKZtoU.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Cd_o80Bj.js";
import { S as Skeleton } from "./skeleton-Dj-iI3Sb.js";
import { u as useBackend } from "./useBackend-CAwnRSrn.js";
import { u as useQuery } from "./useQuery-8ND6lXoR.js";
import { u as useMutation, a as ue, T as Trash2 } from "./index-BwOopk-B.js";
import { C as ChevronUp, a as ChevronDown, b as Check } from "./index-CaVeNIJ0.js";
import { P as Plus } from "./plus-BoDfY95M.js";
import "./index-MAa7LfqA.js";
import "./index-Bz9Vyaf-.js";
import "./index-Dj7rYGXi.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }]
];
const DollarSign = createLucideIcon("dollar-sign", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",
      key: "18mbvz"
    }
  ],
  ["path", { d: "M6.453 15h11.094", key: "3shlmq" }],
  ["path", { d: "M8.5 2h7", key: "csnxdl" }]
];
const FlaskConical = createLucideIcon("flask-conical", __iconNode);
const SERVICE_TYPE_LABELS = {
  [ServiceType.DrugLicenceNewFirm]: "Drug Licence – New Firm",
  [ServiceType.DrugLicenceRenewal]: "Drug Licence – Renewal",
  [ServiceType.DrugLicenceChangePremise]: "Drug Licence – Change Premise",
  [ServiceType.DrugLicenceAlterationOfPremise]: "Drug Licence – Alteration of Premise",
  [ServiceType.DrugLicenceChangeConstitution]: "Drug Licence – Change Constitution",
  [ServiceType.DrugLicenceAddPharmacist]: "Drug Licence – Add Pharmacist",
  [ServiceType.DrugLicenceRemovePharmacist]: "Drug Licence – Remove Pharmacist",
  [ServiceType.FoodLicenceNew]: "Food Licence / FSSAI – New",
  [ServiceType.FoodLicenceRenewal]: "Food Licence / FSSAI – Renewal",
  [ServiceType.GSTRegistration]: "GST Registration",
  [ServiceType.MSMEUdyam]: "MSME / Udyam",
  [ServiceType.Other]: "Other"
};
function serviceLabel(st) {
  if (!st) return "All Types";
  return SERVICE_TYPE_LABELS[st] ?? st;
}
function Section({
  id,
  icon: Icon,
  title,
  subtitle,
  children,
  defaultOpen = false
}) {
  const [open, setOpen] = reactExports.useState(defaultOpen);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `settings.${id}.section`,
      className: "bg-card border border-border rounded-xl overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full flex items-center justify-between px-4 sm:px-6 py-4 hover:bg-muted/30 transition-colors duration-200 min-h-[56px]",
            onClick: () => setOpen((v) => !v),
            "aria-expanded": open,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: subtitle })
                ] })
              ] }),
              open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 16, className: "text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 16, className: "text-muted-foreground" })
            ]
          }
        ),
        open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border px-4 sm:px-6 py-5", children })
      ]
    }
  );
}
const DEFAULT_FDA_ADDRESS = "Assistant Commissioner, Food & Drug Administration (Drug) Buldhana (MH)";
function CompanyInfoSection() {
  const { getCompanyInfo, setCompanyInfo } = useBackend();
  const [form, setForm] = reactExports.useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    fdaAddress: ""
  });
  const { data, isLoading } = useQuery({
    queryKey: ["companyInfo"],
    queryFn: getCompanyInfo
  });
  reactExports.useEffect(() => {
    if (data) setForm(data);
  }, [data]);
  const mutation = useMutation({
    mutationFn: (info) => setCompanyInfo(info),
    onSuccess: () => ue.success("Company info saved successfully"),
    onError: () => ue.error("Failed to save company info")
  });
  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate(form);
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "settings.company.loading_state", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full rounded-md" }, i)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "space-y-4",
      "data-ocid": "settings.company.form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "company-name", children: "Company Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "company-name",
                "data-ocid": "settings.company_name.input",
                value: form.name,
                onChange: (e) => handleChange("name", e.target.value),
                placeholder: "Barote Consultancy",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "company-phone", children: "Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "company-phone",
                "data-ocid": "settings.company_phone.input",
                value: form.phone,
                onChange: (e) => handleChange("phone", e.target.value),
                placeholder: "+91 98765 43210"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "company-address", children: "Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "company-address",
                "data-ocid": "settings.company_address.input",
                value: form.address,
                onChange: (e) => handleChange("address", e.target.value),
                placeholder: "123 Main Street, City, State – PIN"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "company-email", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "company-email",
                type: "email",
                "data-ocid": "settings.company_email.input",
                value: form.email,
                onChange: (e) => handleChange("email", e.target.value),
                placeholder: "info@baroteconsultancy.com"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "company-fda-address", children: "Default FDA Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "company-fda-address",
                "data-ocid": "settings.company_fda_address.input",
                value: form.fdaAddress || "",
                onChange: (e) => handleChange("fdaAddress", e.target.value),
                placeholder: DEFAULT_FDA_ADDRESS,
                rows: 3,
                className: "resize-none"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "This address pre-fills in all new application FDA Covering Letters" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            "data-ocid": "settings.company.submit_button",
            disabled: mutation.isPending,
            className: "min-w-[110px]",
            children: mutation.isPending ? "Saving…" : "Save Changes"
          }
        ) })
      ]
    }
  );
}
const EMPTY_FEE_FORM = {
  name: "",
  serviceType: "",
  amount: "",
  description: ""
};
function FeeFormFields({
  form,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Fee Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "settings.fee_name.input",
          value: form.name,
          onChange: (e) => onChange({ ...form, name: e.target.value }),
          placeholder: "e.g., Drug Licence Application Fee",
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Service Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: form.serviceType || "all",
            onValueChange: (v) => onChange({
              ...form,
              serviceType: v === "all" ? "" : v
            }),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "settings.fee_service_type.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Types" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Types" }),
                Object.values(ServiceType).map((st) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: st, children: SERVICE_TYPE_LABELS[st] }, st))
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Amount (₹)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            min: "0",
            "data-ocid": "settings.fee_amount.input",
            value: form.amount,
            onChange: (e) => onChange({ ...form, amount: e.target.value }),
            placeholder: "0",
            required: true
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "settings.fee_description.input",
          value: form.description,
          onChange: (e) => onChange({ ...form, description: e.target.value }),
          placeholder: "Optional description"
        }
      )
    ] })
  ] });
}
function FeeTemplatesSection() {
  const {
    listFeeTemplates,
    createFeeTemplate,
    updateFeeTemplate,
    deleteFeeTemplate
  } = useBackend();
  const queryClient = useQueryClient();
  const [showAddModal, setShowAddModal] = reactExports.useState(false);
  const [addForm, setAddForm] = reactExports.useState(EMPTY_FEE_FORM);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [editForm, setEditForm] = reactExports.useState(EMPTY_FEE_FORM);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const { data: templates = [], isLoading } = useQuery({
    queryKey: ["feeTemplates"],
    queryFn: listFeeTemplates
  });
  const createMutation = useMutation({
    mutationFn: (f) => createFeeTemplate(
      f.name,
      f.serviceType ? f.serviceType : null,
      BigInt(f.amount || "0"),
      f.description
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeTemplates"] });
      ue.success("Fee template added");
      setShowAddModal(false);
      setAddForm(EMPTY_FEE_FORM);
    },
    onError: () => ue.error("Failed to add fee template")
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, f }) => updateFeeTemplate(
      id,
      f.name || null,
      f.serviceType ? { __kind__: "Some", value: f.serviceType } : { __kind__: "Some", value: null },
      f.amount ? BigInt(f.amount) : null,
      f.description || null
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeTemplates"] });
      ue.success("Fee template updated");
      setEditingId(null);
    },
    onError: () => ue.error("Failed to update fee template")
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteFeeTemplate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeTemplates"] });
      ue.success("Fee template deleted");
      setDeleteTarget(null);
    },
    onError: () => ue.error("Failed to delete fee template")
  });
  function startEdit(t) {
    setEditingId(t.id);
    setEditForm({
      name: t.name,
      serviceType: t.serviceType ?? "",
      amount: t.amount.toString(),
      description: t.description
    });
  }
  function cancelEdit() {
    setEditingId(null);
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "settings.fees.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-md" }, i)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        templates.length,
        " template",
        templates.length !== 1 ? "s" : "",
        " defined"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          "data-ocid": "settings.fees.add_button",
          onClick: () => {
            setAddForm(EMPTY_FEE_FORM);
            setShowAddModal(true);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14, className: "mr-1.5" }),
            "Add Fee Template"
          ]
        }
      )
    ] }),
    templates.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "settings.fees.empty_state",
        className: "text-center py-10 text-muted-foreground text-sm border border-dashed border-border rounded-lg",
        children: "No fee templates yet. Add one to get started."
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border overflow-hidden overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm min-w-[400px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Fee Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Service Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-medium text-muted-foreground", children: "Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-medium text-muted-foreground w-24", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { "data-ocid": "settings.fees.table", children: templates.map(
        (t, idx) => editingId === t.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "tr",
          {
            "data-ocid": `settings.fees.item.${idx + 1}`,
            className: "border-b border-border last:border-0 bg-primary/5",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 4, className: "px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FeeFormFields, { form: editForm, onChange: setEditForm }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-3 justify-end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    "data-ocid": "settings.fees.edit_cancel_button",
                    onClick: cancelEdit,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14, className: "mr-1" }),
                      "Cancel"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    "data-ocid": "settings.fees.edit_save_button",
                    disabled: updateMutation.isPending,
                    onClick: () => updateMutation.mutate({ id: t.id, f: editForm }),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14, className: "mr-1" }),
                      updateMutation.isPending ? "Saving…" : "Save"
                    ]
                  }
                )
              ] })
            ] })
          },
          t.id.toString()
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            "data-ocid": `settings.fees.item.${idx + 1}`,
            className: "border-b border-border last:border-0 hover:bg-muted/20 transition-colors duration-150",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: t.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: serviceLabel(t.serviceType) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-mono font-medium", children: [
                "₹",
                t.amount.toLocaleString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "h-7 w-7",
                    "data-ocid": `settings.fees.edit_button.${idx + 1}`,
                    onClick: () => startEdit(t),
                    "aria-label": "Edit fee template",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 13 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "h-7 w-7 text-destructive hover:text-destructive",
                    "data-ocid": `settings.fees.delete_button.${idx + 1}`,
                    onClick: () => setDeleteTarget(t),
                    "aria-label": "Delete fee template",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 })
                  }
                )
              ] }) })
            ]
          },
          t.id.toString()
        )
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: showAddModal,
        onOpenChange: (v) => {
          setShowAddModal(v);
          if (!v) setAddForm(EMPTY_FEE_FORM);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "settings.fees.add_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add Fee Template" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FeeFormFields, { form: addForm, onChange: setAddForm }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                "data-ocid": "settings.fees.add_cancel_button",
                onClick: () => setShowAddModal(false),
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "settings.fees.add_submit_button",
                disabled: createMutation.isPending || !addForm.name || !addForm.amount,
                onClick: () => createMutation.mutate(addForm),
                children: createMutation.isPending ? "Adding…" : "Add Template"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!deleteTarget,
        onOpenChange: (v) => !v && setDeleteTarget(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "settings.fees.delete_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Fee Template?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              "This will permanently delete ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: deleteTarget == null ? void 0 : deleteTarget.name }),
              ". This action cannot be undone."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "settings.fees.delete_cancel_button", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                "data-ocid": "settings.fees.delete_confirm_button",
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                disabled: deleteMutation.isPending,
                onClick: () => deleteTarget && deleteMutation.mutate(deleteTarget.id),
                children: deleteMutation.isPending ? "Deleting…" : "Delete"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
const FEE_CATEGORIES = [
  "Government",
  "Professional",
  "Miscellaneous",
  "Other"
];
const EMPTY_FEE_ITEM_FORM = {
  name: "",
  defaultAmount: "",
  category: "",
  description: ""
};
function FeeMasterFormFields({
  form,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Fee Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "settings.fee_master_name.input",
          value: form.name,
          onChange: (e) => onChange({ ...form, name: e.target.value }),
          placeholder: "e.g., Professional Fees, Government Fees",
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Default Amount (₹)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            min: "0",
            step: "0.01",
            "data-ocid": "settings.fee_master_amount.input",
            value: form.defaultAmount,
            onChange: (e) => onChange({ ...form, defaultAmount: e.target.value }),
            placeholder: "0.00",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: form.category || "",
            onValueChange: (v) => onChange({ ...form, category: v }),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "settings.fee_master_category.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select category…" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: FEE_CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
        "Description",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(optional)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "settings.fee_master_description.input",
          value: form.description,
          onChange: (e) => onChange({ ...form, description: e.target.value }),
          placeholder: "Brief description of this fee item"
        }
      )
    ] })
  ] });
}
const CATEGORY_BADGE_STYLES = {
  Government: "bg-blue-100 text-blue-700",
  Professional: "bg-purple-100 text-purple-700",
  Miscellaneous: "bg-orange-100 text-orange-700",
  Other: "bg-muted text-muted-foreground"
};
function FeeMasterSection() {
  const { listFeeItems, createFeeItem, updateFeeItem, deleteFeeItem } = useBackend();
  const queryClient = useQueryClient();
  const [showAddModal, setShowAddModal] = reactExports.useState(false);
  const [addForm, setAddForm] = reactExports.useState(EMPTY_FEE_ITEM_FORM);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [editForm, setEditForm] = reactExports.useState(EMPTY_FEE_ITEM_FORM);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["feeItems"],
    queryFn: listFeeItems
  });
  const createMutation = useMutation({
    mutationFn: (f) => createFeeItem(
      f.name,
      f.description || null,
      Number.parseFloat(f.defaultAmount || "0"),
      f.category || "Other"
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeItems"] });
      ue.success("Fee item added");
      setShowAddModal(false);
      setAddForm(EMPTY_FEE_ITEM_FORM);
    },
    onError: () => ue.error("Failed to add fee item")
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, f }) => updateFeeItem(
      id,
      f.name || null,
      f.description ? { __kind__: "Some", value: f.description } : { __kind__: "Some", value: null },
      f.defaultAmount ? Number.parseFloat(f.defaultAmount) : null,
      f.category || null
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeItems"] });
      ue.success("Fee item updated");
      setEditingId(null);
    },
    onError: () => ue.error("Failed to update fee item")
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteFeeItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeItems"] });
      ue.success("Fee item deleted");
      setDeleteTarget(null);
    },
    onError: () => ue.error("Failed to delete fee item")
  });
  function startEdit(item) {
    setEditingId(item.id);
    setEditForm({
      name: item.name,
      defaultAmount: item.defaultAmount.toString(),
      category: item.category ?? "",
      description: item.description ?? ""
    });
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "settings.fee_master.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-md" }, i)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        items.length,
        " fee item",
        items.length !== 1 ? "s" : "",
        " defined"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          "data-ocid": "settings.fee_master.add_button",
          onClick: () => {
            setAddForm(EMPTY_FEE_ITEM_FORM);
            setShowAddModal(true);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14, className: "mr-1.5" }),
            "Add Fee Item"
          ]
        }
      )
    ] }),
    items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "settings.fee_master.empty_state",
        className: "text-center py-10 text-muted-foreground text-sm border border-dashed border-border rounded-lg",
        children: "No fee items yet. Add pre-defined fees to auto-populate bills."
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border overflow-hidden overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm min-w-[400px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Fee Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-medium text-muted-foreground", children: "Default Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-medium text-muted-foreground w-24", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { "data-ocid": "settings.fee_master.table", children: items.map(
        (item, idx) => editingId === item.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "tr",
          {
            "data-ocid": `settings.fee_master.item.${idx + 1}`,
            className: "border-b border-border last:border-0 bg-primary/5",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 4, className: "px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FeeMasterFormFields,
                {
                  form: editForm,
                  onChange: setEditForm
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-3 justify-end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    "data-ocid": "settings.fee_master.edit_cancel_button",
                    onClick: () => setEditingId(null),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14, className: "mr-1" }),
                      "Cancel"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    "data-ocid": "settings.fee_master.edit_save_button",
                    disabled: updateMutation.isPending,
                    onClick: () => updateMutation.mutate({ id: item.id, f: editForm }),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14, className: "mr-1" }),
                      updateMutation.isPending ? "Saving…" : "Save"
                    ]
                  }
                )
              ] })
            ] })
          },
          item.id
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            "data-ocid": `settings.fee_master.item.${idx + 1}`,
            className: "border-b border-border last:border-0 hover:bg-muted/20 transition-colors duration-150",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: item.name }),
                item.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 truncate max-w-[220px]", children: item.description })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${CATEGORY_BADGE_STYLES[item.category] ?? CATEGORY_BADGE_STYLES.Other}`,
                  children: item.category
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-mono font-medium text-foreground", children: [
                "₹",
                item.defaultAmount.toLocaleString("en-IN", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2
                })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "h-7 w-7",
                    "data-ocid": `settings.fee_master.edit_button.${idx + 1}`,
                    onClick: () => startEdit(item),
                    "aria-label": "Edit fee item",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 13 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "h-7 w-7 text-destructive hover:text-destructive",
                    "data-ocid": `settings.fee_master.delete_button.${idx + 1}`,
                    onClick: () => setDeleteTarget(item),
                    "aria-label": "Delete fee item",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 })
                  }
                )
              ] }) })
            ]
          },
          item.id
        )
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: showAddModal,
        onOpenChange: (v) => {
          setShowAddModal(v);
          if (!v) setAddForm(EMPTY_FEE_ITEM_FORM);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "settings.fee_master.add_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add Fee Item" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FeeMasterFormFields, { form: addForm, onChange: setAddForm }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                "data-ocid": "settings.fee_master.add_cancel_button",
                onClick: () => setShowAddModal(false),
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "settings.fee_master.add_submit_button",
                disabled: createMutation.isPending || !addForm.name || !addForm.defaultAmount || !addForm.category,
                onClick: () => createMutation.mutate(addForm),
                children: createMutation.isPending ? "Adding…" : "Add Fee Item"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!deleteTarget,
        onOpenChange: (v) => !v && setDeleteTarget(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "settings.fee_master.delete_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Fee Item?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              "This will permanently delete ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: deleteTarget == null ? void 0 : deleteTarget.name }),
              ". This action cannot be undone."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "settings.fee_master.delete_cancel_button", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                "data-ocid": "settings.fee_master.delete_confirm_button",
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                disabled: deleteMutation.isPending,
                onClick: () => deleteTarget && deleteMutation.mutate(deleteTarget.id),
                children: deleteMutation.isPending ? "Deleting…" : "Delete"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
const EMPTY_CHARGE_FORM = {
  serviceType: "",
  description: "",
  amount: ""
};
function ChargeFormFields({
  form,
  onChange,
  requireServiceType = true
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Service Type" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: form.serviceType || "",
          onValueChange: (v) => onChange({ ...form, serviceType: v }),
          required: requireServiceType,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "settings.charge_service_type.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select service type…" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.values(ServiceType).map((st) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: st, children: SERVICE_TYPE_LABELS[st] }, st)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "settings.charge_description.input",
          value: form.description,
          onChange: (e) => onChange({ ...form, description: e.target.value }),
          placeholder: "e.g., Government Fee, Professional Charges",
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Amount (₹)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          type: "number",
          min: "0",
          step: "0.01",
          "data-ocid": "settings.charge_amount.input",
          value: form.amount,
          onChange: (e) => onChange({ ...form, amount: e.target.value }),
          placeholder: "0.00",
          required: true
        }
      )
    ] })
  ] });
}
function ServiceChargesSection() {
  const {
    listServiceCharges,
    createServiceCharge,
    updateServiceCharge,
    deleteServiceCharge
  } = useBackend();
  const queryClient = useQueryClient();
  const [showAddModal, setShowAddModal] = reactExports.useState(false);
  const [addForm, setAddForm] = reactExports.useState(EMPTY_CHARGE_FORM);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [editForm, setEditForm] = reactExports.useState(EMPTY_CHARGE_FORM);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const { data: charges = [], isLoading } = useQuery({
    queryKey: ["serviceCharges"],
    queryFn: listServiceCharges
  });
  const grouped = Object.values(ServiceType).reduce((acc, st) => {
    const items = charges.filter((c) => c.serviceType === st);
    if (items.length > 0) acc[st] = items;
    return acc;
  }, {});
  const createMutation = useMutation({
    mutationFn: (f) => createServiceCharge(
      f.serviceType,
      f.description,
      Number.parseFloat(f.amount || "0")
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceCharges"] });
      ue.success("Service charge added");
      setShowAddModal(false);
      setAddForm(EMPTY_CHARGE_FORM);
    },
    onError: () => ue.error("Failed to add service charge")
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, f }) => updateServiceCharge(
      id,
      f.serviceType ? f.serviceType : null,
      f.description || null,
      f.amount ? Number.parseFloat(f.amount) : null
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceCharges"] });
      ue.success("Service charge updated");
      setEditingId(null);
    },
    onError: () => ue.error("Failed to update service charge")
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteServiceCharge(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceCharges"] });
      ue.success("Service charge deleted");
      setDeleteTarget(null);
    },
    onError: () => ue.error("Failed to delete service charge")
  });
  function startEdit(c) {
    setEditingId(c.id);
    setEditForm({
      serviceType: c.serviceType,
      description: c.description,
      amount: c.amount.toString()
    });
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "settings.charges.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-md" }, i)) });
  }
  const flatCharges = charges;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        charges.length,
        " charge",
        charges.length !== 1 ? "s" : "",
        " defined"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          "data-ocid": "settings.charges.add_button",
          onClick: () => {
            setAddForm(EMPTY_CHARGE_FORM);
            setShowAddModal(true);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14, className: "mr-1.5" }),
            "Add Service Charge"
          ]
        }
      )
    ] }),
    charges.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "settings.charges.empty_state",
        className: "text-center py-10 text-muted-foreground text-sm border border-dashed border-border rounded-lg",
        children: "No service charges defined yet. Add charges per service type to auto-populate bills."
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "settings.charges.list", children: Object.entries(grouped).map(([st, items]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-lg border border-border overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary/5 px-4 py-2 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary uppercase tracking-wide", children: SERVICE_TYPE_LABELS[st] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("table", { className: "w-full text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: items.map((c) => {
            const flatIdx = flatCharges.findIndex((x) => x.id === c.id);
            return editingId === c.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "tr",
              {
                "data-ocid": `settings.charges.item.${flatIdx + 1}`,
                className: "border-b border-border last:border-0 bg-primary/5",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 3, className: "px-4 py-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ChargeFormFields,
                    {
                      form: editForm,
                      onChange: setEditForm
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-3 justify-end", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        "data-ocid": "settings.charges.edit_cancel_button",
                        onClick: () => setEditingId(null),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14, className: "mr-1" }),
                          "Cancel"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        "data-ocid": "settings.charges.edit_save_button",
                        disabled: updateMutation.isPending,
                        onClick: () => updateMutation.mutate({
                          id: c.id,
                          f: editForm
                        }),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14, className: "mr-1" }),
                          updateMutation.isPending ? "Saving…" : "Save"
                        ]
                      }
                    )
                  ] })
                ] })
              },
              c.id.toString()
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                "data-ocid": `settings.charges.item.${flatIdx + 1}`,
                className: "border-b border-border last:border-0 hover:bg-muted/20 transition-colors duration-150",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground", children: c.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-mono font-medium text-foreground", children: [
                    "₹",
                    c.amount.toLocaleString("en-IN", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2
                    })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 w-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "icon",
                        className: "h-7 w-7",
                        "data-ocid": `settings.charges.edit_button.${flatIdx + 1}`,
                        onClick: () => startEdit(c),
                        "aria-label": "Edit charge",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 13 })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "icon",
                        className: "h-7 w-7 text-destructive hover:text-destructive",
                        "data-ocid": `settings.charges.delete_button.${flatIdx + 1}`,
                        onClick: () => setDeleteTarget(c),
                        "aria-label": "Delete charge",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 })
                      }
                    )
                  ] }) })
                ]
              },
              c.id.toString()
            );
          }) }) })
        ]
      },
      st
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: showAddModal,
        onOpenChange: (v) => {
          setShowAddModal(v);
          if (!v) setAddForm(EMPTY_CHARGE_FORM);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "settings.charges.add_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add Service Charge" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChargeFormFields, { form: addForm, onChange: setAddForm }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                "data-ocid": "settings.charges.add_cancel_button",
                onClick: () => setShowAddModal(false),
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "settings.charges.add_submit_button",
                disabled: createMutation.isPending || !addForm.serviceType || !addForm.description || !addForm.amount,
                onClick: () => createMutation.mutate(addForm),
                children: createMutation.isPending ? "Adding…" : "Add Charge"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!deleteTarget,
        onOpenChange: (v) => !v && setDeleteTarget(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "settings.charges.delete_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Service Charge?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              "This will permanently delete",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: deleteTarget == null ? void 0 : deleteTarget.description }),
              ". This action cannot be undone."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "settings.charges.delete_cancel_button", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                "data-ocid": "settings.charges.delete_confirm_button",
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                disabled: deleteMutation.isPending,
                onClick: () => deleteTarget && deleteMutation.mutate(deleteTarget.id),
                children: deleteMutation.isPending ? "Deleting…" : "Delete"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
const EMPTY_FDA = {
  officeName: "",
  address: "",
  officerName: "",
  contact: ""
};
function FdaOfficeDetailsSection() {
  const { getFdaOfficeDetails, setFdaOfficeDetails } = useBackend();
  const [form, setForm] = reactExports.useState(EMPTY_FDA);
  const { data, isLoading } = useQuery({
    queryKey: ["fdaOfficeDetails"],
    queryFn: getFdaOfficeDetails
  });
  reactExports.useEffect(() => {
    if (data) setForm(data);
  }, [data]);
  const mutation = useMutation({
    mutationFn: (details) => setFdaOfficeDetails(details),
    onSuccess: () => ue.success("FDA Office details saved"),
    onError: () => ue.error("Failed to save FDA Office details")
  });
  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate(form);
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "settings.fda.loading_state", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full rounded-md" }, i)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "space-y-4",
      "data-ocid": "settings.fda.form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "These details auto-fill into Plan Layout and other forms requiring FDA Office information." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "fda-office-name", children: "Office Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "fda-office-name",
                "data-ocid": "settings.fda_office_name.input",
                value: form.officeName,
                onChange: (e) => handleChange("officeName", e.target.value),
                placeholder: "FDA Office, Mumbai Division",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "fda-officer-name", children: "Officer Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "fda-officer-name",
                "data-ocid": "settings.fda_officer_name.input",
                value: form.officerName,
                onChange: (e) => handleChange("officerName", e.target.value),
                placeholder: "Mr. / Mrs. Officer Name"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "fda-contact", children: "Contact Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "fda-contact",
                "data-ocid": "settings.fda_contact.input",
                value: form.contact,
                onChange: (e) => handleChange("contact", e.target.value),
                placeholder: "+91 22 1234 5678"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "fda-address", children: "Office Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "fda-address",
                "data-ocid": "settings.fda_address.input",
                value: form.address,
                onChange: (e) => handleChange("address", e.target.value),
                placeholder: "Full office address",
                rows: 3,
                className: "resize-none"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            "data-ocid": "settings.fda.submit_button",
            disabled: mutation.isPending || !form.officeName,
            className: "min-w-[120px]",
            children: mutation.isPending ? "Saving…" : "Save Details"
          }
        ) })
      ]
    }
  );
}
function ChangePasswordSection() {
  const { session } = useAuth();
  const { changePassword } = useBackend();
  const [currentPassword, setCurrentPassword] = reactExports.useState("");
  const [newPassword, setNewPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [confirmError, setConfirmError] = reactExports.useState("");
  const mutation = useMutation({
    mutationFn: async ({
      userId,
      newPw
    }) => {
      const newHash = await hashPassword(newPw);
      const result = await changePassword(userId, newHash);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      ue.success("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setConfirmError("");
    },
    onError: (err) => ue.error(err.message || "Failed to change password")
  });
  function handleSubmit(e) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setConfirmError("Passwords do not match");
      return;
    }
    setConfirmError("");
    if (!session) return;
    mutation.mutate({
      userId: BigInt(session.userId),
      newPw: newPassword
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "space-y-4 max-w-md",
      "data-ocid": "settings.password.form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "current-password", children: "Current Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "current-password",
              type: "password",
              "data-ocid": "settings.current_password.input",
              value: currentPassword,
              onChange: (e) => setCurrentPassword(e.target.value),
              placeholder: "Enter current password",
              required: true,
              autoComplete: "current-password"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "new-password", children: "New Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "new-password",
              type: "password",
              "data-ocid": "settings.new_password.input",
              value: newPassword,
              onChange: (e) => setNewPassword(e.target.value),
              placeholder: "Enter new password",
              required: true,
              autoComplete: "new-password",
              minLength: 6
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "confirm-password", children: "Confirm New Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "confirm-password",
              type: "password",
              "data-ocid": "settings.confirm_password.input",
              value: confirmPassword,
              onChange: (e) => {
                setConfirmPassword(e.target.value);
                if (confirmError) setConfirmError("");
              },
              placeholder: "Re-enter new password",
              required: true,
              autoComplete: "new-password"
            }
          ),
          confirmError && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              "data-ocid": "settings.confirm_password.field_error",
              className: "text-xs text-destructive mt-1",
              children: confirmError
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            "data-ocid": "settings.password.submit_button",
            disabled: mutation.isPending || !currentPassword || !newPassword || !confirmPassword,
            className: "min-w-[150px]",
            children: mutation.isPending ? "Updating…" : "Change Password"
          }
        ) }),
        mutation.isSuccess && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            "data-ocid": "settings.password.success_state",
            className: "text-sm text-green-600 font-medium",
            children: "Password updated successfully."
          }
        )
      ]
    }
  );
}
function SettingsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "settings.page",
      className: "space-y-4 max-w-4xl mx-auto py-6 px-4 sm:px-6",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl sm:text-2xl font-display font-bold text-foreground", children: "Settings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Manage company information, service charges, master data, and account security." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Section,
          {
            id: "company",
            icon: Building2,
            title: "Company Information",
            subtitle: "Name, address, phone and email shown on reports and forms",
            defaultOpen: true,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CompanyInfoSection, {})
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Section,
          {
            id: "fee_master",
            icon: Receipt,
            title: "Fee Master / Pre-defined Fees",
            subtitle: "Reusable fee items (Professional, Government, etc.) for itemized bill generation",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FeeMasterSection, {})
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Section,
          {
            id: "fees",
            icon: DollarSign,
            title: "Predefined Fees",
            subtitle: "Fee templates used when creating or updating applications",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FeeTemplatesSection, {})
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Section,
          {
            id: "charges",
            icon: DollarSign,
            title: "Service Charges",
            subtitle: "Predefined itemized charges per service type — auto-populate into Bills",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceChargesSection, {})
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Section,
          {
            id: "fda",
            icon: FlaskConical,
            title: "FDA Office Details",
            subtitle: "Auto-fill into Plan Layout and other FDA-related forms",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FdaOfficeDetailsSection, {})
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Section,
          {
            id: "password",
            icon: Lock,
            title: "Change Password",
            subtitle: "Update your admin account password",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChangePasswordSection, {})
          }
        )
      ]
    }
  );
}
export {
  SettingsPage as default
};
