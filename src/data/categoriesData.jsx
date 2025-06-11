const categoriesData = [
  {
    name: "Wild Animals",
    images: [
      {
        id: "w1",
        src: "https://images.deepai.org/art-image/5c156fa98ae24a47b773246b0bc49d83/cartoon-image-of-a-cute-lion.jpg",
        alt: "Lion",
      },
      {
        id: "w2",
        src: "https://images.deepai.org/art-image/c44d075d65a8460d87be2ab4b59a8eb9/cartoon-image-of-a-cute-elephant.jpg",
        alt: "Elephant",
      },
      {
        id: "w3",
        src: "https://images.deepai.org/art-image/a29449daf13547bfaaa92a32f7e48fc5/cartoon-image-of-a-cute-tiger-33cbef.jpg",
        alt: "Tiger",
      },
      {
        id: "w3",
        src: "https://images.deepai.org/art-image/8fc3f37c24b641d2a1c4000bac351f0f/cartoon-image-of-a-cute-panda-de3154.jpg",
        alt: "Panda",
      },
      {
        id: "w3",
        src: "https://images.deepai.org/art-image/8bebc2cb78334aa2963928cf2472f013/cartoon-image-of-a-cute-monkey-c68e15.jpg",
        alt: "Monkey",
      },
    ],
  },
  {
    name: "Forest Critters",
    images: [
      {
        id: "c5",
        src: "https://images.deepai.org/art-image/94e1fea3887b49fd8518af6e1b41bdee/cartoon-image-of-a-cute-bear-80c20b.jpg",
        alt: "Bear",
      },
      {
        id: "c2",
        src: "https://images.deepai.org/art-image/84b2eb35602a48f5941c7d13cfda6d1c/cartoon-image-of-a-cute-owl.jpg",
        alt: "Owl",
      },
      {
        id: "c3",
        src: "https://images.deepai.org/art-image/3066355ed6c34ef9bb95ea936716de88/cartoon-image-of-a-cute-moose.jpg",
        alt: "Moose",
      },
      {
        id: "c4",
        src: "https://images.deepai.org/art-image/67f3809664884a6695418a1198ea1974/cartoon-image-of-a-cute-fox.jpg",
        alt: "Fox",
      },
      {
        id: "c5",
        src: "https://images.deepai.org/art-image/4358f002441e48ffb0f126945952adb2/cartoon-image-of-a-cute-eagle-065172.jpg",
        alt: "Eagle",
      },
    ],
  },
  {
    name: "Reptiles / Amphibians",
    images: [
      {
        id: "r1",
        src: "https://images.deepai.org/art-image/afe75e1b140b47fb8353f41e4f976732/cartoon-image-of-a-cute-snake.jpg",
        alt: "Snake",
      },
      {
        id: "r2",
        src: "https://images.deepai.org/art-image/f90fe1c67b7547cc8ab471f7bfea589c/cartoon-image-of-a-cute-frog.jpg",
        alt: "Frog",
      },
      {
        id: "r3",
        src: "https://images.deepai.org/art-image/09d8f9c272a44ad0aa671592bbb12ad7/cartoon-image-of-a-cute-turtle-fc3cd9.jpg",
        alt: "Turtle",
      },
      {
        id: "r4",
        src: "https://images.deepai.org/art-image/91da6ab09c4b43a6b47c579bb7f170fd/cartoon-image-of-a-cute-crocodile.jpg",
        alt: "Crocodile",
      },
      {
        id: "r5",
        src: "https://images.deepai.org/art-image/001b74b362ac470da26ac34c22ed0aeb/cartoon-image-of-a-cute-axolotl-7919f3.jpg",
        alt: "Axolotl",
      },
    ],
  },
  {
    name: "Sea Creatures",
    images: [
      {
        id: "s1",
        src: "https://images.deepai.org/art-image/b961389fca7445ceb1a606faca13fdc8/cartoon-image-of-a-cute-dolphin-19e9e6.jpg",
        alt: "Dolphin",
      },
      {
        id: "s2",
        src: "https://images.deepai.org/art-image/1fe148baeec847a3bcbb180fe8d4f3f0/cartoon-image-of-a-cute-octopus.jpg",
        alt: "Octopus",
      },
      {
        id: "s3",
        src: "https://images.deepai.org/art-image/121465558fdb433ebd5b05dcb637df81/cartoon-image-of-a-cute-shark.jpg",
        alt: "Shark",
      },
      {
        id: "s4",
        src: "https://images.deepai.org/art-image/c6a623c968fd4b4bb4a81c181967ff44/cartoon-image-of-a-cute-crab-d770dd.jpg",
        alt: "Crab",
      },
      {
        id: "s5",
        src: "https://images.deepai.org/art-image/3f5c732a085b43819f994dde53b9f6ce/cartoon-image-of-a-cute-smiling-starfish.jpg",
        alt: "Star Fish",
      },
    ],
  },
  {
    name: "Farm Friends",
    images: [
      {
        id: "f1",
        src: "https://images.deepai.org/art-image/8999fa23f4ab4f0eaea19d19b0edfb7f/cartoon-image-of-a-cute-cow.jpg",
        alt: "Cow",
      },
      {
        id: "f2",
        src: "https://images.deepai.org/art-image/def04c2c3cbf4ceca612e90a14603043/cartoon-image-of-a-cute-pig-13b74c.jpg",
        alt: "Pig",
      },
      {
        id: "f3",
        src: "https://images.deepai.org/art-image/73605353eec846eca955787fa0532451/cartoon-image-of-a-cute-horse-1a934c.jpg",
        alt: "Horse",
      },
      {
        id: "f4",
        src: "https://images.deepai.org/art-image/0ff3a95b41474f1090ce6a95a9515b01/cartoon-image-of-a-cute-duck-4d1f7d.jpg",
        alt: "Duck",
      },
      {
        id: "f5",
        src: "https://images.deepai.org/art-image/e81624ddcdfb44bb800503d68cd95ca9/cartoon-image-of-a-cute-bunny.jpg",
        alt: "Bunny",
      },
    ],
  },
  {
    name: "House Mates",
    images: [
      {
        id: "h1",
        src: "https://images.deepai.org/art-image/e68605ff26b348eeb1afa2de7fe7b952/cartoon-image-of-a-cute-butterfly-4ace05.jpg",
        alt: "Butterfly",
      },
      {
        id: "w4",
        src: "https://images.deepai.org/art-image/e2522f3ea4b44d27b900ea3ea7222b3a/cartoon-image-of-a-cute-kitten.jpg",
        alt: "Cat",
      },
      {
        id: "h2",
        src: "https://images.deepai.org/art-image/6277c8a2de654fd9bdf020e93b0e48db/cartoon-image-of-a-cute-bumble-bee.jpg",
        alt: "Bee",
      },
      {
        id: "h4",
        src: "https://images.deepai.org/art-image/6b64cfd2e3d344d4a4cf97778e16f4f8/cartoon-image-of-a-cute-puppy.jpg",
        alt: "Dog",
      },
      {
        id: "h5",
        src: "https://images.deepai.org/art-image/4fae2d953bc64955bb6994c02cea14e1/cartoon-image-of-a-cute-mouse-c557b3.jpg",
        alt: "Mouse",
      },
    ],
  },
  {
    name: "Magestics",
    images: [
      {
        id: "my1",
        src: "https://images.deepai.org/art-image/376a5e31c16f429f916936a544f06169/cartoon-image-of-a-cute-dragon-a80647.jpg",
        alt: "Dragon",
      },
      {
        id: "my2",
        src: "https://images.deepai.org/art-image/d0b36c003d584dbd9211a7c33fbac0a9/cartoon-image-of-a-cute-smiling-unicorn.jpg",
        alt: "Unicorn",
      },
      {
        id: "my3",
        src: "https://images.deepai.org/art-image/4aad495798ca483d8914b58c57210a92/cartoon-image-of-a-cute-smiling-mermaid-d230d7.jpg",
        alt: "Mermaid",
      },
      {
        id: "my3",
        src: "https://images.deepai.org/art-image/c9466b072f1a47c680856d9c11d13a6c/cartoon-image-of-a-cute-smiling-monster.jpg",
        alt: "Monster",
      },
      {
        id: "my5",
        src: "https://images.deepai.org/art-image/6662f16c9c3a498b92f289bf3a4a87c9/cartoon-image-of-a-cute-smiling-big-foot.jpg",
        alt: "Big Foot",
      },
    ],
  },
  {
    name: "Imaginary Mixes",
    images: [
      {
        id: "i1",
        src: "https://images.deepai.org/art-image/070a1f13fb0c4a428ef6765d6924b1e6/cartoon-image-of-a-cute-smiling-robot-b62354.jpg",
        alt: "Robot",
      },
      {
        id: "i2",
        src: "https://images.deepai.org/art-image/b6a4562add1e4ffdbf2ee6c6e29941b8/cartoon-image-of-a-cute-smiling-pirate-ec6124.jpg",
        alt: "Pirate",
      },
      {
        id: "i3",
        src: "https://images.deepai.org/art-image/005ea9019ec943c484b6112290fd85c3/cartoon-image-of-a-cute-smiling-princess-f15a70.jpg",
        alt: "Princess",
      },
      {
        id: "i4",
        src: "https://images.deepai.org/art-image/05cfe1e199b9421b8d12edc4b1b2a3ab/cartoon-image-of-a-cute-smiling-cowboy-cd1fba.jpg",
        alt: "Cowboy",
      },
      {
        id: "i5",
        src: "https://images.deepai.org/art-image/f8b89df107214afc87c980bf66c15b07/cartoon-image-of-a-cute-smiling-astronaut-52d7c1.jpg",
        alt: "Astronaut",
      },
    ],
  },
];

export default categoriesData;
