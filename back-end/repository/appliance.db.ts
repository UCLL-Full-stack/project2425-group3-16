import {Appliance} from "../model/appliance";

const appliances: Appliance[] = [
    new Appliance({
        applianceId: 1,
        name: 'Air Fryer',
        description: 'Healthy fast cooking appliance.',
        created_at: new Date()
    }),
    new Appliance({
        applianceId: 2,
        name: 'cooking pan',
        description: 'Versatile stove top cooking tool.',
        created_at: new Date()
    })
];

const createAppliance = ({ appliance }: { appliance: Appliance }): Appliance => {
    const newAppliance: Appliance = new Appliance({
        applianceId: appliances.length + 1,
        name: appliance.getName(),
        description: appliance.getDescription(),
        created_at: appliance.getCreatedAt(),
        updated_at: appliance.getUpdatedAt()
    });
    appliances.push(newAppliance);
    return newAppliance;
};

const updateAppliance = (
    {applianceId}: {applianceId: number},
    {newAppliance}: {newAppliance: Appliance}
): Appliance | null => {
    const oldAppliance: Appliance | null  = getApplianceById({applianceId: applianceId})
    if (!oldAppliance) return null;
    const appliance: Appliance = new Appliance({
        applianceId: oldAppliance.getApplianceId(),
        name: newAppliance.getName() ?? oldAppliance.getName(),
        description: newAppliance.getDescription() ?? oldAppliance.getDescription(),
        created_at: oldAppliance.getCreatedAt(),
        updated_at: newAppliance.getUpdatedAt() ?? new Date()
    });
    const index: number = appliances.findIndex(a => a.getApplianceId() === applianceId)
    if(index !== -1 ){appliances[index] = appliance}
    return appliance ?? null;

}

const getAllAppliances = (): Appliance[] => appliances

const getApplianceById = ({applianceId}: {applianceId: number}): Appliance | null =>{
    return  appliances.find((a) => a.getApplianceId() === applianceId) || null
}

const deleteAppliance = ({applianceId}: {applianceId: number}): void | null => {
    const index: number = appliances.findIndex(a => a.getApplianceId() === applianceId);
    if(index === -1 ){return  null}
    appliances.splice(index, 1)
}

export  default {
    createAppliance,
    updateAppliance,
    getAllAppliances,
    getApplianceById,
    deleteAppliance
}