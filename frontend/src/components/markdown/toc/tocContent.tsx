// https://github.com/nextui-org/nextui/issues/3206

export default function TocContent({
  tocItems,
  onClose,
}: {
  tocItems: any[];
  onClose: any;
}) {
  return (
    // <Listbox aria-label="Table of Contents">
    //   {tocItems.map((item) => (
    //     <ListboxItem
    //       key={item.id}
    //       style={{ paddingLeft: `${(item.level - 2) * 20 + 10}px` }}
    //       className="text-foreground"
    //       onClick={onClose}
    //       title={item.text}
    //       target={`#${item.id}`}
    //       href={`#${item.id}`}
    //     //   as={RemixLink}
    //       onClick={onClose}
    //     ></ListboxItem>
    //   ))}
    // </Listbox>
    <nav className="hide-scrollbar">
      {tocItems.map((item) => (
        <a
          key={item.id}
          className="text-foreground block hover:text-primary"
          href={`#${item.id}`}
          style={{ paddingLeft: `${(item.level - 2) * 20 + 10}px` }}
          title={item.text}
          onClick={onClose}
        >
          {item.text}
        </a>
      ))}
    </nav>
  );
}
