import './style.css';

const sections = {
  tasks: document.getElementById('tasks'),
  rewards: document.getElementById('rewards'),
  profile: document.getElementById('profile'),
};

const navItems = {
  tasks: document.querySelector('.nav-tasks'),
  rewards: document.querySelector('.nav-rewards'),
  profile: document.querySelector('.nav-profile'),
};

function showSection(name) {
  for (const key in sections) {
    if (key === name) {
      sections[key].style.display = 'block';
      navItems[key].classList.add('active');
    } else {
      sections[key].style.display = 'none';
      navItems[key].classList.remove('active');
    }
  }

  // Optional: Update header title
  const headerTitle = document.querySelector('header h2');
  if (name === 'tasks') headerTitle.textContent = 'Available Tasks';
  else headerTitle.textContent = name.charAt(0).toUpperCase() + name.slice(1);
}

// Hook click events
navItems.tasks.addEventListener('click', () => showSection('tasks'));
navItems.rewards.addEventListener('click', () => showSection('rewards'));
navItems.profile.addEventListener('click', () => showSection('profile'));

// Body element
const body = document.getElementById('body');

// Button elements
const btnSend = document.getElementById('btnSend');
const btnClose = document.getElementById('btnClose');
const btnShare = document.getElementById('btnShare');
const btnLogIn = document.getElementById('btnLogIn');
const btnLogOut = document.getElementById('btnLogOut');
const btnScanCode = document.getElementById('btnScanCode');
const btnOpenWindow = document.getElementById('btnOpenWindow');

// Profile elements
const email = document.getElementById('email');
const userId = document.getElementById('userId');
const pictureUrl = document.getElementById('pictureUrl');
const displayName = document.getElementById('displayName');
const statusMessage = document.getElementById('statusMessage');

// QR element
const code = document.getElementById('code');
const friendShip = document.getElementById('friendShip');

async function main() {
  // Initialize LIFF app
  await liff.init({ liffId: '2007866032-G0dy5qEq' });
  getUserProfile();
}

async function getUserProfile() {
  const profile = await liff.getProfile();
  pictureUrl.src = profile.pictureUrl;
  displayName.innerHTML = profile.displayName;
  email.innerHTML = liff.getDecodedIDToken().email;
}

main();

// Tasks Section
const tasksSection = document.getElementById('tasks');
const taskDetailsSection = document.getElementById('task-details');
const profileSection = document.getElementById('profile');

const detailTitle = document.getElementById('detail-title');
const detailPoints = document.getElementById('detail-points');
const detailImage = document.getElementById('detail-image');
const detailDescription = document.getElementById('detail-description');

const backToTasksBtn = document.getElementById('back-to-tasks');
const markCompleteBtn = document.getElementById('mark-complete');

// Task history container in profile page (where we append completed tasks)
const taskHistoryContainer = profileSection.querySelector('#button');

// Get stat elements from profile page
const pointsElement = profileSection.querySelector('.stat-box .value');
const tasksCompletedElement =
  profileSection.querySelectorAll('.stat-box .value')[1];

// Initialize user stats (you can load these from storage or API)
let userStats = {
  points: 1200, // Starting points from HTML
  tasksCompleted: 3, // Starting tasks completed from HTML
};

