import React, { useEffect } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";

const IfcViewer = ({
   viewerRef,
   wasmPath,
   containerName,
   option = {},
   style = {},
}) => {
   useEffect(() => {
      const container = document.getElementById(containerName)!;
      const viewer = new IfcViewerAPI({
         container,

         ...option,
      });
      viewer.axes.setAxes();
      viewer.grid.setGrid();
      //   viewer.grid.setGrid(50, 30);
      viewer.IFC.setWasmPath(wasmPath);

      window.onmousemove = () => viewer.IFC.selector.prePickIfcItem();
      window.ondblclick = async (e) => {
         viewer.IFC.selector.highlightIfcItem();
         const item = await viewer.IFC.selector.pickIfcItem();
         if (!item) return;
         const props = await viewer.IFC.getProperties(
            item.modelID,
            item.id,
            true,
            false
         );
         console.log(props);
      };

      window.onkeydown = (event) => {
         if (event.code === "KeyC") {
            viewer.IFC.selector.unpickIfcItems();
            viewer.IFC.selector.unHighlightIfcItems();
         }
      };

      viewer.clipper.active = true;
      window.onkeydown = (event) => {
         if (event.code === "KeyP") {
            viewer.clipper.createPlane();
         } else if (event.code === "KeyO") {
            viewer.clipper.deletePlane();
         }
         if (event.code === "Escape") {
            viewer.IFC.selector.unpickIfcItems();
            viewer.IFC.selector.unHighlightIfcItems();
         }
      };

      async function loadIfc(url) {
         const model = await viewer.IFC.loadIfcUrl(url);
         viewer.shadowDropper.renderShadow(model.modelID);
      }
      loadIfc(`RST_basic_sample_project.ifc`);
      viewerRef.current = viewer;
   }, [containerName, option, viewerRef, wasmPath]);

   return (
      <div
         id={containerName}
         style={{
            position: "relative",
            height: "100vh",
            width: "100vw",
            ...style,
         }}
      />
   );
};

export default IfcViewer;
