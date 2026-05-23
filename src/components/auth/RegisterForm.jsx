import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function RegisterForm({ onSubmit, loading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <label className="block">
        <span className="text-sm font-semibold text-slate-700">Nombre completo</span>
        <input
          className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-brand-600"
          placeholder="Tu nombre"
          {...register("nombre", { required: "El nombre es obligatorio." })}
        />
        {errors.nombre && <small className="text-red-600">{errors.nombre.message}</small>}
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-slate-700">Correo</span>
        <input
          className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-brand-600"
          type="email"
          placeholder="usuario@uniamazonia.edu.co"
          {...register("correo", { required: "El correo es obligatorio." })}
        />
        {errors.correo && <small className="text-red-600">{errors.correo.message}</small>}
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-slate-700">Contrasena</span>
        <input
          className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-brand-600"
          type="password"
          {...register("password", {
            required: "La contrasena es obligatoria.",
            minLength: { value: 6, message: "Minimo 6 caracteres." },
          })}
        />
        {errors.password && <small className="text-red-600">{errors.password.message}</small>}
      </label>
      <button type="submit" disabled={loading} className="w-full rounded-lg bg-brand-700 px-5 py-3 font-bold text-white hover:bg-brand-900">
        {loading ? "Creando cuenta..." : "Crear cuenta"}
      </button>
      <p className="text-center text-sm text-slate-600">
        Ya tienes cuenta?{" "}
        <Link to="/login" className="font-semibold text-brand-700">
          Inicia sesion
        </Link>
      </p>
    </form>
  );
}
