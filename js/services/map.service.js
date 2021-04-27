import { locService } from './loc.service.js';
import { appController } from '../app.controller.js';

export const mapService = {
    initMap,
    addMarker,
    panTo,
    getLocationName,
    getLocationCoords
}

var gMap;
var gGeoCoder;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: {
                    lat: lat,
                    lng: lng
                },
                zoom: 12
            })
            let infoWindow = new google.maps.InfoWindow({
                content: "Click the map to get Lat/Lng!",
                position: {
                    lat: lat,
                    lng: lng
                },
            });
            // Configure the click listener.
            gMap.addListener("click", (mapsMouseEvent) => {
                locService.addLoc(mapsMouseEvent.latLng.lat(), mapsMouseEvent.latLng.lng());
                appController.renderSavedLocations();
            });
            gGeoCoder = new google.maps.Geocoder();
            console.log(gGeoCoder);
        });
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    console.log('lng', +lng)
    console.log('lat', +lat)
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
    lat = +lat
    lng = +lng
    addMarker({lat,lng})
}

function getLocationName(lat, lng) {
    return new Promise((resolve, reject) => {
        gGeoCoder.geocode(
            { 
                location: new google.maps.LatLng(lat, lng)
            },
            (result, status) => {
                if(status == 'OK' && result[0]) {
                    resolve(result[0].formatted_address);
                }
                reject('Could not reverse geocode');
            });
    });
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyB6E2DFG6PZ6hEFGce-I5_ez7KcXWlmVSI'; //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}


function getLocationCoords(locationName) {
    const API_KEY = 'AIzaSyB6E2DFG6PZ6hEFGce-I5_ez7KcXWlmVSI'
    const prm = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=${API_KEY}`)
        .then(res => res.data)
    return prm;
}