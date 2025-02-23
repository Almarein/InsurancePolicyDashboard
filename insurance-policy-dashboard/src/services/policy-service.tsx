// import {ErrorModel} from "../models/error-model.tsx";

export const getPolicyList = async () => {
    return await fetch('api/Policy/list')
        .then(response => response.json())
        .catch(error => {
            throw new Error(error.message)
        });
}

// export const addPicture = async (pictureData: FormData) => {
//     const response = await fetch('api/Picture', { method: 'PUT', body: pictureData });
//     if (response.ok) return;
//     const error = await response.json() as ErrorModel;
//     throw new Error(error.message);    
// }