// Your existing task data with descriptions (adjust as needed)
const tasksData = [
  {
    title: 'Complete your profile',
    points: 'Earn 50 points',
    pointsValue: 50,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBPbocb9El3s-aa4YBQlDW-fSGO3FFbfqBd2slJvW_KxBRsgXTQFV1uCWGag9kiW4xrW4pjspxcnyz6mTjvUFnXNByape3uMVGF6HwHv-jSb0Yy7tbfK7-GxJ7aBS4m88_03gRFd6N6VXAYWqUoTvAiajEIcjY7Pn_FdnKq9pnI3ChP1y6iISsdH2fcA_8cLzOvb1y7WkWvBE9yWKmHPdPLL8qQNo-eVej0w1SP7TLw3-uAf94rIkn6jcyjrIOi53RIdXlrlo9UGNI',
    description:
      'Fill in your name, birthday, and profile picture to complete your account setup and unlock more features.',
  },
  {
    title: 'Invite a friend',
    points: 'Earn 20 points',
    pointsValue: 20,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBPbocb9El3s-aa4YBQlDW-fSGO3FFbfqBd2slJvW_KxBRsgXTQFV1uCWGag9kiW4xrW4pjspxcnyz6mTjvUFnXNByape3uMVGF6HwHv-jSb0Yy7tbfK7-GxJ7aBS4m88_03gRFd6N6VXAYWqUoTvAiajEIcjY7Pn_FdnKq9pnI3ChP1y6iISsdH2fcA_8cLzOvb1y7WkWvBE9yWKmHPdPLL8qQNo-eVej0w1SP7TLw3-uAf94rIkn6jcyjrIOi53RIdXlrlo9UGNI',
    description:
      "Send an invite link to a friend. Once they join, you'll automatically get points!",
  },
  {
    title: 'Complete 5 tasks',
    points: 'Earn 100 points',
    pointsValue: 100,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD4X9IpmVnnrb6CTVfgeMGzavuY-OpQKLWRDWyeS2z0SCL6W9LUg7WwZ5IKhAV-vSGItOYU4VCLiEgTz5Y1zDL6BXKT-0ZA7D8W8nxryM60BIjCb02dgdTmFxWWj0XD71IF3NxS5rf6xbk8eAxn6GzyjpepZE-4pWGVLKDYxeW8SQ702802-rftt4VVoQWI_Q1GRJ3YXQWVqtgxOh3KmTTw0lI1KZrxVIrecBU4U4P4rw-snCGF8g-iuqxINnCa5XBPGNYCEqssQaA',
    description:
      "Stay consistent by finishing five different tasks. It's a great way to boost your level!",
  },
  {
    title: 'Share your progress',
    points: 'Earn 30 points',
    pointsValue: 30,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAjzY1JgOEUZ7HZVZfNO_QrKLCWafw35SpD8p4bSgco1OkMhFClrl1JGGwm3LDyFehUtQn27Y_26w48HrrIpZr2Ej2Ln-zknDcUwfax9iB27FEj1u4JnGAsn5QItWrxSafpixLA8QIknAMjC861Nc1Vl7G7zamMtPxBEXsKO1ZKU2_BZitGUOdTHTGD50HrAj5DFKRHeLq1afPD5BPcmimugAlbwWBXJfMXxas7VDp-wNGtplHXYubMkSDsNsDqpPkj379UE9LhBas',
    description:
      "Let others know what you've achieved by sharing your progress on social media!",
  },
];

// Find all task buttons
const taskButtons = document.querySelectorAll('.task-button');

// Store currently viewed task data globally for marking complete
let currentTask = null;

// Function to update stats display
function updateStatsDisplay() {
  pointsElement.textContent = userStats.points;
  tasksCompletedElement.textContent = userStats.tasksCompleted;
}

// Show task details on clicking Start button
taskButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.task-card');
    const title = card.querySelector('.task-title').innerText;

    // Find task data object
    const task = tasksData.find((t) => t.title === title);

    if (task) {
      currentTask = task;

      detailTitle.innerText = task.title;
      detailPoints.innerText = task.points;
      detailImage.style.backgroundImage = `url('${task.image}')`;
      detailDescription.innerText = task.description;

      // Show details, hide tasks list
      tasksSection.style.display = 'none';
      taskDetailsSection.style.display = 'block';
    }
  });
});

// Back button goes back to tasks list
backToTasksBtn.addEventListener('click', () => {
  taskDetailsSection.style.display = 'none';
  tasksSection.style.display = 'block';
});

// Rewards functionality
const rewardItems = document.querySelectorAll('.reward-item');
const rewardsSection = document.getElementById('rewards');

// Create claimed rewards section (initially hidden)
const claimedRewardsSection = document.createElement('section');
claimedRewardsSection.id = 'claimed-rewards';
claimedRewardsSection.style.display = 'none';
claimedRewardsSection.innerHTML = `
  <div style="margin-bottom: 10px;">
    <button id="back-to-rewards" style="padding: 12px; background-color: #eaf1ea; color: white; border: none; border-radius: 10px; cursor: pointer; font-size: 14px; display: flex; align-items: center;">
      <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 24 24" fill="rgb(10, 151, 53)" style="margin-right: 5px;">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
      </svg>
    </button>
  </div>
  <div id="claimed-rewards-list"></div>
`;

// Insert claimed rewards section after rewards section
rewardsSection.parentNode.insertBefore(
  claimedRewardsSection,
  rewardsSection.nextSibling
);

