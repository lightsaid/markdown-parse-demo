import { createBrowserRouter } from "react-router-dom";

import Home from "@/pages/Home";
import Editor from "@/pages/Editor";
import Show from "@/pages/Show";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/",
    element: <Editor />
  },
  {
    path: "/",
    element: <Show />
  }
])

export default router