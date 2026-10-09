# NFC Coffee Coaster Recipe Pages

Source data for 12 recipe pages. Each section below is one `CoffeeDrink` JSON object, ready to copy into your build.

## Schema

```ts
type CoffeeDrink = {
  slug: string;
  name: string;
  tags: [string, string, string];
  tagline: string;
  intro: string;
  difficulty: "Easy" | "Medium" | "Advanced";
  prepTimeMinutes: number;
  totalTimeMinutes?: number;
  servings: number;
  serveTemp: "Hot" | "Iced" | "Cold";
  vessel: { name: string; sizeOz: number; note?: string };
  ingredients: { amount: string; item: string; note?: string }[];
  equipment: { item: string; alternative?: string }[];
  dialIn: {
    doseGrams?: number;
    yieldGrams?: number;
    grind?: string;
    waterTempF?: number;
    timeSeconds?: string;
    milkTempF?: number;
  };
  steps: { title: string; body: string; tip?: string }[];
  homeMethods: { method: string; note: string }[];
  tips: string[];
  commonMistakes: string[];
  variations: { name: string; description: string }[];
  flavorProfile: { bitter: number; sweet: number; creamy: number; strong: number };
  history?: string;
  contains_alcohol: boolean;
  relatedSlugs: string[];
  seo: { title: string; description: string };
};
```

## Index

| # | Slug | Name |
|---|------|------|
| 1 | `espresso` | Espresso |
| 2 | `americano` | Americano |
| 3 | `cappuccino` | Cappuccino |
| 4 | `latte` | Latte |
| 5 | `flat-white` | Flat White |
| 6 | `mocha` | Mocha |
| 7 | `espresso-macchiato` | Espresso Macchiato |
| 8 | `iced-latte` | Iced Latte |
| 9 | `cold-brew` | Cold Brew |
| 10 | `affogato` | Affogato |
| 11 | `irish-coffee` | Irish Coffee (contains alcohol) |
| 12 | `vietnamese-iced-coffee` | Vietnamese Iced Coffee |

---

## 1. Espresso

```json
{
  "slug": "espresso",
  "name": "Espresso",
  "tags": ["ESPRESSO", "CRÉMA", "PURE"],
  "tagline": "INTENSE • SHARP • ESSENTIAL",
  "intro": "Espresso is coffee at its most concentrated: a small, syrupy shot topped with a golden layer of crema. It tastes bold and slightly sharp, with a sweet, lingering finish when it's dialed in well. Every other drink on this list is built on it.",
  "difficulty": "Advanced",
  "prepTimeMinutes": 5,
  "servings": 1,
  "serveTemp": "Hot",
  "vessel": { "name": "Espresso cup (demitasse), pre-warmed", "sizeOz": 3, "note": "A small, thick-walled cup holds heat and crema best." },
  "ingredients": [
    { "amount": "18 g", "item": "finely ground coffee", "note": "Freshly ground, ideally roasted within the last 2 to 4 weeks." },
    { "amount": "2 oz", "item": "double shot espresso (the result)", "note": "By weight this is typically about 36 to 40 g in the cup, because the crema adds volume." }
  ],
  "equipment": [
    { "item": "Espresso machine with a double-basket portafilter", "alternative": "Moka pot or AeroPress (see home methods)" },
    { "item": "Burr grinder capable of fine, adjustable settings", "alternative": "Pre-ground espresso-fine coffee (fresher is better)" },
    { "item": "Kitchen scale (0.1 g if possible)" },
    { "item": "Tamper" },
    { "item": "Timer" }
  ],
  "dialIn": { "doseGrams": 18, "yieldGrams": 38, "grind": "Fine, like table salt, adjusted until the shot runs in the time window", "waterTempF": 200, "timeSeconds": "25-30" },
  "steps": [
    { "title": "Warm everything up", "body": "Run a blank shot through the empty portafilter and group head, and warm your cup with hot water. Cold metal and ceramic steal heat from the shot and make it taste sour and thin.", "tip": "Most machines need 15 to 30 minutes to fully heat up. Be patient." },
    { "title": "Weigh and grind", "body": "Grind 18 g of coffee into the portafilter basket. Weighing instead of scooping keeps shots repeatable, and a fine grind gives the water enough resistance to extract properly under pressure.", "tip": "If you can, grind directly into the basket to avoid a mess and static." },
    { "title": "Level and tamp", "body": "Gently level the grounds with your finger or a tap on the counter, then tamp straight down with firm, even pressure. The goal is a flat, level bed so water flows evenly through all of it, not just one channel.", "tip": "Level matters more than force. Don't twist or hammer." },
    { "title": "Pull the shot", "body": "Lock in the portafilter, place your cup on a scale if you have one, and start the shot right away. Aim for roughly 25 to 30 seconds from start to finish, with a steady flow that looks like warm honey.", "tip": "Gushing in under 20 seconds means grind finer. A dribble past 35 seconds means grind coarser." },
    { "title": "Taste and adjust", "body": "Sour and sharp usually means under-extracted, so go finer or increase yield slightly. Harsh, bitter and drying means over-extracted, so go coarser. Change only one thing at a time, and make small grinder steps.", "tip": "Keep notes. Dialing in is a skill, and it's normal to waste a few shots on a new bag." },
    { "title": "Serve immediately", "body": "Crema fades within a minute or two and espresso changes quickly as it cools. Serve and sip right away, or stir gently to blend the crema in first." }
  ],
  "homeMethods": [
    { "method": "Moka pot", "note": "Makes a strong, concentrated coffee using steam pressure. It's rich and punchy but has no true crema and less body than real espresso. Use a fine-medium grind and medium heat, and stop when it starts to sputter." },
    { "method": "AeroPress (concentrated recipe)", "note": "Use a fine grind, about 18 g coffee, and roughly 2 to 3 oz of hot water, pressing firmly. It's a clean and strong shot, but it's brewed coffee, so expect no crema and a lighter texture." },
    { "method": "Strong brewed coffee", "note": "A drip or pour-over made at double strength is not espresso, but it can stand in for the base of an Americano-style drink. Expect a thinner, less syrupy cup." }
  ],
  "tips": [
    "Fresh beans and a good burr grinder make a bigger difference than an expensive machine.",
    "Use filtered water if your tap water is very hard or heavily chlorinated.",
    "Preheating the cup keeps the shot hot longer.",
    "Ideal dose, yield and time vary by coffee and roast, so treat the numbers as a starting point."
  ],
  "commonMistakes": [
    "Using pre-ground coffee that is too coarse or stale.",
    "Not weighing the dose, which makes every shot different.",
    "Changing several variables at once while dialing in.",
    "Forgetting to preheat the machine and cup.",
    "Uneven tamping that causes channeling, with fast jets of water and a bitter-sour shot."
  ],
  "variations": [
    { "name": "Ristretto", "description": "A shorter, more concentrated shot using less water through the same dose. It tastes sweeter and heavier. Exact ratios vary by café." },
    { "name": "Lungo", "description": "A longer shot with more water through the same dose. It tastes thinner and more bitter." },
    { "name": "Single shot", "description": "Uses a smaller basket and dose. The coaster recipe is the double shot." }
  ],
  "flavorProfile": { "bitter": 4, "sweet": 2, "creamy": 1, "strong": 5 },
  "history": "Espresso machines emerged in Italy in the late 1800s and early 1900s, with several inventors and patents involved, and the modern high-pressure style followed in the mid-20th century. The exact credit for who invented what is debated.",
  "contains_alcohol": false,
  "relatedSlugs": ["americano", "espresso-macchiato", "cappuccino", "affogato"],
  "seo": {
    "title": "How to Make Espresso at Home: Dose, Grind and Timing",
    "description": "Learn how to pull a double shot of espresso with 18 g of coffee, plus honest alternatives using a moka pot or AeroPress if you don't own a machine."
  }
}
```

---

## 2. Americano

