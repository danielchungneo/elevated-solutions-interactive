# NFC Cocktail Coaster Recipes

Twelve recipe objects matching the `Cocktail` type from Section 4.3. Each JSON block is one complete file, ready to save as `content/cocktails/<slug>.json`.

## Type reference

```ts
type Cocktail = {
  slug: string;                 // "old-fashioned"
  name: string;                 // "Old Fashioned"
  tags: [string, string, string];
  tagline: string;              // matches the coaster tagline
  intro: string;                // 2 to 3 sentence story/flavor summary
  difficulty: "Easy" | "Medium" | "Advanced";
  prepTimeMinutes: number;
  servings: number;
  glassware: { name: string; note?: string };
  garnish: string[];
  ingredients: {
    amount: string;             // "2 oz"
    item: string;               // "Bourbon or rye"
    note?: string;              // brand/substitute guidance
  }[];
  equipment: string[];
  steps: { title: string; body: string; tip?: string }[];
  tips: string[];               // pro tips, common mistakes
  variations: { name: string; description: string }[];
  substitutions?: string[];
  flavorProfile: { sweet: number; sour: number; bitter: number; strong: number }; // 1 to 5
  history?: string;             // short, accurate origin note
  relatedSlugs: string[];       // links to other cocktails
  seo: { title: string; description: string };
};
```

## Index

| # | Slug | Cocktail |
|---|------|----------|
| 1 | `margarita` | Margarita |
| 2 | `old-fashioned` | Old Fashioned |
| 3 | `espresso-martini` | Espresso Martini |
| 4 | `mojito` | Mojito |
| 5 | `moscow-mule` | Moscow Mule |
| 6 | `whiskey-sour` | Whiskey Sour |
| 7 | `martini` | Martini |
| 8 | `negroni` | Negroni |
| 9 | `aperol-spritz` | Aperol Spritz |
| 10 | `pina-colada` | Piña Colada |
| 11 | `daiquiri` | Daiquiri |
| 12 | `manhattan` | Manhattan |

