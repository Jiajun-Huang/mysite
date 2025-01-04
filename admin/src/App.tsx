// import { useEffect, useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import ModuleScss from "@/views/StyleIsolation/ModuleScss";
// import StyledComponents from "@/views/StyleIsolation/StyledComponents";
// import AntdButton from "@/views/TestAntd/AntdButton";
// import AntdIcons from "@/views/TestAntd/AntdIcons";
import React from "react";
import { useRoutes } from "react-router-dom";
import router from "@/router";

function App() {
  // const [count, setCount] = useState(0)
  const dom = useRoutes(router);
  return (
    <>
      <div className="App">
        <React.Suspense fallback={<div> Loading... </div>}>
          {dom}
        </React.Suspense>
      </div>
    </>
  );
}

export default App;
