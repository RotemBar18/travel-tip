import { storageService } from './storage.service.js'
export const locService = {
    getLocs,
    removeLoc
}
var locs = storageService.loadFromStorage() || [
    { id: 'aaa', name: 'Loc1', lat: 33.047104, lng: 34.832384 },
    { id: 'bbb', name: 'Loc2', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function removeLoc(locId) {
    let currLocIdx = locs.findIndex(loc => {
        return loc.id === locId
    })
    locs.splice(currLocIdx,1)
    // storageService.saveToStorage(LOCATIONS_KEY,locs)

}


