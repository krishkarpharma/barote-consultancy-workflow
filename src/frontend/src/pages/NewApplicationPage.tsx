import { Plus } from "lucide-react";
import { EmptyState } from "../components/EmptyState";

export default function NewApplicationPage() {
  return (
    <div className="p-6">
      <EmptyState
        icon={Plus}
        title="New Application"
        description="Application form will appear here."
        data-ocid="new_application.empty_state"
      />
    </div>
  );
}
