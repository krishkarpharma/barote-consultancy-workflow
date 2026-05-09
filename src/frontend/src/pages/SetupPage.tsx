import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { Building2, Eye, EyeOff, Lock, User } from "lucide-react";
import { useState } from "react";
import { getActorAsync, hashPassword } from "../contexts/AuthContext";

export default function SetupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    displayName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.displayName.trim()) return setError("Display name is required.");
    if (!form.username.trim()) return setError("Username is required.");
    if (form.password.length < 8)
      return setError("Password must be at least 8 characters.");
    if (form.password !== form.confirmPassword)
      return setError("Passwords do not match.");

    setLoading(true);
    try {
      const actor = await getActorAsync();
      const hash = await hashPassword(form.password);
      const result = await actor.setupAdmin(
        form.username.trim(),
        hash,
        form.displayName.trim(),
      );
      if (result.__kind__ === "err") {
        setError(result.err);
      } else {
        navigate({ to: "/login" });
      }
    } catch (err) {
      setError("Setup failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo / branding */}
        <div className="text-center mb-8">
          <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4 shadow-elevated">
            <Building2 className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Barote Consultancy
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Licence Services Workflow
          </p>
        </div>

        <div className="card-elevated rounded-xl p-6">
          <div className="mb-6">
            <h2 className="text-lg font-display font-semibold text-foreground">
              First-Run Setup
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Create the administrator account to get started.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            data-ocid="setup.form"
          >
            <div className="space-y-1.5">
              <Label htmlFor="displayName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="displayName"
                  type="text"
                  placeholder="Admin User"
                  value={form.displayName}
                  onChange={(e) =>
                    setForm({ ...form, displayName: e.target.value })
                  }
                  className="pl-9"
                  autoComplete="name"
                  required
                  data-ocid="setup.display_name_input"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="admin"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  className="pl-9"
                  autoComplete="username"
                  required
                  data-ocid="setup.username_input"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPw ? "text" : "password"}
                  placeholder="Min 8 characters"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="pl-9 pr-10"
                  autoComplete="new-password"
                  required
                  data-ocid="setup.password_input"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showPw ? "text" : "password"}
                  placeholder="Repeat password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                  className="pl-9"
                  autoComplete="new-password"
                  required
                  data-ocid="setup.confirm_password_input"
                />
              </div>
            </div>

            {error && (
              <p
                className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2"
                role="alert"
                data-ocid="setup.error_state"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              data-ocid="setup.submit_button"
            >
              {loading ? "Creating account…" : "Create Admin Account"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