```json
{
  "slug": "americano",
  "name": "Americano",
  "tags": ["ESPRESSO", "WATER", "SIMPLE"],
  "tagline": "CLEAN • LIGHT • LONG",
  "intro": "An Americano is a double shot of espresso lengthened with hot water, giving you a larger, easy-sipping cup. It keeps the roasty depth of espresso but feels lighter and cleaner, closer to a strong black coffee. It's an easy way to slow down and enjoy a shot.",
  "difficulty": "Easy",
  "prepTimeMinutes": 5,
  "servings": 1,
  "serveTemp": "Hot",
  "vessel": { "name": "Mug or Americano cup", "sizeOz": 8, "note": "The 2 oz espresso plus 6 oz water fills about 8 oz." },
  "ingredients": [
    { "amount": "2 oz", "item": "double shot espresso", "note": "Made from roughly 18 g of finely ground coffee." },
    { "amount": "6 oz", "item": "hot water", "note": "Just off the boil, around 190 to 200°F, is a good range." }
  ],
  "equipment": [
    { "item": "Espresso machine", "alternative": "Moka pot or AeroPress (see home methods)" },
    { "item": "Kettle or machine hot-water tap" },
    { "item": "Mug" }
  ],
  "dialIn": { "doseGrams": 18, "yieldGrams": 38, "grind": "Fine (espresso)", "waterTempF": 195, "timeSeconds": "25-30" },
  "steps": [
    { "title": "Heat the water", "body": "Heat your water to just under boiling, around 190 to 200°F. Water that's too hot can make the finished drink taste harsh, while lukewarm water makes it dull and weak.", "tip": "If your kettle has no temperature control, let it sit about 30 seconds after boiling." },
    { "title": "Warm the mug", "body": "Add a splash of hot water to your mug and swirl it, then pour it out. A warm mug keeps the Americano hot while you drink it." },
    { "title": "Pull a double shot", "body": "Pull your double shot straight into the mug. Starting with the espresso keeps the crema intact on top.", "tip": "Aim for about 25 to 30 seconds from start to finish." },
    { "title": "Add hot water", "body": "Pour 6 oz of hot water over the shot. A gentle pour keeps some of the crema on the surface and gives a more integrated flavor.", "tip": "Pouring espresso into the water instead gives a different look and, to many people, a slightly smoother taste." },
    { "title": "Taste and adjust", "body": "If it's too strong, add a bit more hot water. If it's too weak, next time try a slightly finer grind or a bit less water. Keep the coaster ratio as your starting point." },
    { "title": "Enjoy right away", "body": "Sip while hot. An Americano gets bitter-tasting as it cools, so it's best enjoyed fresh." }
  ],
  "homeMethods": [
    { "method": "Moka pot", "note": "Make a moka pot brew and add hot water. The coffee is strong and rich, but it lacks the crema and slight sweetness of true espresso, so the result tastes heavier and less smooth." },
    { "method": "AeroPress", "note": "Brew a concentrated AeroPress shot (fine grind, small water volume) and top with hot water. It's a good approximation: clean and balanced, but no crema." },
    { "method": "Strong brewed coffee", "note": "Regular drip coffee made a little stronger is the closest everyday swap. It's similar in feel to an Americano, though lighter on body and without the espresso character." }
  ],
  "tips": [
    "Use hot water from a kettle rather than boiling-hot water straight from the heat.",
    "The ratio is easy to scale: the coaster uses 1 part espresso to 3 parts water.",
    "Fresh beans make a clean drink taste even cleaner."
  ],
  "commonMistakes": [
    "Using water that's boiling hot, which can taste harsh.",
    "Adding the water first and letting the espresso sit.",
    "Using stale or very dark, oily beans that taste burnt once diluted.",
    "Waiting too long to drink it."
  ],
  "variations": [
    { "name": "Long Black", "description": "Hot water goes in first and the espresso is poured on top to preserve the crema. Common in Australia and New Zealand. Differences from an Americano vary by café." },
    { "name": "Iced Americano", "description": "Pour the shot and cold water over ice for a refreshing, light cold drink." },
    { "name": "Splash of milk", "description": "A small pour of milk makes a quick, café-style cup without turning it into a latte." }
  ],
  "flavorProfile": { "bitter": 3, "sweet": 1, "creamy": 1, "strong": 3 },
  "history": "A popular story says the name came from American soldiers in Italy during World War II who diluted espresso to resemble the coffee at home. It's a widely told account, but the origin is not firmly documented and is disputed.",
  "contains_alcohol": false,
  "relatedSlugs": ["espresso", "cold-brew", "flat-white"],
  "seo": {
    "title": "How to Make an Americano: Espresso + Hot Water",
    "description": "Make a smooth, clean Americano with a double shot of espresso and 6 oz of hot water. Includes no-machine methods using a moka pot or AeroPress."
  }
}
```

---

## 3. Cappuccino

```json
{
  "slug": "cappuccino",
  "name": "Cappuccino",
  "tags": ["ESPRESSO", "MILK", "FOAM"],
  "tagline": "AIRY • BALANCED • ITALIAN",
  "intro": "A cappuccino is a classic balance of espresso, steamed milk and a thick, airy cap of foam. It's light and cloud-like on top, with a noticeably coffee-forward flavor underneath. It's a smaller drink than a latte, so the espresso really shines.",
  "difficulty": "Medium",
  "prepTimeMinutes": 8,
  "servings": 1,
  "serveTemp": "Hot",
  "vessel": { "name": "Cappuccino cup (ceramic, pre-warmed)", "sizeOz": 6, "note": "The coaster recipe totals about 6 oz, so a 6 oz cup is a snug fit." },
  "ingredients": [
    { "amount": "2 oz", "item": "espresso", "note": "From roughly 18 g of finely ground coffee." },
    { "amount": "2 oz", "item": "steamed milk", "note": "Whole milk froths easiest and gives the richest foam." },
    { "amount": "2 oz", "item": "milk foam", "note": "Thick and airy, more spoonable than silky." }
  ],
  "equipment": [
    { "item": "Espresso machine with steam wand", "alternative": "Moka pot plus a handheld frother or French press (see home methods)" },
    { "item": "Milk pitcher" },
    { "item": "Thermometer (optional)", "alternative": "Heat the milk until the pitcher is hot but comfortable to hold briefly" }
  ],
  "dialIn": { "doseGrams": 18, "yieldGrams": 38, "grind": "Fine (espresso)", "waterTempF": 200, "timeSeconds": "25-30", "milkTempF": 140 },
  "steps": [
    { "title": "Warm the cup", "body": "Fill the cup with hot water and set it aside while you work. A warm cup keeps your drink hot, which matters in a small drink with a lot of foam." },
    { "title": "Pull the espresso", "body": "Pull a double shot into the cup, using about 18 g of finely ground coffee. A cappuccino has less milk than a latte, so you want a well-extracted shot that holds its own.", "tip": "Start frothing right as the shot finishes so the espresso doesn't sit." },
    { "title": "Start with cold milk", "body": "Pour cold milk into a cold pitcher, filling it about one-third full. Cold milk gives you more time to build foam before it gets too hot.", "tip": "Start with milk straight from the fridge." },
    { "title": "Stretch the milk", "body": "Place the steam wand tip just below the surface and open the steam. Let in a little air for a few seconds until the milk expands noticeably and sounds like gentle paper tearing. A cappuccino wants more air than a latte, giving a thicker foam.", "tip": "Stop adding air when the pitcher feels slightly warm." },
    { "title": "Texture and heat", "body": "Sink the wand deeper so the milk spins into a smooth whirlpool, which blends the foam and milk together. Heat to roughly 140°F, about when the pitcher gets too hot to hold comfortably for long. Beyond this, milk starts to taste flat and cooked.", "tip": "Tap the pitcher on the counter and swirl to break up big bubbles." },
    { "title": "Pour and spoon", "body": "Pour the steamed milk into the espresso, holding back the foam with a spoon at first, then finish by spooning the foam on top. Aim for roughly equal thirds: espresso, milk, foam." }
  ],
  "homeMethods": [
    { "method": "Moka pot + handheld frother", "note": "Brew a moka pot and froth warm milk with a handheld frother. It tastes bold and creamy, though the coffee lacks the crema and intensity of true espresso, and the foam is usually a bit looser." },
    { "method": "AeroPress + jar frothing", "note": "Press a concentrated shot, then warm milk and shake it hard in a sealed jar or froth it by hand. Foam holds well but is less fine than steam-wand foam." },
    { "method": "French press milk frothing", "note": "Pump warm milk in a French press plunger several times to create foam. This is a good no-machine foam, but the coffee itself will be a strong brew rather than espresso." }
  ],
  "tips": [
    "Whole milk is easiest for beginners. Plant milks vary a lot, so look for barista versions.",
    "A cappuccino should feel light for its size. If it feels heavy, you may have too much milk.",
    "Proportions vary by café, and some serve larger or wetter cappuccinos."
  ],
  "commonMistakes": [
    "Letting the milk get too hot, which kills sweetness.",
    "Adding too little air, which gives you a latte instead of a cappuccino.",
    "Big, bubbly foam from not swirling and tapping.",
    "Using a cup that's too large so the proportions are off."
  ],
  "variations": [
    { "name": "Dry cappuccino", "description": "More foam, less steamed milk. The definition varies by café." },
    { "name": "Wet cappuccino", "description": "More steamed milk, less foam. Closer to a small latte." },
    { "name": "Cocoa dusting", "description": "A light sprinkle of cocoa powder on top for a classic touch." }
  ],
  "flavorProfile": { "bitter": 3, "sweet": 2, "creamy": 3, "strong": 4 },
  "history": "The name is commonly linked to the color of the robes worn by Capuchin friars, though the exact origin of the drink is not firmly settled. Cappuccino as we know it with espresso became widespread in Italy and beyond in the 20th century.",
  "contains_alcohol": false,
  "relatedSlugs": ["latte", "flat-white", "espresso", "espresso-macchiato"],
  "seo": {
    "title": "How to Make a Cappuccino at Home: Espresso, Milk and Foam",
    "description": "Make a classic cappuccino with 2 oz espresso, 2 oz steamed milk and 2 oz foam. Includes frothing tips and no-espresso-machine options."
  }
}
```

