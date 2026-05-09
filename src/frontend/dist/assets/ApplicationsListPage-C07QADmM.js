import { c as createLucideIcon, b as useNavigate, r as reactExports, j as jsxRuntimeExports, B as Button, e as Search, I as Input, X, A as ApplicationStatus, S as ServiceType } from "./index-BaKwMJOS.js";
import { B as Badge } from "./badge-BNst8HUv.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Cd_o80Bj.js";
import { S as Skeleton } from "./skeleton-Dj-iI3Sb.js";
import { u as useQuery } from "./useQuery-8ND6lXoR.js";
import { S as StatusBadge } from "./StatusBadge-C64VtDF7.js";
import { u as useBackend } from "./useBackend-CAwnRSrn.js";
import { g as getServiceTypeLabel, i as isDeadlineUrgent, f as formatCurrency, a as formatDate } from "./index-Cd6EN6bb.js";
import { F as Funnel } from "./funnel-Bt7vzwa9.js";
import "./index-Dj7rYGXi.js";
import "./index-MAa7LfqA.js";
import "./index-CaVeNIJ0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
];
const CirclePlus = createLucideIcon("circle-plus", __iconNode);
const STATUS_OPTIONS = Object.values(ApplicationStatus);
const SERVICE_OPTIONS = Object.values(ServiceType);
function ApplicationsListPage() {
  const navigate = useNavigate();
  const { listApplications } = useBackend();
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState(
    "all"
  );
  const [serviceFilter, setServiceFilter] = reactExports.useState(
    "all"
  );
  const [showFilters, setShowFilters] = reactExports.useState(false);
  const filters = {
    ...statusFilter !== "all" && { status: statusFilter },
    ...serviceFilter !== "all" && { serviceType: serviceFilter }
  };
  const { data: apps, isLoading } = useQuery({
    queryKey: ["applications", filters],
    queryFn: () => listApplications(filters),
    refetchInterval: 3e4
  });
  const filtered = (apps ?? []).filter((a) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return a.applicationId.toLowerCase().includes(q) || a.firmId.toLowerCase().includes(q) || a.businessName.toLowerCase().includes(q) || a.proprietorName.toLowerCase().includes(q);
  });
  const clearFilters = () => {
    setStatusFilter("all");
    setServiceFilter("all");
    setSearch("");
  };
  const hasActiveFilters = statusFilter !== "all" || serviceFilter !== "all" || search.trim();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl sm:text-2xl font-display font-bold text-foreground", children: "Applications" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: isLoading ? "Loading…" : `${filtered.length} application${filtered.length !== 1 ? "s" : ""}` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "applications.new_application_button",
          onClick: () => navigate({ to: "/applications/new" }),
          className: "gap-2 shrink-0 min-h-[44px]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-4 h-4" }),
            "New Application"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "applications.search_input",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              placeholder: "Search by App ID, Firm ID, business name…",
              className: "pl-9"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "icon",
            "data-ocid": "applications.filter.toggle",
            onClick: () => setShowFilters((v) => !v),
            className: showFilters ? "border-primary text-primary" : "",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-4 h-4" })
          }
        ),
        hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            onClick: clearFilters,
            "data-ocid": "applications.clear_filters",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
          }
        )
      ] }),
      showFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1.5", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: statusFilter,
              onValueChange: (v) => setStatusFilter(v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "applications.status_filter.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Statuses" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Statuses" }),
                  STATUS_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s.replace(/([A-Z])/g, " $1").trim() }, s))
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1.5", children: "Service Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: serviceFilter,
              onValueChange: (v) => setServiceFilter(v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "applications.service_filter.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Services" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Services" }),
                  SERVICE_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: getServiceTypeLabel(s) }, s))
                ] })
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-lg overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: Array.from({ length: 6 }).map((_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders have no id
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded" }, i)
    )) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "applications.empty_state",
        className: "flex flex-col items-center justify-center py-16 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-6 h-6 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No applications found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 mb-4", children: hasActiveFilters ? "Try adjusting your filters" : "Create your first application to get started" }),
          !hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              "data-ocid": "applications.empty_new_button",
              onClick: () => navigate({ to: "/applications/new" }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-4 h-4 mr-2" }),
                " New Application"
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:hidden divide-y divide-border", children: filtered.map((app, idx) => {
        const urgent = isDeadlineUrgent(
          app.expectedCompletionDate ?? null
        );
        const hasPendingFees = app.amountPending > 0n;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": `applications.item.${idx + 1}`,
            onClick: () => navigate({
              to: "/applications/$id",
              params: { id: app.id.toString() }
            }),
            className: [
              "w-full text-left",
              "p-4 cursor-pointer transition-smooth hover:bg-muted/20 active:bg-muted/30",
              urgent ? "border-l-4 border-l-destructive bg-destructive/5" : "",
              hasPendingFees && !urgent ? "border-l-4 border-l-accent" : ""
            ].join(" "),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-semibold text-primary", children: app.applicationId }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: app.status })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm truncate", children: app.businessName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: app.proprietorName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2 gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: getServiceTypeLabel(app.serviceType) }),
                hasPendingFees && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-accent shrink-0", children: formatCurrency(app.amountPending) })
              ] })
            ]
          },
          app.id.toString()
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:block overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap", children: "App ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap", children: "Firm ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap", children: "Business Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap hidden md:table-cell", children: "Service Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground whitespace-nowrap hidden lg:table-cell", children: "Expected Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground whitespace-nowrap", children: "Pending Fees" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((app, idx) => {
          const urgent = isDeadlineUrgent(
            app.expectedCompletionDate ?? null
          );
          const hasPendingFees = app.amountPending > 0n;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              "data-ocid": `applications.item.${idx + 1}`,
              onClick: () => navigate({
                to: "/applications/$id",
                params: { id: app.id.toString() }
              }),
              onKeyDown: (e) => {
                if (e.key === "Enter")
                  navigate({
                    to: "/applications/$id",
                    params: { id: app.id.toString() }
                  });
              },
              tabIndex: 0,
              className: [
                "border-b border-border cursor-pointer transition-smooth hover:bg-muted/20",
                urgent ? "bg-destructive/5" : "",
                hasPendingFees ? "border-r-4 border-r-accent" : ""
              ].join(" "),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-primary font-semibold whitespace-nowrap", children: app.applicationId }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground whitespace-nowrap", children: app.firmId }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate max-w-[180px]", children: app.businessName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate max-w-[180px]", children: app.proprietorName })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: getServiceTypeLabel(app.serviceType) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: app.status }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right whitespace-nowrap hidden lg:table-cell", children: app.expectedCompletionDate ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: urgent ? "text-destructive font-semibold" : "text-foreground",
                    children: [
                      formatDate(app.expectedCompletionDate),
                      urgent && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "destructive",
                          className: "ml-2 text-[10px] py-0 px-1.5",
                          children: "Urgent"
                        }
                      )
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right whitespace-nowrap", children: hasPendingFees ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-accent", children: formatCurrency(app.amountPending) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "—" }) })
              ]
            },
            app.id.toString()
          );
        }) })
      ] }) })
    ] }) })
  ] });
}
export {
  ApplicationsListPage as default
};
