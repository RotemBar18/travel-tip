import { locService } from './services/loc.service.js';
import { mapService } from './services/map.service.js';

export const appController = {
    renderSavedLocations
}

window.onload = onInit;

function onInit() {
    console.log('hihi');
    addEventListenrs();
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));
    renderSavedLocations()
}

function addEventListenrs() {
    document.querySelector('.btn-search-location').addEventListener('click', (ev) => {
        let locationName = document.querySelector('.input-location').value
        mapService.getLocationCoords(locationName)
        .then(res=>{
        const locLat =res.results[0].geometry.location.lat
        const locLng =res.results[0].geometry.location.lng
        mapService.panTo(locLat,locLng)
        locService.addLoc(locLat,locLng)
        })
    })
    document.querySelector('.btn-add-marker').addEventListener('click', (ev) => {
        console.log('Adding a marker');
        mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
    })
    document.querySelector('.btn-my-location').addEventListener('click', (ev) => {
        getPosition()
            .then(pos => {
                console.log('User position is:', pos.coords);
                // document.querySelector('.user-pos').innerText =
                //     `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
                mapService.panTo(pos.coords.latitude, pos.coords.longitude);
            })
            .catch(err => {
                console.log('err!!!', err);
            })
    })
}


// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function renderSavedLocations() {
    const locationPrm = locService.getLocs()
    locationPrm.then(locations => {
        let strHtml = locations.map(location => {
            return `<div class="location">
                <h2 class="location-name">${location.name}</h2>
                <button class="go-btn ${location.id}" data-lat="${location.lat}" data-lng="${location.lng}" ${location.id}">GO</button>
                <button class="delete-btn ${location.id}" data-id="${location.id}">delete</button>
            </div>`
        })

        strHtml = strHtml.join('')
        document.querySelector('.locs').innerHTML = strHtml
        document.querySelectorAll('.go-btn').forEach(elBtn => {
            console.log('elBtn', elBtn)
            elBtn.addEventListener('click', (ev) => {
                mapService.panTo(elBtn.dataset.lat, elBtn.dataset.lng);

            })

        })
        document.querySelectorAll('.delete-btn').forEach(elBtn => {
            console.log('elBtn', elBtn)
            elBtn.addEventListener('click', (ev) => {
                locService.removeLoc(elBtn.dataset.id);
                renderSavedLocations();
            })

        })

    })
}