import { Tag } from '../model/tags';
import database from './database';


const creatTag = async ({ tag }: { tag: Tag }): Promise<Tag | null> => {
    try {
        const tagPrisma = await database.tag.create({
            data: {
                name: tag.getName(),
                description: tag.getDescription()
            }
        });
        return tagPrisma ? Tag.from(tagPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateTag = async (
    { tagId }: { tagId: number },
    { tag }: { tag: Tag }
): Promise<Tag | null> => {
    try {
        const tagPrisma = await database.tag.update({
            where: { tagId: tagId },
            data: {
                name: tag.getName(),
                description: tag.getDescription()
            }
        });
        return tagPrisma ? Tag.from(tagPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


const getAllTags = async (): Promise<Tag[]> => {
    try {
        const tagsPrisma = await database.tag.findMany();
        return tagsPrisma.map((tag) => Tag.from(tag));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


const getTagById = async ({ tagId }: { tagId: number }): Promise<Tag | null> => {
    try {
        const tagPrisma = await database.tag.findUnique({
            where: { tagId: tagId }
        });
        return tagPrisma ? Tag.from(tagPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const deleteTag = async ({ tagId }: { tagId: number }): Promise<boolean> => {
    try {
        const result = await database.tag.delete({
            where: { tagId: tagId }
        });
        return !!result;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    creatTag,
    updateTag,
    getAllTags,
    getTagById,
    deleteTag
};