import { Divider } from "@heroui/divider";
import { TocItem } from "./toc";
import TocContent from "./tocContent";

export default function TocDisplayBig({
  tocItems,
  isScrolled,
}: {
  tocItems: TocItem[];
  isScrolled: boolean;
}) {
  console.log(isScrolled);
  return (
    <>
      <nav className="text-1xl font-bold">Table of Contents</nav>
      <div className="overflow-y-auto h-[calc(100vh-11rem)] text-small">
        <TocContent tocItems={tocItems} onClose={() => {}} />
        <div
          className={`${isScrolled ? "opacity-100" : "opacity-0"} transition-opacity duration-300 opacity-0 ${isScrolled ? "opacity-100" : ""}`}
        >
          <Divider className="my-4" />
          <div>
            <a href="#top" className="hover:text-secondary block">
              Back to top
            </a>
            <a href="#comments-ff" className="hover:text-secondary block">
              Go to Comment
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
