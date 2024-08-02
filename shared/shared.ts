import { Observable } from 'rxjs';

export const Keys = {
    KEY_PROMPT_ACTIVATE: 'key-prompt-activate'
}

export const localStorageChanged$ = new Observable<{
    [key: string]: chrome.storage.StorageChange
}>(subscriber => {
    const next = (
        areaName: chrome.storage.AreaName,
        changes: { [key: string]: chrome.storage.StorageChange }
    ) => {
        if (areaName === 'local') {
            subscriber.next(changes)
        }
    }
    chrome.storage.local.get(null, (items) => {
        const changes = Object.keys(items).reduce((target, key) => {
            Reflect.set(target, key, {
                oldValue: undefined,
                newValue: items[key]
            })
            return target
        }, {})
        next('local', changes)
    })
    chrome.storage.onChanged.addListener((changes, areaName) => next(areaName, changes))
})

export async function setLocalStorage(key: string, value: any) {
    const target = {}
    Reflect.set(target, key, value)
    await chrome.storage.local.set(target)
}

export function getLocalStorage(callback: (value: any) => void) {
    chrome.storage.local.get([Keys.KEY_PROMPT_ACTIVATE], (items) => {
        const value = Reflect.get(items, Keys.KEY_PROMPT_ACTIVATE)
        callback(value)
    });
}