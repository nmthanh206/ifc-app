import React, { useRef } from "react";

import "./App.css";
import IfcViewer from "./components/IfcViewer";

function App() {
   const viewerRef = useRef({});
   return (
      <div>
         <IfcViewer
            viewerRef={viewerRef}
            wasmPath="../../"
            containerName="viewer-container"
         />
      </div>
   );
}

export default App;
