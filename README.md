<p align="center">
  <a href="https://www.spot.egeuysal.com/">
    <img src="https://res.cloudinary.com/ddjnqljd8/image/upload/v1746071119/spot-logo.png" height="96">
    <h3 align="center">Spot</h3>
  </a>
</p>

<p align="center">
  Find. Explore. Enjoy.
</p>

<p align="center">
  <strong>
    <a href="https://www.spot.egeuysal.com/docs">Documentation</a> ∙ 
    <a href="https://www.spot.egeuysal.com/changelog">Changelog</a> ∙ 
    <a href="CONTRIBUTING.md">Contributing</a>
  </strong>
</p>

## Spot

**Spot** is a smart, personalized event discovery platform designed to help users find, explore, and enjoy events happening around them. Powered by AI, Spot tailors event suggestions based on user preferences and personality, helping individuals discover everything from concerts to local meetups. With Spot, event discovery is personalized and effortless.

### Features

- **Personalized Recommendations**: Spot suggests local events based on the user’s location and interests.
- **AI-Powered Personality Analysis**: Spot uses AI to analyze user input and tailor recommendations according to personality and preferences.
- **Real-Time Event Data**: Fetches data from various local event APIs to ensure up-to-date event listings.
- **User-Friendly Interface**: A clean, responsive design optimized for both desktop and mobile.
- **Seamless User Experience**: Easily discover events with minimal clicks and navigation.

### Installation

To set up the Spot project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/egeuysall/spot.git
   cd spot
   ```

2. Install dependencies using **pnpm**:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open the app in your browser at `http://localhost:3000`.

### Technologies Used

- **Next.js 15 (App Router)**: A React framework for building server-side rendered applications.
- **TypeScript**: For static type checking and enhanced development experience.
- **Tailwind CSS**: For utility-first CSS styling that promotes clean and maintainable UI.
- **OpenAI API**: Powers AI-driven personality analysis to deliver better event recommendations.
- **Event APIs**: Fetches real-time event data based on location and user preferences.

### Environment Variables

Ensure that your environment is correctly set up by adding any necessary variables to your `.env.local` file. Here is an example configuration:

```bash
NEXT_PUBLIC_EVENT_API_URL=<your-event-api-url>
OPENAI_API_KEY=<your-openai-api-key>
```

### Development

Spot is built with a focus on simplicity and performance. To start contributing, follow these guidelines:

- **Fork** the repository and **clone** it to your local machine.
- Install dependencies: `pnpm install`.
- Run the development server: `pnpm dev`.
- Follow the existing code patterns and conventions in the project.
- Before submitting pull requests, ensure all code is linted and formatted.

To run tests:
```bash
pnpm lint
```

### Roadmap

- **User Accounts**: Implement user profiles for saving preferences and event history.
- **Advanced Filters**: Provide users with additional filters, such as event categories, price range, and distance.
- **Event Interaction**: Enable users to interact with events through ratings, comments, and event RSVPs.

## License

Spot is open-source and released under the [Apache 2.0 License](LICENSE).

### Contact

If you have any questions or want to collaborate, feel free to reach out:

- **Email**: [hello@egeuysal.com](mailto:hello@egeuysal.com)
- **GitHub**: [@egeuysall](https://github.com/egeuysall)

Thank you for checking out **Spot**! We hope it helps you discover exciting events in your local community.
