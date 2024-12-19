import { TagInput } from "../../types";
import { Tag } from "../../model/tags";
import tagDb from "../../repository/tag.db";
import tagServerice from '../../service/tag.serverice';

let tagInput: TagInput;
let tag: Tag;

// db Mocks
let mockTagDbCreateTag: jest.SpyInstance<Promise<Tag | null>, [{ tag: Tag }]>;
let mockTagDbUpdateTag: jest.SpyInstance<Promise<Tag | null>, [{ tagId: number }, { tag: Tag }]>;
let mockTagDbGetAllTags: jest.SpyInstance<Promise<Tag[]>>;
let mockTagDbGetTagById: jest.SpyInstance<Promise<Tag | null>, [{ tagId: number }]>;
let mockTagDbDeleteTag: jest.SpyInstance<Promise<boolean>, [{ tagId: number }]>;

beforeEach(() => {
    tagInput = {
        name: 'Dessert',
        description: 'Sweet dishes'
    };

    tag = new Tag({
        name: 'Dessert',
        description: 'Sweet dishes'
    });

    jest.resetModules(); // Reset module registry
    // db Mocks
    mockTagDbCreateTag = jest.spyOn(tagDb, 'creatTag').mockResolvedValue(tag);
    mockTagDbGetTagById = jest.spyOn(tagDb, 'getTagById').mockResolvedValue(tag);
    mockTagDbGetAllTags = jest.spyOn(tagDb, 'getAllTags').mockResolvedValue([tag]);
    mockTagDbUpdateTag = jest.spyOn(tagDb, 'updateTag').mockResolvedValue(tag);
    mockTagDbDeleteTag = jest.spyOn(tagDb, 'deleteTag').mockResolvedValue(true);
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: a valid tag, when a tag is created, then a tag is created with those values', async () => {
    // given
    mockTagDbGetAllTags.mockResolvedValue([]);
    mockTagDbCreateTag.mockResolvedValue(tag);

    // when
    const result = await tagServerice.createTag(tagInput);

    // then
    expect(mockTagDbCreateTag).toHaveBeenCalledTimes(1);
    expect(mockTagDbCreateTag).toHaveBeenCalledWith({
        tag: expect.objectContaining({
            name: 'Dessert',
            description: 'Sweet dishes'
        })
    });
    expect(result).toEqual(tag);
});

test('given an invalid tagInput, when a tag is created, then an error is thrown.', async () => {
    // given
    const invalidTagInput: TagInput = {
        name: '  ', // Invalid name
        description: 'Sweet dishes'
    };

    // when
    const createTag = async () => await tagServerice.createTag(invalidTagInput);

    // then
    await expect(createTag).rejects.toThrow('Name cannot be empty.');
});

test('given: a valid tagInput but one we already have in the Db, when: we try to save a tag, then: an error is thrown', async () => {
    // given
    mockTagDbGetAllTags.mockResolvedValue([tag]);
    jest.spyOn(tag, 'equals').mockReturnValue(true);

    // when
    const createTag = async () => await tagServerice.createTag(tagInput);

    // then
    await expect(createTag).rejects.toThrow(`we can't save this tag`);
});

test('given: valid tagInput, when: we try to update a tag, then: we update the tag', async () => {
    // given
    const tagId: number = 1;
    mockTagDbGetTagById.mockResolvedValue(tag);
    mockTagDbGetAllTags.mockResolvedValue([]);
    jest.spyOn(tag, 'equals').mockReturnValue(false);
    const newTag: Tag = new Tag({
        name: tagInput.name,
        description: tagInput.description
    });
    mockTagDbUpdateTag.mockResolvedValue(newTag);

    // when
    const result = await tagServerice.updateTag(
        { tagId: tagId },
        tagInput
    );

    // then
    expect(mockTagDbUpdateTag).toHaveBeenCalledTimes(1);
    expect(mockTagDbUpdateTag).toHaveBeenCalledWith(
        { tagId: tagId },
        { tag: newTag }
    );
    expect(result).toEqual(newTag);
});

