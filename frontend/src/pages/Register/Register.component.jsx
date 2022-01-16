import React,{ useState } from 'react'

import StepPhoneEmail from '../Steps/StepPhoneEmail/StepPhoneEmail.component';
import StepUsername from '../Steps/StepUsername/StepUsername.component';
import StepOtp from '../Steps/StepOtp/StepOtp.component';
import StepName from '../Steps/StepName/StepName.component';
import StepAvatar from '../Steps/StepAvatar/StepAvatar.component';

import styles from './Register.module.css';

const steps = {
    1 : StepPhoneEmail,
    2 : StepOtp,
    3 : StepName,
    4 : StepAvatar,
    5 : StepUsername,
}


export const Register = () => {
    const [ step, setStep ] = useState(1);
    const CurrentStep = steps[step];
    
    function onNext(){
        setStep(step + 1);
    }

    return (
        <div>
            <CurrentStep onNext={onNext}/>
        </div>
    )
}

export default Register;