import { Modal } from "antd";
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
      <img
        alt={props.alt || ""}
        className="my-4 cursor-pointer max-w-full h-auto"
        src={props.src || ""}
        style={{
          display: "block",
          margin: "1rem 0",
        }}
        onClick={openModal}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />

      {/* Modal for enlarged image */}
      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        centered
        width="90%"
        styles={{
          body: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            alt={props.alt || ""}
            src={props.src || ""}
            style={{
              maxWidth: "100%",
              maxHeight: "80vh",
              objectFit: "contain",
            }}
          />
          {props.alt && (
            <p style={{ marginTop: "1rem", color: "#666" }}>{props.alt}</p>
          )}
        </div>
      </Modal>
    </>
  );
}
