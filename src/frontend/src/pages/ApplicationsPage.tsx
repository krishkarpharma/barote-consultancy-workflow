import { useNavigate } from "@tanstack/react-router";
import { FileText, Plus } from "lucide-react";
import { EmptyState } from "../components/EmptyState";

export default function ApplicationsPage() {
  const navigate = useNavigate();
  return (
    <div className="p-6">
      <EmptyState
        icon={FileText}
        title="Applications"
        description="No applications yet. Create your first application."
        actionLabel="New Application"
        onAction={() => navigate({ to: "/applications/new" })}
        data-ocid="applications.empty_state"
      />
    </div>
  );
}
