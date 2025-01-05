import React from "react";
import { useRoutes } from "react-router";
import router from "./router";

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
