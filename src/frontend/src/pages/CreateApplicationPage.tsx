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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Loader2, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { BusinessTypeData as BackendBusinessTypeData } from "../backend";
import { useBackend } from "../hooks/useBackend";
import type {
  CreateApplicationInput,
  FeeTemplate,
  PersonEntry,
  TrusteeEntry,
  UpdateApplicationInput,
} from "../types";
import { ApplicationStatus, ServiceType } from "../types";
import { getServiceTypeLabel } from "../utils";

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
  "Other",
] as const;

type BusinessTypeStr = (typeof BUSINESS_TYPES)[number];

function dateToNs(val: string): bigint {
  if (!val) return BigInt(Date.now()) * 1_000_000n;
  return BigInt(new Date(val).getTime()) * 1_000_000n;
}

function todayStr(): string {
  return new Date().toISOString().split("T")[0];
}

function newPerson(): PersonEntry {
  return {
    id: crypto.randomUUID(),
    name: "",
    address: "",
    mobile: "",
    aadhaarNo: "",
    panNo: "",
    dateOfBirth: "",
    email: "",
    din: "",
  };
}

function newTrustee(): TrusteeEntry {
  return {
    id: crypto.randomUUID(),
    name: "",
    address: "",
    mobile: "",
    aadhaarNo: "",
    panNo: "",
    email: "",
  };
}

