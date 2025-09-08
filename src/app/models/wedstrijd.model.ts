export interface IWedstrijd {
  isGestart?: boolean;
  wedstrijdcode: string;
  wedstrijddatum: Date;
  thuisteam: string;
  thuisteamlogo: string;
  uitteam: string;
  uitteamlogo: string;
  competitiesoort: string;
  datum: string;
  aanvangstijd: string;
  status: string;
  scheidsrechter: string;
  veld: string;
  kleedkamerthuisteam: string;
  kleedkameruitteam: string;
  kleedkamerscheidsrechter: string;
  kast: boolean;
  afgelast: boolean;
}
