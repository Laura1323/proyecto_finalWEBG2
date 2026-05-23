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

      navigate("/dashboard", {
        replace: true,
      });

    } catch (error) {

      // eslint-disable-next-line no-useless-assignment
      let message = "Ocurrio un error inesperado";

      switch (error.code) {

        case "auth/user-not-found":
          message = "Usuario no registrado";
          break;

        case "auth/wrong-password":
          message = "Contraseña incorrecta";
          break;

        case "auth/invalid-credential":
          message = "Correo o contraseña incorrectos";
          break;

        case "auth/invalid-email":
          message = "Correo electronico invalido";
          break;

        case "auth/too-many-requests":
          message =
            "Demasiados intentos. Intenta mas tarde";
          break;

        default:
          message = error.message;
      }

      Swal.fire(
        "Error al iniciar sesion",
        message,
        "error"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="mb-2 text-2xl font-black text-slate-950">
        Iniciar sesion
      </h2>

      <p className="mb-6 text-sm text-slate-500">
        Ingresa para reportar o gestionar incidentes.
      </p>

      <LoginForm
        onSubmit={handleLogin}
        loading={loading}
      />
    </>
  );
}