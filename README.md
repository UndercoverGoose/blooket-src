# blooket-src
[not src code] useful blooket documenation

## blooks.json
Easy to use JSON file listing every single blook, along side each of there id's (for fetching image), boxes, rarities, chances (drop rates), sell values, and associated color

- Follows this structure:
```js
{
  "sourceUrl": "...",
  "imageUrl": "...",
  "obtainableBlooks": 118,
  "eventObtainedBlooks": 12,
  "blooks": {
    "Baby Shark": { // Example blook
      "id": "babyShark",
      "box": "aquatic",
      "rarity": "Legendary",
      "chance": 0.5,
      "sellValue": 200,
      "color": "#5588b7"
    },
    ...
  },
  "boxes": {
    "aquatic": { // Example box
      "isOpenable": true,
      "tokenPrice": 20,
      "boxName": "Aquatic Box",
      "blooks": [
        "Old Boot",
        "Jellyfish",
        ...,
        "Baby Shark",
        "Megalodon"
      ]
    }
  },
  "rarity": {
    "Common": [
      "Arctic Fox",
      "Arctic Hare",
      "Baby Penguin",
      ...
    ],
    "Uncommon": [ ... ]
    "Rare": [ ... ],
    "Epic": [ ... ],
    "Legendary": [ ... ],
    "Mystical": [ ... ]
  },
  "obtainable": [ ... ],
  "eventBlooks": [ ... ]
}
```

### Details:
- `.sourceUrl` - the url to fetch the blook SVG from Blooket itself
  - replace `{box}` with the set/box name, like `aquatic`, `bonus/aquatic`, or `colors`
  - replace `{id}` with the `.id` found under `.blooks`, it is almost identical to the blook display name
- `.imageUrl` - the url to fetch the blook SVG or PNG from this Github
  - replace `{type}` with the type of file you want, only accepts: `png` and `svg` currently
  - replace `{box}` and `{id}` with the same values as previously
- `.obtainableBlooks` and `.obtainable`
  - The first key contains the total number of obtainable blooks through boxes and events
  - The `.obtained` array lists every obtainable blook
- `.eventObtainedBlooks` and `.eventBlooks`
  - The first key contains the total number of blooks only obtainable through limit time events
  - The `.eventBlooks` array lists every event blook
- `.blooks`
  - Every key in `.blooks` refers to the display name of the blook
  - `box` may not be an actual box, as many blooks are not apart of any boxes
  - `chance` is the percentage drop rate, 0.5 means 0.5%, 7 means 7%, and 100 would mean 100%
    - `chance` will be set to `-1` for blooks that aren't obtainable through boxes
  - `sellValue` will be set to `-1` for default blooks that cannot be sold
  - `color` is some value in the source code attached to the blooks
- `.boxes`
  - Every key in `.boxes` refers to the name of the box or set of blooks in the API
  - `isOpenable` is set to `true` when the set of blooks is an actual box (doesn't say whether its currently available, like Spooky Box)
  - `tokenPrice` if the previous is `true` then the amount of tokens to buy the box is here
  - `boxName` is only accurate for actual boxes, otherwise it may say `"Default Blooks"`
  - `blooks` is an array containing the blooks contained in the set/box
- `.rarity`
  - Every key in `.rarity` refers to the possible rarity of each blook
  - Inside each section is an array listing every blook in that category


## blookParts
