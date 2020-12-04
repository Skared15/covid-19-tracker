import React, {useState , useEffect} from "react";
import {MenuItem, FormControl, Select, Card, CardContent} from "@material-ui/core";
import InfoBox from "./InfoBox"
import './App.css';
import Map from "./Map";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";


function App() {
  const [countries,setCountries]=useState([]);
  const [country,setCountry]=useState('Worldwide');
  const [countryInfo, setCountryInfo]=useState({});
  const [tableData,setTableData]=useState([]);
  const [mapCenter, setMapCenter]= useState({lat:34.80746, lng:-40.4796});
  const [mapZoom, setMapZoom]=useState(3);
  const [mapCountries, setMapCountries]=useState([]);
  const [casesType, setCasesType]=useState("cases");
  

  // var getCountriesDa

  useEffect(()=>{  
    // const getCountriesDa=async()=>{  
    fetch("https://disease.sh/v3/covid-19/all/")
      .then((response)=>response.json())
      .then(data => {
        setCountryInfo(data);
      });
    // };
  // getCountriesDa();
        
  },[]);
  
  useEffect(() => {
    const getCountriesData=async()=>{
      await fetch("https://disease.sh/v3/covid-19/countries/")        
        .then((response)=>response.json())
        .then((data)=>{
          const countries=data.map((country)=>({
            name:country.country,
            value: country.countryInfo.iso2 
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);         
        });
    };
    getCountriesData();
  },[]);

 

  const onCountryChange=async (event)=>{
    const countryCode=event.target.value;
    const url= 
      countryCode==='worldwide' 
        ? 'https://disease.sh/v3/covid-19/all/' 
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

  await fetch(url)
      .then((response)=> response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        if(countryCode === 'worldwide'){
          setMapCenter([0.0,0.0]);
          setMapZoom(1.5);
        } 
        else {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
        };
      });
  };

  const initdropdown = (searchlist) => {
    (".ui.dropdown").dropdown({
      values: searchlist,
      onChange: function (value, text) {
        if (value != worldwide.value) {
          getCountriesData(value);
        } 
        else {
          getCountriesData();
        }
      },
    });
  };

  return (
    
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>COVID-19 Tracker</h1>
          {/* <h2 className="made by">-created by Savan Kared (with help of cleverprogrammer.com)</h2> */}
          <FormControl className="app_dropdown">
            <Select 
            variant="outlined" 
            onChange={onCountryChange} 
            value={country}>
              <MenuItem value="Worldwide">Worldwide</MenuItem>
              {/* <MenuItem onChange={getCountriesDa}>Worldwide</MenuItem> */}
              {countries.map((country)=>(
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}           
            </Select>       
          </FormControl>
        </div>
        
        <div className="app_status">
          <InfoBox 
            isRed
            active={casesType==="cases"}
            onClick={(e)=>setCasesType('cases')}  
            title="Coronavirus cases"  
            cases={prettyPrintStat(countryInfo.todayCases)} 
            total={prettyPrintStat(countryInfo.cases)}
          />

          <InfoBox 
            isRed
            active={casesType==="recovered"}
            onClick={(e)=>setCasesType('recovered')} 
            title="Recovered" 
            cases={prettyPrintStat(countryInfo.todayRecovered)} 
            total={prettyPrintStat(countryInfo.recovered)}
          />

          <InfoBox 
            active={casesType==="deaths"}
            onClick={(e)=>setCasesType('deaths')} 
            title="Deaths" 
            cases={prettyPrintStat(countryInfo.todayDeaths)} 
            total={prettyPrintStat(countryInfo.deaths)}
          />

        </div>
        <Map 
          casesType={casesType} 
          countries={mapCountries} 
          center={mapCenter} 
          zoom={mapZoom} 
        />
      </div>     

      <Card className="app_right">
        <CardContent>
          <h3> Live cases by Country</h3>
          <Table countries={tableData}/>
          <h3 className="app_graphTitle"> Worldwide new {casesType} </h3>
          <LineGraph  className="app_graph" casesType={casesType}/>
        </CardContent>
      </Card>

      
    </div>
  );
}


export default App;