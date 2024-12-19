import { Appliance } from '@types';

const getAllAppliances = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/appliance', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const getApplianceById = ({ id }: { id: string }) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/appliance/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const createAppliance = (applianceInput: Appliance) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/appliance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(applianceInput)
    });
};

const updateAppliance = (
    { id, applianceInput }: { id: number, applianceInput: Appliance }
) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/appliance/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(applianceInput)
    });
};

const deleteAppliance = ({ id }: { id: number }) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/appliance/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const applianceService = {
    getAllAppliances,
    getApplianceById,
    createAppliance,
    updateAppliance,
    deleteAppliance
};

export default applianceService;