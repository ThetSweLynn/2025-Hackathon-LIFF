async function initializeLiff() {
  try {
      await liff.init({ liffId: "YOUR-LIFF-ID" });
      if (!liff.isInClient() && !liff.isLoggedIn()) {
          liff.login();
      }
  } catch (error) {
      console.error("Error initializing LIFF:", error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initializeLiff();

  // Navigation
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
      item.addEventListener('click', (e) => {
          e.preventDefault();
          navItems.forEach(nav => nav.classList.remove('active'));
          item.classList.add('active');
      });
  });

  // Back button
  document.querySelector('.back-button').addEventListener('click', () => {
      if (liff.isInClient()) {
          liff.closeWindow();
      } else {
          window.history.back();
      }
  });

  // Task buttons
  document.querySelectorAll('.task-button').forEach((button, index) => {
      button.addEventListener('click', async () => {
          const tasks = [
              { name: 'Complete profile', points: 50 },
              { name: 'Invite friend', points: 20 },
              { name: 'Complete 5 tasks', points: 100 },
              { name: 'Share progress', points: 30 }
          ];

          if (liff.isInClient()) {
              await liff.sendMessages([{
                  type: 'text',
                  text: `Starting task: ${tasks[index].name} (${tasks[index].points} points)`
              }]);
          }
      });
  });
});
