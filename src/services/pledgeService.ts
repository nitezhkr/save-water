import { supabase, isSupabaseConfigured } from '../lib/supabase';

// Base global pledge counter anchor
export const BASE_PLEDGE_COUNT = 1248320;

export interface PledgePayload {
  userName: string;
  guardianTitle: string;
  commitments: string[];
}

export interface PledgeSubmissionResult {
  success: boolean;
  totalCount: number;
  pledgeId?: string;
  error?: string;
}

export interface RecentPledge {
  id: string;
  user_name: string;
  guardian_title: string;
}

/**
 * Reads whether the current user has already taken the pledge from localStorage.
 */
export function getLocalPledgeStatus(): {
  hasPledged: boolean;
  userName: string;
  guardianTitle: string;
} {
  try {
    const hasPledged = localStorage.getItem('everydrop_has_pledged') === 'true';
    const userName = localStorage.getItem('everydrop_user_name') || '';
    const guardianTitle = localStorage.getItem('everydrop_guardian_title') || 'Earth Guardian 2050';
    return { hasPledged, userName, guardianTitle };
  } catch {
    return { hasPledged: false, userName: '', guardianTitle: 'Earth Guardian 2050' };
  }
}

/**
 * Fetches the total real-time pledge count from Supabase (or local fallback).
 */
export async function fetchPledgeCount(): Promise<number> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { count, error } = await supabase
        .from('pledges')
        .select('*', { count: 'exact', head: true });

      if (!error && typeof count === 'number') {
        return BASE_PLEDGE_COUNT + count;
      }
      if (error) {
        console.warn('Supabase fetchPledgeCount error:', error.message);
      }
    } catch (err) {
      console.warn('Failed to query Supabase pledges count:', err);
    }
  }

  // Fallback: Read local offset from localStorage
  try {
    const localIncrement = parseInt(localStorage.getItem('everydrop_local_increment') || '0', 10);
    return BASE_PLEDGE_COUNT + (isNaN(localIncrement) ? 0 : localIncrement);
  } catch {
    return BASE_PLEDGE_COUNT;
  }
}

/**
 * Fetches the latest real people who took the pledge to show in the live feed.
 */
export async function fetchRecentPledges(limit = 4): Promise<RecentPledge[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('pledges')
        .select('id, user_name, guardian_title')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (err) {
      console.warn('Failed to fetch recent pledges:', err);
    }
  }
  return [];
}

/**
 * Submits or updates a pledge in Supabase and records it locally.
 */
export async function submitPledgeToSupabase(payload: PledgePayload): Promise<PledgeSubmissionResult> {
  const cleanName = payload.userName.trim() || 'Alex Morgan';
  const cleanTitle = payload.guardianTitle.trim() || 'Earth Guardian 2050';

  let pledgeId = `ED-${Date.now().toString(36).toUpperCase()}`;
  let totalCount = BASE_PLEDGE_COUNT;

  if (isSupabaseConfigured && supabase) {
    try {
      const existingId = localStorage.getItem('everydrop_pledge_id');
      const isUuid = existingId && existingId.length === 36 && existingId.includes('-');

      if (isUuid) {
        // Update the existing pledge row with the user's latest name and title
        const { error: updateErr } = await supabase
          .from('pledges')
          .update({
            user_name: cleanName,
            guardian_title: cleanTitle,
            commitments: payload.commitments,
          })
          .eq('id', existingId);

        if (!updateErr) {
          pledgeId = existingId;
          totalCount = await fetchPledgeCount();
        } else {
          console.warn('Update failed, inserting new:', updateErr.message);
        }
      }

      // If no existing UUID or update failed, insert fresh row
      if (pledgeId.startsWith('ED-')) {
        const { data, error } = await supabase
          .from('pledges')
          .insert([
            {
              user_name: cleanName,
              guardian_title: cleanTitle,
              commitments: payload.commitments,
            },
          ])
          .select('id')
          .single();

        if (!error && data?.id) {
          pledgeId = data.id;
          totalCount = await fetchPledgeCount();
        } else if (error) {
          console.warn('Supabase insert error, saving locally:', error.message);
          totalCount = await fetchPledgeCount() + 1;
        }
      }
    } catch (err) {
      console.warn('Supabase network error, saving locally:', err);
      totalCount = await fetchPledgeCount() + 1;
    }
  } else {
    // Local fallback
    try {
      const curr = parseInt(localStorage.getItem('everydrop_local_increment') || '0', 10);
      const next = curr + 1;
      localStorage.setItem('everydrop_local_increment', next.toString());
      totalCount = BASE_PLEDGE_COUNT + next;
    } catch {
      totalCount = BASE_PLEDGE_COUNT + 1;
    }
  }

  // Persist locally so user doesn't lose their status on reload
  try {
    localStorage.setItem('everydrop_has_pledged', 'true');
    localStorage.setItem('everydrop_user_name', cleanName);
    localStorage.setItem('everydrop_guardian_title', cleanTitle);
    localStorage.setItem('everydrop_pledge_id', pledgeId);
  } catch {
    // Ignore storage quota errors
  }

  return {
    success: true,
    totalCount,
    pledgeId,
  };
}

/**
 * Sets up a real-time subscription for live pledge updates across all connected visitors.
 */
export function subscribeToLivePledges(onNewPledge: (newCount: number) => void): () => void {
  if (!isSupabaseConfigured || !supabase) {
    return () => {};
  }

  const client = supabase;

  try {
    const channel = client
      .channel('public:pledges:realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'pledges' },
        async () => {
          const freshCount = await fetchPledgeCount();
          onNewPledge(freshCount);
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'pledges' },
        async () => {
          const freshCount = await fetchPledgeCount();
          onNewPledge(freshCount);
        }
      )
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  } catch (err) {
    console.warn('Failed to subscribe to Supabase realtime pledges:', err);
    return () => {};
  }
}
