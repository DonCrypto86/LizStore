"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError("");
    const form = new FormData(event.currentTarget);
    try {
      const { error } = await createClient().auth.signInWithPassword({ email: String(form.get("email")), password: String(form.get("password")) });
      if (error) throw error;
      router.push("/admin"); router.refresh();
    } catch { setError("Correo o contraseña incorrectos."); setLoading(false); }
  }
  return <main className="login-page"><form className="login-card" onSubmit={submit}><div className="brand admin-brand"><span className="brand-mark">L</span><span><strong>Liz Store</strong><small>Administración</small></span></div><h1>Hola, Liz</h1><p>Ingresá para administrar tus productos.</p><label>Correo electrónico<input name="email" type="email" autoComplete="email" required /></label><label>Contraseña<input name="password" type="password" autoComplete="current-password" required /></label>{error && <div className="form-error">{error}</div>}<button disabled={loading}>{loading ? "Ingresando…" : "Ingresar"}</button><a href="/">← Volver a la tienda</a></form></main>;
}
