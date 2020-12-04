import React from 'react';
import "./InfoBox.css";
import {CardContent, Typography , Card} from '@material-ui/core';

function InfoBox({title, cases, isRed, active, total, ...props}) {
    return (
        <Card 
            onClick={props.onClick}
            className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"
            }`}
        >
            <CardContent>
                <Typography className="infoBox_title" color= "textSecondary">
                    {title}
                </Typography>
                <h2 className={`infoBox_cases ${!isRed && "infoBox_caases--green"}`}>{cases}</h2>
                <Typography clasName="infoBox_total" color= "textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox;