import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from "../../storage/localStorageService";

const ONBOARDING_STORAGE_KEY = "qa-buddy-onboarding-v1";

export type LearningGoal =
  | "beginner"
  | "learning"
  | "interview";

export type OnboardingProfile = {
  completed: boolean;
  goal: LearningGoal | null;
  completedAt: string | null;
};

const defaultProfile: OnboardingProfile = {
  completed: false,
  goal: null,
  completedAt: null,
};

export function loadOnboardingProfile(): OnboardingProfile {
  const storedProfile =
    getStorageItem<Partial<OnboardingProfile>>(
      ONBOARDING_STORAGE_KEY,
      defaultProfile
    );

  return {
    ...defaultProfile,
    ...storedProfile,
  };
}

export function completeOnboarding(
  goal: LearningGoal | null
): OnboardingProfile {
  const profile: OnboardingProfile = {
    completed: true,
    goal,
    completedAt: new Date().toISOString(),
  };

  setStorageItem(ONBOARDING_STORAGE_KEY, profile);

  return profile;
}

export function resetOnboarding(): void {
  removeStorageItem(ONBOARDING_STORAGE_KEY);
}
