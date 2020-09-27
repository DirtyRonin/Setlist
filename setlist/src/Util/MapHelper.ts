export class MapHelper<K, V>{

    private map: Map<K, V>

    private constructor(map: Map<K, V>){
        this.map = map
    }

    public static Create = <K, V>(map: Map<K, V>) => {
        const uitl = new MapHelper<K, V>(map)
        return uitl
    }

    public AddMap = (nextMap: Map<K, V>): this => {
        this.map = new Map([...this.map, ...nextMap,])
        return this
    }

    public AddAsFirst = (key: K, value: V):this => {
        this.map = new Map([...new Map<K, V>([[key, value]]),...this.map]) 

        return this
    }

    public GetMap = (): Map<K, V> => this.map

} 