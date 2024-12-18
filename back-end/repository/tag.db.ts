import { Tag } from "../model/tags"
import { TokenGetter } from 'express-jwt';
import { ta } from 'date-fns/locale';

const tags: Tag[] = [
    new Tag({
        tagId: 1,
        name: 'Dessert',
        description: 'Sweet dishes typically served as the last course of a meal.',
    }),
    new Tag({
        tagId: 2,
        name: 'Vegetarian',
        description: 'Dishes that do not contain meat or fish.',
    })
];

const creatTag = ({tag}: {tag: Tag}): Tag =>{
    const newTag: Tag = new Tag({
        tagId: tags.length + 1,
        name: tag.getName(),
        description: tag.getDescription()
    })
    tags.push(newTag)
    return newTag
}

const updateTag = (
    {tagId}:{tagId: number},
    {tag}: {tag: Tag}
): Tag | null =>{
    const oldTag: Tag | null = getTagById({tagId: tagId})
    if(oldTag == null){return null}
    const newTag: Tag = new Tag({
        tagId: oldTag?.getTagId(),
        name: tag.getName() ?? oldTag.getName(),
        description: tag.getDescription() ?? oldTag.getDescription()
    })
    const index: number = tags.findIndex(t => t.getTagId() === tagId)
    if(index == -1){return  null}
    tags[index] = newTag
    return newTag
}

const getAllTags = (): Tag[] => {
    return  tags
}

const getTagById = ({ tagId }: { tagId: number }): Tag | null => {
    return tags.find((tag) => tag.getTagId() === tagId) || null;
}

const deleteTag = ({tagId}:{tagId: number}): void | null => {
    const index: number = tags.findIndex(t => t.getTagId() === tagId)
    if(index == -1){return  null}
    tags.splice(index, 1)
}

export default {
    creatTag,
    updateTag,
    getAllTags,
    getTagById,
    deleteTag,
}