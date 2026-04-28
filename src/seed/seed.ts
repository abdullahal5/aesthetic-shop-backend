import { connectDB } from "../core/database.js";
import Product from "../modules/product/product.model.js";

// ==================== PRODUCTS DATA ====================
const productsData = [
  {
    slug: 'aurora-frosted-glass-bottle',
    name: 'Aurora Frosted Glass Bottle',
    tagline: 'The bottle that actually fits your aesthetic.',
    description: `The Aurora Frosted Glass Bottle is crafted for students, creators, and anyone who believes their daily essentials should look as good as they feel.

Made from premium borosilicate glass with a hand-feel silicone sleeve, this 500ml bottle keeps your water cool and your desk looking intentional. The frosted finish diffuses light beautifully — it photographs well and looks even better in person.

Leakproof bamboo lid, wide mouth for easy cleaning, and a minimalist design that works on your study desk, gym bag, or as a thoughtful gift.`,
    price: 650,
    originalPrice: 850,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=900&q=85',
        alt: 'Aurora frosted glass bottle front view',
      },
      {
        url: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=900&q=85',
        alt: 'Aurora bottle on desk setup',
      },
      {
        url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=85',
        alt: 'Aurora bottle lifestyle shot',
      },
      {
        url: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=900&q=85',
        alt: 'Aurora bottle close up texture',
      },
    ],
    stock: 8,
    totalSold: 247,
    category: 'Water Bottles',
    tags: ['aesthetic', 'glass', 'desk setup', 'gift', 'student'],
    features: [
      '500ml borosilicate glass',
      'Anti-slip silicone sleeve',
      'Leakproof bamboo lid',
      'Wide mouth — easy to clean',
      'BPA-free, food safe',
      'Works with hot & cold liquids',
    ],
    metaTitle:
      'Aurora Frosted Glass Bottle — Aesthetic Water Bottle Bangladesh | AuraStore',
    metaDescription:
      'Premium frosted glass water bottle for students and desk setups. Borosilicate glass, bamboo lid, anti-slip sleeve. Fast delivery across Bangladesh. COD available.',
    featured: true,
    status: 'active',
  },
  {
    slug: 'mist-ceramic-bottle',
    name: 'Mist Ceramic Bottle',
    tagline: 'Warm mornings. Cool water. Beautiful desk.',
    description: `The Mist Ceramic Bottle is for the intentional ones. Those who take their morning routine seriously and believe every object they own should spark a little joy.

Matte ceramic coating in soft sage green, 400ml capacity, paired with a natural bamboo lid that adds warmth to any setup. The insulated double wall keeps cold drinks cold for 12 hours and hot drinks warm for 8.

Perfect for your study desk, gym bag, or as a meaningful gift for someone special.`,
    price: 750,
    originalPrice: 950,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&q=85',
        alt: 'Mist ceramic bottle sage green',
      },
      {
        url: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=900&q=85',
        alt: 'Mist bottle on wooden surface',
      },
      {
        url: 'https://images.unsplash.com/photo-1596952954288-16862d37405b?w=900&q=85',
        alt: 'Mist bottle close up matte finish',
      },
    ],
    stock: 5,
    totalSold: 189,
    category: 'Water Bottles',
    tags: ['ceramic', 'sage', 'aesthetic', 'gift', 'insulated'],
    features: [
      '400ml double-wall insulated',
      'Matte ceramic coating',
      'Natural bamboo lid',
      'Cold 12hrs / Hot 8hrs',
      'BPA-free stainless steel core',
      'Non-slip base',
    ],
    metaTitle:
      'Mist Ceramic Bottle — Sage Green Aesthetic Bottle Bangladesh | AuraStore',
    metaDescription:
      'Matte ceramic bottle in soft sage green with bamboo lid. Double-wall insulated, 400ml. Perfect for students and gifts. Fast delivery in Bangladesh. COD available.',
    featured: true,
    status: 'active',
  },
  {
    slug: 'cloud-glass-tumbler',
    name: 'Cloud Glass Tumbler',
    tagline: 'Sip cloud nine. Every single day.',
    description: `The Cloud Glass Tumbler brings a touch of whimsy to your daily hydration. A wide-mouth, clear borosilicate glass tumbler with a pastel silicone lid and straw — designed for iced coffees, smoothies, and aesthetic desk setups.

The clear glass lets you see the beautiful colors of whatever you're drinking. The cloud-white silicone lid with built-in straw hole is clean, minimal, and spill-resistant.

Light, beautiful, and completely dishwasher-safe.`,
    price: 550,
    originalPrice: 700,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=900&q=85',
        alt: 'Cloud glass tumbler with straw',
      },
      {
        url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=900&q=85',
        alt: 'Cloud tumbler iced coffee',
      },
      {
        url: 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=900&q=85',
        alt: 'Cloud tumbler flat lay',
      },
    ],
    stock: 12,
    totalSold: 312,
    category: 'Tumblers',
    tags: ['glass', 'tumbler', 'iced coffee', 'aesthetic', 'straw'],
    features: [
      '450ml borosilicate glass',
      'Pastel silicone lid',
      'Reusable stainless straw',
      'Dishwasher safe',
      'Wide mouth design',
      'Heat resistant',
    ],
    metaTitle:
      'Cloud Glass Tumbler — Aesthetic Tumbler for Iced Coffee Bangladesh | AuraStore',
    metaDescription:
      'Clear borosilicate glass tumbler with pastel lid and reusable straw. Perfect for iced coffee and aesthetic setups. Fast delivery Bangladesh. COD available.',
    featured: true,
    status: 'active',
  },
  {
    slug: 'pebble-insulated-bottle',
    name: 'Pebble Insulated Bottle',
    tagline: 'Smooth. Quiet. Yours.',
    description: `The Pebble Insulated Bottle is designed for the minimalist who wants nothing extra. A smooth-finish, powder-coated stainless steel bottle in a warm desert sand color that works with everything.

600ml capacity, double-wall vacuum insulated, with a simple press-and-sip lid that's leak-proof when closed. The rounded pebble-like shape fits your hand perfectly.

This is the bottle you carry everywhere without thinking twice.`,
    price: 850,
    originalPrice: 1100,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1596952954288-16862d37405b?w=900&q=85',
        alt: 'Pebble insulated bottle desert sand',
      },
      {
        url: 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=900&q=85',
        alt: 'Pebble bottle outdoor',
      },
      {
        url: 'https://images.unsplash.com/photo-1532635241-17e820acc59f?w=900&q=85',
        alt: 'Pebble bottle lifestyle',
      },
    ],
    stock: 6,
    totalSold: 145,
    category: 'Water Bottles',
    tags: ['insulated', 'stainless', 'gym', 'outdoor', 'minimalist'],
    features: [
      '600ml vacuum insulated',
      'Powder-coated stainless steel',
      'Press-and-sip leakproof lid',
      'Cold 24hrs / Hot 12hrs',
      'Fits standard cup holders',
      'Sweat-free exterior',
    ],
    metaTitle:
      'Pebble Insulated Bottle — Premium Stainless Bottle Bangladesh | AuraStore',
    metaDescription:
      '600ml vacuum insulated stainless steel bottle. Keeps cold 24hrs, hot 12hrs. Perfect for gym and travel. Fast delivery Bangladesh. COD available.',
    featured: false,
    status: 'active',
  },
  {
    slug: 'sakura-glass-set',
    name: 'Sakura Gift Set',
    tagline: "The gift they'll actually use.",
    description: `The Sakura Gift Set is the perfect present for birthdays, anniversaries, or just because. Includes two matching frosted glass bottles in blush pink and white, gift-wrapped in premium tissue paper with a handwritten card option.

Each bottle is 400ml, made from borosilicate glass with a matching silicone sleeve. The set comes in an elegant black gift box with ribbon — ready to gift the moment it arrives.

Because some people deserve something beautiful.`,
    price: 1200,
    originalPrice: 1600,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=900&q=85',
        alt: 'Sakura gift set blush pink bottles',
      },
      {
        url: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=900&q=85',
        alt: 'Sakura set gift box',
      },
    ],
    stock: 4,
    totalSold: 98,
    category: 'Gift Sets',
    tags: ['gift', 'set', 'pink', 'birthday', 'anniversary'],
    features: [
      '2x 400ml borosilicate bottles',
      'Blush pink & white color set',
      'Premium gift box included',
      'Ribbon and tissue paper',
      'Handwritten card option',
      'BPA-free, food safe',
    ],
    metaTitle:
      'Sakura Gift Set — Aesthetic Bottle Gift Set Bangladesh | AuraStore',
    metaDescription:
      'Premium gift set with 2 matching frosted glass bottles. Beautiful gift box included. Perfect for birthdays and anniversaries. Fast delivery Bangladesh.',
    featured: true,
    status: 'active',
  },
  {
    slug: 'bamboo-cap-glass-bottle',
    name: 'Bamboo Cap Glass Bottle',
    tagline: 'Natural. Clean. Intentional.',
    description: `The Bamboo Cap Glass Bottle celebrates natural materials and clean design. Clear borosilicate glass with a warm bamboo lid and a minimalist rope handle — simple, sustainable, beautiful.

500ml capacity with a wide mouth for easy cleaning and filling with ice. The bamboo lid is sealed with food-grade silicone for a leakproof close. The rope handle makes it easy to carry without a bag.

For those who want their hydration to be as natural as their lifestyle.`,
    price: 600,
    originalPrice: 800,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1532635241-17e820acc59f?w=900&q=85',
        alt: 'Bamboo cap glass bottle natural',
      },
      {
        url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=900&q=85',
        alt: 'Bamboo bottle clear glass',
      },
      {
        url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=85',
        alt: 'Bamboo bottle rope handle',
      },
    ],
    stock: 15,
    totalSold: 203,
    category: 'Water Bottles',
    tags: ['bamboo', 'natural', 'eco', 'clear glass', 'sustainable'],
    features: [
      '500ml borosilicate glass',
      'Natural bamboo lid',
      'Woven rope handle',
      'Wide mouth design',
      'Food-grade silicone seal',
      'Eco-friendly materials',
    ],
    metaTitle:
      'Bamboo Cap Glass Bottle — Eco Aesthetic Bottle Bangladesh | AuraStore',
    metaDescription:
      'Clear glass bottle with natural bamboo lid and rope handle. 500ml, eco-friendly design. Perfect for desk setups. Fast delivery Bangladesh. COD available.',
    featured: false,
    status: 'active',
  },
  {
    slug: 'midnight-steel-thermos',
    name: 'Midnight Steel Thermos',
    tagline: 'Hot coffee. Cold water. All day.',
    description: `The Midnight Steel Thermos is for the long haul. Whether you're studying for exams, working from home, or traveling outside Dhaka, this 750ml thermos keeps your drinks exactly the temperature you want.

Double-wall vacuum insulation, matte black finish, and a simple twist-and-pour cap. Fill it at 8am and your coffee will still be hot at 5pm. Ice water stays cold for 24 hours.

Built for students, commuters, and minimalists.`,
    price: 950,
    originalPrice: 1300,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600320254374-f3b1b7a7cb7f?w=900&q=85',
        alt: 'Midnight steel thermos black',
      },
      {
        url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=900&q=85',
        alt: 'Midnight thermos pouring coffee',
      },
    ],
    stock: 10,
    totalSold: 312,
    category: 'Thermos',
    tags: ['thermos', 'insulated', 'coffee', 'travel', 'stainless'],
    features: [
      '750ml vacuum insulation',
      'Matte black finish',
      'Twist-and-pour cap',
      'Hot 12hrs / Cold 24hrs',
      'Sweat-proof exterior',
      'BPA-free stainless steel',
    ],
    metaTitle:
      'Midnight Steel Thermos — Premium Thermos Bangladesh | AuraStore',
    metaDescription:
      '750ml vacuum insulated thermos. Keeps hot 12hrs, cold 24hrs. Matte black finish. Perfect for students and travelers. Fast delivery Bangladesh.',
    featured: true,
    status: 'active',
  },
  {
    slug: 'rose-gold-tumbler',
    name: 'Rose Gold Tumbler',
    tagline: 'Elegance in every sip.',
    description: `The Rose Gold Tumbler adds a touch of glamour to your daily hydration. Double-wall insulated stainless steel with a stunning rose gold finish and a clear lid with straw.

500ml capacity, perfect for iced lattes, smoothies, and water. The copper-toned finish catches light beautifully and resists fingerprints. Complete with a reusable straw and cleaning brush.

For those who believe even water should look beautiful.`,
    price: 780,
    originalPrice: 1050,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=900&q=85',
        alt: 'Rose gold tumbler metallic',
      },
      {
        url: 'https://images.unsplash.com/photo-1578768079051-aa76c52d62b5?w=900&q=85',
        alt: 'Rose gold tumbler with straw',
      },
    ],
    stock: 7,
    totalSold: 156,
    category: 'Tumblers',
    tags: ['rose gold', 'tumbler', 'insulated', 'stainless', 'glam'],
    features: [
      '500ml double-wall insulated',
      'Rose gold copper finish',
      'Clear lid with straw',
      'Reusable cleaning brush',
      'Sweat-free exterior',
      'Fits car cup holders',
    ],
    metaTitle:
      'Rose Gold Tumbler — Glam Insulated Tumbler Bangladesh | AuraStore',
    metaDescription:
      '500ml rose gold insulated tumbler with straw. Keeps drinks cold. Perfect for iced coffee and aesthetic setups. Fast delivery Bangladesh.',
    featured: false,
    status: 'active',
  },
  {
    slug: 'minimalist-glass-straw-set',
    name: 'Minimalist Glass Straw Set',
    tagline: 'Small detail. Big difference.',
    description: `Complete your sustainable setup with our Minimalist Glass Straw Set. Four reusable borosilicate glass straws in different sizes, plus a natural bamboo cleaning brush and travel pouch.

Includes two straight straws (8" and 10") and two bent straws for tumblers and bottles. The glass is crystal clear, heat resistant, and completely dishwasher safe.

Because the best details are the ones you notice every day.`,
    price: 350,
    originalPrice: 500,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1585681660329-6a6a2d7edf0b?w=900&q=85',
        alt: 'Glass straw set with pouch',
      },
      {
        url: 'https://images.unsplash.com/photo-1578768079051-aa76c52d62b5?w=900&q=85',
        alt: 'Glass straws in tumbler',
      },
    ],
    stock: 20,
    totalSold: 423,
    category: 'Accessories',
    tags: ['straws', 'glass', 'eco', 'sustainable', 'accessories'],
    features: [
      '4 borosilicate glass straws',
      'Bamboo cleaning brush',
      'Organic cotton travel pouch',
      'Dishwasher safe',
      'Heat resistant',
      'Straight & bent options',
    ],
    metaTitle: 'Minimalist Glass Straw Set — Eco Straws Bangladesh | AuraStore',
    metaDescription:
      'Reusable borosilicate glass straws with bamboo cleaning brush and travel pouch. Eco-friendly alternative to plastic. Fast delivery Bangladesh.',
    featured: true,
    status: 'active',
  },
  {
    slug: 'terrazzo-coaster-set',
    name: 'Terrazzo Coaster Set',
    tagline: 'For desks that deserve better.',
    description: `Complete your desk aesthetic with our Terrazzo Coaster Set. Four handmade cement coasters with terrazzo speckles in muted pink, blue, and cream tones.

Each coaster is 4"x4", has a cork backing to prevent slipping, and absorbs condensation naturally. Packaged in a gift-ready box.

Because your drinks deserve a beautiful place to land.`,
    price: 450,
    originalPrice: 650,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1585681660329-6a6a2d7edf0b?w=900&q=85',
        alt: 'Terrazzo coasters set',
      },
      {
        url: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=900&q=85',
        alt: 'Terrazzo coaster on desk',
      },
    ],
    stock: 18,
    totalSold: 267,
    category: 'Accessories',
    tags: ['coasters', 'desk', 'terrazzo', 'cement', 'gift'],
    features: [
      '4 cement coasters',
      'Terrazzo speckled design',
      'Cork backing',
      'Gift box included',
      'Absorbs condensation',
    ],
    metaTitle:
      'Terrazzo Coaster Set — Aesthetic Desk Coasters Bangladesh | AuraStore',
    metaDescription:
      'Handmade cement coasters with terrazzo design. Perfect for desk setups and home decor. Gift box included. Fast delivery Bangladesh.',
    featured: false,
    status: 'active',
  },
];

// ==================== SEED FUNCTIONS ====================

// Seed Products
export const seedProducts = async () => {
  try {
    const existingProducts = await Product.find({});
    if (existingProducts.length > 0) {
      console.log('✅ Products already exist in database');
      return;
    }

    const insertedProducts = await Product.insertMany(productsData);
    console.log(`✅ ${insertedProducts.length} products inserted successfully`);
    return insertedProducts;
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    throw error;
  }
};

// Master seed function
export const seedAll = async () => {
  console.log('🌱 Starting database seeding...');

  try {
    await connectDB();
    console.log('📦 Connected to database');

    // Seed all collections
    await seedProducts();

    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
};

// Auto-run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedAll()
    .then(() => {
      console.log('Seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}
