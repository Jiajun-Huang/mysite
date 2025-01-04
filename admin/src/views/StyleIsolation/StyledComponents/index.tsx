import styled, { IStyledComponent } from "styled-components";

const Box: IStyledComponent<
  "web",
  "div",
  React.ClassAttributes<HTMLDivElement> &
    React.HTMLAttributes<HTMLDivElement> &
    object
> &
  object = styled.div`
  color: blueviolet;
`;

const StyleIsolation = (props: any) => {
  return (
    <Box>
      这是 StyleIsolation 组件 &nbsp;
      <span>我是传进来的数据 {props.type}</span>
    </Box>
  );
};

export default StyleIsolation;
