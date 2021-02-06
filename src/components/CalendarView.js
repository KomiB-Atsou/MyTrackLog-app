import React, {useState} from 'react';
import moment from 'moment';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import NoCategorySelected from "./NoCategorySelected";
import taskService from '../services/task';

function CalendarView(props) {

    const [start, setStart] = useState(Date.now());
    const [end, setEnd] = useState(Date.now());
    const localizer = momentLocalizer(moment);

    const handleSelect = ({ start, end }) => {
    }

    const handleSelectEvent = task => {
        props.viewTaskDetails(task);
    }

    return (
        <div style={{height: '90vh'}}>
            <Calendar
                popup
                selectable
                localizer={localizer}
                events={props.tasks}
                onSelectSlot={handleSelect}
                onSelectEvent={handleSelectEvent}
            />
        </div>
    );
}

export default CalendarView;