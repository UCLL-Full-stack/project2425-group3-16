import {ApplianceInput} from "../types";
import {Appliance} from "../model/appliance";
import applianceDb from "../repository/appliance.db";
import assert from "node:assert";

const creatAppliance = ({name, description, created_at}: ApplianceInput): Appliance => {
    const appliance: Appliance = new Appliance({ name, description, created_at });

    const appliances: Appliance[] = applianceDb.getAllAppliances()
    appliances.forEach((a) =>{
        const equals: Boolean =  a.equals(appliance)
        if(equals){
            throw new Error('You can save this object')  //We don't tell the user we already have this object for security reasons
        }
    })

    return applianceDb.createAppliance({appliance})
}

const updateAppliance = (
    {applianceId}: {applianceId: number},
    {name, description, created_at, updated_at }: ApplianceInput
): Appliance => {
    const appliance: Appliance = new Appliance({ name, description, created_at, updated_at });

    getApplianceById({applianceId: applianceId})

    const appliances: Appliance[] = applianceDb.getAllAppliances()
    appliances.forEach((a: Appliance) =>{
        const equals: Boolean =  a.equals(appliance)
        if(equals){
            throw new Error('You can save this object')  //We don't tell the user we already have this object for security reasons
        }
    })

    const result: Appliance | null = applianceDb.updateAppliance(
        {applianceId: applianceId},
        {newAppliance: appliance}
    )

    assert(result, 'Something when wrong in the database.')
    return  result;
}

const getApplianceById = ({applianceId}: {applianceId: number}): Appliance => {
    const appliance: Appliance | null = applianceDb.getApplianceById({applianceId: applianceId})
    if(!appliance){
        throw new Error(`Appliance with id: ${applianceId} doesn't exist.`)
    }
    return  appliance
}

const getAllAppliances = (): Appliance[] => applianceDb.getAllAppliances()

const deleteAppliance = ({applianceId}: {applianceId: number}): void => {
    getApplianceById({applianceId: applianceId})
    applianceDb.deleteAppliance({applianceId: applianceId})
}

export default {
    creatAppliance,
    updateAppliance,
    getAllAppliances,
    getApplianceById,
    deleteAppliance,
}