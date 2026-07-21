"use client";

/**
 * Signed direct-to-Cloudinary upload. Use this from the admin portfolio
 * form when the user picks a file — it gets a signature from our own
 * /api/cloudinary/signature route (so the API secret never reaches the
 * browser), then uploads straight to Cloudinary, bypassing our server
 * for the actual file bytes.
 *
 * Usage in the admin form:
 *   const { url, publicId } = await uploadImageToCloudinary(file, "portfolio");
 */
export async function uploadImageToCloudinary(
  file: File,
  folder: string = "mega-resources/portfolio",
): Promise<{ url: string; publicId: string }> {
  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign = { timestamp, folder };

  const sigRes = await fetch("/api/cloudinary/signature", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ paramsToSign }),
  });

  if (!sigRes.ok) {
    throw new Error("Failed to get upload signature");
  }
  const { signature } = await sigRes.json();

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

  if (!cloudName || !apiKey) {
    throw new Error("Cloudinary is not configured for image uploads");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("timestamp", String(timestamp));
  formData.append("folder", folder);
  formData.append("api_key", apiKey);
  formData.append("signature", signature);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData },
  );

  if (!uploadRes.ok) {
    const err = await uploadRes.json().catch(() => null);
    throw new Error(err?.error?.message || "Cloudinary upload failed");
  }

  const data = await uploadRes.json();
  return { url: data.secure_url, publicId: data.public_id };
}

/**
 * For the `gallery` field (multiple images per project) — uploads several
 * files in parallel and returns their secure URLs in the same order.
 */
export async function uploadGalleryToCloudinary(
  files: File[],
  folder: string = "mega-resources/portfolio",
): Promise<string[]> {
  const results = await Promise.all(
    files.map((file) => uploadImageToCloudinary(file, folder)),
  );
  return results.map((r) => r.url);
}
