import React from "react";
import { Carousel } from "antd";
import { Image } from "antd";
import Image1 from "~/images/wallhaven-1p3meg_1920x1080.png";

const contentStyle: React.CSSProperties = {
  //   height: "160px",
  color: "#fff",
  lineHeight: "400px",
  textAlign: "center",
  background: "#364d79",
  width: "calc(100vw - 192px - 32px - 48px - 8px)",
  height: "400px",
  objectFit: "cover",
};

const App: React.FC = () => (
  <Carousel>
    <div>
      <Image style={contentStyle} src={Image1} />
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
);

export default App;
