import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ReferralPage() {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      localStorage.setItem("referrerCode", code);
      navigate(`/auth?ref=${code}`, { replace: true });
      return;
    }
    navigate("/auth", { replace: true });
  }, [code, navigate]);

  return null;
}
