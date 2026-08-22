/* ==========================================================================
   ECHOES WE CARRY — PHASE 4 DATA
   Heritage of India (sites + routes) & Culture at Risk.
   Facts follow UNESCO WHS/ICH listings, Census of India and the People's
   Linguistic Survey. Artwork references are stylised placeholders.
   Consumed by js/heritage.js. Works on file:// — no fetch required.
   ========================================================================== */

var ECHOES_HERITAGE = {
  /* viewBox of assets/india-map.svg plus the exact Mercator projection that
     assets/_build_map.py used to generate it — lets us pin real lat/lng. */
  view: { x: -7.94, y: 93.41, w: 627.86, h: 706.52 },
  project: function (lon, lat) {
    var L = 68.18998, R = 97.419638;
    var T = 37.053798, B = 6.746236;
    function merc(d) { var r = d * Math.PI / 180; return Math.log(Math.tan(Math.PI / 4 + r / 2)); }
    return {
      x: (lon - L) / (R - L) * 611.92,
      y: 101.41 + (merc(T) - merc(lat)) / (merc(T) - merc(B)) * 690.52
    };
  },

  /* Curated routes drawn as animated arcs between member sites. */
  trails: [
    { key: 'mughal-axis', name: 'The Mughal Axis', blurb: 'Agra to Delhi along emperors\u2019 roads.', stops: ['agra-fort', 'taj-mahal', 'fatehpur-sikri', 'red-fort'] },
    { key: 'deccan-caves', name: 'Deccan Cave Trail', blurb: 'Rock-cut sanctuaries of Maharashtra.', stops: ['ajanta-caves', 'ellora-caves', 'elephanta-caves'] },
    { key: 'chola-coast', name: 'Chola Coast', blurb: 'Temple cities of the Coromandel shore.', stops: ['mahabalipuram', 'chola-temples', 'meenakshi-temple'] },
    { key: 'ganga-plains', name: 'Plains of Awakening', blurb: 'Where the Buddha walked and taught.', stops: ['rajgir', 'nalanda', 'mahabodhi-temple', 'sarnath'] },
    { key: 'himalayan-wild', name: 'Himalayan Wilderness', blurb: 'Protected peaks, meadows and deltas.', stops: ['ghnp', 'nanda-devi', 'khangchendzonga', 'kaziranga'] }
  ],

  /* cat: monument | historic | natural | living · unesco:true also matches
     the UNESCO layer. art cycles through stylised gradient plates. */
  sites: [
    {
      id: 'taj-mahal', name: 'Taj Mahal', st: 'up', place: 'Agra',
      lat: 27.1751, lng: 78.0421, cat: 'monument', unesco: true,
      year: '1632\u201353 CE', art: 0,
      history: 'Shah Jahan raised this marble mausoleum for Mumtaz Mahal, employing some twenty thousand craftspeople across two decades.',
      signif: 'The summit of Mughal architecture \u2014 perfect symmetry, pietra dura gemstone inlay and a charbagh paradise garden on the Yamuna.',
      trads: ['Pietra dura stone inlay', 'Marble carving ateliers', 'Charbagh garden design'],
      why: 'Grief translated into the most recognised building on earth.'
    },
    {
      id: 'agra-fort', name: 'Agra Fort', st: 'up', place: 'Agra',
      lat: 27.1795, lng: 78.0211, cat: 'monument', unesco: true,
      year: '1565\u201373 CE', art: 1,
      history: 'Akbar\u2019s red-sandstone citadel became the empire\u2019s seat; Shah Jahan later added marble palaces \u2014 and spent his last years here, gazing at the Taj.',
      signif: 'A walled city of halls, courtyards and mosques where Mughal power was administered for nearly two centuries.',
      trads: ['Red sandstone masonry', 'Marble jali screenwork', 'Mughal water engineering'],
      why: 'The stage on which three emperors\u2019 stories turned.'
    },
      {
      id: 'fatehpur-sikri', name: 'Fatehpur Sikri', st: 'up', place: 'near Agra',
      lat: 27.0940, lng: 77.6610, cat: 'historic', unesco: true,
      year: 'from 1571 CE', art: 2,
      history: 'Akbar built an entire capital in red sandstone here, then abandoned it within decades as its water failed.',
      signif: 'Buland Darwaza, Panch Mahal and the white dargah of Salim Chishti fuse Persian ideas with Indian craft.',
      trads: ['Chishti Sufi qawwali', 'Stone-carving workshops', 'Fatehpur zari embroidery'],
      why: 'A city-sized experiment in syncretic design, preserved mid-thought.'
    },
    {
      id: 'qutb-minar', name: 'Qutb Minar', st: 'dl', place: 'Delhi',
      lat: 28.5245, lng: 77.1855, cat: 'monument', unesco: true,
      year: 'begun 1193 CE', art: 3,
      history: 'Begun by Qutb-ud-din Aibak and completed by his successors, the fluted sandstone minaret rises 73 metres beside the Quwwat-ul-Islam mosque.',
      signif: 'The earliest major mosque complex of north India; its courtyard holds a rust-resistant Iron Pillar forged in the 4th century.',
      trads: ['Indo-Islamic stone joinery', 'Calligraphic band carving', 'Iron metallurgy'],
      why: 'Five centuries of building ambition stacked in tapering storeys.'
    },
    {
      id: 'humayun-tomb', name: 'Humayun\u2019s Tomb', st: 'dl', place: 'Delhi',
      lat: 28.5933, lng: 77.2507, cat: 'monument', unesco: true,
      year: 'c. 1570 CE', art: 4,
      history: 'Haji Begum commissioned this garden tomb for Emperor Humayun, working with Persian architect Mirak Mirza Ghiyath.',
      signif: 'The first grand garden-tomb on the subcontinent \u2014 direct architectural ancestor of the Taj Mahal.',
      trads: ['Double-dome construction', 'Charbagh planning', 'Sandstone-and-marble inlay'],
      why: 'Where the idea of the Taj was first set in stone.'
    },
    {
      id: 'red-fort', name: 'Red Fort', st: 'dl', place: 'Delhi',
      lat: 28.6562, lng: 77.2410, cat: 'monument', unesco: true,
      year: '1639\u201348 CE', art: 5,
      history: 'Shah Jahan\u2019s fortified palace of Shahjahanabad; its Diwan-i-Khas once sheltered the jewelled Peacock Throne.',
      signif: 'Every Independence Day the Prime Minister addresses the nation from these ramparts \u2014 the fort still performs as the state\u2019s stage.',
      trads: ['Pietra dura', 'Scalloped arcades', 'Riverfront garden planning'],
      why: 'Power, ceremony and memory addressed from one balcony.'
    },
    {
      id: 'cst', name: 'Chhatrapati Shivaji Terminus', st: 'mh', place: 'Mumbai',
      lat: 18.9398, lng: 72.8355, cat: 'monument', unesco: true,
      year: '1878 CE', art: 6,
      history: 'F.W. Stevens\u2019 High Victorian Gothic terminus \u2014 Victoria Terminus until 1996 \u2014 married English cathedral style to Indian ornament.',
      signif: 'A working station carrying millions of commuters daily beneath carved peacocks and gargoyles.',
      trads: ['Victorian Gothic revival', 'Bombay stone carving', 'Stained glass craft'],
      why: 'Colonial architecture reclaimed by the world\u2019s busiest local railway.'
    },
    {
      id: 'mumbai-artdeco', name: 'Victorian Gothic & Art Deco Ensemble', st: 'mh', place: 'Mumbai',
      lat: 18.9440, lng: 72.8230, cat: 'monument', unesco: true,
      year: '1930s', art: 7,
      history: 'Along Marine Drive and Oval Maidan stands one of the world\u2019s largest collections of Art Deco buildings, inscribed beside the Gothic civic pile opposite.',
      signif: 'Curved balconies, ocean-liner rails and tropical motifs made Bombay modern before Independence.',
      trads: ['Art Deco stucco relief', 'Single-screen cinema design', 'Tropical Deco facades'],
      why: 'A skyline of optimism, kept in pastel stucco.'
    },
    {
      id: 'ajanta-caves', name: 'Ajanta Caves', st: 'mh', place: 'Jalgaon district',
      lat: 20.5569, lng: 75.7008, cat: 'historic', unesco: true,
      year: '2nd c. BCE \u2013 6th c. CE', art: 2,
      history: 'Monks cut prayer halls and monasteries into a horseshoe gorge of the Waghora river in two great waves, Satavahana and then Vakataka.',
      signif: 'Murals of Bodhisattvas and courtly life are among the oldest surviving paintings in India.',
      trads: ['Rock-cut chaitya halls', 'Tempera murals', 'Buddhist sculpture'],
      why: 'Two centuries of silence between chisel strokes \u2014 then the work resumed exactly.'
    },
    {
      id: 'ellora-caves', name: 'Ellora Caves', st: 'mh', place: 'near Aurangabad',
      lat: 20.0264, lng: 75.1797, cat: 'historic', unesco: true,
      year: '6th\u201310th c. CE', art: 5,
      history: 'Thirty-four cave temples dug successively by Buddhist, Hindu and Jain communities along a single basalt escarpment.',
      signif: 'Cave 16, the Kailasa temple, is an entire mountain temple carved top-down from living rock under Rashtrakuta Krishna I.',
      trads: ['Top-down rock excavation', 'Monolithic sculpture', 'Shared pilgrimage site'],
      why: 'Three faiths sharing one cliffwall for four hundred years.'
    },
    {
      id: 'elephanta-caves', name: 'Elephanta Caves', st: 'mh', place: 'Mumbai Harbour',
      lat: 18.9636, lng: 72.9310, cat: 'historic', unesco: true,
      year: 'mid-6th c. CE', art: 7,
      history: 'On an island east of Mumbai, rock-cut shrines honour Shiva as Nataraja, Mahayogi and the great three-faced Trimurti.',
      signif: 'Among the most powerful Shaiva sculptures ever carved; Portuguese sailors named the island for a stone elephant at its landing.',
      trads: ['Basalt relief carving', 'Shaiva iconography', 'Ferry pilgrimage'],
      why: 'A cathedral of Shiva hidden behind commuter ferries.'
    },
    {
      id: 'hampi', name: 'Group of Monuments at Hampi', st: 'ka', place: 'Ballari district',
      lat: 15.3350, lng: 76.4600, cat: 'historic', unesco: true,
      year: '14th\u201316th c. CE', art: 1,
      history: 'Capital of Vijayanagara \u2014 among the world\u2019s largest cities of its age \u2014 until the empire broke in 1565.',
      signif: 'The stone chariot, musical pillars of Vitthala temple and procession-wide bazaar streets sit scattered across a surreal boulder land.',
      trads: ['Granite temple architecture', 'Musical pillar tuning', 'Virupaksha temple festivals'],
      why: 'An empire\u2019s memory written on ten square miles of boulders.'
    },
    {
      id: 'pattadakal', name: 'Group of Monuments at Pattadakal', st: 'ka', place: 'Bagalkot district',
      lat: 15.9460, lng: 75.8170, cat: 'historic', unesco: true,
      year: '7th\u20138th c. CE', art: 3,
      history: 'Where Chalukya kings were crowned, temples experiment side by side in northern nagara and southern dravida styles.',
      signif: 'Virupaksha temple\u2019s carvings informed the Kailasa of Ellora \u2014 the Deccan talking to itself across generations.',
      trads: ['Sandstone temple experiments', 'Coronation-site ritual', 'Narrative friezes'],
      why: 'A laboratory of Indian temple form, still standing.'
    },
    {
      id: 'hoysala-temples', name: 'Sacred Ensembles of the Hoysalas', st: 'ka', place: 'Belur \u00b7 Halebid \u00b7 Somanathapura',
      lat: 13.1650, lng: 75.8550, cat: 'historic', unesco: true,
      year: '12th\u201313th c. CE \u00b7 inscribed 2023', art: 6,
      history: 'Belur, Halebid and Somanathapura raise soapstone temples on star-shaped plinths under Hoysala patronage.',
      signif: 'Thousands of deities, dancers and elephants crowd friezes polished by centuries of touch; lathe-turned pillars ring when struck.',
      trads: ['Soapstone sculpting', 'Star-platform geometry', 'Hoysala emblem craft'],
      why: 'Density of devotion \u2014 every inch carved, nothing left plain.'
    },
    {
      id: 'ramappa', name: 'Ramappa Temple (Rudreshwara)', st: 'tg', place: 'Palampet, Mulugu',
      lat: 17.9990, lng: 79.9320, cat: 'monument', unesco: true,
      year: '1213 CE', art: 0,
      history: 'Recherla Rudra built this Kakatiya sanctuary to Ramappa; bricks so light they float were carried up to the temple roof.',
      signif: 'Sculpted dancers and earthquake-tested pillars have held the shrine steady for eight centuries.',
      trads: ['Floating-brick technology', 'Kakatiya dance sculpture', 'Sand-box foundations'],
      why: 'Engineering so light it floats, so right it survives.'
    },
    {
      id: 'chola-temples', name: 'Great Living Chola Temples', st: 'tn', place: 'Thanjavur',
      lat: 10.7867, lng: 79.1378, cat: 'monument', unesco: true,
      year: '1010 CE onward', art: 4,
      history: 'Rajaraja Chola\u2019s Brihadisvara at Thanjavur, joined later by Gangaikondacholapuram and Darasuram, anchors imperial Chola piety.',
      signif: 'A 66-metre granite vimana raised with near-shadowless precision \u2014 still in daily worship after a millennium.',
      trads: ['Granite vimana construction', 'Lost-wax bronze casting', 'Oduvar hymn singing'],
      why: 'A thousand years of uninterrupted prayer in granite.'
    },
    {
      id: 'mahabalipuram', name: 'Group of Monuments at Mahabalipuram', st: 'tn', place: 'Coromandel Coast',
      lat: 12.6206, lng: 80.1946, cat: 'monument', unesco: true,
      year: '7th\u20138th c. CE', art: 2,
      history: 'Pallava kings carved shore temples, free-standing rathas and the vast Arjuna\u2019s Penance relief directly from beachside granite.',
      signif: 'One of India\u2019s oldest structural stone temples still greets the surf it was carved beside.',
      trads: ['Open-air bas-relief', 'Monolithic ratha carving', 'Shore-temple engineering'],
      why: 'Sculpture the size of landscape, facing the sea that shaped it.'
    },
    {
      id: 'konark', name: 'Sun Temple, Konark', st: 'od', place: 'Puri district',
      lat: 19.8876, lng: 86.0945, cat: 'monument', unesco: true,
      year: '13th c. CE', art: 5,
      history: 'Narasimhadeva I of the Eastern Gangas shaped the sun god\u2019s chariot \u2014 twenty-four carved wheels drawn by seven galloping horses.',
      signif: 'Its wheels double as sundials; Odissi poses freeze across the black pagoda\u2019s flank.',
      trads: ['Khondalite stone dressing', 'Wheel-sundial astronomy', 'Dance sculpture'],
      why: 'Time itself given wheels and pulled toward dawn.'
    },
    {
      id: 'khajuraho', name: 'Khajuraho Group of Monuments', st: 'mp', place: 'Chhatarpur district',
      lat: 24.8510, lng: 79.9180, cat: 'historic', unesco: true,
      year: '950\u20131050 CE', art: 3,
      history: 'The Chandella dynasty raised eighty-five temples; twenty-five survive amid gardens, led by the Kandariya Mahadeva.',
      signif: 'Nagara spires climb like mountain ranges while sculpture holds gods, courtiers, musicians and lovers in equal gaze.',
      trads: ['Nagara shikhara profiles', 'Banded sandstone carving', 'Classical dance iconography'],
      why: 'Proof that the sacred and the sensuous were one vocabulary.'
    },
    {
      id: 'sanchi', name: 'Buddhist Monuments at Sanchi', st: 'mp', place: 'near Vidisha',
      lat: 23.4850, lng: 77.7380, cat: 'historic', unesco: true,
      year: '3rd c. BCE onward', art: 7,
      history: 'Emperor Ashoka began Great Stupa I around 260 BCE; gateways and railings accreted for thirteen centuries after.',
      signif: 'The torana gateways read like carved chronicles of the Buddha\u2019s life \u2014 without showing him once.',
      trads: ['Stupa circumambulation', 'Torana gateway carving', 'Monastic scholarship'],
      why: 'Thirteen hundred years of one faith adding rings to one tree.'
    },
    {
      id: 'bhimbetka', name: 'Rock Shelters of Bhimbetka', st: 'mp', place: 'Raisen district',
      lat: 22.9375, lng: 77.6125, cat: 'historic', unesco: true,
      year: 'Mesolithic onward', art: 2,
      history: 'More than five hundred painted shelters in the Vindhya hills hold hunting scenes, dances and riders across millennia.',
      signif: 'Some cupules may predate recorded history; the Auditorium Rock sheltered gatherings before pottery existed.',
      trads: ['Ochre rock painting', 'White pigment overlay', 'Shelter-side storytelling'],
      why: 'India\u2019s oldest art gallery has no walls \u2014 only hillsides.'
    },
    {
      id: 'champaner-pavagadh', name: 'Champaner-Pavagadh Archaeological Park', st: 'gj', place: 'Panchmahal',
      lat: 22.4860, lng: 73.5350, cat: 'historic', unesco: true,
      year: '15th\u201316th c. CE', art: 1,
      history: 'Mahmud Begada\u2019s capital spread across hill and plain, its water systems, mosques and pavilions unfinished when the court moved on.',
      signif: 'Jami Masjid\u2019s balanced domes mark Gujarat Sultanate architecture at its peak; Kalika Mata hill keeps a pilgrimage alive overhead.',
      trads: ['Sultanate mosque design', 'Stepwell and tank networks', 'Hill-goddess pilgrimage'],
      why: 'A capital caught between ambition and abandonment.'
    },
    {
      id: 'rani-ki-vav', name: 'Rani-ki-Vav Stepwell', st: 'gj', place: 'Patan',
      lat: 23.8500, lng: 72.1150, cat: 'historic', unesco: true,
      year: '11th c. CE', art: 4,
      history: 'Queen Udayamati memorialised her husband Bhima I with a stepwell built like an inverted temple.',
      signif: 'Seven levels descend through five hundred sculptures to water; flood silt hid it for centuries, preserving every figure.',
      trads: ['Solanki stepwell architecture', 'Water conservation craft', 'Sculptural well walls'],
      why: 'A queen\u2019s grief, engineered down to the waterline.'
    },
    {
      id: 'dholavira', name: 'Dholavira: a Harappan City', st: 'gj', place: 'Kadir Island, Rann of Kutch',
      lat: 23.8870, lng: 70.2130, cat: 'historic', unesco: true,
      year: 'c. 2650\u20131450 BCE', art: 7,
      history: 'A Harappan city on Khadir island divided into castle, middle town and lower town, ringed by reservoirs cut from rock.',
      signif: 'Its gateway signboard \u2014 ten large Harappan letters \u2014 hung over the entrance; reservoirs harvested every drop of monsoon.',
      trads: ['Reservoir engineering', 'Harappan urban planning', 'Bead-making craft'],
      why: 'Five-thousand-year-old pipes that still make sense.'
    },
    {
      id: 'ahmedabad', name: 'Historic City of Ahmedabad', st: 'gj', place: 'Sabarmati banks',
      lat: 23.0225, lng: 72.5714, cat: 'historic', unesco: true,
      year: 'founded 1411 CE \u00b7 inscribed 2017', art: 1,
      history: 'From Sultanate walls to pol neighbourhoods to Swaminarayan and Art Deco layers, Ahmedabad reads six centuries in one walk.',
      signif: 'India\u2019s first World Heritage City; the Sidi Saiyyed jali\u2019s stone tree became the city\u2019s signature.',
      trads: ['Pol-house timber craft', 'Jali lattice carving', 'Ahmedabad block printing'],
      why: 'A living city whose archive is its own streetscape.'
    },
    {
      id: 'jaipur-city', name: 'Jaipur City (Pink City)', st: 'rj', place: 'Rajasthan',
      lat: 26.9239, lng: 75.8267, cat: 'monument', unesco: true,
      year: 'founded 1727 CE \u00b7 inscribed 2019', art: 0,
      history: 'Jai Singh II laid a planned grid city under astrological principles; the 1876 pink wash, painted for a royal visit, never washed off.',
      signif: 'Hawa Mahal\u2019s nine-storey facade of windows let palace women watch the street unseen \u2014 architecture as veil and theatre.',
      trads: ['Vedic city planning', 'Pink-stucco maintenance', 'Jaipur blue pottery'],
      why: 'The only planned city of its age still wearing its colour code.'
    },
    {
      id: 'jantar-mantar', name: 'Jantar Mantar, Jaipur', st: 'rj', place: 'Jaipur',
      lat: 26.9247, lng: 75.8120, cat: 'monument', unesco: true,
      year: '1734 CE', art: 3,
      history: 'Jai Singh II\u2019s astronomical park measures the sky in masonry: nineteen instruments including the 27-metre Samrat Yantra sundial.',
      signif: 'Architecture as instrument \u2014 shadows read time, altitude and eclipses to half-minute accuracy.',
      trads: ['Yantra masonry astronomy', 'Observational star tables', 'Restoration surveying'],
      why: 'Science cast in plaster and stone, still keeping time.'
    },
    {
      id: 'hill-forts', name: 'Hill Forts of Rajasthan', st: 'rj', place: 'Chittorgarh & five more',
      lat: 24.8830, lng: 74.6280, cat: 'monument', unesco: true,
      year: '5th\u201318th c. CE \u00b7 inscribed 2013', art: 6,
      history: 'Six great Rajput forts \u2014 Chittorgarh, Kumbhalgarh, Ranthambore, Gagron, Amber and Jaisalmer \u2014 crown ridges across the desert state.',
      signif: 'Kumbhalgarh\u2019s ramparts run some thirty-six kilometres; Jaisalmer\u2019s golden walls still house families within.',
      trads: ['Hill-fort engineering', 'Rajput courtly painting', 'Fort-wall restoration'],
      why: 'Courts that ruled from clouds, defended by geology.'
    },
    {
      id: 'nalanda', name: 'Nalanda Mahavihara', st: 'br', place: 'Nalanda district',
      lat: 25.1390, lng: 85.1370, cat: 'historic', unesco: true,
      year: '5th\u201312th c. CE', art: 7,
      history: 'For seven hundred years Nalanda taught scripture, logic, medicine and astronomy to thousands, drawing scholars such as Xuanzang.',
      signif: 'Its nine-storey library, Dharmaganja, burned for months when the university fell; brick courtyards still hold the layout of study.',
      trads: ['Brick monastery architecture', 'Manuscript copying', 'Scholastic debate'],
      why: 'The world\u2019s first great residential university, in ruins that still teach.'
    },
    {
      id: 'mahabodhi-temple', name: 'Mahabodhi Temple Complex', st: 'br', place: 'Bodh Gaya',
      lat: 24.6961, lng: 84.9911, cat: 'monument', unesco: true,
      year: 'temple 5th\u20136th c. CE \u00b7 site ~2600 yrs', art: 2,
      history: 'Under the descendant of the Bodhi tree the Buddha awakened; Ashoka marked the spot and later dynasties raised the tall pyramidal temple.',
      signif: 'Buddhism\u2019s most sacred address, drawing pilgrims from every country the teaching reached.',
      trads: ['Bodhi-tree veneration', 'Monastic pilgrimage', 'Lotus-stone carving'],
      why: 'Stillness as destination \u2014 the navel of a world religion.'
    },
    {
      id: 'santiniketan', name: 'Santiniketan', st: 'wb', place: 'Birbhum',
      lat: 23.6790, lng: 87.6850, cat: 'historic', unesco: true,
      year: 'from 1901 \u00b7 inscribed 2023', art: 4,
      history: 'Rabindranath Tagore\u2019s father began ashram classes beneath trees; Rabindranath grew them into Visva-Bharati, open to the world.',
      signif: 'Open-air teaching, Baul song and Bengal\u2019s modern art were invented here as one continuous gesture.',
      trads: ['Tree-classroom pedagogy', 'Baul song patronage', 'Pat painting and batik'],
      why: 'A school that believed culture could be a curriculum.'
    },
    {
      id: 'moidams', name: 'Moidams \u2014 Ahom Burial Mounds', st: 'as', place: 'Charaideo',
      lat: 26.8780, lng: 94.7200, cat: 'historic', unesco: true,
      year: '13th\u201319th c. \u00b7 inscribed 2024', art: 3,
      history: 'The Ahom royalty buried their dead in stepped earthen mounds topped with shrines at Charaideo for six centuries.',
      signif: 'India\u2019s newest World Heritage Site \u2014 a Tai-Ahom answer to the pyramids, built of soil and belief.',
      trads: ['Mound-burial ritual', 'Ahom buranji chronicles', 'Meji bamboo craft'],
      why: 'Ancestors kept present under green hills.'
    },
    {
      id: 'old-goa', name: 'Churches and Convents of Goa', st: 'ga', place: 'Old Goa',
      lat: 15.5030, lng: 73.9120, cat: 'monument', unesco: true,
      year: '16th c. CE', art: 5,
      history: 'Portuguese Goa\u2019s churches rose Manuelite, Baroque and Corinthian over the former Adil Shah capital.',
      signif: 'Bom Jesus holds the relics of St Francis Xavier; Se Cathedral fills one of Asia\u2019s largest church interiors with gold altars.',
      trads: ['Laterite church building', 'Baroque gilded altars', 'Goan sacred music'],
      why: 'Asia\u2019s Lisbon \u2014 laterite cathedrals under monsoon skies.'
    },
    {
      id: 'mountain-railways', name: 'Mountain Railways of India', st: 'wb', place: 'Darjeeling',
      lat: 27.0410, lng: 88.2660, cat: 'monument', unesco: true,
      year: '1879\u20131903 \u00b7 inscribed 1999/2005/2008', art: 1,
      history: 'Darjeeling\u2019s toy train zig-zags up to 2,200 metres; Nilgiri\u2019s rack system and Kalka\u2013Shimla\u2019s gallery bridges complete the trio.',
      signif: 'Living engineering museums that still carry schoolchildren and tea workers daily.',
      trads: ['B-class locomotive upkeep', 'Loop-and-reversing operation', 'Hill-railway signalling'],
      why: 'Steam-age ingenuity still clocked in on time.'
    },
    {
      id: 'kaziranga', name: 'Kaziranga National Park', st: 'as', place: 'Brahmaputra floodplain',
      lat: 26.5775, lng: 93.1711, cat: 'natural', unesco: true,
      year: 'protected 1904 \u00b7 WHS 1985', art: 2,
      history: 'A floodplain grassland reserved for the rhinoceros after a 1904 royal visit famously found none left to see.',
      signif: 'Two-thirds of Earth\u2019s greater one-horned rhinos and a dense tiger population share these wetlands.',
      trads: ['Anti-poaching patrols', 'Grassland burning management', 'Community guardianship'],
      why: 'A species walked back from the brink by stubborn care.'
    },
    {
      id: 'manas', name: 'Manas Wildlife Sanctuary', st: 'as', place: 'Bhutan foothills',
      lat: 26.8630, lng: 90.7540, cat: 'natural', unesco: true,
      year: 'WHS 1985', art: 6,
      history: 'At the Bhutan border, Manas guards riverine grasslands where pygmy hog and golden langur survive in few other places.',
      signif: 'A biosphere reserve recovering from conflict years through community-led conservation.',
      trads: ['Bodo community stewardship', 'Riverine grassland ecology', 'Rescue-and-release programmes'],
      why: 'Peace returned to a forest, and the forest answered.'
    },
    {
      id: 'sundarbans', name: 'Sundarbans National Park', st: 'wb', place: 'Ganges\u2013Brahmaputra delta',
      lat: 21.9497, lng: 88.8930, cat: 'natural', unesco: true,
      year: 'WHS 1987', art: 3,
      history: 'Ten thousand square kilometres of tidal mangrove \u2014 the planet\u2019s largest \u2014 shared with Bangladesh across the delta.',
      signif: 'Swimming tigers patrol the roots at high tide; honey collectors pray to Bonbibi before entering.',
      trads: ['Bonbibi forest worship', 'Mangrove honey gathering', 'Storm-buffer planting'],
      why: 'The sea\u2019s nursery and the tiger\u2019s tide-country.'
    },
    {
      id: 'keoladeo', name: 'Keoladeo National Park', st: 'rj', place: 'Bharatpur',
      lat: 27.1320, lng: 77.5430, cat: 'natural', unesco: true,
      year: 'WHS 1985', art: 7,
      history: 'A Maharaja\u2019s duck reserve became one of the world\u2019s most celebrated bird parks \u2014 350-plus species in eleven square kilometres.',
      signif: 'Historic winter home of the Siberian crane; heronries crowd its flooded acacia groves each monsoon.',
      trads: ['Wetland water management', 'Bhat community bird-guiding', 'Migratory ringing studies'],
      why: 'A royal hunting ground converted into a global promise.'
    },
    {
      id: 'nanda-devi', name: 'Nanda Devi & Valley of Flowers', st: 'uk', place: 'Garhwal Himalaya',
      lat: 30.4000, lng: 79.9000, cat: 'natural', unesco: true,
      year: '1988 \u00b7 extended 2005', art: 4,
      history: 'The goddess Nanda\u2019s ringed peak shelters a glacial basin closed even to climbers until 1983; the flower valley joined the listing in 2005.',
      signif: 'Alpine meadows of brahma kamal and blue poppies bloom beneath summits that pilgrims circle barefoot.',
      trads: ['Nanda Devi Raj Jat pilgrimage', 'Brahma kamal offerings', 'Van Gujjar seasonal grazing'],
      why: 'Sacred geography and strict science guarding the same meadow.'
    },
    {
      id: 'ghnp', name: 'Great Himalayan National Park', st: 'hp', place: 'Kullu',
      lat: 31.7330, lng: 77.4800, cat: 'natural', unesco: true,
      year: 'WHS 2014', art: 2,
      history: 'Glaciers feed the Sainj and Tirthan rivers through forest where snow leopard and serow range above village eco-zones.',
      signif: 'Community-conserved buffer zones pioneered here now model Himalayan conservation.',
      trads: ['Community eco-tourism', 'Herbal remedy knowledge', 'Snow leopard monitoring'],
      why: 'Conservation that begins at the village gate.'
    },
    {
      id: 'western-ghats', name: 'Western Ghats', st: 'kl', place: 'Agasthyamala node',
      lat: 8.9700, lng: 77.2800, cat: 'natural', unesco: true,
      year: 'WHS 2012', art: 2,
      history: 'Older than the Himalaya, the Western Ghats wall monsoon clouds into rain along seven sub-clusters down the peninsula.',
      signif: 'Among the world\u2019s eight biodiversity hotspots \u2014 thousands of species live nowhere else, from lion-tailed macaque to night frogs.',
      trads: ['Kani tribal medicine', 'Sacred grove (kavu) protection', 'Spice agroforestry'],
      why: 'The mountains that give India its monsoon, protected as inheritance.'
    },
    {
      id: 'khangchendzonga', name: 'Khangchendzonga National Park', st: 'sk', place: 'Sikkim',
      lat: 27.6000, lng: 88.1500, cat: 'natural', unesco: true,
      year: 'WHS 2016 \u00b7 Mixed', art: 3,
      history: 'Sikkim\u2019s guardian peak and its park became India\u2019s first Mixed Heritage Site, honouring ecosystems and Lepcha-Buddhist sacred geography together.',
      signif: 'Glaciers, lakes and the beyul hidden-land legends of Khangchendzonga share one protected landscape.',
      trads: ['Pang Lhabsol mountain worship', 'Beyul hidden-land lore', 'Mountaineering rituals'],
      why: 'A peak worshipped as a deity, protected as a park.'
    },
    {
      id: 'kutiyattam', name: 'Kutiyattam Sanskrit Theatre', st: 'kl', place: 'Thrissur',
      lat: 10.5276, lng: 76.2144, cat: 'living', unesco: true,
      year: 'ICH 2001', art: 1,
      history: 'India\u2019s oldest living Sanskrit theatre, staged in temple theatres by Chakyar and Nambiar families for some thousand years.',
      signif: 'A pioneer of UNESCO\u2019s Masterpiece list; a single act can unfold over many nights of layered performance.',
      trads: ['Netrabhinaya eye-acting', 'Mizhavu drum accompaniment', 'Guru-house training lineages'],
      why: 'Two millennia of grammar for the human face.'
    },
    {
      id: 'ramlila', name: 'Ramlila \u2014 the Ramayana enacted', st: 'up', place: 'Ayodhya',
      lat: 26.7990, lng: 82.2040, cat: 'living', unesco: true,
      year: 'ICH 2005', art: 5,
      history: 'Tulsidas\u2019 Ramcharitmanas is enacted across north India each autumn; Ayodhya\u2019s banks stage the epic where the story begins.',
      signif: 'Whole towns become the poem \u2014 actors, audiences and lanes merging through nine moonlit nights.',
      trads: ['Manch open-air staging', 'Swang folk dialogue', 'Dussehra effigy craft'],
      why: 'A scripture performed until everyone knows it by heart.'
    },
    {
      id: 'vedic-chanting', name: 'Vedic Chanting', st: 'ka', place: 'Sringeri',
      lat: 13.4220, lng: 75.7860, cat: 'living', unesco: true,
      year: 'ICH 2003/2008', art: 4,
      history: 'Vedic recitation survived three thousand years without scripts \u2014 tonal accents and patha checks locking every syllable.',
      signif: 'Humanity\u2019s earliest composed texts, transmitted by breath and discipline alone.',
      trads: ['Ghana patha chanting', 'Gurukula memorisation', 'Accent-mark preservation'],
      why: 'Memory as instrument, precision as devotion.'
    },
    {
      id: 'ramman', name: 'Ramman Festival Theatre', st: 'uk', place: 'Saloor-Dungra, Chamoli',
      lat: 30.5500, lng: 79.5500, cat: 'living', unesco: true,
      year: 'ICH 2009', art: 6,
      history: 'A Garhwali ritual masked dance-drama honouring Bhairava, performed annually through Saloor-Dungra\u2019s courtyards.',
      signif: 'Each caste and family owns specific roles \u2014 the performance maps the village\u2019s own social order.',
      trads: ['Mask carving', 'Jagar spirit-song', 'Drum-led choreography'],
      why: 'One village\u2019s calendar holding an entire cosmology.'
    },
    {
      id: 'mudiyettu', name: 'Mudiyettu Ritual Theatre', st: 'kl', place: 'Periyar basin',
      lat: 10.1000, lng: 76.3500, cat: 'living', unesco: true,
      year: 'ICH 2010', art: 0,
      history: 'Before dawn performers draw Bhadrakali\u2019s giant face in powders; by night they wear her story as sacred dance.',
      signif: 'Ritual theatre of the goddess\u2019s victory, absorbing local heroes into its cast as it travels village to village.',
      trads: ['Kalam powder drawing', 'Chuvanna vesham costuming', 'Percussion narration'],
      why: 'Painting, drum and dance fused into one rite.'
    },
    {
      id: 'kalbelia', name: 'Kalbelia Songs & Dances', st: 'rj', place: 'Thar edge',
      lat: 26.4870, lng: 74.5510, cat: 'living', unesco: true,
      year: 'ICH 2010', art: 7,
      history: 'Spiral dances and improvised songs of the Kalbeliya community, whose foremothers moved with snake-catching trades.',
      signif: 'Verses pass news, satire and genealogy \u2014 an oral newspaper kept in rhythm.',
      trads: ['Been pipe playing', 'Dap percussion', 'Mirrored costume craft'],
      why: 'A community\u2019s history sung because it was never written.'
    },
    {
      id: 'chhau', name: 'Chhau Dance', st: 'wb', place: 'Purulia',
      lat: 23.3300, lng: 86.3600, cat: 'living', unesco: true,
      year: 'ICH 2010', art: 3,
      history: 'Masked martial dance from Purulia \u2014 with Mayurbhanj and Seraikella siblings \u2014 dramatising epics at spring\u2019s Chaitra Parva.',
      signif: 'Mask-makers and dancer families train together; mock-combat footwork carries battlefield memory.',
      trads: ['Purulia mask sculpting', 'Dhol-dhamsa drumming', 'Combat choreography'],
      why: 'War remembered as festival, masks turning men into gods.'
    },
    {
      id: 'ladakh-chanting', name: 'Buddhist Chanting of Ladakh', st: 'la', place: 'Leh gompas',
      lat: 34.1642, lng: 77.5848, cat: 'living', unesco: true,
      year: 'ICH 2012', art: 3,
      history: 'Lamas chant Mahayana sutras with philosophical debate and masked cham dances across Ladakh\u2019s monasteries.',
      signif: 'Hemis and other gompas keep Tibetan Buddhist liturgy alive on the rooftop of India.',
      trads: ['Multiphonic chant', 'Cham mask dance', 'Butter-sculpture offerings'],
      why: 'Voice as architecture \u2014 sound filling mountain halls.'
    },
    {
      id: 'sankirtana', name: 'Sankirtana Ritual Singing', st: 'mn', place: 'Imphal',
      lat: 24.8170, lng: 93.9368, cat: 'living', unesco: true,
      year: 'ICH 2013', art: 5,
      history: 'Manipuri Vaishnav drum-and-song ritual marks every life ceremony, temple festival and season of the Manipur year.',
      signif: 'Pung cholom drummers leap and spin while playing \u2014 percussion as devotional athletics.',
      trads: ['Pung drum playing', 'Kirtan narration', 'Nat sankirtana ensemble'],
      why: 'A state\u2019s heartbeat measured in drum circles.'
    },
    {
      id: 'thatheras', name: 'Brass & Copper Craft of the Thatheras', st: 'pb', place: 'Jandiala Guru',
      lat: 31.5600, lng: 74.9860, cat: 'living', unesco: true,
      year: 'ICH 2014', art: 6,
      history: 'Smiths of Jandiala Guru hammer brass and copper utensils in open courtyards, a trade organised since the era of Guru Ram Das.',
      signif: 'Open-hearth technique unchanged for generations; UNESCO listing sparked apprentice revival programmes.',
      trads: ['Open-hearth annealing', 'Communal bhatti workshops', 'Engraved vessel finishing'],
      why: 'Hammer-rhythm as inheritance, listed so it stays.'
    },
    {
      id: 'yoga', name: 'Yoga', st: 'uk', place: 'Rishikesh',
      lat: 30.0869, lng: 78.2676, cat: 'living', unesco: true,
      year: 'ICH 2016', art: 2,
      history: 'From Patanjali\u2019s sutras to ghat-side schools, yoga\u2019s philosophy and practice matured along Himalayan riverbanks.',
      signif: 'Inscribed by UNESCO as living philosophy \u2014 India\u2019s most-shared practice of attention and wellbeing.',
      trads: ['Ashtanga limb practice', 'Guru-shishya transmission', 'Ghat-side morning sadhana'],
      why: 'An ancient science of attention, still evolving.'
    },
    {
      id: 'kumbh-mela', name: 'Kumbh Mela', st: 'up', place: 'Prayagraj',
      lat: 25.4358, lng: 81.8463, cat: 'living', unesco: true,
      year: 'ICH 2017', art: 0,
      history: 'At the Triveni Sangam of Ganga, Yamuna and the hidden Saraswati, tens of millions gather through Kumbh cycles to bathe at auspicious hours.',
      signif: 'The largest peaceful assembly on earth, organised around akhara procession orders centuries old.',
      trads: ['Shahi snan processions', 'Akhara camp governance', 'Kalpavasi vows'],
      why: 'Faith logistics at a scale no state could design.'
    },
    {
      id: 'durga-puja', name: 'Durga Puja in Kolkata', st: 'wb', place: 'Kolkata',
      lat: 22.5726, lng: 88.3639, cat: 'living', unesco: true,
      year: 'ICH 2021', art: 1,
      history: 'What began as household worship became para-wide pandal art \u2014 Kolkata builds temporary worlds every autumn.',
      signif: 'Theme pandals commission sculpture, installation and social commentary; five days reorder the entire city.',
      trads: ['Pandal theme architecture', 'Kumortuli idol craft', 'Dhak processions'],
      why: 'An art biennale that appears and dissolves, yearly.'
    },
    {
      id: 'garba', name: 'Garba of Gujarat', st: 'gj', place: 'Vadodara',
      lat: 22.3072, lng: 73.1812, cat: 'living', unesco: true,
      year: 'ICH 2023', art: 4,
      history: 'Nine nights of Navaratri circle dancers orbit a lit garbo lamp, celebrating the divine feminine across Gujarat and its diaspora.',
      signif: 'India\u2019s newest inscription (2023); grandmothers and schoolchildren alike form concentric seas of clapped rhythm.',
      trads: ['Taali clap-pattern variants', 'Garbo lamp crafting', 'Dandiya raas pairing'],
      why: 'Devotion you can join in one step.'
    },
    {
      id: 'lothal', name: 'Lothal', st: 'gj', place: 'Sabarmati basin',
      lat: 22.5230, lng: 72.2550, cat: 'historic', unesco: false,
      year: 'c. 2400 BCE', art: 7,
      history: 'A Harappan port town whose brick dockyard connected inland craft factories to Arabian Sea trade routes.',
      signif: 'Often cited as the world\u2019s earliest known dockyard; bead kilns and warehouses outline a mercantile civilisation.',
      trads: ['Dockyard hydraulics', 'Carnelian bead drilling', 'Warehouse logistics'],
      why: 'Globalisation\u2019s oldest Indian address.'
    },
    {
      id: 'sarnath', name: 'Sarnath', st: 'up', place: 'near Varanasi',
      lat: 25.3811, lng: 83.0260, cat: 'historic', unesco: false,
      year: 'from 5th c. BCE', art: 2,
      history: 'In the deer park at Sarnath the Buddha preached his first sermon; Ashoka crowned the site with its lion capital.',
      signif: 'That lion capital became India\u2019s national emblem; Dhamek Stupa still draws monks from every Buddhist nation.',
      trads: ['Ashokan pillar polishing', 'Mulagandha-kuti murals', 'Deer-park circumambulation'],
      why: 'Where the wheel of dharma first turned.'
    },
    {
      id: 'gwalior-fort', name: 'Gwalior Fort', st: 'mp', place: 'Gwalior',
      lat: 26.2300, lng: 78.1680, cat: 'historic', unesco: false,
      year: 'records from 525 CE', art: 3,
      history: 'Babur called it the pearl among fortresses; its cliff carries Man Singh\u2019s palace, Sas-Bahu temples and Jain colossi cut into rock.',
      signif: 'Zero-mile centre of Indian music \u2014 Tansen lies buried nearby, and the Gwalior gharana carries his lineage.',
      trads: ['Cliff-palace masonry', 'Jain rock-cut statuary', 'Gwalior gharana singing'],
      why: 'A fortress that doubled as a conservatory of song.'
    },
    {
      id: 'kangra-fort', name: 'Kangra Fort', st: 'hp', place: 'Kangra valley',
      lat: 32.1000, lng: 76.2700, cat: 'historic', unesco: false,
      year: 'ancient Trigarta', art: 4,
      history: 'Above the Banganga gorge stand walls linked by record and legend to the ancient Trigarta kingdom.',
      signif: 'Jahangir\u2019s gateway, temple ruins and Kangra miniature painting\u2019s refinement share one ridge.',
      trads: ['Kangra miniature painting', 'Dry-hill masonry', 'Pahari court patronage'],
      why: 'Paintings soft as mist grew from hard grey stone.'
    },
    {
      id: 'rajgir', name: 'Rajgir (Rajagriha)', st: 'br', place: 'Nalanda district',
      lat: 25.0300, lng: 85.4200, cat: 'historic', unesco: false,
      year: 'pre-Mauryan Magadha', art: 6,
      history: 'Magadha\u2019s early capital is ringed by cyclopean walls older than most monuments in India; the Buddha meditated at Griddhakuta here.',
      signif: 'The first Buddhist council convened at Saptaparni caves; hot springs keep pilgrimage lively.',
      trads: ['Cyclopean walling', 'Hot-spring bathing ritual', 'Council-cave commemoration'],
      why: 'Councils met here before empires learned capitals.'
    },
    {
      id: 'warangal-fort', name: 'Warangal Fort', st: 'tg', place: 'Warangal',
      lat: 17.9689, lng: 79.5940, cat: 'historic', unesco: false,
      year: '12th\u201314th c. CE', art: 0,
      history: 'The Kakatiya capital Orugallu raised four grand gateways whose carved thoranas outlive the city they guarded.',
      signif: 'Crisp Kakatiya sculpture links Warangal to Ramappa; Ekashila hill keeps temple cores within the quadruple gates.',
      trads: ['Thorana gateway carving', 'Tank irrigation systems', 'Perini martial dance'],
      why: 'Gateways standing like exclamation marks of a lost capital.'
    },
    {
      id: 'kuldhara', name: 'Kuldhara', st: 'rj', place: 'near Jaisalmer',
      lat: 26.8770, lng: 69.8520, cat: 'historic', unesco: false,
      year: 'abandoned c. 1825', art: 5,
      history: 'Eighty-four Paliwal Brahmin villages around Kuldhara stood empty overnight two centuries ago; the reasons are still argued.',
      signif: 'Grid-planned streets, homes and tanks remain legible in golden stone \u2014 an unplanned museum of desert urbanism.',
      trads: ['Desert town planning', 'Paliwal water harvesting', 'Folk memory of migration'],
      why: 'A whole civilisation\u2019s absence, still measurable in streets.'
    },
    {
      id: 'meenakshi-temple', name: 'Meenakshi Amman Temple', st: 'tn', place: 'Madurai',
      lat: 9.9252, lng: 78.1198, cat: 'monument', unesco: false,
      year: 'current gopurams 16th\u201317th c.', art: 0,
      history: 'Nayaka rulers rebuilt Meenakshi Amman\u2019s temple city around a goddess who here precedes the god in precedence and ritual.',
      signif: 'Fourteen towers \u2014 the tallest 51.9 metres \u2014 and a thousand-pillared hall; Tirukalyanam re-enacts the divine wedding each April.',
      trads: ['Gopuram stucco repainting', 'Thousand-pillar acoustics', 'Chithirai festival processions'],
      why: 'A city that still orbits its goddess.'
    },
    {
      id: 'golden-temple', name: 'Golden Temple (Harmandir Sahib)', st: 'pb', place: 'Amritsar',
      lat: 31.6200, lng: 74.8765, cat: 'monument', unesco: false,
      year: 'founded 1581 \u00b7 gilded by 1830', art: 4,
      history: 'Guru Arjan raised Harmandir Sahib open on all four sides; Ranjit Singh later plated its dome and upper walls in gold.',
      signif: 'Its langar feeds around a hundred thousand people daily regardless of faith \u2014 service as theology.',
      trads: ['Kar seva volunteer building', 'Langar kitchen service', 'Continuous kirtan'],
      why: 'The only monument whose greatest treasure leaves through its kitchen.'
    },
    {
      id: 'mysore-palace', name: 'Mysore Palace (Ambavilas)', st: 'ka', place: 'Mysuru',
      lat: 12.3052, lng: 76.6552, cat: 'monument', unesco: false,
      year: 'rebuilt 1912', art: 6,
      history: 'After fire took the wooden Wodeyar palace, architect Henry Irwin rebuilt Ambavilas in Indo-Saracenic splendour by 1912.',
      signif: 'Dasara nights illuminate it with nearly a hundred thousand bulbs \u2014 a throne room turned civic festival.',
      trads: ['Dasara illumination', 'Mysore painting patronage', 'Ivory-inlaid doors'],
      why: 'A kingdom\u2019s drawing room opened to the public forever.'
    },
    {
      id: 'charminar', name: 'Charminar', st: 'tg', place: 'Hyderabad',
      lat: 17.3616, lng: 78.4747, cat: 'monument', unesco: false,
      year: '1591', art: 1,
      history: 'Quli Qutb Shah raised four 48-metre minarets over his new city\u2019s crossroads \u2014 gratitude and urban anchor in one monument.',
      signif: 'Hyderabad\u2019s heart still beats around it: bangles, pearls and biryani lanes radiate from its arches.',
      trads: ['Laad bazaar lacquer bangles', 'Qutb Shahi stucco ornament', 'Pearl trading'],
      why: 'A roundabout with soul.'
    },
    {
      id: 'gateway-of-india', name: 'Gateway of India', st: 'mh', place: 'Mumbai',
      lat: 18.9220, lng: 72.8347, cat: 'monument', unesco: false,
      year: '1924', art: 5,
      history: 'George Wittet\u2019s basalt arch commemorated George V\u2019s 1911 landing; the last British troops departed beneath it in 1948.',
      signif: 'Mumbai\u2019s ceremonial front door to the harbour, with ferries for Elephanta leaving from its steps.',
      trads: ['Basalt arch construction', 'Indo-Saracenic detailing', 'Harbour ferry tradition'],
      why: 'Arrival and farewell carved into one arch.'
    },
    {
      id: 'india-gate', name: 'India Gate', st: 'dl', place: 'New Delhi',
      lat: 28.6129, lng: 77.2295, cat: 'monument', unesco: false,
      year: '1921', art: 3,
      history: 'Lutyens\u2019 forty-two-metre arch honours soldiers of the First World War; the Amar Jawan flame burned below for half a century.',
      signif: 'Lawns around the arch host the Republic Day parade route \u2014 memory and celebration sharing one axis.',
      trads: ['Sandstone arch engineering', 'Eternal-flame memorial', 'Republic Day ceremonies'],
      why: 'A nation\u2019s thanks written in stone and parade.'
    },
    {
      id: 'victoria-memorial', name: 'Victoria Memorial', st: 'wb', place: 'Kolkata',
      lat: 22.5448, lng: 88.3426, cat: 'monument', unesco: false,
      year: '1921', art: 7,
      history: 'William Emerson\u2019s white Makrana marble hall memorialised Queen Victoria, blending British and Mughal dome traditions.',
      signif: 'Twenty-five galleries guard paintings and manuscripts of an era kept honestly, contradictions included.',
      trads: ['Makrana marble cladding', 'Angel-of-Victory weathervane', 'Gallery conservation'],
      why: 'Empire\u2019s album preserved without varnish.'
    },
    {
      id: 'mehrangarh', name: 'Mehrangarh Fort', st: 'rj', place: 'Jodhpur',
      lat: 26.2975, lng: 73.0209, cat: 'monument', unesco: false,
      year: 'founded 1459', art: 2,
      history: 'Rao Jodha moved his capital to a 125-metre cliff; successive rulers thickened its walls until cannonballs stuck.',
      signif: 'Museum halls of howdahs, cradles and turbans overlook the blue-washed Brahmpuri quarter below.',
      trads: ['Cliff-fort ramparts', 'Mirror-and-gilt panel work', 'Battle-scarred gate doors'],
      why: 'The blue city looks up; the fortress looks down, amused.'
    },
    {
      id: 'gol-gumbaz', name: 'Gol Gumbaz', st: 'ka', place: 'Vijayapura (Bijapur)',
      lat: 16.8400, lng: 75.7400, cat: 'monument', unesco: false,
      year: '1656', art: 1,
      history: 'Mohammed Adil Shah\u2019s mausoleum spans one of the world\u2019s largest single-chamber domes \u2014 forty-four metres across, unsupported.',
      signif: 'Its whispering gallery carries a murmur seven times around the dome\u2019s lip.',
      trads: ['Deccan dome engineering', 'Whispering-gallery acoustics', 'Naqqar khana drums'],
      why: 'An emperor buried inside his own echo.'
    }
  ]
};

