import { IBand } from ".";

export interface IBandUser { 
    Id: string;
    UserId :string
    BandId :string
    Band : IBand
}