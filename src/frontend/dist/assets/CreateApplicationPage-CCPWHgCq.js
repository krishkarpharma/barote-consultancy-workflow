import { b as useNavigate, d as useQueryClient, r as reactExports, A as ApplicationStatus, S as ServiceType, j as jsxRuntimeExports, B as Button, L as Label, I as Input } from "./index-BaKwMJOS.js";
import { C as Checkbox } from "./checkbox-CqrHZUDl.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Cd_o80Bj.js";
import { u as useQuery } from "./useQuery-8ND6lXoR.js";
import { u as useMutation, a as ue, T as Trash2 } from "./index-BwOopk-B.js";
import { u as useBackend } from "./useBackend-CAwnRSrn.js";
import { g as getServiceTypeLabel } from "./index-Cd6EN6bb.js";
import { A as ArrowLeft, S as Save } from "./save-CiVTqYf2.js";
import { L as LoaderCircle } from "./loader-circle-CZdGrW1W.js";
import { P as Plus } from "./plus-BoDfY95M.js";
import "./index-MAa7LfqA.js";
import "./index-CaVeNIJ0.js";
import "./index-Bz9Vyaf-.js";
import "./index-Dj7rYGXi.js";
const SERVICE_OPTIONS = Object.values(ServiceType);
const STATUS_OPTIONS = Object.values(ApplicationStatus);
const BUSINESS_TYPES = [
  "Proprietary",
  "Partnership",
  "LLP",
  "Pvt. Ltd.",
  "Ltd.",
  "Trust",
  "Society",
  "Other"
];
function dateToNs(val) {
  if (!val) return BigInt(Date.now()) * 1000000n;
  return BigInt(new Date(val).getTime()) * 1000000n;
}
function todayStr() {
  return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
}
function newPerson() {
  return {
    id: crypto.randomUUID(),
    name: "",
    address: "",
    mobile: "",
    aadhaarNo: "",
    panNo: "",
    dateOfBirth: "",
    email: "",
    din: ""
  };
}
function newTrustee() {
  return {
    id: crypto.randomUUID(),
    name: "",
    address: "",
    mobile: "",
    aadhaarNo: "",
    panNo: "",
    email: ""
  };
}
function Field({
  label,
  value,
  onChange,
  required,
  placeholder,
  type = "text",
  error,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
      label,
      required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-0.5", children: "*" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        type,
        value,
        onChange: (e) => onChange(e.target.value),
        placeholder,
        className: error ? "border-destructive" : "",
        "data-ocid": ocid
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", "data-ocid": `${ocid}.error`, children: error })
  ] });
}
function PersonCard({
  idx,
  label,
  person,
  showDin,
  canDelete,
  onUpdate,
  onDelete,
  errors = {}
}) {
  const set = (k) => (v) => onUpdate({ ...person, [k]: v });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-md p-4 space-y-3 bg-muted/20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-foreground", children: [
        label,
        " ",
        idx + 1
      ] }),
      canDelete && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "icon",
          className: "h-7 w-7 text-destructive hover:text-destructive",
          onClick: onDelete,
          "data-ocid": `create_application.person_delete.${idx + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Field,
        {
          label: "Full Name",
          value: person.name,
          onChange: set("name"),
          required: true,
          placeholder: `${label} name`,
          error: errors.name,
          ocid: `create_application.person_name.${idx + 1}`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Field,
        {
          label: "Mobile",
          value: person.mobile,
          onChange: set("mobile"),
          required: true,
          placeholder: "Mobile number",
          type: "tel",
          error: errors.mobile,
          ocid: `create_application.person_mobile.${idx + 1}`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Field,
        {
          label: "Address",
          value: person.address,
          onChange: set("address"),
          placeholder: "Full address",
          ocid: `create_application.person_address.${idx + 1}`
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Field,
        {
          label: "Aadhaar No.",
          value: person.aadhaarNo,
          onChange: set("aadhaarNo"),
          placeholder: "12-digit Aadhaar",
          ocid: `create_application.person_aadhaar.${idx + 1}`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Field,
        {
          label: "PAN No.",
          value: person.panNo,
          onChange: set("panNo"),
          placeholder: "PAN number",
          ocid: `create_application.person_pan.${idx + 1}`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Field,
        {
          label: "Date of Birth",
          value: person.dateOfBirth,
          onChange: set("dateOfBirth"),
          type: "date",
          ocid: `create_application.person_dob.${idx + 1}`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Field,
        {
          label: "Email",
          value: person.email,
          onChange: set("email"),
          type: "email",
          placeholder: "email@example.com",
          ocid: `create_application.person_email.${idx + 1}`
        }
      ),
      showDin && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Field,
        {
          label: "DIN (Director ID No.)",
          value: person.din,
          onChange: set("din"),
          placeholder: "DIN number",
          ocid: `create_application.person_din.${idx + 1}`
        }
      )
    ] })
  ] });
}
function TrusteeCard({
  idx,
  label,
  trustee,
  canDelete,
  onUpdate,
  onDelete
}) {
  const set = (k) => (v) => onUpdate({ ...trustee, [k]: v });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-md p-4 space-y-3 bg-muted/20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-foreground", children: [
        label,
        " ",
        idx + 1
      ] }),
      canDelete && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "icon",
          className: "h-7 w-7 text-destructive hover:text-destructive",
          onClick: onDelete,
          "data-ocid": `create_application.trustee_delete.${idx + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Field,
        {
          label: "Full Name",
          value: trustee.name,
          onChange: set("name"),
          required: true,
          placeholder: `${label} name`,
          ocid: `create_application.trustee_name.${idx + 1}`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Field,
        {
          label: "Mobile",
          value: trustee.mobile,
          onChange: set("mobile"),
          required: true,
          placeholder: "Mobile number",
          type: "tel",
          ocid: `create_application.trustee_mobile.${idx + 1}`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Field,
        {
          label: "Address",
          value: trustee.address,
          onChange: set("address"),
          placeholder: "Full address",
          ocid: `create_application.trustee_address.${idx + 1}`
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Field,
        {
          label: "Aadhaar No.",
          value: trustee.aadhaarNo,
          onChange: set("aadhaarNo"),
          placeholder: "12-digit Aadhaar",
          ocid: `create_application.trustee_aadhaar.${idx + 1}`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Field,
        {
          label: "PAN No.",
          value: trustee.panNo,
          onChange: set("panNo"),
          placeholder: "PAN number",
          ocid: `create_application.trustee_pan.${idx + 1}`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Field,
        {
          label: "Email",
          value: trustee.email,
          onChange: set("email"),
          type: "email",
          placeholder: "email@example.com",
          ocid: `create_application.trustee_email.${idx + 1}`
        }
      )
    ] })
  ] });
}
function CreateApplicationPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { createApplication, updateApplication, listFeeTemplates } = useBackend();
  const { data: feeTemplates = [] } = useQuery({
    queryKey: ["feeTemplates"],
    queryFn: listFeeTemplates
  });
  const [form, setForm] = reactExports.useState({
    firmId: "",
    businessName: "",
    firmAddress: "",
    businessType: "Proprietary",
    otherTypeDescription: "",
    serviceType: ServiceType.DrugLicenceNewFirm,
    applicationDate: todayStr(),
    expectedCompletionDate: "",
    renewalDate: "",
    status: ApplicationStatus.New,
    totalFees: "0",
    amountCollected: "0",
    selectedFeeTemplates: [],
    changePremiseOldAddress: "",
    changePremiseNewAddress: "",
    alterationOldArea: "",
    alterationProposedArea: ""
  });
  const [proprietary, setProprietary] = reactExports.useState({
    proprietorName: "",
    proprietorAddress: "",
    proprietorMobile: "",
    proprietorEmail: "",
    aadhaarNo: "",
    panNo: "",
    dateOfBirth: ""
  });
  const [partners, setPartners] = reactExports.useState([newPerson()]);
  const [llpPartners, setLlpPartners] = reactExports.useState([newPerson()]);
  const [companyState, setCompanyState] = reactExports.useState({
    cin: "",
    registeredOfficeAddress: ""
  });
  const [directors, setDirectors] = reactExports.useState([newPerson()]);
  const [orgState, setOrgState] = reactExports.useState({
    orgName: "",
    registrationNo: ""
  });
  const [trustees, setTrustees] = reactExports.useState([newTrustee()]);
  const [otherState, setOtherState] = reactExports.useState({
    authorizedPersonName: "",
    authorizedPersonAddress: "",
    authorizedPersonMobile: "",
    authorizedPersonAadhaar: "",
    authorizedPersonPan: ""
  });
  const [errors, setErrors] = reactExports.useState({});
  reactExports.useEffect(() => {
    if (form.selectedFeeTemplates.length === 0) return;
    const sum = feeTemplates.filter((t) => form.selectedFeeTemplates.includes(t.id)).reduce((acc, t) => acc + Number(t.amount), 0);
    setForm((f) => ({ ...f, totalFees: String(sum) }));
  }, [form.selectedFeeTemplates, feeTemplates]);
  const amountPending = Math.max(
    0,
    Number(form.totalFees || 0) - Number(form.amountCollected || 0)
  );
  const mutation = useMutation({
    mutationFn: (input) => createApplication(input),
    onSuccess: async (res) => {
      if (res.__kind__ === "err") {
        ue.error(res.err);
        return;
      }
      const createdApp = res.ok;
      const isChgPrem = form.serviceType === ServiceType.DrugLicenceChangePremise;
      const isAlt = form.serviceType === ServiceType.DrugLicenceAlterationOfPremise;
      if (isChgPrem && (form.changePremiseOldAddress || form.changePremiseNewAddress) || isAlt && (form.alterationOldArea || form.alterationProposedArea)) {
        const updateInput = {
          id: createdApp.id,
          ...isChgPrem && {
            changePremiseOldAddress: form.changePremiseOldAddress
          },
          ...isChgPrem && {
            changePremiseNewAddress: form.changePremiseNewAddress
          },
          ...isAlt && form.alterationOldArea && {
            alterationOldArea: Number(form.alterationOldArea)
          },
          ...isAlt && form.alterationProposedArea && {
            alterationProposedArea: Number(form.alterationProposedArea)
          }
        };
        await updateApplication(updateInput);
      }
      ue.success("Application created successfully");
      qc.invalidateQueries({ queryKey: ["applications"] });
      navigate({
        to: "/applications/$id",
        params: { id: createdApp.id.toString() }
      });
    },
    onError: () => ue.error("Failed to create application")
  });
  function buildBusinessTypeData() {
    switch (form.businessType) {
      case "Proprietary":
        return {
          __kind__: "proprietary",
          proprietary: {
            proprietorName: proprietary.proprietorName,
            proprietorAddress: proprietary.proprietorAddress,
            proprietorMobile: proprietary.proprietorMobile,
            proprietorEmail: proprietary.proprietorEmail,
            aadhaarNo: proprietary.aadhaarNo,
            panNo: proprietary.panNo,
            dateOfBirth: proprietary.dateOfBirth
          }
        };
      case "Partnership":
        return {
          __kind__: "partnership",
          partnership: { partners }
        };
      case "LLP":
        return {
          __kind__: "llp",
          llp: { designatedPartners: llpPartners }
        };
      case "Pvt. Ltd.":
        return {
          __kind__: "pvtLtd",
          pvtLtd: {
            cin: companyState.cin,
            registeredOfficeAddress: companyState.registeredOfficeAddress,
            directors
          }
        };
      case "Ltd.":
        return {
          __kind__: "ltd",
          ltd: {
            cin: companyState.cin,
            registeredOfficeAddress: companyState.registeredOfficeAddress,
            directors
          }
        };
      case "Trust":
        return {
          __kind__: "trust",
          trust: {
            trustName: orgState.orgName,
            registrationNo: orgState.registrationNo,
            trustees
          }
        };
      case "Society":
        return {
          __kind__: "society",
          society: {
            societyName: orgState.orgName,
            registrationNo: orgState.registrationNo,
            trustees
          }
        };
      case "Other":
        return {
          __kind__: "other",
          other: {
            authorizedPersonName: otherState.authorizedPersonName,
            authorizedPersonAddress: otherState.authorizedPersonAddress,
            authorizedPersonMobile: otherState.authorizedPersonMobile,
            authorizedPersonAadhaar: otherState.authorizedPersonAadhaar,
            authorizedPersonPan: otherState.authorizedPersonPan,
            otherDescription: form.otherTypeDescription
          }
        };
    }
  }
  function validate() {
    const e = {};
    if (!form.firmId.trim()) e.firmId = "Firm ID is required";
    if (!form.businessName.trim()) e.businessName = "Business name is required";
    if (!form.firmAddress.trim()) e.firmAddress = "Address is required";
    if (form.businessType === "Proprietary") {
      if (!proprietary.proprietorName.trim())
        e.proprietorName = "Proprietor name is required";
      if (!proprietary.proprietorMobile.trim())
        e.proprietorMobile = "Mobile number is required";
    }
    if (form.businessType === "Partnership") {
      partners.forEach((p, i) => {
        if (!p.name.trim()) e[`partner_name_${i}`] = "Name is required";
        if (!p.mobile.trim()) e[`partner_mobile_${i}`] = "Mobile is required";
      });
    }
    if (form.businessType === "LLP") {
      llpPartners.forEach((p, i) => {
        if (!p.name.trim()) e[`llp_name_${i}`] = "Name is required";
        if (!p.mobile.trim()) e[`llp_mobile_${i}`] = "Mobile is required";
      });
    }
    if (form.businessType === "Pvt. Ltd." || form.businessType === "Ltd.") {
      directors.forEach((d, i) => {
        if (!d.name.trim()) e[`dir_name_${i}`] = "Name is required";
        if (!d.mobile.trim()) e[`dir_mobile_${i}`] = "Mobile is required";
      });
    }
    if (form.businessType === "Trust" || form.businessType === "Society") {
      if (!orgState.orgName.trim())
        e.orgName = `${form.businessType} name is required`;
      trustees.forEach((t, i) => {
        if (!t.name.trim()) e[`trustee_name_${i}`] = "Name is required";
        if (!t.mobile.trim()) e[`trustee_mobile_${i}`] = "Mobile is required";
      });
    }
    if (form.businessType === "Other") {
      if (!otherState.authorizedPersonName.trim())
        e.authorizedPersonName = "Authorized person name is required";
      if (!otherState.authorizedPersonMobile.trim())
        e.authorizedPersonMobile = "Mobile is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) {
      ue.error("Please fix the errors before submitting");
      return;
    }
    const isPropriety = form.businessType === "Proprietary";
    const input = {
      firmId: form.firmId.trim(),
      businessName: form.businessName.trim(),
      proprietorName: isPropriety ? proprietary.proprietorName.trim() : "",
      firmAddress: form.firmAddress.trim(),
      mobileNumber: isPropriety ? proprietary.proprietorMobile.trim() : "",
      email: isPropriety ? proprietary.proprietorEmail.trim() : "",
      businessType: form.businessType,
      serviceType: form.serviceType,
      applicationDate: dateToNs(form.applicationDate),
      ...form.expectedCompletionDate && {
        expectedCompletionDate: dateToNs(form.expectedCompletionDate)
      },
      ...form.renewalDate && { renewalDate: dateToNs(form.renewalDate) },
      status: form.status,
      totalFees: BigInt(Math.round(Number(form.totalFees) || 0)),
      amountCollected: BigInt(Math.round(Number(form.amountCollected) || 0)),
      selectedFeeTemplates: form.selectedFeeTemplates,
      businessTypeData: buildBusinessTypeData(),
      fdaAddress: ""
    };
    mutation.mutate(input);
  }
  function setField(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key])
      setErrors((e) => {
        const next = { ...e };
        delete next[String(key)];
        return next;
      });
  }
  function toggleTemplate(id) {
    setForm((f) => ({
      ...f,
      selectedFeeTemplates: f.selectedFeeTemplates.includes(id) ? f.selectedFeeTemplates.filter((x) => x !== id) : [...f.selectedFeeTemplates, id]
    }));
  }
  const relevantTemplates = feeTemplates.filter(
    (t) => !t.serviceType || t.serviceType === form.serviceType
  );
  function renderProprietarySection() {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-lg p-4 sm:p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground border-b border-border pb-3", children: "Proprietor Details" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Field,
          {
            label: "Proprietor Name",
            value: proprietary.proprietorName,
            onChange: (v) => setProprietary((s) => ({ ...s, proprietorName: v })),
            required: true,
            placeholder: "Full name of proprietor",
            error: errors.proprietorName,
            ocid: "create_application.proprietor_name.input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Field,
          {
            label: "Mobile Number",
            value: proprietary.proprietorMobile,
            onChange: (v) => setProprietary((s) => ({ ...s, proprietorMobile: v })),
            required: true,
            placeholder: "+91 98765 43210",
            type: "tel",
            error: errors.proprietorMobile,
            ocid: "create_application.proprietor_mobile.input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Field,
          {
            label: "Proprietor Address",
            value: proprietary.proprietorAddress,
            onChange: (v) => setProprietary((s) => ({ ...s, proprietorAddress: v })),
            placeholder: "Residential address",
            ocid: "create_application.proprietor_address.input"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Field,
          {
            label: "Email",
            value: proprietary.proprietorEmail,
            onChange: (v) => setProprietary((s) => ({ ...s, proprietorEmail: v })),
            type: "email",
            placeholder: "email@example.com",
            ocid: "create_application.proprietor_email.input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Field,
          {
            label: "Aadhaar No.",
            value: proprietary.aadhaarNo,
            onChange: (v) => setProprietary((s) => ({ ...s, aadhaarNo: v })),
            placeholder: "12-digit Aadhaar",
            ocid: "create_application.proprietor_aadhaar.input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Field,
          {
            label: "PAN No.",
            value: proprietary.panNo,
            onChange: (v) => setProprietary((s) => ({ ...s, panNo: v })),
            placeholder: "PAN number",
            ocid: "create_application.proprietor_pan.input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Field,
          {
            label: "Date of Birth",
            value: proprietary.dateOfBirth,
            onChange: (v) => setProprietary((s) => ({ ...s, dateOfBirth: v })),
            type: "date",
            ocid: "create_application.proprietor_dob.input"
          }
        )
      ] })
    ] });
  }
  function renderPersonListSection(title, addLabel, people, setPeople, personLabel, showDin = false) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-lg p-4 sm:p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground border-b border-border pb-3", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: people.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        PersonCard,
        {
          idx: i,
          label: personLabel,
          person: p,
          showDin,
          canDelete: people.length > 1,
          onUpdate: (updated) => setPeople((arr) => arr.map((x, j) => j === i ? updated : x)),
          onDelete: () => setPeople((arr) => arr.filter((_, j) => j !== i))
        },
        p.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "gap-2",
          onClick: () => setPeople((arr) => [...arr, newPerson()]),
          "data-ocid": `create_application.add_${personLabel.toLowerCase().replace(" ", "_")}_button`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            addLabel
          ]
        }
      )
    ] });
  }
  function renderCompanySection() {
    const isLtd = form.businessType === "Ltd.";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-lg p-4 sm:p-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground border-b border-border pb-3", children: "Company Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Field,
            {
              label: "Company CIN",
              value: companyState.cin,
              onChange: (v) => setCompanyState((s) => ({ ...s, cin: v })),
              placeholder: "CIN number",
              ocid: "create_application.company_cin.input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Field,
            {
              label: "Registered Office Address",
              value: companyState.registeredOfficeAddress,
              onChange: (v) => setCompanyState((s) => ({
                ...s,
                registeredOfficeAddress: v
              })),
              placeholder: "Registered office address",
              ocid: "create_application.company_reg_address.input"
            }
          ) })
        ] })
      ] }),
      renderPersonListSection(
        `${isLtd ? "Ltd." : "Pvt. Ltd."} Directors`,
        "Add Director",
        directors,
        setDirectors,
        "Director",
        true
      )
    ] });
  }
  function renderOrgSection() {
    const isTrust = form.businessType === "Trust";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-lg p-4 sm:p-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-base font-semibold text-foreground border-b border-border pb-3", children: [
          isTrust ? "Trust" : "Society",
          " Details"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Field,
            {
              label: isTrust ? "Trust Name" : "Society Name",
              value: orgState.orgName,
              onChange: (v) => setOrgState((s) => ({ ...s, orgName: v })),
              required: true,
              placeholder: isTrust ? "Name of trust" : "Name of society",
              error: errors.orgName,
              ocid: "create_application.org_name.input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Field,
            {
              label: "Registration Number",
              value: orgState.registrationNo,
              onChange: (v) => setOrgState((s) => ({ ...s, registrationNo: v })),
              placeholder: "Registration number",
              ocid: "create_application.org_reg_no.input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-lg p-4 sm:p-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground border-b border-border pb-3", children: isTrust ? "Trustees" : "Office Bearers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: trustees.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          TrusteeCard,
          {
            idx: i,
            label: isTrust ? "Trustee" : "Office Bearer",
            trustee: t,
            canDelete: trustees.length > 1,
            onUpdate: (updated) => setTrustees(
              (arr) => arr.map((x, j) => j === i ? updated : x)
            ),
            onDelete: () => setTrustees((arr) => arr.filter((_, j) => j !== i))
          },
          t.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "gap-2",
            onClick: () => setTrustees((arr) => [...arr, newTrustee()]),
            "data-ocid": "create_application.add_trustee_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              isTrust ? "Add Trustee" : "Add Office Bearer"
            ]
          }
        )
      ] })
    ] });
  }
  function renderOtherSection() {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-lg p-4 sm:p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground border-b border-border pb-3", children: "Authorized Person Details" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Other Type Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.otherTypeDescription,
              onChange: (e) => setField("otherTypeDescription", e.target.value),
              placeholder: "Describe the business/entity type",
              "data-ocid": "create_application.other_description.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Field,
          {
            label: "Authorized Person Name",
            value: otherState.authorizedPersonName,
            onChange: (v) => setOtherState((s) => ({ ...s, authorizedPersonName: v })),
            required: true,
            placeholder: "Full name",
            error: errors.authorizedPersonName,
            ocid: "create_application.authorized_name.input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Field,
          {
            label: "Mobile",
            value: otherState.authorizedPersonMobile,
            onChange: (v) => setOtherState((s) => ({ ...s, authorizedPersonMobile: v })),
            required: true,
            placeholder: "Mobile number",
            type: "tel",
            error: errors.authorizedPersonMobile,
            ocid: "create_application.authorized_mobile.input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Field,
          {
            label: "Address",
            value: otherState.authorizedPersonAddress,
            onChange: (v) => setOtherState((s) => ({ ...s, authorizedPersonAddress: v })),
            placeholder: "Full address",
            ocid: "create_application.authorized_address.input"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Field,
          {
            label: "Aadhaar No.",
            value: otherState.authorizedPersonAadhaar,
            onChange: (v) => setOtherState((s) => ({ ...s, authorizedPersonAadhaar: v })),
            placeholder: "12-digit Aadhaar",
            ocid: "create_application.authorized_aadhaar.input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Field,
          {
            label: "PAN No.",
            value: otherState.authorizedPersonPan,
            onChange: (v) => setOtherState((s) => ({ ...s, authorizedPersonPan: v })),
            placeholder: "PAN number",
            ocid: "create_application.authorized_pan.input"
          }
        )
      ] })
    ] });
  }
  function renderConditionalSection() {
    switch (form.businessType) {
      case "Proprietary":
        return renderProprietarySection();
      case "Partnership":
        return renderPersonListSection(
          "Partners",
          "Add Partner",
          partners,
          setPartners,
          "Partner"
        );
      case "LLP":
        return renderPersonListSection(
          "Designated Partners",
          "Add Designated Partner",
          llpPartners,
          setLlpPartners,
          "Designated Partner",
          true
        );
      case "Pvt. Ltd.":
      case "Ltd.":
        return renderCompanySection();
      case "Trust":
      case "Society":
        return renderOrgSection();
      case "Other":
        return renderOtherSection();
      default:
        return null;
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          "data-ocid": "create_application.back_button",
          onClick: () => navigate({ to: "/applications" }),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "New Application" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Create a new licence service application" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-lg p-4 sm:p-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground border-b border-border pb-3", children: "Service Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "serviceType", children: [
              "Service Type ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.serviceType,
                onValueChange: (v) => setField("serviceType", v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      id: "serviceType",
                      "data-ocid": "create_application.service_type.select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SERVICE_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: getServiceTypeLabel(s) }, s)) })
                ]
              }
            )
          ] }),
          form.serviceType === ServiceType.DrugLicenceChangePremise && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "changePremiseOldAddress", children: "Old Premises Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  id: "changePremiseOldAddress",
                  "data-ocid": "create_application.change_premise_old_address.input",
                  className: "flex min-h-[72px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none",
                  value: form.changePremiseOldAddress,
                  onChange: (e) => setField("changePremiseOldAddress", e.target.value),
                  placeholder: "Enter old/previous premises address"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "changePremiseNewAddress", children: "New Premises Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  id: "changePremiseNewAddress",
                  "data-ocid": "create_application.change_premise_new_address.input",
                  className: "flex min-h-[72px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none",
                  value: form.changePremiseNewAddress,
                  onChange: (e) => setField("changePremiseNewAddress", e.target.value),
                  placeholder: "Enter new/proposed premises address"
                }
              )
            ] })
          ] }),
          form.serviceType === ServiceType.DrugLicenceAlterationOfPremise && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "alterationOldArea", children: "Old Area of Firm (Sq. Ft.)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "alterationOldArea",
                  "data-ocid": "create_application.alteration_old_area.input",
                  type: "number",
                  min: "0",
                  value: form.alterationOldArea,
                  onChange: (e) => setField("alterationOldArea", e.target.value),
                  placeholder: "e.g. 150"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "alterationProposedArea", children: "Proposed Area After Alteration (Sq. Ft.)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "alterationProposedArea",
                  "data-ocid": "create_application.alteration_proposed_area.input",
                  type: "number",
                  min: "0",
                  value: form.alterationProposedArea,
                  onChange: (e) => setField("alterationProposedArea", e.target.value),
                  placeholder: "e.g. 200"
                }
              )
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-lg p-4 sm:p-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground border-b border-border pb-3", children: "Basic Information" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "firmId", children: [
              "Firm ID ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "firmId",
                "data-ocid": "create_application.firm_id.input",
                value: form.firmId,
                onChange: (e) => setField("firmId", e.target.value),
                placeholder: "e.g. BAR-FIRM-001",
                className: errors.firmId ? "border-destructive" : ""
              }
            ),
            errors.firmId && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                "data-ocid": "create_application.firm_id.field_error",
                className: "text-xs text-destructive",
                children: errors.firmId
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "businessName", children: [
              "Business Name ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "businessName",
                "data-ocid": "create_application.business_name.input",
                value: form.businessName,
                onChange: (e) => setField("businessName", e.target.value),
                placeholder: "e.g. Krishna Medicals",
                className: errors.businessName ? "border-destructive" : ""
              }
            ),
            errors.businessName && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                "data-ocid": "create_application.business_name.field_error",
                className: "text-xs text-destructive",
                children: errors.businessName
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "firmAddress", children: [
              "Firm Address ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "firmAddress",
                "data-ocid": "create_application.firm_address.input",
                value: form.firmAddress,
                onChange: (e) => setField("firmAddress", e.target.value),
                placeholder: "Full address with pincode",
                className: errors.firmAddress ? "border-destructive" : ""
              }
            ),
            errors.firmAddress && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                "data-ocid": "create_application.firm_address.field_error",
                className: "text-xs text-destructive",
                children: errors.firmAddress
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "businessType", children: [
              "Business Type ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.businessType,
                onValueChange: (v) => setField("businessType", v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      id: "businessType",
                      "data-ocid": "create_application.business_type.select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select business type" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: BUSINESS_TYPES.map((bt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: bt, children: bt }, bt)) })
                ]
              }
            )
          ] })
        ] })
      ] }),
      renderConditionalSection(),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-lg p-4 sm:p-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground border-b border-border pb-3", children: "Status & Dates" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "status", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.status,
                onValueChange: (v) => setField("status", v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      id: "status",
                      "data-ocid": "create_application.status.select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STATUS_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s.replace(/([A-Z])/g, " $1").trim() }, s)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "applicationDate", children: "Application Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "applicationDate",
                "data-ocid": "create_application.application_date.input",
                type: "date",
                value: form.applicationDate,
                onChange: (e) => setField("applicationDate", e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "expectedCompletionDate", children: "Expected Completion Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "expectedCompletionDate",
                "data-ocid": "create_application.expected_date.input",
                type: "date",
                value: form.expectedCompletionDate,
                onChange: (e) => setField("expectedCompletionDate", e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "renewalDate", children: [
              "Renewal Date",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(optional)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "renewalDate",
                "data-ocid": "create_application.renewal_date.input",
                type: "date",
                value: form.renewalDate,
                onChange: (e) => setField("renewalDate", e.target.value)
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-lg p-4 sm:p-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground border-b border-border pb-3", children: "Fees" }),
        relevantTemplates.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Fee Templates" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-48 overflow-y-auto", children: relevantTemplates.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 p-3 rounded-md border border-border hover:bg-muted/20",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Checkbox,
                  {
                    id: `tpl-${t.id}`,
                    "data-ocid": `create_application.fee_template.${t.id}`,
                    checked: form.selectedFeeTemplates.includes(t.id),
                    onCheckedChange: () => toggleTemplate(t.id)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Label,
                  {
                    htmlFor: `tpl-${t.id}`,
                    className: "flex-1 cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: t.name }),
                      t.description && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground ml-2 text-xs", children: t.description })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-sm", children: [
                  "₹",
                  Number(t.amount).toLocaleString("en-IN")
                ] })
              ]
            },
            t.id.toString()
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "totalFees", children: "Total Fees (₹)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "totalFees",
                "data-ocid": "create_application.total_fees.input",
                type: "number",
                min: "0",
                value: form.totalFees,
                onChange: (e) => setField("totalFees", e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "amountCollected", children: "Amount Collected (₹)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "amountCollected",
                "data-ocid": "create_application.amount_collected.input",
                type: "number",
                min: "0",
                value: form.amountCollected,
                onChange: (e) => setField("amountCollected", e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Amount Pending (₹)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `form-input flex items-center font-semibold ${amountPending > 0 ? "text-accent" : "text-muted-foreground"}`,
                children: [
                  "₹",
                  amountPending.toLocaleString("en-IN")
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end pb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            "data-ocid": "create_application.cancel_button",
            onClick: () => navigate({ to: "/applications" }),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "submit",
            "data-ocid": "create_application.submit_button",
            disabled: mutation.isPending,
            className: "gap-2",
            children: [
              mutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
              "Create Application"
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  CreateApplicationPage as default
};
