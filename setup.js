#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('💕 Welcome to Eternal Us Anniversary Website Setup 💕\n');

const questions = [
  {
    name: 'supabaseUrl',
    question: 'Enter your Supabase project URL: ',
    required: true
  },
  {
    name: 'supabaseKey',
    question: 'Enter your Supabase anon key: ',
    required: true
  },
  {
    name: 'resendKey',
    question: 'Enter your Resend API key (optional, press Enter to skip): ',
    required: false
  },
  {
    name: 'email1',
    question: 'Enter first email address for notifications: ',
    required: false
  },
  {
    name: 'email2',
    question: 'Enter second email address for notifications: ',
    required: false
  }
];

const answers = {};

function askQuestion(index) {
  if (index >= questions.length) {
    createEnvFile();
    return;
  }

  const question = questions[index];
  rl.question(question.question, (answer) => {
    if (question.required && !answer.trim()) {
      console.log('This field is required. Please try again.\n');
      askQuestion(index);
      return;
    }
    
    answers[question.name] = answer.trim();
    askQuestion(index + 1);
  });
}

function createEnvFile() {
  const envContent = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=${answers.supabaseUrl}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${answers.supabaseKey}

# Email Configuration (Resend)
RESEND_API_KEY=${answers.resendKey || 're_LBr4PosM_EbQRQs1y1EwCWnZaciPrCEPE'}

# Anniversary Date (June 25, 2025)
NEXT_PUBLIC_ANNIVERSARY_DATE=2025-06-25T00:00:00.000Z
`;

  fs.writeFileSync('.env.local', envContent);

  // Update email addresses in notification API if provided
  if (answers.email1 && answers.email2) {
    const notifyPath = path.join(__dirname, 'app', 'api', 'notify', 'route.ts');
    if (fs.existsSync(notifyPath)) {
      let notifyContent = fs.readFileSync(notifyPath, 'utf8');
      notifyContent = notifyContent.replace(
        /const emails = \['[^']*', '[^']*'\]/,
        `const emails = ['${answers.email1}', '${answers.email2}']`
      );
      fs.writeFileSync(notifyPath, notifyContent);
    }
  }

  console.log('\n✅ Setup complete!');
  console.log('\n📋 Next steps:');
  console.log('1. Run the Supabase setup SQL in your dashboard');
  console.log('2. Create users in Supabase Auth');
  console.log('3. Create the storage bucket');
  console.log('4. Set up Resend for email notifications (optional)');
  console.log('5. Run: npm run dev');
  console.log('\n💕 Your love story is ready to begin! 💕');
  
  rl.close();
}

// Start the setup process
askQuestion(0);
