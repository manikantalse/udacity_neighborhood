import React from 'react'
import './App.css'
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locations : ["uppal", "Gandipet", "Hussain sagar", "kukatpally", "Secunderabad"]
    }
    
  }


  loadMap = () => {
    const mapProp = {
      center: { lat: 17.387140, lng: 78.491684 },
      zoom: 10,
    };
    const map = new window.google.maps.Map(document.getElementById("mapView"), mapProp);
    this.Map = map;
    this.tooltip = new window.google.maps.InfoWindow()
  }

  getLocation() {

    const api = "https://api.foursquare.com/v2/venues/explore?";
    const post = {
      client_id: "T2ESOJL013FVCUBKFKFOAELMGMNDZOEYDIRJCVICHS0M154S",
      client_secret: "KVPKAXPUUU12KZT20MPRE3ZUTPQTFHCF50G0LK2XRIQOGEBD",
      query: "Food",
      limit: 7,
      near: null,
      v: "20181214",
    }

    this.state.locations.map(location => {
      post.near = location;
      axios.get(api + new URLSearchParams(post)).then(response => {
          console.log(response.data.response.groups[0].items[0].venue);
          this.markOnMap(response.data.response.groups[0].items[0].venue);
        })
        .catch(error => {
          console.log(error);
        });
    })



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

  filterInput = (e)=>{
    const query = e.target.value;
    this.setState({lo})
  }

  markOnMap(venue) {
    const content = `<b>Name</b> : ${venue.name}<br>
                     <b>Address</b> : ${venue.location.address || "NA"} <br>
                     <b>City</b> : ${venue.location.city || "NA"}<br>
                     <b>State</b> : ${venue.location.state || "NA"}
                    `
    const marker = new window.google.maps.Marker({
      position: venue.location,
      animation: window.google.maps.Animation.DROP,
      map: this.Map
    })
    marker.addListener("click", () => {
      // this.Map.setCenter(marker.position);
      this.tooltip.setContent(content);
      this.tooltip.open(this.Map, marker);
    })
  }

  serviceWorker (){
    /**
* Register the service worker
*/
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', {scope:'/'}).then(function (registration) {
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch(function (err) {
    //registration failed
    console.log('ServiceWorker registration failed: ', err);
  });
 } else {
  console.log('No service-worker on this browser');
 }
  }

  componentDidMount() {
    const script = document.createElement("script");
    const apiUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDmu0VrodQ6EKBtKkwS5H-cZ4WbULG7yks&callback=loadMap";

    script.src = apiUrl;
    script.async = true;
    document.body.appendChild(script);
    window.loadMap = this.loadMap;
    this.getLocation();
    this.serviceWorker();
  }

  render() {
    return (
      <div>
        <div id="searchBar" >
          <div id="topLayout" >
            <input id="search" onChange={this.filterInput} />
          </div>
          <div id="bottomLayout" >
            { this.state.locations.map((loc,id) =>{
                return <li className="location" key={id} > {loc} </li>
            })}
          </div>
        </div>
        <div id="mapView" ></div>
      </div>
    )
  }
}

export default App
