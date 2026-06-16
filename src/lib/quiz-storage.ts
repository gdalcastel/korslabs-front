export const QUIZ_STORAGE_KEY = 'korlabs-quiz-state';

export function clearQuizStorage(): void {
  try {
    localStorage.removeItem(QUIZ_STORAGE_KEY);
  } catch {
    // ignore quota / private mode errors
  }
}
