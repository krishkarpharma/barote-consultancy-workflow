import { FileText } from "lucide-react";
import { EmptyState } from "../components/EmptyState";

export default function EditApplicationPage() {
  return (
    <div className="p-6">
      <EmptyState
        icon={FileText}
        title="Edit Application"
        description="Application edit form will appear here."
        data-ocid="edit_application.empty_state"
      />
    </div>
  );
}
