import { c as createLucideIcon, j as jsxRuntimeExports, a as cn, r as reactExports, u as useComposedRefs, k as useAuth, l as getActorAsync, B as Button, A as ApplicationStatus, S as ServiceType } from "./index-BaKwMJOS.js";
import { B as Badge } from "./badge-BNst8HUv.js";
import { u as useId, e as createCollection, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Cd_o80Bj.js";
import { S as Skeleton } from "./skeleton-Dj-iI3Sb.js";
import { P as Primitive, a as composeEventHandlers, c as createContextScope } from "./index-MAa7LfqA.js";
import { u as useDirection, a as useCallbackRef } from "./index-Dj7rYGXi.js";
import { u as useControllableState } from "./index-CaVeNIJ0.js";
import { P as Presence } from "./index-Bz9Vyaf-.js";
import { b as printMonthlyCollectionPDF, e as exportToCSV, c as printLedgerPDF } from "./billTemplates-BvlAwhqh.js";
import { C as CircleAlert, I as IndianRupee } from "./indian-rupee-D0uVs7HZ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
const BookOpen = createLucideIcon("book-open", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5", key: "1osxxc" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M3 10h5", key: "r794hk" }],
  ["path", { d: "M17.5 17.5 16 16.3V14", key: "akvzfd" }],
  ["circle", { cx: "16", cy: "16", r: "6", key: "qoo3c4" }]
];
const CalendarClock = createLucideIcon("calendar-clock", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M8 18v-2", key: "qcmpov" }],
  ["path", { d: "M12 18v-4", key: "q1q25u" }],
  ["path", { d: "M16 18v-6", key: "15y0np" }]
];
const FileChartColumnIncreasing = createLucideIcon("file-chart-column-increasing", __iconNode);
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
  GROUP_NAME,
  [createCollectionScope]
);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
  }
);
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeRovingFocusGroup,
    orientation,
    loop = false,
    dir,
    currentTabStopId: currentTabStopIdProp,
    defaultCurrentTabStopId,
    onCurrentTabStopIdChange,
    onEntryFocus,
    preventScrollOnEntryFocus = false,
    ...groupProps
  } = props;
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const direction = useDirection(dir);
  const [currentTabStopId, setCurrentTabStopId] = useControllableState({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId ?? null,
    onChange: onCurrentTabStopIdChange,
    caller: GROUP_NAME
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = reactExports.useState(false);
  const handleEntryFocus = useCallbackRef(onEntryFocus);
  const getItems = useCollection(__scopeRovingFocusGroup);
  const isClickFocusRef = reactExports.useRef(false);
  const [focusableItemsCount, setFocusableItemsCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
    }
  }, [handleEntryFocus]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RovingFocusProvider,
    {
      scope: __scopeRovingFocusGroup,
      orientation,
      dir: direction,
      loop,
      currentTabStopId,
      onItemFocus: reactExports.useCallback(
        (tabStopId) => setCurrentTabStopId(tabStopId),
        [setCurrentTabStopId]
      ),
      onItemShiftTab: reactExports.useCallback(() => setIsTabbingBackOut(true), []),
      onFocusableItemAdd: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount + 1),
        []
      ),
      onFocusableItemRemove: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount - 1),
        []
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
          "data-orientation": orientation,
          ...groupProps,
          ref: composedRefs,
          style: { outline: "none", ...props.style },
          onMouseDown: composeEventHandlers(props.onMouseDown, () => {
            isClickFocusRef.current = true;
          }),
          onFocus: composeEventHandlers(props.onFocus, (event) => {
            const isKeyboardFocus = !isClickFocusRef.current;
            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
              const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
              event.currentTarget.dispatchEvent(entryFocusEvent);
              if (!entryFocusEvent.defaultPrevented) {
                const items = getItems().filter((item) => item.focusable);
                const activeItem = items.find((item) => item.active);
                const currentItem = items.find((item) => item.id === currentTabStopId);
                const candidateItems = [activeItem, currentItem, ...items].filter(
                  Boolean
                );
                const candidateNodes = candidateItems.map((item) => item.ref.current);
                focusFirst(candidateNodes, preventScrollOnEntryFocus);
              }
            }
            isClickFocusRef.current = false;
          }),
          onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
        }
      )
    }
  );
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRovingFocusGroup,
      focusable = true,
      active = false,
      tabStopId,
      children,
      ...itemProps
    } = props;
    const autoId = useId();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
    reactExports.useEffect(() => {
      if (focusable) {
        onFocusableItemAdd();
        return () => onFocusableItemRemove();
      }
    }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Collection.ItemSlot,
      {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!focusable) event.preventDefault();
              else context.onItemFocus(id);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if (event.key === "Tab" && event.shiftKey) {
                context.onItemShiftTab();
                return;
              }
              if (event.target !== event.currentTarget) return;
              const focusIntent = getFocusIntent(event, context.orientation, context.dir);
              if (focusIntent !== void 0) {
                if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                event.preventDefault();
                const items = getItems().filter((item) => item.focusable);
                let candidateNodes = items.map((item) => item.ref.current);
                if (focusIntent === "last") candidateNodes.reverse();
                else if (focusIntent === "prev" || focusIntent === "next") {
                  if (focusIntent === "prev") candidateNodes.reverse();
                  const currentIndex = candidateNodes.indexOf(event.currentTarget);
                  candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                }
                setTimeout(() => focusFirst(candidateNodes));
              }
            }),
            children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
          }
        )
      }
    );
  }
);
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl") return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
function nsToMs(ts) {
  return Number(ts / 1000000n);
}
function fmtDate(ts) {
  if (!ts) return "—";
  return new Date(nsToMs(ts)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function fmtRupee(n) {
  return `₹${Number(n).toLocaleString("en-IN")}`;
}
function daysRemaining(ts) {
  if (!ts) return null;
  const diff = nsToMs(ts) - Date.now();
  return Math.ceil(diff / (1e3 * 60 * 60 * 24));
}
function serviceTypeLabel(st) {
  const map = {
    [ServiceType.DrugLicenceNewFirm]: "Drug Licence – New Firm",
    [ServiceType.DrugLicenceRenewal]: "Drug Licence – Renewal",
    [ServiceType.DrugLicenceChangePremise]: "Drug Licence – Change Premise",
    [ServiceType.DrugLicenceAlterationOfPremise]: "Drug Licence – Alteration",
    [ServiceType.DrugLicenceAddPharmacist]: "Drug Licence – Add Pharmacist",
    [ServiceType.DrugLicenceRemovePharmacist]: "Drug Licence – Remove Pharmacist",
    [ServiceType.DrugLicenceChangeConstitution]: "Drug Licence – Constitution",
    [ServiceType.FoodLicenceNew]: "Food Licence – New",
    [ServiceType.FoodLicenceRenewal]: "Food Licence – Renewal",
    [ServiceType.GSTRegistration]: "GST Registration",
    [ServiceType.MSMEUdyam]: "MSME / Udyam",
    [ServiceType.Other]: "Other"
  };
  return map[st] ?? String(st);
}
function statusLabel(s) {
  const map = {
    [ApplicationStatus.New]: "New",
    [ApplicationStatus.FeesPending]: "Fees Pending",
    [ApplicationStatus.FeesReceived]: "Fees Received",
    [ApplicationStatus.DocumentsPending]: "Docs Pending",
    [ApplicationStatus.DocumentsCollected]: "Docs Collected",
    [ApplicationStatus.ApplicationFiled]: "Filed",
    [ApplicationStatus.UnderReview]: "Under Review",
    [ApplicationStatus.Approved]: "Approved",
    [ApplicationStatus.Rejected]: "Rejected",
    [ApplicationStatus.OnHold]: "On Hold",
    [ApplicationStatus.Completed]: "Completed"
  };
  return map[s] ?? String(s);
}
function statusClass(s) {
  switch (s) {
    case ApplicationStatus.Approved:
      return "status-completed";
    case ApplicationStatus.Completed:
      return "status-badge bg-emerald-500/15 text-emerald-700 dark:text-emerald-400";
    case ApplicationStatus.Rejected:
      return "status-badge bg-destructive/10 text-destructive";
    case ApplicationStatus.UnderReview:
    case ApplicationStatus.ApplicationFiled:
      return "status-in-progress";
    case ApplicationStatus.FeesPending:
    case ApplicationStatus.DocumentsPending:
      return "status-pending";
    case ApplicationStatus.OnHold:
      return "status-on-hold";
    default:
      return "status-badge bg-muted text-muted-foreground";
  }
}
function buildCsv(companyName, companyAddress, headers, rows) {
  const lines = [
    `"${companyName}"`,
    `"${companyAddress}"`,
    "",
    headers.map((h) => `"${h}"`).join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))
  ];
  return lines.join("\n");
}
function downloadCsv(content, filename) {
  const blob = new Blob([`\uFEFF${content}`], {
    type: "text/csv;charset=utf-8;"
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
const ALL_STATUSES = Object.values(ApplicationStatus);
const ALL_SERVICE_TYPES = Object.values(ServiceType);
function MultiSelect({ label, options, selected, onChange }) {
  const toggle = (val) => {
    if (selected.includes(val)) onChange(selected.filter((s) => s !== val));
    else onChange([...selected, val]);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: options.map((opt) => {
      const active = selected.includes(opt.value);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "aria-pressed": active,
          onClick: () => toggle(opt.value),
          className: `text-xs px-2.5 py-1 rounded-full border transition-smooth ${active ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/50"}`,
          children: opt.label
        },
        opt.value
      );
    }) })
  ] });
}
function EmptyState({ message }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "reports.empty_state",
      className: "flex flex-col items-center justify-center py-16 text-center",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileChartColumnIncreasing, { className: "w-12 h-12 text-muted-foreground/40 mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: message })
      ]
    }
  );
}
const SKEL_ROWS = ["r0", "r1", "r2", "r3", "r4"];
const SKEL_COLS_6 = ["c0", "c1", "c2", "c3", "c4", "c5"];
const SKEL_COLS_5 = ["c0", "c1", "c2", "c3", "c4"];
const SKEL_COLS_4 = ["c0", "c1", "c2", "c3"];
const SKEL_COLS_8 = ["c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7"];
function TableSkeleton({ cols }) {
  const colKeys = cols === 5 ? SKEL_COLS_5 : cols === 4 ? SKEL_COLS_4 : cols === 8 ? SKEL_COLS_8 : SKEL_COLS_6;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "reports.loading_state", className: "space-y-2 py-4", children: SKEL_ROWS.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4", children: colKeys.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 flex-1" }, `${row}-${col}`)) }, row)) });
}
function AppStatusTab() {
  const [selectedStatuses, setSelectedStatuses] = reactExports.useState([]);
  const [selectedServiceTypes, setSelectedServiceTypes] = reactExports.useState(
    []
  );
  const [dateFrom, setDateFrom] = reactExports.useState("");
  const [dateTo, setDateTo] = reactExports.useState("");
  const [results, setResults] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const runReport = reactExports.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const actor = await getActorAsync();
      const filter = {};
      if (selectedStatuses.length === 1)
        filter.status = selectedStatuses[0];
      if (selectedServiceTypes.length === 1)
        filter.serviceType = selectedServiceTypes[0];
      if (dateFrom)
        filter.dateFrom = BigInt(new Date(dateFrom).getTime()) * 1000000n;
      if (dateTo)
        filter.dateTo = BigInt(new Date(dateTo).getTime()) * 1000000n;
      const data = await actor.getApplicationsForReport(filter);
      let filtered = data;
      if (selectedStatuses.length > 1)
        filtered = filtered.filter(
          (a) => selectedStatuses.includes(a.status)
        );
      if (selectedServiceTypes.length > 1)
        filtered = filtered.filter(
          (a) => selectedServiceTypes.includes(a.serviceType)
        );
      setResults(filtered);
    } catch (e) {
      setError("Failed to load report. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [selectedStatuses, selectedServiceTypes, dateFrom, dateTo]);
  const exportCsv = () => {
    if (!results) return;
    const headers = [
      "Application ID",
      "Firm ID",
      "Business Name",
      "Service Type",
      "Status",
      "Expected Completion"
    ];
    const rows = results.map((a) => [
      a.applicationId,
      a.firmId,
      a.businessName,
      serviceTypeLabel(a.serviceType),
      statusLabel(a.status),
      fmtDate(a.expectedCompletionDate)
    ]);
    downloadCsv(
      buildCsv(
        "Barote Consultancy",
        "Licence Services Provider, India",
        headers,
        rows
      ),
      `application-status-report-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated rounded-xl p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Filters" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MultiSelect,
          {
            label: "Status",
            options: ALL_STATUSES.map((s) => ({
              value: s,
              label: statusLabel(s)
            })),
            selected: selectedStatuses,
            onChange: setSelectedStatuses
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MultiSelect,
          {
            label: "Service Type",
            options: ALL_SERVICE_TYPES.map((s) => ({
              value: s,
              label: serviceTypeLabel(s)
            })),
            selected: selectedServiceTypes,
            onChange: setSelectedServiceTypes
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "status-date-from",
              className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
              children: "From"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "status-date-from",
              type: "date",
              value: dateFrom,
              onChange: (e) => setDateFrom(e.target.value),
              className: "form-input h-9 text-sm",
              "data-ocid": "reports.status.date_from.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "status-date-to",
              className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
              children: "To"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "status-date-to",
              type: "date",
              value: dateTo,
              onChange: (e) => setDateTo(e.target.value),
              className: "form-input h-9 text-sm",
              "data-ocid": "reports.status.date_to.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: runReport,
            disabled: isLoading,
            className: "h-9 px-5",
            "data-ocid": "reports.status.run_button",
            children: isLoading ? "Loading…" : "Run Report"
          }
        ),
        results && results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            onClick: exportCsv,
            className: "h-9 gap-2",
            "data-ocid": "reports.status.export_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
              " Export CSV"
            ]
          }
        )
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-2 text-destructive text-sm p-4 bg-destructive/5 rounded-lg border border-destructive/20",
        "data-ocid": "reports.status.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 shrink-0" }),
          " ",
          error
        ]
      }
    ),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, { cols: 6 }),
    !isLoading && results !== null && (results.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { message: "No applications match the selected filters." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-elevated rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground", children: "Application ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground", children: "Firm ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground", children: "Business Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground", children: "Service Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground", children: "Expected Completion" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: results.map((app, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TableRow,
        {
          "data-ocid": `reports.status.item.${idx + 1}`,
          className: "hover:bg-muted/20 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-sm font-medium text-primary whitespace-nowrap", children: app.applicationId }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm whitespace-nowrap", children: app.firmId }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm font-medium min-w-0 max-w-[200px] truncate", children: app.businessName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground whitespace-nowrap", children: serviceTypeLabel(app.serviceType) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: statusClass(app.status), children: statusLabel(app.status) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm whitespace-nowrap", children: fmtDate(app.expectedCompletionDate) })
          ]
        },
        app.applicationId
      )) })
    ] }) }) })),
    !isLoading && results === null && /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { message: "Select filters and click 'Run Report' to see results." })
  ] });
}
function FeesTab() {
  const [selectedServiceType, setSelectedServiceType] = reactExports.useState("all");
  const [dateFrom, setDateFrom] = reactExports.useState("");
  const [dateTo, setDateTo] = reactExports.useState("");
  const [report, setReport] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const runReport = reactExports.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const actor = await getActorAsync();
      const filter = {};
      if (selectedServiceType !== "all")
        filter.serviceType = selectedServiceType;
      if (dateFrom)
        filter.dateFrom = BigInt(new Date(dateFrom).getTime()) * 1000000n;
      if (dateTo)
        filter.dateTo = BigInt(new Date(dateTo).getTime()) * 1000000n;
      const data = await actor.getFeesReport(filter);
      setReport(data);
    } catch (e) {
      setError("Failed to load fees report. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [selectedServiceType, dateFrom, dateTo]);
  const exportCsv = () => {
    if (!report) return;
    const headers = [
      "Application ID",
      "Business Name",
      "Service Type",
      "Amount Pending"
    ];
    const rows = report.applications.map((a) => [
      a.applicationId,
      a.businessName,
      serviceTypeLabel(a.serviceType),
      `₹${Number(a.amountPending).toLocaleString("en-IN")}`
    ]);
    downloadCsv(
      buildCsv(
        "Barote Consultancy",
        "Licence Services Provider, India",
        headers,
        rows
      ),
      `fees-collection-report-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated rounded-xl p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Filters" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "fees-service-type",
              className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
              children: "Service Type"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: selectedServiceType,
              onValueChange: setSelectedServiceType,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    id: "fees-service-type",
                    className: "h-9 w-56 text-sm",
                    "data-ocid": "reports.fees.service_type.select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Service Types" }),
                  ALL_SERVICE_TYPES.map((st) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: st, children: serviceTypeLabel(st) }, st))
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "fees-date-from",
              className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
              children: "From"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "fees-date-from",
              type: "date",
              value: dateFrom,
              onChange: (e) => setDateFrom(e.target.value),
              className: "form-input h-9 text-sm",
              "data-ocid": "reports.fees.date_from.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "fees-date-to",
              className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
              children: "To"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "fees-date-to",
              type: "date",
              value: dateTo,
              onChange: (e) => setDateTo(e.target.value),
              className: "form-input h-9 text-sm",
              "data-ocid": "reports.fees.date_to.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: runReport,
            disabled: isLoading,
            className: "h-9 px-5",
            "data-ocid": "reports.fees.run_button",
            children: isLoading ? "Loading…" : "Run Report"
          }
        ),
        report && report.applications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            onClick: exportCsv,
            className: "h-9 gap-2",
            "data-ocid": "reports.fees.export_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
              " Export CSV"
            ]
          }
        )
      ] })
    ] }),
    report && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "metric-card flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-5 h-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "metric-label", children: "Total Billed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground mt-1", children: fmtRupee(report.totalBilled) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "metric-card flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-chart-4/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-5 h-5 text-chart-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "metric-label", children: "Total Collected" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground mt-1", children: fmtRupee(report.totalCollected) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "alert-warning rounded-xl p-4 flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-accent/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-5 h-5 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "metric-label", children: "Total Pending" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-accent mt-1", children: fmtRupee(report.totalPending) })
        ] })
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-2 text-destructive text-sm p-4 bg-destructive/5 rounded-lg border border-destructive/20",
        "data-ocid": "reports.fees.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 shrink-0" }),
          " ",
          error
        ]
      }
    ),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, { cols: 6 }),
    !isLoading && report !== null && (report.applications.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { message: "No fee records found for the selected filters." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-elevated rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground", children: "Application ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground", children: "Business Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground", children: "Service Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground text-right", children: "Amount Pending" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: report.applications.map((app, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TableRow,
        {
          "data-ocid": `reports.fees.item.${idx + 1}`,
          className: "hover:bg-muted/20 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-sm font-medium text-primary whitespace-nowrap", children: app.applicationId }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm font-medium", children: app.businessName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground whitespace-nowrap", children: serviceTypeLabel(app.serviceType) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: app.amountPending > 0n ? "font-semibold text-accent" : "text-muted-foreground",
                children: fmtRupee(app.amountPending)
              }
            ) })
          ]
        },
        app.applicationId
      )) })
    ] }) }) })),
    !isLoading && report === null && /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { message: "Select filters and click 'Run Report' to see results." })
  ] });
}
function RenewalTab() {
  const [daysAhead, setDaysAhead] = reactExports.useState(30);
  const [results, setResults] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const runReport = reactExports.useCallback(async (days) => {
    setIsLoading(true);
    setError(null);
    try {
      const actor = await getActorAsync();
      const data = await actor.getRenewalReminders(BigInt(days));
      const sorted = [...data].sort((a, b) => {
        const da = a.renewalDate ? Number(a.renewalDate) : Number.POSITIVE_INFINITY;
        const db = b.renewalDate ? Number(b.renewalDate) : Number.POSITIVE_INFINITY;
        return da - db;
      });
      setResults(sorted);
    } catch (e) {
      setError("Failed to load renewal reminders. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const handleDaysChange = (days) => {
    setDaysAhead(days);
    runReport(days);
  };
  const exportCsv = () => {
    if (!results) return;
    const headers = [
      "Application ID",
      "Firm ID",
      "Business Name",
      "Renewal Date",
      "Days Remaining"
    ];
    const rows = results.map((a) => {
      const days = daysRemaining(a.renewalDate);
      return [
        a.applicationId,
        a.firmId,
        a.businessName,
        fmtDate(a.renewalDate),
        days !== null ? String(days) : "—"
      ];
    });
    downloadCsv(
      buildCsv(
        "Barote Consultancy",
        "Licence Services Provider, India",
        headers,
        rows
      ),
      `renewal-reminders-${daysAhead}days-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated rounded-xl p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Renewal window" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
        [30, 60, 90].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => handleDaysChange(d),
            "data-ocid": `reports.renewal.days_${d}.toggle`,
            className: `px-5 py-2 rounded-lg text-sm font-medium border transition-smooth ${daysAhead === d ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-card text-muted-foreground border-border hover:border-primary/50"}`,
            children: [
              "Next ",
              d,
              " days"
            ]
          },
          d
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => runReport(daysAhead),
            disabled: isLoading,
            "data-ocid": "reports.renewal.run_button",
            className: "px-5 py-2 rounded-lg text-sm font-medium bg-secondary text-secondary-foreground border border-border transition-smooth hover:bg-secondary/80 disabled:opacity-50",
            children: isLoading ? "Loading…" : "Refresh"
          }
        ),
        results && results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            onClick: exportCsv,
            className: "h-9 gap-2",
            "data-ocid": "reports.renewal.export_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
              " Export CSV"
            ]
          }
        )
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-2 text-destructive text-sm p-4 bg-destructive/5 rounded-lg border border-destructive/20",
        "data-ocid": "reports.renewal.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 shrink-0" }),
          " ",
          error
        ]
      }
    ),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, { cols: 5 }),
    !isLoading && results !== null && (results.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        message: `No renewals due within the next ${daysAhead} days.`
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-elevated rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground", children: "Application ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground", children: "Firm ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground", children: "Business Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground", children: "Renewal Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground text-right", children: "Days Remaining" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: results.map((app, idx) => {
        const days = daysRemaining(app.renewalDate);
        const urgent = days !== null && days < 30;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            "data-ocid": `reports.renewal.item.${idx + 1}`,
            className: `hover:bg-muted/20 transition-colors ${urgent ? "bg-destructive/3" : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-sm font-medium text-primary whitespace-nowrap", children: app.applicationId }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm whitespace-nowrap", children: app.firmId }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm font-medium", children: app.businessName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm whitespace-nowrap", children: fmtDate(app.renewalDate) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: days !== null ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: urgent ? "destructive" : "secondary",
                  className: urgent ? "bg-destructive/10 text-destructive border-destructive/20" : "",
                  children: [
                    days,
                    " ",
                    days === 1 ? "day" : "days"
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "—" }) })
            ]
          },
          app.applicationId
        );
      }) })
    ] }) }) })),
    !isLoading && results === null && /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { message: "Select a renewal window to see upcoming renewals." })
  ] });
}
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
function MonthlyCollectionTab() {
  const now = /* @__PURE__ */ new Date();
  const [selectedMonth, setSelectedMonth] = reactExports.useState(now.getMonth() + 1);
  const [selectedYear, setSelectedYear] = reactExports.useState(now.getFullYear());
  const [receipts, setReceipts] = reactExports.useState(null);
  const [modeFilter, setModeFilter] = reactExports.useState("all");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const yearOptions = Array.from(
    { length: 5 },
    (_, i) => now.getFullYear() - i
  );
  const load = reactExports.useCallback(async (year, month) => {
    setIsLoading(true);
    setError(null);
    try {
      const actor = await getActorAsync();
      const data = await actor.getMonthlyCollection(
        BigInt(year),
        BigInt(month)
      );
      setReceipts(data);
    } catch (e) {
      setError("Failed to load monthly collection. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const handleLoad = () => load(selectedYear, selectedMonth);
  const monthYearLabel = `${MONTHS[selectedMonth - 1]} ${selectedYear}`;
  const filteredReceipts = receipts ? modeFilter === "all" ? receipts : receipts.filter((r) => r.paymentMode === modeFilter) : [];
  const totalCollection = filteredReceipts.reduce(
    (s, r) => s + r.amountReceived,
    0
  );
  const byMode = {};
  if (receipts) {
    for (const r of receipts) {
      byMode[r.paymentMode] = (byMode[r.paymentMode] ?? 0) + r.amountReceived;
    }
  }
  const handleExportPDF = async () => {
    if (!receipts) return;
    const actor = await getActorAsync();
    const companyInfo = await actor.getCompanyInfo();
    printMonthlyCollectionPDF(filteredReceipts, monthYearLabel, companyInfo);
  };
  const handleExportCSV = () => {
    if (!filteredReceipts.length) return;
    exportToCSV(
      [
        "Receipt No.",
        "Date",
        "Firm Name",
        "Firm ID",
        "Amount Received (₹)",
        "Payment Mode",
        "Reference No.",
        "Remarks"
      ],
      filteredReceipts.map((r) => [
        r.receiptNumber,
        new Date(Number(r.receiptDate) / 1e6).toLocaleDateString("en-IN"),
        r.firmName,
        r.firmId,
        r.amountReceived,
        r.paymentMode,
        r.referenceNo ?? "",
        r.remarks ?? ""
      ]),
      `monthly-collection-${monthYearLabel.replace(" ", "-")}.csv`
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated rounded-xl p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Select Period" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "reports-month-select",
              className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
              children: "Month"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: String(selectedMonth),
              onValueChange: (v) => setSelectedMonth(Number(v)),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    id: "reports-month-select",
                    className: "h-9 w-40 text-sm",
                    "data-ocid": "reports.monthly.month.select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: MONTHS.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(i + 1), children: m }, m)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "reports-year-select",
              className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
              children: "Year"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: String(selectedYear),
              onValueChange: (v) => setSelectedYear(Number(v)),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    id: "reports-year-select",
                    className: "h-9 w-28 text-sm",
                    "data-ocid": "reports.monthly.year.select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: yearOptions.map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(y), children: y }, y)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleLoad,
            disabled: isLoading,
            className: "h-9 px-5",
            "data-ocid": "reports.monthly.load_button",
            children: isLoading ? "Loading…" : "Load"
          }
        )
      ] }),
      receipts && receipts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide", children: "Filter by Payment Mode" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: ["all", ...Object.keys(byMode)].map((mode) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setModeFilter(mode),
            "data-ocid": `reports.monthly.mode_filter.${mode}`,
            className: `text-xs px-2.5 py-1 rounded-full border transition-smooth ${modeFilter === mode ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/50"}`,
            children: mode === "all" ? "All" : mode
          },
          mode
        )) })
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-2 text-destructive text-sm p-4 bg-destructive/5 rounded-lg border border-destructive/20",
        "data-ocid": "reports.monthly.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 shrink-0" }),
          " ",
          error
        ]
      }
    ),
    receipts && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "metric-card flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-5 h-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "metric-label", children: "Total Collection" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-display font-bold text-foreground mt-1", children: [
            "₹",
            totalCollection.toLocaleString("en-IN", {
              maximumFractionDigits: 2
            })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "metric-card flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-chart-4/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileChartColumnIncreasing, { className: "w-5 h-5 text-chart-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "metric-label", children: "Receipts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground mt-1", children: filteredReceipts.length })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated rounded-xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2", children: "By Payment Mode" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          Object.entries(byMode).map(([mode, amt]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: mode }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
              "₹",
              amt.toLocaleString("en-IN", { maximumFractionDigits: 2 })
            ] })
          ] }, mode)),
          Object.keys(byMode).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "—" })
        ] })
      ] })
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, { cols: 8 }),
    !isLoading && receipts !== null && (filteredReceipts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { message: "No receipts found for the selected period." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            onClick: handleExportPDF,
            className: "h-9 gap-2",
            "data-ocid": "reports.monthly.export_pdf_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
              " Export PDF"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            onClick: handleExportCSV,
            className: "h-9 gap-2",
            "data-ocid": "reports.monthly.export_csv_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
              " Export CSV"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-elevated rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground", children: "#" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground", children: "Receipt No." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground", children: "Firm Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground", children: "Firm ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground text-right", children: "Amount (₹)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground", children: "Payment Mode" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground", children: "Reference" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filteredReceipts.map((r, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            "data-ocid": `reports.monthly.item.${idx + 1}`,
            className: "hover:bg-muted/20 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: idx + 1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-sm font-medium text-primary whitespace-nowrap", children: r.receiptNumber }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm whitespace-nowrap", children: new Date(
                Number(r.receiptDate) / 1e6
              ).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric"
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm font-medium min-w-0 max-w-[180px] truncate", children: r.firmName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm whitespace-nowrap", children: r.firmId }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right font-semibold text-sm", children: [
                "₹",
                r.amountReceived.toLocaleString("en-IN", {
                  maximumFractionDigits: 2
                })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: r.paymentMode }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: r.referenceNo ?? "—" })
            ]
          },
          r.id
        )) })
      ] }) }) })
    ] })),
    !isLoading && receipts === null && /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { message: "Select a month and year, then click Load to view collection data." })
  ] });
}
function LedgerTab() {
  const [applicationId, setApplicationId] = reactExports.useState("");
  const [appIdNat, setAppIdNat] = reactExports.useState("");
  const [entries, setEntries] = reactExports.useState(null);
  const [appInfo, setAppInfo] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const load = async () => {
    if (!applicationId.trim() || !appIdNat.trim()) {
      setError("Please enter both Application ID and numeric ID.");
      return;
    }
    const nat = BigInt(appIdNat.trim());
    setIsLoading(true);
    setError(null);
    try {
      const actor = await getActorAsync();
      const data = await actor.getApplicationLedger(applicationId.trim(), nat);
      const appData = await actor.getApplication(nat);
      setEntries(data);
      setAppInfo({
        applicationId: applicationId.trim(),
        businessName: (appData == null ? void 0 : appData.businessName) ?? applicationId.trim(),
        firmId: (appData == null ? void 0 : appData.firmId) ?? ""
      });
    } catch (e) {
      setError("Failed to load ledger. Check Application ID and try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  const sorted = entries ? [...entries].sort((a, b) => Number(a.date) - Number(b.date)) : [];
  let runningBalance = 0;
  const rowsWithBalance = sorted.map(
    (entry) => {
      runningBalance += entry.credit - entry.debit;
      return { ...entry, balance: runningBalance };
    }
  );
  const totalDebits = sorted.reduce((s, e) => s + e.debit, 0);
  const totalCredits = sorted.reduce((s, e) => s + e.credit, 0);
  const netBalance = totalCredits - totalDebits;
  const handleExportPDF = async () => {
    if (!entries || !appInfo) return;
    const actor = await getActorAsync();
    const companyInfo = await actor.getCompanyInfo();
    printLedgerPDF(entries, appInfo, companyInfo);
  };
  const handleExportCSV = () => {
    if (!rowsWithBalance.length) return;
    exportToCSV(
      [
        "Date",
        "Transaction Type",
        "Description",
        "Debit (₹)",
        "Credit (₹)",
        "Balance (₹)",
        "Reference"
      ],
      rowsWithBalance.map((e) => [
        new Date(Number(e.date) / 1e6).toLocaleDateString("en-IN"),
        e.transactionType,
        e.description,
        e.debit,
        e.credit,
        e.balance,
        e.reference ?? ""
      ]),
      `ledger-${(appInfo == null ? void 0 : appInfo.applicationId) ?? "app"}-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated rounded-xl p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Search Application Ledger" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "ledger-app-id",
              className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
              children: "Application ID (Text)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "ledger-app-id",
              type: "text",
              value: applicationId,
              onChange: (e) => setApplicationId(e.target.value),
              placeholder: "e.g. APP-001",
              className: "form-input h-9 text-sm w-48",
              "data-ocid": "reports.ledger.app_id.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "ledger-app-nat",
              className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
              children: "Application Numeric ID"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "ledger-app-nat",
              type: "number",
              value: appIdNat,
              onChange: (e) => setAppIdNat(e.target.value),
              placeholder: "e.g. 1",
              className: "form-input h-9 text-sm w-32",
              "data-ocid": "reports.ledger.app_nat.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: load,
            disabled: isLoading,
            className: "h-9 px-5",
            "data-ocid": "reports.ledger.load_button",
            children: isLoading ? "Loading…" : "Load Ledger"
          }
        )
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-2 text-destructive text-sm p-4 bg-destructive/5 rounded-lg border border-destructive/20",
        "data-ocid": "reports.ledger.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 shrink-0" }),
          " ",
          error
        ]
      }
    ),
    entries && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "metric-card flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-5 h-5 text-destructive" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "metric-label", children: "Total Debits" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-display font-bold text-destructive mt-1", children: [
            "₹",
            totalDebits.toLocaleString("en-IN", {
              maximumFractionDigits: 2
            })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "metric-card flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-chart-4/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-5 h-5 text-chart-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "metric-label", children: "Total Credits" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-display font-bold text-foreground mt-1", children: [
            "₹",
            totalCredits.toLocaleString("en-IN", {
              maximumFractionDigits: 2
            })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `metric-card flex items-start gap-3 ${netBalance < 0 ? "border-destructive/30" : "border-chart-4/30"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-5 h-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "metric-label", children: "Net Balance" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: `text-2xl font-display font-bold mt-1 ${netBalance < 0 ? "text-destructive" : "text-chart-4"}`,
                  children: [
                    "₹",
                    netBalance.toLocaleString("en-IN", {
                      maximumFractionDigits: 2
                    })
                  ]
                }
              )
            ] })
          ]
        }
      )
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, { cols: 6 }),
    !isLoading && entries !== null && (rowsWithBalance.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { message: "No ledger entries found for this application." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            onClick: handleExportPDF,
            className: "h-9 gap-2",
            "data-ocid": "reports.ledger.export_pdf_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
              " Export PDF"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            onClick: handleExportCSV,
            className: "h-9 gap-2",
            "data-ocid": "reports.ledger.export_csv_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
              " Export CSV"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-elevated rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground", children: "#" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground", children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground text-right", children: "Debit (₹)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground text-right", children: "Credit (₹)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground text-right", children: "Balance (₹)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground", children: "Reference" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: rowsWithBalance.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            "data-ocid": `reports.ledger.item.${idx + 1}`,
            className: "hover:bg-muted/20 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: idx + 1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm whitespace-nowrap", children: new Date(
                Number(entry.date) / 1e6
              ).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric"
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: entry.transactionType }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm min-w-0 max-w-[220px] truncate", children: entry.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right text-sm", children: entry.debit > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-destructive font-medium", children: [
                "₹",
                entry.debit.toLocaleString("en-IN", {
                  maximumFractionDigits: 2
                })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right text-sm", children: entry.credit > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-chart-4 font-medium", children: [
                "₹",
                entry.credit.toLocaleString("en-IN", {
                  maximumFractionDigits: 2
                })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TableCell,
                {
                  className: `text-right text-sm font-semibold ${entry.balance < 0 ? "text-destructive" : "text-foreground"}`,
                  children: [
                    "₹",
                    entry.balance.toLocaleString("en-IN", {
                      maximumFractionDigits: 2
                    })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: entry.reference ?? "—" })
            ]
          },
          `${String(entry.date)}-${idx}`
        )) })
      ] }) }) })
    ] })),
    !isLoading && entries === null && /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { message: "Enter an Application ID and load to view the ledger." })
  ] });
}
function ReportsPage() {
  const { session } = useAuth();
  if (!session) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Please log in to view reports." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "reports.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 border-b border-border pb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "w-6 h-6 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl sm:text-2xl font-display font-bold text-foreground", children: "Reports" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Generate and export reports for Barote Consultancy" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "status", className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto -mx-1 px-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-muted/40 border border-border p-1 h-auto rounded-xl gap-1 w-max min-w-full sm:w-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabsTrigger,
          {
            value: "status",
            className: "rounded-lg px-3 py-2 text-sm data-[state=active]:bg-card data-[state=active]:shadow-sm whitespace-nowrap",
            "data-ocid": "reports.status.tab",
            children: "App Status"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabsTrigger,
          {
            value: "fees",
            className: "rounded-lg px-3 py-2 text-sm data-[state=active]:bg-card data-[state=active]:shadow-sm whitespace-nowrap",
            "data-ocid": "reports.fees.tab",
            children: "Fees Collection"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabsTrigger,
          {
            value: "renewal",
            className: "rounded-lg px-3 py-2 text-sm data-[state=active]:bg-card data-[state=active]:shadow-sm whitespace-nowrap",
            "data-ocid": "reports.renewal.tab",
            children: "Renewals"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabsTrigger,
          {
            value: "monthly",
            className: "rounded-lg px-3 py-2 text-sm data-[state=active]:bg-card data-[state=active]:shadow-sm whitespace-nowrap",
            "data-ocid": "reports.monthly.tab",
            children: "Monthly Collection"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "ledger",
            className: "rounded-lg px-3 py-2 text-sm data-[state=active]:bg-card data-[state=active]:shadow-sm whitespace-nowrap",
            "data-ocid": "reports.ledger.tab",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5 mr-1 inline" }),
              "Ledger"
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "status", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AppStatusTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "fees", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FeesTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "renewal", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RenewalTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "monthly", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MonthlyCollectionTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "ledger", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LedgerTab, {}) })
    ] })
  ] });
}
export {
  ReportsPage as default
};
