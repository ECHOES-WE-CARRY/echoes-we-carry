/* ==========================================================================
   ECHOES WE CARRY - CULTURAL ATLAS OF INDIA - DATA
   Reusable, data-driven cultural profiles for all 28 states and 8 UTs,
   keyed by stable id. Works on file:// - no fetch required.
   ----------
   Each profile carries 14 sections:
     1 land / 2 history (timeline) / 3 architecture / 4 arts / 5 music /
     6 dance / 7 dress / 8 beliefs / 9 food / 10 festivals / 11 crafts /
     12 heritage / 13 thenNow / 14 wonder
   "The Wonder We Carry" is a curated selection, never an official ranking.
   ========================================================================== */

var ECHOES_ATLAS = {
"tn": {
    id: "tn", name: "Tamil Nadu", type: "State", region: "South",
    capital: "Chennai", languages: ["Tamil"],
    preview: "Temple cities, Bharatanatyam and Chettinad spice - a land of bronze, silk and song carried from the Sangam age onward.",
    profile: {
      land: "Tamil Nadu folds the long Coromandel coast into the Cauvery delta, rising through dry Deccan uplands to the green Western Ghats. Its rivers - Cauvery, Vaigai, Tamaraparani - fed an ancient agrarian and temple civilisation.",
      history: [
        { era: "Sangam age", span: "c. 3rd c. BCE - 3rd c. CE", text: "Sangam court poetry describes the Chola, Chera and Pandya dynasties, thriving ports and a brilliant literary culture." },
        { era: "Imperial Cholas", span: "c. 9th - 13th c.", text: "The Cholas ruled a maritime empire from Thanjavur and raised the great Brihadisvara Temple as the axis of their order." },
        { era: "Vijayanagara - Nayaka courts", span: "14th - 17th c.", text: "Temple cities grew, Madurai gained its vast gopuras, and Bharatanatyam and Carnatic music took formal shape." },
        { era: "Modern Tamil Nadu", span: "19th c. - present", text: "A literary and Dravidian renaissance, a vibrant Tamil cinema, and a self-respect movement that reshaped public life." }
      ],
      architecture: [
        { name: "Brihadisvara Temple", place: "Thanjavur", type: "Great Living Chola Temple", note: "Built by Rajaraja Chola I around 1010 CE; its 66-metre granite vimana crowns a masterpiece of imperial construction." },
        { name: "Mahabalipuram monuments", place: "Mamallapuram", type: "Rock-cut monuments", note: "Shore temples and cliff reliefs carved from living granite in the 7th and 8th centuries." },
        { name: "Meenakshi Amman Temple", place: "Madurai", type: "Temple city", note: "A labyrinth of painted halls and towering gopuras around which the old city turns." }
      ],
      arts: "The lost-wax Chola bronze is Tamil Nadu's signature art - molten metal forever renewing the figure of Nataraja, Shiva as cosmic dancer. Equally living are Tanjore painting, threshold kolam drawings and the ritual clay images of villages.",
      music: "Carnatic music matured here; Tyagaraja, Muthuswami Dikshitar and Syama Sastri are its canonical composers. The mridangam, veena, violin and temple nadaswaram carry the raga tradition to the concert stage.",
      dance: "Bharatanatyam, with its grammar of adavu (movement) and abhinaya (expression), was born in the temple and reformed for the modern stage in the twentieth century.",
      dress: "Kanchipuram silk saris are woven with gold zari in deep reds, ochres and saffrons; cotton handlooms and the simple folded veshti speak a deep weaving lineage.",
      beliefs: "The Bhakti hymns of the Saiva Nayanars and Vaishnava Azhvars turned temples into communities of song. Temple festivals, household goddesses and the sacred everyday of river and village still order the Tamil year.",
      food: [
        { dish: "Chettinad Chicken", region: "Chettinad, Karaikkudi", description: "Chicken in a bold marinade of dried chilli, fennel, star anise and black pepper.", context: "The Chettiar merchants' trade routes returned as a sharp, aromatic cuisine linking Tamil towns to Southeast Asia." },
        { dish: "Idli and Sambar", region: "Across Tamil Nadu", description: "Steamed fermented rice-urad cakes with a tangy lentil and vegetable stew.", context: "The everyday breakfast; fermentation as ancient kitchen science." },
        { dish: "Pongal", region: "Tamil Nadu", description: "Rice and moong dal cooked with milk, ghee, pepper and turmeric.", context: "The dish that gives the harvest festival its name, boiled over in the sun." }
      ],
      festivals: [
        { name: "Pongal", note: "The four-day January harvest festival of overflowing pots, fresh kolams and jallikattu." },
        { name: "Natyanjali, Chidambaram", note: "A dance homage at the Nataraja temple where movement becomes worship." },
        { name: "Meenakshi Tirukalyanam", note: "The divine wedding of Minakshi and Sundareswar, processioned through Madurai." }
      ],
      crafts: [
        { craft: "Kanchipuram Silk", place: "Kanchipuram", note: "Temple-border saris in pure silk and gold zari, the heirloom of weddings." },
        { craft: "Chola Bronzes", place: "Swamimalai", note: "Lost-wax casting in an unbroken line of more than a thousand years." },
        { craft: "Tanjore Painting", place: "Thanjavur", note: "Religious images in gouache, gold leaf and set stones." }
      ],
      heritage: [
        { site: "Great Living Chola Temples", type: "UNESCO World Heritage", note: "Brihadisvara and its peers, still in worship." },
        { site: "Group of Monuments at Mahabalipuram", type: "UNESCO World Heritage", note: "Shore temples and granite wonders of Pallava engineering." }
      ],
      thenNow: [
        { theme: "Temple as stage", then: "Music and dance were pledged to the temple as ritual service.", now: "Bharatanatyam moved to the proscenium stage through twentieth-century reform - the ritual memory survives in every performance.", note: "Ritual became citizenship." },
        { theme: "Silk of Kanchipuram", then: "Weavers worked the zari in the closed looms of the temple town.", now: "Cooperatives and fair-trade looms have opened the craft while keeping the handloom.", note: "Same eyes, same patience, new hands." }
      ],
      wonder: {
        type: "architectural",
        title: "Brihadisvara Temple, Thanjavur",
        note: "A granite vimana still worshipping a thousand years after consecration - stone that refuses to stop being a prayer."
      }
    }
  },
"ap": {
    id: "ap", name: "Andhra Pradesh", type: "State", region: "South",
    capital: "Amaravati", languages: ["Telugu"],
    preview: "The great stupa of Amaravati, Kuchipudi's flying drama and gongura's tang - Andhra carries the dharma and song of the eastern Deccan.",
    profile: {
      land: "The Godavari and Krishna deltas spread paddy along the coast before the land climbs through the Nallamala hills to the drier Rayalaseema uplands.",
      history: [
        { era: "Satavahanas", span: "c. 1st c. BCE - 3rd c. CE", text: "The first Deccan empire, patrons of the great Amaravati stupa." },
        { era: "Ikshvaku - Chalukya years", span: "3rd - 11th c.", text: "Buddhist and later Hindu patronage shaped the Krishna valley." },
        { era: "Vijayanagara age", span: "14th - 17th c.", text: "Telugu literature and temple art flowered across the Deccan." },
        { era: "Modern Andhra", span: "1953 - present", text: "India's first linguistic state, reshaped by Telangana's separation in 2014." }
      ],
      architecture: [
        { name: "Amaravati Stupa", place: "Amaravati", type: "Buddhist monument", note: "A great stupa of the ancient world, its carvings now at Madras Museum." },
        { name: "Lepakshi Temple", place: "Anantapur", type: "Vijayanagara temple", note: "A hanging pillar and superb murals of the sixteenth century." }
      ],
      arts: "Kalamkari painted cloths, Etikoppaka lacquer toys, Telugu cinema and literature carry the state's story arts.",
      music: "Carnatic devotion is largely sung in Telugu - the tongue of Tyagaraja's kirtanas - beside the folk janapadam songs.",
      dance: "Kuchipudi melds classical nritta with playful storytelling; Burrakatha narrators still tour with drum and single string.",
      dress: "Mangalagiri cottons, Venkatagiri weaves and gold-bordered delta silks mark the Telugu celebration wardrobe.",
      beliefs: "Tirumala's Venkateswara draws the Hindu world's greatest pilgrim tide; Srisailam and Ahobilam deepen the yatra circuit.",
      food: [
        { dish: "Gongura Chicken", region: "Andhra", description: "Chicken simmered with sorrel leaves, bright and tangy.", context: "The emblem of Telugu sour." },
        { dish: "Pulihora", region: "Coastal", description: "Tamarind rice with peanuts and curry leaves.", context: "Temple prasadam and journey food." },
        { dish: "Rayalaseema Mutton", region: "Rayalaseema", description: "Mutton curry loud with dried red chilli.", context: "The celebrated fiery Andhra idiom." }
      ],
      festivals: [
        { name: "Ugadi", note: "The Telugu new year, opened with bittersweet bevu-bella." },
        { name: "Brahmotsavam", note: "Nine nights of processions at Tirumala." },
        { name: "Sankranti", note: "January harvest kite-flying of the deltas." }
      ],
      crafts: [
        { craft: "Kalamkari", place: "Srikalahasti", note: "Pen-drawn temple cloth in natural dyes." },
        { craft: "Etikoppaka toys", place: "Vizianagaram", note: "Lacquer-turned wooden toys, GI-tagged." }
      ],
      heritage: [
        { site: "Amaravati Stupa complex", type: "Ancient Buddhist", note: "Where the wheel of dharma was carved." },
        { site: "Lepakshi", type: "Vijayanagara shrine", note: "Murals and hanging granite pillars." }
      ],
      thenNow: [
        { theme: "Dharma in stone", then: "The stupa was the axis of the Satavahana world.", now: "Its railings rest in museums as a new capital rises beside the site.", note: "What was smashed became a city's seed." },
        { theme: "The tellers", then: "Bards sang the epics door to door.", now: "The same stories travel as Telugu web series.", note: "The teller remains, the audience moved." }
      ],
      wonder: {
        type: "cultural",
        title: "The Great Stupa of Amaravati",
        note: "A wheel of dharma carved on limestone two millennia ago - wonder we carry is a stone that taught Asia to listen."
      }
    }
  },
"ar": {
    id: "ar", name: "Arunachal Pradesh", type: "State", region: "Northeast",
    capital: "Itanagar", languages: ["English", "tribal languages"],
    preview: "Dawn-lit mountains, gompas and Apatani valleys - the drum-song of the eastern Himalaya.",
    profile: {
      land: "Arunachal rises from the Assam plains through rainforest to the Himalayan snows; rivers like the Siang cut deep gorges through the 'dawn-lit ranges'.",
      history: [
        { era: "Ancient highland worlds", span: "antiquity", text: "Oral traditions of the Monpa, Adi, Apatani and many communities shaped independent village republics." },
        { era: "Buddhist west", span: "from c. 17th c.", text: "Tawang's great monastery anchored the Gelukpa Buddhist world of the west." },
        { era: "Frontier to state", span: "19th c. - 1987", text: "From colonial 'North-East Frontier' administration to a full state in 1987." },
        { era: "A plurality of tongues", span: "present", text: "Over twenty major tribal languages order one of India's deepest cultural pluralities." }
      ],
      architecture: [
        { name: "Tawang Monastery", place: "Tawang", type: "Buddhist monastery", note: "Among India's largest monasteries, home to hundreds of monks." },
        { name: "Apatani villages", place: "Ziro", type: "Living landscape", note: "Paddy terraces, fish ponds and bamboo houses in an ecological masterpiece." }
      ],
      arts: "Thangka scroll painting and carved monastery masks in the west; shawl-weaving and cane craft across the tribal east.",
      music: "Gompa chant with long horns and cymbals; every tribe keeps its own drum-song for harvest and hunt.",
      dance: "The masked Aji Lamu, the Ponung circle of the Adi and the Idu's Buiya make a landscape that dances its paddy and its jungle.",
      dress: "Woven cloths carry exact clan codes - scarlet of the Apatani, stripes of the Adi, warm woollens of the Monpa.",
      beliefs: "Tibetan Buddhism in the west, the sun-moon faith of Donyi-Polo in the east, and deep reverence for forest, river and ancestor.",
      food: [
        { dish: "Thukpa", region: "Tawang", description: "Hearty noodle soup of the high valleys.", context: "Comfort food of the Buddhist west." },
        { dish: "Zhan", region: "Adi areas", description: "Sticky rice steamed in a bamboo tube.", context: "Bamboo vessels rule the tribal kitchen." },
        { dish: "Pika Pila", region: "Apatani", description: "Fermented bamboo-shoot chutney, fierce with chilli.", context: "The state's signature preserve." }
      ],
      festivals: [
        { name: "Torgya", note: "The Tawang ceremony of masked dance and butter lamps." },
        { name: "Solung", note: "The Adi harvest festival of crops and spirits." },
        { name: "Losar", note: "The Monpa new year of dance and feasting." }
      ],
      crafts: [
        { craft: "Thangka painting", place: "West Arunachal", note: "Scroll icons in mineral pigments." },
        { craft: "Bamboo and cane", place: "Across the state", note: "Baskets, fish-traps and granaries." },
        { craft: "Tribal shawls", place: "Apatani, Adi, Nyishi", note: "Cloth carrying clan patterns." }
      ],
      heritage: [
        { site: "Namdapha National Park", type: "National park", note: "Snow leopard to tiger in one green descent." },
        { site: "Tawang Monastery", type: "Monastery", note: "A seat of the Tawang lineage and monastic arts." }
      ],
      thenNow: [
        { theme: "The gompa world", then: "Monasteries held the only literacy of the high valleys.", now: "They now host modern schools, and thangka enters the academy.", note: "The wheel still turns over new books." },
        { theme: "Ziro's valley", then: "Terraces and fish-culture fed Ziro for centuries.", now: "The valley keeps the same paddy as heritage tourism.", note: "Sustainability learnt generations back." }
      ],
      wonder: {
        type: "natural",
        title: "Namdapha - a forest of dawn",
        note: "From snow leopard heights to tiger forest floor in one descent - an entire Himalaya in a single pocket."
      }
    }
  },
"as": {
    id: "as", name: "Assam", type: "State", region: "Northeast",
    capital: "Dispur (Guwahati)", languages: ["Assamese", "Bodo", "others"],
    preview: "Golden muga silk, the one-horned rhino and Sankardev's sattra - a great river that learned to sing.",
    profile: {
      land: "The Brahmaputra - the 'Son of Brahma' - cuts an immense green valley walled by mountains, famed for tea, orchids, and the world's largest river island, Majuli.",
      history: [
        { era: "Kamarupa", span: "early centuries CE", text: "An ancient kingdom mentioned in the epics, merged tribes and immigrant cultures of the valley." },
        { era: "Ahom kingdom", span: "1228 - 1826", text: "The Tai-Ahom rulers gave the valley its name and its longest polity, recorded in the Buranji chronicles." },
        { era: "Sankardev's renewal", span: "16th c.", text: "Srimanta Sankardev's Vaishnavism built sattras that became the root of Assamese drama, music and art." },
        { era: "Modern Assam", span: "1826 - present", text: "Colonial tea and steamship, then a modern state amid language movements and reorganisation." }
      ],
      architecture: [
        { name: "Kamakhya Temple", place: "Guwahati", type: "Shakta temple", note: "One of the mother goddess's most sacred seats, above the Brahmaputra." },
        { name: "Rang Ghar", place: "Sivasagar", type: "Ahom pavilion", note: "A two-storied royal pavilion roofed like an inverted boat." },
        { name: "Talatal Ghar", place: "Sivasagar", type: "Ahom palace-fort", note: "Underground chambers of the Ahom capital." }
      ],
      arts: "The arts come from sattra and loom: painted manuscript covers, bell-metal Xorai trays, and the mask theatre of Majuli.",
      music: "Borgeet - the Vaishnava hymns of Sankardev - is Assam's classical song; the Bihu song, the dhol drum and pepa horn carry the folk spring.",
      dance: "Sattriya, a classical dance of the sattra monasteries, now graces national stages; Bihu is the ecstatic spring dance of the fields.",
      dress: "The mekhela chador and the gamosa - cloth that honours, wipes and adorns - are the fibre of Assamese identity; muga, eri and pat silks the gold of the loom.",
      beliefs: "Gentle Vaishnavism and the fierce cult of Kamakhya coexist; the sattra, the river and the ancestor order everyday life.",
      food: [
        { dish: "Assam Tea", region: "The tea belt", description: "The strong, brisk black tea of the valley.", context: "Assam's global gift, taken with milk and sugar." },
        { dish: "Khar", region: "Assam", description: "Raw papaya and pulses cooked with banana-ash alkali.", context: "The formal first course of an Assamese thali." },
        { dish: "Pitha", region: "Home kitchens", description: "Rice cakes, sweet and savoury.", context: "The festival sweet of the rice lands." }
      ],
      festivals: [
        { name: "Bihu", note: "Three Bihus mark seeding, harvest and spring with song and dance." },
        { name: "Ambubachi Mela", note: "The great congregation at Kamakhya in the monsoon." },
        { name: "Raas Mahotsav", note: "Sattra performance of Krishna's story." }
      ],
      crafts: [
        { craft: "Muga silk", place: "Sualkuchi", note: "The naturally golden silk, GI-tagged." },
        { craft: "Majuli masks", place: "Majuli", note: "Sattra-theatre masks, burnt after ritual use." },
        { craft: "Cane and bamboo", place: "Across the valley", note: "Furniture and implements of the riverine artisan." }
      ],
      heritage: [
        { site: "Kaziranga National Park", type: "UNESCO World Heritage", note: "Home of two-thirds of the world's one-horned rhino." },
        { site: "Majuli", type: "River island", note: "The world's largest inhabited river island, seat of sattra culture." },
        { site: "Manas National Park", type: "UNESCO World Heritage", note: "Tiger reserve on the Bhutan border." }
      ],
      thenNow: [
        { theme: "The sattra stage", then: "Sattriya was a guarded monastic art.", now: "It is now a national classical dance of the stage.", note: "The monastery opened its courtyard." },
        { theme: "The golden thread", then: "Muga was woven for nobles and temple cloth.", now: "GI-tagged muga dresses international runways.", note: "A natural gold needing no dye." }
      ],
      wonder: {
        type: "living",
        title: "The One-Horned Rhinoceros of Kaziranga",
        note: "A grazing mountain of prehistory that still breathes beside the Brahmaputra - the wonder we carry is the earth's own armour."
      }
    }
  },
"br": {
    id: "br", name: "Bihar", type: "State", region: "East",
    capital: "Patna", languages: ["Hindi", "Maithili", "Bhojpuri", "Magahi"],
    preview: "Where the Buddha woke under a peepal tree - Magadha's ancient heartland of empires, universities and the festival of the Sun.",
    profile: {
      land: "Bihar is the great alluvial plain of the Ganga, walled by the Himalayas to the north and the Chhota Nagpur plateau to the south - rice and pulse lands fed by the river network.",
      history: [
        { era: "Magadha the imperial", span: "6th - 3rd c. BCE", text: "From Pataliputra (Patna), the Magadhan kingdoms ruled much of the subcontinent; Ashoka turned toward dharma after Kalinga." },
        { era: "Nalanda and pilgrimage", span: "5th - 12th c.", text: "Nalanda and Vikramshila drew scholars from across Asia while Bodh Gaya became the pilgrimage seat of Buddhism." },
        { era: "Medieval age", span: "13th - 18th c.", text: "Sufi shrines, folk theatre and the ballads of the Bhojpuri, Maithili and Magahi lands." },
        { era: "Modern Bihar", span: "1912 - present", text: "A great educational and political heart of the Indian Gangetic plain, reshaped by Jharkhand's separation in 2000." }
      ],
      architecture: [
        { name: "Mahabodhi Temple", place: "Bodh Gaya", type: "Buddhist temple", note: "The seat of the Buddha's enlightenment; the vajrasana marks the exact place." },
        { name: "Ruins of Nalanda", place: "Nalanda", type: "Monastic university", note: "A red-brick campus of five kilometres, now a World Heritage site." },
        { name: "Stupa of the Relics", place: "Vaishali", type: "Stupa", note: "Ashokan pillar and the memory of the early republics." }
      ],
      arts: "Madhubani painting, Sujani quilts and the Sohrai and Godna wall arts of Mithila have made Bihar's brush world-famous.",
      music: "Folk song rides every rite - Sohar birth-songs, Chhath geet at the riverside, and Maithili poetry in the voice of Vidyapati.",
      dance: "Jat-Jatini and the Bidesia folk theatre of Bhojpuri tell of village, lured youth and homecoming.",
      dress: "The fine cotton of Bhagalpur and festival silk-chiffon of the Mithila fairs dress the plain; tattoos and mirrors brighten the village celebration.",
      beliefs: "The river Ganga, the ancestor rites that draw families to Gaya, the Sun of Chhath, and the Buddhist pilgrimage of Bodh order the Bihari year.",
      food: [
        { dish: "Litti Chokha", region: "Across Bihar", description: "Wheat balls stuffed with roasted gram-flour, served with mashed brinjal.", context: "The working lunch of the fields." },
        { dish: "Sattu Drink", region: "Summer households", description: "Roasted gram flour with sugar, lemon and water.", context: "The cooling porridge of the Gangetic summer." },
        { dish: "Tilkut and Thekua", region: "For Chhath", description: "Sesame sweets and fried wheat dumplings.", context: "Offerings that complete the Sun festival." }
      ],
      festivals: [
        { name: "Chhath Puja", note: "Four days honouring the Sun at the riverbank - Bihar's greatest festival." },
        { name: "Sonepur Mela", note: "The historic cattle fair at the Ganga's holy crossing." }
      ],
      crafts: [
        { craft: "Madhubani Painting", place: "Mithila", note: "Line-drawn folk art now famous worldwide." },
        { craft: "Bhagalpur Silk", place: "Bhagalpur", note: "Natural gold-brown tussar." },
        { craft: "Sujani", place: "Mithila", note: "Rhapsodic patchwork quilts." }
      ],
      heritage: [
        { site: "Mahabodhi Temple Complex", type: "UNESCO World Heritage", note: "The bodhi tree and vajrasana." },
        { site: "Nalanda", type: "UNESCO World Heritage", note: "Asia's great monastic university." }
      ],
      thenNow: [
        { theme: "The wall becomes canvas", then: "Madhubani was drawn on walls and floors.", now: "The same hands sell the same patterns across the world.", note: "The wall spread until it covered the earth." },
        { theme: "University of the world", then: "Nalanda's fame survived the burning of its library.", now: "Nalanda University has risen again beside the ruins.", note: "What burned returns in brick." }
      ],
      wonder: {
        type: "living",
        title: "The Bodhi Tree, Bodh Gaya",
        note: "A peepal tree that carried a faith across a continent - the wonder we carry is awareness itself, resting on ordinary earth."
      }
    }
  },
"cg": {
    id: "cg", name: "Chhattisgarh", type: "State", region: "Central",
    capital: "Raipur", languages: ["Hindi", "Chhattisgarhi"],
    preview: "The rice bowl of India - dhokra bell-metal, Pandwani's epic voice and Bastar's great tribal festival of Dussehra.",
    profile: {
      land: "A vast rice plain under the Mahanadi becomes, in the south, the forested plateau of Bastar - a green world of waterfalls, caves and living tribal cultures.",
      history: [
        { era: "Dakshina Kosala", span: "ancient", text: "The southern Kosala of the epics, heir to a temple-building memory across the river plains." },
        { era: "Kalachuri realm", span: "c. 9th - 13th c.", text: "The Haihaya Kalachuris built the temple cities of Sirpur, Rajim and Ratanpur." },
        { era: "Bastar's kingdom", span: "14th - 20th c.", text: "The Bastar rule and the autonomous tribal worlds of the forested south." },
        { era: "A new state", span: "1960 - present", text: "Carved from Madhya Pradesh in 2000, still fertile where the Mahanadi flows." }
      ],
      architecture: [
        { name: "Lakshmana Temple", place: "Sirpur", type: "Kalachuri temple", note: "Among the finest brick temples of its age, dedicated to Lakshmana-Narayana." },
        { name: "Temple city of Rajim", place: "Rajim", type: "Temple town", note: "Called the Prayag of Chhattisgarh for its confluence of three rivers." }
      ],
      arts: "The dhokra lost-wax bell-metal of Kondagaon, wood carving, and the godna (tattoo) and wall-painting traditions of Bastar rank among India's great crafts.",
      music: "Pandwani - the tambura-backed epic singing of the Mahabharata - is Chhattisgarh's own classical folk voice, sung by men and women alike.",
      dance: "The Suwa parrot-dance, the Raut Nacha of the cowherds, and the Karma circle dance carry the tribal calendar across the year.",
      dress: "Bright-bordered cotton saris, the half-sari of the rice households, and the mirror-work and shell jewellery of the Bastar people.",
      beliefs: "The goddess Danteshwari, the Karma cult of the forest, and the village deities of the tribal south order living ritual alongside the great Ganga festivals of the north.",
      food: [
        { dish: "Faraa", region: "Across Chhattisgarh", description: "Steamed savoury dumplings of rice flour and gram.", context: "The everyday comfort of the rice bowl." },
        { dish: "Mudhi", region: "State-wide", description: "Puffed rice with chana, onion and green chilli.", context: "The street snack of the paddy country." },
        { dish: "Bastar forest fare", region: "Bastar", description: "Wild mushrooms, bamboo shoots and mahua-flower dishes.", context: "The seasonal harvest of the jungle kitchen." }
      ],
      festivals: [
        { name: "Bastar Dussehra", note: "Seventy-five days of royal and tribal celebration - the longest Dussehra in India." },
        { name: "Sarhul", note: "The spring festival of the forest and the sal tree." }
      ],
      crafts: [
        { craft: "Dhokra Bell-Metal", place: "Kondagaon", note: "Lost-wax casting of Devi and oracle figures." },
        { craft: "Godna", place: "Bastar", note: "Tattoo and wall-painting of the tribal world." },
        { craft: "Wood Carving", place: "Bastar", note: "Carved doors and festival totems." }
      ],
      heritage: [
        { site: "Sirpur", type: "Archaeological site", note: "Brick temples and Buddhist ruins of the Kalachuri age." },
        { site: "Chitrakote Falls", type: "Natural wonder", note: "A broad horseshoe falls over the Indravati river." }
      ],
      thenNow: [
        { theme: "The mound becomes market", then: "Dhokra casting was a closed craft of the Kond tribe's families.", now: "Cooperatives and design schools have carried dhokra onto the world shelf.", note: "The mould moved from field to fair." },
        { theme: "Dussehra of the forests", then: "A tribal gathering of the Bastar court and the deity Danteshwari.", now: "It now draws national visitors while keeping its forty-day secrecy.", note: "The old rite opened its door a little." }
      ],
      wonder: {
        type: "natural",
        title: "Chitrakote Falls, the Indravati",
        note: "A single curtain of water, horseshoe-wide, that turns the Orissan plain green - the wonder we carry is a river that learned to jump."
      }
    }
  },
"ga": {
    id: "ga", name: "Goa", type: "State", region: "West",
    capital: "Panaji", languages: ["Konkani", "Marathi", "Portuguese (historical)"],
    preview: "A pocket of the Konkan coast where two civilisations kept house together - mandos and temple chants, vindaloo and river-crossings.",
    profile: {
      land: "Goa is a narrow strip of the Konkan between the Sahyadri hills and the Arabian Sea, cut by the Mandovi and Zuari rivers into a lace of estuaries, paddy and coconut groves.",
      history: [
        { era: "Kadamba shores", span: "c. 4th - 13th c. CE", text: "The Kadamba dynasty ruled the Konkan, patrons of the laterite temples and trade ports of the coast." },
        { era: "Vijayanagara interlude", span: "14th - 15th c.", text: "Goa's ports were contested by the Bahamani sultans and the Vijayanagara empire." },
        { era: "The Portuguese", span: "1510 - 1961", text: "Afonso de Albuquerque captured Goa in 1510; 450 years of Portuguese rule left language, faith and fado in the air." },
        { era: "Liberation", span: "1961 - present", text: "Operation Vijay merged Goa into India; it became a state in 1987." }
      ],
      architecture: [
        { name: "Basilica of Bom Jesus", place: "Old Goa", type: "Baroque church", note: "Holds the body of St Francis Xavier in a silver casket." },
        { name: "Se Cathedral and Old Goa churches", place: "Old Goa", type: "UNESCO World Heritage", note: "The whitewashed baroque ensemble of the Portuguese capital." },
        { name: "Shanta Durga Temple", place: "Kavlem", type: "Temple", note: "A laterite shrine that carries the older Hindu memory of the coast." }
      ],
      arts: "The 'fado' never arrived in full, but the Konkani theatre, the printed azulejo-tile houses, and the weaving of palm and bamboo make Goa's everyday art.",
      music: "The Mando and Dulpod love-songs of the old Catholic gentry and the dhol-tasha temple music of the villages share the same dusk.",
      dance: "Deknni, Fugdi and Dhalo - circle-dances of the women - and the Portuguese-influenced corridinho keep both grammars moving.",
      dress: "The white sari and the 'pano-baju' of the old Catholic woman, the temple silks of the Hindu festive, all woven in the same coastal air.",
      beliefs: "Catholic Goa and Hindu Goa share the same calendar - the feast of Sao Joao and the Ganesh Chaturthi of the waterfront temples are both 'Goan'.",
      food: [
        { dish: "Fish Curry Rice", region: "Every household", description: "Fresh fish in a red-chilli and coconut gravy with rice.", context: "The daily dish that crosses every divide." },
        { dish: "Vindaloo", region: "Goa", description: "Pork or fish in a fiery vinegar and garlic paste.", context: "Carried by Portuguese sailors as carne de vinha d'alhos, reborn in Goa." },
        { dish: "Bebinca", region: "Goa", description: "A layered coconut-milk and egg sweet.", context: "The festive dessert of Christmas and weddings." }
      ],
      festivals: [
        { name: "Carnival", note: "Three days of floats and dance before Lent." },
        { name: "Sao Joao", note: "The June feast where revellers leap into wells and rivers." },
        { name: "Ganesh Chaturthi", note: "The homecoming of the elephant-headed god, celebrated with mud idols." }
      ],
      crafts: [
        { craft: "Feni distillation", place: "Cazuar / coconut groves", note: "Cashew and coconut feni, GI-tagged." },
        { craft: "Shell and palm craft", place: "Coastal villages", note: "Baskets, mats and ornaments of the shore." }
      ],
      heritage: [
        { site: "Churches and Convents of Goa", type: "UNESCO World Heritage", note: "The baroque capital of Portuguese Asia." },
        { site: "Bhagwan Mahavir Wildlife", type: "National park", note: "Sahyadri forest with Dudhsagar falls." }
      ],
      thenNow: [
        { theme: "The country spirit", then: "Feni was the village drink of every coastal home.", now: "GI-tagged cashew feni is now an export cocktail base.", note: "The still has gone to the bar." },
        { theme: "The Mando song", then: "Composed in Portuguese-inflected Konkani at weddings of the gentry.", now: "Revived in archives, film and the Konkani stage.", note: "The song outlived the salon." }
      ],
      wonder: {
        type: "cultural",
        title: "Basilica of Bom Jesus, Old Goa",
        note: "Where a missionary's body has lain unburied since 1553 - the wonder we carry is a church that kept a saint's dust and a coast's memory in silver."
      }
    }
  },
"gj": {
    id: "gj", name: "Gujarat", type: "State", region: "West",
    capital: "Gandhinagar", languages: ["Gujarati"],
    preview: "From the salt white of the Rann to the weavers of Kutch - Navratri's dance, Dhokla's steam and the lion of Gir.",
    profile: {
      land: "Gujarat is a long, low coast of estuaries and ports, ringed by the desert Rann of Kutch, the Saurashtra peninsula, and the forested slopes of Gir.",
      history: [
        { era: "The Harappan west", span: "c. 2600 - 1900 BCE", text: "Lothal's dock and Dholavira's water cities made Gujarat an early hearth of the Indus civilisation." },
        { era: "Solanki age", span: "10th - 13th c.", text: "The Chalukyas built Modhera and the great Jain temples, with Kumarapala converting the region to Jainism's practice." },
        { era: "Gujarat sultanate", span: "15th c.", text: "Ahmedabad was founded in 1411 and grew into a city of stepwells, mosques and markets." },
        { era: "Freedom and modern Gujarat", span: "20th c. - present", text: "Gandhi's Sabarmati ashram led India's satyagraha; the state became a byword for enterprise." }
      ],
      architecture: [
        { name: "Sun Temple, Modhera", place: "Modhera", type: "Solanki temple", note: "An 11th-century solar shrine aligned to equinoxes, with a step tank." },
        { name: "Rani ki Vav", place: "Patan", type: "Stepwell, UNESCO World Heritage", note: "An inverted temple of seven levels descending to water." },
        { name: "Champaner-Pavagadh", place: "Champaner", type: "UNESCO World Heritage", note: "A hill city of mosques, tombs and stepwells of the Sultanate." }
      ],
      arts: "Kutch's embroidery, Patan's double-ikat patola, Rogan painting of Nirona and the pithora murals of the Rathwa make Gujarat a museum of cloth and line.",
      music: "The Garba and Garbi choral songs of Navratri, the dhol and the bhajan of the Vaishnava satsang sound across the state's evenings.",
      dance: "Garba and its stick dance Dandiya turn Navratri into the longest dance festival on earth; Bhavai theatre and the Raslila of the Vaishnavas follow.",
      dress: "The chania-choli with its mirror-work, the bandhani odhni, and the men's kediyu and dhoti are tie-dyed, pleated and gathered for festival.",
      beliefs: "Jainism's pilgrim hills of Palitana and Girnar, the Vaishnava devotion of Swaminarayan, Sufi dargahs, and the goddess of Navratri meet on one coast.",
      food: [
        { dish: "Dhokla", region: "Gujarat", description: "Steamed fermented gram-flour cake, tangy with mustard.", context: "The light and quick 'no-oil' Gujarat bite." },
        { dish: "Undhiyu", region: "Surat and winter", description: "A slow-roasted pot of winter root vegetables and beans.", context: "The one-pot celebration of the harvest." },
        { dish: "Khandvi", region: "Gujarat", description: "Silky gram-flour rolls with sesame and coriander.", context: "A dance of patience on the griddle." }
      ],
      festivals: [
        { name: "Navratri Garba", note: "Nine nights of the world's largest dance gathering." },
        { name: "International Kite Festival", note: "Uttarayan, when the January sky becomes a field of kites." },
        { name: "Rann Utsav", note: "The full-moon festival of the white desert." }
      ],
      crafts: [
        { craft: "Patola Silk", place: "Patan", note: "Double-ikat silk of geometric perfection." },
        { craft: "Rogan Painting", place: "Nirona", note: "Castor-oil paint drawn into mirror images." },
        { craft: "Kutch Embroidery", place: "Kutch", note: "GI-tagged mirror and chain-stitch cloth." }
      ],
      heritage: [
        { site: "Champaner-Pavagadh", type: "UNESCO World Heritage", note: "The Sultanate hill capital." },
        { site: "Rani ki Vav", type: "UNESCO World Heritage", note: "The queen's stepwell at Patan." },
        { site: "Dholavira", type: "UNESCO World Heritage", note: "A Harappan water-city of the Rann." }
      ],
      thenNow: [
        { theme: "The dance circle", then: "Garba circled village courtyards around the goddess.", now: "Millions dance in stadiums; the circle still never breaks.", note: "The circumference grew, the steps did not." },
        { theme: "The lion's pride", then: "Gir's lions nearly vanished in hunting's last century.", now: "Protected, their pride now numbers in the hundreds.", note: "The king returned to the forest." }
      ],
      wonder: {
        type: "living",
        title: "The Asiatic Lion of Gir",
        note: "The last wild pride of the Asiatic lion on earth - the wonder we carry is a species that survived because a king was given his own kingdom."
      }
    }
  },
"hr": {
    id: "hr", name: "Haryana", type: "State", region: "North",
    capital: "Chandigarh", languages: ["Hindi", "Haryanvi"],
    preview: "Kurukshetra's fields of the Gita, the wrestling akhada and phulkari colour - Haryana, the land of the epic dawn.",
    profile: {
      land: "Haryana lies between the Yamuna and the first Aravalli ridges - a rolling breadbasket of wheat, mustard and cotton under the dry north wind.",
      history: [
        { era: "The epic plain", span: "mythic past", text: "Kurukshetra, the 'land of the Kurus', is where the Mahabharata's war and the Gita's counsel are set." },
        { era: "Vedic hearth", span: "2nd - 1st millennium BCE", text: "The Vedic kingdoms of the Saraswati-Yamuna doab matured here; a Topra-stone edict of Ashoka's abode later went to Delhi." },
        { era: "Maratha and Mughal hinge", span: "16th - 19th c.", text: "The region was a contested corridor between Delhi's powers - Mughal, Maratha and the Sikh states." },
        { era: "Modern Haryana", span: "1966 - present", text: "Carved from Punjab in 1966, Haryana became a green-revolution powerhouse." }
      ],
      architecture: [
        { name: "Brahma Sarovar", place: "Kurukshetra", type: "Sacred tank", note: "The great waters of the city of the Mahabharata." },
        { name: "Pinjore Gardens", place: "Pinjore", type: "Mughal terraced garden", note: "Seven terraced Mughal gardens, the Shish Mahal among them." },
        { name: "Sultanpur Bird Sanctuary", place: "Gurugram district", type: "National park", note: "A winter roost for migratories at Sultanpur." }
      ],
      arts: "Folk painting of the Sanjhi, the toy-making shrines, and the Lakha Gurjari palm-leaf painting keep the village arts of Haryana alive.",
      music: "The Saang folk theatre pairs verse with dance; Ragini singers and farmers' 'Rasiya' celebrate seed and monsoon.",
      dance: "The men's Dhamal and the women's Loor and Ghoomar spin out of wedding and harvest nights.",
      dress: "Phulkari and dhol's brightness on the women's veil, the farmer's dhoti and the wrestler's langot, all plain with colour at festival.",
      beliefs: "The Gita's counsel, the hug of the serpent-god Guga and his Nag deities, and the worship of the goddess in the autumn speak deep village faith.",
      food: [
        { dish: "Bajra Khichdi", region: "Haryana", description: "A millet-and-dal porridge of the farmer.", context: "The warmth of the winter field." },
        { dish: "Kachri", region: "Haryana", description: "Pickled sour gourd of the village.", context: "A tonic relish with the winter lunch." },
        { dish: "Churma", region: "Weddings", description: "Sweetened whole-wheat crumble with ghee.", context: "The celebratory close of the Haryanvi thali." }
      ],
      festivals: [
        { name: "Kurukshetra Deepawali & BrahmaSarovar", note: "The lunar-eclipse dip in the sacred grand tank." },
        { name: "Guga Navmi", note: "The serpent festival of the deity Guga." }
      ],
      crafts: [
        { craft: "Phulkari", place: "Haryana-Punjab belt", note: "Flower-stitch embroidery of the veil." },
        { craft: "Village Pottery", place: "Haryana", note: "Earthenware of the harvest and the hearth." }
      ],
      heritage: [
        { site: "Kurukshetra", type: "Sacred land", note: "The Mahabharata's fields and the Gita's place." },
        { site: "Sultanpur National Park", type: "Bird sanctuary", note: "The winter lake of the Anser." },
      ],
      thenNow: [
        { theme: "The Gita's plain", then: "The counsel was given on a war field at dawn.", now: "The same scene is the Gita's textbook.", note: "A battlefield became a schoolroom." },
      ],
      wonder: {
        type: "cultural",
        title: "The Gita at Kurukshetra",
        note: "A conversation between prisoner and charioteer on a dawn field that became the scripture of a civilisation - the wonder we carry is a war converted into counsel."
      }
    }
  },
  "hp": {
    id: "hp", name: "Himachal Pradesh", type: "State", region: "North",
    capital: "Shimla", languages: ["Hindi", "Pahari dialects"],
    preview: "Snow altars and apple orchards - Little Lhasa of the west, wooden temples and the dance of the Nati.",
    profile: {
      land: "Himachal tilts from the Shivalik foothills to the great Himalaya, threaded by the Beas, Sutlej and Ravi - a state of apple, cedar, glacier and high monastery.",
      history: [
        { era: "Hill principalities", span: "ancient - 19th c.", text: "Many small mountain kingdoms - Kangra, Kullu, Chamba - kept their own rajas and their own raga." },
        { era: "Stone and Buddhist ages", span: "8th - 12th c.", text: "The rock-cut temples of Masrur and the gompa old-age of Tabo, 'from c. 996 CE', set two architectures in the valleys." },
        { era: "The British summer", span: "19th - 20th c.", text: "Shimla grew into the Summer Capital of the Raj on the ridge of the Himalayas." },
        { era: "Statehood", span: "1971 - present", text: "Himachal's present borders were formed in 1971, and it became the 'apple state of India'." }
      ],
      architecture: [
        { name: "Masrur Rock-Cut Temples", place: "Kangra", type: "Rock-cut temples", note: "A stone 'Himalayan Ellora' of the eighth century." },
        { name: "Tabo Monastery", place: "Spiti", type: "Buddhist monastery", note: "Founded round 996 CE, the 'Ajanta of the Himalaya'." },
        { name: "Kalka-Shimla Railway", place: "Shimla hills", type: "Mountain railway", note: "A World Heritage rack-and-pinion line up the hills." }
      ],
      arts: "Pahari painting - the Kangra, Chamba and Kullu schools - and the embroidered Chamba rumal are miniature worlds on silk and cotton.",
      music: "The Raga of the Pahari and the songs of Kyari, the Nati's pipes and the drums of the Dashera rise from the terraced fields.",
      dance: "The women's Nati circle-dance of Kullu, and the masked Chham dance of the Spitian monasteries carry both the field and the gompa.",
      dress: "Kullu and Kinnauri woollens, Chamba's rumal cloth and the heavy Pahari shawl keep the sun and snow off a hard mountain life.",
      beliefs: "A chain of local goddesses and rakshas of the kullu valley, Shiva of Manikarana and the Tibetan Buddhism of Spiti and Lahaul refold in one snow glance.",
      food: [
        { dish: "Dham", region: "from the valleys", description: "A festival thali of rice, dal, rajma and curd.", context: "The sacred banquet served with brass and blessing." },
        { dish: "Siddu", region: "mountain", description: "A steamed stuffed bread.", context: "The mother bread of the trek." },
        { dish: "Tangy Kaddu and beans", region: "winter", description: "Umrid beans of the hills with apple chutney.", context: "Winter shelf of the mountain kitchen." }
      ],
      festivals: [
        { name: "Kullu Dussehra", note: "A seven-day pageant of hill deities at the Dhalpur ground." },
        { name: "Losar", note: "The Buddhist new year of Spiti and Kinnaur." },
        { name: "Minjar Mela", note: "Chamba's harvest festival of the corn ear." }
      ],
      crafts: [
        { craft: "Kullu Shawls", place: "Kullu", note: "Wool woven with carried Kangni-influenced patterns." },
        { craft: "Chamba Rumal", place: "Chamba", note: "Embroidery of the romantic Pahari painting on cloth." },
        { craft: "Wood Craft", place: "Kullu - Kinnaur", note: "Carved doors, verandahs and deity masks of the hills." }
      ],
      heritage: [
        { site: "Great Himalayan", type: "National Park", note: "A UNESCO wilderness of the high snow." },
        { site: "Kalka-Shimla Railway", type: "UNESCO World Heritage", note: "An engineering ribbon up the mountain." }
      ],
      thenNow: [
        { theme: "The rumal's thread", then: "Chamba embroidery was a dowry art of the hill gentry.", now: "Revived by the G.T.T. craft revival, it now travels the world.", note: "The tiny world grew, the stitch stayed small." },
        { theme: "The mountain train", then: "The railway carried the Empire's summers up the ridge.", now: "A heritage ride for pilgrims of the peak.", note: "The toy train kept its timetable." }
      ],
      wonder: {
        type: "architectural",
        title: "Tabo Monastery, Spiti",
        note: "A thousand-year-old prayer hall reclining in white-wash under brown cliffs - the wonder we carry is a quiet that survived every winter."
      }
    }
  },
  "jh": {
    id: "jh", name: "Jharkhand", type: "State", region: "East",
    capital: "Ranchi", languages: ["Hindi", "Santali", "Ho", "Mundari", "others"],
    preview: "Forests, falls and the masked Chhau - the land of Birsa's banner, Mohar and the sacred sal.",
    profile: {
      land: "Jharkhand is the Chota Nagpur plateau - a broken tableland of forest, mine, river and waterfall, the green mineral heart of eastern India.",
      history: [
        { era: "Tribal homelands", span: "ancient", text: "The Chotanagpur division carried the millennial republics of the Munda, Oraon, Kharia and Santhal." },
        { era: "Rebellions", span: "19th c.", text: "The Kol rising (1831), the Santhal hul (1855) and Birsa Munda's ulgulan (1899-1900) shook the colonial order." },
        { era: "Inside Bihar", span: "1912 - 2000", text: "Long administered with Bihar, the plateau sought its own voice." },
        { era: "Statehood", span: "2000 - present", text: "Jharkhand became a separate state in 2000, mining wealth and tribal culture in one hand." }
      ],
      architecture: [
        { name: "Baba Baidyanath Temple", place: "Deoghar", type: "Jyotirlinga temple", note: "One of the twelve jyotirlingas, thronged on Shravan." },
        { name: "Parasnath", place: "Giridih", type: "Jain sacred hill", note: "The peak of the twenty-fourth Tirthankara's liberation." },
        { name: "Tribal villages", place: "Plateau-wide", type: "Living architecture", note: "Sal-wood houses and the Khovar cave-mouths of the wedding wall." }
      ],
      arts: "Sohrai and Khobar wall painting, the Jadu-patia scrolls of the Santhals, and the dokra bell-metal of the tribal forges.",
      music: "Karma and Jhumair songs, the madal and dhol-kal training of the fields and the flute of the evening grove.",
      dance: "The masked Chhau of Seraikela, the Karma circle and the Paika stick-dance mark Jharkhand among India's great dance states.",
      dress: "Red-and-white bordered saris and the tattooed godna of the tribal body, bright patkas and the Panchpargania weave.",
      beliefs: "The Sarna grove and the sacred sal, the ancestors of the hearth, and the pilgrim temple of Baidyanath meet on one plateau.",
      food: [
        { dish: "Dhuska", region: "Chotanagpur", description: "Fried rice-and-dal fritters.", context: "The festival snack of the plateau." },
        { dish: "Rugda", region: "Forest", description: "Termite mushroom curry.", context: "The monsoon gift of the sal forest." },
        { dish: "Pitha", region: "Harvest", description: "Sweet rice cakes (Chura-mal pitha).", context: "Served at the Karma and Sohrai." }
      ],
      festivals: [
        { name: "Sarhul", note: "Spring worship of the sal blossom and the grove." },
        { name: "Karma", note: "The autumn dance and song of the karam tree." },
        { name: "Sohrai", note: "The post-harvest festival of cattle and painted walls." }
      ],
      crafts: [
        { craft: "Dokra", place: "Plateau", note: "Lost-wax bell-metal figures and lamps." },
        { craft: "Sohrai / Khovar Painting", place: "Hazaribagh", note: "Mud-wall line-work, a UNESCO-listed practice." },
        { craft: "Jadopatia Scrolls", place: "Santal belt", note: "Epic picture-scrolls of the Santhal tribes." }
      ],
      heritage: [
        { site: "Baidyanath Dham", type: "Pilgrimage", note: "The 'Kashi of the east' for the Hindus." },
        { site: "Sohrai-Khovar paintings", type: "UNESCO Intangible Heritage", note: "The living wall-art of the tribal household." }
      ],
      thenNow: [
        { theme: "The masked stage", then: "Chhau was a secret court-dance of a princely state.", now: "UNESCO-listed in 2010, it now fills world stages.", note: "The mask stepped out of the palace." },
        { theme: "The ritual wall", then: "Sohrai was painted every year on the wedding and harvest wall.", now: "Museums and collectors now buy the same mud.", note: "The wall gave birth to a canvas." }
      ],
      wonder: {
        type: "cultural",
        title: "The Masked Chhau of Seraikela",
        note: "In which a dancer loses his face to become a god - the wonder we carry is a mask that turns the body into the divine."
      }
    }
  },
  "ka": {
    id: "ka", name: "Karnataka", type: "State", region: "South",
    capital: "Bengaluru", languages: ["Kannada"],
    preview: "From Hampi's boulders to the gardens of Bengaluru - the kala of Yakshagana, Basava's vachanas and Mysore's Dasara.",
    profile: {
      land: "Karnataka stretches from the emerald coast (Kannada coast) and Western Ghats across the dry Deccan to the green belt of the Cauvery - a state of boulder, coffee and sandal.",
      history: [
        { era: "Badami Chalukyas", span: "6th - 8th c.", text: "From Badami and Aihole they became the first grandsons of Indian architecture - the cradle of the temple-style of the Deccan." },
        { era: "Ideals and empires", span: "9th - 15th c.", text: "Rashtrakutas and Hoysalas, and the 12th-century Vachana movement of Basava to the progress of Vijayanagara of Hampi." },
        { era: "The age of Mysore", span: "16th - 19th c.", text: "The Wodeyar court and the sultanate of Tipu shaped Mysore's silk, steel and music." },
        { era: "Unification", span: "1881 - 1956", text: "The Kannada-speaking regions were unified into one Karnataka in 1956." }
      ],
      architecture: [
        { name: "Hampi", place: "Hampi", type: "UNESCO World Heritage", note: "The capital of Vijayanagara scattered among boulders on the Tungabhadra." },
        { name: "Pattadakal", place: "Pattadakal", type: "UNESCO World Heritage", note: "Where the southern temple style was first fixed in stone." },
        { name: "Chennakesava Temple", place: "Somnathpur", type: "Hoysala temple", note: "A star-shaped stone filigree of the thirteenth century." }
      ],
      arts: "Mysore school painting, the leather puppetry of Togalu Gombe Aata, and the bordered ornament of kinnal wood-shaping are Karnataka's art-ware.",
      music: "Purandara Dasa, the 'father of Carnatic music', sang in Kannada; Dharwad's north a side of Hindustani added another world into home.",
      dance: "Yakshagana - the night-long dance-drama of the coast - and the drum dance Dollu Kunitha thunder around the boulder country.",
      dress: "The Ilkal sari's temple-tower border and the Mysore silk with gold flowers; men's simple dhoti of the Deccan cotton.",
      beliefs: "Basava's Lingayat movement of the 12th century taught devotion without caste; the pilgrimage of Dharmasthala and Kukke, and the Vaishnava dasa-kuta order daily life.",
      food: [
        { dish: "Ragi Mudde", region: "North Karnataka", description: "Millet dumplings eaten with sambar.", context: "The strength of the farmhands' day." },
        { dish: "Bisi Bele Bath", region: "Mysore region", description: "A hot lentil-and-rice potage with vegetables.", context: "Mysore's royal one-pot kitchen." },
        { dish: "Mysore Pak", region: "Mysore", description: "Ghee-rich gram-flour fudge.", context: "The sweet from the Mysore palace kitchen." },
        { dish: "Udupi Thali", region: "Udupi", description: "The strict vegetarian temple thali of the coast.", context: "From which the Udupi hotels spread around the world." }
      ],
      festivals: [
        { name: "Mysore Dasara", note: "Ten processional days crowned by the golden howdah." },
        { name: "Karaga", note: "Bengaluru's ancient month-long festival of the goddess." },
        { name: "Hampi Utsav", note: "The winter festival of dance, fire and puppet." }
      ],
      crafts: [
        { craft: "Channapatna Toys", place: "Channapatna", note: "Lacquered-wood lathe toys, GI-tagged." },
        { craft: "Mysore Sandalwood", place: "Mysore", note: "Sandalwood carving and oil." },
        { craft: "Bidriware", place: "Bidar", note: "Black metal with silver inlay." }
      ],
      heritage: [
        { site: "Hampi", type: "UNESCO World Heritage", note: "The ruins of the last great Hindu empire." },
        { site: "Pattadakal", type: "UNESCO World Heritage", note: "The coronation stones of the Chalukyas." },
        { site: "Western Ghats", type: "UNESCO World Heritage", note: "A biodiversity hotspot shared across the south." }
      ],
      thenNow: [
        { theme: "The boulder capital", then: "Hampi was a teeming court city of the fifteenth century.", now: "Its boulders and temples now host tourists, doodle-artists and nocturnal pilgrims.", note: "Empire became landscape." },
        { theme: "The night theatre", then: "Yakshagana was a temple-adjacent village ritual till dawn.", now: "It shares stages and films while keeping its court.", note: "The all-night art learned to keep time." }
      ],
      wonder: {
        type: "architectural",
        title: "The Stone Chariot and Virupaksha, Hampi",
        note: "In which boulders stand like ruins and ruins rest like boulders - the wonder we carry is an empire that let geology keep the minutes."
      }
    }
  },
  "kl": {
    id: "kl", name: "Kerala", type: "State", region: "South",
    capital: "Thiruvananthapuram", languages: ["Malayalam"],
    preview: "Backwaters, Kathakali's golden eyes and the pooram's drum-fire - God's own country, where every festival is a work of art.",
    profile: {
      land: "Kerala is a thin, tropical strip between the Arabian Sea and the Western Ghats - a lace of backwaters, coconut palms, spice slopes and the paddy-green polders of the south.",
      history: [
        { era: "The Cheras and Muziris", span: "ancient", text: "The Sangam Cheras handed the spice port of Muziris over to Greek, Roman, Arab and Jewish ships." },
        { era: "Bhakti and reform", span: "8th - 20th c.", text: "Adi Shankara was born at Kaladi; later Ezhava reform brought Sree Narayana Guru and the movement of the matriarchal household." },
        { era: "Travancore and the coast", span: "18th - 20th c.", text: "The trading states of Kochi, the Dutch and British, and Travancore's temple-centered monarchy." },
        { era: "Unified Kerala", span: "1956 - present", text: "Malayalam-speaking regions merged in 1956 into a state known for literacy, health and the backwater economy." }
      ],
      architecture: [
        { name: "Padmanabhaswamy Temple", place: "Thiruvananthapuram", type: "Temple", note: "The great Vishnu temple in a reclining posture, guarded by seven secret locks." },
        { name: "Padmanabhapuram Palace", place: "Kuthiravally", type: "Wooden palace", note: "An almost entirely wooden palace of the Travancore kings." },
        { name: "Jew Town Synagogue", place: "Fort Kochi", type: "Synagogue", note: "Hand-painted Chinese tiles from the old trading society." }
      ],
      arts: "Kerala's mural walls of the Mattancherry and temple, the coir and kathakali's face-paint, and Ottamthullal's solo comic verse carry one of India's richest art-houses.",
      music: "The Sopana sangeetham of the temple steps, the chenda's thunder and the panchavadyam ensembles scatter raga across the monsoon.",
      dance: "Kathakali - the story-dance of green and crimson faces - and the lyrical Mohiniyattam are its classics; Theyyam's trance-dance belongs to the north.",
      dress: "The kasavu mundu and sari - cotton white with a gold border - are what God's own country wears to prayer, work and festival.",
      beliefs: "Temple, church, mosque and synagogue share the same streets; snake-grove shrines and the ecosystem of the Onam myth order an unusually tolerant everyday.",
      food: [
        { dish: "Onam Sadya", region: "Onam", description: "A banana-leaf banquet of twenty dishes ending in payasam.", context: "The great feast of the harvest-king legend." },
        { dish: "Appam and Stew", region: "Families", description: "Lace-edged rice pancakes with coconut-milk stew.", context: "The Sunday breakfast of the Christian home." },
        { dish: "Karimeen Pollichathu", region: "Backwaters", description: "Pearl spot fish wrapped and griddled in banana leaf.", context: "The backwater's signature dish." }
      ],
      festivals: [
        { name: "Onam", note: "The snake-boat and pookalam festival of the king's return." },
        { name: "Thrissur Pooram", note: "The caparisoned-elephant finale of temple percussion and fireworks." },
        { name: "Theyyam season", note: "The oracle-dance festivals of Malabar." }
      ],
      crafts: [
        { craft: "Kasavu Handloom", place: "Balaramapuram", note: "White cotton with the gold border." },
        { craft: "Coir of Alleppey", place: "Alappuzha", note: "Coconut-fibre ropes and mats." },
        { craft: "Kerala Murals", place: "Temples", note: "Vegetable-pigment wall art." }
      ],
      heritage: [
        { site: "Padmanabhapuram Palace", type: "Heritage palace", note: "The wood-and-rattan palace of the Travancore court." },
        { site: "Western Ghats", type: "UNESCO World Heritage", note: "Tea and spice highlands of the Sahyadri." }
      ],
      thenNow: [
        { theme: "The green faces", then: "Kathakali was bounded to temple courtyards.", now: "Now it performs every night for the tourists of the coast.", note: "The art opened its painted eyes." },
        { theme: "The backwaters", then: "They were the roads of grain and coir.", now: "Houseboats now drift them for the world.", note: "The boat that carries, also waits." }
      ],
      wonder: {
        type: "cultural",
        title: "Kathakali - the art of the open eye",
        note: "In which the eyes do the roaring - the wonder we carry is a dance that never stops rehearsing a single twitch of the universe."
      }
    }
  },
  "mp": {
    id: "mp", name: "Madhya Pradesh", type: "State", region: "Central",
    capital: "Bhopal", languages: ["Hindi", "Malwi", "Nimadi", "Bundeli"],
    preview: "The heart of India - Khajuraho's carved chorus, Sanchi's drum of dharma and the cave-painters of Bhimbetka.",
    profile: {
      land: "Madhya Pradesh is the great plateau of the middle India - the Narmada's valley between Vindhya and Satpura, hunt the forest, fertile Betwa fields.",
      history: [
        { era: "The caves of the first painters", span: "c. 30,000 - 1000 BCE", text: "At Bhimbetka, artists painted bison, hunters and spirits for tens of millennia." },
        { era: "Dharma in stone", span: "3rd c. BCE - 7th c. CE", text: "Ashoka's Sanchi stupa and the temple cities of Ujjain and Vidisha made central India a spine of the ancient pilgrimage." },
        { era: "Khajuraho and the Malwa courts", span: "10th - 16th c.", text: "The Chandelas carved Khajuraho; Mandu, Orchha and Gwalior became fort-capitals of the region's sultans and rajas." },
        { era: "Modern Madhya Pradesh", span: "1956 - present", text: "Oddly the largest state of the old Union, remade by Chhattisgarh's split in 2000." }
      ],
      architecture: [
        { name: "Khajuraho Temples", place: "Khajuraho", type: "UNESCO World Heritage", note: "Eighty-five Chandela shrines of the 10th-11th century, world-famous for their carved panels." },
        { name: "The Great Stupa of Sanchi", place: "Sanchi", type: "UNESCO World Heritage", note: "A 'drum' of the dharma raised on the hill of the Ashoka's reign." },
        { name: "Bhimbetka rockshelters", place: "Bhopal", type: "UNESCO World Heritage", note: "Palaeolithic painted shelters of the earliest India." }
      ],
      arts: "Gond painting from the villages, the Mandana wall-decoration, 'Tirona' and the itinerant Pardhan scroll-artists - the art-houses of the forest.",
      music: "The folk-song of the Malwa, Bundeli and Nimadi belts, the Alha singing of the warriors' ballads and the pansuri of the cowherd.",
      dance: "The Rai dance of the autumn night as the 'Jawa' of the harvest; Nautanki and Swang's theatrical dance keep the village stage.",
      dress: "Chanderi and Maheshwari saris float in the bund's evening - cotton and silk for temples and fairs.",
      beliefs: "Omkareshwar and Mahakaleshwar, the Narmada's parikrama, the Gond goddess of the southern forests and the buddhist shade of Sanchi.",
      food: [
        { dish: "Dal Bafla", region: "Malwa", description: "Baked wheat dumplings dipped in ghee, with dal.", context: "The bafla's slightly-damp Malwa brother of dal-baati." },
        { dish: "Poha Jalebi", region: "Indore / Bhopal", description: "Flattened-rice breakfast with a fried sugar spiral.", context: "The iconic heartland street breakfast." },
        { dish: "Bhutte ka Kees", region: "Indore", description: "Grated corn simmered with spices and milk.", context: "The monsoon corn-dish of the city." }
      ],
      festivals: [
        { name: "Khajuraho Dance Festival", note: "A February staging of classical dance among the temples." },
        { name: "Narmada Parikrama", note: "The sacred walk around the river's entire course." },
        { name: "Shiva festival at Omkareshwar", note: "The island-temple's Mahashivratri." }
      ],
      crafts: [
        { craft: "Gond Painting", place: "Gond Art", note: "Dot-and-line forest art on canvas." },
        { craft: "Chanderi Saree", place: "Chanderi", note: "Sheer-weave with gold, GI-tagged." },
        { craft: "Maheshwari Saree", place: "Maheshwar", note: "The Narmada's weaving town." }
      ],
      heritage: [
        { site: "Khajuraho", type: "UNESCO World Heritage", note: "The Chandela temple city." },
        { site: "Sanchi", type: "UNESCO World Heritage", note: "The Great Stupa of the dharma." },
        { site: "Bhimbetka", type: "UNESCO World Heritage", note: "40,000-year-old painted shelters." }
      ],
      thenNow: [
        { theme: "The painted wall becomes canvas", then: "Gond art was painted on walls and floors of the forest home.", now: "The Pardhan brush became a global art with the Foundation of Bharat Bhavan's guides.", note: "The forest grew to the world wall." },
        { theme: "The stupa by the village", then: "Sanchi has been a pilgrims' drum for two millennia.", now: "A conservation park guarding the dharma wheel.", note: "The wheel still turns, baptised in stone." }
      ],
      wonder: {
        type: "cultural",
        title: "The Great Stupa of Sanchi",
        note: "A hemisphere of brick on which the dharma was literally set in motion - the wonder we carry is a wheel that made a circle of the entire sky."
      }
    }
  },
  "mh": {
    id: "mh", name: "Maharashtra", type: "State", region: "West",
    capital: "Mumbai", languages: ["Marathi"],
    preview: "From the rock-cut caves of Ajanta to the streets of the Maratha king - Maharashtra, where the warrior and the poet shared a language.",
    profile: {
      land: "Maharashtra is a long Deccan spine: the Western Ghats lift its plateau edge, the Godavari and Krishna cross its boulder uplands, and the Konkan coast drops to the Arabian Sea.",
      history: [
        { era: "Rock-cut Buddhism", span: "2nd c. BCE - 7th c. CE", text: "Ajanta, Ellora, Karle and Bhaja turned the Deccan's basalt cliffs into sanctuaries." },
        { era: "Deccan dynasties", span: "8th - 15th c.", text: "Rashtrakutas and Yadavas ruled from the plateau heart; the Badami tradition joined the cave to the temple." },
        { era: "Chhatrapati Shivaji", span: "1630 - 1680", text: "Shivaji built a swarajya from hill forts that changed the politics of the Deccan." },
        { era: "Modern Maharashtra", span: "1956 - 1960", text: "With Bombay at its heart, Maharashtra rose as the commercial and cultural power of west India." }
      ],
      architecture: [
        { name: "Ajanta Caves", place: "Aurangabad district", type: "UNESCO World Heritage", note: "Buddhist rock-cut prayer halls painted in their first monastic rains." },
        { name: "Ellora Caves", place: "Ellora", type: "UNESCO World Heritage", note: "The Kailasa temple carved as a whole from one cliff." },
        { name: "Gateway of India", place: "Mumbai", type: "Monument", note: "The basalt arch over the Bombay harbour." }
      ],
      arts: "Warli folk painting, the paithani loom and the bidi and Peshwai of the village festival belong to Maharashtra's painted and woven arts.",
      music: "Lavani's bol, the devotional abhang sung from the Varkari tradition of Dnyaneshwar and Tukaram, and the Natya Sangeet of the Marathi stage.",
      dance: "The Lavani dance-theatre, the skill of the lezim and the Tamasha troupes, and the powada ballad of Shivaji's glory.",
      dress: "The nauvari (nine-yard) sari, the lugda of the paddy-field, and the Peshwai-nauvari of brides of the Deccan.",
      beliefs: "The Vitthal of Pandharpur, the town palanquins of the Varakari, the Goddess of the fort, and the Khandoba of the cattle-crosses paint the faithful year.",
      food: [
        { dish: "Misal Pav", region: "Pune / Mumbai", description: "A spicy sprout curry with farsan, onion and pav.", context: "The late-morning fire of the Marathi appetite." },
        { dish: "Puran Poli", region: "Festivals", description: "Whole-wheat flatbread stuffed with sweet chana dal.", context: "The festival meal of every Marathi house." },
        { dish: "Vada Pav", region: "Mumbai", description: "Fried potato dumpling in a bun with chutney.", context: "Mumbai's own street-fast, born of the textile mills." },
        { dish: "Usal", region: "Colaba Varadi", description: "A sprout-and-pea curry from the Koli—the net-thrower." }
      ],
      festivals: [
        { name: "Ganesh Chaturthi", note: "The great home-coming festival of the elephant-headed god, led by the sea-dunking immersion." },
        { name: "Dassera at Raigad", note: "The warrior festival of the fort's memory." },
        { name: "Pune's Ganeshotsav", note: "The sarvajanik festival begun by Lokmanya Tilak." }
      ],
      crafts: [
        { craft: "Paithani Saree", place: "Paithan", note: "Gold-and-silk weave with the strip border." },
        { craft: "Warli Painting", place: "Jawhar", note: "Tribal ring-mandala line art of the western hills." },
        { craft: "Kolhapuri Chappals", place: "Kolhapur", note: "Hand-stitched leather sandals." }
      ],
      heritage: [
        { site: "Ajanta and Ellora", type: "UNESCO World Heritage", note: "The Basalt cavern-basilicas of the Deccan." },
        { site: "Elephanta", type: "UNESCO World Heritage", note: "The island shrine to the Trimurti." },
        { site: "Chhatrapati Shivaji Terminus", type: "UNESCO World Heritage", note: "The Victorian-Gothic railway cathedral of Bombay." }
      ],
      thenNow: [
        { theme: "The hill forts", then: "Shivaji's swarajya was won and held fort by fort.", now: "Raigad and Sinhagad draw pilgrims and trekkers to the same ridge.", note: "The fort became a flag again." },
        { theme: "The Konkan net", then: "Koli fishing villages fed the harbour before the port.", now: "The same nets cast beside skyscraper lights.", note: "The catch belongs to the city." }
      ],
      wonder: {
        type: "architectural",
        title: "The Kailasa Temple, Ellora",
        note: "A single mountain cut from the top down into a free-standing temple - the wonder we carry is stone that tournaments with its own gravity."
      }
    }
  },
  "mn": {
    id: "mn", name: "Manipur", type: "State", region: "Northeast",
    capital: "Imphal", languages: ["Meitei (Manipuri)", "others"],
    preview: "The jewel of the hills - Ras Lila's moon-dance, the polo of the meadows and the Phanek of the war-drum.",
    profile: {
      land: "Manipur is a valley ringed by mountains, its heart the Loktak lake and its green hills of pine and bamboo falling toward Myanmar.",
      history: [
        { era: "The royal valley", span: "ancient", text: "The Meitei kingdom of the valley and the hill tribes of the surrounding mountains were linked by war, trade and the lake." },
        { era: "Hsata and Vaishnava renewal", span: "18th c.", text: "After the king's conversion, Vaishnava Rasalila and the Meitei pung discipline fused into the classical Manipuri arts." },
        { era: "The frontier wars", span: "19th - 20th c.", text: "Glimpsed in the world wars and the British-Anshan wars, Manipur kept a garrison in the valley." },
        { era: "Statehood", span: "1950 - present", text: "A full state of India, long shadowed by hills now opening to the lake and the world." }
      ],
      architecture: [
        { name: "Sangai and Loktak", place: "Loktak lake", type: "Natural wonder", note: "The only floating-national-park, the world's largest floating 'phumdi' island-lake." },
        { name: "Kangla Fort", place: "Imphal", type: "Historic fort", note: "The pillar of the Meitei kingdom, the 'heart of Manipur'." }
      ],
      arts: "Bamboo craft, pottery and the fine cloth of the valley - along with the painted durah (scroll) of the Meitei palace - carry the arts of hill and lake.",
      music: "The Pena - the single-string fiddle of the Lai Haraoba - and the pung drum of the Ras Lila keep the Meitei pulse.",
      dance: "The Manipuri Ras Lila, the martial dance Thang-Ta and the folk dances of the Meitei hills make the valley one of the classical dance-homes of India.",
      dress: "The phanek sari folded in the Meitei way, the navel-less shirting and the pottery-throw of the court, all half-silk in the rain.",
      beliefs: "The hill deities and the Lai Haraoba festival of Sanamahi, the Vaishnava Ras of Sri Krishna's dance, and the indigenous Nat-Govinda order of the court.",
      food: [
        { dish: "Iromba", region: "Valley", description: "Fermented fish chutney.", context: "The umami pulse of every Manipuri meal." },
        { dish: "Erom", region: "Meithei", description: "Fish curry with a sour herb (maroi).", context: "The daily valley dish." },
        { dish: "Chak-Koji", region: "Meitei", description: "Sweets of the festival table." }
      ],
      festivals: [
        { name: "Cheiraoba", note: "The Meitei New Year at the dawn of the spring." },
        { name: "Lai Haraoba", note: "The festival of the local gods with the pung and the pena." },
        { name: "Sana Agidzoe (Ras Purnima)", note: "The grand manifestation of Raas Lila." }
      ],
      crafts: [
        { craft: "Phanek", place: "Kumbi", note: "Hand-loom semi-sari with block print of the hill design." },
        { craft: "Khwai", place: "Valley", note: "The liquor-bottle gourd-wood cup of the hills." }
      ],
      heritage: [
        { site: "Loktak", type: "National lake", note: "And its floating-phumdi island fish-ta." },
        { site: "The Pung and Pena music", type: "Intangible", note: "One of the classical drums of the hills." }
      ],
      thenNow: [
        { theme: "The Ras of the dance", then: "Ras Lila was hidden in the court of the Meitei kings.", now: "Now performed the world over on classical stages.", note: "The hill let its veil slip upward." },
        { theme: "The lake's shoe", then: "The phumdis floated, carrying whole communities on living soil.", now: "The lake is now a national park and a fragile home of the sangai deer.", note: "The floating island learned it is also a heritage." }
      ],
      wonder: {
        type: "natural",
        title: "Loktak Lake and the worlds of the phumdi",
        note: "The only platform of living soil in the valley - the wonder we carry is a land that floats on its own fishing lake."
      }
    }
  },
  "ml": {
    id: "ml", name: "Meghalaya", type: "State", region: "Northeast",
    capital: "Shillong", languages: ["Khasi", "Garo", "English"],
    preview: "The abode of clouds - living root bridges, the rain of Mawsynram and the matrilineal Khasis.",
    profile: {
      land: "Meghalaya is a wet plateau of the eastern Himalaya's southern edge, its southern slopes the wettest place on earth, its valleys falling toward Bangladesh.",
      history: [
        { era: "The Garo and Khasi hill-worlds", span: "ancient", text: "The Garo and Khasi clans kept their councils and their matrilineal descent in the forested plateaux." },
        { era: "Matriliny", span: "tradition", text: "Descent passes through the mother - the youngest daughter inherits the home." },
        { era: "Frontier hills", span: "19th c.", text: "The British fixed the hills as a separate district (1874) under the umbrella of Assam." },
        { era: "Statehood", span: "1972 - present", text: "Meghalaya became a full state in 1972, the 'abode of clouds' of the rainbelt." }
      ],
      architecture: [
        { name: "Living Root Bridges", place: "Maws-Maw villages", type: "Living bridges", note: "Rubber-fig roots trained across streams for centuries - functional and organic." },
        { name: "Mawsynram and Cherrapunji", place: "Southern slopes", type: "Rain stations", note: "Among the rainiest places on Earth." },
        { name: "Krem Liat Prah", place: "Khasi hills", type: "Cave system", note: "One of India's longest cave systems." }
      ],
      arts: "The woven shawl of the Khasis and the cane-and-bamboo craft of the Phanai are the everyday arts of the plateau.",
      music: "The Kucingi and the Siong sung through bamboo flutes and drums of the harvest of the monsoonal villages.",
      dance: "The circle dance of the Rongku and the men's 'Nong-Krem' Tsiet dance animate the feasts of the matrilineal clans.",
      dress: "The Khasi jainsem (togo) and the Garo dendu of the women carry the old weaves of the rain.",
      beliefs: "The Khasis' Sju and Garo's Songrai ancestral spirit cults, and the Christian faith of the modern hills meet in one sky.",
      food: [
        { dish: "Jadoh", region: "Khasi", description: "Red rice and pork pilaf.", context: "The harvest dish of the plateau." },
        { dish: "Wy Ki Sphel", region: "Khasi", description: "Pork and meat cooked with dry fish and spices.", context: "The festive dish of the Khasi family." },
        { dish: "Kha Khup", region: "Khasi", description: "Rice cakes steamed with meat.", context: "The comfort of the rain-harvest evening." }
      ],
      festivals: [
        { name: "Wangala", note: "The Garo harvest festival of the hundred drums." },
        { name: "Nong-Krem", note: "The Khasi dance-song festival of winter." },
        { name: "Shad-Suk", note: "The spring dance of the arrival of the mist." }
      ],
      crafts: [
        { craft: "Bamboo craft", place: "Plateau", note: "Cane furniture and utensils." },
        { craft: "Wool shawls", place: "Khasi", note: "The hand-loomed shawl of the hills." }
      ],
      heritage: [
        { site: "Nokrek", type: "National Park", note: "The last reserve of wild citrus." },
        { site: "Balpakram", type: "National Park", note: "The refuge of the cloud-forest." }
      ],
      thenNow: [
        { theme: "The root bridge", then: "Rubber-fig webs took decades to grow across the gorges.", now: "The same roots now carry tourists and guards of the rain-forest.", note: "The bridge grew older, taller, needed." },
        { theme: "The matrilinear home", then: "The furrow women kept the fields and the house.", now: "The constitution of the woman keeps its threads in law too.", note: "Authority stayed in the loom's matriarch." }
      ],
      wonder: {
        type: "natural",
        title: "The Living Root Bridges of Meghalaya",
        note: "Functional timber grown, not built - the wonder we carry is a bridge that keeps its own caesar alive."
      }
    }
  },
  "mz": {
    id: "mz", name: "Mizoram", type: "State", region: "Northeast",
    capital: "Aizawl", languages: ["Mizo", "English"],
    preview: "The land of the high-landers - bamboo villages, the Cheraw pole-dance and the free church hills.",
    profile: {
      land: "Mizoram is a high, cool ridge of the eastern range, ribbed by forested valleys and falling south to Myanmar - a world of bamboo, mist and song-hills.",
      history: [
        { era: "The Mizos' southward journey", span: "mythic", text: "The Mizo clans remember a mountain journey from the east into the present high ridges." },
        { era: "The clan worlds", span: "pre-colonial", text: "Independent village communities governed by chiefs and the council of elders.", },
        { era: "The Second World War", span: "1944", text: "Aizawl was bombed, and the region carried the strain of the eastern war." },
        { era: "Statehood", span: "1972 - present", text: "From Union Territory (1966) to a full hill state of the Northeast in 1972." }
      ],
      architecture: [
        { name: "Mizo bamboo homes", place: "Village ridges", type: "Vernacular", note: "Raised bamboo houses built to breathe the monsoon." },
        { name: "Theatres of the church", place: "Aizawl", type: "Community hall", note: "The great church-less squares of Mizo life." }
      ],
      arts: "Puan weaving of the Mizo women, the bamboo cornel-and-cane wares, and the intricate ornamentation of the Mizo wall-symbol.",
      music: "Hymns of the church hills, the harvest khuallam drum, and the pan and bamboo flutes of the young keep the Mizo air turning.",
      dance: "The Cheraw (bamboo) dance, the Khuallam circle and the Chheihlam's sway weave the Mizo rhythm.",
      dress: "The puan (loom-cloth) as sar, full and draped at the women's waist, with a festive horizontal stripe.",
      beliefs: "The soul rituals of the Bawlsap and the ancestor-drum lost to the church; today the Mizo churches and the old Zomi spirits of the hills coexist.",
      food: [
        { dish: "Misa Machis", region: "Mizoram", description: "A pungent, bamboo-shoot fish curry.", context: "The North-East umami of the high hills." },
        { dish: "Loris", region: "Mizo", description: "Flat rice paste of the morning.", context: "The everyday monsoon start." }
      ],
      festivals: [
        { name: "Chapchar Kut", note: "The past-harvest spring festival of bamboo, dance and song." },
        { name: "Mim Kut", note: "The August festival of the dead and the maize." },
        { name: "Pawll Kut", note: "The December festival of the clearing and thanks." }
      ],
      crafts: [
        { craft: "Puan", place: "Lushai / Aizawl", note: "The hand-woven cloth of the Mizo year." },
        { craft: "Bamboo and cane", place: "Inns", note: "Baskets and fish-traps of the forest." }
      ],
      heritage: [
        { site: "Murlen National Park", type: "National Park", note: "The forest of the west." },
        { site: "Phawngpui", type: "Peak", note: "The 'Blue Mountain' of the south." }
      ],
      thenNow: [
        { theme: "From aijawl to Aizawl", then: "The village chuong ruled by council and council-ring.", now: "Aizawl is a state capital of book-cities and bands.", note: "The hill kept its ridge, the walking kept its song." }
      ],
      wonder: {
        type: "natural",
        title: "Phawngpui, the Blue Mountain",
        note: "A bald blue peak above the wet mist - the wonder we carry is a summit that lets the cloud rest, briefly, on earth."
      }
    }
  },
  "nl": {
    id: "nl", name: "Nagaland", type: "State", region: "Northeast",
    capital: "Kohima", languages: ["English", "Naga languages"],
    preview: "The warrior hills of the Hornbill - morung timber, shawl stripes and the dance of the full-moon night.",
    profile: {
      land: "Nagaland is a green ridge of the eastern range, its peaks falling to Myanmar and its Dudhphung river carving the wet basins.",
      history: [
        { era: "The clans and morungs", span: "ancient", text: "The Naga village-democracies raised the morung (men's house) of the warrior traditions." },
        { era: "The first contact", span: "19th c.", text: "Naga hills were bounded by the Assam plain and the British 'pacific' experiments; their identity distilled in the 20th-century warfare." },
        { era: "The Hornbill accord", span: "1963 - 1975", text: "From a state in 1963 and the peace with the Naga accord (1975)." },
        { era: "A modern Naga world", span: "present", text: "Kohima and Mokokchung now host fairs of craft, song and the bright shawl-wearers." }
      ],
      architecture: [
        { name: "The Morung", place: "Village", type: "Wooden longhouse", note: "The sacred men's house of the tribe, carved with the bull's head." },
        { name: "Kohima War Cemetery", place: "Kohima", type: "Memorial", note: "The battle-field of the 1944 Kohima - 'a tree to remember'." }
      ],
      arts: "The shawls of the tribes - the Ao, Konyak, Sema - wear the clan-stripe and the 'op': textile as identity and biography.",
      music: "The heavy wooden rhythm of the war-gong and the tune of the bamboo trumpet sound in every morung festival.",
      dance: "The eagle-and-sparrow mimetic dances, the masked cuckoo-tae dance of the men and the simple ring of the harvest fire.",
      dress: "The woven shawls with their black, red and white bands claim a clan at a glance; the ceremonial headdress of the brave is feathered and bold.",
      beliefs: "Reverence for ancestors, forest and the spirits of the hills, now held beside a strong Christian faith of the modern highlands.",
      food: [
        { dish: "Smoked Pork with Axone", region: "Nagaland", description: "Pork with fermented soybean, fiery with the Naga bhut jolokia.", context: "The umami and fire of the Naga table." },
        { dish: "Bamboo Shoot Stew", region: "Hills", description: "Tender bamboo with dried fish.", context: "The monsoon bowl of the villages." },
        { dish: "Naga Curry", region: "Across Nagaland", description: "Chicken or fish in basil, bhoots and ginger smoke." }
      ],
      festivals: [
        { name: "Hornbill Festival  ", note: "The December festival of all the tribes, named for the hornbill bird." },
        { name: "Sekrenyi", note: "The Ao spring festival of the seed." },
        { name: "Moatsü", note: "The Aos' harvest-festival of the da-s." }
      ],
      crafts: [
        { craft: "Naga Shawls", place: "Every clan", note: "Hand-loom cloth in clan-stripe codes." },
        { craft: "Tsung-Beads and Brass", place: "Hills", note: "The heirloom beads and brass of the necklace." }
      ],
      heritage: [
        { site: "Dzuko Valley", type: "Valley", note: "A rolling pasture of the hills." },
        { site: "Kohima War Cemetery", type: "Memorial", note: "The famous 'sleeping on nothing' ridge." }
      ],
      thenNow: [
        { theme: "The full-moon fire", then: "Feasts and feuded dances were held around the village gong.", now: "The Hornbill Festival awakens the same fire for visitors.", note: "The moon still brings the dancers out." }
      ],
      wonder: {
        type: "living",
        title: "The Hornbill, honour of the hills",
        note: "A bird whose plume once proved courage - the wonder we carry is a festival built around a pair of wings."
      }
    }
  },
  "od": {
    id: "od", name: "Odisha", type: "State", region: "East",
    capital: "Bhubaneswar", languages: ["Odia"],
    preview: "The temple city of Bhubaneswar, the great Chariot festival of Puri and the silver filigree - Odisha, land of the eons of stone.",
    profile: {
      land: "Odisha is a long coast of deltas and lakes (Chilika) rising to the Eastern Ghats and the mineral belts of the west - a state of palms, paddy and carving.",
      history: [
        { era: "Kalinga and Ashoka", span: "3rd c. BCE", text: "The Kalinga war so turned Ashoka that he vowed to walk the dharma; Odisha was the site of the change." },
        { era: "The temple builders", span: "7th - 13th c.", text: "Orissa's temple school made Bhubaneswar, Puri and Konark cities of the rekha deul." },
        { era: "The Gajapati kingdom", span: "15th - 16th c.", text: "The Gajapati of Puri held an empire of fourteen lakh - ritual and art gone religious." },
        { era: "Modern Odisha", span: "1912 - present", text: "A separate Odia province was created in 1912, later a full state of the language." }
      ],
      architecture: [
        { name: "Sun Temple, Konark", place: "Konark", type: "UNESCO World Heritage", note: "The black pagoda built as a carved chariot of the sun-god Surya." },
        { name: "Jagannath Temple", place: "Puri", type: "Great temple", note: "The axis of the world, the enthroned Jagannath of the Khurda monarchy." },
        { name: "Lingaraj Temple", place: "Bhubaneswar", type: "Temple", note: "The largest of the Bhubaneswar temple forest, guarding the sacred tank of Bindusagar." }
      ],
      arts: "The Pattachitra scroll-painters of Raghurajpur, the wood engraving and the filigree silver of Cuttack carry the temple's imagery into cloth and metal.",
      music: "Odia's devotional Odissi music, the folk songs of the gopala (cowherd) and the Raghu of the temple.",
      dance: "Odissi - with its tribhanga (three-bend) and the chant of the Silu - is Odisha's gift to the classical stage; the Ghoda (horse) and Jatra folk forms follow.",
      dress: "The Sambalpuri ikat sari and the brass-and-gold temple silk of the coastal weddings; the patta and jhotwari thread of the weaver.",
      beliefs: "The Jagannath triad of Puri is the hinge of Odia devotion; beside it stand the mother-goddess of the coast, the Kandula dharma and the temple's annual mysteries.",
      food: [
        { dish: "Dalma", region: "Odisha", description: "A light moong-dal and vegetable stew.", context: "The everyday companion of the temple thali." },
        { dish: "Rasagola of Pahala", region: "Pahala", description: "Soft cheese balls in syrup, GI-tagged to Odisha.", context: "The sweet tied to the Jagannath service." },
        { dish: "Pakhal", region: "Rural Odisha", description: "Fermented leftover rice, cooled in water.", context: "The farmer's monsoon meal." }
      ],
      festivals: [
        { name: "Ratha Yatra, Puri", note: "The great chariot-festival when Jagannath rides out." },
        { name: "Durga Puja of Cuttack", note: "The celebrated silvery city pujas." },
        { name: "Dhanu Yatra", note: "The world's longest open-air drama of Bargarh." }
      ],
      crafts: [
        { craft: "Pattachitra", place: "Raghurajpur", note: "Scroll-painters of the sacred mythology." },
        { craft: "Silver Filigree", place: "Taraka", note: "The delicate wire-silver of Cuttack." },
        { craft: "Sambalpuri Ikat", place: "Sambalpur", note: "Tie-dye and weft ikat in geometric orders." }
      ],
      heritage: [
        { site: "Sun Temple at Konark", type: "UNESCO World Heritage", note: "The pagoda-chariot of the sun." },
        { site: "Chilika Lake", type: "Wetland", note: "A Ramsar lagoon of dolphins and black-bellied terns." }
      ],
      thenNow: [
        { theme: "The sun's chariot", then: "Konark's horses were the temple's ritual at the sea.", now: "The temple's stone still rides a ghost of the chariot.", note: "The wheel became a monument." },
        { theme: "Jagannath's ride", then: "The images were made in secret, every twelve years.", now: "The Murti presses the same secrecy through the Khansari service.", note: "The mystery became a ritual of the family." }
      ],
      wonder: {
        type: "architectural",
        title: "The Sun Temple of Konark",
        note: "A stone chariot stalled at the shore of the sea, its wheels turning only in the sky - the wonder we carry is a great wheel that never needed to move."
      }
    }
  },
  "pb": {
    id: "pb", name: "Punjab", type: "State", region: "North",
    capital: "Chandigarh", languages: ["Punjabi"],
    preview: "The land of five rivers - the Golden Temple's still water, bhangra's spring and the wheat of the grand trunk road.",
    profile: {
      land: "Punjab, 'the land of five rivers', is a fertile flat of the Sutlej, Beas and Ravi's doabs - the great granary of northwest India.",
      history: [
        { era: "The Vedic doab", span: "early", text: "The Rigvedic Saraswati and the Indus's five sister-rivers watered the ancient Punjab and its early pastures." },
        { era: "The Sikh faith", span: "15th - 18th c.", text: "Guru Nanak's teaching and the Sikh Gurus' Panth transformed the region's faith, ending in the Khalsa of 1699." },
        { era: "Maharaja Ranjit Singh", span: "1799 - 1839", text: "The Sikh Empire under the 'Lion of Punjab' made Lahore and Amritsar its centres." },
        { era: "Partition and Punjab", span: "1947 - 1966", text: "Partition crossed the land; the state split further into Punjab, Haryana and Himachal in 1966." }
      ],
      architecture: [
        { name: "Golden Temple", place: "Amritsar", type: "Gurdwara", note: "The Harmandir Sahib, gilded over the Amrit-sarovar, open to all with the langar's free meal." },
        { name: "Jallianwala Bagh", place: "Amritsar", type: "Memorial", note: "The walled martyrs' garden of the 1919 massacre." },
        { name: "Partition Museum", place: "Amritsar", type: "Museum", note: "The old Town Hall's witness to the 1947 division." }
      ],
      arts: "The phulkari embroidery and bagh shawls, the cauliflower-applique of the village dress, and the mural touch of the Golden Temple are Punjab's cloth-stories.",
      music: "The Gurbani and the rabab's hymnody were born here; the folk Giddha songs, the taashi and the high alaaps of the dhol answer the fields.",
      dance: "Bhangra's wild harvest jumps and Giddha's mirror of the women answer the same spring.",
      dress: "The kurta-pajama, the tall turban and the chadar of the fields follow the woven textiles of the doab.",
      beliefs: "The Khalsa discipline of the Khanda, the pageantry of the Sikh festival of Baisakhi, and the shared Punjab of farmer and saint.",
      food: [
        { dish: "Makki di Roti and Sarson da Saag", region: "Punjab", description: "Wheat-makki flatbread with mustard-leaf saag and white butter.", context: "The emblem of the Punjab winter." },
        { dish: "Paneer Tikka", region: "Cities", description: "Grilled cottage cheese in yogurt-spices.", context: "The tandoor of the Punjabi dhaba." },
        { dish: "Amritsari Kulcha", region: "Amritsar", description: "Stuffed leavened bread with chole.", context: "The street-food of the holy city." },
        { dish: "Pinni / Phirni", region: "Festival", description: "Wheat-butter sweet with dry fruit.", context: "The winter and wedding sweet of the Punjab." }
      ],
      festivals: [
        { name: "Baisakhi", note: "The April harvest festival that is also the Sikh new year." },
        { name: "Lohri", note: "The January bonfire of the winter fields." },
        { name: "Gurpurab", note: "The processions of the Gurus' birth and martyrdom." }
      ],
      crafts: [
        { craft: "Phulkari", place: "Punjab", note: "Flower-stitch embroidery of the women's shawl." },
        { craft: "Bags and leather", place: "Bathinda", note: "Buffalo-hide 'Juti' ornamented." }
      ],
      heritage: [
        { site: "Harmandir Sahib, Amritsar", type: "Gurdwara", note: "The Golden Temple's open pilgrimage." },
        { site: "Ranjit Sagar and the Punjab plains", type: "Landscape", note: "The breadbasket of the Indus doab." }
      ],
      thenNow: [
        { theme: "The langar kitchen", then: "The Gurus' free kitchen fed every devotee.", now: "The Golden Temple's langar still feeds hundreds of thousands daily.", note: "The table never closed." },
        { theme: "Bhangra's field", then: "A harvest dance of the men of the villages.", now: "Bhangra is the world's adopted spring beat.", note: "The field hopped to the diaspora." }
      ],
      wonder: {
        type: "living",
        title: "The Langar of the Golden Temple",
        note: "A kitchen that has never stopped feeding - the wonder we carry is a religion whose first commandment is a shared meal."
      }
    }
  },
  "rj": {
    id: "rj", name: "Rajasthan", type: "State", region: "North",
    capital: "Jaipur", languages: ["Hindi", "Rajasthani dialects"],
    preview: "The desert of amber and melis - painted havelis, the war-march of the Rajputs and the camels of the Thar.",
    profile: {
      land: "Rajasthan, 'the land of kings', is the Thar desert ringed by the Aravalli range, a country of dunes, lakes, step wells and rock-fort cities.",
      history: [
        { era: "The Rajput courts", span: "8th - 19th c.", text: "The Chauhan, Rathore, Sisodia and Kachhwaha kingdoms raised the forts of Chittorgarh, Jodhpur and Jaipur." },
        { era: "Mewar's heroic", span: "13th - 17th c.", text: "The Sisodias of Mewar never gave the Mughals a daughter; the seige of Chittor became a legend." },
        { era: "The desert trade", span: "medieval", text: "Jaisalmer's and Jodhpur's camel caravans crossing the Thar toward Persia opened the desert to the world." },
        { era: "Modern Rajasthan", span: "1949 - present", text: "The princely states merged in 1949-56 into one Rajputana - and Jaipur was its Pink City." }
      ],
      architecture: [
        { name: "Amber Fort", place: "Jaipur", type: "Fort", note: "The Mughal-Rajput palace-fort settled above the ghat." },
        { name: "Hawa Mahal", place: "Jaipur", type: "Palace of winds", note: "The five-storey honeycombs of hawa letting the women's court watch unseen." },
        { name: "Chittorgarh", place: "Chittorgarh", type: "UNESCO fort", note: "The greatest of the Rajput hill-forts." }
      ],
      arts: "The miniature and the 'Mewar Raagamala' painting, the phad scrolls and the blue-pottery of Jaipur square the classic arts of the desert court.",
      music: "The manganiyars and langas singers with their khartal, the maand of the desert and the saat-sa of the world's mariners - Rajasthan's music is a caravan.",
      dance: "The ghoomar spin-jump of the desert women, the kachchi ghodi of the bridegrooms and the kalbeliya snake-mimic dance.",
      dress: "The bandhani choli and the gaiting odhni of the veil, the mirrored lehenga skirt and the men's saffron angarkhi - colours of the desert.",
      beliefs: "The warrior-god of Khatu Shyam, the folk saints of the famine-stoic village, and the desert shrines of Marwar and Mewar give the Thar its faith.",
      food: [
        { dish: "Dal Baati Churma", region: "Rajasthan", description: "Wheat dumplings baked in the stove, soaked in ghee, with dal and sweet churma.", context: "The warrior's field meal of the desert." },
        { dish: "Gatte ki Sabzi", region: "Rajasthan", description: "Gram-flour dumplings in a yogurt curry.", context: "The vegetarian fire of the dry land." },
        { dish: "Laal Maas", region: "Jaipur", description: "Mutton in a fiery desert chilli paste.", context: "The Mathania chilli turns the dish a deep red." }
      ],
      festivals: [
        { name: "Pushkar Camel Fair", note: "The great camel and turban fair by the sacred Pushkar lake." },
        { name: "Teej", note: "The monsoon swing-feast of the daughters of Jaipur." },
        { name: "Desert Festival, Jaisalmer", note: "Turban, dance and carpet under the golden dunes." }
      ],
      crafts: [
        { craft: "Bandhani", place: "Jaipur", note: "The tie-dye linked to the chola." },
        { craft: "Blue Pottery", place: "Jaipur", note: "The turquoise glaze of the desert court." }
      ],
      heritage: [
        { site: "Hills and Forts of Rajasthan", type: "UNESCO", note: "The six great hill forts of the desert." },
        { site: "Jaipur", type: "UNESCO City", note: "The 'Pink City' planned as one grid." },
        { site: "Keoladeo National Park", type: "UNESCO", note: "Bharatpur's visitor gate of the bar-headed geese." }
      ],
      thenNow: [
        { theme: "The trade of colour", then: "Indigo and madder cloth was the desert's purse across the camel routes.", now: "The same madder lives on in the bandhani sold worldwide.", note: "The bales changed hands, the colour stayed." },
        { theme: "The court painters", then: "Phad narrative cloths moved from village to village.", now: "The same phad hangs in the Jaipur art-house.", note: "The scroll found its frame." }
      ],
      wonder: {
        type: "architectural",
        title: "The Hawa Mahal, Jaipur",
        note: "A wall of windows with no audience but the street - the wonder we carry is a palace built to be a window."
      }
    }
  },
  "sk": {
    id: "sk", name: "Sikkim", type: "State", region: "Northeast",
    capital: "Gangtok", languages: ["Nepali", "Sikkimese (Lepcha)", "Bhutia", "Hindi"],
    preview: "A snow-tipped Buddhist kingdom - Kanchenjunga's throne, the mask-dance of the gompas and the terraces of Sikkim.",
    profile: {
      land: "Sikkim climbs the Kangchenjunga shoulder through terraced valleys of rhododendron, cardamom and millet - a tiny kingdom of steep green and snow.",
      history: [
        { era: "The Lepcha cradle", span: "ancient", text: "The Lepcha people called it Nyenk-gu-tho-ngu - welfare-abode of man." },
        { era: "Buddhist dynasty", span: "1642 - 1975", text: "The Namgyal dynasty converted Sikkim to Buddhist dominion; the gompas and the lamas of Chogyal governed." },
        { era: "Protectorate", span: "1890 - 1975", text: "Sikkim became a British protectorate, then the last kingdom to join India in 1975." },
        { era: "Modern state", span: "1975 - present", text: "Sikkim became the 22nd state, famed for its organic farming and the Kanchenjunga walk." }
      ],
      architecture: [
        { name: "Rumtek Monastery", place: "Rumtek", type: "Monastery", note: "The fine Tibetan gompa of the Rumtek hermit." },
        { name: "Tsong", place: "Tson", type: "Monastery", note: "A ninth-generation watch-prayer fortress." },
        { name: "En-Darwa", place: "Gangtok", type: "Monastery", note: "The painted Tibetan gallery of the capital - 'balanced at a kiss'." }
      ],
      arts: "Thangka scroll painting of the gompas, hand-woven carpets and the bamboo ware of the hills carry Sikkim's craft world.",
      music: "The Buddhist monastic chant with cymbals and long horns, and the folk songs of the Nepali and Lepcha hills, ring the Sikkim nights.",
      dance: "The masked Chaam dance of the monks and the folk circles of the Lepcha and Bhutia villages thread the Sikkim rhythm.",
      dress: "The Bakhu (kimono) of the Lepcha and the Nepali daura-suragu, warm with the woollen bhangu.",
      beliefs: "The mountain god of Kangchenjunga, the Buddhist khangchendzonga legend, and the Nepali festivals of Dasain and Diwali together ring the Sikkim year.",
      food: [
        { dish: "Gyanthak Thukpa", region: "Gangtok", description: "A hot noodle soup of the high night.", context: "The warm bowl of the Sikkim cold." },
        { dish: "Momo", region: "Street stalls", description: "Steamed stuffed dumplings.", context: "The quick food of the Sino-Tibetan table." },
        { dish: "Kubo", region: "Lepcha homes", description: "A fermented millet brew.", context: "The Sikkimese mother of the dairy." },
        { dish: "Churpi", region: "Bhutia herders", description: "Dried curds, sweet and sour.", context: "The trail fare of the herders." }
      ],
      festivals: [
        { name: "Losar", note: "The Buddhist new year of fire and dance." },
        { name: "Saga Dawa", note: "The full-moon festival of the sipper of the Moon." },
        { name: "Chaam", note: "The masked en-dance before the winter." }
      ],
      crafts: [
        { craft: "Thangka", place: "Gompas", note: "The icon cloth of the monastery." },
        { craft: "Carpet weaving", place: "Char-Duk", note: "Hand-knotted, mountain-motif carpets." },
        { craft: "Chukupu", place: "Lepcha", note: "Bamboo cane-wrapping." }
      ],
      heritage: [
        { site: "Kangchenjunga", type: "Mountain", note: "The world's great snow-peak, sacred to all Sikkim." },
        { site: "Khangchendzonga National Park", type: "UNESCO World Heritage", note: "A high-alpine wilderness and the sacred biography of the mountain." }
      ],
      thenNow: [
        { theme: "The gompa's dance", then: "Mask-dances were guarded inside the monastery courtyards.", now: "The same chaam-dancers now perform at festivals worldwide.", note: "The monastery wall opened a gate." }
      ],
      wonder: {
        type: "natural",
        title: "Kangchenjunga, the five treasures of snow",
        note: "The third top of the earth, a massif that is itself the shrine - the wonder we carry is a mountain that turns the whole sky into worship."
      }
    }
  },
  "tg": {
    id: "tg", name: "Telangana", type: "State", region: "South",
    capital: "Hyderabad", languages: ["Telugu", "Urdu"],
    preview: "Golconda pearls, the Charminar's shadow and the lacquer of Nirmal - Telangana, the Deccan's court of diamonds and Qutb Shahi song.",
    profile: {
      land: "Telangana is the dry northern Deccan - a plateau of the Godavari's branches, rock-outcrop fortresses and the black-cotton soil that grows the cotton town.",
      history: [
        { era: "The Kakatiya glory", span: "12th - 14th c.", text: "Warangal's thousand-pillar temples and the rock-cathedral stood as the Kakatiya democracy at the state's heart." },
        { era: "Qutb Shahi and Golconda", span: "1518 - 1687", text: "Hyderabad was founded; Golconda fort and its pearl trade turned Telangana into a court of jewels." },
        { era: "The Asaf Jahi (Nizam) era", span: "1724 - 1948", text: "The Nizam's Hyderabad State - the largest princely state - shaped the dual Telugu-Urdu culture of the plateau." },
        { era: "Modern Telangana", span: "2014 - present", text: "Carved from Andhra Pradesh in 2014, Telangana now prints software and pearls from the same rock." }
      ],
      architecture: [
        { name: "Charminar", place: "Hyderabad", type: "Monument", note: "The four-towered arch at the heart of the old city, built in 1591." },
        { name: "Golconda Fort", place: "Hyderabad", type: "Fort", note: "The walled diamond-fort of the Qutb Shahs, acoustically perfect." },
        { name: "Qutb Shahi Tombs", place: "Hyderabad", type: "Tombs", note: "The domed necropolis of the seven Qutb Shahi kings." }
      ],
      arts: "Nirmal lacquer toys, the silks of Pochampally (silk ikat) and the bronze craft of the warangal. Handed on the Deccan table.",
      music: "The Nizam's sarangi courts, the Deccani tala, the qawwali of the shrines and the temple's nadaswaram - Telangana sings in both tongues.",
      dance: "Perini, the warrior dance of the Kakatiya, revived in dance schools; and Bonalu's procession-dance, when the women of the city move in July.",
      dress: "Pochampally ikat saris, the silver jewellery of the Nizam courts, and the ornate kolat of the Deccan bridal table.",
      beliefs: "The great Yadadri and Vemulawada temples, the Urs at the dargahs of the old city, and the Hindu and Muslim shrines that share every Telangana street.",
      food: [
        { dish: "Hyderabadi Dum Biryani", region: "Hyderabad", description: "Fragrant basmati layered with meat and sealed to steam.", context: "The Nizam's kitchen sent it down to every Dakhani home." },
        { dish: "Haleem", region: "Ramadan", description: "Wheat-meat slow-stew.", context: "The Iftar bowl of the Ramadan nights." },
        { dish: "Gongura Pappu", region: "Telangana", description: "A sour-sorrel dal.", context: "The tang of the Deccan field." },
        { dish: "Sarva Pindi", region: "Villages", description: "A spiced rice-griddle cake.", context: "The morning disc of the village." }
      ],
      festivals: [
        { name: "Bonalu", note: "The July festival of the mother-goddess with the ghatam carriers." },
        { name: "Bathukamma", note: "The floating flower-tower festival of the women of Telangana." },
        { name: "Deccan Festival", note: "Hyderabad's pearl-and-culture festival." }
      ],
      crafts: [
        { craft: "Pochampally Ikat", place: "Pochampally", note: "The tie-dye ikat silk, GI-tagged." },
        { craft: "Nirmal Toys", place: "Nirmal", note: "Lacquered wooden toys and lacquerware." },
        { craft: "Bidri Ware", place: "Hyderabad", note: "Black-metal silver-inlay, carried from Bidar." }
      ],
      heritage: [
        { site: "Golconda and its pearls", type: "Fort and trade", note: "The world's pearl-trade capital." },
        { site: "Warangal Fort", type: "Kakatiya monument", note: "Thousand-pillar temple and gate-arches." }
      ],
      thenNow: [
        { theme: "The pearl court", then: "Golconda's diamonds went to the world's crowns.", now: "Hyderabad's software now flies from the same rock.", note: "The treasury traded gem for byte." },
        { theme: "The floating flowers", then: "Bathukamma was a village goddess of the lotus.", now: "It is now a state-wide cultural homecoming.", note: "The flower-tower grew as tall as the city." }
      ],
      wonder: {
        type: "cultural",
        title: "Golconda - the fort of pearls",
        note: "A fort whose clap still carries a hundred metres to the palace - the wonder we carry is a locked door with perfect hearing."
      }
    }
  },
  "tr": {
    id: "tr", name: "Tripura", type: "State", region: "Northeast",
    capital: "Agartala", languages: ["Kokborok", "Bengali"],
    preview: "The Rajbari of Agartala, the moss-pages of the peeling hills and the Garia maize - Tripura, the valley of the north-east's green border.",
    profile: {
      land: "Tripura is a hilly frontier to the east of Bangladesh - a low range of green ridges, bamboo and pineapple dropping to the plains of the Surma valley.",
      history: [
        { era: "The Manikya dynasty", span: "15th - 20th c.", text: "The Manikya rajas ruled a princely state for centuries, patronising Bengali Hindu and Kokborok cultures." },
        { era: "The kings' courts", span: "19th c.", text: "Agartala's royal palace and the Ujjayanta Palace bear a Rajput-revival needle in the plain." },
        { era: "The 1949 merger", span: "1949", text: "Tripura joined the Indian Union as a princely state and became a Union Territory in 1956." },
        { era: "Statehood", span: "1972 - present", text: "A full state since 1972, home to a majority Bengali and a strong indigenous Tripuri population." }
      ],
      architecture: [
        { name: "Ujjayanta Palace", place: "Agartala", type: "Palace", note: "The grand white-and-gold palace of the Manikya kings, now a museum." },
        { name: "Matabari Temple", place: "Radhakishorepur", type: "Temple", note: "The hill abode of the mother-goddess." },
        { name: "Chabimura Caves", place: "Belonia", type: "Rock-cut shrines", note: "Rock-carved images in a gorge by the river." }
      ],
      arts: "The Tripuri rinai and the phea ornament, the bamboo-and-cane craft and the looms of the som and reng - the woven woven of the hills.",
      music: "The string of the Plong and the bamboo flute of the valley, and the solo-voice songs of the Rai-Bakai dance of the Garia.",
      dance: "The men's Hojagiri on an earthen pot, the Garia circle dance of sowing, and the masked Bijhu dance of the plains' Bengali holiday.",
      dress: "The rina wrap-sari and the cash cloth of the Tripuri woman, and the bisa and the long sleeves-and-uthari of the Bengali host.",
      beliefs: "The goddess Tripura Sundari and the indigent animism of the Reang and Tripuri beside the Vishnu shrines - hill and plain share the same sky.",
      food: [
        { dish: "Mui Borok", region: "Tripuri", description: "A sticky rice dish.", context: "The mountain staple of the hills." },
        { dish: "Fish Curry in Bamboo", region: "Jhum fields", description: "Fresh fish grilled in a bamboo stem.", context: "The monsoon field-cook of the hills." },
        { dish: "Chwit-u / Chinga", region: "Tripuri", description: "Fermented fish and sour leaves.", context: "The umami of the Tripuri kitchen." }
      ],
      festivals: [
        { name: "Garia Puja", note: "The Jhum-field festival of the Tripuri in March-April." },
        { name: "Kharchi Puja", note: "The seven-day mother-goddess festival of Agartala." },
        { name: "Durga Puja of the plains", note: "The Bengali festival of the valley's flats." }
      ],
      crafts: [
        { craft: "Bamboo Craft", place: "Hills", note: "The woven baskets and pipes of the Tripuri." },
        { craft: "Niuwama Weaving", place: "Reng", note: "The plain white 'Kiagsul' of the hills." }
      ],
      heritage: [
        { site: "Rowa and Sipahijola", type: "Wildlife sanctuaries", note: "The refuges of the western hoolock gibbon and other hill life." },
        { site: "Tripura Sundari", type: "Shakti temple", note: "One of the mother-goddess's fifty-one shakti seats." }
      ],
      thenNow: [
        { theme: "The bamboo stem", then: "Bamboo was the utensil and the house both.", now: "Bamboo is the industrial timer of Tripura's plain.", note: "The jungle became the joist." },
        { theme: "The king's palace", then: "The Manikyas held court in gold and silk.", now: "Ujjayanta Palace is now the state museum.", note: "The king moved his crown to the glass." }
      ],
      wonder: {
        type: "natural",
        title: "The Bamboo of the Hills of Tripura",
        note: "A single green stalk that could be house, pipe and plate - the wonder we carry is a forest that doubles as a toolbox."
      }
    }
  },
  "up": {
    id: "up", name: "Uttar Pradesh", type: "State", region: "North",
    capital: "Lucknow", languages: ["Hindi", "Urdu"],
    preview: "From the Ganga's ghats of Varanasi to the Taj's mirrored pool - Uttar Pradesh, where India keeps its oldest sleep and its finest marble.",
    profile: {
      land: "Uttar Pradesh is the vast Gangetic heartland - the Ganga and Yamuna's middle plain, from the Himalayan foothills to the edge of the Vindhyas and the lush of the Terai.",
      history: [
        { era: "The axial age", span: "c. 6th - 5th c. BCE", text: "On this plain the Buddha, Mahavira and the Upanishadic sages taught; Ayodhya, Kashi and Mathura kept the great pilgrim cities." },
        { era: "Empires of the Doab", span: "3rd c. BCE - 6th c.", text: "Mauryan and Gupta rule made the Gangetic middle the axis of classical India; Dhamek Stupa at Sarnath marks the Buddha's first teaching." },
        { era: "The Mughal age", span: "16th - 18th c.", text: "Agra's Taj Mahal and Fatehpur Sikri fixed the empire's golden hour; the nawabi courts of Lucknow followed the decline." },
        { era: "Modern U.P.", span: "1857 - present", text: "The great rebellion, the founding of the independent Republic, and the cow-and-elections state of today's Indian heart." }
      ],
      architecture: [
        { name: "Taj Mahal", place: "Agra", type: "UNESCO World Heritage", note: "Shah Jahan's marble mausoleum, a tomb-turned-temple of the world's love." },
        { name: "The temples of Varanasi", place: "Varanasi", type: "Sacred city", note: "The ghats, the Kashi Vishwanath and the old alleys of the holiest city." },
        { name: "Dhamek Stupa", place: "Sarnath", type: "Stupa", note: "Marking where the Buddha gave his first teaching." }
      ],
      arts: "The chikankari of Lucknow, the zardozi gold-thread work, and the temple paintings and kite-flights of Mathura and Varanasi fill the state's art world.",
      music: "The dhrupad and khyal of the classical gharanas, the Qawwali of the Sufi dargahs, and the bhajan and folk song of the villages fill the Gangetic air.",
      dance: "Kathak, the dance of the storytellers, refined at Lucknow's court; with the Raslila of Vrindavan and the chaal of the Banarasi stage.",
      dress: "The Banarasi sari, the choli-dupatta of the ghats and the Lucknowi kurta-angarkha of the court; the chikan-worked muslin is the state's white silk.",
      beliefs: "Kashi's vision of liberation, the holy feet of Ayodhya and Mathura, and the Sufi dargahs that dot the plains share the same faithful plain.",
      food: [
        { dish: "Lucknowi Biryani and Kebabs", region: "Lucknow", description: "The nawabi dum-cooked biryani and the seekh kebabs.", context: "The courtly table of the Awadh kitchen." },
        { dish: "Banarasi Paan", region: "Varanasi", description: "A betel leaf of areca, lime, spices and silver.", context: "The last bite of a Kashi evening." },
        { dish: "Petha of Agra", region: "Agra", description: "Glossy sugar-glazed ash-gourd slices.", context: "The sweet gate of the Taj." },
        { dish: "Mathura Peda", region: "Mathura", description: "The dense milk-sweet of the Krishna town." }
      ],
      festivals: [
        { name: "Kumbh Mela, Prayagraj", note: "The greatest gathering on earth at the meeting of the rivers." },
        { name: "Dev Deepawali", note: "The ghat-lights of Varanasi on Kartik full-moon." },
        { name: "Krishna Janmashtami", note: "Mathura and Vrindavan's night of the Lord's birth." }
      ],
      crafts: [
        { craft: "Chikankari", place: "Lucknow", note: "Shadow-stitch white embroidery on white." },
        { craft: "Banarasi Silk", place: "Varanasi", note: "The gold-zari brocade of the wedding sari." },
        { craft: "Pietra Dura", place: "Agra", note: "Stone inlay of the Taj's flowers." }
      ],
      heritage: [
        { site: "Taj Mahal", type: "UNESCO World Heritage", note: "The marble icon of India." },
        { site: "Fatehpur Sikri", type: "UNESCO World Heritage", note: "Akbar's red city of dream." },
        { site: "Jantar Mantar, Varanasi", type: "Observatory", note: "Stone instruments of the sky." }
      ],
      thenNow: [
        { theme: "The ghat of the dawn", then: "Varanasi was a city of the ritual of water for two millennia.", now: "The same ghats now also host the arati shows of the tourists.", note: "The lamp was passed to new eyes." },
        { theme: "The court of Awadh", then: "Lucknow's nawabs refined Urdu, music and the biryani.", now: "The same nawabi is the state's brand.", note: "The tashreef became a souvenir." }
      ],
      wonder: {
        type: "architectural",
        title: "The Taj Mahal, Agra",
        note: "A tomb raised by a grieving emperor - the wonder we carry is a love that turned grief into a world monument."
      }
    }
  },
  "uk": {
    id: "uk", name: "Uttarakhand", type: "State", region: "North",
    capital: "Dehradun", languages: ["Hindi", "Garhwali", "Kumaoni"],
    preview: "The land of the gods - Char Dham's four doors, the Ganga's Tehr for the hills and the cedar of the little Himalaya.",
    profile: {
      land: "Uttarakhand - 'the northern country' - climbs from the Terai foothills to the great Kumaon and Garhwal Himalaya; the Ganga, Yamuna and their sources transect its cedar valleys.",
      history: [
        { era: "The pilgrim doors", span: "ancient", text: "Gangotri, Yamunotri, Kedarnath and Badrinath - the Char Dham - fixed the upper hills as Hinduism's great pilgrimage." },
        { era: "The Panth of the hills", span: "tribes", text: "The Garhwali and Kumaoni and the Bhotiya herders of the passes kept a hardy mountain republic of sheep and cedar." },
        { era: "The states of the snow", span: "19th - 20th c.", text: "Garhwal and Kumaon - the territories of the Raj's 'hill stations' - stayed administered from Nainital and Dehradun." },
        { era: "Statehood", span: "2000 - present", text: "Uttarakhand separated from Uttar Pradesh in 2000 - a 'Devbhumi' or land of the gods." }
      ],
      architecture: [
        { name: "Kedarnath Temple", place: "Kedarnath", type: "Himalayan temple", note: "The stone shrine of Shiva lodged at 3,583 metres." },
        { name: "Badrinath Temple", place: "Badrinath", type: "Himalayan temple", note: "The North Indian seat of Vishnu beside the Alaknanda." },
        { name: "Nanda Devi temples & the Raj", place: "Almora", type: "Hill shrines", note: "The temples and old hill-stations of the Kumaon." }
      ],
      arts: "Aipan stencil art of the hill threshold, the wood carving and the wool of the Pahadi shawls - the everyday art of the snow side.",
      music: "The Jagar bell-rites of Garhwal, the basant of the hills and the folk songs of the Kumaon shepherds.",
      dance: "The Chaufulla and the Thali dance of the Garhwali, and the ritual Bara Nritya of the dancers of the temples.",
      dress: "The pattu of the hill women, the thick Pahadi shawl and the silver nauli and jewellery of the mountain festivals.",
      beliefs: "The Char Dham yatra, the river-god of the Ganga, the Shiva of the cedar forest and the tiny shrines of the passes give the state its name.",
      food: [
        { dish: "Jhangora Ki Kheer", region: "Hills", description: "A barnyard-millet pudding.", context: "The seed-sweet of the high village." },
        { dish: "Kandali ka Saag", region: "Garhwal", description: "Wild fiddlehead greens.", context: "The monsoon leaf of the hill forest." },
        { dish: "Bhatt ki Dal / Singhal", region: "Kumaon", description: "The black-bean dal of the mountain kitchen.", context: "The Kumaoni winter staple." }
      ],
      festivals: [
        { name: "Char Dham pilgrimage", note: "The four shrines of the Himalaya, open only in the summer months." },
        { name: "Nanda Devi Raj Jat", note: "The once-in-twelve-years yatra of the mother-goddess." },
        { name: "Hill-town fairs", note: "The harvest fairs of the Kumaon and Garhwal towns." }
      ],
      crafts: [
        { craft: "Aipan", place: "Kumaon", note: "The threshold stencil of the painted house." },
        { craft: "Pahari Shawls", place: "Garhwal - Kumaon", note: "The flower-wool weave of the hills." }
      ],
      heritage: [
        { site: "Nanda Devi Biosphere", type: "UNESCO", note: "The wild valley of the goddess." },
        { site: "Valley of Flowers", type: "UNESCO", note: "A meadow of a hundred alpine blooms." }
      ],
      thenNow: [
        { theme: "The pilgrimage", then: "The Char Dham was walked in slow caravans.", now: "The same yatra is done by car and helicopter; the glaciers shrink.", note: "The road rose, the snow fell." }
      ],
      wonder: {
        type: "natural",
        title: "Nanda Devi - the Goddess of the Summit",
        note: "A mountain so pure its inner sanctum is forbidden - the wonder we carry is a peak that has kept a shrine no one may enter."
      }
    }
  },
  "wb": {
    id: "wb", name: "West Bengal", type: "State", region: "East",
    capital: "Kolkata", languages: ["Bengali"],
    preview: "Durga's autumn, the Ganga's delta and the terracotta temples - Bengal, where the river is a religion and the October is a homecoming.",
    profile: {
      land: "West Bengal slides from the Himalaya's gate (Darjeeling) across the Gangetic plain to the Sundarbans' mangrove maze at the mouth of the delta.",
      history: [
        { era: "The ancient Vanga", span: "ancient", text: "The epics knew the delta as Vanga; the Buddhist Pala dynasty (8th-12th c.) made Bengal a seat of learning." },
        { era: "Sultanate and Bengal of the saints", span: "13th - 16th c.", text: "Sufi, Chaitanya's bhakti and the Vaishnava lyric made a devotional Bengal." },
        { era: "Calcutta and the Renaissance", span: "18th - 20th c.", text: "The British city of Calcutta grew while Tagore, Bankim and the Swadeshi drew a modern Bengali identity." },
        { era: "Partition once and again", span: "1905 - 1947", text: "The 1905 partition was annulled; the 1947 partition divided Bengal, with the west keeping Kolkata." }
      ],
      architecture: [
        { name: "Victoria Memorial", place: "Kolkata", type: "Marble palace", note: "The white marble 'Taj of Bengal' commemorating the queen." },
        { name: "Terracotta Temples of Bishnupur", place: "Bishnupur", type: "Temple town", note: "A town of black terracotta images of the Malla era." },
        { name: "Dakshineswar", place: "Kolkata", type: "Temple", note: "The navaratna temple of the goddess, on the Ganga." }
      ],
      arts: "Kalighat painting, the patuas' scroll-chase, the jamdani and the dress of the baluchari - the Bengali arts are the needle and the line.",
      music: "The rabindra-sangeet of Tagore, the shyama-sangeet of Kali and the baul's single-string ektara - Bengal sings from three wells.",
      dance: "The chhau of the Purulia masks, the Gaudiya nritta and the gentle folk circles of the Raibenshe and the gambhira.",
      dress: "The baluchari and jamdani saris of the weavers, the white-red border and the simple dhuti of the Bengal's bank - the cotton elegance of the delta.",
      beliefs: "Durga's homecoming in the autumn, the Kali of Kalighat, the Vaishnava love of the whole and the Sufi and Baul saints have one Bengali sky.",
      food: [
        { dish: "Macher Jhol", region: "Every home", description: "Fresh river fish in a light turmeric-green gravy.", context: "The daily hymn of the Bengali kitchen." },
        { dish: "Rasgulla", region: "Kolkata", description: "A soft paneer ball in syrup.", context: "The 'Bengal's white sweet', GI-tagged." },
        { dish: "Mishti Doi", region: "Kolkata", description: "Caramelised yoghurt in an earthen pot.", context: "The food of every celebration." },
        { dish: "Shorshe Ilish", region: "Monsoon", description: "Hilsa in a mustard sauce.", context: "The monsoon festival of the river." }
      ],
      festivals: [
        { name: "Durga Puja", note: "October's four-day homecoming of the goddess - Kolkata's festival of art and pandal." },
        { name: "Pohela Boishakh", note: "The Bengali new year of alpona and music." },
        { name: "Kali Puja", note: "The night-goddess of the November dark." }
      ],
      crafts: [
        { craft: "Jamdani Weaving", place: "Dhakai (traditional), Bhutia", note: "The figured muslin of the loom." },
        { craft: "Terracotta", place: "Bishnupur and Murshidabad", note: "The craft of the temple town." },
        { craft: "Shitalpati", place: "Cooch Behar", note: "The cool mat of the date-leaf weaver." }
      ],
      heritage: [
        { site: "Sundarbans", type: "UNESCO World Heritage", note: "The world's largest mangrove and the tiger's last delta." },
        { site: "Howrah Bridge", type: "Icon", note: "The cantilevered gate of Kolkata." },
        { site: "Darjeeling Himalayan Railway", type: "UNESCO World Heritage", note: "The toy train of the mist." }
      ],
      thenNow: [
        { theme: "The puja pandal", then: "Durga was worshipped in rich households and neighbourhoods.", now: "Kolkata's pujas are art installations of a fortnight.", note: "The goddess moved to the gallery." },
        { theme: "The river silk", then: "The muslin and jamdani were woven for the courts.", now: "The same loom makes the 'dhakai' of the modern fashion muse.", note: "The threads have not aged." }
      ],
      wonder: {
        type: "natural",
        title: "The Sundarbans and the Man-eater's Delta",
        note: "A mangrove so wide it breathes with the tide, where the tiger swims and the honey-bee sings - the wonder we carry is a forest that lives half under water."
      }
    }
  },
  "an": {
    id: "an", name: "Andaman and Nicobar Islands", type: "Union Territory", region: "Islands",
    capital: "Port Blair", languages: ["Hindi", "Nicobarese", "Bengali", "Tamil", "others"],
    preview: "Twelve hundred emerald islands strung across the Bay of Bengal - the coral sea, the Jarawa forest and the memory of the Cellular Jail.",
    profile: {
      land: "Two island arcs - the Andamans and the Nicobars - rise from the Bay of Bengal as shards of a sunken ridge, ringed by coral reefs and rainforest.",
      history: [
        { era: "The aboriginal peoples", span: "millennia", text: "The Jarawa, Onge, Sentinelese and Great Andamanese are among the oldest living island civilisations." },
        { era: "The Cellular Jail", span: "1906 - 1938", text: "The British penal settlement at Port Blair confined India's freedom fighters in its seven-winged jail." },
        { era: "Liberation", span: "1943 - 1947", text: "Netaji Subhas flags flew here briefly; the islands passed to India at independence and became a Union Territory." },
        { era: "The modern archipelago", span: "2004 - present", text: "The 2004 tsunami reshaped the shore; the islands now balance tourism with the sacred protection of the living." }
      ],
      architecture: [
        { name: "Cellular Jail", place: "Port Blair", type: "Memorial", note: "The seven-spoked colonial penal museum and its freedom heritage." },
        { name: "Coral Reefs and Beaches", place: "Havelock / Neil", type: "Natural", note: "The lime-white sand and living coral arcs of the Andaman Sea." }
      ],
      arts: "The bobbing carved figures of the Great Andamanese and the leaf-strip ornaments of the Nicobarese are among the rarest island arts on earth.",
      music: "The pounding log-drums of the islands, the bamboo-tongued feasts and the sea-song of the Nicobari outrigger.",
      dance: "The spirit-dance of the Onge and the canoe songs of the island ring the new-moon nights.",
      dress: "The leaf-and-flower cloth of the island peoples and the chromed sarongs of Nicobar - dress tuned to the sea.",
      beliefs: "The spirit-world of the islanders - the Great Mother and the Pudu- dream of the dead - and the Christian faith of the Christian Nicobar villages.",
      food: [
        { dish: "Fish and Coconut Rice", region: "Islands", description: "Grilled reef fish with coconut rice.", context: "The everyday sea-meal of the andamans." },
        { dish: "Nicobarese Ferments", region: "Nicobar", description: "Coconut toddy and smoked fish.", context: "The old kitchen of the islanders." }
      ],
      festivals: [
        { name: "Island Tourism Festival", note: "The winter sail of dance and boat." },
        { name: "Pema-Pesh (Nicob)", note: "The indigenous feast of the Nicobar chiefs." }
      ],
      crafts: [
        { craft: "Cane and Bamboo", place: "Islanders", note: "The outrigger and the nets of the sea." },
        { craft: "Wood Carving", place: "Great Andamanese", note: "The ancestral carved figures." }
      ],
      heritage: [
        { site: "Barren Island Volcano", type: "Volcano", note: "India's only active volcano." },
        { site: "Indira Point", type: "Southern tip", note: "The southernmost reach of India." }
      ],
      thenNow: [
        { theme: "The prison walls", then: "The Cellular Jail confined rebels for decades.", now: "It is India's freedom shrine.", note: "The walls turned from cage to museum." },
        { theme: "The Jarawa", then: "The living lived by the reef and the forest.", now: "Protected by law, they are kept from the tourist road.", note: "The oldest neighbour asked for privacy." }
      ],
      wonder: {
        type: "natural",
        title: "The Coral Reefs of the Andaman Sea",
        note: "A ring of living limestone holding a hundred islands - the wonder we carry is a sea that builds its own roads."
      }
    }
  },
  "ch": {
    id: "ch", name: "Chandigarh", type: "Union Territory", region: "North",
    capital: "Chandigarh", languages: ["Hindi", "Punjabi", "English"],
    preview: "Le Corbusier's concrete dream shared by two states - the Capitol, the Rock Garden's bottle-city and the ordered green of the city beautiful.",
    profile: {
      land: "Chandigarh is a planned city at the foot of the Shivalik hills, designed in 1951 as the joint capital of Punjab and Haryana - a city of sectors, trees and open sky.",
      history: [
        { era: "The city beautiful", span: "1951 - 1965", text: "Le Corbusier and his collaborators laid out Chandigarh after partition left Punjab without a capital." },
        { era: "The Capitol", span: "1950s", text: "The Palace of Assembly, Secretariat and the Open Hand monument fixed the city's concrete avant-garde." },
        { era: "Two states, one city", span: "1966 - present", text: "When Punjab and Haryana split, Chandigarh remained a Union Territory serving as capital to both." },
        { era: "The Rock Garden", span: "1960s - present", text: "Nek Chand secretly built a sculpture city of recycled scrap; it is now world famous." }
      ],
      architecture: [
        { name: "The Capitol Complex", place: "Chandigarh", type: "UNESCO World Heritage", note: "Le Corbusier's ensemble of Assembly, Secretariat and the Open Hand." },
        { name: "Rock Garden", place: "Chandigarh", type: "Sculpture garden", note: "Nek Chand's silent city of broken tiles and pots." },
        { name: "Sukhna Lake", place: "Chandigarh", type: "Civic lake", note: "The lake of joy at the foot of the hills." }
      ],
      arts: "The city's art is its plan - the civic fountains, the murals of the Capitol and the modern-art collection of its museum.",
      music: "The civic lawns host the song-plays and band-music of both Punjab and Haryana of the twin states.",
      dance: "The city stages Punjab's bhangra and Haryana's ghoomar at its joint-cultural festivals.",
      dress: "The cotton wears of the two states - the sari of the Punjabi and the salwar of the small-town Haryanvi.",
      beliefs: "The Sikh gurdwaras and Hindu temples share the sectors; the sacred hill shrines stand at the city's edge.",
      food: [
        { dish: "Dal Makhani", region: "The Dhabas", description: "Creamy black-lentil curry.", context: "Born of the tandoor of the Punjab-Haryana roadhouse." },
        { dish: "Chole Bhature", region: "Chandigarh", description: "Fried bread with chickpea curry.", context: "The Sunday breakfast of the twin capital." }
      ],
      festivals: [
        { name: "Chandigarh Festival", note: "The winter art-and-craft fair of the city." },
        { name: "Rose Festival", note: "The flower festival of the City Beautiful." }
      ],
      crafts: [
        { craft: "Rock Garden sculpture", place: "Chandigarh", note: "Art from a municipal scrap-yard." },
        { craft: "Civic mural", place: "Capitol", note: "The murals of the concrete city." }
      ],
      heritage: [
        { site: "Le Corbusier's Capitol", type: "UNESCO World Heritage", note: "The masterpiece of the modern city." },
        { site: "Rock Garden", type: "Civic art", note: "A city of recycled sculptures." }
      ],
      thenNow: [
        { theme: "The city plan", then: "A machine-age grid of concrete and green.", now: "The same grid is now protected heritage.", note: "The future-then became the past-now." },
        { theme: "The scrap garden", then: "Nek Chand's garden was almost cleared in the 1970s.", now: "It is now a celebrated civic treasure.", note: "The secret city won its hearing." }
      ],
      wonder: {
        type: "cultural",
        title: "The Rock Garden of Chandigarh",
        note: "A city of broken pots and lost tiles, raised by one man with a trolley - the wonder we carry is a garden that made refuse into a monument."
      }
    }
  },
  "dd": {
    id: "dd", name: "Dadra and Nagar Haveli and Daman and Diu", type: "Union Territory", region: "West",
    capital: "Daman", languages: ["Gujarati", "Hindi", "Portuguese (historical)"],
    preview: "Two coasts and a forest enclave held by Portugal for centuries - the Warli walls of Silvassa and the church-bells of Daman.",
    profile: {
      land: "The territory joins the conquered towns of Daman and Diu on the Gujarat coast with the inland enclave of Dadra and Nagar Haveli - a patchwork of coconut, cashew and forest.",
      history: [
        { era: "The Portuguese enclave", span: "16th - 1961", text: "Daman and Diu were Portuguese forts for four centuries; Dadra and Nagar Haveli were won by freedom in 1954." },
        { era: "Liberation", span: "1961", text: "The Indian operations of 1961 merged the enclaves with the Union." },
        { era: "One territory", span: "2020 - present", text: "The two territories were merged in 2020 into a single Union Territory." }
      ],
      architecture: [
        { name: "Daman Fort and the Church of Bom Jesus", place: "Daman", type: "Fort and church", note: "The Portuguese walled town above the creek." },
        { name: "Diu Fort", place: "Diu", type: "Fort", note: "The sea-fort held by the Lusitanian mainland." },
        { name: "Tribal huts of Dadra", place: "Silvassa", type: "Vernacular", note: "The bamboo homes with Warli-painted walls." }
      ],
      arts: "The Warli wall-painting of the tribal belt of Silvassa, the shell-and Temple of the coast, and the festival stalls of the enclaves.",
      music: "The Portuguese fado's echo in the old church-song and the war-drum and song of the tribals of the enclave.",
      dance: "The tribal dance of the Dhodia, Halpati and Koli of the enclave hills and the street-piss of the festivals.",
      dress: "The tribal sarong and jewel of the Nagar Haveli, and the coastal sari of the Gujarati Daman.",
      beliefs: "The Catholic old-grain of Daman and Diu, the Hindu goddess shrines and the Warli spirits of Silvassa share the coconut shade.",
      food: [
        { dish: "Papad and millet rotli (bhakhri)", region: "Nagar Haveli", description: "The millet bread and pulse of the enclave.", context: "The rain-fed table of the tribal lands." },
        { dish: "Fish Curries of Daman", region: "Daman", description: "Coastal fish in a vinegar-coconut rush.", context: "The Portuguese-Draf of the west coast." }
      ],
      festivals: [
        { name: "Patrolb and the tribal Diwas", note: "The festival of the Adivasi heritage at Silvassa." },
        { name: "Nossa Senhora do Rosario", note: "The Daman church-feast of August." }
      ],
      crafts: [
        { craft: "Warli painting", place: "Silvassa", note: "The living line-art of the tribal wall." },
        { craft: "Coconut crafts", place: "Diu", note: "The shell-ware of the island-fort." }
      ],
      heritage: [
        { site: "St. Paul's Church, Diu", type: "Church", note: "The white baroque of the island." },
        { site: "Daman Lighthouse", type: "Lighthouse", note: "The green rise of the Daman coast." }
      ],
      thenNow: [
        { theme: "The wall-painted village", then: "Warli walls told the planted year.", now: "Warli now sells on canvas to the gallery.", note: "The wall moved from house to art." },
        { theme: "The lighthouse", then: "The light marked the spice-coves.", now: "It marks the tourist deems.", note: "The beacon kept a twin trade." }
      ],
      wonder: {
        type: "cultural",
        title: "The Patchwork of Two Empires",
        note: "A dozen streets where a Portuguese bell and a Warli wall stand a hundred metres apart - the wonder we carry is a small map of India's capacity to keep two histories in one pocket."
      }
    }
  },
  /* __INSERT__ */
};
