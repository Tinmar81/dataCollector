import React, {Component} from "react";

//Material component
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from "@date-io/date-fns";
import {MuiPickersUtilsProvider} from '@material-ui/pickers';

//Custom component
import ArrivalDatePicker from "./step2/ArrivalDatePicker";
import ArrivalTimePicker from "./step2/ArrivalTimePicker";
import DepartureTimePicker from "./step2/DepartureTimePicker";

class RestaurantStep2 extends Component {

    constructor(props) {
        super(props);

        this.handleTimeArrival= this.handleTimeArrival.bind(this)
        this.handleDateArrival= this.handleDateArrival.bind(this)
        this.handleTimeDeparture= this.handleTimeDeparture.bind(this)
    }

    handleDateArrival (newDateArrival) {
        this.props.handleDateArrival(newDateArrival)
    }

    handleTimeArrival(timeArrival) {
        this.props.handleTimeArrival(timeArrival);
    }

    handleTimeDeparture(timeDeparture) {
        this.props.handleTimeDeparture(timeDeparture)
    }

    render() {
        console.log(this.props.restaurantSelected)
        const {name, street, postal_code, city, phone} = this.props.restaurantSelected

        return <Grid container direction="row" justify="center" spacing={3}>
            <Grid item xs={4}>
                <Typography variant="h5" gutterBottom>
                    {name}
                </Typography>
                <Typography variant="body1" gutterBottom color={"tertiary"}>
                    {street}<br/>
                    {postal_code} {city}
                </Typography>
                <Typography variant="subtitle1" gutterBottom color={"tertiary"}>
                    {phone}
                </Typography>
            </Grid>
            <Grid item xs={4} t={2}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <ArrivalDatePicker
                            dateArrival={this.props.dateArrival}
                            handleDateArrival={this.handleDateArrival}>
                        </ArrivalDatePicker>
                        <ArrivalTimePicker
                            dateArrival={this.props.dateArrival}
                            timeArrival={this.props.timeArrival}
                            handleTimeArrival={this.handleTimeArrival}>
                        </ArrivalTimePicker>
                        <DepartureTimePicker
                            dateDeparture={this.props.dateArrival}
                            timeDeparture={this.props.timeDeparture}
                            handleTimeDeparture={this.handleTimeDeparture}>
                        </DepartureTimePicker>
                    </Grid>
                </MuiPickersUtilsProvider>
            </Grid>
        </Grid>;
    }
}

export default RestaurantStep2;