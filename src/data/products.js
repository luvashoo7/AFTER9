// AFTER 9 - Dynamic Catalog Configuration & UI Constants

export const CATEGORIES = [
  { id: 'all', name: 'Night Drops', icon: '✨', itemCount: 'Live Drops' },
  {
    id: 'midnight-cravings',
    name: 'Midnight Cravings',
    subtitle: 'Chips, Sweets & Midnight Treats',
    icon: '🍫',
    badge: 'Night Favorite',
    itemCount: 'Live Stock',
  },
  {
    id: 'hot-brews-chai',
    name: 'Hot Brews & Chai',
    subtitle: 'Steaming ginger tea, instant coffee',
    icon: '☕',
    badge: 'Hot Cuppa',
    itemCount: 'Live Stock',
  },
  {
    id: 'quick-meals-maggi',
    name: 'Quick Meals & Maggi',
    subtitle: 'Maggi, Cup Noodles & Ready Meals',
    icon: '🍜',
    badge: 'Top Midnight Craving',
    itemCount: 'Live Stock',
  },
  {
    id: 'chillers-energy',
    name: 'Chillers & Energy',
    subtitle: 'Energy Drinks, Sodas & Juices',
    icon: '🥤',
    badge: 'Chilled Fast',
    itemCount: 'Live Stock',
  },
  {
    id: 'sweet-tooth',
    name: 'Sweet Tooth',
    subtitle: 'Chocolates, brownies & ice creams',
    icon: '🍰',
    badge: 'Midnight Sweet',
    itemCount: 'Live Stock',
  },
  {
    id: 'night-essentials',
    name: 'Night Essentials',
    subtitle: 'Pain relief, chargers & wellness',
    icon: '💊',
    badge: '24/7 Urgent',
    itemCount: 'Live Stock',
  },
];

export const AVAILABLE_PRODUCT_TAGS = [
  'Night Saver',
  '₹10 Only',
  'Bestseller',
  'Party Favorite',
  'Ice Cold',
  'High Protein',
  'Discreet Delivery',
  'Tech Lifeline',
  'Instant Sweet',
  'Zero Sugar',
  '2 AM Pick',
  'Hot Cuppa',
  'Emergency Hero',
];

export const SORT_OPTIONS_CONFIG = [
  { id: 'popular', label: '🔥 Most Popular', subtitle: 'Loved by Greater Noida night owls' },
  { id: 'speed', label: '⚡ Fastest Delivery', subtitle: '10-12 mins priority dispatch' },
  { id: 'price_asc', label: '💰 Price: Low to High', subtitle: 'Budget snacks & ₹10 fixes' },
  { id: 'price_desc', label: '💎 Price: High to Low', subtitle: 'Party packs & bulk bundles' },
  { id: 'rating', label: '⭐ Highest Rated', subtitle: '4.8+ star verified night reviews' },
  { id: 'discount', label: '🏷️ Biggest Discount', subtitle: 'Max percentage off MRP' },
];

// Pure empty dynamic data structures (all real data is fetched from Backend API)
export const PRODUCTS = [];
export const TONIGHT_DROPS = [];
export const BUNDLES = [];
export const SAMPLE_REVIEWS = {};
export const SAMPLE_ORDER_HISTORY = [];
export const SAMPLE_REFUNDS = [];
export const SAMPLE_NOTIFICATIONS = [];
export const SAVED_ADDRESSES_INITIAL = [];

export const PILOT_ZONES = [
  {
    id: 'zone-kp',
    name: 'Knowledge Park & Pari Chowk',
    subtitle: 'Dark Store Hub 01',
    status: 'ACTIVE',
    eta: '10-12 mins',
    coverage: 'Sharda, Galgotias, GL Bajaj, Pari Chowk Hostels',
  },
  {
    id: 'zone-alpha-gamma',
    name: 'Alpha & Gamma Sectors',
    subtitle: 'Dark Store Hub 02',
    status: 'ACTIVE',
    eta: '12-15 mins',
    coverage: 'Alpha 1, Alpha 2, Gamma 1, Gamma 2, Beta 1',
  },
];

export const PILOT_SECTORS = [
  'Knowledge Park 1',
  'Knowledge Park 2',
  'Knowledge Park 3',
  'Pari Chowk',
  'Alpha 1',
  'Alpha 2',
  'Beta 1',
  'Beta 2',
  'Gamma 1',
  'Gamma 2',
  'Delta 1',
  'Delta 2',
  'Omega 1',
  'Chi 1',
  'Chi 2',
  'Jaypee Greens',
];
