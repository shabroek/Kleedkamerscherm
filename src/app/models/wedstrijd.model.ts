export interface IWedstrijd {
    wedstrijddatum: Date;
    wedstrijdcode: number;
    wedstrijdnummer: number;
    teamnaam: string;
    thuisteamclubrelatiecode: string;
    uitteamclubrelatiecode: string;
    thuisteamid?: any;
    thuisteam: string;
    uitteamid?: any;
    uitteam: string;
    teamvolgorde: number;
    competitiesoort: string;
    competitie: string;
    klasse: string;
    poule: string;
    klassepoule: string;
    kaledatum: string;
    datum: string;
    vertrektijd: string;
    verzameltijd: string;
    aanvangstijd: string;
    wedstrijd: string;
    status: string;
    scheidsrechters: string;
    scheidsrechter: string;
    accommodatie: string;
    veld: string;
    locatie: string;
    plaats: string;
    rijders?: any;
    kleedkamerthuisteam: string;
    kleedkameruitteam: string;
    kleedkamerscheidsrechter: string;
    meer: string;
}

