const questions_ger: string[] = [
    "Was ist deine Lieblingsprogrammiersprache?",
    "Ananas auf Pizza?",
    "Auf welche Module freust du dich?",
    "MacOS, Windows oder Linux?",
    "Kaffee, Tee oder Mate?",
    "Ohne was könntest du nicht leben?",
    "Was ist dein Lieblingsfilm?",
    "Was ist dein Lieblingsbaum?",
    "Ist Rust besser als C oder nicht?",
    "Denkst du in Bildern oder Worten?",
    "Wie viele Tabs sind in deinem Browser normalerweise offen?",
    "Welcher Videospiel-Charakter wärst du gerne?",
    "Was ist etwas, das du gerne können würdest?",
    "Was ist etwas, was du anders machst als andere?",
    "Welche Musik (wenn überhaupt) hörst du beim Lernen?",
    "Was ist dein Lieblingsbuch?",
    "Wenn du nur noch eine Sorte Eiscreme essen könntest, welche wäre es?",
    "Hast du bereits Programmiererfahrung?",
    "Oregano oder Oregano?",
    "Welches Musikinstrument würdest du gerne spielen können?",
    "Was ist die letzte Sache, die du an deinem Computer gemacht hast?"
];


export default function getQuestions(amount: number): string[] {
    return questions_ger.sort(() => Math.random() - 0.5).slice(0, amount);
}
