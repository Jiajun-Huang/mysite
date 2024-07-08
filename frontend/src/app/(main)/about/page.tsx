import MarkDown from "@/components/markdown/markdown";
import fs from "fs";
import path from "path";

export default async function About() {
  const filePath = path.join(process.cwd(), "src/app/about/about.md");
  console.log(filePath);
  const data = await fs.readFileSync(filePath, "utf8");

  return (
    <div>
      <h1>About</h1>
      <MarkDown>{data}</MarkDown>
    </div>
  );
}
