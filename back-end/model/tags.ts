import {Tag as TagPrima} from '@prisma/client';

export class Tag {
    private tagId?: number;
    private name: string;
    private description: string;

    constructor(tag: { tagId?: number, name: string, description: string }) {
        this.tagId = tag.tagId;
        this.name = tag.name;
        this.description = tag.description;
    }

    getTagId(): number | undefined {
        return this.tagId;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    //I haven't included the Id because this will normally never match 
    //I also haven't included the recipes because if the have the same name and description the are still the same
    equals(tag: Tag): boolean {
        return(
            this.name === tag.name &&
            this.description === tag.description
        )
    }


    static from({ tagId, name,  description}: TagPrima): Tag {
        return new Tag({tagId, name, description})}

}
