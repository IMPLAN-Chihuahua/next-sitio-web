export type FaqExtra = {
    readonly id: number;
    text: string;
    url: string;
}

export type FaqItem = {
    readonly id: number;
    question: string;
    answer: string;
    extras: FaqExtra[];
}