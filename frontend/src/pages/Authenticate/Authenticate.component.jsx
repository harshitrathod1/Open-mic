import React,{ useState } from 'react'

import StepPhoneEmail from '../Steps/StepPhoneEmail/StepPhoneEmail.component';
import StepOtp from '../Steps/StepOtp/StepOtp.component';

import styles from './Authenticate.module.css';

const steps = {
    1 : StepPhoneEmail,
    2 : StepOtp,
}

const Authenticate = () => {
    const [step, setStep] = useState(1);
    const CurrentStep = steps[step];
     
    function onNext() {
        setStep(step + 1)
    }
    
    return (
        <div>
           <CurrentStep onNext={ onNext }/> 
        </div>

    )
}

export default Authenticate;
