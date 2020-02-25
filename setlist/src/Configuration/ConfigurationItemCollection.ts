export type ConfigurationItemCollection<T, N extends string> = {
    [P in N]: T;
};