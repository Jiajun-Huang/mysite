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
      placeholder="blur" // Set blur effect while loading
      blurDataURL={"/icons8-loading-circle.gif"} // Set a base64 image as placeholder
      className="my-4 sm:my-6"
      sizes="500"
      style={{
        width: "auto",
        height: "auto",
        display: "block",
      }}
      // onError={(e) => {
      //   console.error(e);
      //   e.currentTarget.src = "/icons8-error.gif";
      // }}
    />
  );
}