---

## 4. Latte

```json
{
  "slug": "latte",
  "name": "Latte",
  "tags": ["ESPRESSO", "MILK", "COMFORT"],
  "tagline": "CREAMY • GENTLE • COZY",
  "intro": "A latte is a gentle, creamy drink of espresso mellowed by plenty of steamed milk and finished with a thin layer of foam. It's soft, slightly sweet from the milk, and easy to love. It's the cozy go-to for anyone who wants coffee without the sharp edge.",
  "difficulty": "Medium",
  "prepTimeMinutes": 8,
  "servings": 1,
  "serveTemp": "Hot",
  "vessel": { "name": "Latte glass or large mug", "sizeOz": 12, "note": "The coaster recipe totals about 10 oz plus foam, so a 12 oz vessel gives breathing room." },
  "ingredients": [
    { "amount": "2 oz", "item": "espresso", "note": "From roughly 18 g of finely ground coffee." },
    { "amount": "8 oz", "item": "steamed milk", "note": "Whole milk gives the creamiest result." },
    { "amount": "1 thin layer", "item": "milk foam", "note": "Roughly a quarter inch (about 0.5 cm) on top." }
  ],
  "equipment": [
    { "item": "Espresso machine with steam wand", "alternative": "Moka pot plus a handheld frother (see home methods)" },
    { "item": "Milk pitcher" },
    { "item": "Thermometer (optional)", "alternative": "Heat until the pitcher is hot to hold for only a few seconds" }
  ],
  "dialIn": { "doseGrams": 18, "yieldGrams": 38, "grind": "Fine (espresso)", "waterTempF": 200, "timeSeconds": "25-30", "milkTempF": 140 },
  "steps": [
    { "title": "Warm the glass", "body": "Rinse your glass or mug with hot water. A latte is a bigger drink, and a cold vessel cools it down quickly." },
    { "title": "Pull the espresso", "body": "Pull a double shot of espresso into your vessel. The milk will soften it, so a well-balanced shot, not a sour one, is the goal.", "tip": "If lattes taste thin or milky, try a slightly finer grind for a stronger shot." },
    { "title": "Pour cold milk", "body": "Fill a cold pitcher with about 8 oz of cold milk, plus a little extra to account for what clings to the pitcher. Cold milk gives you time to texture it before it overheats." },
    { "title": "Add a little air", "body": "With the steam wand just under the surface, add air for only a couple of seconds. A latte wants a thin, smooth layer of foam, much less than a cappuccino.", "tip": "You should hear a soft hiss, not loud slurping." },
    { "title": "Swirl and heat", "body": "Lower the wand so the milk spins in a whirlpool until it reaches about 140°F. Spinning folds the air into the milk, making it glossy like wet paint, and temperature control keeps the milk sweet.", "tip": "Swirl the pitcher and tap it to pop surface bubbles before pouring." },
    { "title": "Pour and finish", "body": "Pour the milk into the espresso in a steady stream, finishing with a thin layer of foam on top. If you like latte art, bring the pitcher close and pour with a gentle wiggle." }
  ],
  "homeMethods": [
    { "method": "Moka pot + warm milk", "note": "Brew a moka pot and add warmed milk. It's cozy and rich, but the coffee is less concentrated than real espresso and has no crema." },
    { "method": "AeroPress + frothed milk", "note": "Make a strong AeroPress shot and top with warm milk and handheld-frothed foam. It's a convincing homemade latte, though the texture is looser than steam-wand milk." },
    { "method": "Strong brewed coffee + frothed milk", "note": "Strongly brewed coffee with warm frothed milk is closer to a café au lait than a latte. It's still tasty and comforting, but it won't have the espresso intensity." }
  ],
  "tips": [
    "Milk should never boil, as overheated milk tastes flat and scalded.",
    "Fresh, cold milk froths best.",
    "Café sizes and espresso amounts vary, so this coaster recipe is a home-sized guideline."
  ],
  "commonMistakes": [
    "Adding too much air and making a foam-heavy drink.",
    "Overheating the milk.",
    "Pouring too fast and breaking up the foam.",
    "Using a weak shot that disappears under the milk."
  ],
  "variations": [
    { "name": "Flavored latte", "description": "Add a pump or teaspoon of vanilla, caramel or other syrup to the cup before the espresso." },
    { "name": "Oat or almond latte", "description": "Barista-style plant milks steam best, though results vary by brand." },
    { "name": "Iced latte", "description": "See the Iced Latte page for the cold version." }
  ],
  "flavorProfile": { "bitter": 2, "sweet": 3, "creamy": 5, "strong": 2 },
  "history": "In Italy, caffè latte simply means coffee with milk and has long been a home breakfast drink, and asking for a 'latte' alone there will get you plain milk. The popular café-style latte with espresso grew in popularity in the US and elsewhere in the late 20th century.",
  "contains_alcohol": false,
  "relatedSlugs": ["cappuccino", "flat-white", "iced-latte", "mocha"],
  "seo": {
    "title": "How to Make a Latte at Home: Creamy Espresso and Steamed Milk",
    "description": "Make a cozy latte with 2 oz espresso, 8 oz steamed milk and a thin layer of foam, with tips for milk texture and no-machine alternatives."
  }
}
```

---

## 5. Flat White

