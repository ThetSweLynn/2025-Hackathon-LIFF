// LIFF initialization function
async function initializeLiff() {
  try {
      // Replace "YOUR-LIFF-ID" with your actual LIFF ID
      await liff.init({ liffId: "2007866032-G0dy5qEq" });
      
      // Check if user is logged in
      if (!liff.isInClient() && !liff.isLoggedIn()) {
          liff.login();
      }
      
      console.log("LIFF initialized successfully");
  } catch (error) {
      console.error("Error initializing LIFF:", error);
  }
}

// Main application logic
document.addEventListener('DOMContentLoaded', () => {
  // Initialize LIFF when page loads
  initializeLiff();

  // Navigation functionality
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
      item.addEventListener('click', (e) => {
          e.preventDefault();
          
          // Remove active class from all nav items
          navItems.forEach(nav => nav.classList.remove('active'));
          
          // Add active class to clicked item
          item.classList.add('active');
          
          // You can add logic here to show/hide different content sections
          // based on which navigation item was clicked
          const navClass = item.className.split(' ').find(cls => cls.startsWith('nav-'));
          console.log(`Navigated to: ${navClass}`);
      });
  });

  // Back button functionality
  const backButton = document.querySelector('.back-button');
  if (backButton) {
      backButton.addEventListener('click', () => {
          if (typeof liff !== 'undefined' && liff.isInClient()) {
              // If running in LINE app, close the LIFF window
              liff.closeWindow();
          } else {
              // Otherwise, go back in browser history
              window.history.back();
          }
      });
  }

  // Task button functionality
  const taskButtons = document.querySelectorAll('.task-button');
  const tasks = [
      { name: 'Complete your profile', points: 50 },
      { name: 'Invite a friend', points: 20 },
      { name: 'Complete 5 tasks', points: 100 },
      { name: 'Share your progress', points: 30 }
  ];

  taskButtons.forEach((button, index) => {
      button.addEventListener('click', async () => {
          const task = tasks[index];
          
          try {
              // Send message to LINE chat if running in LINE app
              if (typeof liff !== 'undefined' && liff.isInClient()) {
                  await liff.sendMessages([{
                      type: 'text',
                      text: `🎯 Starting task: ${task.name}\n💰 Reward: ${task.points} points`
                  }]);
                  
                  console.log(`Task message sent: ${task.name}`);
              } else {
                  // Fallback for web browser
                  alert(`Starting task: ${task.name}\nReward: ${task.points} points`);
              }
              
              // You can add additional task logic here
              // For example, redirect to task-specific pages or update UI
              
          } catch (error) {
              console.error('Error starting task:', error);
              alert('Failed to start task. Please try again.');
          }
      });
  });

  // Add some visual feedback for button clicks
  const allButtons = document.querySelectorAll('button, .nav-item');
  allButtons.forEach(button => {
      button.addEventListener('click', function() {
          this.style.transform = 'scale(0.95)';
          setTimeout(() => {
              this.style.transform = 'scale(1)';
          }, 150);
      });
  });
});

// Optional: Add function to handle LIFF events
if (typeof liff !== 'undefined') {
  liff.ready.then(() => {
      console.log('LIFF is ready');
      
      // You can add additional LIFF-specific functionality here
      // For example, get user profile information
      if (liff.isLoggedIn()) {
          liff.getProfile().then(profile => {
              console.log('User profile:', profile);
              // You can use profile.displayName, profile.pictureUrl, etc.
          }).catch(error => {
              console.error('Error getting profile:', error);
          });
      }
  });
}