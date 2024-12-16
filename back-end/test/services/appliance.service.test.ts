import {ApplianceInput} from "../../types";
import {Appliance} from "../../model/appliance";
import applianceDb from "../../repository/appliance.db";
import applianceService from "../../service/appliance.service";

//TODO in most of the test I return an empty array form the getAllApplianceDb call.
// this is so that we also don't need mock the equals check. ==> empty array mean not .foreach

let applianceInput: ApplianceInput;
let appliance: Appliance;

// db Mocks
let mockApplianceDbCreatAppliance: jest.SpyInstance<Appliance | null, [{ appliance: Appliance }]>;
let mockApplianceDbUpdateAppliance: jest.SpyInstance<Appliance | null, [{ applianceId: number }, {
    newAppliance: Appliance
}]>;
let mockApplianceDbGetAllAppliances: jest.SpyInstance<Appliance[]>;
let mockApplianceDbGetApplianceById: jest.SpyInstance<Appliance | null, [{ applianceId: number }]>;
let mockApplianceDbDeleteAppliance: jest.SpyInstance<void | null, [{ applianceId: number }]>;

// service mocks
let mockApplianceServiceGetApplianceById: jest.SpyInstance<Appliance | null, [{ applianceId: number }]>;

// model mocks
let mockApplianceModelEquals: jest.SpyInstance<boolean, [appliance: Appliance]>

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
    mockApplianceDbCreatAppliance = jest.spyOn(applianceDb, 'createAppliance');
    mockApplianceDbGetApplianceById = jest.spyOn(applianceDb, 'getApplianceById');
    mockApplianceDbGetAllAppliances = jest.spyOn(applianceDb, 'getAllAppliances');
    mockApplianceDbUpdateAppliance = jest.spyOn(applianceDb, 'updateAppliance');
    mockApplianceDbDeleteAppliance = jest.spyOn(applianceDb, 'deleteAppliance');

    // service mocks
    mockApplianceServiceGetApplianceById = jest.spyOn(applianceService, 'getApplianceById');

    // model mock
    mockApplianceModelEquals = jest.spyOn(appliance, 'equals');
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: a valid appliance, when an appliance is created, then an appliance is created with those values', () => {
    // given
    mockApplianceDbGetAllAppliances.mockReturnValue([])
    mockApplianceDbCreatAppliance.mockReturnValue(appliance)

    //when
    const result = applianceService.creatAppliance(applianceInput);

    //then
    expect(mockApplianceDbCreatAppliance).toHaveBeenCalledTimes(1)
    expect(mockApplianceDbCreatAppliance).toHaveBeenCalledWith({
        appliance: expect.objectContaining({
            applianceId: undefined,
            name: 'Cooking robot',
            description: 'A tool that helps you cook',
            created_at: expect.any(Date),
            updated_at: undefined
        })
    });
    expect(result).toEqual(appliance);
});

test('given a invalid applianceInput, when an appliance is created, then an error is thrown.', () => {
    // given
    const invalidApplianceInput: ApplianceInput = {
        name: '  ', // Invalid name
        description: 'A tool that helps you cook',
        created_at: new Date(),
        updated_at: undefined,
    };

    //when
    const creatAppliance = () => applianceService.creatAppliance(invalidApplianceInput)

    //then
    expect(creatAppliance).toThrow('Name can not be empty.')
})

test('given: an valid applianceInput but on we already have in the Db, when: we try to save an appliance, then: an error is throw', () => {
    //given
    mockApplianceDbGetAllAppliances.mockReturnValue([appliance])
    mockApplianceModelEquals.mockReturnValue(true)
    //when
    const createAppliance = () => applianceService.creatAppliance(applianceInput)

    //then
    expect(createAppliance).toThrow('You can save this object')
})

test('given: valid applianceInput, when: we try to update an appliance, then: we update the appliance', () => {
    // given
    const applianceId: number = 1;
    mockApplianceServiceGetApplianceById.mockReturnValue(appliance);
    mockApplianceDbGetAllAppliances.mockReturnValue([])
    mockApplianceModelEquals.mockReturnValue(false)
    // Create a new Appliance instance matching how it's done in the function
    const newAppliance: Appliance = new Appliance({
        name: applianceInput.name,
        description: applianceInput.description,
        created_at: applianceInput.created_at,
        updated_at: applianceInput.updated_at
    });
    mockApplianceDbUpdateAppliance.mockReturnValue(newAppliance);

    // when
    const result = applianceService.updateAppliance(
        {applianceId: applianceId},
        applianceInput
    )

    // then
    expect(mockApplianceDbUpdateAppliance).toHaveBeenCalledTimes(1)
    expect(mockApplianceDbUpdateAppliance).toHaveBeenCalledWith(
        {applianceId: applianceId},
        {newAppliance: newAppliance}
    )
    expect(result).toEqual(newAppliance);
})


