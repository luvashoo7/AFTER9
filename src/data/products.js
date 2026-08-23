// AFTER 9 - Night Product Catalog & Midnight Bundles Data
export const CATEGORIES = [
  { id: 'all', name: 'All Drops', icon: '✨' },
  { id: 'cravings', name: 'Midnight Cravings', icon: '🌙' },
  { id: 'party', name: 'Party Mode', icon: '🎉' },
  { id: 'snacks', name: 'Snack Attack', icon: '🍟' },
  { id: 'drinks', name: 'Cold & Refreshing', icon: '🥤' },
  { id: 'breakfast', name: 'Breakfast Emergency', icon: '🍳' },
  { id: 'personal', name: 'Personal Care', icon: '🧴' },
  { id: 'essentials', name: 'Home Essentials', icon: '🏠' },
  { id: 'ten-rupee', name: '₹10 Corner', icon: '🪙' },
  { id: 'random', name: 'Just Because', icon: '🔮' }
];

export const PRODUCTS = [
  // MIDNIGHT CRAVINGS
  {
    id: 'crav-1',
    name: 'Maggi 2-Min Special Masala (Pack of 4)',
    category: 'cravings',
    price: 68,
    mrp: 75,
    unit: '280g',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&auto=format&fit=crop&q=60',
    badge: 'MIDNIGHT ESSENTIAL',
    description: 'The undefeated midnight savior with authentic Indian spices.',
    rating: 4.9,
    deliveryMins: '12-18 mins',
    tag: 'Bestseller'
  },
  {
    id: 'crav-2',
    name: 'Nongshim Shin Ramyun Spicy Noodles',
    category: 'cravings',
    price: 120,
    mrp: 135,
    unit: '120g',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&auto=format&fit=crop&q=60',
    badge: 'HOT DROP',
    description: 'Fiery broth and chewy noodles for serious late-night cravings.',
    rating: 4.8,
    deliveryMins: '10-15 mins'
  },
  {
    id: 'crav-3',
    name: 'Sunfeast Dark Fantasy Choco Fills',
    category: 'cravings',
    price: 45,
    mrp: 50,
    unit: '75g',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop&q=60',
    badge: 'MOLTEN CHOCO',
    description: 'Crisp cookie crust with a warm molten chocolate core.',
    rating: 4.9,
    deliveryMins: '10-15 mins'
  },
  {
    id: 'crav-4',
    name: 'Nutella & GO! Hazelnut Cocoa Dip & Breadsticks',
    category: 'cravings',
    price: 99,
    mrp: 110,
    unit: '52g',
    image: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=500&auto=format&fit=crop&q=60',
    badge: 'INSTANT SWEET',
    description: 'Crispy breadsticks with rich creamy hazelnut cocoa spread.',
    rating: 4.7,
    deliveryMins: '12 mins'
  },
  {
    id: 'crav-5',
    name: 'Doritos Sizzlin\' Hot Nachos',
    category: 'cravings',
    price: 50,
    mrp: 55,
    unit: '78g',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&auto=format&fit=crop&q=60',
    badge: 'FLAMIN HOT',
    description: 'Extra fiery crunch built for movie nights and gaming.',
    rating: 4.8,
    deliveryMins: '10 mins'
  },

  // PARTY MODE
  {
    id: 'party-1',
    name: 'Red Bull Energy Drink (Pack of 4)',
    category: 'party',
    price: 460,
    mrp: 500,
    unit: '4 x 250ml',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format&fit=crop&q=60',
    badge: 'NIGHT FUEL',
    description: 'Vitalizes body and mind for late-night grinds and party marathons.',
    rating: 4.9,
    deliveryMins: '10-15 mins',
    tag: 'Party Favorite'
  },
  {
    id: 'party-2',
    name: 'Party Red Plastic Cups (Set of 25)',
    category: 'party',
    price: 99,
    mrp: 140,
    unit: '25 pcs (450ml)',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&auto=format&fit=crop&q=60',
    badge: 'PARTY GEAR',
    description: 'Heavy-duty party cups for punch, soda, and beer pong.',
    rating: 4.6,
    deliveryMins: '15 mins'
  },
  {
    id: 'party-3',
    name: 'Schweppes Classic Tonic Water Can',
    category: 'party',
    price: 60,
    mrp: 65,
    unit: '300ml',
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=500&auto=format&fit=crop&q=60',
    badge: 'MIXER ESSENTIAL',
    description: 'Crisp, sparkling mixer with subtle citrus notes.',
    rating: 4.7,
    deliveryMins: '12 mins'
  },
  {
    id: 'party-4',
    name: 'Pure Crystal Clear Ice Cubes',
    category: 'party',
    price: 65,
    mrp: 80,
    unit: '1 kg bag',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&auto=format&fit=crop&q=60',
    badge: 'CHILLED INSTANT',
    description: 'Double-filtered, slow-melting food-grade ice cubes in insulated pack.',
    rating: 4.9,
    deliveryMins: '10 mins',
    tag: 'Fast Melt-Free'
  },
  {
    id: 'party-5',
    name: 'Matt Finish Waterproof Playing Cards Deck',
    category: 'party',
    price: 149,
    mrp: 220,
    unit: '54 Cards',
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=500&auto=format&fit=crop&q=60',
    badge: 'NIGHT GAME',
    description: 'Sleek black waterproof playing cards that survive drink spills.',
    rating: 4.8,
    deliveryMins: '12 mins'
  },

  // SNACK ATTACK
  {
    id: 'snack-1',
    name: 'Kurkure Solid Masti Masala Twisteez',
    category: 'snacks',
    price: 20,
    mrp: 20,
    unit: '85g',
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500&auto=format&fit=crop&q=60',
    badge: 'CRUNCH ICON',
    description: 'Unapologetically chatpata Indian crunch for late nights.',
    rating: 4.8,
    deliveryMins: '10 mins'
  },
  {
    id: 'snack-2',
    name: 'Lay\'s West Indies Hot \'n\' Sweet Chilli',
    category: 'snacks',
    price: 20,
    mrp: 20,
    unit: '73g',
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=500&auto=format&fit=crop&q=60',
    badge: 'GEN-Z PICK',
    description: 'Sweet, spicy, and tangy Caribbean spice blend.',
    rating: 4.9,
    deliveryMins: '10 mins'
  },
  {
    id: 'snack-3',
    name: 'Pringles Sour Cream & Onion',
    category: 'snacks',
    price: 110,
    mrp: 125,
    unit: '107g',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&auto=format&fit=crop&q=60',
    badge: 'STACKABLE',
    description: 'Smooth sour cream with savoury herbs in iconic resealable canister.',
    rating: 4.7,
    deliveryMins: '12 mins'
  },
  {
    id: 'snack-4',
    name: 'Haldiram\'s Nagpur Aloo Bhujia',
    category: 'snacks',
    price: 55,
    mrp: 60,
    unit: '200g',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&auto=format&fit=crop&q=60',
    badge: 'DESI CLASSIC',
    description: 'Crispy spiced potato noodles that go with everything at night.',
    rating: 4.9,
    deliveryMins: '10 mins'
  },

  // COLD & REFRESHING
  {
    id: 'drink-1',
    name: 'Thums Up Charged Extra Strong',
    category: 'drinks',
    price: 40,
    mrp: 40,
    unit: '750ml PET',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=60',
    badge: 'ICE COLD',
    description: 'High-caffeine spicy cola delivered chilled to your doorstep.',
    rating: 4.9,
    deliveryMins: '10 mins',
    tag: 'Midnight Classic'
  },
  {
    id: 'drink-2',
    name: 'Monster Energy Ultra White (Zero Sugar)',
    category: 'drinks',
    price: 125,
    mrp: 135,
    unit: '350ml Can',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=60',
    badge: 'ZERO SUGAR',
    description: 'Crisp, citrus energy blend with zero calories.',
    rating: 4.8,
    deliveryMins: '12 mins'
  },
  {
    id: 'drink-3',
    name: 'Sting Energy Drink Pet Bottle',
    category: 'drinks',
    price: 20,
    mrp: 20,
    unit: '250ml',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format&fit=crop&q=60',
    badge: 'BUDGET BUZZ',
    description: 'Sweet berry flavored instant energy boost.',
    rating: 4.6,
    deliveryMins: '10 mins'
  },
  {
    id: 'drink-4',
    name: 'Sleepy Owl Classic Cold Brew Can',
    category: 'drinks',
    price: 130,
    mrp: 150,
    unit: '200ml',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&auto=format&fit=crop&q=60',
    badge: '100% ARABICA',
    description: 'Slow-steeped smooth dark roast coffee. Ready to drink.',
    rating: 4.8,
    deliveryMins: '12 mins'
  },

  // BREAKFAST EMERGENCY
  {
    id: 'bf-1',
    name: 'Farm Fresh Brown Eggs (Pack of 6)',
    category: 'breakfast',
    price: 58,
    mrp: 65,
    unit: '6 Eggs',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500&auto=format&fit=crop&q=60',
    badge: 'CRACK & COOK',
    description: 'High-protein farm fresh sanitized eggs in padded protection box.',
    rating: 4.9,
    deliveryMins: '10-15 mins',
    tag: 'Night Saver'
  },
  {
    id: 'bf-2',
    name: 'Amul Pasteurized Butter',
    category: 'breakfast',
    price: 56,
    mrp: 58,
    unit: '100g',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&auto=format&fit=crop&q=60',
    badge: 'COLD STORED',
    description: 'Utterly butterly delicious classic Indian salted table butter.',
    rating: 5.0,
    deliveryMins: '10 mins'
  },
  {
    id: 'bf-3',
    name: 'Harvest Gold White Sandwich Bread',
    category: 'breakfast',
    price: 45,
    mrp: 45,
    unit: '400g Fresh Pack',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60',
    badge: 'DAILY FRESH',
    description: 'Soft slice bread for midnight toast or morning scramble.',
    rating: 4.7,
    deliveryMins: '12 mins'
  },
  {
    id: 'bf-4',
    name: 'Amul Taaza Homogenised Toned Milk',
    category: 'breakfast',
    price: 36,
    mrp: 36,
    unit: '500ml Tetra',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=60',
    badge: 'LONG LIFE',
    description: 'No boiling required. UHT treated fresh milk.',
    rating: 4.8,
    deliveryMins: '10 mins'
  },

  // PERSONAL CARE
  {
    id: 'pc-1',
    name: 'Durex Air Ultra Thin Condoms (10s Pack)',
    category: 'personal',
    price: 240,
    mrp: 275,
    unit: '10 Condoms',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60',
    badge: 'DISCREET PACK',
    description: 'Ultra thin for maximum sensitivity. 100% discrete packaging.',
    rating: 4.9,
    deliveryMins: '10 mins',
    tag: 'Discreet Delivery'
  },
  {
    id: 'pc-2',
    name: 'Whisper Ultra Clean XL+ Wings (Pack of 15)',
    category: 'personal',
    price: 185,
    mrp: 210,
    unit: '15 Pads',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60',
    badge: 'EMERGENCY HERO',
    description: 'Longer pads with magic lock gel. Essential emergency night care.',
    rating: 4.9,
    deliveryMins: '10 mins'
  },
  {
    id: 'pc-3',
    name: 'Volini Maxx Instant Pain Relief Spray',
    category: 'personal',
    price: 145,
    mrp: 160,
    unit: '55g Spray',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60',
    badge: 'QUICK RELIEF',
    description: 'Fast acting micro-particles for backache, cramp and muscle pain.',
    rating: 4.8,
    deliveryMins: '12 mins'
  },

  // HOME ESSENTIALS
  {
    id: 'home-1',
    name: 'All Out Ultra Mosquito Repellent Machine + Refill',
    category: 'essentials',
    price: 125,
    mrp: 140,
    unit: '1 Vaporizer + 45ml',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60',
    badge: 'SLEEP SAVER',
    description: 'Kill midnight mosquito nuisance in 5 minutes for peaceful sleep.',
    rating: 4.8,
    deliveryMins: '12 mins'
  },
  {
    id: 'home-2',
    name: 'Fast 65W Braided Type-C to Type-C Cable',
    category: 'essentials',
    price: 199,
    mrp: 399,
    unit: '1.2 Meter',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&auto=format&fit=crop&q=60',
    badge: 'TECH LIFELINE',
    description: 'Never get stuck with a dead phone at 3 AM. Nylon braided high-speed cable.',
    rating: 4.7,
    deliveryMins: '15 mins'
  },
  {
    id: 'home-3',
    name: 'Duracell Chhota Power AAA Batteries (Pack of 4)',
    category: 'essentials',
    price: 140,
    mrp: 160,
    unit: '4 x AAA',
    image: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?w=500&auto=format&fit=crop&q=60',
    badge: 'LONG LASTING',
    description: 'For TV remotes, AC remotes, and gaming controllers.',
    rating: 4.9,
    deliveryMins: '12 mins'
  },

  // ₹10 CORNER (Dedicated differentiator!)
  {
    id: 'ten-1',
    name: 'Catch Chaat Masala Mini Pack',
    category: 'ten-rupee',
    price: 10,
    mrp: 10,
    unit: '18g Pocket Sachet',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=60',
    badge: '₹10 FIX',
    description: 'Need just a pinch for midnight eggs or fruit? No family pack needed.',
    rating: 4.9,
    deliveryMins: '10 mins',
    tag: '₹10 Only'
  },
  {
    id: 'ten-2',
    name: 'Everest Garam Masala Sachet',
    category: 'ten-rupee',
    price: 10,
    mrp: 10,
    unit: '15g Sachet',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=60',
    badge: '₹10 FIX',
    description: 'Instant spice upgrade for late-night curry or Maggi experiments.',
    rating: 4.8,
    deliveryMins: '10 mins',
    tag: '₹10 Only'
  },
  {
    id: 'ten-3',
    name: 'MDH Chicken / Meat Masala Mini Pack',
    category: 'ten-rupee',
    price: 10,
    mrp: 10,
    unit: '15g Sachet',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=60',
    badge: '₹10 FIX',
    description: 'Single-use rich spice sachet for midnight chefs.',
    rating: 4.9,
    deliveryMins: '10 mins',
    tag: '₹10 Only'
  },
  {
    id: 'ten-4',
    name: 'Cadbury Dairy Milk Mini Bar',
    category: 'ten-rupee',
    price: 10,
    mrp: 10,
    unit: '13.2g',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500&auto=format&fit=crop&q=60',
    badge: '₹10 SWEET',
    description: 'Just the right bite of chocolate without overspending.',
    rating: 4.9,
    deliveryMins: '10 mins',
    tag: '₹10 Only'
  },
  {
    id: 'ten-5',
    name: 'Parle-G Gold Mini Pocket Pack',
    category: 'ten-rupee',
    price: 10,
    mrp: 10,
    unit: '100g',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop&q=60',
    badge: '₹10 DESI',
    description: 'Chai biscuit pairing for late-night tea sessions.',
    rating: 4.9,
    deliveryMins: '10 mins',
    tag: '₹10 Only'
  },

  // JUST BECAUSE
  {
    id: 'rand-1',
    name: 'Neon Party Glow Sticks (Pack of 10)',
    category: 'random',
    price: 99,
    mrp: 150,
    unit: '10 Mixed Colors',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&auto=format&fit=crop&q=60',
    badge: 'MIDNIGHT VIBE',
    description: 'Snap, shake and light up the room with electric neon glow.',
    rating: 4.7,
    deliveryMins: '12 mins'
  },
  {
    id: 'rand-2',
    name: 'Midnight Thoughts Blackout Diary & Gel Pen',
    category: 'random',
    price: 179,
    mrp: 299,
    unit: 'A5 Hardcover',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&auto=format&fit=crop&q=60',
    badge: 'GEN-Z CRAFT',
    description: 'For your 3 AM startup ideas, poetry, and midnight confessions.',
    rating: 4.8,
    deliveryMins: '15 mins'
  }
];