test('given: an invalid tagInput, when: we try to update a tag, then an error is thrown', async () => {
    // given
    const invalidTagInput: TagInput = {
        name: '  ', // Invalid name
        description: 'Sweet dishes'
    };

    // when
    const updateTag = async () => await tagServerice.updateTag(
        { tagId: 1 },
        invalidTagInput
    );

    // then
    await expect(updateTag).rejects.toThrow('Name cannot be empty.');
});

test('given: an invalid tagId, when: trying to update a tag, then: an error is thrown', async () => {
    // given
    const tagId: number = -1;
    mockTagDbGetTagById.mockResolvedValue(null);

    // when
    const updateTag = async () => await tagServerice.updateTag(
        { tagId: tagId },
        tagInput
    );

    // then
    await expect(updateTag).rejects.toThrow(`Tag with id: ${tagId} does not exist.`);
});

test('given: we try to have a tag we already have, when: we try to update a tag, then an error is thrown', async () => {
    // given
    mockTagDbGetTagById.mockResolvedValue(tag);
    mockTagDbGetAllTags.mockResolvedValue([tag]);
    jest.spyOn(tag, 'equals').mockReturnValue(true);

    // when
    const updateTag = async () => await tagServerice.updateTag(
        { tagId: 1 },
        tagInput
    );

    // then
    await expect(updateTag).rejects.toThrow(`we can't save this tag`);
});

test('given: a problem in the db when: we call updateTag, then: an error is thrown.', async () => {
    // given
    mockTagDbGetTagById.mockResolvedValue(tag);
    mockTagDbGetAllTags.mockResolvedValue([tag]);
    jest.spyOn(tag, 'equals').mockReturnValue(false);
    mockTagDbUpdateTag.mockResolvedValue(null);

    // when
    const updateTag = async () => await tagServerice.updateTag(
        { tagId: 1 },
        tagInput
    );

    // then
    await expect(updateTag).rejects.toThrow('Something when wrong in the database.');
});

test('given a working backend, when we try to call getAllTags, then we return all tags in the db.', async () => {
    // given
    mockTagDbGetAllTags.mockResolvedValue([tag]);

    // when
    const getAllTags = await tagServerice.getAllTags();

    // then
    expect(mockTagDbGetAllTags).toHaveBeenCalledTimes(1);
    expect(getAllTags).toEqual([tag]);
});

test('given: a valid tagId, when: getTagById is called, then: the tag is returned.', async () => {
    // given
    const tagId: number = 1;
    mockTagDbGetTagById.mockResolvedValue(tag);

    // when
    const result = await tagServerice.getTagById({ tagId: tagId });

    // then
    expect(mockTagDbGetTagById).toHaveBeenCalledTimes(1);
    expect(mockTagDbGetTagById).toHaveBeenCalledWith({ tagId: tagId });
    expect(result).toEqual(tag);
});

test('given: an invalid tagId, when: getTagById is called, then: an error is thrown', async () => {
    // given
    const invalidTagId: number = -1;
    mockTagDbGetTagById.mockResolvedValue(null);

    // when
    const getTagById = async () => await tagServerice.getTagById({ tagId: invalidTagId });

    // then
    await expect(getTagById).rejects.toThrow(`Tag with id: ${invalidTagId} does not exist.`);
});

test('given: a valid tagId, when: deleteTag is called, then: the tag is deleted.', async () => {
    // given
    const tagId: number = 1;
    mockTagDbGetTagById.mockResolvedValue(tag);

    // when
    const deleteTag = tagServerice.deleteTag({ tagId: tagId });

    // then
    await expect(deleteTag).resolves.not.toThrow();
});

test('given: an invalidTagId, when deleteTag is called, then: an error is thrown', async () => {
    // given
    const invalidTagId: number = -1;
    mockTagDbGetTagById.mockResolvedValue(null);

    // when
    const deleteTag = async () => await tagServerice.deleteTag({ tagId: invalidTagId });

    // then
    await expect(deleteTag).rejects.toThrow(`Tag with id: ${invalidTagId} does not exist.`);
});