import {ApplianceInput} from "../../types";
import {Appliance} from "../../model/appliance";
import applianceDb from "../../repository/appliance.db";
import applianceService from "../../service/appliance.service";

let applianceInput: ApplianceInput;
let appliance: Appliance;

// db Mocks
let mockApplianceDbCreatAppliance: jest.SpyInstance<Promise<Appliance | null>, [{ newAppliance: Appliance }]>;
let mockApplianceDbUpdateAppliance: jest.SpyInstance<Promise<Appliance | null>, [{ applianceId: number }, { newAppliance: Appliance }]>;
let mockApplianceDbGetAllAppliances: jest.SpyInstance<Promise<Appliance[]>>;
let mockApplianceDbGetApplianceById: jest.SpyInstance<Promise<Appliance | null>, [{ applianceId: number }]>;
let mockApplianceDbDeleteAppliance: jest.SpyInstance<Promise<boolean>, [{ applianceId: number }]>;

beforeEach(() => {
    applianceInput = {
        applianceId: undefined,
        name: 'Cooking robot',
        description: 'A tool that helps you cook',
        created_at: new Date(),
        updated_at: undefined
    };

    appliance = new Appliance({
        name: 'Cooking robot',
        description: 'A tool that helps you cook',
        created_at: new Date(),
    });

    jest.resetModules(); // Reset module registry
    // db Mocks
    mockApplianceDbCreatAppliance = jest.spyOn(applianceDb, 'createAppliance').mockResolvedValue(appliance);
    mockApplianceDbGetApplianceById = jest.spyOn(applianceDb, 'getApplianceById').mockResolvedValue(appliance);
    mockApplianceDbGetAllAppliances = jest.spyOn(applianceDb, 'getAllAppliances').mockResolvedValue([appliance]);
    mockApplianceDbUpdateAppliance = jest.spyOn(applianceDb, 'updateAppliance').mockResolvedValue(appliance);
    mockApplianceDbDeleteAppliance = jest.spyOn(applianceDb, 'deleteAppliance').mockResolvedValue(true);
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: a valid appliance, when an appliance is created, then an appliance is created with those values', async () => {
    // given
    mockApplianceDbGetAllAppliances.mockResolvedValue([]);
    mockApplianceDbCreatAppliance.mockResolvedValue(appliance);

    // when
    const result = await applianceService.creatAppliance(applianceInput);

    // then
    expect(mockApplianceDbCreatAppliance).toHaveBeenCalledTimes(1);
    expect(mockApplianceDbCreatAppliance).toHaveBeenCalledWith({
        newAppliance: expect.objectContaining({
            applianceId: undefined,
            name: 'Cooking robot',
            description: 'A tool that helps you cook',
            created_at: expect.any(Date),
            updated_at: undefined
        })
    });
    expect(result).toEqual(appliance);
});

test('given a invalid applianceInput, when an appliance is created, then an error is thrown.', async () => {
    // given
    const invalidApplianceInput: ApplianceInput = {
        name: '  ', // Invalid name
        description: 'A tool that helps you cook',
        created_at: new Date(),
        updated_at: undefined,
    };

    // when
    const creatAppliance = async () => await applianceService.creatAppliance(invalidApplianceInput);

    // then
    await expect(creatAppliance).rejects.toThrow('Name can not be empty.');
});

test('given: a valid applianceInput but one we already have in the Db, when: we try to save an appliance, then: an error is thrown', async () => {
    // given
    mockApplianceDbGetAllAppliances.mockResolvedValue([appliance]);
    jest.spyOn(appliance, 'equals').mockReturnValue(true);

    // when
    const createAppliance = async () => await applianceService.creatAppliance(applianceInput);

    // then
    await expect(createAppliance).rejects.toThrow('You can save this object');
});

