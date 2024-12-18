import { TagInput } from '../types';
import { Tag } from '../model/tags';
import tagDb from '../repository/tag.db';
import assert from 'node:assert';


const createTag = (
    { name, description }: TagInput
): Tag => {
    const tag: Tag = new Tag({ name, description });

    const tags: Tag[] = getAllTags();
    tags.forEach(t => {
        const equals: boolean = t.equals(tag);
        if (equals) {
            throw new Error(`we can't save this tag`);
        }
    });
    return tagDb.creatTag({ tag: tag });
};

const updateTag = (
    { tagId }: { tagId: number },
    { name, description }: TagInput
): Tag | null => {
    const tag: Tag = new Tag({ name, description });

    getTagById({ tagId: tagId });

    const tags: Tag[] = getAllTags();
    tags.forEach(t => {
        const equals: boolean = t.equals(tag);
        if (equals) {
            throw new Error(`we can't save this tag`);
        }
    });

    const result: Tag | null = tagDb.updateTag(
        { tagId: tagId },
        { tag: tag }
    );
    assert(result, 'Something when wrong in the database.')
    return result;
};

const getAllTags = (): Tag[] => {
    return tagDb.getAllTags();
};

const getTagById = ({ tagId }: { tagId: number }) => {
    const tag = tagDb.getTagById({ tagId });
    if (!tag) {
        throw new Error(`Tag with id: ${tagId} does not exist.`);
    }
    return tag;
};

const deleteTag = ({tagId}:{ tagId: number }): void | null => {
    getTagById({ tagId: tagId });
    tagDb.deleteTag({ tagId: tagId });
};

export default {
    createTag,
    updateTag,
    getAllTags,
    getTagById,
    deleteTag
};