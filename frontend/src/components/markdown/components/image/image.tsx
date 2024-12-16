import Image from "next/image";

export default function MdImage(
  props: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
) {

  return (
    <Image
      src={props.src || ""}
      alt={props.alt || ""}
      width={0}
      height={0}
      // placeholder="blur"
      sizes="500"
      style={{
        width: "auto",
        height: "auto",
        display: "block",
        margin: "0 auto",
      }}
    />
  );
}
