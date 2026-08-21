/* ==========================================================================
   ECHOES WE CARRY - PHASE 3 EXPERIENCE DATA
   Cultural experience layer: Five Senses, Threads, Stories, Makers.
   Structured so future phases can extend it (State -> Category -> Tradition
   -> Story -> Maker -> Related Regions). Works on file:// - no fetch.
   Consumed by js/experience.js. Region ids match js/india-map-data.js paths.
   ========================================================================== */

var ECHOES_EXPERIENCE = {
  senses: [
    {
      key: 'see',
      title: 'SEE',
      tagline: 'What the eyes inherit',
      description:
        'Architecture, clothing, paintings and dance give India its first silhouette. From temple gopurams that climb like stone song to village walls brushed into earth-tone pictures, seeing is how a culture first remembers itself — and invites you to look twice.',
      examples: ['Temple architecture', 'Dress & adornment', 'Folk & classical painting', 'Classical dance'],
      states: ['rj', 'tn', 'od', 'br', 'ka', 'mh'],
      accent: '#8a6c22',
      icon: '<svg class="icon sense-node__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12c2-4 5-6 9-6s7 2 9 6c-2 4-5 6-9 6s-7-2-9-6z"/><circle cx="12" cy="12" r="2.6"/></svg>'
    },
    {
      key: 'hear',
      title: 'HEAR',
      tagline: 'What the ears carry',
      description:
        'Music, instruments and the rhythm of many languages make India a country you enter through sound. A raga at dawn, the call of a folk singer, percussion taught from memory — hearing is how a culture passes its inner rhythm from one generation to the next.',
      examples: ['Hindustani & Carnatic music', 'Folk song', 'Instruments & percussion', 'Languages & dialects'],
      states: ['up', 'tn', 'wb', 'rj', 'as', 'pb', 'kl'],
      accent: '#b25539',
      icon: '<svg class="icon sense-node__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.6"/><circle cx="16.5" cy="16" r="2.6"/></svg>'
    },
    {
      key: 'taste',
      title: 'TASTE',
      tagline: 'What the mouth remembers',
      description:
        'Cuisine is memory you can hold — the sour, hot, sweet geography of a region. From Chettinad\'s black-pepper heat to Kerala\'s banana-leaf sadya, taste keeps an idea of home that survives any distance.',
      examples: ['Regional cuisines', 'Spices & ingredients', 'Feasts & foodways', 'Sweets & preserved pickles'],
      states: ['tn', 'kl', 'wb', 'mh', 'gj', 'up'],
      accent: '#c2410c',
      icon: '<svg class="icon sense-node__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4c2.5 3.5 5 5.5 5 9a5 5 0 0 1-10 0c0-3.5 2.5-5.5 5-9z"/><path d="M9.5 13.5a3 3 0 0 0 5 0"/></svg>'
    },
    {
      key: 'smell',
      title: 'SMELL',
      tagline: 'What scent keeps close',
      description:
        'Flowers, spices, incense and the aroma of a slow kitchen are among a culture\'s most tender records. The temple\'s sandalwood, Kerala\'s spice gardens, the morning jasmine — smell is memory arriving without warning, and it is the hardest to forget.',
      examples: ['Flowers & garlands', 'Spice gardens', 'Incense & ritual scent', 'Culinary aromas'],
      states: ['tn', 'kl', 'ka', 'up', 'wb', 'as'],
      accent: '#4c6b4f',
      icon: '<svg class="icon sense-node__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4c-1.6 2-1.6 4.5 0 6.5s-2 3-4 3c-3 0-4-3-2-5s4-3 4-4.5z"/><path d="M12 10c1.6 2 1.6 4.5 0 6.5s2 3 4 3c1.5 0 2.5-1.5 2-3.5"/></svg>'
    },
    {
      key: 'touch',
      title: 'TOUCH',
      tagline: 'What the hands know',
      description:
        'Textiles, pottery, woodwork, metalwork and craft live in the fingertips. A Kanchipuram border, a blue-pottery cup, a Chola bronze held to the light — touch is how making becomes belonging, and how a craft is passed on as an act of the hand.',
      examples: ['Handwoven textiles', 'Pottery & ceramics', 'Wood & metalwork', 'Painting & craft surfaces'],
      states: ['tn', 'as', 'gj', 'wb', 'od', 'rj'],
      accent: '#5b6b8c',
      icon: '<svg class="icon sense-node__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 11V7m0 4v6M10 9V5m0 4v6M13 10v4m0-5V7m3 1v3c1.4-1 3 0 3 2v2c0 4-3 6-7 6s-7-2-7-6v-2"/></svg>'
    }
  ],

  // Threads that connect us - a cultural network across states.
  // Each category highlights its states on the map and draws golden threads
  // between them, and shows the traditions + makers carried along those threads.
  threads: [
    {
      key: 'music', label: 'Music',
      blurb: 'Ragas and rhythms that travel between courts, temples and fields.',
      states: ['up', 'tn', 'wb', 'pb', 'rj', 'as', 'kl'],
      traditions: ['Hindustani classical — Varanasi', 'Carnatic classical — Tamil Nadu', 'Rabindra Sangeet — Bengal', 'Dhol & bhangra — Punjab', 'Maand folk — Rajasthan', 'Borgeet & Bihu song — Assam', 'Sopana music — Kerala'],
      makers: ['A mridangam maker of Tamil Nadu', 'A folk singer of Rajasthan', 'A tanpura craftsman of Varanasi']
    },
    {
      key: 'food', label: 'Food',
      blurb: 'Ingredients and feasts that taste like one country made of many kitchens.',
      states: ['tn', 'kl', 'wb', 'gj', 'mh', 'up', 'rj'],
      traditions: ['Chettinad cuisine — Tamil Nadu', 'Sadya on the banana leaf — Kerala', 'Bengali sweets — West Bengal', 'Gujarati thali', 'Maharashtrian street food', 'Awadhi dining — Lucknow', 'Dal-baati & churma — Rajasthan'],
      makers: ['A sadya cook of Kerala', 'A spice-grinder of Chettinad']
    },
    {
      key: 'textiles', label: 'Textiles',
      blurb: 'Threads spun, tied, dyed and woven — the country\'s second skin.',
      states: ['tn', 'as', 'gj', 'wb', 'od', 'rj', 'up', 'ka', 'mp'],
      traditions: ['Kanchipuram silk — Tamil Nadu', 'Muga silk — Assam', 'Patola & bandhani — Gujarat', 'Kantha — West Bengal', 'Ikat — Odisha', 'Bandhej & leheriya — Rajasthan', 'Banarasi brocade — Varanasi', 'Mysore silk — Karnataka', 'Chanderi — Madhya Pradesh'],
      makers: ['A Banarasi silk weaver', 'A patola weaver of Gujarat', 'A kantha embroiderer of Bengal']
    },
    {
      key: 'dance', label: 'Dance',
      blurb: 'Bodies moving in steps older than the kingdoms that once watched them.',
      states: ['tn', 'kl', 'od', 'gj', 'up', 'rj', 'as', 'wb', 'ka'],
      traditions: ['Bharatanatyam — Tamil Nadu', 'Kathakali & Mohiniyattam — Kerala', 'Odissi — Odisha', 'Garba & dandiya — Gujarat', 'Kathak — Uttar Pradesh', 'Ghoomar — Rajasthan', 'Bihu — Assam', 'Chhau — Bengal/Jharkhand', 'Yakshagana — Karnataka'],
      makers: ['A Bharatanatyam guru', 'A Kathakali training school']
    },
    {
      key: 'festivals', label: 'Festivals',
      blurb: 'The calendar itself is a shared cultural object — every region lights its own day.',
      states: ['tn', 'kl', 'gj', 'up', 'wb', 'as', 'ka', 'od'],
      traditions: ['Pongal — Tamil Nadu', 'Onam — Kerala', 'Navaratri — Gujarat', 'Diwali & Ganga aarti — Uttar Pradesh', 'Durga Puja — West Bengal', 'Rongali Bihu — Assam', 'Mysuru Dasara — Karnataka', 'Rath Yatra — Odisha'],
      makers: ['A flower-carpet (pookalam) maker', 'An aarti diya-caster']
    },
    {
      key: 'crafts', label: 'Crafts',
      blurb: 'Objects made by hand that carry a place in their grain and glaze.',
      states: ['tn', 'rj', 'gj', 'up', 'wb', 'od', 'mh', 'mp', 'ka'],
      traditions: ['Chola bronze — Tamil Nadu', 'Blue pottery — Rajasthan', 'Bandhani — Gujarat', 'Banarasi weaves — Varanasi', 'Kantha — West Bengal', 'Pattachitra — Odisha', 'Warli — Maharashtra', 'Chanderi — Madhya Pradesh', 'Mysore inlay — Karnataka'],
      makers: ['A rosewood carver of Mysore', 'A blue-pottery maker of Jaipur']
    },
    {
      key: 'languages', label: 'Languages',
      blurb: 'Forty-two million voices — the true scatter of the cultural seed.',
      states: ['tn', 'kl', 'wb', 'mh', 'gj', 'up', 'as', 'pb'],
      traditions: ['Tamil — Tamil Nadu', 'Malayalam — Kerala', 'Bengali — West Bengal', 'Marathi — Maharashtra', 'Gujarati — Gujarat', 'Hindi — Uttar Pradesh', 'Assamese — Assam', 'Punjabi — Punjab'],
      makers: ['A folk-language poet-singer']
    }
  ],

  // Stories behind the culture - each carries ORIGIN / MEANING / EVOLUTION /
  // TODAY / THE ECHO plus a Then->Now comparison. Facts are stated at a survey
  // level and hedged where centuries blur into legend.
  stories: [
    {
      key: 'kolam', title: 'Kolam', region: 'Tamil Nadu', stateId: 'tn', cat: 'Craft',
      tagline: 'A threshold drawn fresh every dawn.',
      origin: 'In the courtyards of Tamil Nadu, women have swept and dampened the ground and drawn kolams before sunrise for centuries; early Tamil poetry already alludes to rice-flour line drawings at the doorstep.',
      meaning: 'Made of rice flour, the white line is offered to the earth and to ants and birds — a small daily gift. A kolam is typically drawn on a lattice of dots whose lines close back on themselves, an emblem of return and auspiciousness.',
      evolution: 'From unbroken closed curves in rice flour, kolam has spread to synthetic powders, pavement rangoli and contemporary art walls — trading the dawn doorstep for public squares.',
      today: 'Still drawn each morning in many Tamil homes, and now celebrated in competitions, airports and international art; a craft of geometry, patience and composition.',
      echo: 'Every closed line is a plea for continuity — a pattern that begins and returns to its start, like a day, a year, a life.',
      thenNow: { then: 'Rice flour trickled between a woman\'s fingers at dawn.', now: 'Powder, paint and pixels — the same dot-lattice on canvas and pavement.' }
    },
    {
      key: 'bharatanatyam', title: 'Bharatanatyam', region: 'Tamil Nadu', stateId: 'tn', cat: 'Dance',
      tagline: 'The body as a moving temple.',
      origin: 'One of India\'s classical dance forms, with roots in the dramatic aesthetics of the Natyasastra and the temple-dance tradition of Tamil Nadu; reshaped for the modern stage through twentieth-century reform, closely tied to the Kalakshetra school of Rukmini Devi Arundale.',
      meaning: 'Adapted from bha (bhava), ra (raga) and ta (tala) — the union of expression, melody and rhythm. Its vocabulary of adavu (steps) and abhinaya (gesture) gives the dancer a full-body grammar.',
      evolution: 'From temple ritual and court patronage to a codified proscenium repertoire that runs from the opening alarippu to the closing tillana.',
      today: 'Taught worldwide in guru-led schools and academies, it remains a living syllabus of movement, music and sculpture-like pose.',
      echo: 'The dancer\'s rooted stance — knees bent, spine long — recalls temple bronzes, devotion that learned to stand very still and then to move.',
      thenNow: { then: 'A devadasi offering movement in the temple courtyard.', now: 'A trained performer and teacher on the concert stage and in world studios.' }
    },
    {
      key: 'kathakali', title: 'Kathakali', region: 'Kerala', stateId: 'kl', cat: 'Dance',
      tagline: 'A story-play in paint and gesture.',
      origin: 'A dance-drama of Kerala that took formal shape from the seventeenth century, drawing on earlier theatre and on the epics of the Ramayana and Mahabharata, performed in temple and court contexts.',
      meaning: 'Literally "story-play": elaborately painted faces — green for gods, red for the fierce, black for the demon — and towering crowns turn the actor\'s body into a moving icon that tells the myth in gesture.',
      evolution: 'From all-night outdoor performances to a staged, codified art, with distinct character types (vesham) and the deep percussion of sopana music and chenda drums.',
      today: 'Trained in Kerala\'s schools over years of eye, facial-muscle and footwork discipline; celebrated internationally for its expressive power.',
      echo: 'A performer spends years training the eyes alone — because an echo must first be seen, and held, to be remembered.',
      thenNow: { then: 'All-night performance by torchlight outside the temple.', now: 'A framed stage piece taught in academies and performed on world tours.' }
    },
    {
      key: 'garba', title: 'Garba', region: 'Gujarat', stateId: 'gj', cat: 'Festival',
      tagline: 'The night the whole state spins together.',
      origin: 'A circle dance of Gujarat performed during Navaratri in honour of the goddess; its name echoes the garbo — the many-tiered lamp-and-pot that holds the flame at the centre.',
      meaning: 'Dancers move in concentric circles around the central lamp, clapping and turning, with dandiya sticks carried by many — a whole community kept in motion by one shared pulse.',
      evolution: 'From village courtyards around the garbo to vast urban Navaratri arenas and diaspora evenings, now with choreographed dandiya routines set to re-mixed folk songs.',
      today: 'One of India\'s great participatory festivals — across cities of Gujarat and the world, millions dance nightly through the nine nights of Navaratri.',
      echo: 'The circle never moves in to touch the flame; it keeps the distance and keeps turning — the sacred held at the centre by everyone.',
      thenNow: { then: 'Neighbours circling the clay garbo in a village square.', now: 'Swathes of dancers under city lights on dandiya nights.' }
    },
    {
      key: 'bihu', title: 'Bihu', region: 'Assam', stateId: 'as', cat: 'Festival',
      tagline: 'Spring sung from a buffalo horn.',
      origin: 'Rongali Bihu greets the Assamese spring and new year; the dance and its songs belong to the fields and rejoicing of young Assam, with roots in seasonal and folk practice older than any court.',
      meaning: 'Three Bihus mark the agricultural year; Rongali welcomes sowing and the season\'s first green, carried on the dhol drum, the pepa (a pipe made from buffalo horn), the gogona and the taal.',
      evolution: 'From field-side celebration to a formalised stage form taught in Assam\'s cultural institutions, yet the spring field version has never left.',
      today: 'Young men and women dance in joyful unison to the pepa\'s unmistakable sound — a distinctly Assamese note heard statewide each April.',
      echo: 'Every spring the piped buffalo horn is blown again — a sound made from the horn of the animal that worked the same field.',
      thenNow: { then: 'A field-side song circle after the sowing rains.', now: 'A staged Bihu troupe performing the same steps on a national platform.' }
    },
    {
      key: 'madhubani', title: 'Madhubani', region: 'Bihar', stateId: 'br', cat: 'Craft',
      tagline: 'A wall that never leaves a corner empty.',
      origin: 'The village painting of the Mithila region of Bihar, made by women on the nuptial walls and floors of their homes, and carried to paper and cloth from the mid-twentieth century.',
      meaning: 'A visual folk scripture of gods, weddings, fish and the sun — every motif auspicious and every space filled; line and pattern carry the devotion.',
      evolution: 'From mud walls and wedding chambers to paper, cloth and a celebrated regional art — pushed wider when lean years encouraged the sale of painted works.',
      today: 'A celebrated contemporary Indian folk-art form, taught and collected worldwide while still painted in Mithila homes.',
      echo: 'There is no empty corner in a Madhubani painting — as if, in Mithila, an unfilled space were an un-blessed heart.',
      thenNow: { then: 'Mud walls of a bride\'s room drawn over for the wedding.', now: 'Paper, cloth and gallery canvases by district-wide women\'s circles.' }
    },
    {
      key: 'warli', title: 'Warli', region: 'Maharashtra', stateId: 'mh', cat: 'Craft',
      tagline: 'A village drawn in a few white lines.',
      origin: 'A ritual wall-painting tradition of the Warli people of Maharashtra\'s Sahyadri hills, drawn in white pigment on the ochre walls of their houses around a sacred central motif.',
      meaning: 'A spare grammar of circles (sun and moon), triangles (people and mountains) and squares (the sacred chauk) depicting harvest, dance, hunt and the everyday life of the village.',
      evolution: 'From walls of wattle-and-daub homes to paper and canvas, popularised in modern art while keeping its white-on-ochre signature.',
      today: 'Recognised internationally as a rhythmic, minimal style, while still practised in the homes of Maharashtrian tribal villages.',
      echo: 'A few lines draw an entire village dancing — proof that the simplest marks can carry a whole way of life.',
      thenNow: { then: 'White rice-paste figures on the ochre mud wall of a home.', now: 'Canvas and paper works in galleries, still white on warm ground.' }
    },
    {
      key: 'pattachitra', title: 'Pattachitra', region: 'Odisha', stateId: 'od', cat: 'Craft',
      tagline: 'A story carried on a single scroll.',
      origin: 'The cloth-painting tradition of Odisha — above all of Raghurajpur and the Puri region — practised by chitrakara painter families, with a cloth-scroll tradition bound to temple ritual and narrative ballad.',
      meaning: 'From pata (cloth) and chitra (picture): rigorous line, natural colours such as tamarind-seed black and conch-white, and scenes of the gods carried into the household on cloth.',
      evolution: 'From temple scrolls and devotional panels to framed pictures, palm-leaf work and tussar-silk commissions, while the painter families keep the old method.',
      today: 'Raghurajpur is a living craft village; pattachitra and its palm-leaf cousin talapatrachitra are made across family courtyards and shipped worldwide.',
      echo: 'The conch-white outline on dark cloth is a sentence told one line at a time — a story long enough to wrap around a life.',
      thenNow: { then: 'A long scroll unrolled to narrate the myth before a gathering.', now: 'Mat-framed panels and tussar paintings hung in homes and galleries.' }
    },
    {
      key: 'onam', title: 'Onam', region: 'Kerala', stateId: 'kl', cat: 'Festival',
      tagline: 'The ten days a king comes home.',
      origin: 'The harvest festival of Kerala that welcomes the mythical king Mahabali, whose annual return the land rejoices in; families lay the pookalam flower carpet on the ground each day of the festival.',
      meaning: 'A season of abundance remembered as a golden age — "the spirit of Maveli" — joining family and community over the banana-leaf sadya, flower mats and the snake-boat races.',
      evolution: 'From agrarian harvest rites to a great state festival of games, pookalam, the grand sadya and the vallamkali boat races on the backwaters.',
      today: 'Kerala\'s most communal festival — flowers at every doorstep, homes opened wide, the green land giving everything it has.',
      echo: 'Each flower pressed into the mat is a spot of that remembered golden age, relaid every year so that nothing truly ends.',
      thenNow: { then: 'Rice paddies celebrated after harvest by the waterside.', now: 'Street-wide pookalam, sadya feasts and backwater boat races.' }
    },
    {
      key: 'pongal', title: 'Pongal', region: 'Tamil Nadu', stateId: 'tn', cat: 'Festival',
      tagline: 'Shout when the pot overflows.',
      origin: 'The four-day Tamil harvest festival of mid-January; the eponymous Pongal — rice boiled with milk and jaggery until it spills over — welcomes the sun\'s return toward the fields.',
      meaning: 'The cry "Pongalo Pongal!" — "it overflows!" — turns a kitchen accident into an act of thanksgiving; new pots, fresh kolams, sugarcane and the household fire together mark renewal.',
      evolution: 'From field-side harvest blessing to a festival of the home, of cattle (Mattu Pongal) and of communal sweets; the celebrated Jallikattu continues in parts of the state.',
      today: 'Still a harvest homecoming founded on the overflowing pot — the season\'s first sweetness shared with family and with the cow.',
      echo: 'The moment the milk spills, you shout "Pongalo Pongal!" — abundance is not hoarded, it is honoured by being shared, and by being allowed to overflow.',
      thenNow: { then: 'A clay pot of rice boiled over in the open sun, offered to the new warmth.', now: 'The same overflowing pot in city and hotel kitchens alike.' }
    }
  ],

  // Meet the Makers - illustrative, composite profiles honouring real craft
  // traditions. NO real person is depicted; names are placeholders so verified
  // biographies can drop in later without restructuring.
  makers: [
    {
      key: 'banarasi-weaver', name: 'Ramkinkar Baidya', region: 'Varanasi, Uttar Pradesh', stateId: 'up',
      craft: 'Weaving', role: 'Handloom Banarasi silk',
      learnedFrom: 'His father and grandfather, at the family loom in the old weaver quarters of Varanasi.',
      practiced: 'Handloom Banarasi with gold zari — twenty years and counting, through buta borders and full brocade.',
      passedForward: 'Teaching an apprentice-repertoire of motifs, from single-butis to the carved pankha border.',
      whyContinue: 'The loom is a kind of time-keeping; every throw of the shuttle carries the family\'s hours, and the silk smells of the workshop where his grandfather\'s hands still seem to hover.',
      message: 'Let the handloom remain a choice, not a memory. Buy the cloth the fingers made.',
      note: 'Illustrative profile — composite of the Varanasi weaving community.'
    },
    {
      key: 'blue-pottery-maker', name: 'Manju Devi Sharma', region: 'Jaipur, Rajasthan', stateId: 'rj',
      craft: 'Pottery', role: 'Blue-pottery artisan',
      learnedFrom: 'An aunt\'s kiln workshop near Jaipur, where she learned the quartz-and-silica recipe by feel.',
      practiced: 'Blue pottery — shaping the body, painting the tulip and fish motifs, then firing the turquoise-and-cobalt glazes.',
      passedForward: 'Training village youth in the silica-clay method so the blue does not thin into souvenir kitsch.',
      whyContinue: 'The blue has never stopped being the colour of a Jaipur sky at dusk; a cup she makes holds water and a little of that light.',
      message: 'The desert keeps water in clay pots — keep the clay in our hands and the craft in the family.',
      note: 'Illustrative profile — composite of the Jaipur blue-pottery community.'
    },
    {
      key: 'madhubani-painter', name: 'Kumari Jha', region: 'Mithila, Bihar', stateId: 'br',
      craft: 'Painting', role: 'Madhubani artist',
      learnedFrom: 'Her mother and grandmother, who painted the nuptial walls of the village home.',
      practiced: 'Madhubani on paper, cloth and contemporary canvas — line after line, filling every corner as taught.',
      passedForward: 'A women\'s painting circle that runs through the district, carrying the method to the next generation.',
      whyContinue: 'Every unfilled corner of a painting asks her to bless it; an empty space, to her, is an un-comforted place.',
      message: 'A village that paints keeps its women literate in joy — the brush is a kind of schooling.',
      note: 'Illustrative profile — composite of the Mithila women\'s painting movement.'
    },
    {
      key: 'tanpura-maker', name: 'Ganesan Pillai', region: 'Tiruvallur, Tamil Nadu', stateId: 'tn',
      craft: 'Instrument making', role: 'Mridangam & tanpura maker',
      learnedFrom: 'A temple craft quarter where hide, wood and jackfruit meet, under a master who tuned by ear.',
      practiced: 'Shaping the double-headed mridangam and the drone tanpura — the barrel, the layered skins and the tuning paste — for concert artists.',
      passedForward: 'Handing the tan (tuning paste) secrets and the pulling of the straps to the next pair of hands.',
      whyContinue: 'A well-made head can make a drummer weep into the rhythm; the instrument is only as good as its morning.',
      message: 'Let the tree and the hide sing again, and let the tuning be learned by hand, not only by machine.',
      note: 'Illustrative profile — composite of Tamil Nadu\'s percussion-craft community.'
    },
    {
      key: 'bharatanatyam-guru', name: 'Lakshmi Srinivasan', region: 'Chennai, Tamil Nadu', stateId: 'tn',
      craft: 'Dance', role: 'Bharatanatyam performer & teacher',
      learnedFrom: 'A Kalakshetra-style training under a senior nattuvanar, learning adavu and abhinaya foot by foot.',
      practiced: 'Performing and teaching the classical repertoire for over four decades — from alarippu to tillana.',
      passedForward: 'A small studio where children learn the discipline and prepare their first arangetram.',
      whyContinue: 'The stage is shorter than the lineage; the teaching is longer — the pose passes through her to the next body.',
      message: 'Wear the dance lightly — it carried all of us here, and it will carry whoever stands behind you.',
      note: 'Illustrative profile — composite of the Bharatanatyam community.'
    },
    {
      key: 'sadya-cook', name: 'Thankamma Menon', region: 'Thrissur, Kerala', stateId: 'kl',
      craft: 'Traditional cooking', role: 'Onam sadya cook',
      learnedFrom: 'Her grandmother\'s banana-leaf kitchen, where the sadya was laid on the floor and eaten with the right hand.',
      practiced: 'The slow, spice-sweet sadya of Kerala — sambar, avial, payasam — for family, festivals and temple feasts.',
      passedForward: 'Weekend sessions so the recipes, and the patience behind them, outlive the old kitchens.',
      whyContinue: 'A dish remembers who sat at the table — every payasam holds a name, a year, a feast.',
      message: 'Grind the masala by hand; it hears you. And always leave room for the payasam.',
      note: 'Illustrative profile — composite of Kerala\'s sadya cook tradition.'
    },
    {
      key: 'rosewood-carver', name: 'Suresh Acharya', region: 'Mysore, Karnataka', stateId: 'ka',
      craft: 'Woodwork', role: 'Rosewood & sandalwood carver',
      learnedFrom: 'A Mysore workshop carving rosewood and sandalwood, under an uncle who drew the motif first in chalk.',
      practiced: 'Haveli doors, temple pillars and ornamental furniture — the grain read before the chisel moves.',
      passedForward: 'Taking on apprentices from the town\'s craft families, one motif at a time.',
      whyContinue: 'Wood keeps the memory of the tree and of the hands — a carved door outlives the saw that cut it.',
      message: 'Let the grain of home stay under our hands, and the sandalwood smell stay close to who we are.',
      note: 'Illustrative profile — composite of the Mysore wood-carving craft.'
    }
  ],
// Disclaimer shown in the Makers UI.
  makersNote: 'Names and life details above are illustrative composites honouring real living craft traditions — no real person is depicted, so verified biographies can be added later without restructuring the data.'
};