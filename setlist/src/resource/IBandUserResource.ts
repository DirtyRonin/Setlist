import { IBandResource } from ".";

export interface IBandUserResource{
    Id : string
    BandId :string
    UserId :string
    Band : IBandResource
}