// Add reward icon next to "Claimable Rewards" title
const rewardsTitle = rewardsSection.querySelector('h2');
rewardsTitle.outerHTML = `
  <div style="display: flex; align-items: center; justify-content: space-between; padding: 0 1rem; margin-bottom: 10px;">
    <h2 style="margin: 0;">Claimable Rewards</h2>
    <button id="rewards-history-icon" style="background: none; border: none; cursor: pointer; padding-left: 10px;">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#28a745" viewBox="0 0 24 24">
        <path d="M21 8H19V6C19 4.9 18.1 4 17 4H16V8H14V4H10V8H8V4H7C5.9 4 5 4.9 5 6V8H3C2.45 8 2 8.45 2 9V20C2 20.55 2.45 21 3 21H21C21.55 21 22 20.55 22 20V9C22 8.45 21.55 8 21 8ZM20 19H4V10H20V19Z"/>
      </svg>
    </button>
  </div>
`;

// Get references to elements
const rewardsHistoryIcon = document.getElementById('rewards-history-icon');
const claimedRewardsList = document.getElementById('claimed-rewards-list');
const backToRewardsBtn = document.getElementById('back-to-rewards');

// Store claimed rewards
let claimedRewards = [];

// Show claimed rewards when icon is clicked
rewardsHistoryIcon.addEventListener('click', () => {
  rewardsSection.style.display = 'none';
  claimedRewardsSection.style.display = 'block';

  // Update header title
  const headerTitle = document.querySelector('header h2');
  headerTitle.textContent = 'Claimed Rewards';
});

// Back to rewards button
backToRewardsBtn.addEventListener('click', () => {
  claimedRewardsSection.style.display = 'none';
  rewardsSection.style.display = 'block';

  // Update header title
  const headerTitle = document.querySelector('header h2');
  headerTitle.textContent = 'Rewards';
});

// Function to display claimed rewards
function displayClaimedRewards() {
  claimedRewardsList.innerHTML = '';

  if (claimedRewards.length === 0) {
    claimedRewardsList.innerHTML =
      '<p style="text-align: center; color: #6c757d; margin: 40px 0;">No rewards claimed yet. Complete tasks to earn points and claim rewards!</p>';
  } else {
    claimedRewards.forEach((reward) => {
      const rewardDiv = document.createElement('div');
      rewardDiv.style.cssText = `
        display: flex;
        align-items: center;
        padding: 15px;
        margin-bottom: 10px;
        background-color: #f8f9fa;
        border-radius: 8px;
        border-left: 4px solid #28a745;
      `;

      rewardDiv.innerHTML = `
        <div style="margin-right: 15px; font-size: 24px;">🎁</div>
        <div style="flex-grow: 1;">
          <div style="font-weight: bold; margin-bottom: 4px;">${reward.title}</div>
          <div style="color: #6c757d; font-size: 14px;">${reward.shopName}</div>
          <div style="color: #28a745; font-size: 12px; margin-top: 4px;">Claimed on ${reward.date} • ${reward.points} points used</div>
        </div>
      `;

      claimedRewardsList.appendChild(rewardDiv);
    });
  }
}

// Add claim buttons to each reward
rewardItems.forEach((rewardItem) => {
  // Create claim button
  const claimButton = document.createElement('button');
  claimButton.textContent = 'Claim';
  claimButton.classList.add('claim-button');
  claimButton.style.padding = '6px 12px';
  claimButton.style.backgroundColor = '#588157';
  claimButton.style.color = 'white';
  claimButton.style.border = 'none';
  claimButton.style.borderRadius = '20px';
  claimButton.style.cursor = 'pointer';
  claimButton.style.fontSize = '12px';
  claimButton.style.marginLeft = '10px';

  // Create a container for points and button
  const pointsContainer = document.createElement('div');
  pointsContainer.style.display = 'flex';
  pointsContainer.style.alignItems = 'center';
  pointsContainer.style.marginTop = '8px';

  // Get the points element
  const pointsElement = rewardItem.querySelector('.points');

  // Remove points from its current position
  pointsElement.remove();

  // Add points and button to the container
  pointsContainer.appendChild(pointsElement);
  pointsContainer.appendChild(claimButton);

  // Add container to reward info section
  const rewardInfo = rewardItem.querySelector('.reward-info');
  rewardInfo.appendChild(pointsContainer);

  // Add click event to claim button
  claimButton.addEventListener('click', () => {
    const pointsText = rewardItem.querySelector('.points').textContent;
    const rewardPoints = parseInt(pointsText.replace(' points', ''));
    const rewardTitle = rewardItem.querySelector('.reward-title').textContent;
    const shopName = rewardItem.querySelector('.shop-name').textContent;

    // Check if user has enough points
    if (userStats.points >= rewardPoints) {
      // Deduct points
      userStats.points -= rewardPoints;

      // Update the display
      updateStatsDisplay();

      // Hide the claimed reward
      rewardItem.style.display = 'none';

      // Show success message
      alert(
        `Congratulations! You claimed "${rewardTitle}" from ${shopName}! ${rewardPoints} points have been deducted.`
      );

      // Optional: Add to claimed rewards history in profile
      addClaimedRewardToHistory(rewardTitle, shopName, rewardPoints);
    } else {
      // Not enough points
      const neededPoints = rewardPoints - userStats.points;
      alert(
        `You need ${neededPoints} more points to claim this reward. Complete more tasks to earn points!`
      );
    }
  });
});

