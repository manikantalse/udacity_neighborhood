import React from 'react'
import './App.css'
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
    this.locations = ["uppal","Gandipet","Hussain sagar","kukatpally","Secunderabad"];
  }


  loadMap = () => {
    const mapProp = {
      center: { lat: 17.387140, lng: 	78.491684 },
      zoom: 5,
    };
    const map = new window.google.maps.Map(document.getElementById("mapView"), mapProp);
    this.Map = map;

  }

  getLocation() {

    const api = "https://api.foursquare.com/v2/venues/explore?";
    const credentials = {
      client_id: "T2ESOJL013FVCUBKFKFOAELMGMNDZOEYDIRJCVICHS0M154S",
      client_secret: "KVPKAXPUUU12KZT20MPRE3ZUTPQTFHCF50G0LK2XRIQOGEBD",
      query: "Food",
      near: null,
      v: "20181214",
      limit: 10,
    } 

    // this.locations.map(location => {
    //   credentials.near =  location;
    //   axios.get(api + new URLSearchParams(credentials))
    //     .then(response => {
    //       console.log(response,"count");
    //       this.markOnMap(response.data.response.groups[0].items[0].venue.location);
    //     })
    //     .catch(error => {
    //       console.log("Error Occured While Fetching Foursquare API" + error);
    //     });
    // })



    // fetch(api, {
    //   method: "POST",
    //   body: JSON.stringify(credentials),
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   credentials: "same-origin"
    // }).then(function(response) {
    //   console.log(response);
    // }, function(error) {
    //   console.log(error.message);
    // })
  }

  markOnMap(location) {
    new window.google.maps.Marker({
      position: location,
      map: this.Map
    })
  }

  componentDidMount() {
    const script = document.createElement("script");
    const apiUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDmu0VrodQ6EKBtKkwS5H-cZ4WbULG7yks&callback=loadMap";

    script.src = apiUrl;
    script.async = true;
    document.body.appendChild(script);
    window.loadMap = this.loadMap;
    this.getLocation();
  }

  render() {
    return (
      <div>
        <div id="searchBar" >
          <div id="topLayout" >
            <input id="search" />
          </div>
          <div id="bottomLayout" >
            <li className="location">Hello</li>
            <li className="location">Hello</li>
            <li className="location">Hello</li>
          </div>
        </div>
        <div id="mapView" ></div>
      </div>
    )
  }
}

export default App