test('given: an invalid applianceInput, when: we try to update an appliance, then an error is thrown', () => {
    //given
    const invalidApplianceInput: ApplianceInput = {
        name: '  ', // Invalid name
        description: 'A tool that helps you cook',
        created_at: new Date(),
        updated_at: undefined,
    };

    //when
    const updateAppliance = () => applianceService.updateAppliance(
        {applianceId: 1},
        invalidApplianceInput
    )

    //then
    expect(updateAppliance).toThrow('Name can not be empty.')
})

test('given: an invalid applianceId, when: trying to update and appliance, then: an error is thrown', () => {
    //given
    const applianceId: number = -1;
    mockApplianceServiceGetApplianceById.mockReturnValue(null);

    //when
    const updateAppliance = () => applianceService.updateAppliance(
        {applianceId: applianceId},
        applianceInput
    )

    //then
    expect(updateAppliance).toThrow(`Appliance with id: ${applianceId} doesn't exist.`)
})

test('given: we try to have an appliance we already have, when: we try to update an appliance, then an error is throw', () => {
    //given
    mockApplianceServiceGetApplianceById.mockReturnValue(appliance)
    mockApplianceDbGetAllAppliances.mockReturnValue([appliance])
    mockApplianceModelEquals.mockReturnValue(true);

    //when
    const updateAppliance = () => applianceService.updateAppliance(
        {applianceId: 1},
        applianceInput
    )

    //then
    expect(updateAppliance).toThrow("You can save this object")
})

test('given: a problem in the db when: we call updateAppliance, then: an error is throw.', () => {
    //given
    mockApplianceServiceGetApplianceById.mockReturnValue(appliance)
    mockApplianceDbGetAllAppliances.mockReturnValue([appliance])
    mockApplianceModelEquals.mockReturnValue(false);
    mockApplianceDbUpdateAppliance.mockReturnValue(null);

    //when
    const updateAppliance = () => applianceService.updateAppliance(
        {applianceId: 1},
        applianceInput
    )

    //then
    expect(updateAppliance).toThrow('Something when wrong in the database.')

})

test('given a working backend, When we try to call getAllAppliances, Then we return all appliances in the db.', () => {
    //given
    mockApplianceDbGetAllAppliances.mockReturnValue([appliance])

    //when
    const getAllAppliances = applianceService.getAllAppliances()

    //then
    expect(mockApplianceDbGetAllAppliances).toHaveBeenCalledTimes(1)
    expect(getAllAppliances).toEqual([appliance])
})

// test('given a valid applianceId, when: we call getApplianceById, then: we return the appliance.', () => {
//     //given
//     const applianceId: number = 1;
//     const validAppliance: Appliance = new Appliance({
//         applianceId,
//         name: 'test',
//         description: 'test',
//         created_at: new Date()
//     })
//     mockApplianceDbGetApplianceById.mockReturnValue(validAppliance);
//
//
//     //when
//     const getApplianceById = applianceService.getApplianceById({applianceId: applianceId})
//
//
//     //when
//     expect(mockApplianceDbGetApplianceById).toHaveBeenCalledWith({applianceId: applianceId})
//     expect(getApplianceById.getApplianceId()).toBe(applianceId)
// })
//
// test('given an invalid applianceId, when: getApplianceById is called, then: an error is thrown', () => {
//     // given
//     const invalidApplianceId: number = -1;
//     mockApplianceDbGetApplianceById.mockReturnValue(null);
//
//     // when
//     const getApplianceById = () => applianceService.getApplianceById({applianceId: invalidApplianceId});
//
//     // then
//     expect(getApplianceById).toThrow(`Appliance with id: ${invalidApplianceId} doesn't exist.`);
// });

test('given: a valid applianceId, when: deleteAppliance is called, then: the appliance is deleted.', () => {
    //given
    const applianceId: number = 1;
    mockApplianceServiceGetApplianceById.mockReturnValue(appliance)
    mockApplianceDbGetApplianceById.mockReturnValue(appliance);

    //when
    const deleteAppliance = () => applianceService.deleteAppliance({applianceId: applianceId})

    // then
    expect(deleteAppliance).not.toThrow();
})

test('given: a invalidApplianceId, when deleteAppliance is called, then: an error is thrown', () => {
    //given
    const invalidApplianceId: number = -1;
    mockApplianceServiceGetApplianceById.mockReturnValue(null)
    mockApplianceDbGetApplianceById.mockReturnValue(null);

    //when
    const deleteAppliance = () => applianceService.deleteAppliance({applianceId: invalidApplianceId})

    //then
    expect(deleteAppliance).toThrow(`Appliance with id: ${invalidApplianceId} doesn't exist.`)
})
