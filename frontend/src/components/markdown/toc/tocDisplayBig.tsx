import { Divider } from "@nextui-org/divider";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { TocItem } from "./toc";

export default function TocDisplayBig({
  tocItems,
  isScrolled,
}: {
  tocItems: TocItem[];
  isScrolled: boolean;
}) {
  return (
    <>
      <nav className="text-1xl font-bold">Table of Contents</nav>
      <div className="overflow-y-auto h-[calc(100vh-4rem)]">
        <Listbox>
          {tocItems.map((item) => (
            <ListboxItem
              key={item.id}
              style={{ paddingLeft: `${(item.level - 2) * 20 + 10}px` }}
              className="hover:text-secondary"
            >
              <a href={`#${item.id}`}>{item.text}</a>
            </ListboxItem>
          ))}
        </Listbox>
        <div
          className={`${isScrolled ? "opacity-100" : "opacity-0"} transition-opacity duration-300 opacity-0 ${isScrolled ? "opacity-100" : ""}`}
        >
          <Divider className="my-4" />
          <a href="#top" className="hover:text-secondary block">
            Back to top
          </a>
          <a href="#comments-ff" className="hover:text-secondary block">
            Go to Comment
          </a>
        </div>
      </div>
    </>
  );
}