Review notes: taglines are newly written (the coaster taglines weren't included in the source table), so swap in the engraved ones if they differ. Verify history claims before publishing.

---

## 1. Margarita

```json
{
  "slug": "margarita",
  "name": "Margarita",
  "tags": ["Tequila", "Citrus", "Classic"],
  "tagline": "Bright, tart and salt-kissed.",
  "intro": "The Margarita is tequila, lime and orange liqueur in near-perfect balance. It's sharp, a little sweet, and made for a salted rim. Once you've made one properly, you'll never go back to the bottled mix.",
  "difficulty": "Easy",
  "prepTimeMinutes": 5,
  "servings": 1,
  "glassware": { "name": "Rocks glass", "note": "A coupe or classic margarita glass also works if you serve it without ice." },
  "garnish": ["Coarse salt rim", "Lime wheel"],
  "ingredients": [
    { "amount": "2 oz", "item": "Tequila", "note": "Use 100% agave blanco (silver) for a clean, peppery edge. Reposado adds a soft oak note." },
    { "amount": "1 oz", "item": "Fresh lime juice", "note": "Squeeze it just before mixing. Bottled juice tastes flat." },
    { "amount": "1 oz", "item": "Orange liqueur", "note": "Cointreau is drier and brighter. Triple sec is sweeter and softer." },
    { "amount": "Rim", "item": "Coarse salt", "note": "Kosher or flaky sea salt sticks best and tastes cleaner than table salt." }
  ],
  "equipment": ["Cocktail shaker", "Jigger", "Citrus juicer", "Hawthorne strainer", "Small plate for the rim"],
  "steps": [
    { "title": "Chill the glass", "body": "Fill your glass with ice and water while you prep. A cold glass keeps the drink crisp for longer." },
    { "title": "Rim the glass", "body": "Dump the ice water. Run a lime wedge around the outer edge of the rim only, then roll the outside of the rim in salt on a plate.", "tip": "Salt only the outside so it doesn't fall into the drink and make it too salty." },
    { "title": "Add the spirits and juice", "body": "To a shaker, add the tequila, lime juice and orange liqueur. Measure with a jigger. A Margarita depends on those ratios." },
    { "title": "Shake hard", "body": "Fill the shaker about two-thirds with ice and shake hard for 12 to 15 seconds. This chills the drink, adds the right amount of water, and lightens the texture." },
    { "title": "Strain over fresh ice", "body": "Fill the rimmed glass with fresh ice and strain the drink over it. Fresh ice dilutes slowly. The ice you shook with is already broken down.", "tip": "If you prefer it up, strain into a chilled coupe without ice." },
    { "title": "Garnish and taste", "body": "Add a lime wheel on the rim. Take a sip. If it's too tart or too sweet for you, adjust the next one slightly." }
  ],
  "tips": [
    "Pro tip: Taste your limes. Very tart limes can pull the drink off balance. Small tweaks next round are better than changing the base spec.",
    "Pro tip: Keep the salt on the outside edge so each sip is salty and the drink isn't.",
    "Common mistake: Using bottled sour mix. Fresh lime juice is the single biggest upgrade.",
    "Common mistake: Shaking for only a few seconds. Under-shaken Margaritas are warm and sharp."
  ],
  "variations": [
    { "name": "Tommy's Margarita", "description": "Replace the orange liqueur with agave syrup for a cleaner, more tequila-forward drink." },
    { "name": "Spicy Margarita", "description": "Muddle two or three jalapeño slices in the shaker before adding the other ingredients, or use a chili-salt rim." },
    { "name": "Smoky Margarita", "description": "Swap a portion of the tequila for mezcal for a smoky edge." },
    { "name": "Frozen Margarita", "description": "Blend the ingredients with about a cup of ice until slushy and pour into a chilled glass." }
  ],
  "substitutions": [
    "Orange liqueur: Cointreau, triple sec, Grand Marnier (richer, with a cognac base) or Curaçao.",
    "Tequila: Reposado for a rounder, oakier flavor. Avoid mixto tequilas if you can.",
    "No coarse salt: Use fine sea salt sparingly, or try a chili-lime salt blend."
  ],
  "flavorProfile": { "sweet": 2, "sour": 4, "bitter": 1, "strong": 3 },
  "history": "The Margarita's origin is disputed, with several bartenders and socialites claiming credit from the 1930s to the 1940s. It's closely related to the Daisy, a classic family of spirit, citrus and sweetener drinks. Margarita is the Spanish word for daisy.",
  "relatedSlugs": ["daiquiri", "whiskey-sour", "mojito"],
  "seo": {
    "title": "Margarita Recipe: Classic Tequila, Lime and Orange Liqueur",
    "description": "Make a bar-quality Margarita at home with 2 oz tequila, 1 oz lime juice and 1 oz orange liqueur. Step-by-step method, tips and variations."
  }
}
```

---

## 2. Old Fashioned

```json
{
  "slug": "old-fashioned",
  "name": "Old Fashioned",
  "tags": ["Whiskey", "Stirred", "Classic"],
  "tagline": "Whiskey, sugar, bitters. Nothing more.",
  "intro": "The Old Fashioned is the whiskey cocktail in its simplest form: spirit, sugar, bitters and a little water. It's slow-sipping, aromatic and endlessly adjustable. Done well, it lets the whiskey stay in charge.",
  "difficulty": "Easy",
  "prepTimeMinutes": 5,
  "servings": 1,
  "glassware": { "name": "Rocks glass", "note": "Also called an old fashioned glass. Chill it first." },
  "garnish": ["Orange peel", "Cocktail cherry (optional)"],
  "ingredients": [
    { "amount": "2 oz", "item": "Bourbon or rye", "note": "Bourbon is rounder and sweeter. Rye is spicier and drier." },
    { "amount": "1", "item": "Sugar cube", "note": "Demerara cubes add a hint of caramel. Plain white works fine." },
    { "amount": "2 dashes", "item": "Angostura bitters", "note": "Orange bitters make a good addition, not a replacement." },
    { "amount": "1 tsp", "item": "Water", "note": "Used to help dissolve the sugar cube." }
  ],
  "equipment": ["Mixing glass or the serving glass", "Muddler or bar spoon", "Jigger", "Bar spoon"],
  "steps": [
    { "title": "Build the base", "body": "Place the sugar cube in the glass. Add the bitters and the water." },
    { "title": "Muddle to a paste", "body": "Press and crush the cube with a muddler or the back of a bar spoon until it's mostly dissolved into a syrupy paste.", "tip": "Take your time here. Leftover grains of sugar will sink to the bottom." },
    { "title": "Add the whiskey", "body": "Pour in the 2 oz of bourbon or rye and give it a quick stir to mix the sugar paste through." },
    { "title": "Add ice", "body": "Add one large ice cube if you have one. Large ice melts slowly, so the drink chills without watering down fast." },
    { "title": "Stir to chill", "body": "Stir gently for about 20 to 30 seconds. You want the drink cold with a softened edge but still whiskey-forward." },
    { "title": "Express the peel", "body": "Cut a wide strip of orange peel, avoiding the white pith. Squeeze it over the drink, peel side facing down, to release the oils. Rub it around the rim and drop it in.", "tip": "Add a cocktail cherry if you like, but skip the muddled fruit salad." }
  ],
  "tips": [
    "Pro tip: Choose a whiskey you'd happily sip neat. There's nothing to hide behind.",
    "Pro tip: Use a large ice cube or sphere to slow dilution.",
    "Common mistake: Muddling orange and cherry into the glass. That's a modern bar shortcut, not the classic.",
    "Common mistake: Under-stirring. Without enough dilution the drink tastes hot and harsh."
  ],
  "variations": [
    { "name": "Rum Old Fashioned", "description": "Use aged rum in place of whiskey for notes of vanilla and caramel." },
    { "name": "Maple Old Fashioned", "description": "Swap the sugar cube for a small spoon of maple syrup and stir to combine." },
    { "name": "Oaxaca Old Fashioned", "description": "Use a mix of reposado tequila and mezcal, with agave syrup and a dash of chocolate or mole bitters." },
    { "name": "Smoked Old Fashioned", "description": "Smoke the glass or the finished drink with a small flame-charred wood chip or a smoking cloche." }
  ],
  "substitutions": [
    "Sugar cube: A bar spoon of simple syrup or demerara syrup works if you're out of cubes.",
    "Angostura bitters: Orange bitters or aromatic bitters from another brand are fine, though the flavor will change.",
    "No large ice cube: Use a few regular cubes, but stir for slightly less time to avoid over-diluting."
  ],
  "flavorProfile": { "sweet": 2, "sour": 1, "bitter": 3, "strong": 4 },
  "history": "The basic formula of spirit, sugar, water and bitters matches the earliest published description of a cocktail, from an 1806 American newspaper. The name Old Fashioned appears later in the 1880s, as drinkers asked for their drinks made the old-fashioned way. The Pendennis Club in Louisville is often credited with the modern drink, but that claim is disputed.",
  "relatedSlugs": ["manhattan", "whiskey-sour", "negroni"],
  "seo": {
    "title": "Old Fashioned Recipe: Bourbon or Rye, Sugar and Bitters",
    "description": "Make a classic Old Fashioned with 2 oz bourbon or rye, a sugar cube, Angostura bitters and a splash of water. Easy steps, tips and variations."
  }
}
```

---

## 3. Espresso Martini

```json
{
  "slug": "espresso-martini",
  "name": "Espresso Martini",
  "tags": ["Vodka", "Coffee", "Shaken"],
  "tagline": "Rich, cold and wide awake.",
  "intro": "The Espresso Martini is vodka, coffee liqueur and fresh espresso shaken until it grows a thick, creamy foam. It's bittersweet and silky, and it works as an after-dinner drink or a pick-me-up. The foam is the signature, and it comes from technique.",
  "difficulty": "Medium",
  "prepTimeMinutes": 7,
  "servings": 1,
  "glassware": { "name": "Coupe or martini glass", "note": "Chill it beforehand so the foam holds its shape." },
  "garnish": ["Three coffee beans"],
  "ingredients": [
    { "amount": "2 oz", "item": "Vodka", "note": "A clean, neutral vodka lets the coffee flavor lead." },
    { "amount": "1 oz", "item": "Coffee liqueur", "note": "Kahlúa is sweeter. Mr Black is drier and more intensely coffee." },
    { "amount": "1 oz", "item": "Fresh espresso", "note": "Brew it right before you mix. The crema helps create the foam." },
    { "amount": "½ oz", "item": "Simple syrup", "note": "Made from equal parts sugar and water. Use less if your coffee liqueur is very sweet." }
  ],
  "equipment": ["Cocktail shaker", "Jigger", "Espresso machine, moka pot or AeroPress", "Hawthorne strainer", "Fine mesh strainer"],
  "steps": [
    { "title": "Chill your glass", "body": "Place your coupe in the freezer or fill it with ice water while you prepare the drink." },
    { "title": "Brew the espresso", "body": "Pull a fresh shot, about 1 oz. Let it cool for a minute or so.", "tip": "Piping hot espresso melts the ice too quickly and thins the foam." },
    { "title": "Combine in a shaker", "body": "Add the vodka, coffee liqueur, espresso and simple syrup to the shaker." },
    { "title": "Add ice and shake hard", "body": "Fill the shaker with ice and shake as hard as you can for about 15 seconds. The vigorous shaking whips air into the espresso's oils and creates the foam." },
    { "title": "Double strain", "body": "Strain through the shaker's strainer and a fine mesh strainer into the chilled glass. This catches ice shards and gives the cleanest, smoothest texture." },
    { "title": "Garnish", "body": "Let the foam settle for a few seconds, then float three coffee beans on top.", "tip": "Three beans traditionally stand for health, wealth and happiness." }
  ],
  "tips": [
    "Pro tip: Use freshly brewed espresso. Old coffee tastes flat and gives a thinner foam.",
    "Pro tip: Fill the shaker with plenty of ice. More ice chills faster with less dilution.",
    "Common mistake: Shaking gently. A weak shake gives a thin, watery foam.",
    "Common mistake: Skipping the fine strain, which leaves small ice chips in the foam."
  ],
  "variations": [
    { "name": "Cold Brew Martini", "description": "Replace the espresso with strong cold brew concentrate if you don't have an espresso machine." },
    { "name": "Vanilla Espresso Martini", "description": "Use vanilla vodka, or add a drop of vanilla extract." },
    { "name": "Irish Espresso Martini", "description": "Swap the vodka for Irish whiskey for a warmer, rounder flavor." },
    { "name": "Salted Caramel Espresso Martini", "description": "Add a small spoonful of caramel syrup and finish with a pinch of flaky salt." }
  ],
  "substitutions": [
    "Espresso: 1 oz strong cold brew concentrate or a strong moka pot coffee.",
    "Coffee liqueur: Tia Maria, Mr Black or another coffee liqueur. Adjust the simple syrup to taste.",
    "Simple syrup: Demerara syrup adds a toasty note."
  ],
  "flavorProfile": { "sweet": 3, "sour": 1, "bitter": 3, "strong": 3 },
  "history": "The Espresso Martini is widely credited to London bartender Dick Bradsell in the 1980s, who created it at a Soho bar. Early on, it was reportedly called the Vodka Espresso.",
  "relatedSlugs": ["martini", "old-fashioned", "manhattan"],
  "seo": {
    "title": "Espresso Martini Recipe: Vodka, Coffee Liqueur and Fresh Espresso",
    "description": "Make a foamy Espresso Martini with 2 oz vodka, 1 oz coffee liqueur, 1 oz fresh espresso and ½ oz simple syrup. Easy steps and pro tips."
  }
}
```

---

## 4. Mojito

```json
{
  "slug": "mojito",
  "name": "Mojito",
  "tags": ["Rum", "Mint", "Refreshing"],
  "tagline": "Mint, lime and rum over crushed ice.",
  "intro": "The Mojito is cool, bright and herbal, built right in the glass with muddled mint, lime and white rum. A splash of soda adds sparkle. It's one of the most refreshing drinks you can make on a warm day.",
  "difficulty": "Medium",
  "prepTimeMinutes": 7,
  "servings": 1,
  "glassware": { "name": "Highball glass", "note": "A tall glass leaves room for plenty of ice and soda." },
  "garnish": ["Fresh mint sprig", "Lime wheel"],
  "ingredients": [
    { "amount": "2 oz", "item": "White rum", "note": "A light, clean Cuban-style or Puerto Rican white rum works best." },
    { "amount": "1 oz", "item": "Fresh lime juice", "note": "Squeeze it fresh for the brightest flavor." },
    { "amount": "2 tsp", "item": "Sugar", "note": "Superfine sugar dissolves most easily. Granulated is fine if you stir well." },
    { "amount": "8", "item": "Mint leaves", "note": "Spearmint is the traditional choice for its sweet, cool flavor." },
    { "amount": "Top", "item": "Soda water", "note": "Chilled. Add a splash to finish, not to dilute." }
  ],
  "equipment": ["Highball glass", "Muddler", "Jigger", "Bar spoon", "Citrus juicer"],
  "steps": [
    { "title": "Wake up the mint", "body": "Place the 8 mint leaves in your palm and give them a firm clap. This releases the aromatic oils without damaging the leaves." },
    { "title": "Muddle gently", "body": "In the glass, add the mint, sugar and lime juice. Press the leaves lightly four or five times with the muddler.", "tip": "Press, don't grind. Shredded mint turns bitter and leaves green flecks in the drink." },
    { "title": "Add the rum", "body": "Pour in the 2 oz of white rum and stir for a few seconds until the sugar dissolves." },
    { "title": "Add crushed ice", "body": "Fill the glass about two-thirds with crushed ice. If you don't have crushed ice, wrap cubes in a clean towel and smash them with a rolling pin." },
    { "title": "Churn", "body": "Use a bar spoon to lift from the bottom and push up through the ice a few times. This mixes everything and chills the drink." },
    { "title": "Top with soda", "body": "Pack more crushed ice on top, then add a splash of soda water to finish." },
    { "title": "Garnish", "body": "Slap a fresh mint sprig lightly to release its aroma, then tuck it in alongside a lime wheel.", "tip": "Place the straw close to the mint so you smell it as you sip." }
  ],
  "tips": [
    "Pro tip: Use fresh, perky mint. Wilted mint tastes dull and grassy.",
    "Pro tip: Dissolve the sugar in the lime juice before adding the ice. Sugar won't dissolve properly in cold liquid.",
    "Common mistake: Over-muddling the mint, which makes the drink bitter.",
    "Common mistake: Using too much soda. It should add lift, not wash out the rum and lime."
  ],
  "variations": [
    { "name": "Berry Mojito", "description": "Muddle a few raspberries or blackberries with the mint and lime." },
    { "name": "Coconut Mojito", "description": "Replace the white rum with coconut rum, or add a splash of coconut water." },
    { "name": "Virgin Mojito", "description": "Leave out the rum and add extra soda water and a splash of lime." },
    { "name": "Dark Rum Mojito", "description": "Use an aged rum for deeper vanilla and caramel flavors." }
  ],
  "substitutions": [
    "Sugar: 2 tsp of simple syrup (about ½ oz) works if you don't have superfine sugar.",
    "Mint: Spearmint is best. Peppermint is stronger and can taste medicinal.",
    "Crushed ice: Cubed ice works too. Just stir a little longer."
  ],
  "flavorProfile": { "sweet": 3, "sour": 3, "bitter": 1, "strong": 2 },
  "history": "The Mojito has Cuban roots and is tied to Havana, though its exact origin is disputed. Some trace it to a 16th-century medicinal drink, while others point to later Cuban bartending. It was popularized worldwide partly through Havana bars such as La Bodeguita del Medio.",
  "relatedSlugs": ["daiquiri", "pina-colada", "moscow-mule"],
  "seo": {
    "title": "Mojito Recipe: White Rum, Mint, Lime and Soda",
    "description": "Make a classic Mojito with 2 oz white rum, 1 oz lime juice, 2 tsp sugar, 8 mint leaves and soda water. Simple steps and pro tips."
  }
}
```

---

## 5. Moscow Mule

```json
{
  "slug": "moscow-mule",
  "name": "Moscow Mule",
  "tags": ["Vodka", "Ginger", "Long Drink"],
  "tagline": "Spicy ginger, crisp lime, ice cold.",
  "intro": "The Moscow Mule is a quick, fizzy drink that's easy to love: vodka, lime and a generous pour of ginger beer. It's spicy, tart and refreshing, and it needs no shaking. Serve it in a copper mug if you have one.",
  "difficulty": "Easy",
  "prepTimeMinutes": 3,
  "servings": 1,
  "glassware": { "name": "Copper mug", "note": "A highball glass works just as well. Copper keeps the drink cold." },
  "garnish": ["Lime wedge", "Fresh mint sprig (optional)"],
  "ingredients": [
    { "amount": "2 oz", "item": "Vodka", "note": "A clean, mid-range vodka is all you need." },
    { "amount": "½ oz", "item": "Fresh lime juice", "note": "Squeeze it fresh. It balances the sweetness of the ginger beer." },
    { "amount": "4 oz", "item": "Ginger beer", "note": "Choose a spicy ginger beer rather than ginger ale for the proper bite." }
  ],
  "equipment": ["Copper mug or highball glass", "Jigger", "Bar spoon"],
  "steps": [
    { "title": "Chill the mug", "body": "Fill the mug with ice and let it sit while you gather your ingredients. A cold mug keeps the drink fizzy and cold." },
    { "title": "Add vodka and lime", "body": "With the mug full of ice, add the 2 oz of vodka and ½ oz of lime juice." },
    { "title": "Top with ginger beer", "body": "Slowly pour in the 4 oz of cold ginger beer, tilting the mug slightly to protect the bubbles." },
    { "title": "Stir once", "body": "Give it one gentle stir from the bottom with a bar spoon. One lift is enough to combine without losing fizz.", "tip": "Over-stirring flattens the carbonation." },
    { "title": "Garnish", "body": "Squeeze a lime wedge over the top and drop it in, or perch it on the rim. Add a mint sprig if you like the aroma." }
  ],
  "tips": [
    "Pro tip: Keep your ginger beer well chilled. Warm soda foams up and goes flat fast.",
    "Pro tip: Taste a few ginger beers. They vary from sweet and mild to fiery and dry.",
    "Common mistake: Using ginger ale. It tastes much sweeter and misses the spicy kick.",
    "Common mistake: Pouring the ginger beer too fast, which kills the fizz."
  ],
  "variations": [
    { "name": "Kentucky Mule", "description": "Swap the vodka for bourbon for a warmer, caramel-toned drink." },
    { "name": "Mexican Mule", "description": "Use tequila instead of vodka." },
    { "name": "Dark and Stormy-style Mule", "description": "Use dark rum in place of vodka for a richer, molasses flavor." },
    { "name": "Berry Mule", "description": "Muddle a few raspberries or blackberries in the mug before adding ice." }
  ],
  "substitutions": [
    "Ginger beer: A spicy ginger ale works in a pinch, but add a little extra lime to keep it balanced.",
    "Copper mug: A chilled highball or Collins glass is a fine substitute.",
    "Vodka: Gin makes a Gin-Gin Mule, with a more herbal edge."
  ],
  "flavorProfile": { "sweet": 3, "sour": 2, "bitter": 1, "strong": 2 },
  "history": "The Moscow Mule dates to the early 1940s in the United States, where it helped popularize vodka. Accounts of exactly who invented it and where vary, but they involve a vodka brand, a ginger beer producer and the copper mugs it's now known for.",
  "relatedSlugs": ["mojito", "daiquiri", "aperol-spritz"],
  "seo": {
    "title": "Moscow Mule Recipe: Vodka, Lime and Ginger Beer",
    "description": "Make a Moscow Mule with 2 oz vodka, ½ oz lime juice and 4 oz ginger beer. Quick steps, tips and variations for a perfect mule."
  }
}
```

---

## 6. Whiskey Sour

```json
{
  "slug": "whiskey-sour",
  "name": "Whiskey Sour",
  "tags": ["Bourbon", "Citrus", "Shaken"],
  "tagline": "Tart, smooth and a little bit sweet.",
  "intro": "The Whiskey Sour pairs bourbon with lemon and a touch of sweetness. It's balanced, bright and easy to drink, with the whiskey still clearly in front. It's also a great starting point if you're new to whiskey cocktails.",
  "difficulty": "Easy",
  "prepTimeMinutes": 5,
  "servings": 1,
  "glassware": { "name": "Rocks glass", "note": "Serve over ice. Use a coupe if you'd like it up." },
  "garnish": ["Lemon wheel", "Cocktail cherry (optional)"],
  "ingredients": [
    { "amount": "2 oz", "item": "Bourbon", "note": "A 90 to 100 proof bourbon holds up well to the lemon." },
    { "amount": "¾ oz", "item": "Fresh lemon juice", "note": "Always squeeze it fresh." },
    { "amount": "¾ oz", "item": "Simple syrup", "note": "Equal parts sugar and water, stirred until dissolved." }
  ],
  "equipment": ["Cocktail shaker", "Jigger", "Citrus juicer", "Hawthorne strainer"],
  "steps": [
    { "title": "Chill the glass", "body": "Fill a rocks glass with ice to chill it while you mix." },
    { "title": "Combine the ingredients", "body": "Add the bourbon, lemon juice and simple syrup to a shaker." },
    { "title": "Shake with ice", "body": "Fill the shaker with ice and shake hard for 12 to 15 seconds. You want the shaker to feel frosty cold, which means the drink is chilled and diluted well." },
    { "title": "Strain", "body": "Dump the ice from your glass and add fresh ice. Strain the drink over it.", "tip": "For a silkier texture, strain through a fine mesh strainer as well." },
    { "title": "Garnish", "body": "Add a lemon wheel, and a cherry if you like. Taste, and adjust your next round to suit your preference." }
  ],
  "tips": [
    "Pro tip: Make your simple syrup in advance. It keeps in the fridge for about two weeks.",
    "Pro tip: For a fuller foam, try a dry shake first: shake without ice, then shake again with ice.",
    "Common mistake: Using bottled lemon juice or sour mix, which tastes flat and overly sweet.",
    "Common mistake: Not shaking long enough. The drink should be very cold with a soft, rounded edge."
  ],
  "variations": [
    { "name": "New York Sour", "description": "Float about ½ oz of dry red wine on top for color and a tannic edge." },
    { "name": "Boston Sour", "description": "Add egg white to the shaker for a silky texture and thick foam, using the dry shake method." },
    { "name": "Gold Rush", "description": "Replace the simple syrup with honey syrup and use lemon juice." },
    { "name": "Rye Whiskey Sour", "description": "Use rye in place of bourbon for a spicier, drier version." }
  ],
  "substitutions": [
    "Bourbon: Rye whiskey or a smooth blended whiskey also work well.",
    "Simple syrup: Honey syrup (equal parts honey and warm water) or maple syrup adds richer flavor.",
    "Lemon juice: Fresh lime makes a tarter drink, similar to a whiskey daiquiri."
  ],
  "flavorProfile": { "sweet": 3, "sour": 4, "bitter": 1, "strong": 3 },
  "history": "Sours, a family of drinks made from spirit, citrus and sugar, were well established by the mid-1800s. The Whiskey Sour appears in Jerry Thomas's 1862 bartender's guide.",
  "relatedSlugs": ["old-fashioned", "daiquiri", "margarita"],
  "seo": {
    "title": "Whiskey Sour Recipe: Bourbon, Lemon and Simple Syrup",
    "description": "Make a classic Whiskey Sour with 2 oz bourbon, ¾ oz lemon juice and ¾ oz simple syrup. Easy steps, tips and variations."
  }
}
```

---

## 7. Martini

```json
{
  "slug": "martini",
  "name": "Martini",
  "tags": ["Gin", "Stirred", "Classic"],
  "tagline": "Cold, crisp and impeccably simple.",
  "intro": "The Martini is gin and dry vermouth, stirred ice cold and served up. It's clean, aromatic and strong, and it shows off the gin. Its simplicity is the point, so the quality of your ingredients and your technique matter most.",
  "difficulty": "Medium",
  "prepTimeMinutes": 5,
  "servings": 1,
  "glassware": { "name": "Martini glass or coupe", "note": "Freeze the glass or chill it with ice water first." },
  "garnish": ["Olive", "Lemon twist"],
  "ingredients": [
    { "amount": "2½ oz", "item": "Gin", "note": "A London dry gin such as Beefeater or Tanqueray is the classic choice." },
    { "amount": "½ oz", "item": "Dry vermouth", "note": "Use fresh vermouth. Once opened, store it in the fridge and use within a month or two." },
    { "amount": "1", "item": "Olive or lemon twist", "note": "Choose one. The olive is savory and the lemon twist is bright and aromatic." }
  ],
  "equipment": ["Mixing glass", "Bar spoon", "Jigger", "Julep or Hawthorne strainer", "Paring knife or peeler for the twist"],
  "steps": [
    { "title": "Chill the glass", "body": "Put your martini glass in the freezer for 10 to 15 minutes, or fill it with ice water while you mix." },
    { "title": "Combine in a mixing glass", "body": "Add the gin and dry vermouth to a mixing glass. Fill it with fresh, cold ice." },
    { "title": "Stir", "body": "Stir smoothly for about 25 to 30 seconds. Stirring chills and dilutes the drink while keeping it clear and silky.", "tip": "The outside of the mixing glass should feel frosty." },
    { "title": "Strain", "body": "Dump the ice water from your serving glass and strain the Martini into it." },
    { "title": "Garnish", "body": "For a twist, cut a wide strip of lemon peel, squeeze it over the drink to release the oils, wipe it around the rim and drop it in. For an olive, spear one or three on a pick and rest it in the glass." }
  ],
  "tips": [
    "Pro tip: Keep your gin in the freezer for an extra-cold Martini.",
    "Pro tip: Refrigerate your vermouth after opening. It's wine, and it goes stale.",
    "Common mistake: Shaking a Martini. It makes it cloudy and over-diluted.",
    "Common mistake: Using old, oxidized vermouth, which makes the drink taste flat or sour."
  ],
  "variations": [
    { "name": "Dirty Martini", "description": "Add a splash of olive brine and garnish with olives." },
    { "name": "Gibson", "description": "Garnish with a cocktail onion instead of an olive or twist." },
    { "name": "Vodka Martini", "description": "Use vodka in place of gin for a cleaner, more neutral drink." },
    { "name": "Wet or Dry", "description": "Use more vermouth for a wetter Martini, or very little for a bone-dry one." }
  ],
  "substitutions": [
    "Gin: Use a favorite London dry, or try a softer, more floral gin for a different style.",
    "Dry vermouth: Dolin Dry and Noilly Prat are reliable. Avoid sweet vermouth.",
    "Garnish: Both olive and lemon twist are classic. Pick whichever you prefer."
  ],
  "flavorProfile": { "sweet": 1, "sour": 1, "bitter": 2, "strong": 5 },
  "history": "The Martini's origin is disputed. Some trace it to a drink called the Martinez from the 1800s, while others credit bartenders in New York or elsewhere. What's clear is that gin and vermouth drinks of this kind were common by the late 1800s, and the drink grew drier over time.",
  "relatedSlugs": ["manhattan", "negroni", "espresso-martini"],
  "seo": {
    "title": "Martini Recipe: Gin, Dry Vermouth and a Twist or Olive",
    "description": "Make a classic Martini with 2½ oz gin and ½ oz dry vermouth. Learn how to stir it right, with tips and variations."
  }
}
```

---

## 8. Negroni

```json
{
  "slug": "negroni",
  "name": "Negroni",
  "tags": ["Gin", "Bittersweet", "Stirred"],
  "tagline": "Equal parts, endlessly bold.",
  "intro": "The Negroni is gin, Campari and sweet vermouth in equal parts. It's bitter, sweet and herbal all at once, with a ruby color and a long finish. It's easy to make and has a way of winning people over, even if the first sip is a surprise.",
  "difficulty": "Easy",
  "prepTimeMinutes": 3,
  "servings": 1,
  "glassware": { "name": "Rocks glass", "note": "Serve over a large ice cube if you have one." },
  "garnish": ["Orange peel"],
  "ingredients": [
    { "amount": "1 oz", "item": "Gin", "note": "A juniper-forward London dry gin holds up best." },
    { "amount": "1 oz", "item": "Campari", "note": "The bitter orange and herbal backbone of the drink." },
    { "amount": "1 oz", "item": "Sweet vermouth", "note": "Carpano Antica is rich. Cocchi di Torino is brighter. Keep opened vermouth refrigerated." }
  ],
  "equipment": ["Mixing glass", "Bar spoon", "Jigger", "Julep or Hawthorne strainer", "Peeler or paring knife"],
  "steps": [
    { "title": "Add the ingredients", "body": "Pour the gin, Campari and sweet vermouth into a mixing glass." },
    { "title": "Add ice and stir", "body": "Fill the glass with ice and stir for 20 to 30 seconds. You want the drink cold and softened, not watery.", "tip": "Stirring keeps the Negroni silky and clear." },
    { "title": "Prepare the serving glass", "body": "Place a large ice cube in a rocks glass. A large cube melts slowly, keeping the drink cold without watering it down." },
    { "title": "Strain", "body": "Strain the mixture over the ice." },
    { "title": "Express the orange peel", "body": "Cut a wide strip of orange peel. Squeeze it over the drink to release the oils, rub it around the rim, and drop it in or rest it on the ice." }
  ],
  "tips": [
    "Pro tip: Chill your gin and glass for a crisper drink.",
    "Pro tip: Try different sweet vermouths. They change the drink more than you'd expect.",
    "Common mistake: Using stale vermouth, which makes the drink taste dull and sour.",
    "Common mistake: Skipping the orange peel. The aroma balances the bitterness."
  ],
  "variations": [
    { "name": "Boulevardier", "description": "Replace the gin with bourbon or rye for a warmer, richer drink." },
    { "name": "Negroni Sbagliato", "description": "Replace the gin with prosecco for a lighter, bubbly version." },
    { "name": "White Negroni", "description": "Use gin, a bitter gentian liqueur such as Suze and a dry aperitif wine like Lillet Blanc." },
    { "name": "Mezcal Negroni", "description": "Swap the gin for mezcal for a smoky twist." }
  ],
  "substitutions": [
    "Campari: Aperol is milder and sweeter, which makes a gentler drink.",
    "Gin: A softer, more floral gin gives a different but pleasant result.",
    "Orange peel: A grapefruit peel adds a sharper citrus note."
  ],
  "flavorProfile": { "sweet": 2, "sour": 1, "bitter": 5, "strong": 4 },
  "history": "The Negroni is commonly traced to Florence around 1919, when Count Camillo Negroni asked for gin in place of soda water in his Americano. The story is widely told but not firmly documented.",
  "relatedSlugs": ["manhattan", "martini", "aperol-spritz"],
  "seo": {
    "title": "Negroni Recipe: Equal Parts Gin, Campari and Sweet Vermouth",
    "description": "Make a classic Negroni with 1 oz each of gin, Campari and sweet vermouth. Easy steps, pro tips and variations."
  }
}
```

---

## 9. Aperol Spritz

```json
{
  "slug": "aperol-spritz",
  "name": "Aperol Spritz",
  "tags": ["Prosecco", "Aperitivo", "Sparkling"],
  "tagline": "Bubbly, bittersweet and sunny.",
  "intro": "The Aperol Spritz is a light, bubbly Italian aperitivo with a gentle bitter orange flavor. It's low in alcohol, easy to make and made to be sipped slowly. Its orange color makes it look as cheerful as it tastes.",
  "difficulty": "Easy",
  "prepTimeMinutes": 3,
  "servings": 1,
  "glassware": { "name": "Large wine glass", "note": "A stemmed glass gives room for ice and bubbles." },
  "garnish": ["Orange slice"],
  "ingredients": [
    { "amount": "3 oz", "item": "Prosecco", "note": "Use a dry (brut) prosecco. Keep it well chilled." },
    { "amount": "2 oz", "item": "Aperol", "note": "A bright, bittersweet orange aperitivo." },
    { "amount": "1 oz", "item": "Soda water", "note": "Cold and fizzy, added last for a light finish." }
  ],
  "equipment": ["Large wine glass", "Jigger", "Bar spoon"],
  "steps": [
    { "title": "Fill with ice", "body": "Fill a large wine glass generously with ice. More ice keeps the drink colder for longer, which means less dilution." },
    { "title": "Pour the prosecco", "body": "Add the 3 oz of prosecco first, pouring gently down the side of the glass to protect the bubbles.", "tip": "Adding the sparkling wine first helps preserve its fizz." },
    { "title": "Add the Aperol", "body": "Pour in the 2 oz of Aperol. It will sink and swirl through the prosecco." },
    { "title": "Top with soda", "body": "Add the 1 oz of soda water." },
    { "title": "Stir and garnish", "body": "Give it one gentle stir to combine. Tuck in an orange slice and serve right away." }
  ],
  "tips": [
    "Pro tip: Chill all your ingredients ahead of time. Cold bottles keep the bubbles lively.",
    "Pro tip: Use plenty of ice and a large glass. A packed glass stays colder and dilutes more slowly.",
    "Common mistake: Stirring too much, which flattens the bubbles.",
    "Common mistake: Using sweet prosecco, which makes the drink cloying."
  ],
  "variations": [
    { "name": "Campari Spritz", "description": "Replace the Aperol with Campari for a bolder, more bitter drink." },
    { "name": "Hugo Spritz", "description": "Use elderflower liqueur or syrup with prosecco, soda and fresh mint." },
    { "name": "Limoncello Spritz", "description": "Swap the Aperol for limoncello for a sweeter, lemon-forward drink." },
    { "name": "Low-ABV Spritz", "description": "Use a non-alcoholic sparkling wine and a splash of non-alcoholic bitter aperitif." }
  ],
  "substitutions": [
    "Prosecco: Cava or another dry sparkling wine works well.",
    "Aperol: Select or Campari offer a more bitter alternative.",
    "Garnish: A green olive is the traditional garnish for a Venetian spritz with Select."
  ],
  "flavorProfile": { "sweet": 3, "sour": 1, "bitter": 3, "strong": 1 },
  "history": "The spritz tradition comes from the Veneto region of northern Italy, where water or soda was added to local wine. Aperol was created in Padua in 1919. The Aperol Spritz became a global favorite in the 2000s after Campari acquired the brand.",
  "relatedSlugs": ["negroni", "mojito", "moscow-mule"],
  "seo": {
    "title": "Aperol Spritz Recipe: Prosecco, Aperol and Soda",
    "description": "Make an Aperol Spritz with 3 oz prosecco, 2 oz Aperol and 1 oz soda water. Easy steps, tips and variations."
  }
}
```

---

## 10. Piña Colada

```json
{
  "slug": "pina-colada",
  "name": "Piña Colada",
  "tags": ["Rum", "Tropical", "Frozen"],
  "tagline": "Creamy coconut, sweet pineapple, island sunshine.",
  "intro": "The Piña Colada is a creamy, frozen blend of white rum, coconut and pineapple. It's sweet, smooth and unmistakably tropical. A good one is thick, cold and balanced, not syrupy.",
  "difficulty": "Easy",
  "prepTimeMinutes": 5,
  "servings": 1,
  "glassware": { "name": "Hurricane glass", "note": "A tall glass or a large goblet also works." },
  "garnish": ["Pineapple wedge", "Maraschino cherry"],
  "ingredients": [
    { "amount": "2 oz", "item": "White rum", "note": "A light Puerto Rican style rum is classic." },
    { "amount": "1½ oz", "item": "Cream of coconut", "note": "Use sweetened cream of coconut such as Coco López, not coconut milk or coconut cream. Stir or shake the can first." },
    { "amount": "1½ oz", "item": "Pineapple juice", "note": "Use good-quality juice, ideally not from concentrate." },
    { "amount": "1 cup", "item": "Ice", "note": "Use standard cubes. Crushed ice blends faster but can be watery." }
  ],
  "equipment": ["Blender", "Jigger", "Measuring cup", "Cocktail pick"],
  "steps": [
    { "title": "Chill the glass", "body": "Place your hurricane glass in the freezer while you blend." },
    { "title": "Stir the cream of coconut", "body": "Cream of coconut separates in the can, so stir it well before measuring.", "tip": "A smooth start means a smooth drink." },
    { "title": "Add to the blender", "body": "Add the rum, cream of coconut and pineapple juice, then the 1 cup of ice. Adding liquids first helps the blades move freely." },
    { "title": "Blend", "body": "Blend on high for 15 to 20 seconds until smooth and thick, with no ice chunks. If it's too thick, pulse in a splash of pineapple juice." },
    { "title": "Pour", "body": "Pour into the chilled glass right away, since a frozen drink melts quickly." },
    { "title": "Garnish", "body": "Skewer a cherry and a pineapple wedge on a pick and set it on the rim." }
  ],
  "tips": [
    "Pro tip: Freeze pineapple juice in an ice tray and use some as part of the ice for extra flavor.",
    "Pro tip: Use cold ingredients so the drink stays thick.",
    "Common mistake: Using coconut milk or coconut cream instead of cream of coconut. It won't be sweet enough or the right texture.",
    "Common mistake: Over-blending, which melts the ice and thins out the drink."
  ],
  "variations": [
    { "name": "Virgin Piña Colada", "description": "Leave out the rum. Add a little extra pineapple juice if needed." },
    { "name": "Chi Chi", "description": "Use vodka instead of rum." },
    { "name": "Dark Rum Float", "description": "Float a splash of dark rum on top for a deeper flavor." },
    { "name": "Miami Vice", "description": "Layer a Piña Colada with a frozen strawberry Daiquiri in the same glass." }
  ],
  "substitutions": [
    "White rum: Gold or coconut rum works for a richer or more coconut-forward flavor.",
    "Cream of coconut: Coco López is the standard. Other brands are fine, but check the sweetness.",
    "Pineapple juice: Fresh pineapple blended with ice gives an even brighter flavor."
  ],
  "flavorProfile": { "sweet": 5, "sour": 1, "bitter": 1, "strong": 2 },
  "history": "The Piña Colada comes from Puerto Rico, which made it the national drink in 1978. Its exact inventor is disputed. Several Puerto Rican bartenders, including those connected to the Caribe Hilton and to Barrachina, claim credit in the 1950s and 1960s.",
  "relatedSlugs": ["daiquiri", "mojito", "margarita"],
  "seo": {
    "title": "Piña Colada Recipe: White Rum, Cream of Coconut and Pineapple",
    "description": "Make a creamy Piña Colada with 2 oz white rum, 1½ oz cream of coconut, 1½ oz pineapple juice and 1 cup ice. Steps, tips and variations."
  }
}
```

---

## 11. Daiquiri

```json
{
  "slug": "daiquiri",
  "name": "Daiquiri",
  "tags": ["Rum", "Citrus", "Shaken"],
  "tagline": "Three ingredients, perfectly balanced.",
  "intro": "The classic Daiquiri is white rum, lime and sugar, shaken until ice cold. It's tart, clean and refreshing, and nothing like the blended versions you may know. It's a great test of balance and technique, and a joy when you get it right.",
  "difficulty": "Easy",
  "prepTimeMinutes": 5,
  "servings": 1,
  "glassware": { "name": "Coupe", "note": "Chill it ahead of time. A small cocktail glass also works." },
  "garnish": ["Lime wheel or twist"],
  "ingredients": [
    { "amount": "2 oz", "item": "White rum", "note": "Choose a clean, lightly flavored rum." },
    { "amount": "1 oz", "item": "Fresh lime juice", "note": "Squeeze it just before mixing." },
    { "amount": "¾ oz", "item": "Simple syrup", "note": "Equal parts sugar and water, stirred until dissolved." }
  ],
  "equipment": ["Cocktail shaker", "Jigger", "Citrus juicer", "Hawthorne strainer", "Fine mesh strainer"],
  "steps": [
    { "title": "Chill the coupe", "body": "Fill the glass with ice and water, or place it in the freezer, while you make the drink." },
    { "title": "Combine", "body": "Add the rum, lime juice and simple syrup to a shaker." },
    { "title": "Shake hard", "body": "Fill the shaker with ice and shake for 12 to 15 seconds. This chills and dilutes the drink, and gives it a light, frothy texture.", "tip": "The shaker should be painfully cold to hold." },
    { "title": "Double strain", "body": "Discard the ice water from your glass. Strain the drink through the shaker's strainer and a fine mesh strainer for a smooth finish with no ice shards." },
    { "title": "Garnish", "body": "Float a thin lime wheel on top or express a lime twist over the drink. Serve right away." }
  ],
  "tips": [
    "Pro tip: Taste before serving. If it's too tart or sweet for your limes, adjust the next one slightly.",
    "Pro tip: Make simple syrup in advance and keep it in the fridge.",
    "Common mistake: Using bottled lime juice, which tastes dull and slightly bitter.",
    "Common mistake: Under-shaking, which leaves the drink warm and sharp."
  ],
  "variations": [
    { "name": "Hemingway Daiquiri", "description": "Add a splash of grapefruit juice and maraschino liqueur and reduce the sugar, in the style of the Floridita in Havana." },
    { "name": "Frozen Strawberry Daiquiri", "description": "Blend the ingredients with ripe strawberries and ice until smooth." },
    { "name": "Aged Rum Daiquiri", "description": "Use a gold or aged rum for notes of caramel and vanilla." },
    { "name": "Spiced Daiquiri", "description": "Use a spiced rum for a warmer take." }
  ],
  "substitutions": [
    "White rum: Light Cuban-style or Puerto Rican rum works best. Avoid overly flavored rums.",
    "Simple syrup: Demerara syrup adds a deeper, toasty flavor.",
    "Lime juice: Lemon makes a different, softer sour but isn't the classic."
  ],
  "flavorProfile": { "sweet": 3, "sour": 4, "bitter": 1, "strong": 3 },
  "history": "The Daiquiri is named after the Daiquirí area near Santiago de Cuba. It's commonly credited to an American engineer named Jennings Cox around 1900, though the story is not fully proven. Havana bartender Constantino Ribalaigua later helped refine and popularize it.",
  "relatedSlugs": ["margarita", "mojito", "whiskey-sour"],
  "seo": {
    "title": "Daiquiri Recipe: White Rum, Lime and Simple Syrup",
    "description": "Make a classic Daiquiri with 2 oz white rum, 1 oz lime juice and ¾ oz simple syrup. Step-by-step method, tips and variations."
  }
}
```

---

## 12. Manhattan

```json
{
  "slug": "manhattan",
  "name": "Manhattan",
  "tags": ["Rye", "Stirred", "Classic"],
  "tagline": "Rich, smooth and effortlessly refined.",
  "intro": "The Manhattan is rye whiskey, sweet vermouth and bitters stirred until silky and cold. It's spicy, rich and aromatic, and it feels timeless. It's one of the great classics and rewards good ingredients and a steady stir.",
  "difficulty": "Easy",
  "prepTimeMinutes": 5,
  "servings": 1,
  "glassware": { "name": "Coupe or Nick & Nora glass", "note": "Chill it before serving." },
  "garnish": ["Cocktail cherry", "Orange peel (optional)"],
  "ingredients": [
    { "amount": "2 oz", "item": "Rye whiskey", "note": "Rye's spice balances the sweet vermouth. Bourbon makes a softer, sweeter Manhattan." },
    { "amount": "1 oz", "item": "Sweet vermouth", "note": "Use fresh vermouth and keep it refrigerated after opening." },
    { "amount": "2 dashes", "item": "Angostura bitters", "note": "Adds depth and a warm baking-spice aroma." }
  ],
  "equipment": ["Mixing glass", "Bar spoon", "Jigger", "Julep or Hawthorne strainer"],
  "steps": [
    { "title": "Chill the glass", "body": "Place your coupe in the freezer, or fill it with ice and water, while you mix." },
    { "title": "Combine in a mixing glass", "body": "Add the rye, sweet vermouth and bitters to a mixing glass. Fill it with cold, fresh ice." },
    { "title": "Stir", "body": "Stir for about 25 to 30 seconds. Stirring chills and dilutes the drink while keeping it clear and silky.", "tip": "Shaking would make it cloudy and frothy. Stir for a smooth texture." },
    { "title": "Strain", "body": "Discard the ice water from your glass and strain the Manhattan into it." },
    { "title": "Garnish", "body": "Drop in a quality cocktail cherry. If you like, also express an orange peel over the drink for a bright aroma." }
  ],
  "tips": [
    "Pro tip: Use a good cocktail cherry such as Luxardo or Amarena. Bright red maraschino cherries are very sweet.",
    "Pro tip: Keep your vermouth in the fridge and use it within a month or two of opening.",
    "Common mistake: Using old vermouth, which tastes stale and flat.",
    "Common mistake: Shaking the drink instead of stirring."
  ],
  "variations": [
    { "name": "Perfect Manhattan", "description": "Replace part of the sweet vermouth with dry vermouth for a lighter, drier drink." },
    { "name": "Rob Roy", "description": "Use Scotch whisky in place of rye." },
    { "name": "Black Manhattan", "description": "Replace the sweet vermouth with Averna amaro for a darker, bittersweet drink." },
    { "name": "Dry Manhattan", "description": "Use dry vermouth and garnish with a lemon twist." }
  ],
  "substitutions": [
    "Rye whiskey: Bourbon for a sweeter, rounder drink.",
    "Sweet vermouth: Carpano Antica is rich and vanilla-forward. Cocchi di Torino is brighter.",
    "Angostura bitters: Orange bitters or a mix of the two make a nice twist."
  ],
  "flavorProfile": { "sweet": 2, "sour": 1, "bitter": 3, "strong": 4 },
  "history": "The Manhattan dates to 1870s New York. A popular story ties it to a banquet at the Manhattan Club, but historians doubt that account, so its exact origin is disputed.",
  "relatedSlugs": ["old-fashioned", "negroni", "martini"],
  "seo": {
    "title": "Manhattan Recipe: Rye Whiskey, Sweet Vermouth and Bitters",
    "description": "Make a classic Manhattan with 2 oz rye whiskey, 1 oz sweet vermouth and 2 dashes Angostura bitters. Easy steps, tips and variations."
  }
}
```
