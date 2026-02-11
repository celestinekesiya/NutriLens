/* ── Shared types for the entire app ── */

export interface FoodItem {
  name: string;
  estimated_portion: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g: number;
}

export interface TotalNutrition {
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g: number;
}

export interface AnalysisResult {
  foods: FoodItem[];
  total_nutrition: TotalNutrition;
  confidence_score: number;
  analysis_summary: string;
}

export interface AnalysisError {
  error: string;
}

export type AIResponse = AnalysisResult | AnalysisError;

export function isAnalysisError(res: AIResponse): res is AnalysisError {
  return "error" in res;
}

/** A saved analysis entry for history */
export interface HistoryEntry {
  id: string;
  timestamp: number;
  imageUrl: string;
  result: AnalysisResult;
}
