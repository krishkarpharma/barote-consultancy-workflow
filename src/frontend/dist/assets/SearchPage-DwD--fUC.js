import { c as createLucideIcon, j as jsxRuntimeExports, b as useNavigate, r as reactExports, e as Search, I as Input, X, B as Button, A as ApplicationStatus, S as ServiceType } from "./index-BaKwMJOS.js";
import { B as Badge } from "./badge-BNst8HUv.js";
import { C as Checkbox } from "./checkbox-CqrHZUDl.js";
import { S as Skeleton } from "./skeleton-Dj-iI3Sb.js";
import { g as getServiceTypeLabel, c as getStatusLabel, a as formatDate, f as formatCurrency, i as isDeadlineUrgent } from "./index-Cd6EN6bb.js";
import { S as StatusBadge } from "./StatusBadge-C64VtDF7.js";
import { u as useBackend } from "./useBackend-CAwnRSrn.js";
import { F as Funnel } from "./funnel-Bt7vzwa9.js";
import { C as ChevronUp, a as ChevronDown } from "./index-CaVeNIJ0.js";
import { T as TriangleAlert } from "./triangle-alert-Doy5BfME.js";
import "./index-MAa7LfqA.js";
import "./index-Bz9Vyaf-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode);
const colors = {
  Drug: "bg-primary/10 text-primary",
  Food: "bg-chart-4/10 text-chart-4",
  GST: "bg-accent/10 text-accent",
  MSME: "bg-chart-5/10 text-chart-5",
  Other: "bg-muted text-muted-foreground"
};
function getColor(st) {
  const label = getServiceTypeLabel(st);
  for (const [key, cls] of Object.entries(colors)) {
    if (label.includes(key)) return cls;
  }
  return colors.Other;
}
function ServiceTypeBadge({ serviceType, className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${getColor(serviceType)} ${className}`,
      children: getServiceTypeLabel(serviceType)
    }
  );
}
function readUrlParams() {
  const sp = new URLSearchParams(window.location.search);
  const out = {};
  for (const [k, v] of sp.entries()) {
    out[k] = v;
  }
  return out;
}
function writeUrlParams(p) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(p)) {
    if (v) sp.set(k, v);
  }
  const qs = sp.toString();
  window.history.replaceState(
    null,
    "",
    qs ? `?${qs}` : window.location.pathname
  );
}
const ALL_STATUSES = Object.values(ApplicationStatus);
const ALL_SERVICE_TYPES = Object.values(ServiceType);
function parseParams(raw) {
  return {
    q: raw.q ?? "",
    statuses: raw.statuses ? raw.statuses.split(",").filter(Boolean) : [],
    serviceTypes: raw.serviceTypes ? raw.serviceTypes.split(",").filter(Boolean) : [],
    dateFrom: raw.dateFrom ?? "",
    dateTo: raw.dateTo ?? "",
    sortKey: raw.sortKey ?? "applicationId",
    sortDir: raw.sortDir ?? "asc"
  };
}
function encodeParams(p) {
  const out = {};
  if (p.q) out.q = p.q;
  if (p.statuses.length) out.statuses = p.statuses.join(",");
  if (p.serviceTypes.length) out.serviceTypes = p.serviceTypes.join(",");
  if (p.dateFrom) out.dateFrom = p.dateFrom;
  if (p.dateTo) out.dateTo = p.dateTo;
  if (p.sortKey !== "applicationId") out.sortKey = p.sortKey;
  if (p.sortDir !== "asc") out.sortDir = p.sortDir;
  return out;
}
function hasPendingFees(app) {
  return app.amountPending > 0n;
}
function isUrgentDeadline(app) {
  return isDeadlineUrgent(app.expectedCompletionDate ?? null) || isDeadlineUrgent(app.renewalDate ?? null);
}
function SortHeader({ label, colKey, current, dir, onSort }) {
  const active = current === colKey;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "th",
    {
      scope: "col",
      className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer select-none hover:text-foreground transition-colors whitespace-nowrap",
      onClick: () => onSort(colKey),
      onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") onSort(colKey);
      },
      "aria-sort": active ? dir === "asc" ? "ascending" : "descending" : "none",
      "data-ocid": `search.sort.${colKey}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
        label,
        active ? dir === "asc" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3 h-3 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3 h-3 opacity-25" })
      ] })
    }
  );
}
function SearchPage() {
  const navigate = useNavigate();
  const [params, setParams] = reactExports.useState(
    () => parseParams(readUrlParams())
  );
  const [localQ, setLocalQ] = reactExports.useState(params.q);
  const [filtersOpen, setFiltersOpen] = reactExports.useState(
    params.statuses.length > 0 || params.serviceTypes.length > 0 || !!params.dateFrom || !!params.dateTo
  );
  const [results, setResults] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [hasSearched, setHasSearched] = reactExports.useState(false);
  const { searchApplications } = useBackend();
  const searchRef = reactExports.useRef(searchApplications);
  searchRef.current = searchApplications;
  const updateParams = reactExports.useCallback((patch) => {
    setParams((prev) => {
      const next = { ...prev, ...patch };
      writeUrlParams(encodeParams(next));
      return next;
    });
  }, []);
  reactExports.useEffect(() => {
    const timer = setTimeout(() => {
      if (localQ !== params.q) {
        updateParams({ q: localQ });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localQ, params.q, updateParams]);
  const statusesKey = params.statuses.join(",");
  const serviceTypesKey = params.serviceTypes.join(",");
  reactExports.useEffect(() => {
    const statuses = statusesKey ? statusesKey.split(",") : [];
    const serviceTypes = serviceTypesKey ? serviceTypesKey.split(",") : [];
    const filter = {
      searchText: params.q,
      status: statuses.length === 1 ? statuses[0] : void 0,
      serviceType: serviceTypes.length === 1 ? serviceTypes[0] : void 0,
      dateFrom: params.dateFrom ? BigInt(new Date(params.dateFrom).getTime() * 1e6) : void 0,
      dateTo: params.dateTo ? BigInt(new Date(params.dateTo).getTime() * 1e6) : void 0
    };
    setIsLoading(true);
    setHasSearched(true);
    searchRef.current(filter).then((data) => {
      let filtered = data;
      if (statuses.length > 1) {
        filtered = filtered.filter((a) => statuses.includes(a.status));
      }
      if (serviceTypes.length > 1) {
        filtered = filtered.filter(
          (a) => serviceTypes.includes(a.serviceType)
        );
      }
      setResults(filtered);
    }).catch(() => setResults([])).finally(() => setIsLoading(false));
  }, [params.q, statusesKey, serviceTypesKey, params.dateFrom, params.dateTo]);
  const sortedResults = reactExports.useMemo(() => {
    const sorted = [...results];
    sorted.sort((a, b) => {
      let cmp = 0;
      switch (params.sortKey) {
        case "applicationId":
          cmp = a.applicationId.localeCompare(b.applicationId);
          break;
        case "businessName":
          cmp = a.businessName.localeCompare(b.businessName);
          break;
        case "proprietorName":
          cmp = a.proprietorName.localeCompare(b.proprietorName);
          break;
        case "serviceType":
          cmp = getServiceTypeLabel(a.serviceType).localeCompare(
            getServiceTypeLabel(b.serviceType)
          );
          break;
        case "status":
          cmp = getStatusLabel(a.status).localeCompare(
            getStatusLabel(b.status)
          );
          break;
        case "expectedCompletionDate":
          cmp = Number(
            (a.expectedCompletionDate ?? 0n) - (b.expectedCompletionDate ?? 0n)
          );
          break;
        case "amountPending":
          cmp = Number(a.amountPending - b.amountPending);
          break;
      }
      return params.sortDir === "asc" ? cmp : -cmp;
    });
    return sorted;
  }, [results, params.sortKey, params.sortDir]);
  const handleSort = (key) => {
    updateParams({
      sortKey: key,
      sortDir: params.sortKey === key && params.sortDir === "asc" ? "desc" : "asc"
    });
  };
  const toggleStatus = (s) => {
    const next = params.statuses.includes(s) ? params.statuses.filter((x) => x !== s) : [...params.statuses, s];
    updateParams({ statuses: next });
  };
  const toggleServiceType = (t) => {
    const next = params.serviceTypes.includes(t) ? params.serviceTypes.filter((x) => x !== t) : [...params.serviceTypes, t];
    updateParams({ serviceTypes: next });
  };
  const clearAll = () => {
    setLocalQ("");
    updateParams({
      q: "",
      statuses: [],
      serviceTypes: [],
      dateFrom: "",
      dateTo: ""
    });
  };
  const activeFilterCount = params.statuses.length + params.serviceTypes.length + (params.dateFrom ? 1 : 0) + (params.dateTo ? 1 : 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5 max-w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl sm:text-2xl font-display font-bold text-foreground", children: "Search Applications" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Search by Application ID, Firm ID, Business Name, Proprietor, or Mobile" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "search-main-input",
          "data-ocid": "search.search_input",
          className: "pl-10 pr-10 h-11 text-base bg-card border-border focus:ring-2 focus:ring-primary",
          placeholder: "Search applications…",
          value: localQ,
          onChange: (e) => setLocalQ(e.target.value)
        }
      ),
      localQ && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
          onClick: () => setLocalQ(""),
          "aria-label": "Clear search",
          "data-ocid": "search.clear_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "gap-2",
          onClick: () => setFiltersOpen((v) => !v),
          "data-ocid": "search.filter.toggle",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-4 h-4" }),
            "Filters",
            activeFilterCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-1 px-1.5 py-0 text-xs", children: activeFilterCount }),
            filtersOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3" })
          ]
        }
      ),
      activeFilterCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "text-muted-foreground gap-1",
          onClick: clearAll,
          "data-ocid": "search.filter.clear_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }),
            "Clear all"
          ]
        }
      )
    ] }),
    filtersOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5",
        "data-ocid": "search.filter.panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2 max-h-52 overflow-y-auto pr-1", children: ALL_STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Checkbox,
                {
                  id: `status-${s}`,
                  "data-ocid": `search.filter.status.${s.toLowerCase()}`,
                  checked: params.statuses.includes(s),
                  onCheckedChange: () => toggleStatus(s)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: `status-${s}`,
                  className: "text-sm cursor-pointer hover:text-foreground transition-colors",
                  children: getStatusLabel(s)
                }
              )
            ] }, s)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Service Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2 max-h-52 overflow-y-auto pr-1", children: ALL_SERVICE_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Checkbox,
                {
                  id: `service-${t}`,
                  "data-ocid": `search.filter.service.${t.toLowerCase()}`,
                  checked: params.serviceTypes.includes(t),
                  onCheckedChange: () => toggleServiceType(t)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: `service-${t}`,
                  className: "text-sm cursor-pointer hover:text-foreground transition-colors",
                  children: getServiceTypeLabel(t)
                }
              )
            ] }, t)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Date Range" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "filter-date-from",
                    className: "text-xs text-muted-foreground mb-1 block",
                    children: "From"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "filter-date-from",
                    type: "date",
                    "data-ocid": "search.filter.date_from",
                    className: "h-9 text-sm bg-background border-input",
                    value: params.dateFrom,
                    onChange: (e) => updateParams({ dateFrom: e.target.value })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "filter-date-to",
                    className: "text-xs text-muted-foreground mb-1 block",
                    children: "To"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "filter-date-to",
                    type: "date",
                    "data-ocid": "search.filter.date_to",
                    className: "h-9 text-sm bg-background border-input",
                    value: params.dateTo,
                    onChange: (e) => updateParams({ dateTo: e.target.value })
                  }
                )
              ] })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
      hasSearched && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-3 flex-wrap text-sm text-muted-foreground",
          "data-ocid": "search.result_count",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              sortedResults.length,
              " result",
              sortedResults.length !== 1 ? "s" : "",
              " found"
            ] }),
            sortedResults.some(isUrgentDeadline) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-destructive text-xs font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3" }),
              "Some deadlines urgent"
            ] }),
            sortedResults.some(hasPendingFees) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-accent text-xs font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
              "Some fees pending"
            ] })
          ]
        }
      ),
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "bg-card border border-border rounded-lg p-4 flex flex-col gap-3",
          "data-ocid": "search.loading_state",
          children: ["r0", "r1", "r2", "r3", "r4"].map((rowId) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: ["c0", "c1", "c2", "c3", "c4", "c5", "c6"].map(
            (colId) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Skeleton,
              {
                className: "h-8 flex-1"
              },
              `${rowId}-${colId}`
            )
          ) }, rowId))
        }
      ),
      !isLoading && hasSearched && sortedResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-lg overflow-hidden shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "search.table", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SortHeader,
            {
              label: "App ID",
              colKey: "applicationId",
              current: params.sortKey,
              dir: params.sortDir,
              onSort: handleSort
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              scope: "col",
              className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap",
              children: "Firm ID"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SortHeader,
            {
              label: "Business Name",
              colKey: "businessName",
              current: params.sortKey,
              dir: params.sortDir,
              onSort: handleSort
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SortHeader,
            {
              label: "Proprietor",
              colKey: "proprietorName",
              current: params.sortKey,
              dir: params.sortDir,
              onSort: handleSort
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SortHeader,
            {
              label: "Service Type",
              colKey: "serviceType",
              current: params.sortKey,
              dir: params.sortDir,
              onSort: handleSort
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SortHeader,
            {
              label: "Status",
              colKey: "status",
              current: params.sortKey,
              dir: params.sortDir,
              onSort: handleSort
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SortHeader,
            {
              label: "Expected Completion",
              colKey: "expectedCompletionDate",
              current: params.sortKey,
              dir: params.sortDir,
              onSort: handleSort
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SortHeader,
            {
              label: "Pending (₹)",
              colKey: "amountPending",
              current: params.sortKey,
              dir: params.sortDir,
              onSort: handleSort
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: sortedResults.map((app, idx) => {
          const urgent = isUrgentDeadline(app);
          const pendingFees = hasPendingFees(app);
          const rowClass = urgent ? "bg-destructive/5 hover:bg-destructive/10 cursor-pointer transition-colors" : pendingFees ? "bg-accent/5 hover:bg-accent/10 cursor-pointer transition-colors" : "hover:bg-muted/30 cursor-pointer transition-colors";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: rowClass,
              onClick: () => navigate({ to: `/applications/${app.id}` }),
              onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === " ")
                  navigate({ to: `/applications/${app.id}` });
              },
              tabIndex: 0,
              "data-ocid": `search.table.item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs font-medium text-foreground whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                  urgent && /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3 text-destructive flex-shrink-0" }),
                  pendingFees && !urgent && /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 text-accent flex-shrink-0" }),
                  app.applicationId
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground font-mono text-xs whitespace-nowrap", children: app.firmId }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground max-w-[180px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "block truncate",
                    title: app.businessName,
                    children: app.businessName
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground max-w-[140px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "block truncate",
                    title: app.proprietorName,
                    children: app.proprietorName
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceTypeBadge, { serviceType: app.serviceType }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: app.status }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    className: `px-4 py-3 whitespace-nowrap text-sm ${urgent ? "text-destructive font-semibold" : "text-foreground"}`,
                    children: app.expectedCompletionDate ? formatDate(app.expectedCompletionDate) : "—"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    className: `px-4 py-3 text-right tabular-nums whitespace-nowrap font-medium ${pendingFees ? "text-accent" : "text-foreground"}`,
                    children: app.amountPending > 0n ? formatCurrency(app.amountPending) : "—"
                  }
                )
              ]
            },
            app.applicationId
          );
        }) })
      ] }) }) }),
      !isLoading && hasSearched && sortedResults.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-lg flex flex-col items-center justify-center py-16 px-4 text-center",
          "data-ocid": "search.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-6 h-6 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-foreground mb-1", children: "No applications found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "No applications found matching your search. Try different keywords or adjust your filters." }),
            (params.q || activeFilterCount > 0) && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "mt-4",
                onClick: clearAll,
                "data-ocid": "search.empty_state.clear_button",
                children: "Clear search & filters"
              }
            )
          ]
        }
      ),
      !hasSearched && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-lg flex flex-col items-center justify-center py-16 px-4 text-center",
          "data-ocid": "search.initial_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-6 h-6 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-foreground mb-1", children: "Start searching" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Enter a search term above to find applications by name, ID, mobile number, or firm details." })
          ]
        }
      )
    ] })
  ] });
}
export {
  SearchPage as default
};
