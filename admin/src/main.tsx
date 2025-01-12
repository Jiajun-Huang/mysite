import React from "react";
import ReactDOM from "react-dom/client";

// 样式顺序 初始化样式最前面
// 全局配置初始化 css 文件
// 全局样式 为了覆盖业务 UI 组件样式
// UI 组件样式

// 组件样式

import App from "./App.tsx";
// import Router from "@/router/index.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";

// import './index.css'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
