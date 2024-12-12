export class Appliance {
    private applianceId?: number
    private name: string
    private description: string
    private created_at: Date
    private updated_at: Date | undefined

    constructor(appliance: {
        applianceId?: number,
        name: string,
        description: string,
        created_at: Date,
        updated_at?: Date
    }) {
        this.applianceId = appliance.applianceId
        this.name = appliance.name
        this.description = appliance.description
        this.created_at = appliance.created_at
        this.updated_at = appliance.updated_at
    }

    public getApplianceId(): number | undefined {
        return this.applianceId
    }


    public getName(): string {
        return this.name
    }

    public getDescription(): string {
        return this.description
    }

    public getCreatedAt(): Date {
        return this.created_at;
    }

    public getUpdatedAt(): Date | undefined {
        return this.updated_at
    }


    equals(appliance: Appliance): boolean {
        return (
            this.name === appliance.getName() &&
            this.description === appliance.getDescription() &&
            this.created_at === appliance.getCreatedAt() &&
            this.updated_at === appliance.getUpdatedAt()
        )
    }
}