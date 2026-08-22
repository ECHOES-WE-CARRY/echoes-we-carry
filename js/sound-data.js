/* ==========================================================================
   ECHOES WE CARRY — PHASE 4 DATA · SOUND OF INDIA
   Regional music profiles driving js/sound.js. Audio is synthesised live
   in the browser with the Web Audio API as an interpretive placeholder —
   no recordings are shipped, so nothing copyrighted is used.
   Scales are simplified raga/folk modes chosen for synthesis.
   ========================================================================== */

var ECHOES_SOUND = {
  /* texture: hindustani | carnatic | folk | chant */
  regions: {
    up: {
      name: 'Uttar Pradesh', zone: 'North', texture: 'hindustani',
      tempo: 88, tonic: 138.59, scale: [0, 2, 4, 6, 7, 9, 11], modeName: 'Raag Yaman (evening)',
      desc: 'Kathak feet answer tabla hands in the lanes of Banaras and Lucknow; thumri leans out of courtyard windows at dusk.',
      classical: 'Khayal, thumri and dhrupad \u2014 Banaras and Lucknow gharanas',
      folk: 'Kajri of the monsoon, chaiti of spring, birha of the eastern plains',
      instruments: ['Tabla', 'Sarangi', 'Bansuri'],
      festivalSong: { name: 'Ramlila of Ayodhya', note: 'Ramayana verses sung through nine moonlit nights' }
    },
    tn: {
      name: 'Tamil Nadu', zone: 'South', texture: 'carnatic',
      tempo: 96, tonic: 146.83, scale: [0, 1, 4, 5, 7, 8, 11], modeName: 'Raag Mayamalavagowla',
      desc: 'In Chennai\u2019s December halls and Thanjavur\u2019s temples, kritis composed centuries ago are re-created note by devoted note.',
      classical: 'Carnatic kritis of the Trinity \u2014 Tyagaraja, Dikshitar, Syama Sastri',
      folk: 'Villupattu bow-song and temple nadaswaram suites',
      instruments: ['Mridangam', 'Veena', 'Nadaswaram'],
      festivalSong: { name: 'Margazhi season', note: 'Pre-dawn kritis sung through the city\u2019s sabha halls' }
    },
    kl: {
      name: 'Kerala', zone: 'South', texture: 'folk',
      tempo: 120, tonic: 130.81, scale: [0, 2, 4, 7, 9], modeName: 'Sopana-flavoured pentatony',
      desc: 'Kerala keeps rhythm like weather: chenda waves roll across festival grounds while sopana song climbs temple steps by lamplight.',
      classical: 'Sopana sangeetham ascending the temple steps',
      folk: 'Panchavadyam and Pandimelam ensembles of Pooram season',
      instruments: ['Chenda', 'Edakka', 'Kuzhal'],
      festivalSong: { name: 'Thrissur Pooram', note: 'Pandimelam rising under parasol pageantry' }
    },
    ka: {
      name: 'Karnataka', zone: 'South', texture: 'carnatic',
      tempo: 92, tonic: 146.83, scale: [0, 2, 4, 6, 7, 9, 11], modeName: 'Raag Kalyani',
      desc: 'Mysore\u2019s courts polished Carnatic music into chamber art; gamaka ornamentation still bends every phrase like slow calligraphy.',
      classical: 'Carnatic music of the Mysore Wodeyar court',
      folk: 'Yakshagana singing behind painted faces',
      instruments: ['Veena', 'Violin', 'Mridangam'],
      festivalSong: { name: 'Mysuru Dasara', note: 'Nadaswaram processions lit by palace bulbs' }
    },
    ap: {
      name: 'Andhra Pradesh', zone: 'South', texture: 'carnatic',
      tempo: 90, tonic: 138.59, scale: [0, 2, 3, 5, 7, 8, 10], modeName: 'Annamacharya padams',
      desc: 'Six hundred years of Annamacharya hymns still rise toward Tirumala, while Kuchipudi stages tell stories in song and gesture.',
      classical: 'Annamacharya sankeertanas of Tirumala',
      folk: 'Burra katha storytelling drums of the villages',
      instruments: ['Veena', 'Tambura', 'Dolu'],
      festivalSong: { name: 'Kuchipudi nights', note: 'Bhamakalapam scenes with mridangam and flute' }
    },
    tg: {
      name: 'Telangana', zone: 'South', texture: 'folk',
      tempo: 126, tonic: 130.81, scale: [0, 3, 5, 7, 10], modeName: 'Perini war rhythm',
      desc: 'The Kakatiya war-dance Perini thunders back to life on dappu drums, and Bathukamma\u2019s flower circles carry women\u2019s songs till dusk.',
      classical: 'Telugu padams carried down from court traditions',
      folk: 'Perini Shivatandavam drum-dance and Bathukamma songs',
      instruments: ['Dappu', 'Dolu', 'Nadaswaram'],
      festivalSong: { name: 'Bathukamma', note: 'Flower-stack circles sung by women at sunset' }
    },
    wb: {
      name: 'West Bengal', zone: 'East', texture: 'folk',
      tempo: 84, tonic: 138.59, scale: [0, 2, 3, 5, 7, 9, 10], modeName: 'Baul mode (Kafi-flavoured)',
      desc: 'Baul wanderers tune one-stringed ektaras to the heart, while Durga Puja\u2019s dhak drums turn whole neighbourhoods into processions.',
      classical: 'Rabindra Sangeet and Nazrul geeti of the Brahmaputra-Bhagirathi delta',
      folk: 'Baul mystic song, kirtan and Bhatiali boatmen\u2019s melodies',
      instruments: ['Ektara', 'Dotara', 'Dhak'],
      festivalSong: { name: 'Durga Puja', note: 'Dhak drummers leading the goddess home' }
    },
    od: {
      name: 'Odisha', zone: 'East', texture: 'hindustani',
      tempo: 76, tonic: 130.81, scale: [0, 2, 4, 7, 9], modeName: 'Odissi pentatony (Bhupali-like)',
      desc: 'Odissi\u2019s sculptural grace moves to pakhawaj cycles, and Odissi song quotes the Gita Govinda in temple courts.',
      classical: 'Odissi music \u2014 the oldest documented Odia sangita shastra lineages',
      folk: 'Dalkhai and Sambalpuri folk of the western districts',
      instruments: ['Pakhawaj', 'Veena', 'Mardala'],
      festivalSong: { name: 'Rath Yatra, Puri', note: 'Nagaswaram and mardala pulling the chariot rhythm' }
    },
    as: {
      name: 'Assam', zone: 'Northeast', texture: 'folk',
      tempo: 108, tonic: 146.83, scale: [0, 2, 4, 7, 9], modeName: 'Bihu pentatony',
      desc: 'When Bohag Bihu dawns, pepa reeds cry across the fields and young dancers answer in dhol-and-taal time.',
      classical: 'Borgeet devotional songs of Srimanta Sankardev\u2019s satras',
      folk: 'Bihu husori songs, Ojapali narrative singing',
      instruments: ['Pepa', 'Dhol', 'Gogona'],
      festivalSong: { name: 'Rongali Bihu', note: 'Springtime husori troupes singing door to door' }
    },
    mh: {
      name: 'Maharashtra', zone: 'West', texture: 'folk',
      tempo: 112, tonic: 138.59, scale: [0, 2, 3, 5, 7, 9, 10], modeName: 'Lavani groove (Kafi-flavoured)',
      desc: 'Lavani\u2019s ankle-bell drive rides the dholki, while abhangas of the Varkari saints walk the Pandharpur road in song.',
      classical: 'Natya sangeet stage song and Varkari abhangas',
      folk: 'Lavani of the tamasha stage, Powada ballads',
      instruments: ['Dholki', 'Harmonium', 'Manjeera'],
      festivalSong: { name: 'Palkhi of the Varkaris', note: 'Abhanga choruses walking to Pandharpur' }
    },
    gj: {
      name: 'Gujarat', zone: 'West', texture: 'folk',
      tempo: 118, tonic: 146.83, scale: [0, 2, 4, 7, 9], modeName: 'Garba pentatony',
      desc: 'Nine nights of Navaratri turn village squares into circling seas of clapped rhythm around a lit garbo lamp.',
      classical: 'Bhajan and Sant-vani traditions of medieval poet-saints',
      folk: 'Garba, dandiya raas and Bhavai folk theatre song',
      instruments: ['Dhol', 'Nagara', 'Harmonium'],
      festivalSong: { name: 'Navaratri garba', note: 'Clap-patterns deepening as the night grows' }
    },
    rj: {
      name: 'Rajasthan', zone: 'North', texture: 'folk',
      tempo: 80, tonic: 138.59, scale: [0, 1, 4, 5, 7, 8, 11], modeName: 'Maand (the desert raga)',
      desc: 'Maand carries the grandeur of courtly Rajasthan across dunes; algoza reeds and khartal clatter keep caravans company.',
      classical: 'Maand of the Jaipur and Jodhpur courts, Dhrupad of the shehnai tradition',
      folk: 'Kalbelia sapera songs, Langa and Manganiyar hereditary minstrels',
      instruments: ['Algoza', 'Khartal', 'Sarangi'],
      festivalSong: { name: 'Pushkar Camel Fair', note: 'Langa troupes playing through the dune nights' }
    },
    pb: {
      name: 'Punjab', zone: 'North', texture: 'folk',
      tempo: 128, tonic: 146.83, scale: [0, 2, 4, 7, 9], modeName: 'Harvest pentatony',
      desc: 'The dhol is Punjab\u2019s heartbeat: bhangra kicks up harvest dust and gurbani kirtan floats from the Golden Temple\u2019s sarovar.',
      classical: 'Gurbani kirtan in the raga framework of the Guru Granth Sahib',
      folk: 'Bhangra and giddha of Vaisakhi, tappa of the wells',
      instruments: ['Dhol', 'Tumbi', 'Algoza'],
      festivalSong: { name: 'Vaisakhi', note: 'Bhangra circles celebrating the wheat harvest' }
    },
    mp: {
      name: 'Madhya Pradesh', zone: 'Central', texture: 'folk',
      tempo: 96, tonic: 130.81, scale: [0, 3, 5, 7, 10], modeName: 'Gond-Bhil pentatony',
      desc: 'In the heart of India, Gond and Bhil villages answer dusk with bansuri lines and mandana-ground dances; Pandavani epics gallop on.',
      classical: 'Dhrupad\u2019s great lineages sheltered at Bhopal\u2019s courtly durbars',
      folk: 'Pandavani epic telling, Gond and Bhil community song',
      instruments: ['Bansuri', 'Timki', 'Ektara'],
      festivalSong: { name: 'Bhagoria haat', note: 'Bhil youth courting songs at the market festival' }
    },
    la: {
      name: 'Ladakh', zone: 'Trans-Himalaya', texture: 'folk',
      tempo: 60, tonic: 110.0, scale: [0, 2, 3, 7, 8], modeName: 'Chant-derived mode',
      desc: 'Long horns answer across valleys; lama chants and daman-surna wedding bands carry Tibetan Buddhist and Central Asian echoes.',
      classical: 'Monastic chant of the gompas',
      folk: 'Jabro dances of Changthang, daman-surna processional pairs',
      instruments: ['Daman', 'Surna', 'Dungchen'],
      festivalSong: { name: 'Hemis Tsechu', note: 'Masked cham dances to giant horns and drums' }
    }
  }
};

window.ECHOES_SOUND = ECHOES_SOUND;