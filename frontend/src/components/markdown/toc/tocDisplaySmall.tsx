import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@nextui-org/drawer";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { useDisclosure } from "@nextui-org/modal";
import { TocItem } from "./toc";

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
        className="absolute right-0 translate-x-1/2 top-1/2 transform -translate-y-1/2 hover:translate-x-0 transition-transform duration-300 px-4 py-2 rounded-md shadow-lg"
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
                <Listbox>
                  {tocItems.map((item) => (
                    <ListboxItem
                      key={item.id}
                      style={{ paddingLeft: `${(item.level - 2) * 20 + 10}px` }}
                      className="hover:text-secondary"
                      onClick={onClose}
                    >
                      <a href={`#${item.id}`}>{item.text}</a>
                    </ListboxItem>
                  ))}
                </Listbox>
                <div
                  className={`transition-all duration-300`}
                  style={{ display: isScrolled ? "block" : "none" }}
                >
                  <Divider className="my-4" />
                  <a href="#top" className="hover:text-secondary block">
                    Back to top
                  </a>
                  <a href="#comments-ff" className="hover:text-secondary block">
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
