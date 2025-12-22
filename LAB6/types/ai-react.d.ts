declare module "ai/react" {
  export function useChat(options?: { api?: string }): {
    messages: Array<{ id: string; role: string; content: string }>;
    input: string;
    handleInputChange: (e: any) => void;
    handleSubmit: (e?: any) => void;
    isLoading: boolean;
  };

  const _default: { useChat: typeof useChat };
  export default _default;
}
