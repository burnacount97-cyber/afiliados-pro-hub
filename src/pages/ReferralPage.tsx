import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiFetchPublic } from "@/lib/api";

export default function ReferralPage() {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const run = async () => {
      if (!code) {
        navigate("/auth", { replace: true });
        return;
      }
      try {
        const result = await apiFetchPublic(`/referrals/validate?code=${encodeURIComponent(code)}`);
        if (result.valid) {
          localStorage.setItem("referrerCode", code);
          navigate(`/auth?ref=${encodeURIComponent(code)}&locked=1`, { replace: true });
          return;
        }
        localStorage.removeItem("referrerCode");
        navigate("/auth?refInvalid=1", { replace: true });
      } catch (error) {
        navigate("/auth?refInvalid=1", { replace: true });
      }
    };

    run();
  }, [code, navigate]);

  return null;
}
