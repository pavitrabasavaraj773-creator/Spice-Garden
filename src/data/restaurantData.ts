import { MenuItem, SpecialOffer, GalleryItem, ReviewItem } from '../types';

export const RESTAURANT_INFO = {
  name: "Spice Garden Restaurant",
  tagline: "Delicious Food, Memorable Moments",
  subtitle: "Hubballi's Premier Multi-Cuisine Culinary Destination",
  address: {
    line1: "Gokul Road, Near New Bus Stand",
    city: "Hubballi",
    state: "Karnataka",
    pincode: "580030",
    landmark: "Opposite Urban Plaza"
  },
  phone: "+91 836 225 8900",
  secondaryPhone: "+91 94812 34567",
  email: "contact@spicegardenhubballi.com",
  reservationEmail: "reservations@spicegardenhubballi.com",
  hours: {
    days: "Monday – Sunday",
    timings: "11:00 AM – 10:30 PM",
    lunch: "11:30 AM – 03:30 PM",
    dinner: "06:30 PM – 10:30 PM"
  },
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    whatsapp: "https://wa.me/919481234567",
    tripadvisor: "https://tripadvisor.com"
  }
};

export const MENU_ITEMS: MenuItem[] = [
  // STARTERS
  {
    id: 'starter-1',
    name: 'Paneer Tikka',
    category: 'Starters',
    type: 'veg',
    price: 240,
    originalPrice: 280,
    description: 'Fresh cottage cheese cubes marinated in spiced yogurt, ginger-garlic paste, and roasted in a traditional clay tandoor with bell peppers & onions.',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80',
    isChefSpecial: true,
    isPopular: true,
    spiceLevel: 2,
    preparationTime: '15-20 min',
    calories: '320 kcal'
  },
  {
    id: 'starter-2',
    name: 'Veg Manchurian',
    category: 'Starters',
    type: 'veg',
    price: 210,
    description: 'Crispy fried vegetable dumplings tossed in a savory Indo-Chinese garlic, ginger, soya, and scallion glaze.',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=800&auto=format&fit=crop&q=80',
    isPopular: true,
    spiceLevel: 2,
    preparationTime: '15 min',
    calories: '280 kcal'
  },
  {
    id: 'starter-3',
    name: 'Chicken 65',
    category: 'Starters',
    type: 'non-veg',
    price: 280,
    originalPrice: 320,
    description: 'Fiery South-Indian style boneless chicken bites tempered with curry leaves, crushed green chillies, garlic, and special Hubballi spices.',
    image: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=800&auto=format&fit=crop&q=80',
    isChefSpecial: true,
    isPopular: true,
    spiceLevel: 3,
    isSpicy: true,
    preparationTime: '20 min',
    calories: '390 kcal'
  },
  {
    id: 'starter-4',
    name: 'Crispy Corn',
    category: 'Starters',
    type: 'veg',
    price: 190,
    description: 'Tender golden sweet corn kernels coated in seasoned batter, deep fried till crunchy, and seasoned with chat masala, lime & fresh cilantro.',
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&auto=format&fit=crop&q=80',
    isPopular: false,
    spiceLevel: 1,
    preparationTime: '12 min',
    calories: '240 kcal'
  },
  {
    id: 'starter-5',
    name: 'Tandoori Malai Soya Chaap',
    category: 'Starters',
    type: 'veg',
    price: 250,
    description: 'Juicy soya chaap skewers slow-cooked in a creamy cashew, cardamom, and fresh cream marinade with charred aroma.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80',
    isChefSpecial: false,
    spiceLevel: 1,
    preparationTime: '18 min',
    calories: '340 kcal'
  },
  {
    id: 'starter-6',
    name: 'Chilli Garlic Fish Tikka',
    category: 'Starters',
    type: 'non-veg',
    price: 340,
    description: 'Succulent river fish fillets infused with crushed garlic, roasted cumin, kashmiri chilli and lime, char-grilled to perfection.',
    image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=800&auto=format&fit=crop&q=80',
    isChefSpecial: true,
    spiceLevel: 2,
    preparationTime: '20 min',
    calories: '310 kcal'
  },

  // MAIN COURSE
  {
    id: 'main-1',
    name: 'Butter Chicken',
    category: 'Main Course',
    type: 'non-veg',
    price: 340,
    originalPrice: 380,
    description: 'Tender tandoori chicken simmered in a velvety, buttery tomato gravy enriched with dried fenugreek leaves, cashews & fresh dairy cream.',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&auto=format&fit=crop&q=80',
    isChefSpecial: true,
    isPopular: true,
    spiceLevel: 1,
    preparationTime: '25 min',
    calories: '480 kcal'
  },
  {
    id: 'main-2',
    name: 'Paneer Butter Masala',
    category: 'Main Course',
    type: 'veg',
    price: 270,
    description: 'Soft malai paneer cubes gently cooked in a rich, mildly sweet and aromatic tomato-onion-cashew gravy with a dollop of fresh butter.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop&q=80',
    isPopular: true,
    spiceLevel: 1,
    preparationTime: '20 min',
    calories: '420 kcal'
  },
  {
    id: 'main-3',
    name: 'Veg Biryani',
    category: 'Main Course',
    type: 'veg',
    price: 240,
    description: 'Fragrant aged basmati rice layered with garden-fresh vegetables, saffron milk, fresh mint, fried onions, and whole aromatic spices.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    isPopular: true,
    spiceLevel: 2,
    preparationTime: '25 min',
    calories: '380 kcal'
  },
  {
    id: 'main-4',
    name: 'Chicken Biryani',
    category: 'Main Course',
    type: 'non-veg',
    price: 320,
    originalPrice: 360,
    description: 'Signature Dum Biryani cooked in traditional sealed handi with tender spiced chicken, saffron strands, kewra water, and caramelized shallots.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    isChefSpecial: true,
    isPopular: true,
    spiceLevel: 2,
    preparationTime: '25 min',
    calories: '550 kcal'
  },
  {
    id: 'main-5',
    name: 'Dal Tadka',
    category: 'Main Course',
    type: 'veg',
    price: 190,
    description: 'Slow-simmered yellow lentils tempered with desi ghee, cumin seeds, garlic slivers, dried red chillies, and fresh coriander leaves.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80',
    isPopular: true,
    spiceLevel: 1,
    preparationTime: '15 min',
    calories: '220 kcal'
  },
  {
    id: 'main-6',
    name: 'Butter Naan',
    category: 'Breads & Rice',
    type: 'veg',
    price: 55,
    description: 'Classic leavened flatbread freshly baked in the tandoor and brushed generously with farm-fresh butter.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
    isPopular: true,
    preparationTime: '10 min',
    calories: '180 kcal'
  },
  {
    id: 'main-7',
    name: 'Garlic Herb Naan',
    category: 'Breads & Rice',
    type: 'veg',
    price: 65,
    description: 'Oven-baked tandoori naan topped with roasted minced garlic, fresh coriander leaves, and clarified butter.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80',
    isPopular: false,
    preparationTime: '10 min',
    calories: '190 kcal'
  },
  {
    id: 'main-8',
    name: 'Kadhai Paneer',
    category: 'Main Course',
    type: 'veg',
    price: 260,
    description: 'Paneer batons and crunchy bell peppers tossed in a robust crushed coriander and red chilli masala gravy in an iron wok.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=80',
    isChefSpecial: false,
    spiceLevel: 2,
    preparationTime: '20 min',
    calories: '390 kcal'
  },
  {
    id: 'main-9',
    name: 'Mutton Rogan Josh',
    category: 'Main Course',
    type: 'non-veg',
    price: 420,
    description: 'Slow-braised tender lamb pieces simmered in an authentic Kashmiri gravy spiced with ratanjot, fennel powder, and mace.',
    image: 'https://images.unsplash.com/photo-1545247181-516773cae7be?w=800&auto=format&fit=crop&q=80',
    isChefSpecial: true,
    spiceLevel: 2,
    preparationTime: '30 min',
    calories: '510 kcal'
  },

  // DESSERTS
  {
    id: 'dessert-1',
    name: 'Gulab Jamun with Rabri',
    category: 'Desserts',
    type: 'veg',
    price: 120,
    originalPrice: 150,
    description: 'Warm, golden khoya dumplings soaked in fragrant green cardamom & saffron syrup, served over rich condensed rabri.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
    isChefSpecial: true,
    isPopular: true,
    preparationTime: '5 min',
    calories: '320 kcal'
  },
  {
    id: 'dessert-2',
    name: 'Ice Cream Trio',
    category: 'Desserts',
    type: 'veg',
    price: 130,
    description: 'Three scoops of premium artisanal ice cream (Belgian Dark Chocolate, Alphonso Mango & Royal Kesar Pista) with wafer rolls.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80',
    isPopular: true,
    preparationTime: '5 min',
    calories: '260 kcal'
  },
  {
    id: 'dessert-3',
    name: 'Sizzling Chocolate Brownie',
    category: 'Desserts',
    type: 'veg',
    price: 180,
    originalPrice: 220,
    description: 'Warm walnut fudge brownie served on a sizzling hot cast-iron plate with vanilla bean ice cream & molten chocolate drizzle.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80',
    isChefSpecial: true,
    isPopular: true,
    preparationTime: '10 min',
    calories: '450 kcal'
  },
  {
    id: 'dessert-4',
    name: 'Exotic Fruit Salad',
    category: 'Desserts',
    type: 'veg',
    price: 140,
    description: 'Fresh seasonal fruits (kiwi, pomegranate, dragon fruit, apples & grapes) tossed with pure organic honey, mint leaves & chia seeds.',
    image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=800&auto=format&fit=crop&q=80',
    isPopular: false,
    preparationTime: '8 min',
    calories: '160 kcal'
  },
  {
    id: 'dessert-5',
    name: 'Royal Bengali Rasmalai',
    category: 'Desserts',
    type: 'veg',
    price: 140,
    description: 'Pillowy cottage cheese discs steeped in thickened saffron-pistachio clotted cream milk with slivered almonds.',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&auto=format&fit=crop&q=80',
    isChefSpecial: false,
    isPopular: true,
    preparationTime: '5 min',
    calories: '290 kcal'
  }
];

