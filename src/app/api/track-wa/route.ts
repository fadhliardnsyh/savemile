import { type NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";

function parseUserAgent(ua: string | null) {
  if (!ua) {
    return { device: "unknown" as const, browser: "Unknown", os: "Unknown" };
  }

  // Device
  let device: "mobile" | "tablet" | "desktop" | "unknown" = "desktop";
  if (/ipad|tablet|(android(?!.*mobile))/i.test(ua)) {
    device = "tablet";
  } else if (/mobile|iphone|ipod|android/i.test(ua)) {
    device = "mobile";
  }

  // OS
  let os = "Other";
  if (/iphone|ipad|ipod/i.test(ua)) os = "iOS";
  else if (/android/i.test(ua)) os = "Android";
  else if (/macintosh|mac os x/i.test(ua)) os = "macOS";
  else if (/windows nt/i.test(ua)) os = "Windows";
  else if (/linux/i.test(ua)) os = "Linux";

  // Browser
  let browser = "Other";
  if (/edg/i.test(ua)) browser = "Edge";
  else if (/chrome|crios/i.test(ua) && !/opr|opera/i.test(ua))
    browser = "Chrome";
  else if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) browser = "Safari";
  else if (/firefox|fxios/i.test(ua)) browser = "Firefox";
  else if (/opr|opera/i.test(ua)) browser = "Opera";
  else if (/samsungbrowser/i.test(ua)) browser = "Samsung Internet";

  return { device, browser, os };
}

export async function POST(req: NextRequest) {
  try {
    let body: Record<string, unknown> = {};
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      body = await req.json().catch(() => ({}));
    } else {
      const text = await req.text().catch(() => "");
      if (text) {
        try {
          body = JSON.parse(text);
        } catch {
          body = {};
        }
      }
    }

    const ua = req.headers.get("user-agent");
    const { device, browser, os } = parseUserAgent(ua);

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "";
    const country = req.headers.get("x-vercel-ip-country") || "";
    const city = req.headers.get("x-vercel-ip-city") || "";
    const referrer =
      (body.referrer as string) || req.headers.get("referer") || "";

    const payload = await getPayload({ config: configPromise });

    await payload.create({
      collection: "whatsapp-clicks",
      data: {
        page: (body.page as string) || "/",
        buttonLocation: (body.buttonLocation as string) || "WhatsApp Link",
        buttonLabel: (body.buttonLabel as string) || "",
        targetUrl: (body.targetUrl as string) || "",
        device,
        browser,
        os,
        referrer,
        utmSource: (body.utmSource as string) || "",
        utmMedium: (body.utmMedium as string) || "",
        utmCampaign: (body.utmCampaign as string) || "",
        ip: ip ? ip.replace(/:\d+$/, "") : undefined,
        country: country || undefined,
        city: city || undefined,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to log WhatsApp click:", error);
    return NextResponse.json(
      { success: false, error: "Tracking failed" },
      { status: 500 },
    );
  }
}
