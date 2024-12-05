import React from 'react';
import './Dashboard.scss';

function Dashboard() {
  return (
    <div className="dashboard">
      <header>
        <h1 tabIndex="0">Dashboard</h1>
      </header>
      <section>
        <h2 tabIndex="0">Recent Innovations in Clean Energy</h2>
        <p>
          In the last six months, the clean energy sector has witnessed remarkable advancements. A notable trend is the surge in investment in clean energy technologies, projected to reach nearly $800 billion in 2024, driven primarily by solar and wind energy. This marks a significant increase from previous years, indicating a growing commitment to sustainable energy solutions.
        </p>
        <p>
          Offshore wind energy is also on the rise, with over 60 gigawatts of new capacity expected to be auctioned across 17 different markets in 2024, setting an unprecedented milestone. Additionally, innovations in battery storage technologies are gaining momentum, essential for addressing energy supply and demand fluctuations.
        </p>
        <p>
          Moreover, the adoption of hydrogen as a clean energy source is expanding, particularly in Europe and Australia, with consumption mandates being introduced. These advancements not only enhance energy security but also contribute to reducing global emissions and combating climate change.
        </p>
        <p>
          For more details, you can read the full article{' '}
          <a
            href="https://press.spglobal.com/2024-01-22-TOP-10-Trends-in-Clean-Energy-Technology-in-2024-S-P-Global-Commodity-Insights"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Read the full article on trends in clean energy technology"
          >
            here
          </a>
          .
        </p>
      </section>
      <section>
        <h2 tabIndex="0">Technical Aspects of the Project</h2>
        <p>
          Our project leverages modern web technologies, employing React for the frontend, Node.js for the backend, and MySQL for data management. This tech stack allows for a responsive user interface and efficient data handling, ensuring a seamless user experience. The infrastructure is hosted on cloud services, providing scalability and reliability, which are essential for handling increasing user traffic and data volume.
        </p>
      </section>
    </div>
  );
}

export default Dashboard;
