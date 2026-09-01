export type ExamType = 'BCS Preliminary' | 'BCS Written' | 'Bank Jobs' | 'Primary Teacher' | 'NTRCA' | '9th-20th Grade Govt Jobs';

export type SubjectId =
  | 'bangla'
  | 'english'
  | 'bangladesh'
  | 'international'
  | 'geography'
  | 'science'
  | 'ict'
  | 'math'
  | 'mental'
  | 'ethics';

export interface SubjectInfo {
  id: SubjectId;
  name: string;
  englishName: string;
  marks: number;
  iconName: string;
  totalQuestions: number;
  completedQuestions: number;
  accuracy: number;
  topicCompletion: number;
  weakTopics: string[];
  strongTopics: string[];
  topics: StudyTopic[];
}

export interface StudyTopic {
  id: string;
  subjectId: SubjectId;
  title: string;
  banglaTitle: string;
  completionPercent: number;
  isWeak?: boolean;
  isStrong?: boolean;
  shortNotes: string;
  concepts: string[];
  importantFacts: string[];
  keyDates?: { date: string; event: string }[];
  keyPersonalities?: { name: string; role: string; contribution: string }[];
  mnemonics: string[];
  commonTraps: string[];
  examTips: string[];
  relatedQuestionIds: string[];
}

export interface Question {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctAnswer: string;
  explanation: string;
  subjectId: SubjectId;
  subjectName: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  examSource: string; // e.g. "45th BCS Preliminary", "Bangladesh Bank AD 2023"
  year?: number | string;
  isRepeated?: boolean;
  repeatFrequency?: string; // e.g. "৫+ বার এসেছে"
  importanceLevel?: 'Extremely Important' | 'Important' | 'Must Remember';
}

export interface WrongQuestionRecord {
  id: string;
  question: Question;
  userAnswer: string;
  timestamp: number;
  mistakeCount: number;
  lastReviewed?: number;
  notes?: string;
}

export interface Flashcard {
  id: string;
  category: 'Vocabulary' | 'Constitution' | 'Dates' | 'International Orgs' | 'Science Facts' | 'Shortcuts' | 'Geography' | 'Personalities' | 'Mnemonics';
  front: string;
  back: string;
  hint?: string;
  subjectId?: SubjectId;
  mastered?: boolean;
  lastReviewed?: number;
}

export interface CurrentAffairArticle {
  id: string;
  title: string;
  category: 'Bangladesh' | 'International' | 'Economy' | 'Science & Tech' | 'Sports' | 'Appointments' | 'Important Days';
  date: string;
  period: 'Today' | 'This Week' | 'This Month' | 'Last 3 Months' | 'Last 6 Months';
  summary: string;
  importantFacts: string[];
  possibleBcsQuestions: string[];
  miniMcqs: Question[];
}

export interface JobCircular {
  id: string;
  organization: string;
  position: string;
  vacancies: number | string;
  deadline: string;
  eligibility: string;
  salary: string;
  category: 'BCS' | 'Government' | 'Bank' | 'Primary' | 'NTRCA' | 'Defense' | 'Autonomous';
  applicationLink: string;
  importantDates: string;
  isBookmarked?: boolean;
}

export interface UserStats {
  name: string;
  targetExam: ExamType;
  examDate: string; // YYYY-MM-DD
  dailyTargetMCQs: number;
  dailyTargetTopics: number;
  dailyTargetMiniTests: number;
  todaySolvedMCQs: number;
  todayCompletedTopics: number;
  todayCompletedMiniTests: number;
  totalQuestionsSolved: number;
  overallAccuracy: number;
  totalTestsCompleted: number;
  studyStreakDays: number;
  xpPoints: number;
  level: number;
  nationalRank: number;
  district: string;
  university: string;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: number;
  isUnlocked: boolean;
  progress: number;
  maxProgress: number;
}

export interface ExamResult {
  id: string;
  examTitle: string;
  examType: string;
  timestamp: number;
  totalQuestions: number;
  totalMarks: number;
  userScore: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  accuracy: number;
  timeUsedSeconds: number;
  negativeMarksDeducted: number;
  rank: number;
  totalCandidates: number;
  percentile: number;
  subjectScores: {
    subjectId: SubjectId;
    subjectName: string;
    score: number;
    total: number;
    correct: number;
    wrong: number;
  }[];
  weakTopicsIdentified: string[];
  strongTopicsIdentified: string[];
  userAnswers: Record<string, string>; // questionId -> chosen answer
  questions: Question[];
}

export interface StudyPlanItem {
  id: string;
  timeSlot: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  subjectName: string;
  topicName: string;
  durationMinutes: number;
  type: 'Theory' | 'MCQ Practice' | 'Revision' | 'Mini Test';
  isCompleted: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  score: number;
  accuracy: number;
  testsCompleted: number;
  streakDays: number;
  district: string;
  university: string;
  isCurrentUser?: boolean;
}

export interface BookmarkCollection {
  id: string;
  name: string;
  color: string;
  questionIds: string[];
}
