# Podcast App
- Welcome to the Podcast App README! This project serves as a comprehensive platform for exploring and enjoying podcasts. Below, you'll find everything you need to get started, use the app effectively, and contact us for any questions.

## Table of Contents
1. Introduction
2. Setup Instructions
3. Usage Examples
4. Contact Information
# Introduction
- The Podcast App is designed as a portfolio piece, showcasing the ability to interact with podcast data via APIs and offering a user-friendly interface for discovering and listening to podcasts.
- It utilizes React and provides a robust build process for managing complexity. While TypeScript is recommended, it's optional based on your comfort level.

## Technology
- Frontend: React
- Build Process: Custom setup
- Additional Technologies: Optional use of TypeScript
## Data
- The app interacts with podcast data structured into three primary units:

- SHOW: Represents a podcast, containing one or more SEASONs.
- SEASON: A collection of EPISODEs released over a period.
- EPISODE: Corresponds to an MP3 file available for listening.
### Additionally, the API exposes:

- PREVIEW: A summarized version of a SHOW.
- GENRE: Information related to genres that can be assigned to a SHOW.
## Relationships
### Data units are related as follows:

- SHOW ___ SEASON
- SEASON ___ EPISODE
## Endpoints
### The data can be fetched from the following endpoints:

- https://podcast-api.netlify.app/: Returns an array of PREVIEW objects.
- https://podcast-api.netlify.app/genre/<ID>: Returns details of a specific GENRE.
- https://podcast-api.netlify.app/id/<ID>: Returns a detailed SHOW object with embedded SEASON and EPISODE data.
- 
## Genre Titles
### Genre information is mapped as follows:

1: Personal Growth
2: Investigative Journalism
3: History
4: Comedy
5: Entertainment
6: Business
7: Fiction
8: News
9: Kids and Family

# Setup Instructions
### To run the Podcast App locally, follow these steps:

## Clone the repository:

git clone <repository-url>
cd podcast-app
Install dependencies:

Copy code
npm install
Start the development server:

sql
Copy code
npm start
Open the app:
Open http://localhost:3000 to view it in the browser.

# Contact Information
### For further assistance or inquiries, feel free to reach out to us:

Email: ksandile127@gmail.com
LinkedIn: https://www.linkedin.com/in/sandile-kitayi-6aa393275/
Website: https://ksandile.github.io/Portfolio/
