import { Question } from './question';

export class Quiz {
    link: string;
    nameAR: string;
    descriptionAR: string;
    time: number;
    image: string;
    questionNumber: number;
    quizViews: number;
    questions: Question[];
}