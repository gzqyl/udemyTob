import React from "react";
import CenterScreenTipText from "./CenterScreenTipText";


function NoCameraErrorView(): JSX.Element{
  return (
    <CenterScreenTipText tip={`there's no camera on your device.`} />
  );
}

export default NoCameraErrorView;