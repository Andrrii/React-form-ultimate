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
import { useData } from "./DataContext";

const schema = yup.object().shape({
    email:yup.string().email("Email should have correct format").required("Email is a required field")
})

export const Step2 = () => {
    
    const [checked, setChecked] = React.useState(true);
    const history = useHistory()
    const {data,setValues} = useData() 
    
        const {register, handleSubmit,watch, formState: { errors }} = useForm({
        defaultValues:{ email:data.email,hasPhone:checked,phoneNumber:data.phoneNumber},
        mode:"onBlur",
        resolver:yupResolver(schema)
        })
    
   

    const normalizePhoneNumber = (value) =>{
    
        const phoneNumber = parsePhoneNumberFromString(value)
        if(!phoneNumber){return value}

        return phoneNumber.formatInternational()
    }

    const onSubmit = (data) => {
        history.push("./step3")
        setValues(data)
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
                    <Checkbox {...register('hasPhone')} defaultValue={!checked}
                    defaultChecked = {!checked} onChange={() => {setChecked(!checked)
                        
                    }} color = "primary" />
                }  
                label="I don't have a phone'"
                />
                <PrimaryButton>Next Step</PrimaryButton>
            </Form>
        </MainContainer>
        
    )
          
}