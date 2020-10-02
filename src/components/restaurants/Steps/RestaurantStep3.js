import React, {Component} from "react";

//Import material components
import {
    Grid,
    Typography,
    Paper,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

// Import material Lab compponents
import {Alert, AlertTitle} from "@material-ui/lab";

//Import custom components
import ClientForm from "./step3/ClientForm";

const useStyles = theme => ({
    root_grid: {
        flexGrow: 1,
    },
    paper: {
        marginTop: "20px",
        padding: "10px 15px"
    },
    button: {
        marginRight: "15px"
    }
});

class RestaurantStep3 extends Component {

    constructor(props) {
        super(props);

        this.state= {
            open:false,
            allowAddVisitor: false,
            allowAddMainVisitor: true
        }
        this.handleClickOpen=this.handleClickOpen.bind(this)
        this.handleClose=this.handleClose.bind(this)
        this.handleSave=this.handleSave.bind(this)
    }

    formatDate(date) {
        if(typeof date === "number") date = new Date(date)
        return date.toLocaleDateString("de-DE");
    }

    formatTime(date) {
        if(typeof date === "number") date = new Date(date)
        let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        return hours + ":" + minutes;
    }

    handleClickOpen() {
        this.setState({open:true});
    }

    handleClose() {
        this.setState({open:false});
    }

    handleSave(formData) {
        //Valid the informations + get it to the Parent
        this.setState({
            open:false,
            allowAddVisitor: true,
            allowAddMainVisitor: false
        });
    }

    render() {
        const {classes} = this.props;
        const {name, street, postal_code, city, phone} = this.props.restaurantSelected
        const dateBooking = this.formatDate(this.props.datetimeBooking)
        const timeArrival = this.formatTime(this.props.datetimeArrival)
        const timeDeparture= this.formatTime(this.props.datetimeDeparture)

        return <Grid container justify="center" spacing={3} className={classes.root_grid}>
            <Grid item xs={12} md={7}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={this.handleClickOpen}
                    classeName={classes.button}
                    disabled={!this.state.allowAddMainVisitor}
                >
                    Enter the main Visitor
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={this.handleClickOpen}
                    disabled={!this.state.allowAddVisitor}
                >
                    Add a new visitor
                </Button>

            </Grid>
            <Grid item  xs={12} md={5}>
                <Alert severity="info" square>
                    <AlertTitle>Your Booking at {dateBooking}</AlertTitle>
                    <Typography variant="subtitle1" gutterBottom >
                        from {timeArrival} to {timeDeparture}
                    </Typography>
                </Alert>
                <Paper variant="outlined" square className={classes.paper}>
                    <Typography variant="h5" gutterBottom>
                        {name}
                    </Typography>
                    <Typography variant="body2" gutterBottom color={"textSecondary"}>
                        {street}<br/>
                        {postal_code} {city}
                    </Typography>
                    <Typography variant="body1" gutterBottom color={"textSecondary"}>
                        {phone}
                    </Typography>
                </Paper>
            </Grid>
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Information Visitor</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill in the reservation information
                    </DialogContentText>
                    <ClientForm></ClientForm>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button color="primary" onClick={this.handleSave}>
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    }
}

export default withStyles(useStyles)(RestaurantStep3);