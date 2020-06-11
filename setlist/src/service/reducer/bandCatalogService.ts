import { ICatalogState } from "../../store";
import { FilterBandActionProps, BandCatalog } from "../../mapping";
import { HashTable, QueryBuilder, IsMiminumStringLength } from "../../Util";
import { Catalogs, IFilterBandActionProps, IBand, IBandCatalog } from "../../models";
import FilterBuilder from "../../Util/oDataQueryBuilder/queryBuilder";
import { nameof } from "ts-simple-nameof";
import { ReadBandsAsync } from "..";

export const createEmptyBandCatalog = (catalogState : ICatalogState): ICatalogState => {
    const {catalogs, catalogsOrder,modal} = catalogState

    const defaultActionProps = FilterBandActionProps.Default(BandCatalog.CatalogId)

    const bandCatalog = BandCatalog.CreateAndUpdate(defaultActionProps.Filter, { NextLink: "", Count: 0, Context: "" }, {});

    const newCatalogs: HashTable<Catalogs> = {...catalogs,[bandCatalog.Id] : bandCatalog} ;

    const newCatalogsOrder: Array<string> = [...catalogsOrder,bandCatalog.Id]

    return { catalogs: newCatalogs,catalogsOrder: newCatalogsOrder,modal } as ICatalogState
}

export const fetchBandCatalogAsync = async (props: IFilterBandActionProps, catalogs: HashTable<Catalogs>): Promise<Catalogs> => {
    if (catalogs == null) { throw ("catalogs are null") }

    const { Filter, BandCatalogId } = props
    let query = new QueryBuilder().count()

    const filters: FilterBuilder[] = []

    if (IsMiminumStringLength(Filter.Title)) {
        filters.push(new FilterBuilder().containsFilterExpression(nameof<IBand>(x => x.Title), Filter.Title))
    }

    if (filters.length) {
        query.filter(() => filters.reduce((prev, current) => prev.and(() => current)))
    }

    query = query.orderBy(`${nameof<IBand>(x => x.Title)}`)

    const filter = query.toQuery()

    const { NextLink, Values, Context, Count } = await ReadBandsAsync(filter);

    const prevBandCatalog = { ...catalogs[BandCatalogId] } as IBandCatalog

    const mappedValues = Values?.reduce((map, band) => {
        map.set(band.Id, band)
        return map
    }, new Map<string, IBand>())

    const bandCatalog = BandCatalog.Create(Filter, { NextLink, Context, Count }, prevBandCatalog.CatalogOptions, mappedValues);

    // const newCatalogs = { ...catalogs, [bandCatalog.Id]: bandCatalog } as HashTable<Catalogs>;

    return bandCatalog;
}