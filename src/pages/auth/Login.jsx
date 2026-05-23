import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LoginForm from "../../components/auth/LoginForm";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      await login(data);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      Swal.fire("Error al iniciar sesion", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="mb-2 text-2xl font-black text-slate-950">Iniciar sesion</h2>
      <p className="mb-6 text-sm text-slate-500">Ingresa para reportar o gestionar incidentes.</p>
      <LoginForm onSubmit={handleLogin} loading={loading} />
    </>
  );
}
