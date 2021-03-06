import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const styles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(3,0,2),
    }
}))

export const PrimaryButton = ({children,props}) => {
    return (
        <Button className = {styles.root} type="submit" fullWidth variant = "contained" color = "primary" 
        {...props}>
            {children}
        </Button>
    )
}