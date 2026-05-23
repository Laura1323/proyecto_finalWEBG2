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

      Swal.fire(
        "Cuenta creada",
        "Ya puedes reportar incidentes.",
        "success"
      );

      navigate("/dashboard", {
        replace: true,
      });

    } catch (error) {

      // eslint-disable-next-line no-useless-assignment
      let message = "Ocurrio un error inesperado";

      switch (error.code) {

        case "auth/email-already-in-use":
          message = "El correo ya esta registrado";
          break;

        case "auth/invalid-email":
          message = "Correo electronico invalido";
          break;

        case "auth/weak-password":
          message =
            "La contraseña debe tener minimo 6 caracteres";
          break;

        case "auth/missing-password":
          message = "Debes ingresar una contraseña";
          break;

        case "auth/network-request-failed":
          message =
            "Error de conexion. Verifica internet";
          break;

        default:
          message = error.message;
      }

      Swal.fire(
        "Error al registrar",
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
        Crear cuenta
      </h2>

      <RegisterForm
        onSubmit={handleRegister}
        loading={loading}
      />
    </>
  );
}