import fs from "node:fs";
import path from "node:path";
import { Storage } from "@google-cloud/storage";

try {
  const envPath = path.resolve(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, "utf-8");
    for (const line of envConfig.split("\n")) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const [key, ...values] = trimmed.split("=");
        if (key && values.length > 0) {
          const k = key.trim();
          if (!process.env[k]) {
            process.env[k] = values.join("=").trim();
          }
        }
      }
    }
  }
} catch (e) {}

async function syncUploads() {
  const bucketName = process.env.GCS_BUCKET || "cms-treffix";
  const storage = new Storage({
    projectId: process.env.GCS_PROJECT_ID,
    keyFilename: process.env.GCS_KEY_FILE,
  });

  const uploadsDir = path.resolve(process.cwd(), "public/uploads");
  if (!fs.existsSync(uploadsDir)) {
    console.log("No public/uploads directory found.");
    process.exit(0);
  }

  const files = fs.readdirSync(uploadsDir);
  console.log(`Found ${files.length} files in public/uploads. Syncing to GCS bucket ${bucketName}...`);

  const bucket = storage.bucket(bucketName);
  let uploaded = 0;
  for (const filename of files) {
    if (filename.startsWith(".")) continue;
    const filePath = path.join(uploadsDir, filename);
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) continue;

    try {
      const gcsFile = bucket.file(filename);
      const [exists] = await gcsFile.exists();
      if (!exists) {
        let mimeType = "application/octet-stream";
        if (filename.endsWith(".png")) mimeType = "image/png";
        else if (filename.endsWith(".webp")) mimeType = "image/webp";
        else if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) mimeType = "image/jpeg";
        else if (filename.endsWith(".svg")) mimeType = "image/svg+xml";

        await bucket.upload(filePath, {
          destination: filename,
          metadata: {
            contentType: mimeType,
          },
        });
        uploaded++;
        console.log(`Uploaded ${filename} to GCS`);
      }
    } catch (err) {
      console.warn(`Failed to upload ${filename}:`, err);
    }
  }

  console.log(`✅ Synced ${uploaded} files to GCS bucket ${bucketName}!`);
  process.exit(0);
}

syncUploads().catch(console.error);
