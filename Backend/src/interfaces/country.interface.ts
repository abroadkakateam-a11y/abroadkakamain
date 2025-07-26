
export interface FlagImage {
    public_id: string;
    url: string;
}

export interface ICountry {
    name: string;
    code: string;
    currency: string;
    continent: string;
    flagImage?: FlagImage;
    description?: string;
}
