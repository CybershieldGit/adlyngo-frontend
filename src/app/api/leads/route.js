export async function POST(request) {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (!webhookUrl) {
    return Response.json({ error: "Lead webhook is not configured." }, { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const payload = {
    name: String(body.name || "").trim(),
    email: String(body.email || "").trim(),
    phone: String(body.phone || "").trim(),
    company: String(body.company || "").trim(),
    address: String(body.address || "").trim(),
    message: String(body.message || "").trim(),
  };

  if (!payload.name || !payload.email || !payload.phone || !payload.message) {
    return Response.json({ error: "Missing required lead fields." }, { status: 400 });
  }

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!webhookResponse.ok) {
      return Response.json({ error: "Failed to submit lead." }, { status: 502 });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Failed to submit lead." }, { status: 502 });
  }
}
