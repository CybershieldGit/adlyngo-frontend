export function buildLeadPayload(formData) {
  const messageParts = [formData.goals?.trim()];

  if (formData.service) {
    messageParts.push(`Service: ${formData.service}`);
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

export async function submitLead(formData) {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildLeadPayload(formData)),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Failed to submit lead.");
  }

  return data;
}