// MIDNIGHT BUNDLES & PARTY PACKS
export const BUNDLES = [
  {
    id: 'bundle-craving',
    title: 'THE CRAVING PACK',
    subtitle: 'Chips + Chocolate + Soft Drink + Cookies',
    price: 219,
    mrp: 275,
    tag: '🔥 2 AM FAVORITE',
    accent: 'lime',
    itemsCount: 4,
    itemsList: ['Doritos Flamin Hot', 'Dark Fantasy Choco Fills', 'Thums Up 750ml', 'Cadbury Dairy Milk'],
    description: 'The ultimate late-night sugar & spice balancer when you just need a serious snack hit.',
    deliveryEstimate: '10-15 mins'
  },
  {
    id: 'bundle-2am',
    title: 'THE 2 AM PACK',
    subtitle: 'Snacks + Cold Drink + Chocolate + Instant Food',
    price: 299,
    mrp: 370,
    tag: '⚡ MUST-HAVE COMBO',
    accent: 'purple',
    itemsCount: 4,
    itemsList: ['Shin Ramyun Spicy', 'Monster Energy 350ml', 'Nutella & Go', 'Kurkure Solid Masti'],
    description: 'Heavy duty fuel engineered for coders, gamers, and all-night thinkers.',
    deliveryEstimate: '10-15 mins'
  },
  {
    id: 'bundle-house-party',
    title: 'THE HOUSE PARTY PACK',
    subtitle: 'Multiple snacks + drinks + chocolates + party essentials',
    price: 649,
    mrp: 830,
    tag: '🎉 PLANS CHANGED BUNDLE',
    accent: 'cyan',
    itemsCount: 8,
    itemsList: ['2x Thums Up 750ml', 'Schweppes Tonic Water', 'Red Plastic Cups 25s', '1kg Ice Cubes', '2x Kurkure Twisteez', 'Doritos Party Pack', 'Playing Cards Deck'],
    description: 'Zero planning? Instant party in a single box at your Greater Noida doorstep.',
    deliveryEstimate: '15 mins'
  },
  {
    id: 'bundle-exam',
    title: 'THE EXAM NIGHT PACK',
    subtitle: 'Coffee / Energy drink + biscuits + instant food + chocolates',
    price: 269,
    mrp: 340,
    tag: '🧠 GPA SAVER',
    accent: 'lime',
    itemsCount: 4,
    itemsList: ['Sleepy Owl Cold Brew', 'Maggi 2-Min Special (2x)', 'Parle-G Gold Pack', 'Hershey\'s Kisses'],
    description: 'High caffeine, fast carbs, zero kitchen prep time. Finish the syllabus before dawn.',
    deliveryEstimate: '10-12 mins'
  },
  {
    id: 'bundle-movie',
    title: 'THE MOVIE NIGHT PACK',
    subtitle: 'Popcorn / snacks + chocolates + soft drinks',
    price: 289,
    mrp: 360,
    tag: '🍿 STREAMING MODE',
    accent: 'purple',
    itemsCount: 4,
    itemsList: ['Act II Butter Popcorn', 'Pringles Sour Cream', 'Coca-Cola Zero 750ml', 'Dark Fantasy Choco'],
    description: 'Crisp popcorn and cold fizz for Netflix, Prime, and gaming binges.',
    deliveryEstimate: '12-15 mins'
  }
];

