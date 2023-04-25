import {
    ChatCompletionRequestMessage,
    Configuration,
    CreateChatCompletionRequest,
    OpenAIApi,
} from "openai";

class ChatCompletion {
    openai: OpenAIApi;
    defaultTemperature: number;
    defaultModel: string;
    defaultReplyMaxTokens: number;
    defaultMaxTokens: number;
    constructor(apiKey: string) {
        const config = new Configuration({
            apiKey: apiKey,
        });

        this.openai = new OpenAIApi(config);
        this.defaultTemperature = 0.7;
        this.defaultModel = "gpt-3.5-turbo";
        this.defaultReplyMaxTokens = 70;
        this.defaultMaxTokens = 100;
    }

    async getCompletion(
        prompt: ChatCompletionRequestMessage[],
        reply: boolean = true,
        options: CreateChatCompletionRequest = {
            model: this.defaultModel,
            messages: prompt,
            temperature: this.defaultTemperature,
            max_tokens: reply
                ? this.defaultReplyMaxTokens
                : this.defaultMaxTokens,
        }
    ) {
        const opts = options;
        opts.model = opts.model || this.defaultModel;
        opts.messages = opts.messages || prompt;
        opts.temperature = opts.temperature || this.defaultTemperature;
        opts.max_tokens =
            opts.max_tokens || reply
                ? this.defaultReplyMaxTokens
                : this.defaultMaxTokens;
        try {
            const response = await this.openai.createChatCompletion(opts);

            return response.data.choices[0].message;
        } catch (err) {
            throw new Error(
                `Unable to get completion from OpenAI API.\n${err}`
            );
        }
    }
}

export default ChatCompletion;