import { j as jsxRuntimeExports } from "./index-BaKwMJOS.js";
import { c as getStatusLabel, d as getStatusClass } from "./index-Cd6EN6bb.js";
function StatusBadge({ status, className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${getStatusClass(status)} ${className}`, children: getStatusLabel(status) });
}
export {
  StatusBadge as S
};
