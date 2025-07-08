import fs from "fs";
import path from "path";

/**
 * Reads a JSON file and parses it into an object.
 * @param filePath - Absolute or relative path to the JSON file.
 */
export function jsonToObj<T = any>(filePath: string): T {
  const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.join(process.cwd(), filePath);
  const data = fs.readFileSync(absolutePath, "utf-8");
  return JSON.parse(data) as T;
}

