import React from 'react'
import { Form } from './components/Form'
import {MainContainer} from './components/MainContainer'
import Typography from '@material-ui/core/Typography';
import { Input } from "./components/Input"
import { PrimaryButton } from './components/primaryButton';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router';
import { useData } from "./DataContext";

const schema = yup.object().shape({
    firstName : yup.string().matches(/^([^0-9]*)$/, "First name should not contain numbers").required("First name is a required field"),
    lastName : yup.string().matches(/^([^0-9]*)$/, "Last name should not contain numbers").required("Last name is a required field"),
})

export const Step1 = () => {

    const history = useHistory()

    const {data,setValues} = useData()
    const onSubmit = (data) => {
        history.push("./step2")
        setValues(data)
    }

    const {register, handleSubmit, control, formState: { errors }} = useForm({
        
        mode:"onBlur",
        resolver:yupResolver(schema),
        defaultValues: 
            {firstName:data.firstName, lastName:data.lastName},
    })

  
    return (
        <MainContainer>
            <Typography component = "h2" variant = "h5">
                Step1
            </Typography>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input  {...register("firstName", { required: true })}
                         id="firstName" type="text" 
                         name = "firstName"
                         label = "First Name" 
                         error = {!!errors.firstName}
                         helperText = {errors?.firstName?.message}
                         />
                <Input  {...register('lastName', { required: true })}
                         id="lasttName" type="text" 
                         label = "Last Name" 
                         error = {!!errors.lastName}
                         helperText = {errors?.lastName?.message}
                         />
                <PrimaryButton>
                    Next Step
                </PrimaryButton>
            </Form>
        </MainContainer>
    )
}