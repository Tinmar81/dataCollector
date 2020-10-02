import React, { useState } from "react";
import { KeyboardTimePicker } from "@material-ui/pickers";

function useUpdateTimeArrival(dateArrival, timeArrival) {

    const timeToUpdate = timeArrival ? new Date(timeArrival) : new Date(dateArrival);
    const [selectedTimeArrival, handleTimeArrivalChange] = useState(timeToUpdate);
    const updateTimeArrival = function() {
        handleTimeArrivalChange(timeToUpdate);
    };

    return [timeToUpdate, updateTimeArrival];
}

function ArrivalTimePicker({dateArrival, timeArrival, handleTimeArrival}) {

    const [timeToUpdate, updateTimeArrival] = useUpdateTimeArrival(dateArrival, timeArrival);

    return <KeyboardTimePicker
            margin="normal"
            id="time-picker-arrival"
            label="Arrival"
            placeholder="12:00"
            openTo="hours"
            views={["hours", "minutes"]}
            format="HH:mm"
            value={timeToUpdate}
            ampm={false}
            onChange={date => updateTimeArrival(date)}
            onAccept={handleTimeArrival}
        />;
}

export default ArrivalTimePicker;