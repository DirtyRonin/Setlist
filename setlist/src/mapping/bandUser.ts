import { IBand, IBandUser } from "../models";
import { IBandUserResource } from "../resource";
import { GUID_EMPTY } from "../utils";
import { Band } from "./band";

export class BandUser implements IBandUser {

    id: number;
    userId: number;
    bandId: number;
    band: IBand;

    private constructor({ id = GUID_EMPTY, userId = GUID_EMPTY, bandId = GUID_EMPTY, band }: { id?: number; userId?: number; bandId?: number; band: IBand; }) {
        this.id = id;
        this.userId = userId;
        this.bandId = bandId;
        this.band = band;
    }

    public static Create = ({ id, userId, bandId, band }: { id?: number; userId?: number; bandId?: number; band: IBand; }): IBandUser =>
        new BandUser({ id, userId, bandId, band })

    // public static ToResource = (bandUser: IBandUser): IBandUserResource => {
    //     const { id: Id, UserId, BandId, Band } = bandUser
    //     return { Id, UserId, BandId, Band } as IBandUserResource
    // }

    // public static FromResource = (resource: IBandUserResource): IBandUser => {
    //     const { Id, UserId, BandId, Band } = resource
    //     return new BandUser(Id, UserId, BandId, Band)
    // }


    public static CreateEmpty = (): IBandUser => BandUser.Create({
        band: Band.CreateEmpty()
    }
    );
}