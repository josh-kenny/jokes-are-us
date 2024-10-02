# Dad Joke Generator

Welcome to the Dad Joke Generator! This application is a fun, interactive way to get your daily dose of dad jokes. Built with modern web technologies, it offers a seamless user experience with multi-language support.

## Features

1. **Random Dad Joke Generation**: Fetch and display random dad jokes at the click of a button.

2. **Multi-language Support**: Translate jokes into multiple languages, including:
   - English
   - Spanish
   - French
   - German
   - Italian
   - Japanese
   - Korean
   - Chinese (Simplified)

3. **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices.

4. **Accessibility**: Implemented with accessibility best practices for an inclusive user experience.

5. **Error Handling**: Graceful error handling and display when joke fetching fails.

6. **Loading States**: Visual feedback during joke fetching and translation processes.

## Technologies and Techniques Used

1. **Next.js**: Utilizing the App Router for efficient, server-side rendered React applications.

2. **React**: Building the user interface with functional components and hooks.

3. **TypeScript**: Ensuring type safety throughout the application.

4. **Tailwind CSS**: Styling the application with a utility-first CSS framework.

5. **shadcn/ui**: Leveraging pre-built, customizable UI components for a polished look.

6. **Server Components**: Optimizing performance by rendering components on the server where possible.

7. **Client Components**: Using the 'use client' directive for interactive elements.

8. **Custom Hooks**: Implementing `useTranslation` for managing language state and translations.

9. **Context API**: Providing language and translation functions throughout the app.

10. **API Routes**: Creating a serverless function to handle translations securely.

11. **External APIs**: 
    - Fetching jokes from the "icanhazdadjoke" API
    - Using Google Translate API for multi-language support

12. **Environment Variables**: Securely storing API keys and other sensitive information.

13. **Error Boundaries**: Implementing error boundaries for graceful error handling.

14. **Accessibility Features**: 
    - Semantic HTML
    - ARIA attributes
    - Keyboard navigation support

15. **Responsive Design**: Using Tailwind's responsive classes for a mobile-first approach.

16. **Dynamic Imports**: Optimizing load times by dynamically importing components.

17. **Custom UI Components**: Creating reusable components like `LanguageSelector` and `TranslatedTitle`.

18. **Internationalization (i18n)**: Supporting multiple languages throughout the application.

19. **State Management**: Using React's useState and useEffect for local state management.

20. **Fetch API**: Making asynchronous requests to external APIs.

## Getting Started

To run this project locally:

1. Clone the repository
2. Install dependencies with `npm install`
3. Set up your environment variables in a `.env.local` file: