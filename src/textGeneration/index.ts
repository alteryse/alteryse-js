import type { ChatRequest, ChatResponse, GenerateResponse, Images, Options } from './types';
import axios, { AxiosInstance } from 'axios';

/**
 * Class representing a text generation client using Axios.
 */
export class TextGeneration {
	private client: AxiosInstance;

	/**
	 * Creates an instance of TextGeneration.
	 *
	 * @param params - The configuration parameters for the client.
	 * @param params.instanceId - The ID of the instance to connect to.
	 * @param params.apiKey - The API key for authorization.
	 */
	constructor(params: { instanceId: string; apiKey: string }) {
		this.client = axios.create({
			baseURL: `https://instances.alteryse.cloud/${params.instanceId}`,
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': params.apiKey
			}
		});
	}

	/**
	 * Generates text based on the provided prompt.
	 *
	 * @param prompt - The text prompt to generate text from.
	 * @param images - Optional images to be used in the generation process.
	 * @param options - Optional settings for the generation process.
	 * @returns A promise that resolves to a GenerateResponse object.
	 * @throws Error if the request fails or returns a 503 status.
	 */
	public async generate(prompt: string, images?: Images, options?: Options): Promise<GenerateResponse> {
		try {
			const { data } = await this.client.post('/', {
				options: options ?? undefined,
				images: images ?? undefined,
				mode: 'generate',
				stream: false,
				prompt
			});

			return data as GenerateResponse;
		} catch (error: any) {
			if (error.response && error.response.status === 503) {
				throw new Error(error.response.data.code);
			}

			throw new Error('Something went wrong');
		}
	}

	/**
	 * Sends chat messages to the text generation service.
	 *
	 * @param messages - An array of chat messages to be sent.
	 * @param options - Optional settings for the chat process.
	 * @returns A promise that resolves to a ChatResponse object.
	 * @throws Error if the request fails or returns a 503 status.
	 */
	public async chat(messages: ChatRequest['messages'], options?: Options): Promise<ChatResponse> {
		try {
			const { data } = await this.client.post('/', {
				options: options ?? undefined,
				stream: false,
				mode: 'chat',
				messages
			});

			return data as ChatResponse;
		} catch (error: any) {
			if (error.response && error.response.status === 503) {
				throw new Error(error.response.data.code);
			}

			throw new Error('Something went wrong');
		}
	}

	/**
	 * Parses a chunk of data from the response.
	 *
	 * @param chunk - The chunk of data to be parsed.
	 * @returns The parsed data or undefined if parsing fails.
	 */
	private parseChunk(chunk: any): any {
		try {
			return JSON.parse(chunk.toString());
		} catch {
			// Return undefined if parsing fails
			return undefined;
		}
	}
}
