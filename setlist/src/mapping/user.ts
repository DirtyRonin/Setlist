import { IUser } from "../models";
import { IUserResource } from "../resource";
import { GUID_EMPTY } from "../Util";

export class User implements IUser {
    id: string;
    name: string;

    private constructor(name: string, id: string = GUID_EMPTY) {
        this.name = name;
        this.id = id;
    }

    public static Create = (name: string, id?: string): IUser => new User(name, id)

    public static ToResource = (user: IUser): IUserResource => (
        { Name: user.name, Id: user.id } as IUserResource
    )

    public static FromResource = (resource: IUserResource): IUser =>
        new User(resource.Name, resource.Id)

    public static DefaultUser = () :IUser => User.Create("admin");
}