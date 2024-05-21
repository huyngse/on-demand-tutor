export type WardType = {
    Id: string,
    Name: string,
    Level: string
}
export type DistrictType = {
    Id: string,
    Name: string,
    Wards: WardType[]
}
export type CityType = {
    Id: string,
    Name: string,
    Districts: DistrictType[]
}