// TONIGHT'S LIMITED DROPS
export const TONIGHT_DROPS = [
  {
    id: 'drop-1',
    title: '2 AM Craving Combo',
    badge: '2 AM PICK',
    badgeColor: 'lime',
    price: 189,
    mrp: 240,
    items: 'Shin Ramyun + Thums Up + Molten Cookies',
    timeLeft: 'Available until 5:30 AM',
    stockLeft: 7,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'drop-2',
    title: 'Midnight Movie Pack',
    badge: 'BESTSELLER',
    badgeColor: 'purple',
    price: 249,
    mrp: 310,
    items: 'Nacho Crunch + Cheesy Dip + Chilled Soda Duo',
    timeLeft: 'Available until 5:00 AM',
    stockLeft: 12,
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'drop-3',
    title: 'Unexpected Guests Pack',
    badge: 'AVAILABLE TONIGHT',
    badgeColor: 'cyan',
    price: 299,
    mrp: 380,
    items: 'Assorted Desi Namkeen + Cold Drinks + Choco Treats',
    timeLeft: 'Available tonight only',
    stockLeft: 5,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'drop-4',
    title: 'Tomorrow Morning Saver',
    badge: 'LIMITED',
    badgeColor: 'lime',
    price: 199,
    mrp: 250,
    items: 'Brown Eggs 6s + Fresh Bread + Amul Butter + Milk',
    timeLeft: 'Morning prep drop',
    stockLeft: 9,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500&auto=format&fit=crop&q=60'
  }
];