test('given: valid applianceInput, when: we try to update an appliance, then: we update the appliance', async () => {
    // given
    const applianceId: number = 1;
    mockApplianceDbGetApplianceById.mockResolvedValue(appliance);
    mockApplianceDbGetAllAppliances.mockResolvedValue([]);
    jest.spyOn(appliance, 'equals').mockReturnValue(false);
    const newAppliance: Appliance = new Appliance({
        name: applianceInput.name,
        description: applianceInput.description,
        created_at: applianceInput.created_at,
        updated_at: applianceInput.updated_at
    });
    mockApplianceDbUpdateAppliance.mockResolvedValue(newAppliance);

    // when
    const result = await applianceService.updateAppliance(
        {applianceId: applianceId},
        applianceInput
    );

    // then
    expect(mockApplianceDbUpdateAppliance).toHaveBeenCalledTimes(1);
    expect(mockApplianceDbUpdateAppliance).toHaveBeenCalledWith(
        {applianceId: applianceId},
        {newAppliance: newAppliance}
    );
    expect(result).toEqual(newAppliance);
});

test('given: an invalid applianceInput, when: we try to update an appliance, then an error is thrown', async () => {
    // given
    const invalidApplianceInput: ApplianceInput = {
        name: '  ', // Invalid name
        description: 'A tool that helps you cook',
        created_at: new Date(),
        updated_at: undefined,
    };

    // when
    const updateAppliance = async () => await applianceService.updateAppliance(
        {applianceId: 1},
        invalidApplianceInput
    );

    // then
    await expect(updateAppliance).rejects.toThrow('Name can not be empty.');
});

test('given: an invalid applianceId, when: trying to update an appliance, then: an error is thrown', async () => {
    // given
    const applianceId: number = -1;
    mockApplianceDbGetApplianceById.mockResolvedValue(null);

    // when
    const updateAppliance = async () => await applianceService.updateAppliance(
        {applianceId: applianceId},
        applianceInput
    );

    // then
    await expect(updateAppliance).rejects.toThrow(`Appliance with id: ${applianceId} doesn't exist.`);
});

test('given: we try to have an appliance we already have, when: we try to update an appliance, then an error is thrown', async () => {
    // given
    mockApplianceDbGetApplianceById.mockResolvedValue(appliance);
    mockApplianceDbGetAllAppliances.mockResolvedValue([appliance]);
    jest.spyOn(appliance, 'equals').mockReturnValue(true);

    // when
    const updateAppliance = async () => await applianceService.updateAppliance(
        {applianceId: 1},
        applianceInput
    );

    // then
    await expect(updateAppliance).rejects.toThrow("You can save this object");
});

test('given: a problem in the db when: we call updateAppliance, then: an error is thrown.', async () => {
    // given
    mockApplianceDbGetApplianceById.mockResolvedValue(appliance);
    mockApplianceDbGetAllAppliances.mockResolvedValue([appliance]);
    jest.spyOn(appliance, 'equals').mockReturnValue(false);
    mockApplianceDbUpdateAppliance.mockResolvedValue(null);

    // when
    const updateAppliance = async () => await applianceService.updateAppliance(
        {applianceId: 1},
        applianceInput
    );

    // then
    await expect(updateAppliance).rejects.toThrow('Something when wrong in the database.');
});

test('given a working backend, when we try to call getAllAppliances, then we return all appliances in the db.', async () => {
    // given
    mockApplianceDbGetAllAppliances.mockResolvedValue([appliance]);

    // when
    const getAllAppliances = await applianceService.getAllAppliances();

    // then
    expect(mockApplianceDbGetAllAppliances).toHaveBeenCalledTimes(1);
    expect(getAllAppliances).toEqual([appliance]);
});

test('given: a valid applianceId, when: deleteAppliance is called, then: the appliance is deleted.', async () => {
    // given
    const applianceId: number = 1;
    mockApplianceDbGetApplianceById.mockResolvedValue(appliance);

    // when
    const deleteAppliance = applianceService.deleteAppliance({applianceId: applianceId});

    // then
    await expect(deleteAppliance).resolves.not.toThrow();
});

test('given: an invalidApplianceId, when deleteAppliance is called, then: an error is thrown', async () => {
    // given
    const invalidApplianceId: number = -1;
    mockApplianceDbGetApplianceById.mockResolvedValue(null);

    // when
    const deleteAppliance = async () => await applianceService.deleteAppliance({applianceId: invalidApplianceId});

    // then
    await expect(deleteAppliance).rejects.toThrow(`Appliance with id: ${invalidApplianceId} doesn't exist.`);
});