window.ECHOES_HERITAGE = ECHOES_HERITAGE;

/* ==========================================================================
   PHASE 4 DATA — CULTURE AT RISK
   Statistics cite their sources; statuses are editorial assessments
   modelled on UNESCO endangerment degrees. Tone: aware, never hopeless.
   ========================================================================== */

var ECHOES_RISK = {
  stats: [
    { v: 197, label: 'languages on UNESCO\u2019s endangerment list for India', src: 'UNESCO Atlas of the World\u2019s Languages in Danger' },
    { v: 220, label: 'languages lost in India since the 1961 Census', src: 'People\u2019s Linguistic Survey of India' },
    { v: 19569, label: 'distinct mother tongues recorded in one Census', src: 'Census of India 2011', comma: true },
    { v: 15, label: 'living traditions on UNESCO\u2019s intangible lists \u2014 revival is possible', src: 'UNESCO ICH \u00b7 India', hope: true }
  ],
  efforts: [
    { era: '2003 \u2192', title: 'Geographical Indication tags', text: 'GI registration protects crafts such as Kanchipuram silk, Patan patola, Toda embroidery and Kashmir namda against imitation \u2014 keeping origin value with the makers.' },
    { era: '2001\u20132023 \u2192', title: 'UNESCO intangible inscriptions', text: 'From Kutiyattam theatre to Gujarat\u2019s garba, fifteen Indian traditions are now inscribed \u2014 unlocking documentation, fellowships and pride.' },
    { era: '2010 \u2192', title: 'People\u2019s Linguistic Survey', text: 'Volunteers documented 780+ living languages state by state, giving small speech communities a written presence for the first time.' },
    { era: 'Ongoing \u2192', title: 'Handloom identity schemes', text: 'The India Handloom Brand and cluster programmes connect weavers \u2014 roughly 35 lakh livelihoods \u2014 directly to urban buyers.' },
    { era: 'Ongoing \u2192', title: 'Akademis & gurukuls', text: 'Sangeet Natak Akademi awards, Kalakshetra training and gurukul stipends keep performance lineages teaching.' }
  ],
  actions: [
    { icon: 'buy', title: 'Buy from the maker', text: 'Choose GI-tagged and cooperative craft over machine copies \u2014 the price difference funds apprenticeships.' },
    { icon: 'learn', title: 'Learn a practice', text: 'Take a term of Carnatic sangeet, a kalari workshop, a phad-painting course. Students keep teachers alive.' },
    { icon: 'record', title: 'Record your elders', text: 'One evening of family songs, recipes and lullabies saved on a phone is real archiving.' },
    { icon: 'audience', title: 'Be the audience', text: 'Show up for folk festivals and temple theatre. Traditions die of empty halls before they die of time.' },
    { icon: 'support', title: 'Support the documenters', text: 'Language archives, craft museums and community trusts run on small donations and steady attention.' }
  ],
  compares: [
    {
      key: 'tongues', title: 'The courtyard of voices',
      thenLabel: 'Then', thenCap: 'A single courtyard could hold a dozen tongues \u2014 each carrying its own songs, proverbs and lullabies.',
      nowLabel: 'Now', nowCap: '197 of India\u2019s languages sit on UNESCO\u2019s danger list. Each silence takes a whole way of seeing.'
    },
    {
      key: 'loom', title: 'The warp of the valley',
      thenLabel: 'Loom age', thenCap: 'Whole villages once dressed themselves from neighbourhood looms, thread spun within walking distance.',
      nowLabel: 'Mill age', nowCap: 'About 35 lakh handloom livelihoods remain \u2014 treasured, yet pressed hard by power-loom copies.'
    }
  ],
  cards: [
    {
      id: 'anda-langs', cat: 'Languages', st: 'an', place: 'Andaman Islands', status: 'critical',
      title: 'Great Andamanese voices',
      what: 'A family of languages spoken across the Andamans for millennia, now carried by only a few elderly speakers.',
      why: 'Colonial disease, displacement and forced settlement collapsed speaker numbers within a century.',
      change: 'When Boa Sr died in 2010, the Bo language fell silent with her \u2014 a recorded lament is now its archive.',
      done: 'Field recordings, dictionaries and community teaching programmes preserve what remains.',
      help: 'Support tribal-research institutes and language archives that document with communities, not just about them.'
    },
    {
      id: 'pabuji-phad', cat: 'Oral traditions', st: 'rj', place: 'Bhilwara & Shahpura', status: 'endangered',
      title: 'Pabuji ki Phad epic',
      what: 'Bhopa priest-singers unroll a thirty-foot painted scroll and narrate the epic of Pabuji through the night, lamp in hand.',
      why: 'Screen-era entertainment and migration thin the audiences that once filled village squares.',
      change: 'Fewer young bhopas apprentice; phad painters now sell scrolls as art rather than as stage.',
      done: 'Phad painting holds a GI tag, and festivals invite bhopas to city stages.',
      help: 'Attend a phad performance; buy scrolls from painters who still paint for the road, not only the gallery.'
    },
    {
      id: 'patola', cat: 'Crafts', st: 'gj', place: 'Patan, Gujarat', status: 'endangered',
      title: 'Double-ikat patola weaving',
      what: 'Silk saris whose warp and weft are tie-dyed before weaving, so the pattern emerges in perfect alignment \u2014 six months to a year per sari.',
      why: 'Machine-printed imitations sell for a fraction, undercutting a craft only a few Salvi families still practise.',
      change: 'The workshop count has shrunk to a handful of family ateliers in Patan itself.',
      done: 'A GI tag protects the name; museum exhibitions and bridal demand keep looms threaded.',
      help: 'Buy certified Patan patola \u2014 the certificate funds the years of training behind it.'
    },
    {
      id: 'namda', cat: 'Crafts', st: 'jk', place: 'Kashmir', status: 'endangered',
      title: 'Namda felt-rug making',
      what: 'Woollen rugs felted by hand with soap and water, embroidered with aari chains \u2014 a Kashmiri winter craft of Central Asian descent.',
      why: 'Cheap machine-made rugs flooded the market; the 2014 floods damaged workshops and raw-wool supply.',
      change: 'Artisan numbers fell sharply as younger workers shifted trades.',
      done: 'A GI tag arrived in 2023, with skill programmes reviving felting among new artisans.',
      help: 'Gift a handmade namda; each rug keeps felting vats steaming through another winter.'
    },
    {
      id: 'toda-emb', cat: 'Crafts', st: 'tn', place: 'Nilgiris', status: 'vulnerable',
      title: 'Toda embroidery',
      what: 'Red-and-black counted-thread embroidery worked on white cloth by Toda women of the Nilgiri hills.',
      why: 'The Toda are a small community; machine copies dilute demand and younger women balance town jobs.',
      change: 'A GI tag (2013) and cooperative sales have steadied income for practising households.',
      done: 'Cooperatives and tribal-development programmes run training and direct-sale exhibitions.',
      help: 'Buy from Toda cooperatives directly; the pattern books are the community\u2019s own.'
    },
    {
      id: 'kalbelia-risk', cat: 'Performance', st: 'rj', place: 'Thar villages', status: 'vulnerable',
      title: 'Kalbelia song & dance',
      what: 'The spiral dances and improvised songs of the Kalbeliya community, inscribed by UNESCO in 2010.',
      why: 'Sedentarisation and stigma around the community\u2019s former trades press the tradition from inside.',
      change: 'Insclusion brought festivals and pride \u2014 young dancers now perform on national stages.',
      done: 'UNESCO listing, state awards and Kalbelia-run troupes keep the repertoire circulating.',
      help: 'Book community-run troupes for events; pay the performers directly.'
    },
    {
      id: 'bhavai', cat: 'Performance', st: 'rj', place: 'North Gujarat & Rajasthan', status: 'endangered',
      title: 'Bhavai folk theatre',
      what: 'All-night open-air theatre of satire and devotion, where Bhavaiyar troupes play gods, kings and gossip alike on a single bhungal-bright stage.',
      why: 'Village patronage faded as media moved indoors; the all-night format asks stamina modern evenings rarely give.',
      change: 'Troupes compress performances to festival slots; some forms survive inside school curricula.',
      done: 'State akademis record productions and honour senior performers; heritage clubs host revivals.',
      help: 'Host or sponsor a full-length bhavai night in your town \u2014 audiences are the patronage now.'
    },
    {
      id: 'stepwells', cat: 'Architecture', st: 'rj', place: 'Arid western India', status: 'vulnerable',
      title: 'Living stepwell culture',
      what: 'Baolis and vavs \u2014 inverted temples of water \u2014 that once ordered whole towns\u2019 days around their flights of steps.',
      why: 'Piped water and falling aquifers made stepwells obsolete; many silted, collapsed or became dumping grounds.',
      change: 'Restoration trusts and water-harvesting programmes are re-digging wells and re-teaching their science.',
      done: 'Urban-heritage bylaws and NGOs restore stepwells as public spaces and rainwater recharge points.',
      help: 'Visit restored stepwells, support local water charities \u2014 use funds revival.'
    }
  ]
};

window.ECHOES_RISK = ECHOES_RISK;