import {
  DesktopOutlined,
  HomeOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import Column from "./Column";
import styled from "./index.module.scss";
import Pie from "./Pie";

const gridStyle: React.CSSProperties = {
  width: "49.5%",
  height: "250px",
  borderRadius: "15px",
};

const cardTitleItemsStyle: React.CSSProperties = {
  width: 260,
  marginTop: 16,
};

const cardTitleItems = [
  {
    avatar: (
      <Avatar
        style={{ backgroundColor: "#41486c" }}
        icon={<HomeOutlined style={{ color: "#ffffff" }} />}
      />
    ),
    title: "Home",
    description: "This is the Home",
    hoverable: true,
  },
  {
    avatar: (
      <Avatar
        style={{ backgroundColor: "#41486c" }}
        icon={<PieChartOutlined style={{ color: "#ffffff" }} />}
      />
    ),
    title: "About",
    description: "This is the About",
    hoverable: true,
  },
  {
    avatar: (
      <Avatar
        style={{ backgroundColor: "#41486c" }}
        icon={<DesktopOutlined style={{ color: "#ffffff" }} />}
      />
    ),
    title: "Page",
    description: "This is the Page",
    hoverable: true,
  },
  {
    avatar: (
      <Avatar
        style={{ backgroundColor: "#41486c" }}
        icon={<UserOutlined style={{ color: "#ffffff" }} />}
      />
    ),
    title: "User",
    description: "This is the User",
    hoverable: true,
  },
];

export const Home = () => {
  const { homeBox, homeBoxAvatar } = styled;
  return (
    <div className={homeBox}>
      <Card
        style={{ marginBottom: "10px" }}
        bodyStyle={{
          display: "flex",
          justifyContent: "space-between",
        }}
        className={homeBoxAvatar}
      >
        {cardTitleItems.map((item, index) => {
          return (
            <Card
              key={index}
              hoverable={item.hoverable}
              style={cardTitleItemsStyle}
            >
              <Card.Meta
                avatar={item.avatar}
                title={item.title}
                description={item.description}
              />
            </Card>
          );
        })}
      </Card>
      <Card
        style={{ boxShadow: "none", marginBottom: "10px" }}
        bordered={false}
        bodyStyle={{
          display: "block",
        }}
      >
        <Card.Grid style={{ ...gridStyle, float: "left" }}>
          <Column />
        </Card.Grid>
        <Card.Grid style={{ ...gridStyle, float: "right" }}>
          <Pie />
        </Card.Grid>
      </Card>
    </div>
  );
};

export default Home;
