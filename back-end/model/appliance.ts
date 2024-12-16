export class Appliance {
    private applianceId?: number;
    private name: string;
    private description: string;
    private created_at: Date;
    private updated_at?: Date | undefined;

    constructor(appliance: {
        applianceId?: number,
        name: string,
        description: string,
        created_at: Date,
        updated_at?: Date
    }) {
        this.validate(appliance);

        this.applianceId = appliance.applianceId;
        this.name = appliance.name;
        this.description = appliance.description;
        this.created_at = appliance.created_at;
        this.updated_at = appliance.updated_at;
    }

    public getApplianceId(): number | undefined {
        return this.applianceId;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getCreatedAt(): Date {
        return this.created_at;
    }

    public getUpdatedAt(): Date | undefined {
        return this.updated_at;
    }

    equals(appliance: Appliance): boolean {
        return (
            this.name === appliance.getName() &&
            this.description === appliance.getDescription() &&
            this.created_at === appliance.getCreatedAt() &&
            this.updated_at === appliance.getUpdatedAt()
        );
    }

    validate(a: {
        applianceId?: number,
        name: string,
        description: string,
        created_at: Date,
        updated_at?: Date
    }): void {
        if (a.applianceId !== undefined && a.applianceId < 0) {
            throw new Error('The id of an object cannot be negative, this is not a valid object.');
        }
        if (!a.name?.trim()) {
            throw new Error('Name can not be empty.');
        }
        if (!a.description?.trim()) {
            throw new Error('Description can be left empty.');
        }
        // if (a.created_at < new Date()) {
        //     throw new Error('The creation date cannot be in the past.');
        // }
        // if (a.updated_at !== undefined && a.updated_at < a.created_at) {
        //     throw new Error('The updated date cannot be before the creation date.');
        // }
    }
}