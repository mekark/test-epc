import { NextRequest, NextResponse } from "next/server";

const UPSTREAM_ENDPOINT =
  "https://mekark-mail.onrender.com/api/enquiry-form";

function resolveUpstreamOrigin(request: NextRequest) {
  const directOrigin = request.headers.get("origin");

  if (directOrigin) {
    return directOrigin;
  }

  const forwardedHost =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host");

  const forwardedProto =
    request.headers.get("x-forwarded-proto") ||
    "https";

  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  return new URL(request.url).origin;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // REQUIRED FIELDS ONLY

    if (
      !body.name ||
      !body.phone ||
      !body.service ||
      !body.sqf
    ) {
      return NextResponse.json(
        {
          message:
            "Name, phone, project type and sqft are required",
        },
        { status: 400 }
      );
    }

    const upstreamOrigin =
      resolveUpstreamOrigin(request);

    const referer = request.headers.get("referer");

    // INVISIBLE SOURCE CAPTURE
    // Records which site + page the enquiry was submitted from
    // without any visible form field.
    const payload = {
      ...body,
      sourceDomain:
        body.sourceDomain ||
        (() => {
          try {
            return new URL(referer || upstreamOrigin).hostname;
          } catch {
            return undefined;
          }
        })(),
      sourceUrl:
        body.sourceUrl ||
        body.pageUrl ||
        referer ||
        upstreamOrigin ||
        undefined,
    };

    const response = await fetch(UPSTREAM_ENDPOINT, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: upstreamOrigin,
        ...(referer ? { Referer: referer } : {}),
      },

      body: JSON.stringify(payload),

      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();

      console.error(
        "External API error:",
        errorText
      );

      return NextResponse.json(
        {
          message:
            "Failed to submit form to external service",
        },
        { status: response.status }
      );
    }

    const data = await response
      .json()
      .catch(() => ({}));

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API route error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}