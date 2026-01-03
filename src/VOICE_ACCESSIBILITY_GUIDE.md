# Voice Accessibility Mode - User Guide

## Overview

The **Voice Accessibility Mode** is a comprehensive assistive feature designed to enable blind and visually impaired users to complete the entire voting process using voice guidance and voice commands only.

## Key Features

### ✅ Complete Voice-Guided Flow
- Step-by-step voice instructions from start to finish
- No manual interaction required (keyboard/mouse optional)
- Clear, slow, calm voice feedback optimized for accessibility

### 🎤 Voice Commands Supported

#### Global Commands (Available on all pages)
| Command | Action |
|---------|--------|
| "Repeat" | Repeat current instruction |
| "Back" / "Previous" | Go to previous page |
| "Cancel" / "Exit" | Exit voice mode |

#### Page-Specific Commands

**Landing Page:**
- "Start Voting" - Begin registration
- "View Results" - See election results

**Registration Page:**
- "Ready" - Start form filling
- "Name" - Input name field
- "Aadhaar" - Input Aadhaar field
- "Phone" - Input phone field
- "Send OTP" / "Submit" - Submit registration

**OTP Verification:**
- "Resend" - Request new OTP
- "Verify" - Submit OTP

**Ballot Page (Voting):**
- "Candidate [number]" - Select candidate by number (e.g., "Candidate 1")
- "[Candidate name]" - Select by name (e.g., "Rahul")
- "List Candidates" - Hear all candidates again
- "Confirm" - Confirm and cast vote
- "Change" - Change selection

**Confirmation Page:**
- "Download Receipt" - Download vote receipt
- "Dashboard" - Return to dashboard
- "View Results" - See election results
- "Repeat Receipt" - Hear receipt ID again

## How to Use

### 1. Enable Voice Mode

Click the large **microphone button** at the bottom-right corner of any page. The button will:
- Turn **green** when voice mode is active
- Show a pulsing animation when listening
- Display a speaker icon when speaking

### 2. Follow Voice Instructions

The system will:
- Welcome you and explain available options
- Guide you through each step
- Wait for your response
- Confirm your actions

### 3. Speak Clearly

Tips for best results:
- Speak clearly and at normal speed
- Wait for the system to finish speaking before responding
- Use the exact command words when possible
- If not understood, the system will ask you to repeat

### 4. Visual Feedback (for supervisors)

The voice overlay panel shows:
- **Current Step** - Where you are in the process
- **Live Transcript** - All spoken dialogue (system & user)
- **Status Indicators** - Speaking/Listening states
- **Voice Commands** - Quick reference guide

## Complete Voting Flow

### Step 1: Welcome
**System says:** "Welcome to the National E-Voting Portal..."
**You say:** "Start Voting"

### Step 2: Registration
**System says:** "Please say your full name"
**You say:** "[Your name]"

**System says:** "Please say your Aadhaar number, digit by digit"
**You say:** "One two three..." (12 digits)

**System says:** "Please say your mobile number"
**You say:** "Nine eight seven..." (10 digits)

**System says:** "Say 'Send OTP' when ready"
**You say:** "Send OTP"

### Step 3: OTP Verification
**System says:** "Please say your 6-digit OTP code"
**You say:** "One two three four five six"

**System says:** "OTP verified successfully"

### Step 4: Ballot Selection
**System says:** "There are 3 candidates. Candidate 1: Rahul Sharma, Party A. Candidate 2: Ananya Verma, Party B..."
**You say:** "Candidate 2" (or "Ananya")

**System says:** "You selected Ananya Verma from Party B. Say 'Confirm' to vote"
**You say:** "Confirm"

**System says:** "You are about to cast your vote for Ananya Verma. This cannot be undone. Say confirm to proceed"
**You say:** "Confirm"

### Step 5: Confirmation
**System says:** "Your vote has been successfully recorded. Your receipt ID is..."
**You say:** "Download Receipt"

**System says:** "Your vote receipt has been downloaded"

## Privacy & Security

### ✅ Local Processing
- All voice recognition happens **in your browser**
- **No audio is transmitted** to external servers
- Uses browser's built-in Web Speech API

### ✅ Demo Mode Notice
- Clearly marked as demonstration feature
- Educational purposes only
- Not connected to real Aadhaar/UIDAI systems

### ✅ Accessibility Compliance
- Follows WCAG 2.1 Level AA guidelines
- No time limits or rushed interactions
- Allows unlimited repetition

## Browser Compatibility

### ✅ Supported Browsers
- **Chrome** (Desktop & Mobile) - Full support
- **Edge** (Desktop & Mobile) - Full support
- **Safari** (Desktop & Mobile) - Full support
- **Samsung Internet** - Full support

### ⚠️ Microphone Permission Required
The browser will ask for microphone permission when you first enable voice mode. You must grant permission for the feature to work.

## Troubleshooting

### Voice Not Working?
1. Check microphone permission in browser settings
2. Ensure microphone is not muted
3. Try speaking more clearly
4. Check if browser supports Web Speech API

### System Not Hearing Me?
1. Wait for the listening indicator (pulsing red)
2. Speak after the system finishes speaking
3. Reduce background noise
4. Try using headphones with built-in mic

### Wrong Command Recognized?
1. Say "Repeat" to hear instructions again
2. Speak more slowly and clearly
3. Use exact command words
4. Say "Cancel" to exit and try again

## Technical Details

### Components
- **VoiceAccessibilityButton** - Floating activation button
- **VoiceAccessibilityOverlay** - Transcript and status panel
- **VoiceAccessibilityContext** - State management
- **useVoiceGuide Hook** - Page-specific guidance logic

### APIs Used
- **Web Speech API (SpeechRecognition)** - Voice input
- **Web Speech API (SpeechSynthesis)** - Voice output
- Both run entirely client-side

### Voice Settings
- **Language:** English (India) - en-IN
- **Speech Rate:** 0.85 (slower for accessibility)
- **Pitch:** 1.0 (normal)
- **Volume:** 1.0 (maximum)

## Feedback & Support

This is a **demonstration feature** to showcase accessibility capabilities. In a production system, users would have access to:
- Dedicated helpline
- Text-based alternatives
- Multi-language voice support
- Advanced voice customization

---

**Last Updated:** December 2024  
**Version:** 1.0.0  
**Feature Status:** ✅ Fully Implemented
