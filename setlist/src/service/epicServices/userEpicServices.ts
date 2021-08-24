import { nameof } from "ts-simple-nameof"

import { User } from "../../mapping";
import { IUser } from "../../models";
import { QueryBuilder, IsMiminumStringLength ,FilterBuilder} from "../../utils";
import { ReadUsersAsync } from "../apiServices/userService";

export const fetchCurrentUser = async (userName: string): Promise<IUser> => {

    let query = new QueryBuilder().count()

    const filters: FilterBuilder[] = []

    if (IsMiminumStringLength(userName)) {
        filters.push(new FilterBuilder().containsFilterExpression(nameof<IUser>(x => x.name), userName))
    }

    if (filters.length) {
        query.filter(() => filters.reduce((prev, current) => prev.and(() => current)))
    }

    const filter = query.toQuery()

    const results = await ReadUsersAsync(filter)

    const user = results.Values && results.Values.length === 1 ? results.Values[0] : User.DefaultUser()

    return user;
}