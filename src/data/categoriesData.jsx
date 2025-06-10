const categoriesData = [
  {
    name: "Mammals",
    images: [
      {
        id: "m1",
        src: "https://placehold.co/200x200/ADD8E6/000000?text=Lion",
        alt: "Lion",
      },
      {
        id: "m2",
        src: "https://placehold.co/200x200/F08080/000000?text=Elephant",
        alt: "Elephant",
      },
      {
        id: "m3",
        src: "https://placehold.co/200x200/90EE90/000000?text=Dog",
        alt: "Dog",
      },
      {
        id: "m4",
        src: "https://placehold.co/200x200/FFDAB9/000000?text=Cat",
        alt: "Cat",
      },
      {
        id: "m5",
        src: "https://placehold.co/200x200/DDA0DD/000000?text=Bear",
        alt: "Bear",
      },
    ],
  },
  {
    name: "Birds",
    images: [
      {
        id: "b1",
        src: "https://placehold.co/200x200/FFB6C1/000000?text=Eagle",
        alt: "Eagle",
      },
      {
        id: "b2",
        src: "https://placehold.co/200x200/20B2AA/000000?text=Owl",
        alt: "Owl",
      },
      {
        id: "b3",
        src: "https://placehold.co/200x200/87CEEB/000000?text=Penguin",
        alt: "Penguin",
      },
      {
        id: "b4",
        src: "https://placehold.co/200x200/FFDEAD/000000?text=Parrot",
        alt: "Parrot",
      },
      {
        id: "b5",
        src: "https://placehold.co/200x200/C0C0C0/000000?text=Hummingbird",
        alt: "Hummingbird",
      },
    ],
  },
  {
    name: "Reptiles",
    images: [
      {
        id: "r1",
        src: "https://placehold.co/200x200/778899/000000?text=Snake",
        alt: "Snake",
      },
      {
        id: "r2",
        src: "https://placehold.co/200x200/BDB76B/000000?text=Lizard",
        alt: "Lizard",
      },
      {
        id: "r3",
        src: "https://placehold.co/200x200/6B8E23/000000?text=Turtle",
        alt: "Turtle",
      },
      {
        id: "r4",
        src: "https://placehold.co/200x200/F0E68C/000000?text=Crocodile",
        alt: "Crocodile",
      },
      {
        id: "r5",
        src: "https://placehold.co/200x200/ADD8E6/000000?text=Chameleon",
        alt: "Chameleon",
      },
    ],
  },
  {
    name: "Amphibians",
    images: [
      {
        id: "a1",
        src: "https://placehold.co/200x200/8A2BE2/000000?text=Frog",
        alt: "Frog",
      },
      {
        id: "a2",
        src: "https://placehold.co/200x200/BA55D3/000000?text=Salamander",
        alt: "Salamander",
      },
      {
        id: "a3",
        src: "https://placehold.co/200x200/DA70D6/000000?text=Newt",
        alt: "Newt",
      },
      {
        id: "a4",
        src: "https://placehold.co/200x200/9370DB/000000?text=Caecilian",
        alt: "Caecilian",
      },
      {
        id: "a5",
        src: "https://placehold.co/200x200/C71585/000000?text=Axolotl",
        alt: "Axolotl",
      },
    ],
  },
  {
    name: "Fish",
    images: [
      {
        id: "f1",
        src: "https://placehold.co/200x200/4682B4/000000?text=Goldfish",
        alt: "Goldfish",
      },
      {
        id: "f2",
        src: "https://placehold.co/200x200/5F9EA0/000000?text=Shark",
        alt: "Shark",
      },
      {
        id: "f3",
        src: "https://placehold.co/200x200/6495ED/000000?text=Clownfish",
        alt: "Clownfish",
      },
      {
        id: "f4",
        src: "https://placehold.co/200x200/87CEFA/000000?text=Piranha",
        alt: "Piranha",
      },
      {
        id: "f5",
        src: "https://placehold.co/200x200/B0E0E6/000000?text=Tuna",
        alt: "Tuna",
      },
    ],
  },
  {
    name: "Insects",
    images: [
      {
        id: "i1",
        src: "https://placehold.co/200x200/F4A460/000000?text=Butterfly",
        alt: "Butterfly",
      },
      {
        id: "i2",
        src: "https://placehold.co/200x200/DAA520/000000?text=Bee",
        alt: "Bee",
      },
      {
        id: "i3",
        src: "https://placehold.co/200x200/CD853F/000000?text=Ladybug",
        alt: "Ladybug",
      },
      {
        id: "i4",
        src: "https://placehold.co/200x200/B8860B/000000?text=Ant",
        alt: "Ant",
      },
      {
        id: "i5",
        src: "https://placehold.co/200x200/D2B48C/000000?text=Dragonfly",
        alt: "Dragonfly",
      },
    ],
  },
  {
    name: "Mythical",
    images: [
      {
        id: "my1",
        src: "https://placehold.co/200x200/9932CC/000000?text=Dragon",
        alt: "Dragon",
      },
      {
        id: "my2",
        src: "https://placehold.co/200x200/8B008B/000000?text=Unicorn",
        alt: "Unicorn",
      },
      {
        id: "my3",
        src: "https://placehold.co/200x200/4B0082/000000?text=Griffin",
        alt: "Griffin",
      },
      {
        id: "my4",
        src: "https://placehold.co/200x200/800080/000000?text=Phoenix",
        alt: "Phoenix",
      },
      {
        id: "my5",
        src: "https://placehold.co/200x200/4169E1/000000?text=Sphinx",
        alt: "Sphinx",
      },
    ],
  },
  {
    name: "Sea Creatures",
    images: [
      {
        id: "sc1",
        src: "https://placehold.co/200x200/00CED1/000000?text=Dolphin",
        alt: "Dolphin",
      },
      {
        id: "sc2",
        src: "https://placehold.co/200x200/48D1CC/000000?text=Octopus",
        alt: "Octopus",
      },
      {
        id: "sc3",
        src: "https://placehold.co/200x200/7FFFD4/000000?text=Jellyfish",
        alt: "Jellyfish",
      },
      {
        id: "sc4",
        src: "https://placehold.co/200x200/AFEEEE/000000?text=Seahorse",
        alt: "Seahorse",
      },
      {
        id: "sc5",
        src: "https://placehold.co/200x200/66CDAA/000000?text=Whale",
        alt: "Whale",
      },
    ],
  },
];

export default categoriesData;