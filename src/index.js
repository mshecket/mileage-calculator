import React, {useState} from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button"
import HomeIcon from "@material-ui/icons/Home"


import "./styles.css";


function App() {
  const [addresses, setAddresses] = useState({
    startingAddress: "",
    midpointAddress: "",
    endingAddress: ""
  })
  const [startingAtHome, setStartingAtHome] = useState(false)
  const [endingAtHome, setEndingAtHome] = useState(false)
  const [mapDistance, setMapDistance] = useState(0)
  const [calculated, setCalculated] = useState(false)
  const [calculating, setCalculating] = useState(false)

  function getMapDistance(startingAddress, endingAddress) {
    setCalculated(false)
    setCalculating(true)
    const apiKey = "OOPS EXPOSED AN API KEY BUT I REFRESHED IT"
    const path = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" 
    const uri = path + encodeURI(startingAddress) +
      "&destinations=" + encodeURI(endingAddress) +
      "&key=" + apiKey
    console.log(uri)
     
    return fetch(uri)
      .then(function(response) {
        console.log("bing!");
        let responseJSON = response.json()
        console.log(responseJSON)
        return responseJSON
      })
      .then(function(myJson) {
        console.log("bong!");
        const data = JSON.parse(myJson)
        setMapDistance(data.rows.elements.distance.value)
        setCalculating(false)
        setCalculated(true)
        return myJson
      }
      )
  }

  function handleChange(event)
  {
    const target = event.target

    if (target.type === "checkbox") {
      if (target.name === "startingAtHome") {
        setStartingAtHome(!startingAtHome)
      }
      else
        setEndingAtHome(!endingAtHome)
    }
    else
    {
      setAddresses(prevState => {
        return {...prevState, [target.name]: target.value}
      }
      )
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log("hi")
    getMapDistance("43085","43224")
  }

    return (
    <div className="App">
      <div className="jumbotron">
        <h1>Mileage Calculator</h1>
        <form onSubmit={handleSubmit}>
        <label>
          Where are you starting your trip? <input type="text" placeholder="Starting address" name="startingAddress" value={addresses.startingAddress} onChange={handleChange}></input>
        </label>
        <br/>
        <label>
          What is your midpoint (if any)? <input type="text" placeholder="Midpoint address" name="midpointAddress" value={addresses.midpointAddress} onChange={handleChange}></input>
          </label>
        <br/>
        <label>
          Where are you ending your trip? <input type="text" placeholder="Ending address" name="endingAddress" value={addresses.endingAddress} onChange={handleChange}></input>
          </label>
        <br />
        <hr/>
        <label>Are you starting or ending this trip at home?</label>
          <br/>
          <input type="checkbox" checked={startingAtHome} name="startingAtHome" value="starting" onChange={handleChange}></input>
          <label>Starting at home</label>
          <br/>
          <input type="checkbox" checked={endingAtHome} name="endingAtHome" value="ending" onChange={handleChange}></input>
          <label> Ending at home</label>
          <br/>
        <Button type="submit" name="submit" variant="contained" color="primary">{calculating ? "Calculating..." : calculated ? "Recalculate" : "Calculate"}</Button>
        </form>
        <p>Result: {mapDistance}</p>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
