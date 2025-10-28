export type EntityProperty = {
    [key: string]: unknown;
};
export declare abstract class Entity<Attributes extends EntityProperty> {
    protected attributes: Attributes;
    constructor(attributes?: Partial<Attributes>);
    get fields(): Readonly<Attributes>;
    update(attributes: Partial<Attributes>): void;
    toJSON(): Attributes;
    protected abstract getDefaultAttributes(): Attributes;
}