// ─── Sub-form field component ─────────────────────────────────────────────────
interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
  type?: string;
  error?: string;
  ocid?: string;
}
function Field({
  label,
  value,
  onChange,
  required,
  placeholder,
  type = "text",
  error,
  ocid,
}: FieldProps) {
  return (
    <div className="space-y-1.5">
      <Label>
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={error ? "border-destructive" : ""}
        data-ocid={ocid}
      />
      {error && (
        <p className="text-xs text-destructive" data-ocid={`${ocid}.error`}>
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Person entry card ─────────────────────────────────────────────────────────
interface PersonCardProps {
  idx: number;
  label: string;
  person: PersonEntry;
  showDin?: boolean;
  canDelete: boolean;
  onUpdate: (p: PersonEntry) => void;
  onDelete: () => void;
  errors?: Partial<Record<keyof PersonEntry, string>>;
}
function PersonCard({
  idx,
  label,
  person,
  showDin,
  canDelete,
  onUpdate,
  onDelete,
  errors = {},
}: PersonCardProps) {
  const set = (k: keyof PersonEntry) => (v: string) =>
    onUpdate({ ...person, [k]: v });
  return (
    <div className="border border-border rounded-md p-4 space-y-3 bg-muted/20">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">
          {label} {idx + 1}
        </span>
        {canDelete && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive hover:text-destructive"
            onClick={onDelete}
            data-ocid={`create_application.person_delete.${idx + 1}`}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field
          label="Full Name"
          value={person.name}
          onChange={set("name")}
          required
          placeholder={`${label} name`}
          error={errors.name}
          ocid={`create_application.person_name.${idx + 1}`}
        />
        <Field
          label="Mobile"
          value={person.mobile}
          onChange={set("mobile")}
          required
          placeholder="Mobile number"
          type="tel"
          error={errors.mobile}
          ocid={`create_application.person_mobile.${idx + 1}`}
        />
        <div className="sm:col-span-2">
          <Field
            label="Address"
            value={person.address}
            onChange={set("address")}
            placeholder="Full address"
            ocid={`create_application.person_address.${idx + 1}`}
          />
        </div>
        <Field
          label="Aadhaar No."
          value={person.aadhaarNo}
          onChange={set("aadhaarNo")}
          placeholder="12-digit Aadhaar"
          ocid={`create_application.person_aadhaar.${idx + 1}`}
        />
        <Field
          label="PAN No."
          value={person.panNo}
          onChange={set("panNo")}
          placeholder="PAN number"
          ocid={`create_application.person_pan.${idx + 1}`}
        />
        <Field
          label="Date of Birth"
          value={person.dateOfBirth}
          onChange={set("dateOfBirth")}
          type="date"
          ocid={`create_application.person_dob.${idx + 1}`}
        />
        <Field
          label="Email"
          value={person.email}
          onChange={set("email")}
          type="email"
          placeholder="email@example.com"
          ocid={`create_application.person_email.${idx + 1}`}
        />
        {showDin && (
          <Field
            label="DIN (Director ID No.)"
            value={person.din}
            onChange={set("din")}
            placeholder="DIN number"
            ocid={`create_application.person_din.${idx + 1}`}
          />
        )}
      </div>
    </div>
  );
}

// ─── Trustee entry card ────────────────────────────────────────────────────────
interface TrusteeCardProps {
  idx: number;
  label: string;
  trustee: TrusteeEntry;
  canDelete: boolean;
  onUpdate: (t: TrusteeEntry) => void;
  onDelete: () => void;
}
function TrusteeCard({
  idx,
  label,
  trustee,
  canDelete,
  onUpdate,
  onDelete,
}: TrusteeCardProps) {
  const set = (k: keyof TrusteeEntry) => (v: string) =>
    onUpdate({ ...trustee, [k]: v });
  return (
    <div className="border border-border rounded-md p-4 space-y-3 bg-muted/20">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">
          {label} {idx + 1}
        </span>
        {canDelete && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive hover:text-destructive"
            onClick={onDelete}
            data-ocid={`create_application.trustee_delete.${idx + 1}`}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field
          label="Full Name"
          value={trustee.name}
          onChange={set("name")}
          required
          placeholder={`${label} name`}
          ocid={`create_application.trustee_name.${idx + 1}`}
        />
        <Field
          label="Mobile"
          value={trustee.mobile}
          onChange={set("mobile")}
          required
          placeholder="Mobile number"
          type="tel"
          ocid={`create_application.trustee_mobile.${idx + 1}`}
        />
        <div className="sm:col-span-2">
          <Field
            label="Address"
            value={trustee.address}
            onChange={set("address")}
            placeholder="Full address"
            ocid={`create_application.trustee_address.${idx + 1}`}
          />
        </div>
        <Field
          label="Aadhaar No."
          value={trustee.aadhaarNo}
          onChange={set("aadhaarNo")}
          placeholder="12-digit Aadhaar"
          ocid={`create_application.trustee_aadhaar.${idx + 1}`}
        />
        <Field
          label="PAN No."
          value={trustee.panNo}
          onChange={set("panNo")}
          placeholder="PAN number"
          ocid={`create_application.trustee_pan.${idx + 1}`}
        />
        <Field
          label="Email"
          value={trustee.email}
          onChange={set("email")}
          type="email"
          placeholder="email@example.com"
          ocid={`create_application.trustee_email.${idx + 1}`}
        />
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

interface FormState {
  firmId: string;
  businessName: string;
  firmAddress: string;
  businessType: BusinessTypeStr;
  otherTypeDescription: string;
  serviceType: ServiceType;
  applicationDate: string;
  expectedCompletionDate: string;
  renewalDate: string;
  status: ApplicationStatus;
  totalFees: string;
  amountCollected: string;
  selectedFeeTemplates: bigint[];
  // Change of Premise fields
  changePremiseOldAddress: string;
  changePremiseNewAddress: string;
  // Alteration of Premise fields
  alterationOldArea: string;
  alterationProposedArea: string;
}

// Proprietary state
interface ProprietaryState {
  proprietorName: string;
  proprietorAddress: string;
  proprietorMobile: string;
  proprietorEmail: string;
  aadhaarNo: string;
  panNo: string;
  dateOfBirth: string;
}

// Company (Pvt. Ltd. / Ltd.) extra fields
interface CompanyState {
  cin: string;
  registeredOfficeAddress: string;
}

// Trust/Society extra fields
interface OrgState {
  orgName: string;
  registrationNo: string;
}

// Other state
interface OtherState {
  authorizedPersonName: string;
  authorizedPersonAddress: string;
  authorizedPersonMobile: string;
  authorizedPersonAadhaar: string;
  authorizedPersonPan: string;
}

export default function CreateApplicationPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { createApplication, updateApplication, listFeeTemplates } =
    useBackend();

  const { data: feeTemplates = [] } = useQuery<FeeTemplate[]>({
    queryKey: ["feeTemplates"],
    queryFn: listFeeTemplates,
  });

  const [form, setForm] = useState<FormState>({
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
    alterationProposedArea: "",
  });

  // Conditional section states
  const [proprietary, setProprietary] = useState<ProprietaryState>({
    proprietorName: "",
    proprietorAddress: "",
    proprietorMobile: "",
    proprietorEmail: "",
    aadhaarNo: "",
    panNo: "",
    dateOfBirth: "",
  });

  const [partners, setPartners] = useState<PersonEntry[]>([newPerson()]);
  const [llpPartners, setLlpPartners] = useState<PersonEntry[]>([newPerson()]);
  const [companyState, setCompanyState] = useState<CompanyState>({
    cin: "",
    registeredOfficeAddress: "",
  });
  const [directors, setDirectors] = useState<PersonEntry[]>([newPerson()]);
  const [orgState, setOrgState] = useState<OrgState>({
    orgName: "",
    registrationNo: "",
  });
  const [trustees, setTrustees] = useState<TrusteeEntry[]>([newTrustee()]);
  const [otherState, setOtherState] = useState<OtherState>({
    authorizedPersonName: "",
    authorizedPersonAddress: "",
    authorizedPersonMobile: "",
    authorizedPersonAadhaar: "",
    authorizedPersonPan: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-sum selected templates
  useEffect(() => {
    if (form.selectedFeeTemplates.length === 0) return;
    const sum = feeTemplates
      .filter((t) => form.selectedFeeTemplates.includes(t.id))
      .reduce((acc, t) => acc + Number(t.amount), 0);
    setForm((f) => ({ ...f, totalFees: String(sum) }));
  }, [form.selectedFeeTemplates, feeTemplates]);

  const amountPending = Math.max(
    0,
    Number(form.totalFees || 0) - Number(form.amountCollected || 0),
  );

  const mutation = useMutation({
    mutationFn: (input: CreateApplicationInput) => createApplication(input),
    onSuccess: async (res) => {
      if (res.__kind__ === "err") {
        toast.error(res.err);
        return;
      }
      const createdApp = res.ok;
      // Save conditional fields (Change of Premise / Alteration) via update
      const isChgPrem =
        form.serviceType === ServiceType.DrugLicenceChangePremise;
      const isAlt =
        form.serviceType === ServiceType.DrugLicenceAlterationOfPremise;
      if (
        (isChgPrem &&
          (form.changePremiseOldAddress || form.changePremiseNewAddress)) ||
        (isAlt && (form.alterationOldArea || form.alterationProposedArea))
      ) {
        const updateInput: UpdateApplicationInput = {
          id: createdApp.id,
          ...(isChgPrem && {
            changePremiseOldAddress: form.changePremiseOldAddress,
          }),
          ...(isChgPrem && {
            changePremiseNewAddress: form.changePremiseNewAddress,
          }),
          ...(isAlt &&
            form.alterationOldArea && {
              alterationOldArea: Number(form.alterationOldArea),
            }),
          ...(isAlt &&
            form.alterationProposedArea && {
              alterationProposedArea: Number(form.alterationProposedArea),
            }),
        };
        await updateApplication(updateInput);
      }
      toast.success("Application created successfully");
      qc.invalidateQueries({ queryKey: ["applications"] });
      navigate({
        to: "/applications/$id",
        params: { id: createdApp.id.toString() },
      });
    },
    onError: () => toast.error("Failed to create application"),
  });

  // ─── Build BusinessTypeData for backend ─────────────────────────────────────
  function buildBusinessTypeData(): BackendBusinessTypeData | undefined {
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
            dateOfBirth: proprietary.dateOfBirth,
          },
        };
      case "Partnership":
        return {
          __kind__: "partnership",
          partnership: { partners },
        };
      case "LLP":
        return {
          __kind__: "llp",
          llp: { designatedPartners: llpPartners },
        };
      case "Pvt. Ltd.":
        return {
          __kind__: "pvtLtd",
          pvtLtd: {
            cin: companyState.cin,
            registeredOfficeAddress: companyState.registeredOfficeAddress,
            directors,
          },
        };
      case "Ltd.":
        return {
          __kind__: "ltd",
          ltd: {
            cin: companyState.cin,
            registeredOfficeAddress: companyState.registeredOfficeAddress,
            directors,
          },
        };
      case "Trust":
        return {
          __kind__: "trust",
          trust: {
            trustName: orgState.orgName,
            registrationNo: orgState.registrationNo,
            trustees,
          },
        };
      case "Society":
        return {
          __kind__: "society",
          society: {
            societyName: orgState.orgName,
            registrationNo: orgState.registrationNo,
            trustees,
          },
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
            otherDescription: form.otherTypeDescription,
          },
        };
    }
  }

  // ─── Validation ──────────────────────────────────────────────────────────────
  function validate(): boolean {
    const e: Record<string, string> = {};
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    // For Proprietary: backfill the top-level fields for backward compatibility
    const isPropriety = form.businessType === "Proprietary";

    const input: CreateApplicationInput = {
      firmId: form.firmId.trim(),
      businessName: form.businessName.trim(),
      proprietorName: isPropriety ? proprietary.proprietorName.trim() : "",
      firmAddress: form.firmAddress.trim(),
      mobileNumber: isPropriety ? proprietary.proprietorMobile.trim() : "",
      email: isPropriety ? proprietary.proprietorEmail.trim() : "",
      businessType: form.businessType,
      serviceType: form.serviceType,
      applicationDate: dateToNs(form.applicationDate),
      ...(form.expectedCompletionDate && {
        expectedCompletionDate: dateToNs(form.expectedCompletionDate),
      }),
      ...(form.renewalDate && { renewalDate: dateToNs(form.renewalDate) }),
      status: form.status,
      totalFees: BigInt(Math.round(Number(form.totalFees) || 0)),
      amountCollected: BigInt(Math.round(Number(form.amountCollected) || 0)),
      selectedFeeTemplates: form.selectedFeeTemplates,
      businessTypeData: buildBusinessTypeData(),
      fdaAddress: "",
    };
    mutation.mutate(input);
  }

  function setField<K extends keyof FormState>(key: K, val: FormState[K]) {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key])
      setErrors((e) => {
        const next = { ...e };
        delete next[String(key)];
        return next;
      });
  }

  function toggleTemplate(id: bigint) {
    setForm((f) => ({
      ...f,
      selectedFeeTemplates: f.selectedFeeTemplates.includes(id)
        ? f.selectedFeeTemplates.filter((x) => x !== id)
        : [...f.selectedFeeTemplates, id],
    }));
  }

  const relevantTemplates = feeTemplates.filter(
    (t) => !t.serviceType || t.serviceType === form.serviceType,
  );

  // ─── Conditional section renderers ──────────────────────────────────────────

  function renderProprietarySection() {
    return (
      <section className="bg-card border border-border rounded-lg p-4 sm:p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground border-b border-border pb-3">
          Proprietor Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="Proprietor Name"
            value={proprietary.proprietorName}
            onChange={(v) =>
              setProprietary((s) => ({ ...s, proprietorName: v }))
            }
            required
            placeholder="Full name of proprietor"
            error={errors.proprietorName}
            ocid="create_application.proprietor_name.input"
          />
          <Field
            label="Mobile Number"
            value={proprietary.proprietorMobile}
            onChange={(v) =>
              setProprietary((s) => ({ ...s, proprietorMobile: v }))
            }
            required
            placeholder="+91 98765 43210"
            type="tel"
            error={errors.proprietorMobile}
            ocid="create_application.proprietor_mobile.input"
          />
          <div className="sm:col-span-2">
            <Field
              label="Proprietor Address"
              value={proprietary.proprietorAddress}
              onChange={(v) =>
                setProprietary((s) => ({ ...s, proprietorAddress: v }))
              }
              placeholder="Residential address"
              ocid="create_application.proprietor_address.input"
            />
          </div>
          <Field
            label="Email"
            value={proprietary.proprietorEmail}
            onChange={(v) =>
              setProprietary((s) => ({ ...s, proprietorEmail: v }))
            }
            type="email"
            placeholder="email@example.com"
            ocid="create_application.proprietor_email.input"
          />
          <Field
            label="Aadhaar No."
            value={proprietary.aadhaarNo}
            onChange={(v) => setProprietary((s) => ({ ...s, aadhaarNo: v }))}
            placeholder="12-digit Aadhaar"
            ocid="create_application.proprietor_aadhaar.input"
          />
          <Field
            label="PAN No."
            value={proprietary.panNo}
            onChange={(v) => setProprietary((s) => ({ ...s, panNo: v }))}
            placeholder="PAN number"
            ocid="create_application.proprietor_pan.input"
          />
          <Field
            label="Date of Birth"
            value={proprietary.dateOfBirth}
            onChange={(v) => setProprietary((s) => ({ ...s, dateOfBirth: v }))}
            type="date"
            ocid="create_application.proprietor_dob.input"
          />
        </div>
      </section>
    );
  }

  function renderPersonListSection(
    title: string,
    addLabel: string,
    people: PersonEntry[],
    setPeople: React.Dispatch<React.SetStateAction<PersonEntry[]>>,
    personLabel: string,
    showDin = false,
  ) {
    return (
      <section className="bg-card border border-border rounded-lg p-4 sm:p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground border-b border-border pb-3">
          {title}
        </h2>
        <div className="space-y-3">
          {people.map((p, i) => (
            <PersonCard
              key={p.id}
              idx={i}
              label={personLabel}
              person={p}
              showDin={showDin}
              canDelete={people.length > 1}
              onUpdate={(updated) =>
                setPeople((arr) => arr.map((x, j) => (j === i ? updated : x)))
              }
              onDelete={() => setPeople((arr) => arr.filter((_, j) => j !== i))}
            />
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => setPeople((arr) => [...arr, newPerson()])}
          data-ocid={`create_application.add_${personLabel.toLowerCase().replace(" ", "_")}_button`}
        >
          <Plus className="w-4 h-4" />
          {addLabel}
        </Button>
      </section>
    );
  }

  function renderCompanySection() {
    const isLtd = form.businessType === "Ltd.";
    return (
      <>
        <section className="bg-card border border-border rounded-lg p-4 sm:p-6 space-y-4">
          <h2 className="text-base font-semibold text-foreground border-b border-border pb-3">
            Company Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Company CIN"
              value={companyState.cin}
              onChange={(v) => setCompanyState((s) => ({ ...s, cin: v }))}
              placeholder="CIN number"
              ocid="create_application.company_cin.input"
            />
            <div className="sm:col-span-2">
              <Field
                label="Registered Office Address"
                value={companyState.registeredOfficeAddress}
                onChange={(v) =>
                  setCompanyState((s) => ({
                    ...s,
                    registeredOfficeAddress: v,
                  }))
                }
                placeholder="Registered office address"
                ocid="create_application.company_reg_address.input"
              />
            </div>
          </div>
        </section>
        {renderPersonListSection(
          `${isLtd ? "Ltd." : "Pvt. Ltd."} Directors`,
          "Add Director",
          directors,
          setDirectors,
          "Director",
          true,
        )}
      </>
    );
  }

  function renderOrgSection() {
    const isTrust = form.businessType === "Trust";
    return (
      <>
        <section className="bg-card border border-border rounded-lg p-4 sm:p-6 space-y-4">
          <h2 className="text-base font-semibold text-foreground border-b border-border pb-3">
            {isTrust ? "Trust" : "Society"} Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label={isTrust ? "Trust Name" : "Society Name"}
              value={orgState.orgName}
              onChange={(v) => setOrgState((s) => ({ ...s, orgName: v }))}
              required
              placeholder={isTrust ? "Name of trust" : "Name of society"}
              error={errors.orgName}
              ocid="create_application.org_name.input"
            />
            <Field
              label="Registration Number"
              value={orgState.registrationNo}
              onChange={(v) =>
                setOrgState((s) => ({ ...s, registrationNo: v }))
              }
              placeholder="Registration number"
              ocid="create_application.org_reg_no.input"
            />
          </div>
        </section>
        <section className="bg-card border border-border rounded-lg p-4 sm:p-6 space-y-4">
          <h2 className="text-base font-semibold text-foreground border-b border-border pb-3">
            {isTrust ? "Trustees" : "Office Bearers"}
          </h2>
          <div className="space-y-3">
            {trustees.map((t, i) => (
              <TrusteeCard
                key={t.id}
                idx={i}
                label={isTrust ? "Trustee" : "Office Bearer"}
                trustee={t}
                canDelete={trustees.length > 1}
                onUpdate={(updated) =>
                  setTrustees((arr) =>
                    arr.map((x, j) => (j === i ? updated : x)),
                  )
                }
                onDelete={() =>
                  setTrustees((arr) => arr.filter((_, j) => j !== i))
                }
              />
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setTrustees((arr) => [...arr, newTrustee()])}
            data-ocid="create_application.add_trustee_button"
          >
            <Plus className="w-4 h-4" />
            {isTrust ? "Add Trustee" : "Add Office Bearer"}
          </Button>
        </section>
      </>
    );
  }

  function renderOtherSection() {
    return (
      <section className="bg-card border border-border rounded-lg p-4 sm:p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground border-b border-border pb-3">
          Authorized Person Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2 space-y-1.5">
            <Label>Other Type Description</Label>
            <Input
              value={form.otherTypeDescription}
              onChange={(e) => setField("otherTypeDescription", e.target.value)}
              placeholder="Describe the business/entity type"
              data-ocid="create_application.other_description.input"
            />
          </div>
          <Field
            label="Authorized Person Name"
            value={otherState.authorizedPersonName}
            onChange={(v) =>
              setOtherState((s) => ({ ...s, authorizedPersonName: v }))
            }
            required
            placeholder="Full name"
            error={errors.authorizedPersonName}
            ocid="create_application.authorized_name.input"
          />
          <Field
            label="Mobile"
            value={otherState.authorizedPersonMobile}
            onChange={(v) =>
              setOtherState((s) => ({ ...s, authorizedPersonMobile: v }))
            }
            required
            placeholder="Mobile number"
            type="tel"
            error={errors.authorizedPersonMobile}
            ocid="create_application.authorized_mobile.input"
          />
          <div className="sm:col-span-2">
            <Field
              label="Address"
              value={otherState.authorizedPersonAddress}
              onChange={(v) =>
                setOtherState((s) => ({ ...s, authorizedPersonAddress: v }))
              }
              placeholder="Full address"
              ocid="create_application.authorized_address.input"
            />
          </div>
          <Field
            label="Aadhaar No."
            value={otherState.authorizedPersonAadhaar}
            onChange={(v) =>
              setOtherState((s) => ({ ...s, authorizedPersonAadhaar: v }))
            }
            placeholder="12-digit Aadhaar"
            ocid="create_application.authorized_aadhaar.input"
          />
          <Field
            label="PAN No."
            value={otherState.authorizedPersonPan}
            onChange={(v) =>
              setOtherState((s) => ({ ...s, authorizedPersonPan: v }))
            }
            placeholder="PAN number"
            ocid="create_application.authorized_pan.input"
          />
        </div>
      </section>
    );
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
          "Partner",
        );
      case "LLP":
        return renderPersonListSection(
          "Designated Partners",
          "Add Designated Partner",
          llpPartners,
          setLlpPartners,
          "Designated Partner",
          true,
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

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          data-ocid="create_application.back_button"
          onClick={() => navigate({ to: "/applications" })}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            New Application
          </h1>
          <p className="text-sm text-muted-foreground">
            Create a new licence service application
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Service Type — FIRST */}
        <section className="bg-card border border-border rounded-lg p-4 sm:p-6 space-y-4">
          <h2 className="text-base font-semibold text-foreground border-b border-border pb-3">
            Service Type
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="serviceType">
                Service Type <span className="text-destructive">*</span>
              </Label>
              <Select
                value={form.serviceType}
                onValueChange={(v) => setField("serviceType", v as ServiceType)}
              >
                <SelectTrigger
                  id="serviceType"
                  data-ocid="create_application.service_type.select"
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

            {/* Change of Premise — Old/New Address */}
            {form.serviceType === ServiceType.DrugLicenceChangePremise && (
              <>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="changePremiseOldAddress">
                    Old Premises Address
                  </Label>
                  <textarea
                    id="changePremiseOldAddress"
                    data-ocid="create_application.change_premise_old_address.input"
                    className="flex min-h-[72px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                    value={form.changePremiseOldAddress}
                    onChange={(e) =>
                      setField("changePremiseOldAddress", e.target.value)
                    }
                    placeholder="Enter old/previous premises address"
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="changePremiseNewAddress">
                    New Premises Address
                  </Label>
                  <textarea
                    id="changePremiseNewAddress"
                    data-ocid="create_application.change_premise_new_address.input"
                    className="flex min-h-[72px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                    value={form.changePremiseNewAddress}
                    onChange={(e) =>
                      setField("changePremiseNewAddress", e.target.value)
                    }
                    placeholder="Enter new/proposed premises address"
                  />
                </div>
              </>
            )}

            {/* Alteration of Premise — Old Area / Proposed Area */}
            {form.serviceType ===
              ServiceType.DrugLicenceAlterationOfPremise && (
              <>
                <div className="space-y-1.5">
                  <Label htmlFor="alterationOldArea">
                    Old Area of Firm (Sq. Ft.)
                  </Label>
                  <Input
                    id="alterationOldArea"
                    data-ocid="create_application.alteration_old_area.input"
                    type="number"
                    min="0"
                    value={form.alterationOldArea}
                    onChange={(e) =>
                      setField("alterationOldArea", e.target.value)
                    }
                    placeholder="e.g. 150"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="alterationProposedArea">
                    Proposed Area After Alteration (Sq. Ft.)
                  </Label>
                  <Input
                    id="alterationProposedArea"
                    data-ocid="create_application.alteration_proposed_area.input"
                    type="number"
                    min="0"
                    value={form.alterationProposedArea}
                    onChange={(e) =>
                      setField("alterationProposedArea", e.target.value)
                    }
                    placeholder="e.g. 200"
                  />
                </div>
              </>
            )}
          </div>
        </section>

        {/* Basic Information */}
        <section className="bg-card border border-border rounded-lg p-4 sm:p-6 space-y-4">
          <h2 className="text-base font-semibold text-foreground border-b border-border pb-3">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Firm ID */}
            <div className="space-y-1.5">
              <Label htmlFor="firmId">
                Firm ID <span className="text-destructive">*</span>
              </Label>
              <Input
                id="firmId"
                data-ocid="create_application.firm_id.input"
                value={form.firmId}
                onChange={(e) => setField("firmId", e.target.value)}
                placeholder="e.g. BAR-FIRM-001"
                className={errors.firmId ? "border-destructive" : ""}
              />
              {errors.firmId && (
                <p
                  data-ocid="create_application.firm_id.field_error"
                  className="text-xs text-destructive"
                >
                  {errors.firmId}
                </p>
              )}
            </div>

            {/* Business Name */}
            <div className="space-y-1.5">
              <Label htmlFor="businessName">
                Business Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="businessName"
                data-ocid="create_application.business_name.input"
                value={form.businessName}
                onChange={(e) => setField("businessName", e.target.value)}
                placeholder="e.g. Krishna Medicals"
                className={errors.businessName ? "border-destructive" : ""}
              />
              {errors.businessName && (
                <p
                  data-ocid="create_application.business_name.field_error"
                  className="text-xs text-destructive"
                >
                  {errors.businessName}
                </p>
              )}
            </div>

            {/* Firm Address */}
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="firmAddress">
                Firm Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="firmAddress"
                data-ocid="create_application.firm_address.input"
                value={form.firmAddress}
                onChange={(e) => setField("firmAddress", e.target.value)}
                placeholder="Full address with pincode"
                className={errors.firmAddress ? "border-destructive" : ""}
              />
              {errors.firmAddress && (
                <p
                  data-ocid="create_application.firm_address.field_error"
                  className="text-xs text-destructive"
                >
                  {errors.firmAddress}
                </p>
              )}
            </div>

            {/* Business Type */}
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="businessType">
                Business Type <span className="text-destructive">*</span>
              </Label>
              <Select
                value={form.businessType}
                onValueChange={(v) =>
                  setField("businessType", v as BusinessTypeStr)
                }
              >
                <SelectTrigger
                  id="businessType"
                  data-ocid="create_application.business_type.select"
                >
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  {BUSINESS_TYPES.map((bt) => (
                    <SelectItem key={bt} value={bt}>
                      {bt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* ── Conditional Business Type Section ── */}
        {renderConditionalSection()}

        {/* Service & Status (dates + status only — service type moved to top) */}
        <section className="bg-card border border-border rounded-lg p-4 sm:p-6 space-y-4">
          <h2 className="text-base font-semibold text-foreground border-b border-border pb-3">
            Status & Dates
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="status">Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) =>
                  setField("status", v as ApplicationStatus)
                }
              >
                <SelectTrigger
                  id="status"
                  data-ocid="create_application.status.select"
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
            <div className="space-y-1.5">
              <Label htmlFor="applicationDate">Application Date</Label>
              <Input
                id="applicationDate"
                data-ocid="create_application.application_date.input"
                type="date"
                value={form.applicationDate}
                onChange={(e) => setField("applicationDate", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="expectedCompletionDate">
                Expected Completion Date
              </Label>
              <Input
                id="expectedCompletionDate"
                data-ocid="create_application.expected_date.input"
                type="date"
                value={form.expectedCompletionDate}
                onChange={(e) =>
                  setField("expectedCompletionDate", e.target.value)
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="renewalDate">
                Renewal Date{" "}
                <span className="text-muted-foreground text-xs">
                  (optional)
                </span>
              </Label>
              <Input
                id="renewalDate"
                data-ocid="create_application.renewal_date.input"
                type="date"
                value={form.renewalDate}
                onChange={(e) => setField("renewalDate", e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Fees */}
        <section className="bg-card border border-border rounded-lg p-4 sm:p-6 space-y-4">
          <h2 className="text-base font-semibold text-foreground border-b border-border pb-3">
            Fees
          </h2>

          {relevantTemplates.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                Fee Templates
              </p>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {relevantTemplates.map((t) => (
                  <div
                    key={t.id.toString()}
                    className="flex items-center gap-3 p-3 rounded-md border border-border hover:bg-muted/20"
                  >
                    <Checkbox
                      id={`tpl-${t.id}`}
                      data-ocid={`create_application.fee_template.${t.id}`}
                      checked={form.selectedFeeTemplates.includes(t.id)}
                      onCheckedChange={() => toggleTemplate(t.id)}
                    />
                    <Label
                      htmlFor={`tpl-${t.id}`}
                      className="flex-1 cursor-pointer"
                    >
                      <span className="font-medium">{t.name}</span>
                      {t.description && (
                        <span className="text-muted-foreground ml-2 text-xs">
                          {t.description}
                        </span>
                      )}
                    </Label>
                    <span className="font-semibold text-sm">
                      ₹{Number(t.amount).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="totalFees">Total Fees (₹)</Label>
              <Input
                id="totalFees"
                data-ocid="create_application.total_fees.input"
                type="number"
                min="0"
                value={form.totalFees}
                onChange={(e) => setField("totalFees", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="amountCollected">Amount Collected (₹)</Label>
              <Input
                id="amountCollected"
                data-ocid="create_application.amount_collected.input"
                type="number"
                min="0"
                value={form.amountCollected}
                onChange={(e) => setField("amountCollected", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Amount Pending (₹)</Label>
              <div
                className={`form-input flex items-center font-semibold ${amountPending > 0 ? "text-accent" : "text-muted-foreground"}`}
              >
                ₹{amountPending.toLocaleString("en-IN")}
              </div>
            </div>
          </div>
        </section>

        {/* Submit */}
        <div className="flex gap-3 justify-end pb-6">
          <Button
            type="button"
            variant="outline"
            data-ocid="create_application.cancel_button"
            onClick={() => navigate({ to: "/applications" })}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            data-ocid="create_application.submit_button"
            disabled={mutation.isPending}
            className="gap-2"
          >
            {mutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Create Application
          </Button>
        </div>
      </form>
    </div>
  );
}
