import { Appliance } from '../../model/appliance';

let applianceId: number | undefined = undefined;
let name: string = "cooking robot"
let description: string = "Automated smart kitchen assistant robot"
let createdAt: Date = new Date()
let updatedAt: Date | undefined = undefined;


test(`given: valid values for appliance, when: appliance is created, then: appliance is created with those values`, () => {
    // when
    const appliance: Appliance = new Appliance({applianceId, name,description, created_at: createdAt, updated_at: updatedAt})

    // then
    expect(appliance.getApplianceId()).toBe(applianceId);
    expect(appliance.getName()).toBe(name);
    expect(appliance.getDescription()).toBe(description);
    expect(appliance.getCreatedAt()).toEqual(createdAt);
    expect(appliance.getUpdatedAt()).toEqual(updatedAt);
});

test(`given: two equal appliances, when: the appliance.equals method is called, then: the method will return true`, () => {
    // given
    const appliance1:Appliance = new Appliance({applianceId, name ,description, created_at: createdAt, updated_at: updatedAt});

    // when
    const isEqual = appliance1.equals(appliance1);

    // then
    expect(isEqual).toBe(true);
});

test(`given: two different appliances, when: the appliance.equals method is called, then: the method will return false`, () => {
    // given
    const appliance1:Appliance = new Appliance({applianceId, name ,description, created_at: createdAt, updated_at: updatedAt});
    const appliance2:Appliance = new Appliance({applianceId, name: "differentAppliance" ,description, created_at: createdAt, updated_at: updatedAt});

    // when
    const isEqual = appliance1.equals(appliance2);

    // then
    expect(isEqual).toBe(false);
});

test('given: invalid values (Bad Id) for appliances, when: appliance  is created, then: an error is thrown.', () =>{
    // given
    const invalidApplianceId: number = -1 ;
    //when
    const appliance = () => new Appliance({applianceId: invalidApplianceId, name, description, created_at: createdAt});

    //then
    expect(appliance).toThrow('The id of an object cannot be negative, this is not a valid object.')
})

test('given: valid invalid values (bad name) for appliances, when: appliance  is created, then: an error is thrown.', () =>{
    // given
    const invalidName: string = "  ";
    //when
    const appliance = () => new Appliance({applianceId, name: invalidName, description, created_at: createdAt});

    //then
    expect(appliance).toThrow('Name can not be empty.')
})

test('given: valid invalid values (bad description) for appliances, when: appliance  is created, then: an error is thrown.', () =>{
    // given
    const invalidDescription: string = "  ";
    //when
    const appliance = () => new Appliance({applianceId, name, description: invalidDescription, created_at: createdAt});

    //then
    expect(appliance).toThrow('Description can be left empty.')
})