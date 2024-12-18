import { TagInput } from '../types';
import { Tag } from '../model/tags';
import tagDb from '../repository/tag.db';
import assert from 'node:assert';


const createTag = async (
    { name, description }: TagInput
): Promise<Tag | null> => {
    const tag: Tag = new Tag({ name, description });

    const tags: Tag[] = await getAllTags();

    tags.forEach(t => {
        const equals: boolean = t.equals(tag);
        if (equals) {
            throw new Error(`we can't save this tag`);
        }
    });

    return await tagDb.creatTag({ tag: tag });
};

const updateTag = async (
    { tagId }: { tagId: number },
    { name, description }: TagInput
): Promise<Tag | null> => {

    const tag: Tag = new Tag({ name, description });

    await getTagById({ tagId: tagId });

    const tags: Tag[] =  await getAllTags();
    tags.forEach(t => {
        const equals: boolean = t.equals(tag);
        if (equals) {
            throw new Error(`we can't save this tag`);
        }
    });

    const result: Tag | null = await tagDb.updateTag(
        { tagId: tagId },
        { tag: tag }
    );
    assert(result, 'Something when wrong in the database.')
    return result;
};

const getAllTags = async (): Promise<Tag[]> => {
    return await tagDb.getAllTags();
};

const getTagById = async ({ tagId }: { tagId: number }) => {
    const tag = await tagDb.getTagById({ tagId });
    if (!tag) {
        throw new Error(`Tag with id: ${tagId} does not exist.`);
    }
    return tag;
};

const deleteTag = async  ({tagId}:{ tagId: number }): Promise<Boolean> => {
    await getTagById({ tagId: tagId });
    return  await tagDb.deleteTag({ tagId: tagId });
};

export default {
    createTag,
    updateTag,
    getAllTags,
    getTagById,
    deleteTag
};