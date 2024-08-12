const questions: string[] = [
    "Was ist deine Lieblingsprogrammiersprache?",
    "Ananas auf Pizza?",
    "Auf welche Module freust du dich?",
    "Mac, Windows oder Linux?",
    "Kaffee oder Tee?",
    "Ohne was könntest du nicht leben?",
    "Wie viele Tabs sind in deinem Browser normalerweise offen?",
    "Welcher Videospiel-Charakter wärst du gerne?",
    "Welche Musik hörst du beim Lernen?"
];


export default function getQuestions(amount: number): string[] {
    return questions.sort(() => Math.random() - 0.5).slice(0, amount);
}
