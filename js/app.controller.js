import { locService } from './services/loc.service.js';
import { mapService } from './services/map.service.js';
import { utilService } from './services/util.service.js';

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
    document.querySelector('.btn-pan').addEventListener('click', (ev) => {
        console.log('Panning the Map');
        mapService.panTo(35.0, 119.6917);
    })
    document.querySelector('.btn-add-marker').addEventListener('click', (ev) => {
        console.log('Adding a marker');
        mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
    })
    document.querySelector('.btn-get-locs').addEventListener('click', (ev) => {
        locService.getLocs()
            .then(locs => {
                console.log('Locations:', locs)
                document.querySelector('.locs').innerText = JSON.stringify(locs)
            })

    })
    document.querySelector('.btn-user-pos').addEventListener('click', (ev) => {
        getPosition()
            .then(pos => {
                console.log('User position is:', pos.coords);
                document.querySelector('.user-pos').innerText =
                    `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
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
                <button class="btn ${location.id}" data-lat="${location.lat}" data-lng="${location.lng}" ${location.id}">GO</button>
                <button class="delete-btn ${location.id}" data-id="${location.id}">delete</button>
            </div>`
        })

        strHtml = strHtml.join('')
        document.querySelector('.locs').innerHTML = strHtml
        document.querySelectorAll('.btn').forEach(elBtn => {
            console.log('elBtn', elBtn)
            elBtn.addEventListener('click', (ev) => {
                mapService.panTo(elBtn.dataset.lat, elBtn.dataset.lng);

            })

        })
        document.querySelectorAll('.delete-btn').forEach(elBtn => {
            console.log('elBtn', elBtn)
            elBtn.addEventListener('click', (ev) => {
                locService.removeLoc(elBtn.dataset.id);
                renderSavedLocations()

            })

        })

    })
}