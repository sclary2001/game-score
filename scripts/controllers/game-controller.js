import { initializeSession, savePlayer, resetSession } from '../modules/game-session.js';
import { recordGarfieldHighScore } from '../modules/score-manager.js';
import { getLeaderboard } from '../modules/leaderboard.js';
import { renderStatus, renderLeaderboard } from '../modules/ui.js';
import { logAction } from '../modules/utils.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log("App loaded");

  // Initialize safely
  try {
    initializeSession();
    renderStatus('Session initialized. Ready.');
  } catch (err) {
    console.error("Initialization error:", err);
  }

  const savePlayerBtn = document.querySelector('#save-player-btn');
  const recordScoreBtn = document.querySelector('#record-score-btn');
  const resetGameBtn = document.querySelector('#reset-game-btn');
  const viewLeaderboardBtn = document.querySelector('#view-leaderboard-btn');

  // Debug DOM elements
  console.log("Buttons:", savePlayerBtn, recordScoreBtn, resetGameBtn, viewLeaderboardBtn);

  // SAFETY CHECK (prevents crashes)
  if (!savePlayerBtn || !recordScoreBtn || !resetGameBtn || !viewLeaderboardBtn) {
    console.error("One or more buttons not found in HTML");
    return;
  }

  // BUTTON EVENTS

  savePlayerBtn.addEventListener('click', () => {
    console.log("Save Player clicked");

    try {
      savePlayer();
      logAction('Saved player Sean Clary');
      renderStatus('Player saved as Sean Clary.');
    } catch (err) {
      console.error(err);
      renderStatus('Error saving player.');
    }
  });

  recordScoreBtn.addEventListener('click', () => {
    console.log("Record Score clicked");

    try {
      const result = recordGarfieldHighScore();
      logAction('Record high score button clicked');
      renderStatus(result?.message || 'Score recorded.');
    } catch (err) {
      console.error(err);
      renderStatus('Error recording score.');
    }
  });

  resetGameBtn.addEventListener('click', () => {
    console.log("Reset clicked");

    try {
      resetSession();
      logAction('Game reset');
      renderStatus('Game session reset.');
      renderLeaderboard([]);
    } catch (err) {
      console.error(err);
      renderStatus('Error resetting game.');
    }
  });

  viewLeaderboardBtn.addEventListener('click', () => {
    console.log("Leaderboard clicked");

    try {
      const scores = getLeaderboard();
      logAction('Viewed leaderboard');
      renderLeaderboard(scores);
      renderStatus('Leaderboard displayed.');
    } catch (err) {
      console.error(err);
      renderStatus('Error loading leaderboard.');
    }
  });
});