```json
{
  "slug": "flat-white",
  "name": "Flat White",
  "tags": ["ESPRESSO", "MILK", "MICROFOAM"],
  "tagline": "SILKY • STRONG • REFINED",
  "intro": "A flat white is a small, velvety drink where a double espresso meets glossy, finely textured milk. The coffee flavor stays front and center, with a smooth, sweet creaminess that feels rich without being heavy. It's for people who want a latte's comfort with a cappuccino's coffee punch.",
  "difficulty": "Advanced",
  "prepTimeMinutes": 8,
  "servings": 1,
  "serveTemp": "Hot",
  "vessel": { "name": "Small ceramic cup", "sizeOz": 6, "note": "The coaster recipe totals 6 oz, so a 6 oz cup keeps the ratio right." },
  "ingredients": [
    { "amount": "2 oz", "item": "double espresso", "note": "From roughly 18 g of finely ground coffee." },
    { "amount": "4 oz", "item": "steamed milk", "note": "Whole milk, textured into silky microfoam with very little visible foam." }
  ],
  "equipment": [
    { "item": "Espresso machine with steam wand", "alternative": "Moka pot or AeroPress plus a handheld frother (see home methods)" },
    { "item": "Small milk pitcher" },
    { "item": "Thermometer (optional)", "alternative": "Stop when the pitcher is hot to hold for just a couple of seconds" }
  ],
  "dialIn": { "doseGrams": 18, "yieldGrams": 38, "grind": "Fine (espresso)", "waterTempF": 200, "timeSeconds": "25-30", "milkTempF": 135 },
  "steps": [
    { "title": "Warm the cup", "body": "Preheat your small cup with hot water. With only 6 oz of liquid, a cold cup takes a surprising amount of heat out of the drink." },
    { "title": "Pull a strong double", "body": "Pull a double shot into the cup. Because there is little milk, the espresso must taste good on its own. Sour or harsh shots stand out in a flat white.", "tip": "If it tastes thin, try a slightly finer grind." },
    { "title": "Measure the milk", "body": "Pour about 4 oz of cold milk plus a splash extra into a small, cold pitcher. A small pitcher lets you control a small amount of milk." },
    { "title": "Barely stretch", "body": "Keep the wand tip just below the surface and add air for only a second or two. You want to gently expand the milk, not make visible foam. Less air is what gives a flat white its smooth, flat surface.", "tip": "The milk should sound like a quiet hiss, not a loud slurp." },
    { "title": "Texture to silk", "body": "Sink the wand and create a whirlpool, heating to about 130 to 140°F. The spin breaks air into tiny bubbles, making microfoam that looks like wet paint. Stop heating before it gets too hot to hold.", "tip": "If you see big bubbles, tap the pitcher firmly and swirl until glossy." },
    { "title": "Pour with care", "body": "Pour in a steady, low stream so the espresso and milk integrate, finishing with a thin, even layer on top. Aim for a smooth surface with little to no dome." }
  ],
  "homeMethods": [
    { "method": "Moka pot + handheld frother", "note": "Brew a moka pot and froth a small amount of warm milk gently. It's a bold and creamy approximation, though the texture is less silky than steam-wand microfoam." },
    { "method": "AeroPress + whisked milk", "note": "Press a concentrated shot and whisk or froth warm milk lightly. Pour while swirling. The result is creamy but less glossy than a café version." },
    { "method": "Strong brewed coffee + warm milk", "note": "Strong coffee and gently frothed milk makes a mellow drink in the right spirit, but it will be milder and not the same as a true flat white." }
  ],
  "tips": [
    "Smaller amounts of milk heat very fast, so watch temperature closely.",
    "Whole milk gives the silkiest texture.",
    "Flat white size and espresso amount vary by café and country."
  ],
  "commonMistakes": [
    "Adding too much air, which makes it a latte or cappuccino.",
    "Overheating small amounts of milk.",
    "Using a large cup that waters down the ratio.",
    "Skipping the swirl and tap, leaving bubbles in the milk."
  ],
  "variations": [
    { "name": "Ristretto flat white", "description": "Uses ristretto shots for a sweeter, more intense taste. Common in some cafés." },
    { "name": "Oat milk flat white", "description": "Barista oat milk can create a good microfoam, though results vary by brand." },
    { "name": "Iced flat white", "description": "Pour a double shot over ice and top with cold milk for a stronger iced option." }
  ],
  "flavorProfile": { "bitter": 3, "sweet": 3, "creamy": 4, "strong": 4 },
  "history": "The flat white is generally credited to Australia or New Zealand in the 1980s. Which came first is disputed, and both countries claim it.",
  "contains_alcohol": false,
  "relatedSlugs": ["latte", "cappuccino", "espresso", "americano"],
  "seo": {
    "title": "How to Make a Flat White: Silky Microfoam and Double Espresso",
    "description": "Learn to make a flat white with 2 oz double espresso and 4 oz steamed milk, plus microfoam tips and no-machine alternatives."
  }
}
```

---

## 6. Mocha

```json
{
  "slug": "mocha",
  "name": "Mocha",
  "tags": ["ESPRESSO", "CHOCOLATE", "MILK"],
  "tagline": "DECADENT • WARM • SWEET",
  "intro": "A mocha is a latte with chocolate stirred in, topped with a cloud of whipped cream. It tastes like a warm hug: sweet and chocolatey up front, with a coffee backbone underneath. It's a treat that works as dessert or a cozy afternoon pick-me-up.",
  "difficulty": "Easy",
  "prepTimeMinutes": 8,
  "servings": 1,
  "serveTemp": "Hot",
  "vessel": { "name": "Large mug or latte glass", "sizeOz": 12, "note": "The coaster recipe totals about 9 oz plus whipped cream, so a 12 oz mug has room." },
  "ingredients": [
    { "amount": "2 oz", "item": "espresso", "note": "From roughly 18 g of finely ground coffee." },
    { "amount": "1 oz", "item": "chocolate syrup", "note": "Any good chocolate syrup works. Sweetness varies by brand." },
    { "amount": "6 oz", "item": "steamed milk", "note": "Whole milk gives the creamiest result." },
    { "amount": "1 swirl", "item": "whipped cream", "note": "Lightly sweetened, from a can or whipped fresh." }
  ],
  "equipment": [
    { "item": "Espresso machine with steam wand", "alternative": "Moka pot or AeroPress plus saucepan or microwave for milk" },
    { "item": "Milk pitcher or saucepan" },
    { "item": "Spoon or small whisk" }
  ],
  "dialIn": { "doseGrams": 18, "yieldGrams": 38, "grind": "Fine (espresso)", "waterTempF": 200, "timeSeconds": "25-30", "milkTempF": 150 },
  "steps": [
    { "title": "Add the chocolate", "body": "Pour 1 oz of chocolate syrup into the bottom of your mug. Adding it first lets the hot espresso melt and mix it in easily.", "tip": "Warm the mug first so the syrup loosens up." },
    { "title": "Pull the espresso", "body": "Pull a double shot of espresso directly onto the chocolate. The heat of the shot helps the syrup dissolve, so stir right away until it's smooth.", "tip": "Stirring well prevents a layer of syrup stuck at the bottom." },
    { "title": "Steam the milk", "body": "Steam 6 oz of milk to about 140 to 150°F with a small amount of foam. Slightly warmer than a latte works because chocolate drinks hold their sweetness, but don't scald the milk.", "tip": "No steam wand? Heat milk gently on the stove and whisk until slightly foamy." },
    { "title": "Combine", "body": "Pour the steamed milk into the chocolate espresso, holding back foam with a spoon at first and then adding it on top. Give it a gentle stir to blend everything." },
    { "title": "Top with whipped cream", "body": "Add a generous swirl of whipped cream. Fresh or canned both work, and lightly sweetened is best so it doesn't become overly sugary." },
    { "title": "Garnish (optional)", "body": "Finish with a drizzle of chocolate syrup or a dusting of cocoa. The aroma is part of the treat." }
  ],
  "homeMethods": [
    { "method": "Moka pot", "note": "Brew a moka pot and mix with chocolate syrup and warm milk. Chocolate softens the coffee's rougher edges, so a moka pot works well here, though it's less concentrated than espresso." },
    { "method": "AeroPress", "note": "A strong AeroPress shot stirred into chocolate and warm milk makes a very good home mocha. No crema, but chocolate hides that." },
    { "method": "Strong brewed coffee", "note": "Double-strength coffee with chocolate syrup and hot milk is a cozy mocha-style drink. It tastes milder and less coffee-forward than the real thing." }
  ],
  "tips": [
    "Taste your syrup. Some are very sweet, so you may want to adjust.",
    "Dissolve chocolate in the espresso, not the milk, so there are no lumps.",
    "Mocha recipes vary by café, some using melted chocolate, cocoa powder or sauce."
  ],
  "commonMistakes": [
    "Not stirring, leaving syrup at the bottom.",
    "Scorching the milk.",
    "Using a weak coffee that disappears behind the chocolate.",
    "Adding too much chocolate and losing the espresso."
  ],
  "variations": [
    { "name": "White chocolate mocha", "description": "Swap in white chocolate sauce for a sweeter, creamier drink." },
    { "name": "Mint mocha", "description": "Add a few drops of peppermint syrup for a seasonal twist." },
    { "name": "Iced mocha", "description": "Mix espresso and chocolate, add cold milk and ice." }
  ],
  "flavorProfile": { "bitter": 2, "sweet": 5, "creamy": 4, "strong": 2 },
  "history": "The name comes from the Yemeni port of Mocha, historically important in the coffee trade. How the name came to describe chocolate-and-coffee drinks is not precisely documented.",
  "contains_alcohol": false,
  "relatedSlugs": ["latte", "cappuccino", "iced-latte", "affogato"],
  "seo": {
    "title": "How to Make a Mocha: Espresso, Chocolate and Steamed Milk",
    "description": "Make a cozy mocha with 2 oz espresso, 1 oz chocolate syrup, 6 oz steamed milk and whipped cream, plus easy no-machine methods."
  }
}
```

