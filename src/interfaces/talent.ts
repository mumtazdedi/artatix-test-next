export interface TalentRequest {
  id?: number;
  name: string;
  image: any;
  isActive?: boolean;
}

export interface TalentResponse {
  id: number;
  name: string;
  image: string;
  isActive: boolean;
}

export interface TalentList {
  talents: TalentResponse[];
}
