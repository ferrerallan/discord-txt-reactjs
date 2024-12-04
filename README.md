
# Simple Real-Time Chat Frontend

## Description

This project is the frontend component of a real-time chat application built with **React** and **TypeScript**. It provides a user-friendly interface for connecting to a WebSocket server, sending messages, and receiving real-time updates. The application is styled with Tailwind CSS for a clean and responsive design.

This frontend communicates with the backend at `ws://localhost:8000/ws`, which can be found [here](https://github.com/ferrerallan/discord-txt-fastapi).

## Requirements

- Node.js 14 or higher
- npm or yarn
- A running instance of the [backend server](https://github.com/ferrerallan/discord-txt-fastapi).

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ferrerallan/discord-txt-reactjs.git
   ```

2. Navigate to the project directory:
   ```bash
   cd discord-txt-reactjs
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

4. Start the development server:
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Features

- **Username Setup:** Allows users to enter their name before joining the chat.
- **Real-Time Messaging:** Sends and receives messages in real time using WebSocket communication.
- **Message History Display:** Displays a scrollable list of previous and new messages.
- **Responsive Design:** Tailwind CSS ensures that the application is responsive and visually appealing.

## Code Overview

### Key Components

#### `Chat.tsx`
- **State Management:**
  - `messages`: Stores the list of chat messages.
  - `newMessage`: Stores the user's input for the new message.
  - `username`: Stores the username of the user.
  - `socket`: Manages the WebSocket connection.

- **WebSocket Integration:**
  - Connects to `ws://localhost:8000/ws` on component mount.
  - Receives and processes two types of messages:
    - `message_history`: Loads the entire message history.
    - `new_message`: Appends a new message to the chat.

- **Message Input and Sending:**
  - Users can type and send messages by pressing "Enter" or clicking the "Enviar" button.
  - Messages are sent to the backend as JSON objects.

- **UI Features:**
  - Chat bubble design with sender initials.
  - Responsive input area for composing messages.

### Example Workflow

1. User enters their username to join the chat.
2. The frontend connects to the WebSocket server.
3. Past chat messages are displayed.
4. New messages are instantly added to the chat in real time.

## Development Notes

- **Backend Dependency:** Ensure the backend server is running at `ws://localhost:8000/ws` before starting the frontend.
- **Styling:** Customize the design using Tailwind CSS classes.

## Mode of Use

1. Start the backend server:
   ```bash
   uvicorn main:app --reload
   ```
2. Run the frontend application:
   ```bash
   npm start
   ```
3. Open the chat application in your browser at `http://localhost:3000`.
