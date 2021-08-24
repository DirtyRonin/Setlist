//query: "?$type=Read&$id=80968fa2-312c-469f-9115-619d2fef06d5"

export const mapQuery = (query: String) =>
    query.substring(2).split('&$').reduce((map, querySegment) => {
        const props = querySegment.split('=')
        map.set(props[0], props[1])
        return map
    }, new Map<string, string>())

