import React, {useState } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";

function ArrivalDatePicker({dateArrival, handleDateArrival}) {

    const [selectedDate, handleDateChange] = useState(dateArrival);

    return <KeyboardDatePicker
                margin="normal"
                id="date-picker-inline"
                label="Date of your visit"
                format="dd.MM.yyyy"
                value={selectedDate}
                onChange={date => handleDateChange(date)}
                onAccept={handleDateArrival}
            />;
}

export default ArrivalDatePicker;