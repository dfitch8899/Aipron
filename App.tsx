import React from "react";
import App from "./mobile/App";

// Root-level App entry so Expo's AppEntry (from the hoisted expo package
// in C:\Aipron\node_modules\expo\AppEntry.js) can resolve "../../App".
// This simply delegates to the mobile App, which currently renders
// the Chat UI directly.
export default function RootApp() {
  return <App />;
}

