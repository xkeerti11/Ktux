let _token: string | null = null;

// Memory-only token store — per Instruction.md: NEVER use localStorage for tokens
export const tokenStore = {
  get: (): string | null => _token,
  set: (t: string): void => { _token = t; },
  clear: (): void => { _token = null; },
};
