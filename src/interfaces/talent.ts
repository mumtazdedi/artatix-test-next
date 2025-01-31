export interface TalentRequest {
  id?: number;
  name: string;
  image?: any;
  isActive?: number;
}

export interface TalentResponse {
  id: number;
  name: string;
  image: string;
  isActive: number;
}

export interface TalentList {
  talents: TalentResponse[];
}
