import produce from 'immer';

export function addToList<T>(list: T[], value: T) {
    return produce<T[]>(list, (draftState)=> {
        //@ts-ignore
        draftState.push(value);
    });
}

export function removeFromList<T>(list: T[], value: T[keyof T], findByKey: keyof T) {
    return produce<T[]>(list, (draftState) => {
        //@ts-ignore
        const index = draftState.findIndex((item) => {
            //@ts-ignore
            return item[findByKey] === value;
        });
        if (index !== -1) {
            draftState.splice(index, 1);
        }
    });
}

export function updateItemInList<T>(list: T[], modifiedData: T, findByKey: keyof T, replace: boolean = true) {
    return produce<T[]>(list, (draftState) => {
        const index = draftState.findIndex((item) => {

            //@ts-ignore
            return item[findByKey] === modifiedData[findByKey];
        })
        if (index === -1){return draftState;}

        if (replace) {
            //@ts-ignore
            draftState[index] = modifiedData
        } else {
            draftState[index] = {...draftState[index], ...modifiedData}
        }
    })
}