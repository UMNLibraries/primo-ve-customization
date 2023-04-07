export interface Analytics {
  trackPageviews(): void;
  trackEvent(category: string, action: string, label?: string): void;
}
