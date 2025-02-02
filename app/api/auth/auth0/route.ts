// app/api/auth/login/route.ts
export async function GET(req: Request) {
    // Reconstruct the URL to the pages router version
    const loginUrl = new URL("/api/auth/login", process.env.NEXT_PUBLIC_APP_URL);
  
    // Forward the request
    const response = await fetch(loginUrl.toString(), {
      method: "GET",
      headers: {
        cookie: req.headers.get("cookie") || "",
        // etc...
      },
      // ...
    });
  
    // Return the response or do a redirect
    return new Response(null, { status: 302, headers: { Location: "/dashboard" } });
  }
  