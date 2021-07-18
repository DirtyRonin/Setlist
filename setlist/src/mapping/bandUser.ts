import { IBand, IBandUser } from "../models";
import { IBandUserResource } from "../resource";
import { GUID_EMPTY } from "../Util";
import { Band } from "./band";

export class BandUser implements IBandUser {

    Id: string;
    UserId: string;
    BandId: string;
    Band: IBand;

    private constructor(id: string = GUID_EMPTY, userId: string, bandId: string, band: IBand) {
        this.Id = id;
        this.UserId = userId;
        this.BandId = bandId;
        this.Band = band;
    }

    public static Create = (userId: string, bandId: string, band: IBand, id?: string): IBandUser => new BandUser(id, userId, bandId, band)

    public static ToResource = (bandUser: IBandUser): IBandUserResource => {
        const { Id, UserId, BandId, Band } = bandUser
        return { Id, UserId, BandId, Band } as IBandUserResource
    }

    public static FromResource = (resource: IBandUserResource): IBandUser => {
        const { Id, UserId, BandId, Band } = resource
        return new BandUser(Id, UserId, BandId, Band)
    }


    public static DefaultBandUser = (): IBandUser => BandUser.Create(GUID_EMPTY,GUID_EMPTY,Band.EmptyBand());
}