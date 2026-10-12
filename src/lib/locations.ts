// Location data for Spouzy location pages (prompt pack L1).
// Facts are limited to the approved local-context facts. Never invent
// addresses, phone numbers, statistics or client numbers here.

export type RegionSlug = 'maharashtra' | 'gujarat';

export type LocationRegion = {
  slug: RegionSlug;
  name: string;
  heading: string;
  h1: string;
  title: string;
  description: string;
  paragraphs: string[];
  faqs: [string, string][];
};

export type City = {
  region: RegionSlug;
  slug: string;
  name: string;
  district: string;
  languages: string[];
  lat: number;
  lng: number;
  nearby: string[];
  areasServed: string[];
  /** 50-60 word direct answer at the top of the city page. */
  intro: string;
  /** Unique paragraphs written for this city only. */
  paragraphs: string[];
  whyPoints: string[];
  resources: { title: string; detail: string }[];
  faqs: [string, string][];
};

export type LocationService = {
  slug: string;
  label: string;
  /** Main keyword, e.g. "marriage counselling in Thane". */
  keyword: (city: string) => string;
  shortLabel: string;
  /** Path of the site-wide service page that covers this service. */
  sitePath: string;
  directAnswer: (city: City) => string;
  helpsWith: string[];
  steps: string[];
  posh?: boolean;
  sensitive18?: boolean;
};

// Verified contact details are not published yet. Until real values are
// confirmed, Call and WhatsApp buttons fall back to the contact page.
export const contactDetails: { phone: string | null; whatsapp: string | null } = {
  phone: null,
  whatsapp: null,
};

export const regions: LocationRegion[] = [
  {
    slug: 'maharashtra',
    name: 'Mumbai region',
    heading: 'Mumbai region',
    h1: 'Counselling in Mumbai, Thane and Navi Mumbai',
    title: 'Counselling in Mumbai, Thane & Navi Mumbai | Spouzy',
    description:
      'Confidential marriage, relationship and intimacy counselling for Mumbai, Thane and Navi Mumbai. Online sessions in Marathi, Hindi and English. Book or WhatsApp Spouzy today.',
    paragraphs: [
      'The Mumbai metropolitan region moves quickly, and relationships move with it. Long suburban commutes, demanding workplaces and small flats can leave couples and families with very little unhurried time together. Spouzy exists to give people in Mumbai, Thane and Navi Mumbai a calm, private place to think about their relationships, with counsellors who understand Marathi, Hindi and English and the everyday realities of life here.',
      'Our planned support covers the whole arc of a relationship: conversations before a wedding, finding a rhythm after marriage, navigating in-laws and finances, rebuilding trust, and facing separation with clarity instead of panic. Sessions are planned as online video or phone sessions across the region, so whether you are in South Mumbai, a Thane railway town or a Navi Mumbai node, help is reachable from home, a parked car or a private office.',
      'Everything you read on these pages is general information, not a diagnosis or legal advice. Booking, expert profiles and fees will be published before any session is offered, and nothing on this website is an emergency service. If you are in immediate danger, call 112; for free mental health support at any hour, Tele MANAS is on 14416.',
    ],
    faqs: [
      ['Do you have counsellors in Mumbai, Thane and Navi Mumbai?', 'Spouzy is preparing a verified expert panel for the Mumbai region. Online sessions across these cities are planned first, and expert profiles with credentials will appear on this site before booking opens.'],
      ['Which languages can I choose for my session?', 'Sessions in the Mumbai region are planned in Marathi, Hindi and English. You will be able to pick the language you are most comfortable in when booking opens.'],
      ['Can I attend a session from office or home?', 'Yes. Online sessions are designed so you can join privately from wherever you have a quiet space, whether that is home in Thane or a cabin in a Mumbai business district.'],
      ['How do I start?', 'Explore the topic that matches your situation, then register your interest through the contact page. You will be told when booking opens for your city.'],
      ['Is this an emergency service?', 'No. Spouzy is not an emergency service. If anyone is in immediate danger, call 112. For free 24/7 mental health support anywhere in India, call Tele MANAS at 14416.'],
    ],
  },
  {
    slug: 'gujarat',
    name: 'Gujarat',
    heading: 'Gujarat',
    h1: 'Counselling in Gujarat',
    title: 'Counselling in Gujarat | Marriage & Relationship Help | Spouzy',
    description:
      'Confidential marriage, relationship and intimacy counselling across Gujarat, including Ahmedabad, Surat, Vadodara, Rajkot and Gandhinagar. Online sessions in Gujarati, Hindi and English.',
    paragraphs: [
      'Family sits at the centre of life in Gujarat, and so do its pressures. Joint and business families in Ahmedabad and Surat, industry and education in Vadodara and Rajkot, and government and finance in Gandhinagar each bring their own expectations about marriage, money, in-laws and duty. Spouzy is building a place where people across the state can talk about these pressures honestly, in Gujarati, Hindi or English, without judgement.',
      'Our planned support reaches couples before marriage, partners adjusting to life together, families working through conflict, and people considering separation who need space to think clearly. Because sessions are planned as online video or phone sessions, you do not need a clinic in your town to begin; a private room and an hour are enough to start a conversation that has waited too long.',
      'These pages share general information only, not a diagnosis, treatment or legal advice. Spouzy is not an emergency service. In an emergency call 112, and for free mental health support at any time, Tele MANAS answers on 14416.',
    ],
    faqs: [
      ['Which cities in Gujarat do you cover?', 'Pages are ready for Ahmedabad, Surat, Vadodara, Rajkot and Gandhinagar, with online sessions planned across the state. More cities and district information are being added.'],
      ['Can I have my session in Gujarati?', 'Yes. Sessions for Gujarat are planned in Gujarati, Hindi and English, and you will choose your preferred language when booking opens.'],
      ['Do you understand joint family situations?', 'Our resources are written with Indian family realities in mind, including joint and business families, shared finances and the role of elders. Counsellors on the panel will be chosen for experience with these situations.'],
      ['Is anything available right now?', 'Free reading, tips and FAQs are available today. Booking, expert profiles and fees will be published once the expert network is verified. You can register interest on the contact page.'],
      ['What if I need help urgently?', 'Spouzy is not an emergency service. Call 112 if anyone is in immediate danger, or Tele MANAS at 14416 for free, round-the-clock mental health support.'],
    ],
  },
];

