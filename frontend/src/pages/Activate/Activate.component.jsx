import React from "react";
import { useState } from "react";

import StepAvatar from "pages/Steps/StepAvatar/StepAvatar.component";
import StepName from "pages/Steps/StepName/StepName.component";

const steps = {
    1 : StepName,
    2 : StepAvatar
}
const Activate = () => {
  const [step, setStep] = useState(1);
  const CurrentStep = steps[step];

  function onNext(){
      setStep(step + 1);
  }
  return <div className="cardWrapper">
      <CurrentStep onNext={ onNext }/>
  </div>;
};

export default Activate;
