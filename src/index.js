import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  const [addresses, setAddresses] = useState({
    startingAddress: "",
    midpointAddress: "",
    endingAddress: ""
  })
  const [startingAtHome, setStartingAtHome] = useState(false)
  const [endingAtHome, setEndingAtHome] = useState(false)

  function handleChange(event)
  {
    const targetType = event.target.type
    const targetName = event.target.name
    const targetValue = event.target.value

    if (targetType == "checkbox") {
      if (targetName == "startingAtHome") {
        setStartingAtHome(!startingAtHome)
      }
      else
        setEndingAtHome(!endingAtHome)
    }
    else
    {
      setAddresses(prevState => {
        return {...prevState, [targetName]: targetValue}
      }
      )
    }
  }

  return (
    <div className="App" className="jumbotron">
      <h1>Mileage Calculator</h1>
      <label>Where are you starting your trip? <input type="text" placeholder="Starting address" name="startingAddress" value={addresses.startingAddress} onChange={handleChange}></input></label>
      <br/>
      <label>What is your midpoint (if any)? <input type="text" placeholder="Midpoint address" name="midpointAddress" value={addresses.midpointAddress} onChange={handleChange}></input></label>
      <br/>
      <label>Where are you ending your trip? <input type="text" placeholder="Ending address" name="endingAddress" value={addresses.endingAddress} onChange={handleChange}></input></label>
      <br />
      <label>Are you starting or ending this trip at home?</label>
        <br/><input type="checkbox" checked={startingAtHome} name="startingAtHome" value="starting" onChange={handleChange}></input><label>Starting at home</label>
        <br/><input type="checkbox" checked={endingAtHome} name="endingAtHome" value="ending" onChange={handleChange}></input><label>Ending at home</label>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
