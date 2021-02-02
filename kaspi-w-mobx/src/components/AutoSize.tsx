import React, { useState } from "react";
import { ReactNode } from "react";
import { useRef } from "react";
import { useLayoutEffect } from "react";

export type AutoSizeContentProps = {
  width: number;
  height: number;
}

const AutoSize = function AutoSize({
  children: ChildComponent,
}: {
  children: React.FunctionComponent<AutoSizeContentProps>;
}): JSX.Element {

  const containerRef = useRef<HTMLDivElement>(null as any);

  const [width, setWidth] = useState(null as any);
  const [height, setHeight] = useState(null as any);

  const renderChildren = width !== null && height !== null;

  useLayoutEffect(() => {
    const container = containerRef.current;
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      setWidth(entry.contentRect.width);
      setHeight(entry.contentRect.height);
      console.log(entry);
    });

    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%"}}>
      { renderChildren && <ChildComponent width={width} height={height}/> }
    </div>
  );
};

export default AutoSize;