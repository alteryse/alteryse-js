# Alteryse Js

Is a JavaScript library that provides an easy-to-use interface for interacting with the Alteryse Instances.

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [API Reference](#api-reference)
    -   [TextGeneration Class](#textgeneration-class)
        -   [Constructor](#constructor)
        -   [generate](#generate)
        -   [chat](#chat)
-   [Error Handling](#error-handling)
-   [License](#license)

## Installation

#### With NPM

```bash
npm install alteryse
```

#### With Bun

```bash
bun install alteryse
```

## Usage

### Basic Example

To use the Alteryse library, create an instance of the `TextGeneration` class with your instance ID and API key:

```javascript
import { TextGeneration } from 'alteryse';

// Initialize the TextGeneration instance
const textGen = new TextGeneration({
	instanceId: 'your-instance-id',
	apiKey: 'your-api-key'
});

// Generate text based on a prompt
const generateText = async () => {
	try {
		const response = await textGen.generate('What is the capital of France?');
		console.log(response); // Logs the generated text
	} catch (error) {
		console.error('Error generating text:', error);
	}
};

generateText();
```

### Chat Example

You can also use the library to send chat messages:

```javascript
// Send a chat message
const sendChatMessage = async () => {
	try {
		const messages = [
			{ role: 'user', content: 'Hello, how are you?' },
			{ role: 'assistant', content: 'I am fine, thank you!' }
		];
		const response = await textGen.chat(messages);
		console.log(response); // Logs the chat response
	} catch (error) {
		console.error('Error in chat:', error);
	}
};

sendChatMessage();
```

### Generating Text with Options

You can customize the text generation with additional options like `temperature` and `top_p`:

```javascript
const options = {
	temperature: 0.7, // Controls the randomness of the output. Lower values make the output more deterministic.
	top_p: 0.9 // Controls the diversity of the output. Values between 0 and 1 limit the set of possible outputs.
};

// Generate text with options
const generateTextWithOptions = async () => {
	try {
		const response = await textGen.generate('Tell me a joke.', options);
		console.log(response); // Logs the generated joke
	} catch (error) {
		console.error('Error generating text with options:', error);
	}
};

generateTextWithOptions();
```

## API Reference

### TextGeneration Class

The `TextGeneration` class provides methods to interact with the Alteryse API.

#### Constructor

```typescript
constructor(params: { instanceId: string; apiKey: string });
```

-   **params**: An object containing:
    -   **instanceId**: The ID of the instance to connect to.
    -   **apiKey**: The API key for authorization.

#### generate

```typescript
generate(prompt: string, images?: Images, options?: Options): Promise<GenerateResponse>;
```

-   **prompt**: The text prompt to generate text from.
-   **images**: Optional images to be included in the generation process.
-   **options**: Optional settings for the generation process.
-   **Returns**: A promise that resolves to a `GenerateResponse` object.
-   **Throws**: Error if the request fails or returns a 503 status.

#### chat

```typescript
chat(messages: ChatRequest['messages'], options?: Options): Promise<ChatResponse>;
```

-   **messages**: An array of chat messages to be sent, each with the following structure:
    ```typescript
    {
        role: 'system' | 'user' | 'assistant';
        content: string;
        images?: Images; // Optional images to include with the message
    }
    ```
-   **options**: Optional settings for the chat process.
-   **Returns**: A promise that resolves to a `ChatResponse` object.
-   **Throws**: Error if the request fails or returns a 503 status.

## Error Handling

The library handles errors internally and throws them when the API responds with an error status (e.g., 503). You can catch these errors in your implementation to manage user feedback or retries accordingly.

```javascript
try {
	const response = await textGen.generate('Your prompt here');
} catch (error) {
	console.error('Error:', error.message);
}
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
