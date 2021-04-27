import {
    storageService
} from './storage.service.js'
export const locService = {
    getLocs
}

const LOCATIONS_KEY = 'locations';

var locs = storageService.loadFromStorage(LOCATIONS_KEY) || [{
        name: 'Loc1',
        lat: 32.047104,
        lng: 34.832384
    },
    {
        name: 'Loc2',
        lat: 32.047201,
        lng: 34.832581
    }
];

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 500);
    });
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

function removeLoc(index) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            locs.splice(index, 1);
            storageService.saveToStorage(LOCATIONS_KEY, locs);
            resolve(locs);
        }, 500);
    });
}