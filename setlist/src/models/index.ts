import { ISongCatalog } from "./songCatalog"
import { IBandCatalog } from "./bandCatalog"
import { IBandSongCatalog } from "./catalogs"

export * from "./actions/index"
export * from "./modals/index"
export * from "./catalogs/index"
export * from "./catalog"
export * from "./songCatalog"
export * from "./bandCatalog"
export * from "./song"
export * from "./band"
export * from "./api"

export type Catalog = ISongCatalog | IBandCatalog | IBandSongCatalog