export const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: 'special-1',
    name: 'Royal Dum Biryani Feast',
    description: 'Choice of Chicken or Veg Dum Biryani served with Mirchi ka Salan, Boondi Raita, Crispy Papad, and 2 warm Gulab Jamuns.',
    originalPrice: 480,
    discountedPrice: 349,
    discountTag: '27% OFF',
    tagline: 'Best Seller Family Feast',
    type: 'non-veg',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    includes: ['Dum Biryani Handi', 'Mirchi ka Salan & Raita', '2x Gulab Jamuns', 'Masala Papad']
  },
  {
    id: 'special-2',
    name: "Chef's Tandoori Platter",
    description: 'Assortment of Paneer Tikka, Veg Seekh Kebab, Stuffed Tandoori Mushrooms, and Malai Chaap with mint chutney and butter naan.',
    originalPrice: 420,
    discountedPrice: 299,
    discountTag: '29% OFF',
    tagline: "Vegetarian Gourmet Delight",
    type: 'veg',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80',
    includes: ['4x Paneer Tikka', '4x Seekh Kebabs', 'Stuffed Mushrooms', 'Mint Dip & Salad']
  },
  {
    id: 'special-3',
    name: 'Sizzling Brownie & Sundae Special',
    description: 'Double chocolate walnut brownie on a smoking cast-iron platter topped with French vanilla ice cream and warm Belgian chocolate ganache.',
    originalPrice: 240,
    discountedPrice: 169,
    discountTag: '30% OFF',
    tagline: 'Sweet Tooth Indulgence',
    type: 'veg',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80',
    includes: ['Sizzling Walnut Brownie', 'Vanilla Bean Scoop', 'Hot Chocolate Fudge', 'Roasted Nuts']
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Warm Ambient Main Dining Hall',
    category: 'Interior',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&auto=format&fit=crop&q=80',
    description: 'Spacious, elegantly lit interior designed for family dining and warm social gatherings.'
  },
  {
    id: 'gal-2',
    title: 'Spice Garden Grand Entrance',
    category: 'Exterior',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&auto=format&fit=crop&q=80',
    description: 'Welcoming modern facade located conveniently on Gokul Road, Hubballi with valet parking.'
  },
  {
    id: 'gal-3',
    title: 'Tandoori Sizzle & Starters',
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&auto=format&fit=crop&q=80',
    description: 'Freshly roasted tandoor kebabs prepared with traditional aromatic spice blends.'
  },
  {
    id: 'gal-4',
    title: 'Executive Chef in Action',
    category: 'Chef',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1000&auto=format&fit=crop&q=80',
    description: 'Chef Anand Vernekar crafting gourmet delicacies with precision and passion.'
  },
  {
    id: 'gal-5',
    title: 'Private Candlelight Dining Area',
    category: 'Dining',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1000&auto=format&fit=crop&q=80',
    description: 'Intimate seating corners perfect for couple dinners, celebrations, and quiet moments.'
  },
  {
    id: 'gal-6',
    title: 'Authentic Handi Biryani Spread',
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1000&auto=format&fit=crop&q=80',
    description: 'Aromatic Dum Biryani served in traditional copper & clay handis.'
  },
  {
    id: 'gal-7',
    title: 'Rooftop Garden Seating',
    category: 'Interior',
    image: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=1000&auto=format&fit=crop&q=80',
    description: 'Breezy evening ambiance surrounded by natural lush greenery.'
  },
  {
    id: 'gal-8',
    title: 'Artisanal Dessert Presentation',
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=1000&auto=format&fit=crop&q=80',
    description: 'Signature desserts crafted daily with organic milk and pure desi ghee.'
  }
];