// PILOT ZONES IN GREATER NOIDA
export const PILOT_ZONES = [
  { name: 'Pari Chowk Hub', status: 'Active Now ⚡', eta: '10-12 mins', activeRiders: 8, popular: 'Midnight Cravings' },
  { name: 'Knowledge Park 1, 2 & 3', status: 'Active Now ⚡', eta: '8-11 mins', activeRiders: 12, popular: 'Exam Night Pack' },
  { name: 'Alpha 1 & Alpha 2', status: 'Active Now ⚡', eta: '10-14 mins', activeRiders: 6, popular: 'Party Mode' },
  { name: 'Beta 1 & Beta 2', status: 'Active Now ⚡', eta: '11-15 mins', activeRiders: 5, popular: '₹10 Corner' },
  { name: 'Gamma & Delta Sectors', status: 'Active Now ⚡', eta: '12-16 mins', activeRiders: 4, popular: 'Snack Attack' },
  { name: 'Techzone 4 & Gaur City (Ext)', status: 'Active Now ⚡', eta: '14-18 mins', activeRiders: 7, popular: 'House Party Pack' },
  { name: 'Omega & Chi Sectors', status: 'Active Now ⚡', eta: '12-15 mins', activeRiders: 3, popular: 'Cold & Refreshing' },
  { name: 'Sector 137 / Noida Link (Next)', status: 'Opening Next Phase 🚀', eta: 'Launching Soon', activeRiders: 0, popular: 'Waitlist Open' }
];