---

## 7. Espresso Macchiato

```json
{
  "slug": "espresso-macchiato",
  "name": "Espresso Macchiato",
  "tags": ["ESPRESSO", "FOAM", "SPOT"],
  "tagline": "SMALL • MIGHTY • MARKED",
  "intro": "An espresso macchiato is a shot of espresso 'marked' with just a spoonful of foamed milk. It stays bold and intense, with the foam softening the edge slightly and adding a touch of sweetness. It's perfect when you want milk's mellowness without losing the espresso.",
  "difficulty": "Medium",
  "prepTimeMinutes": 6,
  "servings": 1,
  "serveTemp": "Hot",
  "vessel": { "name": "Espresso cup (demitasse), pre-warmed", "sizeOz": 3, "note": "A small cup keeps the proportions right." },
  "ingredients": [
    { "amount": "2 oz", "item": "double shot espresso", "note": "From roughly 18 g of finely ground coffee." },
    { "amount": "1 tbsp", "item": "foamed milk", "note": "Thick, spoonable foam from a small amount of milk." }
  ],
  "equipment": [
    { "item": "Espresso machine with steam wand", "alternative": "Moka pot or AeroPress plus a handheld frother (see home methods)" },
    { "item": "Small pitcher or cup" },
    { "item": "Teaspoon" }
  ],
  "dialIn": { "doseGrams": 18, "yieldGrams": 38, "grind": "Fine (espresso)", "waterTempF": 200, "timeSeconds": "25-30", "milkTempF": 140 },
  "steps": [
    { "title": "Warm the cup", "body": "Preheat a small cup with hot water. An espresso macchiato is a small drink, and a warm cup keeps it from cooling too quickly." },
    { "title": "Pull the shot", "body": "Pull a double shot straight into the cup. The crema should look rich and golden, since it's the base for the foam.", "tip": "Pull the shot right before you make the foam so it's fresh." },
    { "title": "Froth a little milk", "body": "Pour a small amount of cold milk, about 2 to 3 oz, into a small pitcher so you can froth properly. The extra milk is easier to steam well, and you'll only use a spoonful of the foam.", "tip": "If you have no steam wand, use a handheld frother in a mug." },
    { "title": "Build thick foam", "body": "Add plenty of air at the start to make stiff, creamy foam, then heat to around 140°F. Thick foam sits on top of the espresso instead of sinking, which gives the drink its 'mark'.", "tip": "Tap and swirl until it looks glossy but holds its shape." },
    { "title": "Spoon on the foam", "body": "Use a teaspoon to scoop about 1 tbsp of foam and dollop it in the center of the espresso. Don't stir, as the contrast between the foam and the shot is part of the experience." },
    { "title": "Sip right away", "body": "Drink it while the foam is warm and the espresso is still hot. A few sips is all it takes." }
  ],
  "homeMethods": [
    { "method": "Moka pot + handheld frother", "note": "Pour a small moka pot brew into a cup and top with foam from a handheld frother. It's bold and a good home version, but the coffee is less concentrated and has no crema." },
    { "method": "AeroPress", "note": "A strong, fine-grind AeroPress shot works well. Add a dollop of foamed milk. The foam holds, but the shot is cleaner and lighter than real espresso." },
    { "method": "Strong brewed coffee", "note": "A small cup of very strong coffee with a spoon of frothed milk captures the spirit but not the intensity. Expect a milder result." }
  ],
  "tips": [
    "Use fresh whole milk for the best, thickest foam.",
    "Don't stir it, so you can enjoy the layers.",
    "In some countries, 'macchiato' can mean a larger milk-based drink, so definitions vary by café and region."
  ],
  "commonMistakes": [
    "Adding too much milk and turning it into a cortado or small latte.",
    "Making foam that's too thin to sit on top.",
    "Stirring the foam in immediately.",
    "Using a cold cup."
  ],
  "variations": [
    { "name": "Latte macchiato", "description": "The reverse: espresso poured into a tall glass of steamed milk." },
    { "name": "Single-shot macchiato", "description": "Uses one shot of espresso instead of a double." },
    { "name": "Cortado", "description": "Espresso with a roughly equal amount of warm milk. It's milder than a macchiato." }
  ],
  "flavorProfile": { "bitter": 4, "sweet": 2, "creamy": 2, "strong": 5 },
  "history": "'Macchiato' means 'marked' or 'stained' in Italian, referring to the espresso being marked with milk. The exact origin of the drink is unclear.",
  "contains_alcohol": false,
  "relatedSlugs": ["espresso", "cappuccino", "flat-white", "latte"],
  "seo": {
    "title": "How to Make an Espresso Macchiato: Espresso Marked with Foam",
    "description": "Make a classic espresso macchiato with a double shot and 1 tbsp of foamed milk. Includes easy home methods without an espresso machine."
  }
}
```

---

## 8. Iced Latte

