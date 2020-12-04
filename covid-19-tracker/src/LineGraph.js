import React,{useState, useEffect} from 'react';
import { Line } from "react-chartjs-2";
// import { withTheme } from '@material-ui/core';
import numeral from "numeral";

const options={
    legend:{
        display:false,
    },
    elements:{
        point:{
            radius:0,
        },
    },
    maintainAspectRatio:false,
    tooltips:{
        mode: "index",
        intersect: false,
        callback:{
            label: function(tooltipItem, data){
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales:{
        xAxes:[
            {
                type:"time",
                time:{
                    format:"MM/DD/YY",
                    tooltipFormat:'ll',
                },
            },
        ],
        yAxis:[
            {
                gridLines:{
                    display:false,
                },
                ticks:{
                    callback: function(value, index, values){
                        return  numeral(value).format("0a");
                    }
                }
            }
        ]
    }
}

function LineGraph({casesType,...props}) {
    const [data,setData]=useState({});
    const buildChartData= (data,casesType)=>{
        const chartData=[];
        let lastDataPoint;

        for (let date in  data.cases){
            if (lastDataPoint){
                const newDataPoint={
                    x: date,
                    y:data[casesType][date]-lastDataPoint,
                }
                chartData.push(newDataPoint);
            }
            lastDataPoint=data[casesType][date];
        }
        return chartData;
    }


    useEffect(() => {
        const fetchData=async()=>{
            await  fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then((response)=>response.json())
            .then((data)=>{
                let chartData=buildChartData(data,casesType);
                console.log(chartData);
                setData(chartData);
            });
        }
       fetchData();
    }, [casesType]);


    return (
        <div className={props.className}>
            
            {data?.length>0 &&(
                <Line 
                    options={options}
                    data={{
                        datasets:[
                            {
                                backgroundColor: "rgba(204, 16, 52, 0.5)",
                                borderColor: "#CC1034",
                                data:data,
                            },
                        ],
                    }}
                />
            )}
        </div>
    );
}

export default LineGraph