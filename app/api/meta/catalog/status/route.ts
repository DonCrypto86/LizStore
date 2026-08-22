import { NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type MetaCatalogResponse = {
  id?: string;
  name?: string;
  error?: { message?: string };
};

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ connected: false, message: "Supabase no está configurado." }, { status: 503 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ connected: false, message: "Sesión no autorizada." }, { status: 401 });
  }

  const catalogId = process.env.META_CATALOG_ID;
  const accessToken = process.env.META_CATALOG_ACCESS_TOKEN;
  const version = process.env.META_GRAPH_API_VERSION || "v24.0";
  if (!catalogId || !accessToken) {
    return NextResponse.json({ connected: false, message: "Falta configurar Meta Catalog API." }, { status: 503 });
  }

  try {
    const response = await fetch(`https://graph.facebook.com/${version}/${catalogId}?fields=id,name`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
      signal: AbortSignal.timeout(10_000)
    });
    const payload = await response.json() as MetaCatalogResponse;

    if (!response.ok || !payload.id) {
      return NextResponse.json({
        connected: false,
        message: payload.error?.message || "Meta rechazó la conexión con el catálogo."
      }, { status: 502 });
    }

    return NextResponse.json({ connected: true, catalog: { id: payload.id, name: payload.name || "WhatsApp Product Catalog" } });
  } catch {
    return NextResponse.json({ connected: false, message: "No se pudo contactar con Meta." }, { status: 502 });
  }
}
