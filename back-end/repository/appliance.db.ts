import { Appliance } from '../model/appliance';
import database from './database';

const createAppliance = async ({ newAppliance }: { newAppliance: Appliance }): Promise<Appliance | null> => {
    try {
        const appliancePrisma = await database.appliance.create({
            data: {
                name: newAppliance.getName(),
                description: newAppliance.getDescription(),
                createdAt: newAppliance.getCreatedAt(),
                updatedAt: newAppliance.getUpdatedAt()
            }
        });
        return appliancePrisma ? Appliance.from(appliancePrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateAppliance = async (
    { applianceId }: { applianceId: number },
    { newAppliance }: { newAppliance: Appliance }
): Promise<Appliance | null> => {
    try {
        const appliancePrisma = await database.appliance.update({
            where: { applianceId: applianceId },
            data: {
                name: newAppliance.getName(),
                description: newAppliance.getDescription(),
                createdAt: newAppliance.getCreatedAt(),
                updatedAt: newAppliance.getUpdatedAt()
            }
        });
        return Appliance.from(appliancePrisma) ?? null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


const getAllAppliances = async (): Promise<Appliance[]> => {
    try {
        const appliancePrisma = await database.appliance.findMany();
        return appliancePrisma.map(a => Appliance.from(a));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


const getApplianceById = async ({ applianceId }: { applianceId: number }): Promise<Appliance | null> => {
    try {
        const appliancePrisma = await database.appliance.findUnique({
            where: { applianceId: applianceId }
        });
        return appliancePrisma ? Appliance.from(appliancePrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const deleteAppliance = async ({ applianceId }: { applianceId: number }): Promise<boolean> => {
    try {
        const result = await database.appliance.delete({
            where: { applianceId: applianceId }
        });
        return !!result;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    createAppliance,
    updateAppliance,
    getAllAppliances,
    getApplianceById,
    deleteAppliance
};