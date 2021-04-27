import { storageService } from './services/storage.service.js'
export const locService = {
    getLocs
}
var locs = [
    { name: 'Loc1', lat: 32.047104, lng: 34.832384 },
    { name: 'Loc2', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    locs = storageService.loadFromStorage() || {}
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}


