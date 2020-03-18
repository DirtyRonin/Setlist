import { IBand } from "../models";
import { GetBandsRequestAsync } from "../api";
import { Band } from "../mapping";

export const ReadBandsAsync = async (query :string = ""): Promise<IBand[]> => {
    const bandResources = await GetBandsRequestAsync(query);
    return bandResources.map(resource =>
        Band.FromResource(resource)
    )
};