export const cities: City[] = [
  {
    region: 'maharashtra',
    slug: 'mumbai',
    name: 'Mumbai',
    district: 'Mumbai',
    languages: ['Marathi', 'Hindi', 'English'],
    lat: 19.076,
    lng: 72.8777,
    nearby: ['thane', 'navi-mumbai'],
    areasServed: ['South Mumbai', 'Andheri', 'Bandra', 'Dadar', 'Borivali', 'Chembur', 'Ghatkopar', 'Malad'],
    intro:
      'Confidential marriage, relationship and intimacy counselling for people in Mumbai, online and in person where experts are available. Sessions are planned in Marathi, Hindi and English, with evening and weekend slots so counselling can fit around commutes and work. Register your interest today and be first to book.',
    paragraphs: [
      'Mumbai runs on timelines: the 8:40 local, the quarterly review, the school pickup that depends on one late train. Couples here often describe the same problem from two sides, one feeling carrying the household and the office at once, the other feeling pushed out of the family conversation by sheer exhaustion. Long commutes compress conversations into tired minutes at the end of the day, and in nuclear flats there is often no one else to hand a crying baby or a difficult in-law question to. Counselling in this city has to respect that reality, which is why Spouzy plans evening and weekend online slots in Marathi, Hindi and English, so a session can happen after dinner rather than across town.',
      'Mumbai families also span every shape the city offers, from the close-knit joint households of older neighbourhoods to young couples who moved for work and are raising children far from both sets of parents. That mix creates specific questions: how much to send home, how to share festival duties between two families, how to raise children in a language each partner’s parents understand. Spouzy’s marriage and relationship resources are written for these everyday negotiations, not textbook arguments, and the expert panel being assembled for Mumbai is chosen for experience with exactly these situations.',
      'Getting started is meant to be simple. Read the topic that matches what you are carrying, alone or together, then register your interest; you will be told as soon as booking opens for Mumbai, with clear fees and verified expert profiles before any payment is asked for. If a conversation ever turns to safety, remember this website is not an emergency service: call 112 in immediate danger, and Tele MANAS on 14416 for free support at any hour.',
    ],
    whyPoints: [
      'Evening and weekend online slots built around Mumbai commutes and working hours.',
      'Counsellors who can work in Marathi, Hindi or English, whichever feels most natural.',
      'A private, judgement-free space, whether your family is joint, nuclear or somewhere in between.',
    ],
    resources: [
      { title: 'POSH Local Committee', detail: 'Workplace sexual harassment complaints outside your office go to the Local Committee through the District Officer. [Add verified Mumbai address before publishing]' },
      { title: 'Family court', detail: 'Mumbai has family courts for matrimonial matters. [Add verified address before publishing]' },
      { title: 'Emergency and crisis lines', detail: 'In immediate danger call 112. Free mental health support, day or night: Tele MANAS 14416.' },
    ],
    faqs: [
      ['How much does marriage counselling in Mumbai cost?', 'Fees are not published yet. Spouzy will show clear prices before booking or payment opens, so you can decide without pressure.'],
      ['Is online counselling as useful as meeting in person?', 'For most relationship conversations, a video or phone session with a qualified counsellor works much like a face-to-face meeting, and it removes the commute. You can switch formats once options are confirmed.'],
      ['Do you have Marathi-speaking counsellors in Mumbai?', 'The Mumbai panel is being built to include counsellors comfortable in Marathi, Hindi and English, and language choices will be shown on expert profiles.'],
      ['Can I start alone if my partner won’t join?', 'Yes. Many people begin by speaking with a counsellor on their own, and that often changes the conversation at home too.'],
      ['Is it confidential?', 'Confidentiality is central to how Spouzy is being built, and the full privacy policy will be published before sessions start. Please never share sensitive health details through website forms.'],
    ],
  },
  {
    region: 'maharashtra',
    slug: 'thane',
    name: 'Thane',
    district: 'Thane',
    languages: ['Marathi', 'Hindi', 'English'],
    lat: 19.2183,
    lng: 72.9781,
    nearby: ['mumbai', 'navi-mumbai'],
    areasServed: ['Thane West', 'Thane East', 'Ghodbunder Road', 'Majiwada', 'Ghansoli side of Kalwa', 'Kolshet', 'Manpada'],
    intro:
      'Confidential marriage and relationship counselling for people in Thane, planned as online sessions in Marathi, Hindi and English. Evening and weekend slots are designed for working couples and joint households. Register your interest and be told the moment booking opens in Thane.',
    paragraphs: [
      'Thane has grown from a quiet lake town into one of the largest residential cities next to Mumbai, and its relationships carry the strain of that growth. Long Ghodbunder Road and rail commutes, towers where neighbours barely meet, and households where both partners work full-time leave little slack when conflict appears. Many Thane families are also joint in some form, with parents sharing a flat and sharing opinions on everything from finances to child-rearing. Counselling here has to hold both truths at once: couples need private space to speak, and families need ways to stay connected without one voice disappearing.',
      'Spouzy’s resources for Thane are written around these patterns. Before marriage, the practical questions matter most, from money and living arrangements to how involved each family will be. After marriage, the common flashpoints are workload at home, distance from one side of the family, and the slow drift that happens when partners become logistics partners instead of friends. When things reach breaking point, separation counselling offers a calm space to think rather than a push towards a decision. All of this is planned as online counselling in Marathi, Hindi and English, reachable from a bedroom or balcony in any Thane locality.',
      'You can begin today by reading, not booking: the relationship tips and topic pages are free, and they often make the next conversation at home a little easier. When you want a person to talk to, register your interest and Spouzy will confirm expert profiles, fees and booking for Thane before any session is offered. In an emergency, call 112; for mental health support at any hour, Tele MANAS answers on 14416.',
    ],
    whyPoints: [
      'Online sessions that fit around rail and road commutes into Mumbai.',
      'Guidance written for working couples and joint family households.',
      'Marathi, Hindi and English sessions, planned with evening and weekend times.',
    ],
    resources: [
      { title: 'POSH Local Committee', detail: 'Complaints outside your workplace go to the Local Committee through the District Officer. [Add verified Thane address before publishing]' },
      { title: 'Family court', detail: 'Matrimonial matters for Thane are handled by the Thane family court. [Add verified address before publishing]' },
      { title: 'Emergency and crisis lines', detail: 'Call 112 in immediate danger. Tele MANAS 14416 offers free support, 24/7.' },
    ],
    faqs: [
      ['Is there a counsellor available in Thane?', 'Spouzy is preparing a verified expert panel serving Thane online first. Profiles and credentials will be published here before booking opens.'],
      ['How much does a session cost in Thane?', 'Prices are not confirmed. Spouzy will publish fees clearly before any booking or payment is possible.'],
      ['Can sessions be in Marathi?', 'Yes, sessions in Marathi are planned alongside Hindi and English, and you will choose your language when booking opens.'],
      ['We live with my parents, can counselling still help?', 'Yes. Many Thane couples navigate joint family life, and counselling can help you agree on boundaries and shared decisions without cutting anyone off.'],
      ['Is online counselling private?', 'Sessions are planned on private connections with confidentiality rules explained before you begin, and the full privacy policy will be published first. Never share sensitive health details through website forms.'],
    ],
  },
  {
    region: 'maharashtra',
    slug: 'navi-mumbai',
    name: 'Navi Mumbai',
    district: 'Thane',
    languages: ['Marathi', 'Hindi', 'English'],
    lat: 19.033,
    lng: 73.0297,
    nearby: ['mumbai', 'thane'],
    areasServed: ['Vashi', 'Nerul', 'Kharghar', 'Seawoods', 'Belapur', 'Airoli', 'Panvel side localities'],
    intro:
      'Confidential relationship, marriage and intimacy counselling for Navi Mumbai, planned as online sessions in Marathi, Hindi and English. Built for working couples in IT and business parks who need evening and weekend times. Register your interest to hear when booking opens near you.',
    paragraphs: [
      'Navi Mumbai was planned on a grid, but its relationships are anything but predictable. The city’s IT and business parks draw thousands of working couples who arrived for opportunity and stayed for space, often raising children with one set of grandparents a train ride away and the other in another state entirely. The rhythm here is specific: long hours, short weekends, and a commute to Mumbai that eats the evening. Couples often say the relationship is fine but the schedule is not, and the schedule always wins. Spouzy’s planned counselling for Navi Mumbai starts from that reality, with online sessions in Marathi, Hindi and English at times that a dual-career household can actually keep.',
      'Because so many Navi Mumbai couples are first-generation city families, the questions that come up are practical as much as emotional: whose career moves when one gets a transfer, how to split festival time between two hometowns, how to decide on schools when both partners grew up with different answers. Pre-marital conversations help settle these before the wedding; relationship counselling helps when resentment has already settled in; and when a couple is considering separating, counselling gives both people room to think without pressure from relatives or timelines. Spouzy’s topic pages cover each of these stages in plain language.',
      'Nothing here requires you to be in crisis. Reading a page, trying one small change from the relationship tips, or simply registering interest on the contact page are all legitimate first steps. When expert profiles, fees and booking for Navi Mumbai are confirmed, they will appear on this site first. If you ever need urgent help, call 112; Tele MANAS on 14416 offers free mental health support around the clock.',
    ],
    whyPoints: [
      'Session times planned for IT and business park working hours, including weekends.',
      'Support for dual-career couples and families spread across cities.',
      'Private online counselling in Marathi, Hindi or English.',
    ],
    resources: [
      { title: 'POSH Local Committee', detail: 'Workplace complaints outside your employer go to the Local Committee through the District Officer. [Add verified Navi Mumbai address before publishing]' },
      { title: 'Family court', detail: 'Matrimonial matters for Navi Mumbai are handled within the Thane family court jurisdiction. [Add verified address before publishing]' },
      { title: 'Emergency and crisis lines', detail: 'In immediate danger call 112. For free 24/7 mental health support call Tele MANAS 14416.' },
    ],
    faqs: [
      ['Is online marriage counselling available in Navi Mumbai?', 'Online counselling for Navi Mumbai is planned, and booking will open once the expert panel is verified. You can register interest now through the contact page.'],
      ['Will I find evening or weekend slots?', 'Evening and weekend availability is a design goal for Spouzy sessions, aimed at working couples who cannot take time off.'],
      ['Which languages can we choose?', 'Marathi, Hindi and English sessions are planned for Navi Mumbai, and expert profiles will show the languages each counsellor offers.'],
      ['My partner travels often, can we still do this?', 'Yes. Online sessions work from different cities when needed, and you can also attend alone while your partner is away.'],
      ['Is it confidential?', 'Yes, confidentiality is central to Spouzy. The full privacy policy will be published before sessions begin, and no sensitive health details should be sent through website forms.'],
    ],
  },
  {
    region: 'gujarat',
    slug: 'ahmedabad',
    name: 'Ahmedabad',
    district: 'Ahmedabad',
    languages: ['Gujarati', 'Hindi', 'English'],
    lat: 23.0225,
    lng: 72.5714,
    nearby: ['gandhinagar', 'vadodara'],
    areasServed: ['Navrangpura', ' Satellite', 'Bopal', 'Maninagar', 'Prahladnagar', 'Vastrapur', 'Chandkheda'],
    intro:
      'Confidential marriage, relationship and intimacy counselling in Ahmedabad, planned as online sessions in Gujarati, Hindi and English. Written for joint and business families where marriage, money and family are deeply connected. Register your interest to hear when booking opens.',
    paragraphs: [
      'In Ahmedabad, a marriage is often a joining of households as much as of two people. Joint families remain common, family businesses blur the line between Sunday and Monday, and decisions about money, property and children usually involve more than the couple. This closeness is a real strength, and it also creates real pressure: a daughter-in-law negotiating her place among elders, a son pulled between his parents’ expectations and his wife’s, a couple whose argument about a shop rota is really an argument about respect. Spouzy’s planned counselling for Ahmedabad takes these family realities seriously, with sessions in Gujarati, Hindi and English.',
      'The conversations that help most here are often the ones families avoid. Before a wedding, pre-marital counselling gives the couple a private space to agree on money, living arrangements and family involvement before elders’ opinions harden into positions. After marriage, counselling can help partners find their voice inside a joint household without treating the family as an enemy. And when a business dispute or an inheritance question has frozen a marriage, a counsellor offers something relatives cannot: neutrality. Every stage has a place on this site, in plain language, without judgement.',
      'You do not need a referral or a crisis to begin. Read the topic closest to your situation, try one suggestion from the relationship tips, or register your interest so you are told when Ahmedabad booking opens with verified expert profiles and clear fees. Spouzy is not an emergency service: call 112 if anyone is in immediate danger, and Tele MANAS on 14416 for free support at any time of day.',
    ],
    whyPoints: [
      'Counsellors who understand joint and business family dynamics in Gujarati households.',
      'Online sessions in Gujarati, Hindi or English, at home and in private.',
      'Clear guidance for every stage, from pre-marriage questions to separation decisions.',
    ],
    resources: [
      { title: 'POSH Local Committee', detail: 'Workplace harassment complaints outside your employer go to the Local Committee through the District Officer. [Add verified Ahmedabad address before publishing]' },
      { title: 'Family court', detail: 'The Ahmedabad family court handles matrimonial matters. [Add verified address before publishing]' },
      { title: 'Emergency and crisis lines', detail: 'Call 112 in immediate danger. Tele MANAS 14416 for free, 24/7 mental health support.' },
    ],
    faqs: [
      ['Can counselling be in Gujarati?', 'Yes. Gujarati sessions are planned for Ahmedabad alongside Hindi and English, and each expert profile will list the languages they offer.'],
      ['How much does counselling cost in Ahmedabad?', 'Fees are not confirmed yet. Spouzy will publish clear prices before booking or payment opens.'],
      ['We run a family business together, is that a problem for counselling?', 'It is a common situation. Counselling can help separate the roles of partner, sibling and business colleague so one disagreement does not poison all three.'],
      ['Can we attend as a couple if our families arranged the marriage?', 'Yes. Pre-marital and relationship counselling work well for arranged marriages, giving both people space to speak before family expectations take over.'],
      ['Is it confidential?', 'Confidentiality is central to Spouzy, and the full privacy policy will be published before sessions start. Please do not share sensitive health details through this website.'],
    ],
  },
  {
    region: 'gujarat',
    slug: 'surat',
    name: 'Surat',
    district: 'Surat',
    languages: ['Gujarati', 'Hindi', 'English'],
    lat: 21.1702,
    lng: 72.8311,
    nearby: ['vadodara', 'ahmedabad'],
    areasServed: ['Adajan', 'Vesu', 'Piplod', 'City Light', 'Katargam', 'Rander', 'Dumas Road'],
    intro:
      'Confidential marriage, relationship and intimacy counselling in Surat, planned as online sessions in Gujarati, Hindi and English. Support shaped for the textile and diamond trade’s long hours and close family businesses. Register your interest to hear when booking opens.',
    paragraphs: [
      'Surat’s economy is famous, and so is the pressure that comes with it. Textile markets run on credit and deadlines, diamond units on thin margins and trust, and the families behind those businesses often live, eat and trade within the same few streets. When work is a family matter, a bad season becomes a home problem and a home argument becomes a business risk. Spouzy’s planned counselling for Surat is shaped around this overlap, offering a private space where partners can talk about the marriage without the ledger open, in Gujarati, Hindi or English.',
      'The city also runs on shift patterns that strain couples quietly: partners who barely see each other during peak production months, young couples who moved from smaller towns of South Gujarat and Saurashtra for the mills and units, and families whose evenings start when the market closes at night. Pre-marital counselling helps couples agree on money, hours and family duties before the wedding; relationship counselling helps when distance has grown; and separation counselling exists for the hardest seasons, giving both people room to think clearly without pressure. All of this is planned as online counselling, reachable from home after the shop shuts.',
      'Beginning is deliberately low-pressure. The reading on this site is free and practical, and registering your interest commits you to nothing; you will simply be told when Surat booking opens, with verified experts and published fees. In any emergency, call 112. For mental health support at any hour, Tele MANAS answers on 14416.',
    ],
    whyPoints: [
      'Online sessions that fit around market and unit hours, including late evenings.',
      'Experience with family business pressures woven into the guidance.',
      'Counselling in Gujarati, Hindi or English, from your own home.',
    ],
    resources: [
      { title: 'POSH Local Committee', detail: 'Workplace harassment complaints outside your employer go to the Local Committee through the District Officer. [Add verified Surat address before publishing]' },
      { title: 'Family court', detail: 'The Surat family court handles matrimonial matters. [Add verified address before publishing]' },
      { title: 'Emergency and crisis lines', detail: 'In immediate danger call 112. Free 24/7 mental health support: Tele MANAS 14416.' },
    ],
    faqs: [
      ['Is there a counsellor for Surat?', 'A verified expert panel serving Surat online is being prepared. Profiles, credentials and booking details will be published on this site first.'],
      ['What does counselling cost in Surat?', 'Prices are not confirmed. Spouzy will show all fees clearly before any booking or payment is possible.'],
      ['Can sessions happen late in the evening?', 'Evening availability is a design goal, especially for cities like Surat where work runs late. Final slot timings will be confirmed when booking opens.'],
      ['Can counselling help when a family business dispute is hurting our marriage?', 'Yes. A counsellor gives the couple a neutral space to talk about the marriage itself, separate from business decisions.'],
      ['Is it confidential?', 'Yes. Confidentiality is central to how Spouzy is built, the full privacy policy comes before sessions start, and sensitive health details should never be sent through website forms.'],
    ],
  },
  {
    region: 'gujarat',
    slug: 'vadodara',
    name: 'Vadodara',
    district: 'Vadodara',
    languages: ['Gujarati', 'Hindi', 'English'],
    lat: 22.3072,
    lng: 73.1812,
    nearby: ['ahmedabad', 'surat'],
    areasServed: ['Alkapuri', 'Fatehgunj', 'Gotri', 'Waghodia Road', 'Manjalpur', 'Harni', 'Sama'],
    intro:
      'Confidential marriage, relationship and intimacy counselling in Vadodara, planned as online sessions in Gujarati, Hindi and English. Support for student couples, industry families and everyone in between. Register your interest to hear when booking opens.',
    paragraphs: [
      'Vadodara balances two worlds: a calm, cultured city of education and the arts, and a working city of large industry and its shifts. Couples here often include a teacher and an engineer, a researcher and a plant supervisor, or a student couple deciding whether to stay near family or move for opportunity. The pressure is rarely dramatic; it accumulates, in career decisions one partner made alone, in families a phone call away, in the quiet sense of being roommates. Spouzy’s planned counselling for Vadodara is built for these conversations, in Gujarati, Hindi or English, online and in private.',
      'Education also makes Vadodara distinctive in another way: many couples met as students and married young, and the questions they carry are about who they are becoming, not just what the family expects. Pre-marital counselling gives space to discuss careers, children, money and city versus family obligations. For established couples, counselling helps rebuild the habit of talking, especially when work shifts mean partners pass each other at the door. And when separation is on the table, counselling offers clarity and dignity instead of a rushed decision made inside an argument.',
      'The first step can be as small as reading. The topic pages and relationship tips on this site are free, written in plain language, and useful even if you never book a session. When you are ready for a person to talk to, register your interest; Vadodara booking will open with verified expert profiles and clear fees, announced here first. In an emergency call 112, and Tele MANAS on 14416 offers free support day and night.',
    ],
    whyPoints: [
      'Guidance that understands education and industry households alike.',
      'Online sessions in Gujarati, Hindi or English, at times that fit shift work.',
      'Support for young couples and long-married partners at every stage.',
    ],
    resources: [
      { title: 'POSH Local Committee', detail: 'Workplace harassment complaints outside your employer go to the Local Committee through the District Officer. [Add verified Vadodara address before publishing]' },
      { title: 'Family court', detail: 'The Vadodara family court handles matrimonial matters. [Add verified address before publishing]' },
      { title: 'Emergency and crisis lines', detail: 'Call 112 in immediate danger. Tele MANAS 14416 offers free, 24/7 mental health support.' },
    ],
    faqs: [
      ['Can we get counselling in Gujarati in Vadodara?', 'Yes. Gujarati, Hindi and English sessions are planned, and expert profiles will show the languages each counsellor works in.'],
      ['How much does a session cost?', 'Fees have not been confirmed. Spouzy will publish clear prices before any booking or payment opens.'],
      ['We are a young student couple, is counselling for us?', 'Yes. Pre-marital and relationship conversations are often most valuable early, before habits and assumptions set in.'],
      ['My partner works in shifts, can sessions still fit?', 'Online sessions with varied timings are planned precisely for shift-working households, including weekends.'],
      ['Is it confidential?', 'Confidentiality is central to Spouzy. The full privacy policy will be published before sessions begin, and sensitive health details should not be shared through this website.'],
    ],
  },
  {
    region: 'gujarat',
    slug: 'rajkot',
    name: 'Rajkot',
    district: 'Rajkot',
    languages: ['Gujarati', 'Hindi'],
    lat: 22.3039,
    lng: 70.8022,
    nearby: ['jamnagar', 'junagadh', 'ahmedabad'],
    areasServed: ['Kalawad Road', 'Race Course', 'Nana Mava', 'University Road', 'Aji GIDC side', 'Bhupendra Road'],
    intro:
      'Confidential marriage, relationship and intimacy counselling in Rajkot, planned as online sessions in Gujarati and Hindi. Support shaped for Saurashtra’s business and engineering families, where work and home often share a roof. Register your interest to hear when booking opens.',
    paragraphs: [
      'Rajkot is Saurashtra’s engine room, a city of foundries, engineering units and family-run businesses where ambition is quietly worn. Marriages here are often close to the business: in-laws who are also partners, evenings that end with a shop-floor call, and reputations that matter because everyone knows everyone. That closeness gives couples a strong safety net and very little privacy to sort out problems inside the marriage. Spouzy’s planned counselling for Rajkot offers that missing private space, with online sessions in Gujarati and Hindi, away from the family WhatsApp group.',
      'Common threads in Rajkot relationships include the weight of expectation on sons running the family unit, daughters-in-law managing households where opinions arrive unasked, and couples who married within a tight community where separation carries a social cost. Pre-marital counselling helps a couple agree on money, roles and family involvement before the wedding fixes them silently in place. Relationship counselling helps partners say the unsayable at home, and separation counselling exists for couples who need to think clearly without shame deciding for them. Every stage is covered in plain language on this site.',
      'There is no need to wait for a crisis. The reading here is free, practical and written for families like yours, and registering interest simply means you will be told when Rajkot booking opens, with verified expert profiles and clear fees. Spouzy is not an emergency service: call 112 if anyone is in immediate danger, and Tele MANAS on 14416 for free support at any hour.',
    ],
    whyPoints: [
      'A private space to talk, away from community and family circles.',
      'Counselling in Gujarati and Hindi, planned with flexible timings.',
      'Guidance for business families where home and work overlap.',
    ],
    resources: [
      { title: 'POSH Local Committee', detail: 'Workplace harassment complaints outside your employer go to the Local Committee through the District Officer. [Add verified Rajkot address before publishing]' },
      { title: 'Family court', detail: 'The Rajkot family court handles matrimonial matters. [Add verified address before publishing]' },
      { title: 'Emergency and crisis lines', detail: 'In immediate danger call 112. Free 24/7 mental health support: Tele MANAS 14416.' },
    ],
    faqs: [
      ['Can I speak to someone in Gujarati?', 'Yes. Gujarati sessions are planned for Rajkot, alongside Hindi, and language options will be shown on each expert profile.'],
      ['How much does counselling cost in Rajkot?', 'Fees are not yet confirmed. Spouzy will publish clear prices before booking or payment opens.'],
      ['Will people in my community know I am taking counselling?', 'Sessions are planned as private online meetings, and confidentiality is central to how Spouzy is built. The full privacy policy will be published before sessions start.'],
      ['Can counselling help with in-law conflict?', 'Yes. Agreeing on boundaries and shared decisions is one of the most common reasons couples seek counselling, and it can improve without cutting the family off.'],
      ['Is it confidential?', 'Yes. Sessions are private, and no sensitive health details should ever be sent through website forms. The full privacy policy comes before booking opens.'],
    ],
  },
  {
    region: 'gujarat',
    slug: 'gandhinagar',
    name: 'Gandhinagar',
    district: 'Gandhinagar',
    languages: ['Gujarati', 'Hindi', 'English'],
    lat: 23.2156,
    lng: 72.6369,
    nearby: ['ahmedabad'],
    areasServed: ['Sector 21', 'Sector 11', 'Infocity', 'Sargasan', 'Kudasan', 'Randesan', 'GIFT City area'],
    intro:
      'Confidential marriage, relationship and intimacy counselling in Gandhinagar, planned as online sessions in Gujarati, Hindi and English. Support for government families and GIFT City professionals balancing duty, deadlines and home. Register your interest to hear when booking opens.',
    paragraphs: [
      'Gandhinagar holds two very different working worlds a few sectors apart: government households where postings, transfers and seniority shape family life, and the finance and technology professionals of GIFT City whose weeks run on deadlines and client calls. Couples between these worlds, one in service and one in the private sector, often negotiate different clocks, different stress and different ideas about money and status. Spouzy’s planned counselling for Gandhinagar is built for exactly these conversations, with online sessions in Gujarati, Hindi and English.',
      'Government families carry their own patterns: the transfer that arrives mid-school-year, the unofficial hosting duties, the sense that the department always comes first. GIFT City professionals face another version: long hours in glass towers, careers that can move abroad, and relationships tested by ambition as much as by distance. Pre-marital counselling helps couples agree on how they will handle careers, children and family expectations before the first transfer or promotion arrives. Relationship counselling helps when resentment has replaced conversation, and separation counselling offers a calm, dignified space for the hardest decisions.',
      'You can start without any commitment: the topic pages and relationship tips on this site are free and practical, and registering interest simply means you hear when Gandhinagar booking opens, with verified experts and published fees announced here first. Spouzy is not an emergency service. In immediate danger, call 112; for mental health support at any hour, Tele MANAS answers on 14416.',
    ],
    whyPoints: [
      'Understanding of both government-service households and corporate GIFT City life.',
      'Online sessions in Gujarati, Hindi or English, in your own time and space.',
      'A calm, structured alternative to letting work stress decide the marriage.',
    ],
    resources: [
      { title: 'POSH Local Committee', detail: 'Workplace harassment complaints outside your employer go to the Local Committee through the District Officer. [Add verified Gandhinagar address before publishing]' },
      { title: 'Family court', detail: 'Matrimonial matters for Gandhinagar are handled by the Ahmedabad family court. [Add verified address before publishing]' },
      { title: 'Emergency and crisis lines', detail: 'Call 112 in immediate danger. Tele MANAS 14416 for free, 24/7 mental health support.' },
    ],
    faqs: [
      ['Is counselling available in Gandhinagar?', 'Online counselling for Gandhinagar is planned, and booking will open once the expert panel is verified. Register interest on the contact page to be notified.'],
      ['Can sessions be in Gujarati?', 'Yes. Gujarati sessions are planned alongside Hindi and English, and each expert profile will list the languages offered.'],
      ['How much does a session cost?', 'Prices are not confirmed. Spouzy will publish all fees clearly before booking or payment becomes possible.'],
      ['My posting changes often, does that make counselling pointless?', 'No. Online sessions continue wherever you are posted, and counselling can help couples handle transitions rather than just survive them.'],
      ['Is it confidential?', 'Yes. Confidentiality is central to Spouzy, the full privacy policy will be published before sessions start, and sensitive health details should never be shared through this website.'],
    ],
  },
];