```json
{
  "slug": "iced-latte",
  "name": "Iced Latte",
  "tags": ["ESPRESSO", "MILK", "ICE"],
  "tagline": "CHILLED • MELLOW • REFRESHING",
  "intro": "An iced latte is espresso poured over cold milk and ice, giving you a cool, mellow drink that's creamy without being heavy. It's smooth and lightly sweet, with a coffee flavor that stays gentle. It's a go-to for warm days.",
  "difficulty": "Easy",
  "prepTimeMinutes": 5,
  "servings": 1,
  "serveTemp": "Iced",
  "vessel": { "name": "Tall glass", "sizeOz": 12, "note": "Room for 1 cup of ice plus the liquids." },
  "ingredients": [
    { "amount": "2 oz", "item": "espresso", "note": "From roughly 18 g of finely ground coffee." },
    { "amount": "6 oz", "item": "cold milk", "note": "Whole milk gives the creamiest result." },
    { "amount": "1 cup", "item": "ice", "note": "Larger cubes melt more slowly." }
  ],
  "equipment": [
    { "item": "Espresso machine", "alternative": "Moka pot or AeroPress (see home methods)" },
    { "item": "Tall glass" },
    { "item": "Long spoon" }
  ],
  "dialIn": { "doseGrams": 18, "yieldGrams": 38, "grind": "Fine (espresso)", "waterTempF": 200, "timeSeconds": "25-30" },
  "steps": [
    { "title": "Fill the glass", "body": "Add 1 cup of ice to a tall glass. Starting with ice ready means the hot espresso is cooled quickly, which keeps flavors fresh and avoids a bitter, stewed taste." },
    { "title": "Pour in the milk", "body": "Pour 6 oz of cold milk over the ice. Adding the milk before the espresso creates the classic layered look and helps cool things down.", "tip": "Shake or stir the milk briefly if you add sweetener or syrup." },
    { "title": "Pull the espresso", "body": "Pull a double shot of espresso, using about 18 g of finely ground coffee. Iced drinks dilute as the ice melts, so a strong, well-extracted shot is important.", "tip": "If your iced lattes taste weak, try a slightly finer grind." },
    { "title": "Pour over", "body": "Pour the hot espresso over the milk and ice. It will swirl into beautiful ribbons before blending.", "tip": "Pour slowly if you want the layered look." },
    { "title": "Stir and sweeten", "body": "Give it a gentle stir to blend. Taste and add sweetener now if you like, since sugar dissolves best while the shot is still warm." },
    { "title": "Serve right away", "body": "Enjoy while the ice is fresh. Over time the ice melts and the flavor mellows." }
  ],
  "homeMethods": [
    { "method": "Moka pot", "note": "Brew in a moka pot and pour over milk and ice. It tastes bold and slightly rustic, a nice stand-in, though it lacks the crema and smoothness of espresso." },
    { "method": "AeroPress", "note": "A concentrated AeroPress shot over milk and ice is a clean, strong approximation. No crema, but the flavor works well when chilled." },
    { "method": "Strong brewed coffee", "note": "Double-strength brewed coffee, cooled, with milk and ice makes an easy iced coffee. It will taste milder and thinner than a true iced latte. Making coffee ice cubes helps avoid watering it down." }
  ],
  "tips": [
    "Larger ice cubes dilute your drink more slowly.",
    "Coffee ice cubes are a great trick to keep flavor strong.",
    "Dissolve sugar in the warm espresso or use simple syrup, as granulated sugar doesn't dissolve well in cold drinks."
  ],
  "commonMistakes": [
    "Using too little ice so the espresso melts it fast.",
    "Making a weak shot that vanishes in cold milk.",
    "Letting it sit and become watery.",
    "Using small, fast-melting ice."
  ],
  "variations": [
    { "name": "Vanilla iced latte", "description": "Add 1 to 2 tsp of vanilla syrup to the glass before the milk." },
    { "name": "Oat milk iced latte", "description": "Oat milk makes a creamy, slightly sweet iced latte. Results vary by brand." },
    { "name": "Iced mocha", "description": "Stir chocolate syrup into the espresso before pouring over milk and ice." }
  ],
  "flavorProfile": { "bitter": 2, "sweet": 2, "creamy": 4, "strong": 2 },
  "contains_alcohol": false,
  "relatedSlugs": ["latte", "cold-brew", "vietnamese-iced-coffee", "mocha"],
  "seo": {
    "title": "How to Make an Iced Latte at Home: Espresso, Milk and Ice",
    "description": "Make a refreshing iced latte with 2 oz espresso, 6 oz cold milk and 1 cup of ice, plus no-machine methods using a moka pot or AeroPress."
  }
}
```

---

## 9. Cold Brew

```json
{
  "slug": "cold-brew",
  "name": "Cold Brew",
  "tags": ["COFFEE", "WATER", "TIME"],
  "tagline": "STEEPED • SMOOTH • COOL",
  "intro": "Cold brew is coffee steeped slowly in cold water, which pulls out sweetness and keeps the sharp, acidic edge to a minimum. It's smooth, mellow and naturally chocolatey. You make it once and enjoy it for days.",
  "difficulty": "Easy",
  "prepTimeMinutes": 10,
  "totalTimeMinutes": 840,
  "servings": 4,
  "serveTemp": "Cold",
  "vessel": { "name": "Tall glass over ice", "sizeOz": 12, "note": "The batch makes a concentrate. Dilute it to taste when serving." },
  "ingredients": [
    { "amount": "1 cup", "item": "coarse ground coffee", "note": "Coarse, like breadcrumbs or sea salt. By weight this varies with grind and roast, roughly 80 to 100 g." },
    { "amount": "4 cups", "item": "cold water", "note": "Filtered water gives a cleaner taste." },
    { "amount": "to taste", "item": "ice", "note": "For serving." }
  ],
  "equipment": [
    { "item": "Large jar, pitcher or French press (at least 5 cups)", "alternative": "Any clean food-safe container with a lid" },
    { "item": "Fine mesh strainer plus paper coffee filter or cheesecloth", "alternative": "French press plunger for straining" },
    { "item": "Coffee grinder", "alternative": "Pre-ground coffee labeled coarse or for French press" }
  ],
  "dialIn": { "grind": "Coarse", "waterTempF": 70, "timeSeconds": "43200-64800 (12 to 18 hours)" },
  "steps": [
    { "title": "Grind coarse", "body": "Grind your coffee coarse, like breadcrumbs. Cold water extracts slowly, so a coarse grind prevents over-extraction and makes it easier to filter later.", "tip": "Fine grounds make cold brew muddy and bitter." },
    { "title": "Combine", "body": "Add 1 cup of grounds to your container, then pour in 4 cups of cold or room-temperature water. Stir gently so all the grounds are wet.", "tip": "Press down any dry clumps floating on the surface." },
    { "title": "Steep", "body": "Cover and steep for 12 to 18 hours. Shorter steeping is lighter and brighter, while longer steeping is stronger and deeper. Room temperature works and is a bit faster, while the fridge is slower and gentler.", "tip": "If you're not sure, start with 14 to 16 hours in the fridge and adjust next time." },
    { "title": "Strain", "body": "Strain through a fine mesh strainer, then a second time through a paper filter or cheesecloth for a clean, sediment-free brew. Be patient, as paper filters drip slowly.", "tip": "Don't squeeze the grounds, as it can push out bitter flavors and sediment." },
    { "title": "Store", "body": "Pour into a clean, sealed container and keep refrigerated. For best flavor, enjoy within about a week." },
    { "title": "Serve over ice", "body": "Fill a glass with ice, pour in the cold brew, and taste. This batch is fairly strong, so dilute with water or milk to your liking, often around equal parts.", "tip": "Start with 1:1 and adjust. Strength varies a lot with beans and steep time." }
  ],
  "homeMethods": [
    { "method": "French press", "note": "Steep in a French press and plunge to strain. It's easy and needs no extra gear, though the result has a bit more sediment than paper-filtered brew." },
    { "method": "Mason jar + strainer", "note": "A jar with a fine strainer and coffee filter works great and is the most common home setup. The result is clean and smooth." },
    { "method": "Hot-brewed coffee, chilled (iced coffee)", "note": "This is not cold brew. Brew strong coffee, then chill and pour over ice. It tastes brighter and more acidic, and it's ready much faster, but lacks cold brew's smoothness." }
  ],
  "tips": [
    "This is a concentrate, so dilute to taste.",
    "Use filtered water for a cleaner flavor.",
    "Medium and dark roasts give classic chocolate and nutty flavors, and light roasts can taste fruity but sometimes thin.",
    "Steeping time and strength vary by beans and taste, so adjust."
  ],
  "commonMistakes": [
    "Grinding too fine, which causes muddiness and bitterness.",
    "Steeping too long and ending up with woody flavors.",
    "Skipping the second filtration and getting gritty coffee.",
    "Keeping it too long. Freshness fades after about a week."
  ],
  "variations": [
    { "name": "Cold brew with milk", "description": "Dilute with cold milk and a splash of syrup for a creamy iced coffee." },
    { "name": "Nitro-style", "description": "Cafés use nitrogen for a creamy, foamy texture. It's hard to replicate at home without special equipment." },
    { "name": "Vanilla cold brew", "description": "Add a splash of vanilla syrup when serving." }
  ],
  "flavorProfile": { "bitter": 2, "sweet": 3, "creamy": 1, "strong": 4 },
  "history": "Cold-water coffee brewing has appeared in various forms around the world, including Japanese slow-drip methods, but the exact origins are unclear and disputed.",
  "contains_alcohol": false,
  "relatedSlugs": ["iced-latte", "americano", "vietnamese-iced-coffee"],
  "seo": {
    "title": "How to Make Cold Brew Coffee at Home: Smooth and Easy",
    "description": "Make smooth cold brew with 1 cup coarse coffee and 4 cups cold water. Step-by-step guide with steeping times, straining tips and storage."
  }
}
```

