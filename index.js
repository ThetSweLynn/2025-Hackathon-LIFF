// Import stylesheets
import './style.css';

// Task button elements
const taskButtons = document.querySelectorAll('button');
const backButton = document.querySelector('[data-icon="ArrowLeft"]');

// Navigation elements
const tasksNav = document.querySelector('a[href="#"]:has(.text-[#101810])');
const rewardsNav = document.querySelector('a[href="#"]:has(.text-[#5c8a5c]:first-of-type)');
const profileNav = document.querySelector('a[href="#"]:has(.text-[#5c8a5c]:last-of-type)');

async function main() {
  // Initialize LIFF app
  await liff.init({ liffId: '2007866032-G0dy5qEq' });

  // Add event listeners to task buttons
  taskButtons.forEach((button, index) => {
    button.onclick = () => handleTaskClick(index);
  });

  // Add event listeners to navigation items
  backButton.onclick = handleBackClick;
  tasksNav.onclick = (e) => handleNavClick(e, 'tasks');
  rewardsNav.onclick = (e) => handleNavClick(e, 'rewards');
  profileNav.onclick = (e) => handleNavClick(e, 'profile');

  // Check if running in LIFF browser
  if (!liff.isInClient()) {
    if (!liff.isLoggedIn()) {
      // Redirect to LINE login if not logged in
      liff.login();
    }
  }
}

async function handleTaskClick(taskIndex) {
  const tasks = [
    { name: 'Complete profile', points: 50 },
    { name: 'Invite friend', points: 20 },
    { name: 'Complete 5 tasks', points: 100 },
    { name: 'Share progress', points: 30 }
  ];

  const task = tasks[taskIndex];

  if (liff.getContext().type !== 'none' && liff.getContext().type !== 'external') {
    await liff.sendMessages([
      {
        type: 'text',
        text: `Starting task: ${task.name} (${task.points} points)`
      }
    ]);
  }
}

function handleBackClick() {
  if (liff.isInClient()) {
    liff.closeWindow();
  } else {
    window.history.back();
  }
}

function handleNavClick(event, section) {
  event.preventDefault();
  // Handle navigation - can be expanded based on requirements
  console.log(`Navigating to ${section}`);
}

// Initialize app
main().catch(console.error);