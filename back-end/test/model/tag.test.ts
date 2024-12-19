import { Tag } from '../../model/tags';

const tagId: number | undefined = 1;
const name: string = 'Italian';
const description: string = 'Food from Italy';

test(`given: valid values for tag, when: tag is created, then: tag is created with those values`, () => {
    // when
    const tag = new Tag({ tagId, name, description });

    // then
    expect(tag.getTagId()).toBe(tagId);
    expect(tag.getName()).toBe(name);
    expect(tag.getDescription()).toBe(description);
});

test(`given: two equal tags, when: the tag.equals method is called, then: the method will return true`, () => {
    // given
    const tag1 = new Tag({ tagId, name, description });

    // when
    const isEqual = tag1.equals(tag1);

    // then
    expect(isEqual).toBe(true);
});

test(`given: two different tags, when: the tag.equals method is called, then: the method will return false`, () => {
    // given
    const tag1 = new Tag({ tagId, name, description });
    const tag2 = new Tag({ tagId, name: 'notEqualName', description });

    // when
    const isEqual = tag1.equals(tag2);

    // then
    expect(isEqual).toBe(false);
});

test('given: invalid values (Bad Id) for tag, when: tag is created, then: an error is thrown.', () => {
    // given
    const invalidTagId: number = -1;

    // when
    const tag = () => new Tag({ tagId: invalidTagId, name, description });

    // then
    expect(tag).toThrow('The id of a tag cannot be negative, this is not a valid tag.');
});

test('given: invalid values (empty name) for tag, when: tag is created, then: an error is thrown.', () => {
    // given
    const invalidName: string = '  ';

    // when
    const tag = () => new Tag({ tagId, name: invalidName, description });

    // then
    expect(tag).toThrow('Name cannot be empty.');
});

test('given: invalid values (empty description) for tag, when: tag is created, then: an error is thrown.', () => {
    // given
    const invalidDescription: string = '  ';

    // when
    const tag = () => new Tag({ tagId, name, description: invalidDescription });

    // then
    expect(tag).toThrow('Description cannot be empty.');
});