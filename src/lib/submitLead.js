export function buildLeadPayload(formData) {
  const messageParts = [formData.goals?.trim()];
  const services = Array.isArray(formData.service)
    ? formData.service
    : formData.service
      ? [formData.service]
      : [];

  if (services.length) {
    messageParts.push(`Services: ${services.join(", ")}`);
  }

  if (formData.budget) {
    messageParts.push(`Budget: ${formData.budget}`);
  }

  return {
    name: formData.fullName?.trim() || "",
    email: formData.workEmail?.trim() || "",
    phone: formData.mobileNumber?.trim() || "",
    company: formData.businessName?.trim() || "",
    address: "",
    message: messageParts.filter(Boolean).join("\n"),
  };
}

export function buildContactPayload(formData) {
  const messageParts = [];
  const services = Array.isArray(formData.service)
    ? formData.service
    : formData.service
      ? [formData.service]
      : [];

  if (services.length) {
    messageParts.push(`Services: ${services.join(", ")}`);
  }

  if (formData.message?.trim()) {
    messageParts.push(formData.message.trim());
  }

  return {
    name: formData.name?.trim() || "",
    email: formData.email?.trim() || "",
    phone: formData.phone?.trim() || "",
    company: "",
    address: "",
    message: messageParts.filter(Boolean).join("\n"),
  };
}

async function postLeadPayload(payload) {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Failed to submit lead.");
  }

  return data;
}

export async function submitLead(formData) {
  return postLeadPayload(buildLeadPayload(formData));
}

export async function submitContactForm(formData) {
  return postLeadPayload(buildContactPayload(formData));
}
