export interface TimelineEvent {
  year: string;
  event: string;
}

export interface OfficialSource {
  name: string;
  org: string;
  year: string;
  url?: string;
}

export interface CaseStudy {
  id: string;
  caseNumber: string;
  country: string;
  flag: string;
  location: string;
  title: string;
  statusType: 'Historical Crisis' | 'Ongoing Scarcity' | 'Ongoing Humanitarian Crisis' | 'Crisis Averted';
  statusBadgeColor: string;
  timeframe: string;
  description: string;
  verifiedStat: {
    value: string;
    label: string;
    source: string;
    sourceYear: string;
  };
  focusAreas: string[];
  image: string;
  imageAlt: string;
  imageCaption: string;
  imageCredit: string;
  fullStory: {
    overview: string;
    keyDrivers: string[];
    timeline: TimelineEvent[];
    humanImpact: string;
    solutionsAndLessons: string[];
    officialSources: OfficialSource[];
  };
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'india-chennai',
    caseNumber: '01',
    country: 'India',
    flag: '🇮🇳',
    location: 'Chennai, Tamil Nadu',
    title: 'The Day Zero Warning',
    statusType: 'Historical Crisis',
    statusBadgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    timeframe: 'Peak: June–November 2019 (Ongoing Aquifer Monitoring)',
    description:
      'In 2019, Chennai experienced a severe water crisis when its four main reservoirs fell below 1% capacity.',
    verifiedStat: {
      value: '< 0.2%',
      label: 'Combined storage in Chennai’s 4 primary reservoirs dropped below 0.2% of total capacity in June 2019.',
      source: 'Chennai Metropolitan Water Supply and Sewerage Board (CMWSSB) & NITI Aayog',
      sourceYear: '2019',
    },
    focusAreas: [
      'Water tankers',
      'Empty reservoirs',
      'Urban water shortages',
      'Rainwater harvesting & water management',
    ],
    image: '/assets/world-dry/case_india_chennai.jpg',
    imageAlt: 'Private water tanker supplying water in Chennai 2019 crisis',
    imageCaption: 'A private water tanker truck pumping municipal water directly into residential apartment cisterns in Chennai during the peak dry spell.',
    imageCredit: 'CC BY-SA 4.0 / Wikimedia Commons',
    fullStory: {
      overview:
        'In the summer of 2019, Chennai—India’s sixth-largest metropolitan city with over 10 million residents—faced an acute municipal water outage. A failed 2018 northeast monsoon combined with rapid urban encroachment on historic wetland catchments depleted Chembarambakkam, Poondi, Red Hills, and Cholavaram reservoirs to a mere trickle. For months, daily survival hinged on fleets of thousands of water tankers and emergency water trains.',
      keyDrivers: [
        'Consecutive deficient northeast monsoons in 2018 and early 2019.',
        'Loss of over 85% of Chennai’s historical wetlands and peri-urban water bodies to real estate development.',
        'Over-extraction of coastal aquifers resulting in groundwater salinization.',
        'Delayed maintenance and silt accumulation in primary holding lakes.',
      ],
      timeline: [
        { year: 'Late 2018', event: 'Northeast monsoon yields 55% deficit across northern Tamil Nadu.' },
        { year: 'May 2019', event: 'Primary reservoirs fall below 1% capacity; piped municipal water supply suspended in many wards.' },
        { year: 'June 2019', event: 'Emergency "Jaldoot" water express trains transport 2.5 million liters daily from Jolarpettai (217 km away).' },
        { year: 'Late 2019', event: 'Late monsoon showers replenish lakes; state mandates strict rainwater harvesting audits on all residential buildings.' },
      ],
      humanImpact:
        'Hospitals postponed elective surgeries, IT corridors instructed staff to work from home, and families spent hours each morning queuing with color-coded plastic pots (kodams) at tanker delivery points. Commercial tanker prices surged fourfold, placing disproportionate financial strain on low-income households.',
      solutionsAndLessons: [
        'Enforcing mandatory Rooftop Rainwater Harvesting (RWH) on all existing and new structures.',
        'Restoration and desilting of ancient temple tanks and flood-absorbing wetland corridors.',
        'Construction of tertiary treated reverse osmosis (TTRO) plants to recycle municipal wastewater for industrial clusters.',
      ],
      officialSources: [
        { name: 'Composite Water Management Index (CWMI)', org: 'NITI Aayog, Government of India', year: '2019' },
        { name: 'City Water Balance & Reservoir Status Reports', org: 'CMWSSB', year: '2019–2020' },
        { name: 'Tamil Nadu State Action Plan on Climate Change', org: 'Department of Environment, TN', year: '2021' },
      ],
    },
  },
  {
    id: 'jordan-amman',
    caseNumber: '02',
    country: 'Jordan',
    flag: '🇯🇴',
    location: 'Amman & Jordan Highlands',
    title: 'Living With Limited Water',
    statusType: 'Ongoing Scarcity',
    statusBadgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    timeframe: 'Ongoing Structural Scarcity (Documented 2000–Present)',
    description:
      'Jordan is among the world\'s most water-scarce countries, with approximately 61 cubic metres of renewable water available per person annually.',
    verifiedStat: {
      value: '61 m³ / year',
      label: 'Annual renewable freshwater availability per capita — ~88% below the UN absolute water scarcity line (500 m³).',
      source: 'Ministry of Water and Irrigation (MWI), Jordan & UNICEF',
      sourceYear: '2022',
    },
    focusAreas: [
      'Intermittent household water supply',
      'Water collection & rooftop storage',
      'Groundwater pressure',
      'Water conservation & reuse',
    ],
    image: '/assets/world-dry/case_jordan_truck.jpg',
    imageAlt: 'Water delivery tanker truck in Jordan with potable drinking water',
    imageCaption: 'A potable water delivery truck servicing rural and urban homes in Jordan where municipal tap water flows only once weekly.',
    imageCredit: 'CC BY-SA 3.0 / Wikimedia Commons',
    fullStory: {
      overview:
        'Geographically situated in a hyper-arid climate, Jordan faces permanent freshwater deficits. The country receives less than 200mm of average annual rainfall across 90% of its landmass. To manage scarcity, municipal authorities distribute piped water intermittently—often for only 12 to 24 hours once a week. Every residential building is equipped with rooftop water tanks to collect and ration the weekly allocation.',
      keyDrivers: [
        'Naturally hyper-arid geography with minimal surface freshwater sources.',
        'Rapid demographic growth, including hosting over 1.3 million Syrian refugees.',
        'Over-pumping of fossil groundwater aquifers (Disi and Azraq) at double their natural recharge rate.',
        'Agricultural water consumption accounting for over 50% of total national withdrawals.',
      ],
      timeline: [
        { year: '1997', event: 'National Water Strategy establishes weekly intermittent municipal rationing schedules.' },
        { year: '2013', event: 'Disi Water Conveyance Project commissioned, pumping non-renewable aquifer water 325 km to Amman.' },
        { year: '2021', event: 'Per capita renewable water drops to 61 m³/year as regional drought intensifies.' },
        { year: '2023–2026', event: 'Launch of the National Water Carrier Project (Red Sea Desalination) to bridge structural supply gaps.' },
      ],
      humanImpact:
        'Daily life revolves around the "water schedule." Families coordinate laundry, bathing, and cleaning to coincide with the weekly hours when pressure reaches their pipes. When rooftop tanks run dry before the next scheduled pumping cycle, families must purchase costly water from private tanker operators.',
      solutionsAndLessons: [
        'Widespread adoption of pressurized drip irrigation and treated wastewater reuse in the Jordan Valley.',
        'Advanced acoustic leak detection reducing Non-Revenue Water (NRW) in municipal pipe networks.',
        'Regional desalination partnerships and cross-border clean-energy-for-water initiatives.',
      ],
      officialSources: [
        { name: 'National Water Strategy 2023–2040', org: 'Ministry of Water and Irrigation, Jordan', year: '2023' },
        { name: 'Jordan Water Sector Assessment', org: 'UNICEF & World Bank', year: '2022' },
        { name: 'World Development Report: Water Security', org: 'World Bank Group', year: '2020' },
      ],
    },
  },
  {
    id: 'yemen-sanaa',
    caseNumber: '03',
    country: 'Yemen',
    flag: '🇾🇪',
    location: 'Sana\'a & Rural Governorates',
    title: 'When Water Becomes a Daily Struggle',
    statusType: 'Ongoing Humanitarian Crisis',
    statusBadgeColor: 'bg-red-500/20 text-red-300 border-red-500/30',
    timeframe: 'Ongoing Crisis (Amplified since 2015)',
    description:
      'Millions of people face difficulties accessing safe drinking water and sanitation, particularly in rural and conflict-affected communities.',
    verifiedStat: {
      value: '15.3M People',
      label: 'More than half of Yemen’s population currently require emergency assistance to access safe water and sanitation.',
      source: 'UNICEF Humanitarian Situation Report & WHO WASH',
      sourceYear: '2023',
    },
    focusAreas: [
      'Families collecting water',
      'Rural water shortages',
      'Children affected by water insecurity',
      'Access to safe drinking water & sanitation',
    ],
    image: '/assets/world-dry/case_yemen_sanaa.jpg',
    imageAlt: 'Children and families queuing with yellow water containers in Sanaa Yemen',
    imageCaption: 'Yemeni children gathered with rows of yellow jerrycans at a municipal water tanker distribution point in Sana\'a.',
    imageCredit: 'CC BY-SA 4.0 / Wikimedia Commons',
    fullStory: {
      overview:
        'Yemen is contending with one of the most severe protracted water crises in modern history. The Sana\'a Basin groundwater table has been dropping by up to 6 to 8 meters annually. Compounding geological scarcity, damage to electricity grids and fuel shortages have incapacitated municipal water treatment and pumping plants, leaving millions dependent on expensive commercial water trucks or unsafe open wells.',
      keyDrivers: [
        'Decades of unregulated deep artesian well drilling, largely driven by water-intensive qat cultivation.',
        'Widespread damage to municipal water supply networks, pumping stations, and sewage pipelines.',
        'Fuel shortages that drive up diesel prices required to operate groundwater pumps and water delivery trucks.',
        'Recurrent climate-driven flash floods followed by extended drought seasons contaminating shallow wells.',
      ],
      timeline: [
        { year: '2000s', event: 'Hydrologists warn Sana\'a could become the first global capital city to deplete its viable aquifer.' },
        { year: '2015–2017', event: 'Water infrastructure breakdown triggers the largest documented cholera outbreak in modern history.' },
        { year: '2020', event: 'Over 15 million citizens identified as severely water-insecure by UN humanitarian agencies.' },
        { year: '2024–Present', event: 'UNICEF and international NGOs deploy solar-powered water pumping stations to restore reliable supply.' },
      ],
      humanImpact:
        'The burden of fetching water falls heavily on women and children, who often walk multiple hours daily carrying 20-liter jerrycans weighing up to 20 kilograms. This daily chore frequently prevents young girls from attending school and leaves children exposed to waterborne diseases including cholera and acute diarrhea.',
      solutionsAndLessons: [
        'Conversion of diesel-powered community boreholes to autonomous solar-photovoltaic pumping arrays.',
        'Community-level water testing, chlorine tablet distribution, and household water treatment kits.',
        'Rehabilitation of traditional mountain water harvesting terraces and rainwater cisterns.',
      ],
      officialSources: [
        { name: 'Yemen Humanitarian Response Plan & WASH Assessment', org: 'UN-OCHA & UNICEF', year: '2023' },
        { name: 'Water Resources Assessment in the Sana\'a Basin', org: 'Food and Agriculture Organization (FAO)', year: '2021' },
        { name: 'Global Water, Sanitation & Hygiene (WASH) Report', org: 'World Health Organization (WHO)', year: '2022' },
      ],
    },
  },
  {
    id: 'south-africa-capetown',
    caseNumber: '04',
    country: 'South Africa',
    flag: '🇿🇦',
    location: 'Cape Town, Western Cape',
    title: 'The Day Zero Crisis',
    statusType: 'Crisis Averted',
    statusBadgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    timeframe: 'Acute Period: 2017–2018 (Day Zero Averted; Ongoing Climate Adaptation)',
    description:
      'In 2018, Cape Town came dangerously close to running out of municipal water. Restrictions and collective conservation efforts helped avert Day Zero.',
    verifiedStat: {
      value: '> 50% Cut',
      label: 'Citywide municipal water consumption reduced by more than 50% through collective civic discipline.',
      source: 'City of Cape Town Water Services & Nature Sustainability',
      sourceYear: '2019',
    },
    focusAreas: [
      'Empty reservoirs & dam tracking',
      'Strict water restrictions (50L limit)',
      'Community participation & public dashboards',
      'Lessons from collective action',
    ],
    image: '/assets/world-dry/case_capetown_landscape.jpg',
    imageAlt: 'Theewaterskloof Dam dry bed in Cape Town March 2018',
    imageCaption: 'The parched, exposed sandy bed of Theewaterskloof Dam in March 2018, exposing dead tree stumps as reservoir capacity fell below 11%.',
    imageCredit: 'CC BY-SA 4.0 / Wikimedia Commons',
    fullStory: {
      overview:
        'Between 2015 and 2018, the Western Cape region suffered a 1-in-300-year drought. By early 2018, Cape Town\'s six primary "Big Six" supply dams dwindled toward 13.5% capacity. If levels touched 13.5%, municipal taps across the entire city of 4 million would be shut off—a dreaded milestone termed "Day Zero"—forcing residents to collect a rationed 25 liters of water daily from 200 guarded communal distribution points.',
      keyDrivers: [
        'Three consecutive years of historically unprecedented drought (2015, 2016, 2017).',
        'Over-reliance on surface rainfall catchments for 95% of the city’s bulk water supply.',
        'High per-capita domestic consumption prior to 2015 exceeding 200 liters daily.',
        'Invasive thirsty alien pine and eucalyptus trees consuming millions of liters within the mountain watersheds.',
      ],
      timeline: [
        { year: '2015–2017', event: 'Winter rains fail three consecutive years; dam levels decline continuously.' },
        { year: 'Jan 2018', event: 'City announces "Day Zero" projected for April 2018; strict Level 6B restrictions limit usage to 50 liters/person/day.' },
        { year: 'Feb–Mar 2018', event: 'Residents aggressively adopt 2-minute showers, greywater reuse, and water-wise habits; daily demand drops below 500ML.' },
        { year: 'June 2018', event: 'Winter monsoons return; Day Zero is officially cancelled as dam levels rebound past 50%.' },
      ],
      humanImpact:
        'Capetonians radically altered their daily lives. "If it\'s yellow, let it mellow" became universal etiquette; washing machines were paused in favor of greywater buckets; restaurants served food on biodegradable napkins to minimize dishwashing; and public water dashboards created transparent community accountability.',
      solutionsAndLessons: [
        'Proving that transparent data, civic unity, and tiered water tariffs can halve a major metropolis’s water usage within months.',
        'Clearing non-native invasive trees from catchment mountain areas, returning billions of liters to riverbeds.',
        'Investing in a diversified "New Water Plan" integrating groundwater boreholes, wastewater reuse, and seawater desalination.',
      ],
      officialSources: [
        { name: 'Cape Town Water Outlook & Dam Dashboard', org: 'City of Cape Town Water Services', year: '2018–2020' },
        { name: 'Behavioural response to messaging on the Cape Town drought', org: 'Nature Sustainability', year: '2019' },
        { name: 'Water Crisis in Cape Town: Systemic Lessons', org: 'Water Research Commission (WRC)', year: '2020' },
      ],
    },
  },
];
