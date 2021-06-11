import React from 'react'
import { Checkbox, FormControlLabel, Typography } from '@material-ui/core'
import { Form } from './components/Form'
import { MainContainer } from './components/MainContainer'
import { Input } from "./components/Input"
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router';
import { PrimaryButton } from './components/primaryButton'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { parsePhoneNumberFromString } from "libphonenumber-js"

const schema = yup.object().shape({
    email:yup.string().email("Email should have correct format").required("Email is a required field")
})

export const Step2 = () => {
    const history = useHistory()

    const {register, handleSubmit,watch, formState: { errors }} = useForm({
        mode:"onBlur",
        resolver:yupResolver(schema)
    })

    const [checked, setChecked] = React.useState(true);
    const normalizePhoneNumber = (value) =>{
    
        const phoneNumber = parsePhoneNumberFromString(value)
        if(!phoneNumber){return value}

        return phoneNumber.formatInternational()
    }

    const onSubmit = (data) => {
        history.push("/step3")
        //console.log(data)
    }

    return (
        <MainContainer>
            <Typography component = "h2" variant = "h5">
                Step 2
            </Typography>
            <Form onSubmit = {handleSubmit(onSubmit)}>
                <Input 
                    {...register('email', { required: true })}
                    id = "email"
                    type = "email"
                    label = "Email"
                    required
                    error = {!!errors.email}
                    helperText = {errors?.email?.message}
                />
                
               
                {
                    
                    !checked===false  &&
                    
                        <Input 
                        {...register('phoneNumber')}
                        id = "phoneNumber"
                        type = "tel"
                        label = "Phone Number"
                        onChange = {(event) => {
                            event.target.value = normalizePhoneNumber(event.target.value)
                        }}
                         />
                    
                    }
                 <FormControlLabel control = {
                    <Checkbox {...register('hasPhone')}  onChange={() => {setChecked(!checked)
                        
                    }} color = "primary" />
                }  
                label="I don't have a phone'"
                />
                <PrimaryButton>Next Step</PrimaryButton>
            </Form>
        </MainContainer>
        
    )
    
}