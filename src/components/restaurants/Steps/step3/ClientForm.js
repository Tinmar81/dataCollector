import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import {TextField, Button, Paper} from "@material-ui/core/";

const useStyles = theme => ({
    root_form: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    textFieldFull: {
        maxWidth: "100%"
    },
    textFieldInline: {
        marginLeft: theme.spacing(2),
    }
});

class ClientForm extends Component {

    render() {
        const {classes} = this.props

        return <form noValidate autoComplete="off">
                <div>
                    <TextField required id="firstname-clientform" label="First Name" margin="normal"/>
                    <TextField required id="lastname-clientform" label="Last Name" margin="normal" className={classes.textFieldInline} />
                    <TextField required id="email-clientform" label="Email" margin="normal" className={classes.textFieldFull} fullWidth/>
                    <TextField required id="phone-clientform" label="Phone" margin="normal" />
                    <TextField required id="street-clientform" label="Street" margin="normal" className={classes.textFieldFull} fullWidth/>
                    <TextField required id="postalcode-clientform" label="Postal code" margin="normal"/>
                    <TextField required id="city-clientform" label="City" margin="normal" className={classes.textFieldInline}/>
                </div>
            </form>;

    }
}

export default withStyles(useStyles)(ClientForm);