---

## 10. Affogato

```json
{
  "slug": "affogato",
  "name": "Affogato",
  "tags": ["ESPRESSO", "VANILLA", "DESSERT"],
  "tagline": "HOT • COLD • INDULGENT",
  "intro": "An affogato is a scoop of vanilla ice cream 'drowned' in a shot of hot espresso. The contrast is the magic: hot, bitter coffee melting into cold, sweet cream. It's a dessert and a coffee in one, and it takes about two minutes.",
  "difficulty": "Easy",
  "prepTimeMinutes": 4,
  "servings": 1,
  "serveTemp": "Hot",
  "vessel": { "name": "Small glass or dessert bowl", "sizeOz": 6, "note": "A pre-chilled glass keeps the ice cream firmer for longer." },
  "ingredients": [
    { "amount": "1 scoop", "item": "vanilla ice cream", "note": "A good-quality, slightly firm vanilla works best." },
    { "amount": "2 oz", "item": "hot espresso", "note": "Freshly pulled, from roughly 18 g of finely ground coffee." }
  ],
  "equipment": [
    { "item": "Espresso machine", "alternative": "Moka pot or AeroPress (see home methods)" },
    { "item": "Ice cream scoop" },
    { "item": "Small glass or bowl" }
  ],
  "dialIn": { "doseGrams": 18, "yieldGrams": 38, "grind": "Fine (espresso)", "waterTempF": 200, "timeSeconds": "25-30" },
  "steps": [
    { "title": "Chill the glass", "body": "Put your glass or bowl in the freezer for 10 to 15 minutes beforehand if you can. A cold vessel slows the melting so the ice cream stays scoopable longer.", "tip": "No time? Even a few minutes helps." },
    { "title": "Scoop the ice cream", "body": "Add a round scoop of vanilla ice cream. Let it soften for a minute if rock-hard, since a slightly softer scoop is easier to shape and will melt more beautifully." },
    { "title": "Pull the espresso", "body": "Pull a fresh, hot double shot of about 2 oz. Hot espresso is what creates the signature contrast, so make it just before serving.", "tip": "A strong, slightly sweet shot balances the ice cream best." },
    { "title": "Pour over", "body": "Pour the hot espresso right over the ice cream. It will melt into a creamy swirl around the scoop.", "tip": "Serve at the table and pour in front of your guest for a little drama." },
    { "title": "Serve and enjoy", "body": "Eat immediately with a spoon, since it melts fast. Each bite should have both hot coffee and cold cream." }
  ],
  "homeMethods": [
    { "method": "Moka pot", "note": "Brew a small moka pot and pour a couple of ounces over ice cream. It's rich and bold, and works well since the ice cream softens the intensity. It won't have crema." },
    { "method": "AeroPress", "note": "A concentrated AeroPress shot is a clean, strong stand-in for espresso. It's a great match for ice cream." },
    { "method": "Very strong brewed coffee", "note": "Use hot, double-strength coffee. It works, but it's thinner and more diluted than espresso, so the ice cream will melt faster and taste milder." }
  ],
  "tips": [
    "Use real vanilla ice cream, since a good one makes a big difference.",
    "Serve immediately, as it's best at the moment of pouring.",
    "Consider a drizzle of chocolate or a sprinkle of crushed cookies on top."
  ],
  "commonMistakes": [
    "Letting the espresso sit and cool before pouring.",
    "Using very soft ice cream that dissolves instantly.",
    "Using weak coffee that disappears in the cream.",
    "Taking too long to serve."
  ],
  "variations": [
    { "name": "Boozy affogato", "description": "Add a splash of amaretto or coffee liqueur. If you do, note that this adds alcohol, so the standard coaster recipe is alcohol-free." },
    { "name": "Chocolate affogato", "description": "Use chocolate or coffee ice cream for a richer dessert." },
    { "name": "Gelato affogato", "description": "Vanilla gelato (fior di latte) gives a denser, silkier texture." }
  ],
  "flavorProfile": { "bitter": 3, "sweet": 4, "creamy": 4, "strong": 3 },
  "history": "'Affogato' means 'drowned' in Italian. It's a classic Italian dessert, though its precise origin is not well documented.",
  "contains_alcohol": false,
  "relatedSlugs": ["espresso", "mocha", "espresso-macchiato"],
  "seo": {
    "title": "How to Make an Affogato: Vanilla Ice Cream and Hot Espresso",
    "description": "Make a classic affogato with 1 scoop of vanilla ice cream and 2 oz of hot espresso. Includes tips and no-machine alternatives."
  }
}
```

---

## 11. Irish Coffee

> Contains alcohol (`contains_alcohol: true`). Consider an age-gate or notice wherever this page is shown.

```json
{
  "slug": "irish-coffee",
  "name": "Irish Coffee",
  "tags": ["WHISKEY", "COFFEE", "CREAM"],
  "tagline": "WARMING • LUSH • TRADITIONAL",
  "intro": "Irish coffee is hot coffee spiked with Irish whiskey and a little brown sugar, crowned with a layer of lightly whipped cream. You drink the hot coffee through the cool cream, which is half the fun. It's warming, rich and a little bit festive.",
  "difficulty": "Medium",
  "prepTimeMinutes": 8,
  "servings": 1,
  "serveTemp": "Hot",
  "vessel": { "name": "Stemmed Irish coffee glass or heatproof mug", "sizeOz": 8, "note": "Warm the glass first so it doesn't crack or cool the drink." },
  "ingredients": [
    { "amount": "1½ oz", "item": "Irish whiskey", "note": "Contains alcohol. Please enjoy responsibly." },
    { "amount": "1 tsp", "item": "brown sugar", "note": "Dissolves best in hot coffee." },
    { "amount": "4 oz", "item": "hot coffee", "note": "Fresh, strong brewed coffee." },
    { "amount": "to top", "item": "lightly whipped cream", "note": "Whipped just until it thickens but still pours, so it floats." }
  ],
  "equipment": [
    { "item": "Heatproof glass or mug" },
    { "item": "Coffee maker or any brewing method", "alternative": "French press, pour-over or moka pot" },
    { "item": "Whisk or jar", "alternative": "Handheld frother or shake in a sealed jar" },
    { "item": "Spoon" }
  ],
  "dialIn": { "waterTempF": 200 },
  "steps": [
    { "title": "Warm the glass", "body": "Fill the glass with hot water for a minute, then empty it. A warm glass keeps the drink hot longer and helps prevent thermal shock.", "tip": "Use a heatproof glass designed for hot drinks." },
    { "title": "Whip the cream", "body": "Whisk cold cream just until it thickens slightly but is still pourable, like softly flowing lotion. Lightly whipped cream floats on the coffee, while stiff cream sinks or clumps.", "tip": "Shaking cream in a sealed jar for 30 to 60 seconds also works. Check often." },
    { "title": "Brew strong coffee", "body": "Brew about 4 oz of hot, strong coffee. It needs to hold its own against the whiskey and cream, so use a bold roast and fresh grounds." },
    { "title": "Dissolve the sugar", "body": "Add 1 tsp of brown sugar to the glass, pour in the hot coffee, and stir until completely dissolved. Brown sugar adds a hint of molasses that pairs well with whiskey.", "tip": "Undissolved sugar sinks to the bottom, so stir well." },
    { "title": "Add the whiskey", "body": "Stir in 1½ oz of Irish whiskey. Adding it to the hot coffee blends the flavors, though some alcohol will soften with heat." },
    { "title": "Float the cream", "body": "Hold the back of a spoon just above the surface and pour the cream gently over it so it floats in a layer. Don't stir. Sip the coffee through the cream.", "tip": "Pour slowly and keep the spoon low for a clean layer." }
  ],
  "homeMethods": [
    { "method": "Drip or pour-over coffee", "note": "This is the standard home method. A strong, fresh brew is all you need. Irish coffee is traditionally made with regular brewed coffee, not espresso." },
    { "method": "French press", "note": "Gives a rich, full-bodied cup that holds up well to whiskey and cream. Brew it a little stronger than usual." },
    { "method": "Moka pot + hot water", "note": "A moka pot brew diluted to about 4 oz works. It's bolder and a bit more intense than drip coffee." }
  ],
  "tips": [
    "Fresh, hot coffee matters. Cold or stale coffee makes a flat drink.",
    "Chill the cream and bowl for easier whipping.",
    "Whiskey brands vary in sweetness and flavor, so choose one you enjoy.",
    "Recipes vary by bar and region, and some use different sweeteners."
  ],
  "commonMistakes": [
    "Over-whipping the cream so it won't float.",
    "Stirring after adding the cream.",
    "Using weak coffee that disappears behind the whiskey.",
    "Skipping the glass warm-up and serving a lukewarm drink."
  ],
  "variations": [
    { "name": "Baileys coffee", "description": "Uses Irish cream liqueur, giving a sweeter, creamier drink. It's a different drink from traditional Irish coffee." },
    { "name": "Decaf Irish coffee", "description": "Use decaf for an evening version." },
    { "name": "Alcohol-free version", "description": "Skip the whiskey and add a drop of vanilla or a splash of non-alcoholic whiskey alternative." }
  ],
  "flavorProfile": { "bitter": 3, "sweet": 3, "creamy": 4, "strong": 3 },
  "history": "Irish coffee is commonly credited to Joe Sheridan, a chef at Foynes airport in Ireland, in the 1940s. It was later popularized in the US, notably at a San Francisco bar in the 1950s. Details of the story vary between tellings.",
  "contains_alcohol": true,
  "relatedSlugs": ["americano", "affogato", "mocha"],
  "seo": {
    "title": "How to Make Irish Coffee: Whiskey, Coffee and Cream",
    "description": "Make a classic Irish coffee with 1½ oz Irish whiskey, brown sugar, hot coffee and lightly whipped cream. Step-by-step guide with tips for floating the cream."
  }
}
```

