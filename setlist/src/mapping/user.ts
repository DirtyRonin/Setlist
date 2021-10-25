import { IUser } from "../models";
import { GUID_EMPTY } from "../utils";

export class User implements IUser {
    id: number;
    name: string;

    private constructor(name: string, id: number = GUID_EMPTY) {
        this.name = name;
        this.id = id;
    }

    public static Create = (name: string, id?: number): IUser => new User(name, id)

    // public static ToResource = (user: IUser): IUserResource => (
    //     { Name: user.name, Id: user.id } as IUserResource
    // )

    // public static FromResource = (resource: IUserResource): IUser =>
    //     new User(resource.Name, resource.Id)

    public static CreateEmpty = () :IUser => User.Create("admin");
}