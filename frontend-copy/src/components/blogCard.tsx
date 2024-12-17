import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";

import { Blog } from "@/types";
import Link from "next/link";

export default function BlogCard({ data }: { data: Blog }) {
  return (
    <div className="w-full max-w-4xl hover:cursor-pointer hover:scale-10 transform transition-transform duration-300">
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
                  data.created_at || new Date("undefined")
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