// Function to add claimed reward to profile history
function addClaimedRewardToHistory(rewardTitle, shopName, pointsCost) {
  // Add to claimed rewards array
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const dateString = `${yyyy}–${mm}–${dd}`;

  claimedRewards.push({
    title: rewardTitle,
    shopName: shopName,
    points: pointsCost,
    date: dateString,
  });

  // Update the claimed rewards display
  displayClaimedRewards();

  // Create new reward history element for profile page
  const newRewardDiv = document.createElement('div');
  newRewardDiv.classList.add('task');
  newRewardDiv.style.borderLeft = '3px solid #28a745'; // Green border to distinguish from tasks

  const iconDiv = document.createElement('div');
  iconDiv.classList.add('task-icon');
  iconDiv.textContent = '🎁'; // Gift emoji for rewards
  iconDiv.style.backgroundColor = '#28a745';

  const infoDiv = document.createElement('div');
  infoDiv.classList.add('task-info');

  const titleSpan = document.createElement('span');
  titleSpan.classList.add('title');
  titleSpan.textContent = `${rewardTitle} - ${shopName}`;

  const dateSpan = document.createElement('span');
  dateSpan.classList.add('date');
  dateSpan.textContent = `Claimed on ${dateString} (-${pointsCost} points)`;

  infoDiv.appendChild(titleSpan);
  infoDiv.appendChild(dateSpan);

  newRewardDiv.appendChild(iconDiv);
  newRewardDiv.appendChild(infoDiv);

  // Add to task history container (you might want to create a separate rewards history section)
  taskHistoryContainer.appendChild(newRewardDiv);
}

// Handle mark as complete click
markCompleteBtn.addEventListener('click', () => {
  if (!currentTask) return;

  // Update user stats
  userStats.points += currentTask.pointsValue;
  userStats.tasksCompleted += 1;

  // Update the display
  updateStatsDisplay();

  // Create new task history element
  const newTaskDiv = document.createElement('div');
  newTaskDiv.classList.add('task');

  const iconDiv = document.createElement('div');
  iconDiv.classList.add('task-icon');
  iconDiv.textContent = '✔';

  const infoDiv = document.createElement('div');
  infoDiv.classList.add('task-info');

  const titleSpan = document.createElement('span');
  titleSpan.classList.add('title');
  titleSpan.textContent = currentTask.title;

  const dateSpan = document.createElement('span');
  dateSpan.classList.add('date');

  // Format today's date as YYYY-MM-DD
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  dateSpan.textContent = `Completed on ${yyyy}–${mm}–${dd}`;

  infoDiv.appendChild(titleSpan);
  infoDiv.appendChild(dateSpan);

  newTaskDiv.appendChild(iconDiv);
  newTaskDiv.appendChild(infoDiv);

  // Append to profile's task history container
  taskHistoryContainer.appendChild(newTaskDiv);

  // Hide the completed task from the tasks list (optional)
  const taskCard = Array.from(document.querySelectorAll('.task-card')).find(
    (card) =>
      card.querySelector('.task-title').textContent === currentTask.title
  );
  if (taskCard) {
    taskCard.style.display = 'none';
  }

  // Hide task details, show profile
  taskDetailsSection.style.display = 'none';
  tasksSection.style.display = 'none';
  profileSection.style.display = 'block';

  // Update navigation to show profile as active
  showSection('profile');

  // Show a success message (optional)
  alert(`Congratulations! You earned ${currentTask.pointsValue} points!`);

  // Reset current task
  currentTask = null;
});
