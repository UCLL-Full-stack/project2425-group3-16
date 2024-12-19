import {ApplianceInput} from "../types";
import {Appliance} from "../model/appliance";
import applianceDb from "../repository/appliance.db";
import assert from "node:assert";

const creatAppliance = async (
    {name, description, created_at}: ApplianceInput
): Promise<Appliance | null> => {

    const appliance: Appliance = new Appliance({ name, description, created_at });

    const appliances: Appliance[] = await applianceDb.getAllAppliances()
    appliances.forEach((a) =>{
        const equals: Boolean =  a.equals(appliance)
        if(equals){
            throw new Error('You can save this object')  //We don't tell the user we already have this object for security reasons
        }
    })

    return await applianceDb.createAppliance({newAppliance: appliance})
}

const updateAppliance = async (
    {applianceId}: {applianceId: number},
    {name, description, created_at, updated_at }: ApplianceInput
): Promise<Appliance | null> => {

    const appliance: Appliance = new Appliance({ name, description, created_at, updated_at });

    await getApplianceById({applianceId: applianceId})

    const appliances: Appliance[] = await applianceDb.getAllAppliances()
    appliances.forEach((a: Appliance) =>{
        const equals: Boolean =  a.equals(appliance)
        if(equals){
            throw new Error('You can save this object')  //We don't tell the user we already have this object for security reasons
        }
    })

    const result: Appliance | null = await applianceDb.updateAppliance(
        {applianceId: applianceId},
        {newAppliance: appliance}
    )

    assert(result, 'Something when wrong in the database.')
    return result;
}

const getApplianceById = async (
    {applianceId}: {applianceId: number}
): Promise<Appliance> => {
    const appliance: Appliance | null = await applianceDb.getApplianceById({applianceId: applianceId})
    if(!appliance){
        throw new Error(`Appliance with id: ${applianceId} doesn't exist.`)
    }
    return  appliance
}

const getAllAppliances = async (): Promise<Appliance[]> => {
    return await applianceDb.getAllAppliances()
}

const deleteAppliance = async (
    {applianceId}: {applianceId: number}
): Promise<boolean> => {

    await getApplianceById({applianceId: applianceId})
    return  await applianceDb.deleteAppliance({applianceId: applianceId})
}

export default {
    creatAppliance,
    updateAppliance,
    getAllAppliances,
    getApplianceById,
    deleteAppliance,
}