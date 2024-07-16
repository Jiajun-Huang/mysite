import Image from "next/image";

export default function MdImage(
  props: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
) {
  console.log("MdImage props", props);
  return (
    <Image
      src={props.src || ""}
      alt={props.alt || ""}
      width={0}
      height={0}
      sizes="100vw"
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        margin: "0 auto",
      }}
    />
  );
}
