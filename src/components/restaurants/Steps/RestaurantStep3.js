import React, {Component} from "react";

//Import material components
import {Grid, Typography, Paper} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";

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
    }
});

class RestaurantStep3 extends Component {

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

    render() {
        const {classes} = this.props;
        const {name, street, postal_code, city, phone} = this.props.restaurantSelected
        const dateBooking = this.formatDate(this.props.datetimeBooking)
        const timeArrival = this.formatTime(this.props.datetimeArrival)
        const timeDeparture= this.formatTime(this.props.datetimeDeparture)

        return <Grid container justify="center" spacing={3} className={classes.root_grid}>
            <Grid item xs={12} md={7}>
                <Typography variant="subtitle1" gutterBottom color="textSecondary">
                    Please fill in the reservation information
                </Typography>
               <ClientForm></ClientForm>
            </Grid>
            <Grid item  xs={12} md={4}>
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
        </Grid>
    }
}

export default withStyles(useStyles)(RestaurantStep3);