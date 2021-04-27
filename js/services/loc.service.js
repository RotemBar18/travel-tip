import { storageService } from './storage.service.js';
import { utilService } from './util.service.js';
export const locService = {
    getLocs,
    removeLoc,
    addLoc
}

const LOCATIONS_KEY = 'locations';

var gLocs = storageService.loadFromStorage(LOCATIONS_KEY) || [
    { id: 'aaa', name: 'yam', lat: 33.047104, lng: 34.832384 },
    { id: 'bbb', name: 'ramat gan', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(gLocs);
        }, 500);
    });
}

function removeLoc(locId) {
    let currLocIdx = gLocs.findIndex(loc => {
        return loc.id === locId
    })
    gLocs.splice(currLocIdx, 1)
    storageService.saveToStorage(LOCATIONS_KEY, gLocs)

}

function addLoc(lat, lng) {
    const newLoc = {
        id: utilService.makeId(),
        lat,
        lng
    };
    getLocationName(lat, lng)
        .then(res => newLoc.name = res)
    gLocs.push(newLoc);
    storageService.saveToStorage(LOCATIONS_KEY, gLocs);

}

function getLocationName(lat,lng){

}

