import {
    storageService
} from './storage.service.js'
export const locService = {
    getLocs,
    removeLoc,
    addLoc
}
const LOCATIONS_KEY = 'locations';

var locs = storageService.loadFromStorage(LOCATIONS_KEY) || [
    { id: 'aaa', name: 'Loc1', lat: 33.047104, lng: 34.832384 },
    { id: 'bbb', name: 'Loc2', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 500);
    });
}

function removeLoc(locId) {
    let currLocIdx = locs.findIndex(loc => {
        return loc.id === locId
    })
    locs.splice(currLocIdx, 1)
    storageService.saveToStorage(LOCATIONS_KEY,locs)

}

function addLoc(name, lat, lng) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            locs.push({
                'name': name,
                'lat': lat,
                'lng': lng
            });
            storageService.saveToStorage(LOCATIONS_KEY, locs);
            resolve(locs);
        }, 500);
    });
}

