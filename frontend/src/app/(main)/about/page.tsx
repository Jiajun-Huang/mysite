import MarkDown from "@/components/markdown/markdown";
import fs from "fs";
import path from "path";

export default async function About() {
  const filePath = path.join(process.cwd(), "src/app/(main)/about/about.md");
  console.log(filePath);
  const data = await fs.readFileSync(filePath, "utf8");

  return (
    <div style={{ padding: "1rem", maxWidth: "800px", margin: "0 auto" }}>
      <MarkDown>{data}</MarkDown>
    </div>
  );
}
