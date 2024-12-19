import {Tag as TagPrima} from '@prisma/client';

export class Tag {
    private tagId?: number;
    private name: string;
    private description: string;

    constructor(tag: { tagId?: number, name: string, description: string }) {
        this.validate(tag);

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

    validate(tag: { tagId?: number, name: string, description: string }): void {
        if (tag.tagId !== undefined && tag.tagId < 0) {
            throw new Error('The id of a tag cannot be negative, this is not a valid tag.');
        }
        if (!tag.name?.trim()) {
            throw new Error('Name cannot be empty.');
        }
        if (!tag.description?.trim()) {
            throw new Error('Description cannot be empty.');
        }
    }

    static from({ tagId, name,  description}: TagPrima): Tag {
        return new Tag({tagId, name, description})}

}
