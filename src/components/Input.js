import React, { forwardRef } from 'react'
import TextField from '@material-ui/core/TextField'

// ?forwardRef?

export const Input = forwardRef((props,ref) => {
    return <TextField variant = "outlined" fullWidth margin = "normal" innerRef = {ref} {...props} />
})