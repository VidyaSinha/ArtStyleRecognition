
import { ArtStyle } from "@/components/ArtStyleInfo";

export const artStyles: ArtStyle[] = [
  {
    id: "impressionism",
    name: "Impressionism",
    period: "Late 19th century",
    description: "Impressionism is characterized by small, thin, yet visible brush strokes, open composition, emphasis on accurate depiction of light in its changing qualities, ordinary subject matter, the inclusion of movement as a crucial element of human perception and experience, and unusual visual angles.",
    characteristics: [
      "Small, visible brush strokes",
      "Open composition",
      "Emphasis on light and its changing qualities",
      "Ordinary subject matter",
      "Movement as a key element"
    ],
    exampleArtists: [
      "Claude Monet", "Edgar Degas", "Pierre-Auguste Renoir", "Camille Pissarro"
    ],
    exampleImageUrl: "/impressionism.webp",
    importance: "Impressionism marked a revolutionary break with academic painting traditions, paving the way for modern art movements by emphasizing the artist's perception rather than strict realism."
  },
  {
    id: "cubism",
    name: "Cubism",
    period: "Early 20th century",
    description: "Cubism is an early-20th-century avant-garde art movement that revolutionized European painting and sculpture. In Cubist artwork, objects are analyzed, broken up and reassembled in an abstracted form—instead of depicting objects from a single viewpoint, the artist depicts the subject from a multitude of viewpoints to represent the subject in a greater context.",
    characteristics: [
      "Geometric shapes and forms",
      "Multiple perspectives simultaneously",
      "Flattened, two-dimensional space",
      "Monochromatic color schemes",
      "Fragmentation of objects"
    ],
    exampleArtists: [
      "Pablo Picasso", "Georges Braque", "Juan Gris", "Fernand Léger"
    ],
    exampleImageUrl: "/cubism.webp",
    importance: "Cubism revolutionized European art by introducing multiple viewpoints simultaneously, breaking from traditional perspective and paving the way for abstract art forms."
  },
  {
    id: "surrealism",
    name: "Surrealism",
    period: "1920s to 1950s",
    description: "Surrealism is a cultural movement that began in the early 1920s, and is best known for its visual artworks and writings. The aim was to resolve the previously contradictory conditions of dream and reality into an absolute reality, a super-reality, or surreality.",
    characteristics: [
      "Unexpected juxtapositions",
      "Dream-like scenes and symbolic images",
      "Unconscious imagery",
      "Irrational combinations of imagery",
      "Transformation of objects"
    ],
    exampleArtists: [
      "Salvador Dalí", "René Magritte", "Max Ernst", "Joan Miró"
    ],
    exampleImageUrl: "/surrealism.webp",
    importance: "Surrealism explored the unconscious mind and dream imagery, profoundly influencing visual art, literature, film, and music throughout the 20th century."
  },
  {
    id: "abstract",
    name: "Abstract",
    period: "20th century to present",
    description: "Abstract art uses visual language of shape, form, color and line to create a composition which may exist with a degree of independence from visual references in the world. It can be based on an object, figure or landscape, where forms have been simplified or schematized, or it can be non-representational.",
    characteristics: [
      "Non-representational forms",
      "Bold use of color and shape",
      "Freedom from reality",
      "Emphasis on formal qualities",
      "Expression of feeling rather than fact"
    ],
    exampleArtists: [
      "Wassily Kandinsky", "Piet Mondrian", "Kazimir Malevich", "Jackson Pollock"
    ],
    exampleImageUrl: "/abstract.webp",
    importance: "Abstract art freed artists from the constraints of representing visible reality, allowing direct expression of emotions and ideas through pure form, color, and line."
  },
  {
    id: "pop-art",
    name: "Pop Art",
    period: "1950s to 1970s",
    description: "Pop Art is an art movement that emerged in the United Kingdom and the United States during the mid- to late-1950s. The movement presented a challenge to traditions of fine art by including imagery from popular and mass culture, such as advertising, comic books and mundane cultural objects.",
    characteristics: [
      "Imagery from popular culture",
      "Bold, vibrant colors",
      "Irony and satire",
      "Mass production techniques",
      "Commercial subject matter"
    ],
    exampleArtists: [
      "Andy Warhol", "Roy Lichtenstein", "Richard Hamilton", "Claes Oldenburg"
    ],
    exampleImageUrl: "/pop.webp",
    importance: "Pop Art blurred the boundaries between 'high' and 'low' culture, celebrating mass-produced commercial culture and permanently changing the relationship between art and popular culture."
  },
  {
    id: "renaissance",
    name: "Renaissance",
    period: "14th to 17th century",
    description: "The Renaissance was a fervent period of European cultural, artistic, political and economic 'rebirth' following the Middle Ages. Generally described as taking place from the 14th century to the 17th century, the Renaissance promoted the rediscovery of classical philosophy, literature and art.",
    characteristics: [
      "Perspective and depth in painting",
      "Realistic human forms",
      "Classical themes and motifs",
      "Harmony and balance",
      "Anatomical accuracy"
    ],
    exampleArtists: [
      "Leonardo da Vinci", "Michelangelo", "Raphael", "Sandro Botticelli"
    ],
    exampleImageUrl: "https://images.unsplash.com/photo-1577083288073-40892c0860a4",
    importance: "The Renaissance revolutionized artistic techniques and subject matter, establishing foundational principles of Western art that influenced all subsequent movements."
  },
  {
    id: "abstract-expressionism",
    name: "Abstract Expressionism",
    period: "1940s to 1950s",
    description: "Abstract Expressionism was an American post-World War II art movement. It was the first specifically American movement to achieve international influence and put New York City at the center of the western art world, a role formerly filled by Paris.",
    characteristics: [
      "Spontaneous creation",
      "Emotional intensity",
      "Large canvases",
      "Gestural brush strokes",
      "Non-representational imagery"
    ],
    exampleArtists: [
      "Jackson Pollock", "Mark Rothko", "Willem de Kooning", "Franz Kline"
    ],
    exampleImageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262",
    importance: "Abstract Expressionism shifted the center of Western art from Paris to New York and established American artistic independence, emphasizing individual expression and artistic freedom."
  },
  {
    id: "art-nouveau",
    name: "Art Nouveau",
    period: "1890 to 1910",
    description: "Art Nouveau is an international style of art, architecture, and applied art, characterized by highly-stylized, flowing, curvilinear designs often incorporating floral and other plant-inspired motifs.",
    characteristics: [
      "Organic, flowing lines",
      "Floral and plant motifs",
      "Asymmetrical designs",
      "Integration of different art forms",
      "Intricate details"
    ],
    exampleArtists: [
      "Alphonse Mucha", "Gustav Klimt", "Antoni Gaudí", "Louis Comfort Tiffany"
    ],
    exampleImageUrl: "/art-nouveau.webp",
    importance: "Art Nouveau bridged the gap between fine and applied arts, influencing architecture, furniture, jewelry, and graphic design with its organic aesthetics."
  },
  {
    id: "baroque",
    name: "Baroque",
    period: "17th to mid-18th century",
    description: "The Baroque style used exaggerated motion and clear, easily interpreted detail to produce drama, tension, exuberance, and grandeur in sculpture, painting, architecture, literature, dance, and music.",
    characteristics: [
      "Dramatic use of light and shadow",
      "Grandeur and opulence",
      "Dynamic composition",
      "Emotional intensity",
      "Rich color palettes"
    ],
    exampleArtists: [
      "Caravaggio", "Rembrandt", "Peter Paul Rubens", "Gian Lorenzo Bernini"
    ],
    exampleImageUrl: "baroque.webp",
    importance: "Baroque art expressed the triumph of the Catholic Church and absolute monarchies through emotional intensity, dynamism, and theatrical effects."
  },
  {
    id: "expressionism",
    name: "Expressionism",
    period: "Early 20th century",
    description: "Expressionism is a modernist movement, initially in poetry and painting, originating in Germany at the beginning of the 20th century. Its typical trait is to present the world solely from a subjective perspective, distorting it radically for emotional effect in order to evoke moods or ideas.",
    characteristics: [
      "Emotional distortion",
      "Intense colors",
      "Exaggerated forms",
      "Rejection of realism",
      "Psychological themes"
    ],
    exampleArtists: [
      "Edvard Munch", "Ernst Ludwig Kirchner", "Emil Nolde", "Egon Schiele"
    ],
    exampleImageUrl: "expressionism.webp",
    importance: "Expressionism prioritized emotional truth over physical reality, influencing numerous 20th-century art movements and providing a means to process societal trauma."
  },
  {
    id: "post-impressionism",
    name: "Post-Impressionism",
    period: "1886 to 1905",
    description: "Post-Impressionism is a predominantly French art movement that developed roughly between 1886 and 1905, from the last Impressionist exhibition to the birth of Fauvism. Post-Impressionism emerged as a reaction against Impressionists' concern for the naturalistic depiction of light and color.",
    characteristics: [
      "Bold colors",
      "Thick application of paint",
      "Real-life subject matter",
      "Distinctive brushwork",
      "Geometric forms"
    ],
    exampleArtists: [
      "Vincent van Gogh", "Paul Cézanne", "Paul Gauguin", "Georges Seurat"
    ],
    exampleImageUrl: "post-impressionism.webp",
    importance: "Post-Impressionism expanded the boundaries set by Impressionism, providing a foundation for the revolutionary art movements of the 20th century through personal expression and formal innovation."
  },
  {
    id: "contemporary-art",
    name: "Contemporary Art",
    period: "1970s to present",
    description: "Contemporary art is the art of today, produced by artists who are living in our time. It provides an opportunity to reflect on contemporary society and the issues relevant to ourselves, and the world around us.",
    characteristics: [
      "Diverse mediums and practices",
      "Engagement with social issues",
      "Technological experimentation",
      "Cross-cultural influences",
      "Conceptual approaches"
    ],
    exampleArtists: [
      "Ai Weiwei", "Jeff Koons", "Yayoi Kusama", "Banksy"
    ],
    exampleImageUrl: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5",
    importance: "Contemporary art reflects and comments on our globalized, technology-driven world, challenging conventions while addressing social, political, and cultural issues."
  },
  {
    id: "dadaism",
    name: "Dadaism",
    period: "1916 to 1924",
    description: "Dadaism was an art movement of the European avant-garde in the early 20th century, with early centers in Zürich, Switzerland. Developed in reaction to World War I, the Dada movement consisted of artists who rejected the logic, reason, and aestheticism of modern capitalist society.",
    characteristics: [
      "Anti-art sensibilities",
      "Nonsensical elements",
      "Randomness and chance",
      "Photomontage and collage",
      "Ready-made objects"
    ],
    exampleArtists: [
      "Marcel Duchamp", "Man Ray", "Hannah Höch", "Kurt Schwitters"
    ],
    exampleImageUrl: "dadaism.webp",
    importance: "Dadaism challenged conventional definitions of art, pioneering techniques like collage, photomontage, and readymades that profoundly influenced later avant-garde movements."
  },
  {
    id: "street-art",
    name: "Street Art",
    period: "1970s to present",
    description: "Street art is visual art created in public locations, usually unsanctioned artwork executed outside of the context of traditional art venues. The term gained popularity during the graffiti art boom of the early 1980s and continues to be applied to subsequent incarnations.",
    characteristics: [
      "Public spaces as canvas",
      "Social and political messages",
      "Ephemeral nature",
      "Urban aesthetics",
      "Accessibility to all viewers"
    ],
    exampleArtists: [
      "Banksy", "Jean-Michel Basquiat", "Keith Haring", "Shepard Fairey"
    ],
    exampleImageUrl: "streetart.webp",
    importance: "Street art democratized art by bringing it directly to the public, addressing social and political issues while challenging traditional art institutions and ownership."
  },
  {
    id: "bauhaus",
    name: "Bauhaus",
    period: "1919 to 1933",
    description: "The Bauhaus was a German art school operational from 1919 to 1933 that combined crafts and the fine arts, and was famous for the approach to design that it publicized and taught. The Bauhaus style later became one of the most influential currents in modern design and architectural education.",
    characteristics: [
      "Form follows function",
      "Minimalist aesthetic",
      "Geometric shapes",
      "Primary colors",
      "Integration of technology and art"
    ],
    exampleArtists: [
      "Walter Gropius", "Wassily Kandinsky", "Paul Klee", "László Moholy-Nagy"
    ],
    exampleImageUrl: "bauhaus.webp",
    importance: "Bauhaus revolutionized design education and practice, merging fine arts with crafts and laying foundations for modernist architecture, graphic design, and industrial design."
  }
];

// Mock function for AI analysis - in a real app, this would be a call to an AI model
import classifier from '../lib/artStyleClassifier';

export const analyzeArtStyle = async (imageFile: File): Promise<{ styleMatches: { name: string, confidence: number }[] }> => {
  try {
    // Get predictions from the Flask server
    const styleMatches = await classifier.predictStyle(imageFile);
    
    return { styleMatches };
  } catch (error) {
    console.error('Error analyzing art style:', error);
    throw error;
  }
};
