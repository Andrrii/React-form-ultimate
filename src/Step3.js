import { Typography } from '@material-ui/core'
import React from 'react'
import { FileInput } from './components/FileInput'
import { Form } from './components/Form'
import { MainContainer } from './components/MainContainer'
import {useForm} from "react-hook-form"
import { useHistory } from "react-router-dom";
import { useData } from "./DataContext";
import { PrimaryButton } from './components/primaryButton'

export const Step3 = () => {
    const history = useHistory();
    const { data, setValues } = useData();
    const { control, handleSubmit } = useForm({
      defaultValues: {
        files: data.files,
      },
    });
  
    const onSubmit = (data) => {
      history.push("./result");
      setValues(data);
    };
  
    return (
      <MainContainer>
        <Typography component="h2" variant="h5">
           Step 3
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FileInput name="files" control={control} />
          <PrimaryButton>Next</PrimaryButton>
        </Form>
      </MainContainer>
    );
  };