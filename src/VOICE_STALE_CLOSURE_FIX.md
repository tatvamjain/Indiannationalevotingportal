# Voice Command Stale Closure Fix - Quick Reference

## The Problem: Voice Commands Don't Work After Data Loads

### Symptom
- Voice announcement says "There is an active election"
- You say "vote" → microphone stops, nothing happens
- Or you get error: "Command not recognized"
- Database has data, but voice commands act like it doesn't exist

### Root Cause: JavaScript Closure Capture

When you create functions in JavaScript, they **capture** (close over) the variables at the time the function was created, not when it's executed.

```typescript
// State starts empty
const [elections, setElections] = useState([]); // elections = []
const [hasVoted, setHasVoted] = useState(false); // hasVoted = false

// Voice guide initializes immediately
const voiceGuide = useVoiceGuide({
  commands: {
    'vote': () => {
      // ⚠️ These values are CAPTURED from initialization time
      if (hasVoted) { ... }              // hasVoted = false (captured)
      if (elections.length > 0) { ... }  // elections = [] (captured)
    }
  }
});

// Later... database loads data
useEffect(() => {
  loadElections(); // Sets elections = [{ name: "National Election 2024", ... }]
  setHasVoted(false); // Still false
}, []);

// User says "vote"
// The command function runs but still sees: hasVoted = false, elections = []
// Even though the REAL state is: hasVoted = false, elections = [...]
```

## The Solution: Use Refs to Track Current Values

Refs always point to the **current** value, not captured values.

### ❌ WRONG - Commands capture stale state

```typescript
export default function DashboardPage() {
  const [hasVoted, setHasVoted] = useState(false);
  const [elections, setElections] = useState<Election[]>([]);

  const voiceGuide = useVoiceGuide({
    commands: {
      'vote': () => {
        // ⚠️ BUG: Uses captured values from initialization
        if (hasVoted) {
          voiceGuide.speak('Already voted');
        } else if (elections.length > 0) {
          voiceGuide.speak('Navigating to ballot');
          navigate('/ballot');
        }
      }
    }
  });

  useEffect(() => {
    loadElections(); // Updates elections state
  }, []);
}
```

### ✅ CORRECT - Commands use current state via refs

```typescript
export default function DashboardPage() {
  const [hasVoted, setHasVoted] = useState(false);
  const [elections, setElections] = useState<Election[]>([]);

  // Create refs to track current values
  const hasVotedRef = useRef(hasVoted);
  const electionsRef = useRef(elections);

  // Keep refs in sync with state
  useEffect(() => {
    hasVotedRef.current = hasVoted;
    electionsRef.current = elections;
  }, [hasVoted, elections]);

  const voiceGuide = useVoiceGuide({
    commands: {
      'vote': () => {
        // ✅ FIXED: Uses .current to get latest values
        if (hasVotedRef.current) {
          voiceGuide.speak('Already voted', () => {
            voiceGuide.startListening(); // Don't forget to restart!
          });
        } else if (electionsRef.current.length > 0) {
          voiceGuide.speak('Navigating to ballot', () => {
            handleStartVoting(electionsRef.current[0]);
          });
        } else {
          voiceGuide.speak('No elections', () => {
            voiceGuide.startListening();
          });
        }
      }
    }
  });

  useEffect(() => {
    loadElections(); // Updates elections state AND electionsRef
  }, []);
}
```

## Why Refs Work

```typescript
// Initial render
hasVoted = false
hasVotedRef.current = false

// Command function created (captures hasVotedRef object, NOT the value)
const voteCommand = () => {
  if (hasVotedRef.current) { ... } // Reads .current each time it runs
}

// User votes, state updates
hasVoted = true
hasVotedRef.current = true // <-- Updated by useEffect

// User says "vote" again
voteCommand() runs
// hasVotedRef.current now returns TRUE ✅
// Because .current is read at execution time, not capture time
```

## Complete Fix Pattern

### 1. Add imports
```typescript
import { useState, useEffect, useRef } from 'react';
```

### 2. Create refs for state that commands need
```typescript
const [hasVoted, setHasVoted] = useState(false);
const [elections, setElections] = useState([]);

const hasVotedRef = useRef(hasVoted);
const electionsRef = useRef(elections);
```

### 3. Keep refs synchronized
```typescript
useEffect(() => {
  hasVotedRef.current = hasVoted;
  electionsRef.current = elections;
}, [hasVoted, elections]);
```

### 4. Use refs in commands
```typescript
const voiceGuide = useVoiceGuide({
  commands: {
    'my command': () => {
      if (electionsRef.current.length > 0) { // Use .current
        // Command logic
        voiceGuide.speak('Message', () => {
          voiceGuide.startListening(); // Always restart listening!
        });
      }
    }
  }
});
```

## Common Mistakes

### ❌ Mistake 1: Forgetting to update the ref
```typescript
const dataRef = useRef(data);
// ⚠️ BUG: Ref never updates when data changes!
// Need useEffect to sync it
```

### ❌ Mistake 2: Forgetting `.current`
```typescript
if (dataRef) { ... }        // ⚠️ WRONG - checks if ref exists (always true)
if (dataRef.current) { ... } // ✅ CORRECT - checks the value
```

### ❌ Mistake 3: Not restarting listening
```typescript
'vote': () => {
  voiceGuide.speak('Message'); 
  // ⚠️ BUG: Microphone stays stopped!
}

// ✅ FIX:
'vote': () => {
  voiceGuide.speak('Message', () => {
    voiceGuide.startListening(); // Restart!
  });
}
```

## When to Use This Pattern

✅ **Use refs when:**
- Voice commands need to check state that loads asynchronously (database data)
- Commands check values that change during component lifecycle
- You see "command not recognized" even though data exists

❌ **Don't need refs when:**
- Command just navigates (no state checks)
- Command uses props/params, not component state
- State is static (doesn't change after mount)

## Examples in Our Codebase

### DashboardPage ✅ Fixed
- Uses `hasVotedRef` and `electionsRef`
- Commands check current voting status and elections
- Works correctly after database loads

### BallotPage ✅ Fixed  
- Uses `selectedCandidateRef`
- Commands can select/confirm current candidate
- Works correctly after user selections

### Other Pages
- SessionResponsePage - No refs needed (just navigates)
- ValidatingSessionPage - No refs needed (transition page)
- BallotLoadingPage - No refs needed (transition page)

## Testing Checklist

After applying this fix:

1. ✅ Open browser console
2. ✅ Enable voice mode
3. ✅ Wait for data to load
4. ✅ Check console for: `🎤 Vote command triggered`
5. ✅ Verify log shows current values: `{ hasVoted: false, electionsCount: 1 }`
6. ✅ Say "vote" → should navigate successfully
7. ✅ Microphone should restart after announcement

## Quick Diagnosis

**Is your command using stale data?**

Add this debug log to your command:
```typescript
'vote': () => {
  console.log('🎤 Command state:', {
    hasVoted,           // Might be stale
    hasVotedRef: hasVotedRef.current, // Always current
    elections: elections.length,
    electionsRef: electionsRef.current.length
  });
  
  // If hasVoted !== hasVotedRef.current → You have stale closures!
}
```

---

**Summary**: Voice commands capture state values at creation time. Use refs to always access current values. Don't forget to restart listening after speaking!

**Created**: December 31, 2024  
**Related**: VOICE_FIXES_SUMMARY.md, VOICE_VOTING_GUIDE.md
