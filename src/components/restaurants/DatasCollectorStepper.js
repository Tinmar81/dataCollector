import React, {Component} from 'react';

//Materials components
import {withStyles} from '@material-ui/core/styles';
import {Stepper, Step, StepLabel, Button, Grid, Paper} from '@material-ui/core';

//Custom components
import RestaurantStep1 from "./Steps/RestaurantStep1";
import RestaurantStep2 from "./Steps/RestaurantStep2";
import RestaurantStep3 from "./Steps/RestaurantStep3";

const useStyles = theme =>({
    root_stepper: {
        width: '100%',
    },
    stepper: {
        marginBottom: '75px',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    paper: {
        padding: "50px 50px"
    }
})

class DatasCollectorStepper extends Component {

    constructor(props) {
        super(props);

        this.steps = [
            'Select a restaurant',
            'Arrival/Departure',
            'Contacts'
        ];

        this.host = "http://localhost:8080";

        this.handleDecrementStep = this.handleDecrementStep.bind(this);
        this.handleIncrementStep = this.handleIncrementStep.bind(this);
        this.handleRestaurantSelected = this.handleRestaurantSelected.bind(this);
        this.handleDateArrival = this.handleDateArrival.bind(this);
        this.handleTimeArrival = this.handleTimeArrival.bind(this);
        this.handleTimeDeparture = this.handleTimeDeparture.bind(this);

        const initDate = new Date().setHours("00", "00", "00");

        this.state = {
            currentStep: 1,
            restaurantsList: false,
            restaurantSelected: false,
            dateArrival: initDate,
            timeArrival: initDate,
            timeDeparture: initDate
        }
    }

    handleRestaurantSelected(restaurantId) {
        fetch(this.host + "/api/restaurants/" + restaurantId + "/full")
            .then(response => response.json())
            .then((results) => {
                this.setState({
                    restaurantSelected: results
                })
            });
    }

    handleIncrementStep() {
        if(this.state.currentStep < this.steps.length) {
            this.setState({currentStep: this.state.currentStep + 1});
        }
    }

    handleDecrementStep() {
        if(this.state.currentStep > 1) {
            this.setState({currentStep: this.state.currentStep - 1});
        }
    }

    handleDateArrival (newDateArrival) {
        newDateArrival.setHours("00","00","00")
        this.setState({
            dateArrival: newDateArrival,
            timeArrival: newDateArrival,
            timeDeparture: newDateArrival,
        })
    }

    handleTimeArrival(timeArrival) {
        this.setState({
            timeArrival: timeArrival,
            timeDeparture: timeArrival
        })
    }

    handleTimeDeparture(timeDeparture) {
        this.setState({timeDeparture: timeDeparture > this.state.timeArrival ? timeDeparture: this.state.timeArrival})
    }

    componentDidMount() {
        fetch(this.host + "/api/restaurants/")
            .then(response => response.json())
            .then((results) => {
                this.setState({
                    restaurantsList: results['hydra:member']
                })
            });
    }

    render() {
        const {classes} = this.props;

        return (
            <Paper variant="outlined" square className={classes.paper}>
                <Grid container
                      direction="row"
                      justify="center"
                      alignItems="center">
                    <div className={classes.root_stepper}>
                        <Stepper activeStep={this.state.currentStep - 1} alternativeLabel className={classes.stepper}>
                            {this.steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </div>
                    {this.state.currentStep === 1 && this.state.restaurantsList ?
                        <RestaurantStep1 host={this.host}
                                         restaurantsList={this.state.restaurantsList}
                                         handleNextStep={this.handleIncrementStep}
                                         handleRestaurantSelected={this.handleRestaurantSelected}
                        >
                        </RestaurantStep1> :
                        this.state.currentStep === 2 ?
                            <RestaurantStep2
                                restaurantSelected={this.state.restaurantSelected}
                                handleDateArrival={this.handleDateArrival}
                                handleTimeArrival={this.handleTimeArrival}
                                handleTimeDeparture={this.handleTimeDeparture}
                                dateArrival={this.state.dateArrival}
                                timeArrival={this.state.timeArrival}
                                timeDeparture={this.state.timeDeparture}
                            >
                            </RestaurantStep2> :
                            this.state.currentStep === 3 ?
                                <RestaurantStep3
                                    restaurantSelected={this.state.restaurantSelected}
                                    datetimeBooking={this.state.timeDeparture}
                                    datetimeArrival={this.state.timeArrival}
                                    datetimeDeparture={this.state.timeDeparture}
                                >

                                </RestaurantStep3> : ""}
                    {this.state.currentStep !== 1 ?
                        <div style={{marginTop: 100, textAlign: "center"}}>
                            <Button
                                disabled={this.state.currentStep === 1}
                                className={classes.backButton}
                                onClick={this.handleDecrementStep}
                            >
                                previous
                            </Button>
                            <Button
                                disabled={this.state.currentStep === 3}
                                variant="contained"
                                onClick={this.handleIncrementStep}
                            >
                                Next
                            </Button>
                        </div> : ""
                    }
                </Grid>
            </Paper>

        );
    }
}

export default withStyles(useStyles)(DatasCollectorStepper)
