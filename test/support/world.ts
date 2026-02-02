import { IWorldOptions, World, setWorldConstructor } from '@cucumber/cucumber'
import { BrowserContext, Page } from '@playwright/test'

/**
 * Custom World interface that extends Cucumber's base World.
 * Provides typed access to Playwright browser instances and context.
 */
export interface ICustomWorld extends World {
  /** Playwright Page instance for browser automation */
  page?: Page
  /** Playwright BrowserContext for managing browser state and cookies */
  context?: BrowserContext
  /** Scenario-scoped data session */
  dataSession: Map<string, unknown>

  // Convenience helpers
  setData<T = unknown>(key: string, value: T): void
  getData<T = unknown>(key: string): T | undefined
  hasData(key: string): boolean
  clearData(): void
}

/**
 * Custom World class for Cucumber scenarios.
 * Each scenario gets a fresh instance of this class, ensuring test isolation.
 * The World holds shared state (page, context) that's accessible across all step definitions.
 */
export class CustomWorld extends World implements ICustomWorld {
  /** Playwright Page instance for browser automation */
  page?: Page
  /** Playwright BrowserContext for managing browser state and cookies */
  context?: BrowserContext

  /** One fresh storing of data per scenario */
  dataSession = new Map<string, unknown>()

  /**
   * Creates a new CustomWorld instance for a Cucumber scenario.
   * @param options - World options provided by Cucumber, including parameters from cucumber.js
   */
  constructor(options: IWorldOptions) {
    super(options)
  }

  setData<T = unknown>(key: string, value: T): void {
    this.dataSession.set(key, value)
  }

  getData<T = unknown>(key: string): T | undefined {
    return this.dataSession.get(key) as T | undefined
  }

  hasData(key: string): boolean {
    return this.dataSession.has(key)
  }

  clearData(): void {
    this.dataSession.clear()
  }
}

setWorldConstructor(CustomWorld)