export const CUSTOMER_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Priyanka Kulkarni',
    location: 'Hubballi Resident',
    rating: 5,
    comment: 'The Butter Chicken and Garlic Naan are unmatched in North Karnataka! The ambiance is so pleasant, staff is exceptionally polite, and our family dinner was truly memorable.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    dishRecommended: 'Butter Chicken & Paneer Tikka',
    date: '2 days ago',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'Rohit Patil',
    location: 'KLE Tech Student',
    rating: 5,
    comment: 'Awesome hangout spot for friends! We tried the Chicken 65, Dum Biryani, and the Sizzling Brownie. Great food portions at honest prices, and online table reservation was super fast.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    dishRecommended: 'Chicken 65 & Sizzling Brownie',
    date: '1 week ago',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'Dr. Suresh Deshmukh',
    location: 'Dharwad',
    rating: 5,
    comment: 'Spice Garden is our go-to restaurant for family anniversaries and weekend get-togethers. The hygiene standards, cozy seating, and Paneer Butter Masala are outstanding.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    dishRecommended: 'Paneer Butter Masala & Dal Tadka',
    date: '2 weeks ago',
    verified: true
  },
  {
    id: 'rev-4',
    name: 'Ananya Hegde',
    location: 'Food Blogger, Bengaluru',
    rating: 5,
    comment: 'Visited during my trip to Hubballi. The aromatic slow-cooked Biryani and the Rabri Gulab Jamun blew me away. Truly a 5-star gastronomic experience with authentic local hospitality!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    dishRecommended: 'Royal Dum Biryani & Gulab Jamun',
    date: '3 weeks ago',
    verified: true
  }
];

export const CHEF_INFO = {
  name: 'Chef Anand Vernekar',
  role: 'Executive Head Chef & Culinary Director',
  experience: '22+ Years of Culinary Mastery',
  bio: 'Trained across premier luxury kitchens in Mumbai, Goa, and Karnataka, Chef Anand brings a deep devotion to authentic Indian spices, traditional slow-fire clay ovens, and vibrant multi-cuisine fusion. Under his stewardship, every marinade is handcrafted daily without artificial preservatives.',
  quote: "Cooking is not merely recipes; it is the art of creating joy on a plate through pure ingredients and unconditional love.",
  image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&auto=format&fit=crop&q=80'
};
