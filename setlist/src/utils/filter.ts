export const IsMiminumStringLength = (input: string): boolean => input.trim().length > 2

export const IsValidFilterableString = (input: string): boolean => input.length === 0 || IsMiminumStringLength(input)

export const IsFilterableString = (preInput: string, input: string): boolean => preInput !== input && IsValidFilterableString(input) 