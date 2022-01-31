import React,{useState} from 'react'

import { useDispatch } from 'react-redux';
import { sendOtp } from "../../../../http/index";

import Card from 'components/shared/Card/Card.component';
import Button from 'components/shared/Button/Button.component';

import TextInput from 'components/shared/TextInput/TextInput.component';
import styles from '../StepPhoneEmail.module.css';

const Email = ({ onNext }) => {
    const [emailAddress, setEmailAddress] = useState('');
    const dispatch = useDispatch();

    
    return (
        <Card title="Enter your email address" icon="email-emoji">
            <TextInput value={emailAddress} onChange={ (e) => setEmailAddress(e.target.value)}/>
            <div className={styles.actionButtonWrap}>
                <Button text="Next" onClick={onNext}/>
            </div>
            <p className={styles.bottomParagraph}>
                By entering your email, you're agreeing to our Terms of
                Service and Privacy Policy. Thanks!
            </p>
        </Card>
    )
}

export default Email;
