/* ==========================================================================
   ECHOES WE CARRY — PHASE 5 · BEGIN YOUR STORY
   Curated journey registry. Every fact/label below is drawn from the project's
   verified Phase 2–4 data (ECHOES_ATLAS, ECHOES_SOUND, ECHOES_EXPERIENCE).
   Stage options (crafts, sounds, stories) are derived at runtime from those
   same data files so nothing is duplicated or invented.
   ========================================================================== */

var ECHOES_JOURNEY = {
  /* The 16 featured regions — every one has a full atlas profile + crafts,
     and belongs to the existing sound or story datasets (or both). */
  regions: [
    'up', 'tn', 'kl', 'ka', 'ap', 'tg', 'wb', 'od',
    'as', 'mh', 'gj', 'rj', 'pb', 'mp', 'la', 'br'
  ],

  /* A TRADITION — per-region picks, each verbatim-from-data (name + short note) */
  traditions: {
    up: [
      { title: 'Kathak', note: 'The dance of the storytellers, refined at Lucknow\u2019s court.' },
      { title: 'Dhrupad & Khyal', note: 'The classical gharanas of the great music cities.' },
      { title: 'Qawwali', note: 'Devotion sung at the Sufi dargahs.' }
    ],
    tn: [
      { title: 'Bharatanatyam', note: 'The body as a moving temple.' },
      { title: 'Carnatic Music', note: 'Kritis composed by Tyagaraja, Dikshitar and Syama Sastri.' },
      { title: 'Pongal', note: 'The harvest that honours abundance by overflowing.' }
    ],
    kl: [
      { title: 'Kathakali', note: 'A story-play in paint and gesture.' },
      { title: 'Sopana Music', note: 'Melody that ascends the temple steps by lamplight.' },
      { title: 'Chenda Rhythm', note: 'Drums that roll across festival grounds like weather.' }
    ],
    ka: [
      { title: 'Yakshagana', note: 'The night-long dance-drama of the coast.' },
      { title: 'Carnatic of the Court', note: 'Purandara Dasa sang in Kannada; the Mysore court polished the rest.' },
      { title: 'Mysuru Dasara', note: 'Nadaswaram processions moving through palace lights.' }
    ],
    ap: [
      { title: 'Kuchipudi', note: 'Classical nritta meeting playful storytelling.' },
      { title: 'Annamacharya Padams', note: 'Six hundred years of hymns rising toward Tirumala.' },
      { title: 'Burra Katha', note: 'Storytelling drums of the villages.' }
    ],
    tg: [
      { title: 'Perini', note: 'The warrior dance of the Kakatiya, revived in dance schools.' },
      { title: 'Qawwali of the Shrines', note: 'The Nizam\u2019s sarangi courtyards and the temple\u2019s nadaswaram.' },
      { title: 'Bathukamma', note: 'Flower-stack circles sung by women at sunset.' }
    ],
    wb: [
      { title: 'Rabindra Sangeet', note: 'The songs of Tagore.' },
      { title: 'Baul', note: 'The single-string ektara of the wandering minstrels.' },
      { title: 'Durga Puja', note: 'When dhak drums lead the goddess home.' }
    ],
    od: [
      { title: 'Odissi', note: 'The tribhanga \u2014 the body\u2019s three elegant bends.' },
      { title: 'Pattachitra', note: 'A story carried on a single scroll.' },
      { title: 'Rath Yatra', note: 'Nagaswaram and mardala pulling the chariot rhythm.' }
    ],
    as: [
      { title: 'Bihu', note: 'Spring sung from a buffalo horn.' },
      { title: 'Borgeet', note: 'The sattra songs of the monastery theatre.' },
      { title: 'Majuli Masks', note: 'Carved for the ritual stage, burnt after use.' }
    ],
    mh: [
      { title: 'Lavani', note: 'The ankle-bell drive that rides the dholki.' },
      { title: 'Abhanga', note: 'The Varkari songs that walk the road to Pandharpur.' },
      { title: 'Palkhi', note: 'Abhanga choruses on the pilgrim road.' }
    ],
    gj: [
      { title: 'Garba & Dandiya', note: 'Nine nights that turn squares into circling seas of rhythm.' },
      { title: 'Navaratri Garba', note: 'Clap-patterns deepening as the night grows.' },
      { title: 'Bhavai', note: 'The theatre of the tightrope and the comic mask.' }
    ],
    rj: [
      { title: 'Ghoomar', note: 'The spin-jump of the desert women at festival.' },
      { title: 'Maand', note: 'The desert raga of courtly Rajasthan.' },
      { title: 'Kalbelia', note: 'The snake-mimic dance of the Saper tradition.' }
    ],
    pb: [
      { title: 'Bhangra', note: 'The harvest kick and the wild spring jump.' },
      { title: 'Giddha', note: 'The mirror-dance of the women of the wells.' },
      { title: 'Gurbani Kirtan', note: 'Floating from the Golden Temple\u2019s sarovar.' }
    ],
    mp: [
      { title: 'Rai Dance', note: 'The autumn-night dance of the harvest moon.' },
      { title: 'Alha Ballad', note: 'The warriors\u2019 ballads of the village singers.' },
      { title: 'Gond & Bhil Folk', note: 'Bansuri lines and ground-dances of the heart of India.' }
    ],
    la: [
      { title: 'Cham Masked Dance', note: 'The monastery\u2019s masked steps at Hemis Tsechu.' },
      { title: 'Monastic Chant', note: 'Long horns answering across the valleys.' },
      { title: 'Jabro Dances', note: 'The circle dances of the Changthang herders.' }
    ],
    br: [
      { title: 'Madhubani', note: 'A wall that never leaves a corner empty.' },
      { title: 'Bidesia Theatre', note: 'Bhojpuri folk drama of village, migration and homecoming.' },
      { title: 'Chhath Geet', note: 'Songs sung at the riverside at dusk.' }
    ]
  },

  /* Fallback "sound" config for the one story-region without a Phase-4 sound
     profile (Bihar). Interpretive placeholder only — same stance as Phase 4. */
  soundFallbacks: {
    br: {
      tonic: 130.81, tempo: 92, scale: [0, 2, 3, 5, 7, 8, 10],
      modeName: 'Sohar & Chhath folk mode',
      desc: 'Folk song rides every rite — Sohar birth-songs, Chhath geet at the riverside, and Maithili poetry.',
      classical: 'Maithili and Bhojpuri village song',
      folk: 'Sohar, Chhath geet and folk theatre airs',
      instruments: ['Dholki', 'Jhal', 'Ektara']
    }
  },

  /* Curated "rotating echoes" for the SOUND stage — rich, clearly-different
     sounds shown alongside the chosen region\u2019s own sound. */
  soundRotation: ['rj', 'kl', 'la', 'as', 'pb', 'gj']
};