export const services: LocationService[] = [
  {
    slug: 'marriage-counselling',
    label: 'Marriage counselling',
    shortLabel: 'Marriage counselling',
    keyword: (city) => `Marriage counselling in ${city}`,
    sitePath: '/services/consulting',
    directAnswer: (city) =>
      `Confidential marriage counselling for couples in ${city.name}, planned as online sessions in ${city.languages.join(', ')} with qualified experts. Whether you are before the wedding or years into it, Spouzy gives you a private space to talk. Register your interest and be told when booking opens.`,
    helpsWith: [
      'Repeating the same argument without reaching the end of it',
      'Feeling more like housemates than partners',
      'Money, in-laws and household decisions causing tension',
      'Rebuilding trust after a hurt or a secret',
      'Pressure from family expectations around the marriage',
      'Deciding together whether to stay, pause or separate',
    ],
    steps: [
      'Choose a time that fits both of you, including evenings and weekends.',
      'Meet your counsellor online in a private session.',
      'Agree on what you want to change, at your own pace.',
      'Return for follow-up sessions as often as you both need.',
    ],
  },
  {
    slug: 'pre-marital-counselling',
    label: 'Pre-marital counselling',
    shortLabel: 'Pre-marital counselling',
    keyword: (city) => `Pre-marital counselling in ${city}`,
    sitePath: '/services/consulting',
    directAnswer: (city) =>
      `Planning to marry in ${city.name}? Confidential pre-marital counselling is planned as online sessions in ${city.languages.join(', ')}, helping you agree on money, family, careers and children before the wedding. Register your interest to be told when booking opens.`,
    helpsWith: [
      'Talking honestly about money, savings and family support',
      'Agreeing how involved each family will be after the wedding',
      'Careers: whose work moves, who adjusts, and when',
      'Children, faith and festival traditions between two families',
      'Arranged marriage: getting to know each other with a guide present',
      'Naming worries now instead of after the wedding',
    ],
    steps: [
      'Book a private session, alone or as a couple.',
      'Talk through the practical questions most couples postpone.',
      'Agree on your own answers, not the defaults.',
      'Return before the wedding for any remaining conversations.',
    ],
  },
  {
    slug: 'relationship-counselling',
    label: 'Relationship counselling',
    shortLabel: 'Relationship counselling',
    keyword: (city) => `Relationship counselling in ${city}`,
    sitePath: '/services/consulting',
    directAnswer: (city) =>
      `Confidential relationship counselling for couples and individuals in ${city.name}, planned as online sessions in ${city.languages.join(', ')}. For communication problems, trust issues and the slow drift apart. Register your interest to hear when booking opens.`,
    helpsWith: [
      'Conversations that always end in the same fight',
      'Trust damaged by lies, secrecy or betrayal',
      'Growing distant under work and family pressure',
      'Jealousy, insecurity or feeling taken for granted',
      'Life changes: a move, a job loss, a new baby',
      'Starting counselling alone when a partner will not join',
    ],
    steps: [
      'Register your interest and tell us a little about the situation.',
      'Meet a counsellor online, alone or together.',
      'Work on one change at a time, with practical tools.',
      'Review progress in follow-up sessions.',
    ],
  },
  {
    slug: 'divorce-counselling',
    label: 'Divorce & separation counselling',
    shortLabel: 'Divorce & separation',
    keyword: (city) => `Divorce and separation counselling in ${city}`,
    sitePath: '/marriage/divorce',
    directAnswer: (city) =>
      `Thinking about separation in ${city.name}? Confidential divorce and separation counselling is planned as online sessions in ${city.languages.join(', ')}, giving both of you a calm space to think clearly. Spouzy is not an emergency service; in immediate danger call 112.`,
    helpsWith: [
      'Being sure the relationship has truly ended, or finding out it has not',
      'Telling family, and handling their reactions',
      'Children: what to say and how to keep their lives steady',
      'Money and living arrangements, discussed calmly',
      'Guilt, anger and grief after the decision',
      'Rebuilding a life and identity after separation',
    ],
    steps: [
      'Book a private session to talk through the situation.',
      'Use counselling to decide, not to be pushed either way.',
      'If separating, plan the conversation with family and children.',
      'Continue sessions through the adjustment period.',
    ],
  },
  {
    slug: 'sex-therapy',
    label: 'Sex therapy & intimacy counselling',
    shortLabel: 'Sex therapy & intimacy',
    keyword: (city) => `Sex therapy and intimacy counselling in ${city}`,
    sitePath: '/intimacy/problems',
    directAnswer: (city) =>
      `Confidential sex therapy and intimacy counselling for adults in ${city.name}, planned as online sessions in ${city.languages.join(', ')}. Respectful, non-explicit guidance for intimacy concerns, from qualified experts. This page is for adults aged 18 and over.`,
    helpsWith: [
      'Difficulty talking about needs, comfort and boundaries',
      'Desire differences between partners',
      'Intimacy concerns that have been carried for years',
      'Rebuilding closeness after conflict, childbirth or illness',
      'Questions about sexual health you have never asked aloud',
      'Knowing when a concern needs a doctor, not a counsellor',
    ],
    steps: [
      'Confirm you are 18 or older and register your interest.',
      'Meet a counsellor online in a fully private session.',
      'Discuss the concern respectfully, at your pace.',
      'Follow the agreed plan, or get referred to a doctor when needed.',
    ],
    sensitive18: true,
  },
  {
    slug: 'posh-training',
    label: 'POSH training & consultancy',
    shortLabel: 'POSH training',
    keyword: (city) => `POSH training and consultancy in ${city}`,
    sitePath: '/corporates',
    directAnswer: (city) =>
      `POSH training and consultancy for employers in ${city.name}: awareness sessions, Internal Committee training and practical guidance under India’s POSH Act, 2013. Sessions planned in ${city.languages.join(', ')}. Speak to Spouzy about your workplace.`,
    helpsWith: [
      'A written anti-harassment policy that people actually read',
      'Constituting and training the Internal Committee',
      'Annual awareness training for employees and managers',
      'A complaint process that is confidential and fair',
      'POSH duties for hybrid and field workforces',
      'Reviewing what is working before a complaint tests it',
    ],
    steps: [
      'Tell us about your organisation, industry and languages.',
      'Review your policy and Internal Committee setup together.',
      'Schedule training formats that fit your teams.',
      'Keep a yearly rhythm of training and process reviews.',
    ],
    posh: true,
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));

export function cityPath(city: City): string {
  return `/locations/${city.region}/${city.slug}`;
}

export function servicePath(city: City, service: LocationService): string {
  return `${cityPath(city)}/${service.slug}`;
}

export function getCity(region: string, slug: string): City | undefined {
  return cities.find((c) => c.region === region && c.slug === slug);
}

export function getRegion(slug: string): LocationRegion | undefined {
  return regions.find((r) => r.slug === slug);
}

export function nearbyCities(city: City): City[] {
  return city.nearby
    .map((slug) => cities.find((c) => c.slug === slug))
    .filter((c): c is City => Boolean(c));
}
