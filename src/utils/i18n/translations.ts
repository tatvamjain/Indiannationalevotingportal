export interface Translations {
  // Common
  appTitle: string;
  appSubtitle: string;
  welcome: string;
  loading: string;
  submit: string;
  cancel: string;
  next: string;
  back: string;
  close: string;
  confirm: string;
  yes: string;
  no: string;
  
  // Header & Navigation
  home: string;
  about: string;
  results: string;
  adminPortal: string;
  logout: string;
  
  // Landing Page
  landingTitle: string;
  landingSubtitle: string;
  landingDescription: string;
  getStarted: string;
  features: string;
  secureVoting: string;
  secureVotingDesc: string;
  aadhaarVerification: string;
  aadhaarVerificationDesc: string;
  instantResults: string;
  instantResultsDesc: string;
  
  // Registration
  registration: string;
  registerToVote: string;
  aadhaarNumber: string;
  aadhaarPlaceholder: string;
  fullName: string;
  fullNamePlaceholder: string;
  phoneNumber: string;
  phonePlaceholder: string;
  registerNow: string;
  alreadyRegistered: string;
  loginHere: string;
  
  // Login
  login: string;
  voterLogin: string;
  enterAadhaar: string;
  proceedToOTP: string;
  dontHaveAccount: string;
  registerHere: string;
  
  // OTP Verification
  otpVerification: string;
  otpSentTo: string;
  enterOTP: string;
  resendOTP: string;
  verifyOTP: string;
  otpInstructions: string;
  
  // Dashboard
  dashboard: string;
  voterDashboard: string;
  welcomeMessage: string;
  sessionStatus: string;
  status: string;
  active: string;
  inactive: string;
  userID: string;
  sessionID: string;
  hasVoted: string;
  noActiveElections: string;
  noElectionsDesc: string;
  electionID: string;
  schedule: string;
  constituency: string;
  votedSuccess: string;
  votedThankYou: string;
  notVotedYet: string;
  castVoteSoon: string;
  proceedToVote: string;
  viewElectionResults: string;
  
  // Voter Info
  voterInformation: string;
  name: string;
  aadhaar: string;
  voteReceipt: string;
  receiptID: string;
  noReceipt: string;
  viewReceiptHistory: string;
  
  // Instructions
  instructions: string;
  instruction1: string;
  instruction2: string;
  instruction3: string;
  instruction4: string;
  
  // Ballot
  ballot: string;
  selectCandidate: string;
  candidateName: string;
  party: string;
  description: string;
  confirmVote: string;
  
  // Results
  electionResults: string;
  live: string;
  totalVotesCast: string;
  votersParticipated: string;
  voterTurnout: string;
  registeredVoters: string;
  leadingCandidate: string;
  numberOfCandidates: string;
  inThisElection: string;
  voteDistribution: string;
  realtimeVoteCounts: string;
  noVotesYet: string;
  leading: string;
  selectElection: string;
  
  // Confirmation
  voteConfirmed: string;
  voteSubmitted: string;
  thankYouVoting: string;
  receiptGenerated: string;
  downloadReceipt: string;
  backToDashboard: string;
  
  // Admin
  adminDashboard: string;
  electionManagement: string;
  candidateManagement: string;
  reports: string;
  databaseSetup: string;
  
  // Footer
  disclaimer: string;
  disclaimerText: string;
  privacyPolicy: string;
  termsOfService: string;
  contactUs: string;
  copyrightText: string;
  
  // How It Works
  howItWorks: string;
  howItWorksSubtitle: string;
  step1Title: string;
  step1Description: string;
  step2Title: string;
  step2Description: string;
  step3Title: string;
  step3Description: string;
  step4Title: string;
  step4Description: string;
  
  // Contact Page
  contactPageTitle: string;
  contactPageSubtitle: string;
  supportEmail: string;
  phoneDemo: string;
  demoPhoneDisclaimer: string;
  feedbackForm: string;
  yourName: string;
  yourEmail: string;
  yourMessage: string;
  messagePlaceholder: string;
  sendMessage: string;
  formSubmittedTitle: string;
  formSubmittedMessage: string;
  
  // Voice Voting
  voiceVotingTitle: string;
  voiceVotingDescription: string;
  voiceStartVoting: string;
  voiceStopVoting: string;
  voiceListening: string;
  voiceActive: string;
  voiceConfirming: string;
  voiceStartListening: string;
  voiceStopListening: string;
  voiceMute: string;
  voiceHelp: string;
  voiceYouSaid: string;
  voiceSelected: string;
  voiceWelcomeMessage: string;
  voiceCandidateListIntro: string;
  voiceSelectInstructions: string;
  voiceSelectedCandidate: string;
  voiceConfirmSelection: string;
  voiceVoteConfirmed: string;
  voiceVotingCancelled: string;
  voiceNoSpeechDetected: string;
  voiceBrowserNotSupported: string;
  voiceInstructions: string;
  voiceInstructionsSummary: string;
  voiceTip1: string;
  voiceTip2: string;
  voiceTip3: string;
}

