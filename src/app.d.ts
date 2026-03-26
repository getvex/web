import type { Theme, Plugin } from "@generated/client"

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
            themes: Theme[]
            plugins: Plugin[]
        }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
