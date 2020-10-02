import React, {Component} from "react";

//Material component
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/core/styles";
import {CardActionArea, CardMedia, CardContent, Typography, Card} from "@material-ui/core";

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    card_root: {
        maxWidth: 345,
    },
    card_media: {
        height: 140,
    },
});

class RestaurantStep1 extends Component {

    constructor(props) {
        super(props);
        this.handleNextStep = this.handleNextStep.bind(this)
        this.handleRestaurantSelected = this.handleRestaurantSelected.bind(this)
    }

    handleNextStep() {
        this.props.handleNextStep()
    }

    handleRestaurantSelected(restaurantId) {
        this.props.handleRestaurantSelected(restaurantId)
    }

    render() {
        let cards = [];
        const {classes} = this.props;

        if(this.props.restaurantsList) {
            this.props.restaurantsList.forEach((restaurant) => {
                let imageUrl = this.props.host + restaurant.image.path + restaurant.image.filename + restaurant.image.format
                cards.push(<Grid key={"grid-" + restaurant.id} item md={3}>
                    <Card
                        className={classes.card_root}
                        onClick={()=> {
                            this.handleNextStep();
                            this.handleRestaurantSelected(restaurant.id);
                        }}
                        variant="outlined"
                        square
                    >
                        <CardActionArea>
                            <CardMedia
                                className={classes.card_media}
                                image={imageUrl}
                                title={restaurant.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {restaurant.name}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>)
            })
        }

        return <Grid key={"grid-cards"} container className={classes.root} spacing={3}>
            {cards}
        </Grid>
    }
}

export default withStyles(useStyles)(RestaurantStep1)