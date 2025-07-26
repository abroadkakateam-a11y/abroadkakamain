export interface FlagImage {
  public_id: string;
  url: string;
}

export interface CountryCreateInput {
  name: string;
  code: string;
  currency: string;
  continent: string;
  flagImage?: FlagImage;
  description?: string;
}

export interface CountryUpdateInput {
  name?: string;
  code?: string;
  currency?: string;
  continent?: string;
  flagImage?: FlagImage;
  description?: string;
}
