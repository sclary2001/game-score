import { initializeSession, savePlayer, resetSession } from '../modules/game-session.js';
import { recordGarfieldHighScore } from '../modules/score-manager.js';
import { getLeaderboard } from '../modules/leaderboard.js';
import { renderStatus, renderLeaderboard } from '../modules/ui.js';
import { logAction } from '../modules/utils.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log("App loaded");

  initializeSession();
  renderStatus('Session initialized. Ready.');

  const savePlayerBtn = document.querySelector('#save-player-btn');
  const recordScoreBtn = document.querySelector('#record-score-btn');
  const resetGameBtn = document.querySelector('#reset-game-btn');
  const viewLeaderboardBtn = document.querySelector('#view-leaderboard-btn');

  console.log({ savePlayerBtn, recordScoreBtn, resetGameBtn, viewLeaderboardBtn });

  savePlayerBtn.addEventListener('click', () => {
    savePlayer();
    console.log("Save Player clicked");
    logAction('Saved player Sean Clary');
    renderStatus('Player saved as Sean Clary.');
  });

  recordScoreBtn.addEventListener('click', () => {
    const result = recordGarfieldHighScore();
    console.log(result);
    logAction('Recorded high score');
    renderStatus(result.message);
  });

  resetGameBtn.addEventListener('click', () => {
    resetSession();
    console.log("Game reset");
    logAction('Game reset');
    renderStatus('Game session reset.');
    renderLeaderboard([]);
  });

  viewLeaderboardBtn.addEventListener('click', () => {
    const scores = getLeaderboard();
    console.log(scores);
    logAction('Viewed leaderboard');
    renderLeaderboard(scores);
    renderStatus('Leaderboard displayed.');
  });
});
