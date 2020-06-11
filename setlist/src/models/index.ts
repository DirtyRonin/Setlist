import { ISongCatalog, ISetCatalog } from "./songCatalog"
import { IBandCatalog } from "./bandCatalog"

export * from "./actions/index"
export * from "./catalog"
export * from "./songCatalog"
export * from "./bandCatalog"
export * from "./song"
export * from "./band"
export * from "./modal"
export * from "./api"

export type Catalogs = ISongCatalog | IBandCatalog | ISetCatalog