import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import Link from "next/link";

import { Blog } from "@/types";

export default function BlogCard({ data }: { data: Blog }) {
  return (
    <div className="w-full max-w-4xl hover:cursor-pointer hover:translate-y-[-5px] transform transition-transform duration-300 active:translate-y-0">
      <Card>
        <Link href={`/blog/${data.uri}`}>
          <CardHeader>
            <h3 className="text-lg font-bold">{data.title || "Title"}</h3>
          </CardHeader>
          <CardBody>
            <p className="text-default-500">
              {data.description || "No description"}
            </p>
            <div className="flex gap-1">
              <p className="text-default-500">
                {new Date(
                  data.created_at || new Date("undefined"),
                ).toLocaleDateString()}
              </p>
            </div>
          </CardBody>
        </Link>
        <CardFooter className="justify-between">
          <p className="text-default-500">{data.category?.name || ""}</p>
          <div className="flex gap-1">
            {data.tags?.map((tag, index) => (
              <Chip key={index} color="secondary" size="sm">
                {tag.name}
              </Chip>
            )) || ""}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
