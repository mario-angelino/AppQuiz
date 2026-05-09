import { supabase } from './supabase';
import type { QuizSession, QuizAnswer } from '../types';

export async function saveSession(
  session: Omit<QuizSession, 'id' | 'created_at'>
): Promise<string> {
  if (!supabase) throw new Error('Supabase não configurado');

  const { data, error } = await supabase
    .from('quiz_sessions')
    .insert(session)
    .select('id')
    .single();

  if (error) throw new Error(`saveSession failed: ${error.message}`);
  if (!data?.id) throw new Error('saveSession: no id returned');

  return data.id as string;
}

export async function saveAnswers(
  answers: Omit<QuizAnswer, 'id' | 'created_at'>[]
): Promise<void> {
  if (!supabase) throw new Error('Supabase não configurado');

  const { error } = await supabase.from('quiz_answers').insert(answers);
  if (error) throw new Error(`saveAnswers failed: ${error.message}`);
}

export async function getLeaderboard(): Promise<QuizSession[]> {
  if (!supabase) throw new Error('Supabase não configurado');

  const { data, error } = await supabase
    .from('quiz_sessions')
    .select('id, nickname, total_score, score_iniciante, score_intermediario, score_avancado, faixa, created_at')
    .order('total_score', { ascending: false })
    .order('created_at', { ascending: true })
    .limit(10);

  if (error) throw new Error(`getLeaderboard failed: ${error.message}`);
  return (data ?? []) as QuizSession[];
}
