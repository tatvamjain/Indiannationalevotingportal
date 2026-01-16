# Voice Language Selection Feature

## Overview
The e-Voting portal now supports bilingual voice accessibility in **English** and **Hindi (हिंदी)**. When users activate voice mode, they are first prompted to select their preferred language, which then controls both the UI text and all voice guidance throughout the voting process.

## How It Works

### 1. Activating Voice Mode
- Click the **Voice Mode** button (microphone icon) in the bottom-right corner
- A language selection modal will appear automatically

### 2. Language Selection

#### Via Voice Commands:
The system will speak a prompt in both English and Hindi:
- **English**: "Welcome to voice mode. What language do you prefer? Say Hindi language for Hindi, or English language for English."
- **Hindi**: "वॉइस मोड में आपका स्वागत है। आप किस भाषा को पसंद करते हैं? हिंदी के लिए हिंदी भाषा कहें, या अंग्रेजी के लिए इंग्लिश लैंग्वेज कहें।"

**Supported Voice Commands:**
- For English: Say "English language" or "अंग्रेजी भाषा"
- For Hindi: Say "Hindi language" or "हिंदी भाषा"

#### Via Manual Selection:
- Click the **English** button for English
- Click the **हिंदी (Hindi)** button for Hindi

### 3. Language Changes
Once a language is selected:
- ✅ All UI text switches to the selected language
- ✅ All voice announcements use the selected language
- ✅ Voice recognition switches to the selected language (en-IN or hi-IN)
- ✅ The preference is saved for future sessions (persists in localStorage)

### 4. Using the System After Language Selection
After selecting your language, the system will:
1. Confirm your selection in the chosen language
2. Automatically proceed to the current page's voice guidance
3. Continue using the selected language for all interactions

## Bilingual Voice Commands

### Global Commands (Available on All Pages)

| English | Hindi | Action |
|---------|-------|--------|
| "Repeat" or "Again" | "दोहराएं" or "फिर से" | Repeat current instruction |
| "Cancel" or "Exit" | "रद्द" or "बाहर" | Exit voice mode |
| "Back" or "Previous" | "वापस" or "पिछला" | Go to previous page |
| "Confirm" or "Yes" | "पुष्टि करें" or "हां" | Confirm action |

### Landing Page Commands

| English | Hindi | Action |
|---------|-------|--------|
| "Start Voting" or "Register" | "मतदान शुरू करें" or "पंजीकरण" | Navigate to registration |
| "View Results" or "Results" | "परिणाम देखें" or "परिणाम" | Navigate to results |

### Dashboard Commands

| English | Hindi | Action |
|---------|-------|--------|
| "Vote" | "वोट" | Proceed to ballot |
| "Results" | "परिणाम" | View election results |

## Technical Implementation

### Key Components
1. **VoiceLanguageSelector** - Modal for language selection at voice mode activation
2. **VoiceAccessibilityContext** - Manages voice language state and speech synthesis/recognition
3. **voiceTranslations.ts** - Contains translated voice messages
4. **useVoiceGuide hook** - Provides bilingual voice command support

### Language Persistence
- Voice language preference is stored in `localStorage` as `voiceLanguage`
- UI language preference is stored in `localStorage` as `language`
- Both are synchronized when changed via voice mode

### Speech Synthesis
- English uses `en-IN` voice (Indian English)
- Hindi uses `hi-IN` voice (Indian Hindi)
- Speech rate is set to 0.85 for better accessibility

### Speech Recognition
- Automatically switches between `en-IN` and `hi-IN` based on selected language
- Supports both English and Hindi commands regardless of current language for better accessibility

## User Experience Flow

```
User clicks Voice Mode Button
    ↓
Language Selection Modal appears
    ↓
System speaks prompt in English, then Hindi
    ↓
User says language preference OR clicks button
    ↓
System confirms selection in chosen language
    ↓
Modal closes
    ↓
Page-specific voice guidance begins in selected language
    ↓
All subsequent interactions use selected language
```

## Accessibility Features
- **Bilingual prompts**: Always speaks in both languages during selection for maximum accessibility
- **Visual feedback**: Shows listening/speaking status with animated badges
- **Manual fallback**: Button options available if voice is unclear
- **Persistent preference**: Language choice saved across sessions
- **Current language indicator**: Always shows selected language in overlay

## Testing the Feature

### Test English Flow:
1. Click Voice Mode button
2. Wait for bilingual prompt
3. Say "English language"
4. System confirms "English language selected. Proceeding."
5. Verify all voice messages are in English

### Test Hindi Flow:
1. Click Voice Mode button
2. Wait for bilingual prompt
3. Say "Hindi language" or "हिंदी भाषा"
4. System confirms "हिंदी भाषा चयनित। आगे बढ़ रहे हैं।"
5. Verify all voice messages are in Hindi
6. Verify UI text is in Hindi

### Test Language Switching:
1. Select English
2. Navigate through a few pages
3. Turn off voice mode
4. Turn on voice mode again
5. Select Hindi
6. Verify all UI and voice switches to Hindi

## Notes
- The system uses the browser's built-in Web Speech API
- Hindi speech synthesis quality depends on browser support
- Chrome/Edge browsers have the best Hindi voice support
- Internet connection may be required for speech synthesis in some browsers