---

## 12. Vietnamese Iced Coffee

```json
{
  "slug": "vietnamese-iced-coffee",
  "name": "Vietnamese Iced Coffee",
  "tags": ["COFFEE", "SWEET", "ICED"],
  "tagline": "BOLD • SWEET • VIETNAMESE",
  "intro": "Vietnamese iced coffee, or cà phê sữa đá, is strong, dark coffee dripped slowly onto sweetened condensed milk and poured over ice. It's bold, syrupy and wonderfully sweet, with a deep roasted flavor. A little goes a long way on a hot day.",
  "difficulty": "Easy",
  "prepTimeMinutes": 10,
  "servings": 1,
  "serveTemp": "Iced",
  "vessel": { "name": "Short glass filled with ice", "sizeOz": 8, "note": "Use a heatproof glass for the hot brew." },
  "ingredients": [
    { "amount": "2 tbsp", "item": "dark ground coffee", "note": "Medium-coarse grind. Dark roasts, often including robusta, are traditional in Vietnam." },
    { "amount": "2 tbsp", "item": "sweetened condensed milk", "note": "Adjust to taste next time, but this is the base recipe." },
    { "amount": "4 oz", "item": "hot water", "note": "Just off the boil, around 195 to 205°F." },
    { "amount": "to fill", "item": "ice", "note": "Added after stirring." }
  ],
  "equipment": [
    { "item": "Phin filter (Vietnamese drip filter)", "alternative": "AeroPress, French press or small pour-over (see home methods)" },
    { "item": "Heatproof glass" },
    { "item": "Spoon" },
    { "item": "Kettle" }
  ],
  "dialIn": { "waterTempF": 200, "grind": "Medium-coarse", "timeSeconds": "240-300" },
  "steps": [
    { "title": "Add the condensed milk", "body": "Spoon 2 tbsp of sweetened condensed milk into the bottom of a heatproof glass. The coffee will drip right onto it and start melting it.", "tip": "Warm the glass slightly to help it blend." },
    { "title": "Set up the phin", "body": "Place the phin on top of the glass, add 2 tbsp of ground coffee, and gently shake level. Press the filter insert on lightly. Too much pressure slows the drip too much.", "tip": "Press just enough to even the surface." },
    { "title": "Bloom", "body": "Pour a splash of hot water over the grounds, just enough to wet them, and wait about 30 seconds. This lets the coffee swell and degas, helping extraction be even." },
    { "title": "Slow drip", "body": "Fill the phin with the remaining hot water, up to a total of 4 oz, and cover it with the lid. Let it drip slowly, about 4 to 5 minutes. The slow drip makes a strong, concentrated brew.", "tip": "If it drips in under 2 minutes, grind finer or press a bit harder. If it barely drips, grind coarser." },
    { "title": "Stir", "body": "Remove the phin and stir the coffee thoroughly with the condensed milk until blended into a caramel-colored syrup. Taste it, as it should be sweet and strong." },
    { "title": "Pour over ice", "body": "Fill a second glass with ice, then pour the coffee over it, or add ice directly if the glass is big enough. Stir and serve.", "tip": "Pour slowly over ice to avoid splashes." }
  ],
  "homeMethods": [
    { "method": "AeroPress", "note": "Use a medium-fine grind, 2 tbsp coffee and about 4 oz of hot water, then press into the condensed milk. It's a great substitute and gives a strong, clean cup, though less syrupy than phin-drip." },
    { "method": "French press", "note": "Steep 2 tbsp of dark coffee with 4 oz of hot water for about 4 minutes, plunge into condensed milk. The result is bold but a bit lighter and less concentrated than phin coffee." },
    { "method": "Moka pot or strong brewed coffee", "note": "A small moka pot brew or double-strength drip coffee poured over condensed milk will give a similar sweet, strong drink. It misses some of the phin's slow-drip intensity." }
  ],
  "tips": [
    "Dark, bold coffee stands up best to the sweet milk.",
    "Condensed milk is very sweet, so taste and adjust the amount in future batches.",
    "Brands and roast styles in Vietnam vary, and some include chicory or other additions."
  ],
  "commonMistakes": [
    "Grinding too fine and getting a drip that stalls.",
    "Skipping the bloom and getting uneven extraction.",
    "Not stirring the condensed milk in fully.",
    "Using a light roast that tastes thin and sour next to the sweetness."
  ],
  "variations": [
    { "name": "Hot cà phê sữa", "description": "Skip the ice and serve it hot, with the coffee dripped onto condensed milk in a small cup." },
    { "name": "Coconut coffee", "description": "Use coconut condensed milk or coconut cream for a tropical twist." },
    { "name": "Egg coffee (cà phê trứng)", "description": "A Vietnamese specialty topped with whipped egg yolk and sweetened milk. It's a separate, more involved drink." }
  ],
  "flavorProfile": { "bitter": 3, "sweet": 5, "creamy": 3, "strong": 4 },
  "history": "Condensed milk is often said to have become common in Vietnamese coffee because fresh milk was hard to get and store, a story widely told but not fully documented. Coffee growing in Vietnam began in the French colonial era in the 1800s.",
  "contains_alcohol": false,
  "relatedSlugs": ["cold-brew", "iced-latte", "americano"],
  "seo": {
    "title": "How to Make Vietnamese Iced Coffee (Cà Phê Sữa Đá)",
    "description": "Make bold, sweet Vietnamese iced coffee with dark coffee, sweetened condensed milk and ice. Includes phin and no-phin methods."
  }
}
```
