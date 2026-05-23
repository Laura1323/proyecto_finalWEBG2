import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import RegisterForm from "../../components/auth/RegisterForm";
import { useAuth } from "../../hooks/useAuth";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    setLoading(true);
    try {
      await register(data);
      Swal.fire("Cuenta creada", "Ya puedes reportar incidentes.", "success");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      Swal.fire("Error al registrar", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="mb-2 text-2xl font-black text-slate-950">Crear cuenta</h2>
      <RegisterForm onSubmit={handleRegister} loading={loading} />
    </>
  );
}
