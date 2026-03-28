import VesperLight from "@assets/vesper-light.json" with { type: "json" }
import { createHighlighter } from "shiki"

const highlighter = await createHighlighter({
    themes: [VesperLight, "vesper"],
    langs: ["typescript", "javascript", "css", "shell", "text"]
})

const shikiOptions = {
    themes: {
        dark: "vesper",
        light: "vesper-light"
    },
    defaultColor: "dark"
}

export class ShikiHandler {

    constructor() {
        throw new Error("Cannot instantiate abstract class")
    }

    static codeToHtml(code: string, lang: any) {
        return highlighter.codeToHtml(code, {
            lang,
            ...shikiOptions
        })
    }

}
