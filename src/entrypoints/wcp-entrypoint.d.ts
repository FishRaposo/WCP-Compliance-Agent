type StepFinishCallback = (args: {
    text?: string;
    toolCalls?: unknown;
    toolResults?: unknown;
    finishReason?: string;
}) => void;
export declare function generateWcpDecision(args: {
    content: string;
    mastraInstance?: {
        getAgent: (name: string) => Promise<{
            generate: Function;
        }>;
    };
    maxSteps?: number;
    onStepFinish?: StepFinishCallback;
}): Promise<any>;
export {};
//# sourceMappingURL=wcp-entrypoint.d.ts.map