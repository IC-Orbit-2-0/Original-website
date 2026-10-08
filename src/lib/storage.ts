import fs from "fs";
import path from "path";

/**
 * Robust JSON storage helper compatible with both local filesystem
 * and Vercel serverless functions (where process.cwd() is read-only).
 */
export function getStoragePath(filename: string): string {
  const isVercel = Boolean(process.env.VERCEL);
  const seedPath = path.join(process.cwd(), "data", filename);

  if (!isVercel) {
    return seedPath;
  }

  // On Vercel, use /tmp for mutable storage
  const tmpDir = path.join("/tmp", "ic-orbit-data");
  const tmpFile = path.join(tmpDir, filename);

  try {
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }

    // Seed file to /tmp from repository data if not yet present
    if (!fs.existsSync(tmpFile) && fs.existsSync(seedPath)) {
      fs.copyFileSync(seedPath, tmpFile);
    }
    return tmpFile;
  } catch {
    // If /tmp creation fails, fallback to seedPath
    return seedPath;
  }
}

export function readJsonFile<T>(filename: string, defaultValue: T): T {
  try {
    const filePath = getStoragePath(filename);
    if (!fs.existsSync(filePath)) {
      // Fallback check in project data dir
      const seedPath = path.join(process.cwd(), "data", filename);
      if (fs.existsSync(seedPath)) {
        return JSON.parse(fs.readFileSync(seedPath, "utf-8"));
      }
      return defaultValue;
    }
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content);
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return defaultValue;
  }
}

export function writeJsonFile<T>(filename: string, data: T): boolean {
  try {
    const filePath = getStoragePath(filename);
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.warn(`Write to ${filename} failed, continuing gracefully:`, err);
    return false;
  }
}
