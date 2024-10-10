export type Images = Array<string>;

export interface GenerateResponse {
	content: string;
}

export interface ChatRequest {
	messages: Array<{
		role: 'system' | 'user' | 'assistant';
		content: string;
		images?: Images;
	}>;
}

export interface ChatResponse {
	content: string;
}

export interface Options {
	numa?: boolean;
	num_ctx?: number;
	num_batch?: number;
	logits_all?: boolean;
	vocab_only?: boolean;
	num_thread?: number;
	num_keep?: number;
	seed?: number;
	num_predict?: number;
	top_k?: number;
	top_p?: number;
	tfs_z?: number;
	typical_p?: number;
	repeat_last_n?: number;
	temperature?: number;
	repeat_penalty?: number;
	presence_penalty?: number;
	frequency_penalty?: number;
	mirostat?: number;
	mirostat_tau?: number;
	mirostat_eta?: number;
	penalize_newline?: boolean;
	stop?: string[];
}
