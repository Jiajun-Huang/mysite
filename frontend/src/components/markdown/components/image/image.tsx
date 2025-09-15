"use client";

import Image from "next/image";
import { useState } from "react";

export default function MdImage(
  props: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Main Image */}
      <Image
        alt={props.alt || ""}
        blurDataURL={"/icons8-loading-circle.gif"}
        className="my-4 sm:my-6 cursor-pointer"
        height={0}
        placeholder="blur"
        sizes="500"
        src={props.src || ""}
        style={{
          width: "auto",
          height: "auto",
          display: "block",
        }}
        width={0}
        onClick={openModal}
        // onError={(e) => {
        //   console.error(e);
        //   e.currentTarget.src = "/icons8-error.gif";
        // }}
      />

      {/* Modal Overlay */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-black/75 backdrop-blur-xs"
          onClick={closeModal}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] p-4">
            {/* Modal Image */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <Image
                priority
                alt={props.alt || ""}
                className="max-w-full object-contain shadow-2xl"
                height={0}
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 70vw"
                src={props.src || ""}
                style={{
                  width: "auto",
                  height: "auto",
                }}
                width={0}
              />
            </div>

            {/* Image Caption (if alt text exists) */}
            {props.alt && (
              <div className="mt-4 text-center">
                <p className="text-white text-sm bg-black bg-black/50 px-3 py-2 max-w-md mx-auto">
                  {props.alt}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
