export const IsMiminumStringLength = (input:string) => input.trim().length > 2 

const IsValidFilterableString = (input:string) =>  input.length === 0 || IsMiminumStringLength(input)

export const IsFilterableString = (preInput:string,input:string) => preInput !== input && IsValidFilterableString(input) 