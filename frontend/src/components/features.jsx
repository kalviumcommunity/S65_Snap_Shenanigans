import React from 'react';

function Features() {
  return (
    <div>
      <h2>Key Features</h2>
      <ul>
        <li><strong>User Authentication:</strong> Secure login and signup functionality, with optional OAuth (e.g., Google, Facebook).</li>
        <li><strong>Personalized Lists:</strong> Users can create their own list of questionable selfie locations with descriptions, categories, and optional photos.</li>
        <li><strong>Image Uploads:</strong> Allow users to upload and display photos of the selfie locations.</li>
        <li><strong>Categories and Tags:</strong> Users can classify their entries under quirky categories like "Public Embarrassment," "Dangerously Funny," or "Weirdly Creative."</li>
        <li><strong>Global Trends:</strong> A public leaderboard showcasing the top-voted or most-viewed entries.</li>
        <li><strong>Social Features:</strong> Share lists or individual entries via social media. Like, comment, and interact with other users' lists.</li>
        <li><strong>Gamification (Optional):</strong> Earn badges and awards for adding unique or highly popular entries.</li>
        <li><strong>Mobile-First Design:</strong> Accessible and optimized for mobile users to upload photos or browse entries quickly.</li>
      </ul>
    </div>
  );
}

export default Features;