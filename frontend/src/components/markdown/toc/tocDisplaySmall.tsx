import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@heroui/drawer";
import { useDisclosure } from "@heroui/modal";
import { TocItem } from "./toc";
import TocContent from "./tocContent";

export default function TocDisplaySmall({
  tocItems,
  isScrolled,
}: {
  tocItems: TocItem[];
  isScrolled: boolean;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div>
      <Button
        onPress={onOpen}
        className="fixed right-0 translate-x-1/2 top-1/2 transform -translate-y-1/2 hover:translate-x-0 transition-transform duration-300 px-4 py-2 rounded-md shadow-lg z-50"
      >
        TOC
      </Button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Table of Contents
              </DrawerHeader>
              <DrawerBody className="overflow-y-auto h-[calc(100vh-4rem)]">
                <TocContent tocItems={tocItems} onClose={onClose} />
                <div
                  className={`transition-all duration-300`}
                  style={{ display: isScrolled ? "block" : "none" }}
                >
                  <Divider className="my-4" />
                  <a
                    href="#top"
                    className="hover:text-secondary block"
                    onClick={onClose}
                  >
                    Back to top
                  </a>
                  <a
                    href="#comments-ff"
                    className="hover:text-secondary block"
                    onClick={onClose}
                  >
                    Go to Comment
                  </a>
                </div>
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
