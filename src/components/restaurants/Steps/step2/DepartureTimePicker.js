import React, { useState } from "react";
import { KeyboardTimePicker } from "@material-ui/pickers";

function useUpdateTimeDeparture(dateDeparture, timeDeparture) {

    const timeToUpdate = timeDeparture ? new Date(timeDeparture) : new Date(dateDeparture);
    const [selectedTimeDeparture, handleTimeDepartureChange] = useState(timeToUpdate);
    const updateTimeDeparture = function() {
        handleTimeDepartureChange(timeToUpdate);
    };

    return [timeToUpdate, updateTimeDeparture];
}

function DepartureTimePicker({dateDeparture, timeDeparture, handleTimeDeparture}) {
    const [timeToUpdate, updateTimeDeparture] = useUpdateTimeDeparture(dateDeparture, timeDeparture);

    return <KeyboardTimePicker
            margin="normal"
            id="time-picker-departure"
            label="Departure"
            placeholder="12:00"
            openTo="hours"
            views={["hours", "minutes"]}
            format="HH:mm"
            value={timeToUpdate}
            ampm={false}
            onChange={date => updateTimeDeparture(date)}
            onAccept={handleTimeDeparture}
        />;
}

export default DepartureTimePicker;