export const translations: Record<string, Translations> = {
  en: {
    // Common
    appTitle: "Indian National e-Voting Portal",
    appSubtitle: "Secure Digital Democracy",
    welcome: "Welcome",
    loading: "Loading...",
    submit: "Submit",
    cancel: "Cancel",
    next: "Next",
    back: "Back",
    close: "Close",
    confirm: "Confirm",
    yes: "Yes",
    no: "No",
    
    // Header & Navigation
    home: "Home",
    about: "About",
    results: "Results",
    adminPortal: "Admin Portal",
    logout: "Logout",
    
    // Landing Page
    landingTitle: "Democratic Voting, Digitally Empowered",
    landingSubtitle: "Participate in India's digital democracy with secure, Aadhaar-verified electronic voting",
    landingDescription: "A demonstration platform for secure electronic voting using Aadhaar-based verification. This is a proof-of-concept system for educational purposes.",
    getStarted: "Get Started",
    features: "Features",
    secureVoting: "Secure Voting",
    secureVotingDesc: "End-to-end encrypted voting process with blockchain-inspired verification",
    aadhaarVerification: "Aadhaar Verification",
    aadhaarVerificationDesc: "OTP-based authentication ensures one vote per citizen",
    instantResults: "Instant Results",
    instantResultsDesc: "Real-time vote counting and transparent result display",
    
    // Registration
    registration: "Registration",
    registerToVote: "Register to Vote",
    aadhaarNumber: "Aadhaar Number",
    aadhaarPlaceholder: "Enter 12-digit Aadhaar number",
    fullName: "Full Name",
    fullNamePlaceholder: "Enter your full name as per Aadhaar",
    phoneNumber: "Phone Number",
    phonePlaceholder: "Enter 10-digit phone number",
    registerNow: "Register Now",
    alreadyRegistered: "Already registered?",
    loginHere: "Login here",
    
    // Login
    login: "Login",
    voterLogin: "Voter Login",
    enterAadhaar: "Enter your Aadhaar number to proceed",
    proceedToOTP: "Proceed to OTP Verification",
    dontHaveAccount: "Don't have an account?",
    registerHere: "Register here",
    
    // OTP Verification
    otpVerification: "OTP Verification",
    otpSentTo: "OTP sent to",
    enterOTP: "Enter the 6-digit OTP sent to your registered phone number",
    resendOTP: "Resend OTP",
    verifyOTP: "Verify OTP",
    otpInstructions: "Please enter the OTP sent to your mobile number. Do not share this OTP with anyone.",
    
    // Dashboard
    dashboard: "Dashboard",
    voterDashboard: "Voter Dashboard",
    welcomeMessage: "Welcome to your demo voting portal",
    sessionStatus: "Session Status",
    status: "Status",
    active: "Active",
    inactive: "Inactive",
    userID: "User ID",
    sessionID: "Session ID",
    hasVoted: "Has Voted",
    noActiveElections: "No Active Elections",
    noElectionsDesc: "There are currently no active elections. Check back later.",
    electionID: "Election ID",
    schedule: "Schedule",
    constituency: "Constituency",
    votedSuccess: "You have successfully cast your vote in this election.",
    votedThankYou: "Thank you for participating in the democratic process!",
    notVotedYet: "You have not voted in this election yet.",
    castVoteSoon: "Cast your vote before the window closes.",
    proceedToVote: "Proceed to Vote",
    viewElectionResults: "View Election Results",
    
    // Voter Info
    voterInformation: "Voter Information",
    name: "Name",
    aadhaar: "Aadhaar",
    voteReceipt: "Vote Receipt",
    receiptID: "Receipt ID",
    noReceipt: "No receipt available. Vote to generate receipt.",
    viewReceiptHistory: "View Receipt History",
    
    // Instructions
    instructions: "Instructions",
    instruction1: "Only one vote allowed per Aadhaar ID per election",
    instruction2: "Select one candidate from the ballot",
    instruction3: "Review your choice before confirming",
    instruction4: "Save your vote receipt for verification",
    
    // Ballot
    ballot: "Ballot",
    selectCandidate: "Select Your Candidate",
    candidateName: "Candidate Name",
    party: "Party",
    description: "Description",
    confirmVote: "Confirm Vote",
    
    // Results
    electionResults: "Election Results",
    live: "Live",
    totalVotesCast: "Total Votes Cast",
    votersParticipated: "voters participated",
    voterTurnout: "Voter Turnout",
    registeredVoters: "of registered voters",
    leadingCandidate: "Leading Candidate",
    numberOfCandidates: "Number of Candidates",
    inThisElection: "in this election",
    voteDistribution: "Vote Distribution",
    realtimeVoteCounts: "Real-time vote counts per candidate",
    noVotesYet: "No votes cast yet",
    leading: "Leading",
    selectElection: "Select Election",
    
    // Confirmation
    voteConfirmed: "Vote Confirmed",
    voteSubmitted: "Your vote has been successfully submitted and recorded",
    thankYouVoting: "Thank you for participating in this democratic process",
    receiptGenerated: "Receipt Generated",
    downloadReceipt: "Download Receipt",
    backToDashboard: "Back to Dashboard",
    
    // Admin
    adminDashboard: "Admin Dashboard",
    electionManagement: "Election Management",
    candidateManagement: "Candidate Management",
    reports: "Reports",
    databaseSetup: "Database Setup",
    
    // Footer
    disclaimer: "Disclaimer",
    disclaimerText: "This is a demonstration e-voting portal for educational purposes only. Not affiliated with UIDAI or Election Commission of India.",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    contactUs: "Contact Us",
    copyrightText: "Demo Project. All Rights Reserved.",
    
    // How It Works
    howItWorks: "How It Works",
    howItWorksSubtitle: "Simple steps to cast your vote in this demonstration portal",
    step1Title: "Register",
    step1Description: "Enter your demo details (Name, Aadhaar, Mobile)",
    step2Title: "Verify OTP",
    step2Description: "Verify with mock OTP sent to your mobile",
    step3Title: "Vote",
    step3Description: "Choose your candidate from the ballot",
    step4Title: "Receipt",
    step4Description: "Download your vote confirmation receipt",
    
    // Contact Page
    contactPageTitle: "Contact Us",
    contactPageSubtitle: "Get in touch with our support team for any queries or feedback",
    supportEmail: "Support Email",
    phoneDemo: "Phone (Demo)",
    demoPhoneDisclaimer: "For demonstration purposes only.",
    feedbackForm: "Feedback Form",
    yourName: "Your Name",
    yourEmail: "Your Email",
    yourMessage: "Your Message",
    messagePlaceholder: "Please share your feedback or queries...",
    sendMessage: "Send Message",
    formSubmittedTitle: "Thank You!",
    formSubmittedMessage: "Your message has been received. This is a demo portal, so no actual email will be sent.",
    
    // Voice Voting
    voiceVotingTitle: "Voice Voting Assistant",
    voiceVotingDescription: "Vote using voice commands for enhanced accessibility",
    voiceStartVoting: "Start Voice Voting",
    voiceStopVoting: "Stop Voice Voting",
    voiceListening: "Listening...",
    voiceActive: "Active",
    voiceConfirming: "Confirming",
    voiceStartListening: "Start Listening",
    voiceStopListening: "Stop Listening",
    voiceMute: "Mute",
    voiceHelp: "Help",
    voiceYouSaid: "You said",
    voiceSelected: "Selected",
    voiceWelcomeMessage: "Welcome to voice voting for {election}.",
    voiceCandidateListIntro: "The candidates are:",
    voiceSelectInstructions: "Say the number or name of your preferred candidate.",
    voiceSelectedCandidate: "You have selected {name} from {party}.",
    voiceConfirmSelection: "Please confirm your vote for {name} from {party}. Say confirm to proceed.",
    voiceVoteConfirmed: "Your vote has been confirmed.",
    voiceVotingCancelled: "Voice voting cancelled.",
    voiceNoSpeechDetected: "No speech detected. Please try again.",
    voiceBrowserNotSupported: "Voice voting is not supported in your browser. Please use Chrome, Edge, or Safari.",
    voiceInstructions: "Voice voting instructions: Say start to begin. Listen to the candidate list. Say the number or name of your preferred candidate. Say confirm to finalize your vote. Say help for instructions. Say cancel to stop.",
    voiceInstructionsSummary: "Use voice commands to vote. Say candidate names or numbers. Works in English, Hindi, Tamil, Telugu, and Bengali.",
    voiceTip1: "Speak clearly and wait for the system to respond",
    voiceTip2: "You can say candidate names or numbers (one, two, three...)",
    voiceTip3: "Say 'help' anytime for instructions",
  },
  
  hi: {
    // Common
    appTitle: "भारतीय राष्ट्रीय ई-वोटिंग पोर्टल",
    appSubtitle: "सुरक्षित डिजिटल लोकतंत्र",
    welcome: "स्वागत है",
    loading: "लोड हो रहा है...",
    submit: "जमा करें",
    cancel: "रद्द करें",
    next: "आगे",
    back: "पीछे",
    close: "बंद करें",
    confirm: "पुष्टि करें",
    yes: "हां",
    no: "नहीं",
    
    // Header & Navigation
    home: "होम",
    about: "परिचय",
    results: "परिणाम",
    adminPortal: "प्रशासक पोर्टल",
    logout: "लॉग आउट",
    
    // Landing Page
    landingTitle: "लोकतांत्रिक मतदान, डिजिटल रूप से सशक्त",
    landingSubtitle: "सुरक्षित, आधार-सत्यापित इलेक्ट्रॉनिक मतदान के साथ भारत के डिजिटल लोकतंत्र में भाग लें",
    landingDescription: "आधार-आधारित सत्यापन का उपयोग करके सुरक्षित इलेक्ट्रॉनिक मतदान के लिए एक प्रदर्शन मंच। यह शैक्षिक उद्देश्यों के लिए एक अवधारणा प्रणाली का प्रमाण है।",
    getStarted: "शुरू करें",
    features: "विशेषताएं",
    secureVoting: "सुरक्षित मतदान",
    secureVotingDesc: "ब्लॉकचेन-प्रेरित सत्यापन के साथ एंड-टू-एंड एन्क्रिप्टेड मतदान प्रक्रिया",
    aadhaarVerification: "आधार सत्यापन",
    aadhaarVerificationDesc: "ओटीपी-आधारित प्रमाणीकरण प्रति नागरिक एक वोट सुनिश्चित करता है",
    instantResults: "तत्काल परिणाम",
    instantResultsDesc: "वास्तविक समय वोट गिनती और पारदर्शी परिणाम प्रदर्शन",
    
    // Registration
    registration: "पंजीकरण",
    registerToVote: "मतदान के लिए पंजीकरण करें",
    aadhaarNumber: "आधार संख्या",
    aadhaarPlaceholder: "12 अंकों का आधार नंबर दर्ज करें",
    fullName: "पूरा नाम",
    fullNamePlaceholder: "आधार के अनुसार अपना पूरा नाम दर्ज करें",
    phoneNumber: "फ़ोन नंबर",
    phonePlaceholder: "10 अंकों का फोन नंबर दर्ज करें",
    registerNow: "अभी पंजीकरण करें",
    alreadyRegistered: "पहले से पंजीकृत हैं?",
    loginHere: "यहां लॉगिन करें",
    
    // Login
    login: "लॉगिन",
    voterLogin: "मतदाता लॉगिन",
    enterAadhaar: "आगे बढ़ने के लिए अपना आधार नंबर दर्ज करें",
    proceedToOTP: "ओटीपी सत्यापन के लिए आगे बढ़ें",
    dontHaveAccount: "खाता नहीं है?",
    registerHere: "यहां पंजीकरण करें",
    
    // OTP Verification
    otpVerification: "ओटीपी सत्यापन",
    otpSentTo: "ओटीपी भेजा गया",
    enterOTP: "अपने पंजीकृत फोन नंबर पर भेजे गए 6 अंकों का ओटीपी दर्ज करें",
    resendOTP: "ओटीपी पुनः भेजें",
    verifyOTP: "ओटीपी सत्यापित करें",
    otpInstructions: "कृपया अपने मोबाइल नंबर पर भेजा गया ओटीपी दर्ज करें। इस ओटीपी को किसी के साथ साझा न करें।",
    
    // Dashboard
    dashboard: "डैशबोर्ड",
    voterDashboard: "मतदाता डैशबोर्ड",
    welcomeMessage: "अपने डेमो मतदान पोर्टल में आपका स्वागत है",
    sessionStatus: "सत्र की स्थिति",
    status: "स्थिति",
    active: "सक्रिय",
    inactive: "निष्क्रिय",
    userID: "उपयोगकर्ता आईडी",
    sessionID: "सत्र आईडी",
    hasVoted: "मतदान किया है",
    noActiveElections: "कोई सक्रिय चुनाव नहीं",
    noElectionsDesc: "वर्तमान में कोई सक्रिय चुनाव नहीं हैं। बाद में जांचें।",
    electionID: "चुनाव आईडी",
    schedule: "कार्यक्रम",
    constituency: "निर्वाचन क्षेत्र",
    votedSuccess: "आपने इस चुनाव में सफलतापूर्वक अपना वोट डाला है।",
    votedThankYou: "लोकतांत्रिक प्रक्रिया में भाग लेने के लिए धन्यवाद!",
    notVotedYet: "आपने अभी तक इस चुनाव में मतदान नहीं किया है।",
    castVoteSoon: "विंडो बंद होने से पहले अपना वोट डालें।",
    proceedToVote: "मतदान के लिए आगे बढ़ें",
    viewElectionResults: "चुनाव परिणाम देखें",
    
    // Voter Info
    voterInformation: "मतदाता जानकारी",
    name: "नाम",
    aadhaar: "आधार",
    voteReceipt: "वोट रसीद",
    receiptID: "रसीद आईडी",
    noReceipt: "कोई रसीद उपलब्ध नहीं है। रसीद बनाने के लिए वोट करें।",
    viewReceiptHistory: "रसीद इतिहास देखें",
    
    // Instructions
    instructions: "निर्देश",
    instruction1: "प्रति चुनाव आधार आईडी के लिए केवल एक वोट की अनुमति है",
    instruction2: "मतपत्र से एक उम्मीदवार का चयन करें",
    instruction3: "पुष्टि करने से पहले अपनी पसंद की समीक्षा करें",
    instruction4: "सत्यापन के लिए अपनी वोट रसीद सहेजें",
    
    // Ballot
    ballot: "मतपत्र",
    selectCandidate: "अपना उम्मीदवार चुनें",
    candidateName: "उम्मीदवार का नाम",
    party: "पार्टी",
    description: "विवरण",
    confirmVote: "वोट की पुष्टि करें",
    
    // Results
    electionResults: "चुनाव परिणाम",
    live: "लाइव",
    totalVotesCast: "कुल डाले गए वोट",
    votersParticipated: "मतदाताओं ने भाग लिया",
    voterTurnout: "मतदाता मतदान",
    registeredVoters: "पंजीकृत मतदाताओं का",
    leadingCandidate: "अग्रणी उम्मीदवार",
    numberOfCandidates: "उम्मीदवारों की संख्या",
    inThisElection: "इस चुनाव में",
    voteDistribution: "वोट वितरण",
    realtimeVoteCounts: "प्रति उम्मीदवार वास्तविक समय वोट गिनती",
    noVotesYet: "अभी तक कोई वोट नहीं डाला गया",
    leading: "अग्रणी",
    selectElection: "चुनाव चुनें",
    
    // Confirmation
    voteConfirmed: "वोट की पुष्टि हुई",
    voteSubmitted: "आपका वोट सफलतापूर्वक जमा और रिकॉर्ड किया गया है",
    thankYouVoting: "इस लोकतांत्रिक प्रक्रिया में भाग लेने के लिए धन्यवाद",
    receiptGenerated: "रसीद उत्पन्न हुई",
    downloadReceipt: "रसीद डाउनलोड करें",
    backToDashboard: "डैशबोर्ड पर वापस जाएं",
    
    // Admin
    adminDashboard: "प्रशासक डैशबोर्ड",
    electionManagement: "चुनाव प्रबंधन",
    candidateManagement: "उम्मीदवार प्रबंधन",
    reports: "रिपोर्ट",
    databaseSetup: "डेटाबेस सेटअप",
    
    // Footer
    disclaimer: "अस्वीकरण",
    disclaimerText: "यह केवल शैक्षिक उद्देश्यों के लिए एक प्रदर्शन ई-वोटिंग पोर्टल है। यूआईडीएआई या भारत के चुनाव आयोग से संबद्ध नहीं है।",
    privacyPolicy: "गोपनीयता नीति",
    termsOfService: "सेवा की शर्तें",
    contactUs: "संपर्क करें",
    copyrightText: "डेमो परियोजना। सर्वाधिकार सुरक्षित।",
    
    // How It Works
    howItWorks: "यह कैसे काम करता है",
    howItWorksSubtitle: "इस प्रदर्शन पोर्टल में अपना वोट डालने के सरल चरण",
    step1Title: "पंजीकरण करें",
    step1Description: "अपना डेमो विवरण दर्ज करें (नाम, आधार, मोबाइल)",
    step2Title: "ओटीपी सत्यापित करें",
    step2Description: "अपने मोबाइल पर भेजे गए मॉक ओटीपी से सत्यापित करें",
    step3Title: "मतदान करें",
    step3Description: "मतपत्र से अपना उम्मीदवार चुनें",
    step4Title: "रसीद",
    step4Description: "अपनी वोट पुष्टि रसीद डाउनलोड करें",
    
    // Contact Page
    contactPageTitle: "संपर्क करें",
    contactPageSubtitle: "किसी भी प्रश्न या प्रतिक्रिया के लिए हमारी सहायता टीम से संपर्क करें",
    supportEmail: "सहायता ईमेल",
    phoneDemo: "फोन (डेमो)",
    demoPhoneDisclaimer: "केवल प्रदर्शन उद्देश्यों के लिए।",
    feedbackForm: "प्रतिक्रिया फॉर्म",
    yourName: "आपका नाम",
    yourEmail: "आपका ईमेल",
    yourMessage: "आपका संदेश",
    messagePlaceholder: "कृपया अपनी प्रतिक्रिया या प्रश्न साझा करें...",
    sendMessage: "संदेश भेजें",
    formSubmittedTitle: "धन्यवाद!",
    formSubmittedMessage: "आपका संदेश प्राप्त हो गया है। यह एक डेमो पोर्टल है, इसलिए कोई वास्तविक ईमेल नहीं भेजा जाएगा।",
    
    // Voice Voting
    voiceVotingTitle: "ध्वनि मतदान सहायक",
    voiceVotingDescription: "बेहतर पहुंच के लिए ध्वनि आदेशों का उपयोग करके वोट करें",
    voiceStartVoting: "ध्वनि मतदान शुरू करें",
    voiceStopVoting: "ध्वनि मतदान बंद करें",
    voiceListening: "सुन रहे हैं...",
    voiceActive: "सक्रिय",
    voiceConfirming: "पुष्टि कर रहे हैं",
    voiceStartListening: "सुनना शुरू करें",
    voiceStopListening: "सुनना बंद करें",
    voiceMute: "म्यूट करें",
    voiceHelp: "मदद",
    voiceYouSaid: "आपने कहा",
    voiceSelected: "चयनित",
    voiceWelcomeMessage: "{election} के लिए ध्वनि मतदान में आपका स्वागत है।",
    voiceCandidateListIntro: "उम्मीदवार हैं:",
    voiceSelectInstructions: "अपने पसंदीदा उम्मीदवार की संख्या या नाम कहें।",
    voiceSelectedCandidate: "आपने {party} से {name} को चुना है।",
    voiceConfirmSelection: "कृपया {party} से {name} के लिए अपने वोट की पुष्टि करें। आगे बढ़ने के लिए पुष्टि करें कहें।",
    voiceVoteConfirmed: "आपके वोट की पुष्टि हो गई है।",
    voiceVotingCancelled: "ध्वनि मतदान रद्द किया गया।",
    voiceNoSpeechDetected: "कोई भाषण नहीं मिला। कृपया पुनः प्रयास करें।",
    voiceBrowserNotSupported: "आपके ब्राउज़र में ध्वनि मतदान समर्थित नहीं है। कृपया Chrome, Edge, या Safari का उपयोग करें।",
    voiceInstructions: "ध्वनि मतदान निर्देश: शुरू करने के लिए शुरू कहें। उम्मीदवार सूची सुनें। अपने पसंदीदा उम्मीदवार की संख्या या नाम कहें। अपना वोट अंतिम रूप देने के लिए पुष्टि करें कहें। निर्देशों के लिए मदद कहें। रोकने के लिए रद्द करें कहें।",
    voiceInstructionsSummary: "वोट करने के लिए ध्वनि आदेशों का उपयोग करें। उम्मीदवार के नाम या संख्या कहें। हिंदी, अंग्रेजी, तमिल, तेलुगु और बंगाली में काम करता है।",
    voiceTip1: "स्पष्ट रूप से बोलें और सिस्टम के जवाब का इंतजार करें",
    voiceTip2: "आप उम्मीदवार के नाम या संख्या (एक, दो, तीन...) कह सकते हैं",
    voiceTip3: "निर्देशों के लिए कभी भी 'मदद' कहें",
  },
  
  ta: {
    // Common
    appTitle: "இந்திய தேசிய மின்-வாக்குப் போர்ட்டல்",
    appSubtitle: "பாதுகாப்பான டிஜிட்டல் ஜனநாயகம்",
    welcome: "வரவேற்கிறோம்",
    loading: "ஏற்றுகிறது...",
    submit: "சமர்ப்பிக்கவும்",
    cancel: "ரத்துசெய்",
    next: "அடுத்து",
    back: "பின்",
    close: "மூடு",
    confirm: "உறுதிப்படுத்து",
    yes: "ஆம்",
    no: "இல்லை",
    
    // Header & Navigation
    home: "முகப்பு",
    about: "பற்றி",
    results: "முடிவுகள்",
    adminPortal: "நிர்வாக போர்ட்டல்",
    logout: "வெளியேறு",
    
    // Landing Page
    landingTitle: "ஜனநாயக வாக்களிப்பு, டிஜிட்டல் மூலம் வலுவூட்டப்பட்டது",
    landingSubtitle: "பாதுகாப்பான, ஆதார்-சரிபார்க்கப்பட்ட மின்னணு வாக்களிப்புடன் இந்தியாவின் டிஜிட்டல் ஜனநாயகத்தில் பங்கேற்கவும்",
    landingDescription: "ஆதார் அடிப்படையிலான சரிபார்ப்பைப் பயன்படுத்தி பாதுகாப்பான மின்னணு வாக்களிப்புக்கான ஒரு ஆர்ப்பாட்ட தளம். இது கல்வி நோக்கங்களுக்கான ஒரு கருத்து அமைப்பின் சான்று.",
    getStarted: "தொடங்குங்கள்",
    features: "அம்சங்கள்",
    secureVoting: "பாதுகாப்பான வாக்களிப்பு",
    secureVotingDesc: "பிளாக்செயின்-ஊக்கப்படுத்தப்பட்ட சரிபார்ப்புடன் முழு மறைகுறியாக்கப்பட்ட வாக்களிப்பு செயல்முறை",
    aadhaarVerification: "ஆதார் சரிபார்ப்பு",
    aadhaarVerificationDesc: "OTP-அடிப்படையிலான அங்கீகாரம் ஒரு குடிமகனுக்கு ஒரு வாக்கு உறுதிசெய்கிறது",
    instantResults: "உடனடி முடிவுகள்",
    instantResultsDesc: "நேரடி வாக்கு எண்ணிக்கை மற்றும் வெளிப்படையான முடிவு காட்சி",
    
    // Registration
    registration: "பதிவு",
    registerToVote: "வாக்களிக்க பதிவு செய்யுங்கள்",
    aadhaarNumber: "ஆதார் எண்",
    aadhaarPlaceholder: "12 இலக்க ஆதார் எண்ணை உள்ளிடவும்",
    fullName: "முழு பெயர்",
    fullNamePlaceholder: "ஆதாரின்படி உங்கள் முழு பெயரை உள்ளிடவும்",
    phoneNumber: "தொலைபேசி எண்",
    phonePlaceholder: "10 இலக்க தொலைபேசி எண்ணை உள்ளிடவும்",
    registerNow: "இப்போது பதிவு செய்யுங்கள்",
    alreadyRegistered: "ஏற்கனவே பதிவு செய்துள்ளீர்களா?",
    loginHere: "இங்கே உள்நுழையவும்",
    
    // Login
    login: "உள்நுழைவு",
    voterLogin: "வாக்காளர் உள்நுழைவு",
    enterAadhaar: "தொடர உங்கள் ஆதார் எண்ணை உள்ளிடவும்",
    proceedToOTP: "OTP சரிபார்ப்புக்கு தொடரவும்",
    dontHaveAccount: "கணக்கு இல்லையா?",
    registerHere: "இங்கே பதிவு செய்யுங்கள்",
    
    // OTP Verification
    otpVerification: "OTP சரிபார்ப்பு",
    otpSentTo: "OTP அனுப்பப்பட்டது",
    enterOTP: "உங்கள் பதிவு செய்யப்பட்ட தொலைபேசி எண்ணுக்கு அனுப்பப்பட்ட 6 இலக்க OTP உள்ளிடவும்",
    resendOTP: "OTP மீண்டும் அனுப்பு",
    verifyOTP: "OTP சரிபார்க்கவும்",
    otpInstructions: "உங்கள் மொபைல் எண்ணுக்கு அனுப்பப்பட்ட OTP உள்ளிடவும். இந்த OTP யாருடனும் பகிர வேண்டாம்.",
    
    // Dashboard
    dashboard: "டாஷ்போர்டு",
    voterDashboard: "வாக்காளர் டாஷ்போர்டு",
    welcomeMessage: "உங்கள் டெமோ வாக்களிப்பு போர்ட்டலுக்கு வரவேற்கிறோம்",
    sessionStatus: "அமர்வு நிலை",
    status: "நிலை",
    active: "செயலில்",
    inactive: "செயலற்ற",
    userID: "பயனர் ஐடி",
    sessionID: "அமர்வு ஐடி",
    hasVoted: "வாக்களித்துள்ளார்",
    noActiveElections: "செயலில் உள்ள தேர்தல்கள் இல்லை",
    noElectionsDesc: "தற்போது செயலில் உள்ள தேர்தல்கள் இல்லை. பின்னர் சரிபார்க்கவும்.",
    electionID: "தேர்தல் ஐடி",
    schedule: "அட்டவணை",
    constituency: "தொகுதி",
    votedSuccess: "இந்த தேர்தலில் நீங்கள் வெற்றிகரமாக வாக்களித்துள்ளீர்கள்.",
    votedThankYou: "ஜனநாயக செயல்முறையில் பங்கேற்றமைக்கு நன்றி!",
    notVotedYet: "நீங்கள் இந்த தேர்தலில் இன்னும் வாக்களிக்கவில்லை.",
    castVoteSoon: "சாளரம் மூடும் முன் உங்கள் வாக்கை பதிவு செய்யுங்கள்.",
    proceedToVote: "வாக்களிக்க தொடரவும்",
    viewElectionResults: "தேர்தல் முடிவுகளைக் காண்க",
    
    // Voter Info
    voterInformation: "வாக்காளர் தகவல்",
    name: "பெயர்",
    aadhaar: "ஆதார்",
    voteReceipt: "வாக்கு ரசீது",
    receiptID: "ரசீது ஐடி",
    noReceipt: "ரசீது கிடைக்கவில்லை. ரசீதை உருவாக்க வாக்களிக்கவும்.",
    viewReceiptHistory: "ரசீது வரலாற்றைக் காண்க",
    
    // Instructions
    instructions: "வழிமுறைகள்",
    instruction1: "ஒரு தேர்தலுக்கு ஒரு ஆதார் ஐடிக்கு ஒரே ஒரு வாக்கு மட்டுமே அனுமதிக்கப்படுகிறது",
    instruction2: "வாக்குச்சீட்டில் இருந்து ஒரு வேட்பாளரைத் தேர்ந்தெடுக்கவும்",
    instruction3: "உறுதிப்படுத்தும் முன் உங்கள் தேர்வை மதிப்பாய்வு செய்யவும்",
    instruction4: "சரிபார்ப்புக்காக உங்கள் வாக்கு ரசீதை சேமிக்கவும்",
    
    // Ballot
    ballot: "வாக்குச்சீட்டு",
    selectCandidate: "உங்கள் வேட்பாளரைத் தேர்ந்தெடுக்கவும்",
    candidateName: "வேட்பாளர் பெயர்",
    party: "கட்சி",
    description: "விளக்கம்",
    confirmVote: "வாக்கை உறுதிப்படுத்து",
    
    // Results
    electionResults: "தேர்தல் முடிவுகள்",
    live: "நேரடி",
    totalVotesCast: "மொத்த வாக்குகள்",
    votersParticipated: "வாக்காளர்கள் பங்கேற்றனர்",
    voterTurnout: "வாக்காளர் வாக்குப்பதிவு",
    registeredVoters: "பதிவு செய்யப்பட்ட வாக்காளர்களில்",
    leadingCandidate: "முன்னணி வேட்பாளர்",
    numberOfCandidates: "வேட்பாளர்களின் எண்ணிக்கை",
    inThisElection: "இந்த தேர்தலில்",
    voteDistribution: "வாக்கு விநியோகம்",
    realtimeVoteCounts: "வேட்பாளருக்கு நேரடி வாக்கு எண்ணிக்கை",
    noVotesYet: "இன்னும் வாக்குகள் இல்லை",
    leading: "முன்னணி",
    selectElection: "தேர்தலைத் தேர்ந்தெடுக்கவும்",
    
    // Confirmation
    voteConfirmed: "வாக்கு உறுதிப்படுத்தப்பட்டது",
    voteSubmitted: "உங்கள் வாக்கு வெற்றிகரமாக சமர்ப்பிக்கப்பட்டு பதிவு செய்யப்பட்டுள்ளது",
    thankYouVoting: "இந்த ஜனநாயக செயல்முறையில் பங்கேற்றமைக்கு நன்றி",
    receiptGenerated: "ரசீது உருவாக்கப்பட்டது",
    downloadReceipt: "ரசீதைப் பதிவிறக்கு",
    backToDashboard: "டாஷ்போர்டுக்குத் திரும்பு",
    
    // Admin
    adminDashboard: "நிர்வாக டாஷ்போர்டு",
    electionManagement: "தேர்தல் மேலாண்மை",
    candidateManagement: "வேட்பாளர் மேலாண்மை",
    reports: "அறிக்கைகள்",
    databaseSetup: "தரவுத்தள அமைப்பு",
    
    // Footer
    disclaimer: "மறுப்பு",
    disclaimerText: "இது கல்வி நோக்கங்களுக்காக மட்டுமே ஒரு ஆர்ப்பாட்ட மின்-வாக்களிப்பு போர்ட்டல். UIDAI அல்லது இந்தியத் தேர்தல் ஆணையத்துடன் தொடர்புடையது அல்ல.",
    privacyPolicy: "தனியுரிமை கொள்கை",
    termsOfService: "சேவை விதிமுறைகள்",
    contactUs: "எங்களை தொடர்பு கொள்ளவும்",
    copyrightText: "டெமோ திட்டம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    
    // How It Works
    howItWorks: "இது எப்படி வேலை செய்கிறது",
    howItWorksSubtitle: "இந்த ஆர்ப்பாட்ட போர்ட்டலில் உங்கள் வாக்கை பதிவு செய்வதற்கான எளிய படிகள்",
    step1Title: "பதிவு செய்யுங்கள்",
    step1Description: "உங்கள் டெமோ விவரங்களை உள்ளிடவும் (பெயர், ஆதார், மொபைல்)",
    step2Title: "OTP சரிபார்க்கவும்",
    step2Description: "உங்கள் மொபைலுக்கு அனுப்பப்பட்ட மாதிரி OTP உடன் சரிபார்க்கவும்",
    step3Title: "வாக்களிக்கவும்",
    step3Description: "வாக்குச்சீட்டில் இருந்து உங்கள் வேட்பாளரைத் தேர்ந்தெடுக்கவும்",
    step4Title: "ரசீது",
    step4Description: "உங்கள் வாக்கு உறுதிப்படுத்தல் ரசீதைப் பதிவிறக்கவும்",
    
    // Contact Page
    contactPageTitle: "எங்களை தொடர்பு கொள்ளவும்",
    contactPageSubtitle: "ஏதேனும் கேள்விகள் அல்லது கருத்துக்களுக்கு எங்கள் ஆதரவு குழுவைத் தொடர்பு கொள்ளவும்",
    supportEmail: "ஆதரவு மின்னஞ்சல்",
    phoneDemo: "தொலைபேசி (டெமோ)",
    demoPhoneDisclaimer: "ஆர்ப்பாட்ட நோக்கங்களுக்காக மட்டுமே.",
    feedbackForm: "கருத்து படிவம்",
    yourName: "உங்கள் பெயர்",
    yourEmail: "உங்கள் மின்னஞ்சல்",
    yourMessage: "உங்கள் செய்தி",
    messagePlaceholder: "தயவுசெய்து உங்கள் கருத்து அல்லது கேள்விகளைப் பகிரவும்...",
    sendMessage: "செய்தியை அனுப்பவும்",
    formSubmittedTitle: "நன்றி!",
    formSubmittedMessage: "உங்கள் செய்தி பெறப்பட்டது. இது ஒரு டெமோ போர்ட்டல், எனவே உண்மையான மின்னஞ்சல் அனுப்பப்படாது.",
    
    // Voice Voting
    voiceVotingTitle: "குரல் வாக்களிப்பு உதவியாளர்",
    voiceVotingDescription: "மேம்பட்ட அணுகலுக்கு குரல் கட்டளைகளைப் பயன்படுத்தி வாக்களிக்கவும்",
    voiceStartVoting: "குரல் வாக்களிப்பைத் தொடங்கு",
    voiceStopVoting: "குரல் வாக்களிப்பை நிறுத்து",
    voiceListening: "கேட்கிறது...",
    voiceActive: "செயலில்",
    voiceConfirming: "உறுதிப்படுத்துகிறது",
    voiceStartListening: "கேட்க தொடங்கு",
    voiceStopListening: "கேட்பதை நிறுத்து",
    voiceMute: "முடக்கு",
    voiceHelp: "உதவி",
    voiceYouSaid: "நீங்கள் சொன்னது",
    voiceSelected: "தேர்ந்தெடுக்கப்பட்டது",
    voiceWelcomeMessage: "{election} க்கான குரல் வாக்களிப்புக்கு வரவேற்கிறோம்.",
    voiceCandidateListIntro: "வேட்பாளர்கள்:",
    voiceSelectInstructions: "உங்கள் விருப்பமான வேட்பாளரின் எண் அல்லது பெயரைச் சொல்லுங்கள்.",
    voiceSelectedCandidate: "நீங்கள் {party} இலிருந்து {name} தேர்ந்தெடுத்துள்ளீர்கள்.",
    voiceConfirmSelection: "{party} இலிருந்து {name} க்கான உங்கள் வாக்கை உறுதிப்படுத்தவும். தொடர உறுதிப்படுத்து என்று சொல்லவும்.",
    voiceVoteConfirmed: "உங்கள் வாக்கு உறுதிப்படுத்தப்பட்டது.",
    voiceVotingCancelled: "குரல் வாக்களிப்பு ரத்து செய்யப்பட்டது.",
    voiceNoSpeechDetected: "எந்த பேச்சும் கண்டறியப்படவில்லை. மீண்டும் முயற்சிக்கவும்.",
    voiceBrowserNotSupported: "உங்கள் உலாவியில் குரல் வாக்களிப்பு ஆதரிக்கப்படவில்லை. Chrome, Edge அல்லது Safari பயன்படுத்தவும்.",
    voiceInstructions: "குரல் வாக்களிப்பு வழிமுறைகள்: தொடங்க தொடங்கு என்று சொல்லவும். வேட்பாளர் பட்டியலைக் கேளுங்கள். உங்கள் விருப்பமான வேட்பாளரின் எண் அல்லது பெயரைச் சொல்லுங்கள். உங்கள் வாக்கை இறுதி செய்ய உறுதிப்படுத்து என்று சொல்லவும். வழிமுறைகளுக்கு உதவி என்று சொல்லவும். நிறுத்த ரத்து செய் என்று சொல்லவும்.",
    voiceInstructionsSummary: "வாக்களிக்க குரல் கட்டளைகளைப் பயன்படுத்தவும். வேட்பாளர் பெயர்கள் அல்லது எண்களைச் சொல்லவும். தமிழ், ஆங்கிலம், இந்தி, தெலுங்கு மற்றும் பெங்காலியில் செயல்படும்.",
    voiceTip1: "தெளிவாகப் பேசுங்கள் மற்றும் அமைப்பு பதிலளிக்கும் வரை காத்திருக்கவும்",
    voiceTip2: "நீங்கள் வேட்பாளர் பெயர்கள் அல்லது எண்களைச் சொல்லலாம் (ஒன்று, இரண்டு, மூன்று...)",
    voiceTip3: "வழிமுறைகளுக்கு எப்போதும் 'உதவி' என்று சொல்லவும்",
  },
  
  te: {
    // Common
    appTitle: "భారతీయ జాతీయ ఈ-ఓటింగ్ పోర్టల్",
    appSubtitle: "సురక్షిత డిజిటల్ ప్రజాస్వామ్యం",
    welcome: "స్వాగతం",
    loading: "లోడ్ అవుతోంది...",
    submit: "సమర్పించండి",
    cancel: "రద్దు చేయండి",
    next: "తదుపరి",
    back: "వెనుకకు",
    close: "మూసివేయండి",
    confirm: "నిర్ధారించండి",
    yes: "అవును",
    no: "కాదు",
    
    // Header & Navigation
    home: "హోమ్",
    about: "గురించి",
    results: "ఫలితాలు",
    adminPortal: "అడ్మిన్ పోర్టల్",
    logout: "లాగ్ అవుట్",
    
    // Landing Page
    landingTitle: "ప్రజాస్వామ్య ఓటింగ్, డిజిటల్‌గా శక్తివంతం",
    landingSubtitle: "సురక్షిత, ఆధార్-ధృవీకరించబడిన ఎలక్ట్రానిక్ ఓటింగ్‌తో భారతదేశ డిజిటల్ ప్రజాస్వామ్యంలో పాల్గొనండి",
    landingDescription: "ఆధార్ ఆధారిత ధృవీకరణను ఉపయోగించి సురక్షిత ఎలక్ట్రానిక్ ఓటింగ్ కోసం ప్రదర్శన వేదిక. ఇది విద్యా ప్రయోజనాల కోసం ఒక భావన వ్యవస్థ యొక్క రుజువు.",
    getStarted: "ప్రారంభించండి",
    features: "లక్షణాలు",
    secureVoting: "సురక్షిత ఓటింగ్",
    secureVotingDesc: "బ్లాక్‌చెయిన్-ప్రేరేపిత ధృవీకరణతో ఎండ్-టు-ఎండ్ ఎన్‌క్రిప్టెడ్ ఓటింగ్ ప్రక్రియ",
    aadhaarVerification: "ఆధార్ ధృవీకరణ",
    aadhaarVerificationDesc: "OTP-ఆధారిత ప్రమాణీకరణ ప్రతి పౌరుడికి ఒక ఓటును నిర్ధారిస్తుంది",
    instantResults: "తక్షణ ఫలితాలు",
    instantResultsDesc: "నిజ సమయ ఓటు లెక్కింపు మరియు పారదర్శక ఫలిత ప్రదర్శన",
    
    // Registration
    registration: "నమోదు",
    registerToVote: "ఓటు వేయడానికి నమోదు చేసుకోండి",
    aadhaarNumber: "ఆధార్ సంఖ్య",
    aadhaarPlaceholder: "12 అంకెల ఆధార్ నంబర్‌ను నమోదు చేయండి",
    fullName: "పూర్తి పేరు",
    fullNamePlaceholder: "ఆధార్ ప్రకారం మీ పూర్తి పేరును నమోదు చేయండి",
    phoneNumber: "ఫోన్ నంబర్",
    phonePlaceholder: "10 అంకెల ఫోన్ నంబర్‌ను నమోదు చేయండి",
    registerNow: "ఇప్పుడే నమోదు చేసుకోండి",
    alreadyRegistered: "ఇప్పటికే నమోదు చేసుకున్నారా?",
    loginHere: "ఇక్కడ లాగిన్ చేయండి",
    
    // Login
    login: "లాగిన్",
    voterLogin: "ఓటరు లాగిన్",
    enterAadhaar: "కొనసాగడానికి మీ ఆధార్ నంబర్‌ను నమోదు చేయండి",
    proceedToOTP: "OTP ధృవీకరణకు కొనసాగండి",
    dontHaveAccount: "ఖాతా లేదా?",
    registerHere: "ఇక్కడ నమోదు చేసుకోండి",
    
    // OTP Verification
    otpVerification: "OTP ధృవీకరణ",
    otpSentTo: "OTP పంపబడింది",
    enterOTP: "మీ నమోదు చేసిన ఫోన్ నంబర్‌కు పంపిన 6 అంకెల OTP నమోదు చేయండి",
    resendOTP: "OTP మళ్లీ పంపండి",
    verifyOTP: "OTP ధృవీకరించండి",
    otpInstructions: "దయచేసి మీ మొబైల్ నంబర్‌కు పంపిన OTP నమోదు చేయండి. ఈ OTPని ఎవరితోనూ పంచుకోవద్దు.",
    
    // Dashboard
    dashboard: "డ్యాష్‌బోర్డ్",
    voterDashboard: "ఓటరు డ్యాష్‌బోర్డ్",
    welcomeMessage: "మీ డెమో ఓటింగ్ పోర్టల్‌కు స్వాగతం",
    sessionStatus: "సెషన్ స్థితి",
    status: "స్థితి",
    active: "చురుకైన",
    inactive: "నిష్క్రియ",
    userID: "వినియోగదారు ID",
    sessionID: "సెషన్ ID",
    hasVoted: "ఓటు వేశారు",
    noActiveElections: "చురుకైన ఎన్నికలు లేవు",
    noElectionsDesc: "ప్రస్తుతం చురుకైన ఎన్నికలు లేవు. తర్వాత తనిఖీ చేయండి.",
    electionID: "ఎన్నికల ID",
    schedule: "షెడ్యూల్",
    constituency: "నియోజకవర్గం",
    votedSuccess: "మీరు ఈ ఎన్నికలో విజయవంతంగా ఓటు వేశారు.",
    votedThankYou: "ప్రజాస్వామ్య ప్రక్రియలో పాల్గొన్నందుకు ధన్యవాదాలు!",
    notVotedYet: "మీరు ఇంకా ఈ ఎన్నికలో ఓటు వేయలేదు.",
    castVoteSoon: "విండో మూసివేయడానికి ముందు మీ ఓటు వేయండి.",
    proceedToVote: "ఓటు వేయడానికి కొనసాగండి",
    viewElectionResults: "ఎన్నికల ఫలితాలను చూడండి",
    
    // Voter Info
    voterInformation: "ఓటరు సమాచారం",
    name: "పేరు",
    aadhaar: "ఆధార్",
    voteReceipt: "ఓటు రసీదు",
    receiptID: "రసీదు ID",
    noReceipt: "రసీదు అందుబాటులో లేదు. రసీదును రూపొందించడానికి ఓటు వేయండి.",
    viewReceiptHistory: "రసీదు చరిత్రను చూడండి",
    
    // Instructions
    instructions: "సూచనలు",
    instruction1: "ఒక ఎన్నికకు ఒక ఆధార్ IDకి ఒక ఓటు మాత్రమే అనుమతించబడుతుంది",
    instruction2: "బ్యాలెట్ నుండి ఒక అభ్యర్థిని ఎంచుకోండి",
    instruction3: "నిర్ధారించే ముందు మీ ఎంపికను సమీక్షించండి",
    instruction4: "ధృవీకరణ కోసం మీ ఓటు రసీదును సేవ్ చేయండి",
    
    // Ballot
    ballot: "బ్యాలెట్",
    selectCandidate: "మీ అభ్యర్థిని ఎంచుకోండి",
    candidateName: "అభ్యర్థి పేరు",
    party: "పార్టీ",
    description: "వివరణ",
    confirmVote: "ఓటును నిర్ధారించండి",
    
    // Results
    electionResults: "ఎన్నికల ఫలితాలు",
    live: "ప్రత్యక్ష",
    totalVotesCast: "మొత్తం ఓట్లు",
    votersParticipated: "ఓటర్లు పాల్గొన్నారు",
    voterTurnout: "ఓటరు పోలింగ్",
    registeredVoters: "నమోదు చేసిన ఓటర్లలో",
    leadingCandidate: "ముందంజ అభ్యర్థి",
    numberOfCandidates: "అభ్యర్థుల సంఖ్య",
    inThisElection: "ఈ ఎన్నికలో",
    voteDistribution: "ఓటు పంపిణీ",
    realtimeVoteCounts: "అభ్యర్థికి నిజ సమయ ఓటు లెక్కలు",
    noVotesYet: "ఇంకా ఓట్లు వేయలేదు",
    leading: "ముందంజలో",
    selectElection: "ఎన్నికను ఎంచుకోండి",
    
    // Confirmation
    voteConfirmed: "ఓటు నిర్ధారించబడింది",
    voteSubmitted: "మీ ఓటు విజయవంతంగా సమర్పించబడింది మరియు రికార్డ్ చేయబడింది",
    thankYouVoting: "ఈ ప్రజాస్వామ్య ప్రక్రియలో పాల్గొన్నందుకు ధన్యవాదాలు",
    receiptGenerated: "రసీదు రూపొందించబడింది",
    downloadReceipt: "రసీదును డౌన్‌లోడ్ చేయండి",
    backToDashboard: "డ్యాష్‌బోర్డ్‌కు తిరిగి వెళ్ళండి",
    
    // Admin
    adminDashboard: "అడ్మిన్ డ్యాష్‌బోర్డ్",
    electionManagement: "ఎన్నికల నిర్వహణ",
    candidateManagement: "అభ్యర్థి నిర్వహణ",
    reports: "నివేదికలు",
    databaseSetup: "డేటాబేస్ సెటప్",
    
    // Footer
    disclaimer: "నిరాకరణ",
    disclaimerText: "ఇది విద్యా ప్రయోజనాల కోసం మాత్రమే ప్రదర్శన ఈ-ఓటింగ్ పోర్టల్. UIDAI లేదా భారత ఎన్నికల కమిషన్‌తో సంబంధం లేదు.",
    privacyPolicy: "గోప్యతా విధానం",
    termsOfService: "సేవా నిబంధనలు",
    contactUs: "మమ్మల్ని సంప్రదించండి",
    copyrightText: "డెమో ప్రాజెక్ట్. అన్ని హక్కులు రక్షించబడ్డాయి.",
    
    // How It Works
    howItWorks: "ఇది ఎలా పనిచేస్తుంది",
    howItWorksSubtitle: "ఈ ప్రదర్శన పోర్టల్‌లో మీ ఓటు వేయడానికి సులభమైన దశలు",
    step1Title: "నమోదు చేసుకోండి",
    step1Description: "మీ డెమో వివరాలను నమోదు చేయండి (పేరు, ఆధార్, మొబైల్)",
    step2Title: "OTP ధృవీకరించండి",
    step2Description: "మీ మొబైల్‌కు పంపిన మాక్ OTPతో ధృవీకరించండి",
    step3Title: "ఓటు వేయండి",
    step3Description: "బ్యాలెట్ నుండి మీ అభ్యర్థిని ఎంచుకోండి",
    step4Title: "రసీదు",
    step4Description: "మీ ఓటు నిర్ధారణ రసీదును డౌన్‌లోడ్ చేయండి",
    
    // Contact Page
    contactPageTitle: "మమ్మల్ని సంప్రదించండి",
    contactPageSubtitle: "ఏదైనా ప్రశ్నలు లేదా అభిప్రాయాల కోసం మా సహాయక బృందాన్ని సంప్రదించండి",
    supportEmail: "మద్దతు ఇమెయిల్",
    phoneDemo: "ఫోన్ (డెమో)",
    demoPhoneDisclaimer: "ప్రదర్శన ప్రయోజనాల కోసం మాత్రమే.",
    feedbackForm: "అభిప్రాయ ఫారం",
    yourName: "మీ పేరు",
    yourEmail: "మీ ఇమెయిల్",
    yourMessage: "మీ సందేశం",
    messagePlaceholder: "దయచేసి మీ అభిప్రాయం లేదా ప్రశ్నలను పంచుకోండి...",
    sendMessage: "సందేశం పంపండి",
    formSubmittedTitle: "ధన్యవాదాలు!",
    formSubmittedMessage: "మీ సందేశం స్వీకరించబడింది. ఇది డెమో పోర్టల్, కాబట్టి నిజమైన ఇమెయిల్ పంపబడదు.",
    
    // Voice Voting
    voiceVotingTitle: "వాయిస్ ఓటింగ్ అసిస్టెంట్",
    voiceVotingDescription: "మెరుగైన యాక్సెస్ కోసం వాయిస్ కమాండ్‌లను ఉపయోగించి ఓటు వేయండి",
    voiceStartVoting: "వాయిస్ ఓటింగ్ ప్రారంభించండి",
    voiceStopVoting: "వాయిస్ ఓటింగ్ ఆపండి",
    voiceListening: "వింటోంది...",
    voiceActive: "చురుకైన",
    voiceConfirming: "నిర్ధారిస్తోంది",
    voiceStartListening: "వినడం ప్రారంభించండి",
    voiceStopListening: "వినడం ఆపండి",
    voiceMute: "మ్యూట్",
    voiceHelp: "సహాయం",
    voiceYouSaid: "మీరు చెప్పారు",
    voiceSelected: "ఎంచుకున్నారు",
    voiceWelcomeMessage: "{election} కోసం వాయిస్ ఓటింగ్‌కు స్వాగతం.",
    voiceCandidateListIntro: "అభ్యర్థులు:",
    voiceSelectInstructions: "మీకు ఇష్టమైన అభ్యర్థి సంఖ్య లేదా పేరు చెప్పండి.",
    voiceSelectedCandidate: "మీరు {party} నుండి {name} ను ఎంచుకున్నారు.",
    voiceConfirmSelection: "దయచేసి {party} నుండి {name} కోసం మీ ఓటును నిర్ధారించండి. కొనసాగడానికి నిర్ధారించు అని చెప్పండి.",
    voiceVoteConfirmed: "మీ ఓటు నిర్ధారించబడింది.",
    voiceVotingCancelled: "వాయిస్ ఓటింగ్ రద్దు చేయబడింది.",
    voiceNoSpeechDetected: "ప్రసంగం గుర్తించబడలేదు. దయచేసి మళ్లీ ప్రయత్నించండి.",
    voiceBrowserNotSupported: "మీ బ్రౌజర్‌లో వాయిస్ ఓటింగ్ మద్దతు లేదు. దయచేసి Chrome, Edge లేదా Safari ఉపయోగించండి.",
    voiceInstructions: "వాయిస్ ఓటింగ్ సూచనలు: ప్రారంభించడానికి ప్రారంభించు అని చెప్పండి. అభ్యర్థుల జాబితా వినండి. మీకు ఇష్టమైన అభ్యర్థి సంఖ్య లేదా పేరు చెప్పండి. మీ ఓటును ఖరారు చేయడానికి నిర్ధారించు అని చెప్పండి. సూచనల కోసం సహాయం అని చెప్పండి. ఆపడానికి రద్దు చేయి అని చెప్పండి.",
    voiceInstructionsSummary: "ఓటు వేయడానికి వాయిస్ కమాండ్‌లను ఉపయోగించండి. అభ్యర్థుల పేర్లు లేదా సంఖ్యలు చెప్పండి. తెలుగు, ఇంగ్లీష్, హిందీ, తమిళం మరియు బెంగాలీలో పనిచేస్తుంది.",
    voiceTip1: "స్పష్టంగా మాట్లాడండి మరియు సిస్టమ్ స్పందించే వరకు వేచి ఉండండి",
    voiceTip2: "మీరు అభ్యర్థుల పేర్లు లేదా సంఖ్యలు చెప్పవచ్చు (ఒకటి, రెండు, మూడు...)",
    voiceTip3: "సూచనల కోసం ఎప్పుడైనా 'సహాయం' అని చెప్పండి",
  },
  
  bn: {
    // Common
    appTitle: "ভারতীয় জাতীয় ই-ভোটিং পোর্টাল",
    appSubtitle: "সুরক্ষিত ডিজিটাল গণতন্ত্র",
    welcome: "স্বাগতম",
    loading: "লোড হচ্ছে...",
    submit: "জমা দিন",
    cancel: "বাতিল করুন",
    next: "পরবর্তী",
    back: "পিছনে",
    close: "বন্ধ করুন",
    confirm: "নিশ্চিত করুন",
    yes: "হ্যাঁ",
    no: "না",
    
    // Header & Navigation
    home: "হোম",
    about: "সম্পর্কে",
    results: "ফলাফল",
    adminPortal: "অ্যাডমিন পোর্টাল",
    logout: "লগ আউট",
    
    // Landing Page
    landingTitle: "গণতান্ত্রিক ভোটদান, ডিজিটালভাবে ক্ষমতায়িত",
    landingSubtitle: "সুরক্ষিত, আধার-যাচাইকৃত ইলেকট্রনিক ভোটিং সহ ভারতের ডিজিটাল গণতন্ত্রে অংশগ্রহণ করুন",
    landingDescription: "আধার-ভিত্তিক যাচাইকরণ ব্যবহার করে সুরক্ষিত ইলেকট্রনিক ভোটিংয়ের জন্য একটি প্রদর্শনী প্ল্যাটফর্ম। এটি শিক্ষামূলক উদ্দেশ্যে একটি ধারণা সিস্টেমের প্রমাণ।",
    getStarted: "শুরু করুন",
    features: "বৈশিষ্ট্য",
    secureVoting: "সুরক্ষিত ভোটদান",
    secureVotingDesc: "ব্লকচেইন-অনুপ্রাণিত যাচাইকরণ সহ এন্ড-টু-এন্ড এনক্রিপ্টেড ভোটিং প্রক্রিয়া",
    aadhaarVerification: "আধার যাচাইকরণ",
    aadhaarVerificationDesc: "OTP-ভিত্তিক প্রমাণীকরণ প্রতি নাগরিকের জন্য একটি ভোট নিশ্চিত করে",
    instantResults: "তাৎক্ষণিক ফলাফল",
    instantResultsDesc: "রিয়েল-টাইম ভোট গণনা এবং স্বচ্ছ ফলাফল প্রদর্শন",
    
    // Registration
    registration: "নিবন্ধন",
    registerToVote: "ভোট দেওয়ার জন্য নিবন্ধন করুন",
    aadhaarNumber: "আধার নম্বর",
    aadhaarPlaceholder: "১২ সংখ্যার আধার নম্বর লিখুন",
    fullName: "পূর্ণ নাম",
    fullNamePlaceholder: "আধার অনুযায়ী আপনার পূর্ণ নাম লিখুন",
    phoneNumber: "ফোন নম্বর",
    phonePlaceholder: "১০ সংখ্যার ফোন নম্বর লিখুন",
    registerNow: "এখনই নিবন্ধন কর��ন",
    alreadyRegistered: "ইতিমধ্যে নিবন্ধিত?",
    loginHere: "এখানে লগইন করুন",
    
    // Login
    login: "লগইন",
    voterLogin: "ভোটার লগইন",
    enterAadhaar: "এগিয়ে যেতে আপনার আধার নম্বর লিখুন",
    proceedToOTP: "OTP যাচাইকরণে এগিয়ে যান",
    dontHaveAccount: "অ্যাকাউন্ট নেই?",
    registerHere: "এখানে নিবন্ধন করুন",
    
    // OTP Verification
    otpVerification: "OTP যাচাইকরণ",
    otpSentTo: "OTP পাঠানো হয়েছে",
    enterOTP: "আপনার নিবন্ধিত ফোন নম্বরে পাঠানো ৬ সংখ্যার OTP লিখুন",
    resendOTP: "OTP পুনরায় পাঠান",
    verifyOTP: "OTP যাচাই করুন",
    otpInstructions: "দয়া করে আপনার মোবাইল নম্বরে পাঠানো OTP লিখুন। এই OTP কারো সাথে শেয়ার করবেন না।",
    
    // Dashboard
    dashboard: "ড্যাশবোর্ড",
    voterDashboard: "ভোটার ড্যাশবোর্ড",
    welcomeMessage: "আপনার ডেমো ভোটিং পোর্টালে স্বাগতম",
    sessionStatus: "সেশন স্ট্যাটাস",
    status: "স্ট্যাটাস",
    active: "সক্রিয়",
    inactive: "নিষ্ক্রিয়",
    userID: "ব্যবহারকারী আইডি",
    sessionID: "সেশন আইডি",
    hasVoted: "ভোট দিয়েছেন",
    noActiveElections: "কোনো সক্রিয় নির্বাচন নেই",
    noElectionsDesc: "বর্তমানে কোনো সক্রিয় নির্বাচন নেই। পরে পরীক্ষা করুন।",
    electionID: "নির্বাচন আইডি",
    schedule: "সময়সূচী",
    constituency: "নির্বাচনী এলাকা",
    votedSuccess: "আপনি এই নির্বাচনে সফলভাবে ভোট দিয়েছেন।",
    votedThankYou: "গণতান্ত্রিক প্রক্রিয়ায় অংশগ্রহণের জন্য ধন্যবাদ!",
    notVotedYet: "আপনি এখনও এই নির্বাচনে ভোট দেননি।",
    castVoteSoon: "উইন্ডো বন্ধ হওয়ার আগে আপনার ভোট দিন।",
    proceedToVote: "ভোট দিতে এগিয়ে যান",
    viewElectionResults: "নির্বাচনের ফলাফল দেখুন",
    
    // Voter Info
    voterInformation: "ভোটার তথ্য",
    name: "নাম",
    aadhaar: "আধার",
    voteReceipt: "ভোট রসিদ",
    receiptID: "রসিদ আইডি",
    noReceipt: "কোনো রসিদ নেই। রসিদ তৈরি করতে ভোট দিন।",
    viewReceiptHistory: "রসিদ ইতিহাস দেখুন",
    
    // Instructions
    instructions: "নির্দেশাবলী",
    instruction1: "প্রতি নির্বাচনে প্রতি আধার আইডির জন্য শুধুমাত্র একটি ভোট অনুমোদিত",
    instruction2: "ব্যালট থেকে একজন প্রার্থী নির্বাচন করুন",
    instruction3: "নিশ্চিত করার আগে আপনার পছন্দ পর্যালোচনা করুন",
    instruction4: "যাচাইকরণের জন্য আপনার ভোট রসিদ সংরক্ষণ করুন",
    
    // Ballot
    ballot: "ব্যালট",
    selectCandidate: "আপনার প্রার্থী নির্বাচন করুন",
    candidateName: "প্রার্থীর নাম",
    party: "দল",
    description: "বর্ণনা",
    confirmVote: "ভোট নিশ্চিত করুন",
    
    // Results
    electionResults: "নির্বাচনের ফলাফল",
    live: "লাইভ",
    totalVotesCast: "মোট ভোট",
    votersParticipated: "ভোটাররা অংশগ্রহণ করেছেন",
    voterTurnout: "ভোটার উপস্থিতি",
    registeredVoters: "নিবন্ধিত ভোটারদের",
    leadingCandidate: "শীর্ষস্থানীয় প্রার্থী",
    numberOfCandidates: "প্রার্থীদের সংখ্যা",
    inThisElection: "এই নির্বাচনে",
    voteDistribution: "ভোট বিতরণ",
    realtimeVoteCounts: "প্রার্থী প্রতি রিয়েল-টাইম ভোট গণনা",
    noVotesYet: "এখনও কোনো ভোট নেই",
    leading: "শীর্ষে",
    selectElection: "নির্বাচন নির্বাচন করুন",
    
    // Confirmation
    voteConfirmed: "ভোট নিশ্চিত হয়েছে",
    voteSubmitted: "আপনার ভোট সফলভাবে জমা এবং রেকর্ড করা হয়েছে",
    thankYouVoting: "এই গণতান্ত্রিক প্রক্রিয়ায় অংশগ্রহণের জন্য ধন্যবাদ",
    receiptGenerated: "রসিদ তৈরি হয়েছে",
    downloadReceipt: "রসিদ ডাউনলোড করুন",
    backToDashboard: "ড্যাশবোর্ডে ফিরে যান",
    
    // Admin
    adminDashboard: "অ্যাডমিন ড্যাশবোর্ড",
    electionManagement: "নির্বাচন ব্যবস্থাপনা",
    candidateManagement: "প্রার্থী ব্যবস্থাপনা",
    reports: "রিপোর্ট",
    databaseSetup: "ডেটাবেস সেটআপ",
    
    // Footer
    disclaimer: "দাবিত্যাগ",
    disclaimerText: "এটি শুধুমাত্র শিক্ষামূলক উদ্দেশ্যে একটি প্রদর্শনী ই-ভোটিং পোর্টাল। UIDAI বা ভারতের নির্বাচন কমিশনের সাথে সম্পর্কিত নয়।",
    privacyPolicy: "গোপনীয়তা নীতি",
    termsOfService: "সেবার শর্তাবলী",
    contactUs: "আমাদের সাথে যোগাযোগ করুন",
    copyrightText: "ডেমো প্রকল্প। সর্বস্বত্ব সংরক্ষিত।",
    
    // How It Works
    howItWorks: "এটি কীভাবে কাজ করে",
    howItWorksSubtitle: "এই প্রদর্শনী পোর্টালে আপনার ভোট দেওয়ার সহজ ধাপ",
    step1Title: "নিবন্ধন করুন",
    step1Description: "আপনার ডেমো বিবরণ লিখুন (নাম, আধার, মোবাইল)",
    step2Title: "OTP যাচাই করুন",
    step2Description: "আপনার মোবাইলে পাঠানো মক OTP দিয়ে যাচাই করুন",
    step3Title: "ভোট দিন",
    step3Description: "ব্যালট থেকে আপনার প্রার্থী নির্বাচন করুন",
    step4Title: "রসিদ",
    step4Description: "আপনার ভোট নিশ্চিতকরণ রসিদ ডাউনলোড করুন",
    
    // Contact Page
    contactPageTitle: "আমাদের সাথে যোগাযোগ করুন",
    contactPageSubtitle: "যেকোনো প্রশ্ন বা প্রতিক্রিয়ার জন্য আমাদের সহায়তা দলের সাথে যোগাযোগ করুন",
    supportEmail: "সহায়তা ইমেইল",
    phoneDemo: "ফোন (ডেমো)",
    demoPhoneDisclaimer: "শুধুমাত্র প্রদর্শনের উদ্দেশ্যে।",
    feedbackForm: "প্রতিক্রিয়া ফর্ম",
    yourName: "আপনার নাম",
    yourEmail: "আপনার ইমেইল",
    yourMessage: "আপনার বার্তা",
    messagePlaceholder: "অনুগ্রহ করে আপনার প্রতিক্রিয়া বা প্রশ্ন শেয়ার করুন...",
    sendMessage: "বার্তা পাঠান",
    formSubmittedTitle: "ধন্যবাদ!",
    formSubmittedMessage: "আপনার বার্তা গৃহীত হয়েছে। এটি একটি ডেমো পোর্টাল, তাই কোন প্রকৃত ইমেইল পাঠানো হবে না।",
    
    // Voice Voting
    voiceVotingTitle: "ভয়েস ভোটিং সহায়ক",
    voiceVotingDescription: "উন্নত অ্যাক্সেসের জন্য ভয়েস কমান্ড ব্যবহার করে ভোট দিন",
    voiceStartVoting: "ভয়েস ভোটিং শুরু করুন",
    voiceStopVoting: "ভয়েস ভোটিং বন্ধ করুন",
    voiceListening: "শুনছে...",
    voiceActive: "সক্রিয়",
    voiceConfirming: "নিশ্চিত করছে",
    voiceStartListening: "শোনা শুরু করুন",
    voiceStopListening: "শোনা বন্ধ করুন",
    voiceMute: "মিউট",
    voiceHelp: "সাহায্য",
    voiceYouSaid: "আপনি বলেছেন",
    voiceSelected: "নির্বাচিত",
    voiceWelcomeMessage: "{election} এর জন্য ভয়েস ভোটিং এ স্বাগতম।",
    voiceCandidateListIntro: "প্রার্থীরা হলেন:",
    voiceSelectInstructions: "আপনার পছন্দের প্রার্থীর নম্বর বা নাম বলুন।",
    voiceSelectedCandidate: "আপনি {party} থেকে {name} কে নির্বাচন করেছেন।",
    voiceConfirmSelection: "অনুগ্রহ করে {party} থেকে {name} এর জন্য আপনার ভোট নিশ্চিত করুন। এগিয়ে যেতে নিশ্চিত করুন বলুন।",
    voiceVoteConfirmed: "আপনার ভোট নিশ্চিত করা হয়েছে।",
    voiceVotingCancelled: "ভয়েস ভোটিং বাতিল করা হয়েছে।",
    voiceNoSpeechDetected: "কোন বক্তব্য শনাক্ত করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
    voiceBrowserNotSupported: "আপনার ব্রাউজারে ভয়েস ভোটিং সমর্থিত নয়। অনুগ্রহ করে Chrome, Edge, বা Safari ব্যবহার করুন।",
    voiceInstructions: "ভয়েস ভোটিং নির্দেশাবলী: শুরু করতে শুরু বলুন। প্রার্থীদের তালিকা শুনুন। আপনার পছন্দের প্রার্থীর নম্বর বা নাম বলুন। আপনার ভোট চূড়ান্ত করতে নিশ্চিত করুন বলুন। নির্দেশাবলীর জন্য সাহায্য বলুন। বন্ধ করতে বাতিল বলুন।",
    voiceInstructionsSummary: "ভোট দিতে ভয়েস কমান্ড ব্যবহার করুন। প্রার্থীদের নাম বা নম্বর বলুন। বাংলা, ইংরেজি, হিন্দি, তামিল এবং তেলুগুতে কাজ করে।",
    voiceTip1: "স্পষ্টভাবে কথা বলুন এবং সিস্টেমের সাড়া দেওয়ার জন্য অপেক্ষা করুন",
    voiceTip2: "আপনি প্রার্থীদের নাম বা নম্বর বলতে পারেন (এক, দুই, তিন...)",
    voiceTip3: "নির্দেশাবলীর জন্য যেকোনো সময় 'সাহায্য' বলুন",
  },
};

export const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
];
