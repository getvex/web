export class DocsHelper {

    copying: Record<string, boolean>

    constructor(
        public baseUrl: string,
    ) {
        this.copying = $state<Record<string, boolean>>({})
    }

    copyLink(hash: string) {
        if (!hash) return
        this.setCopying(hash, true)
        navigator.clipboard.writeText(`${this.baseUrl}#${hash}`)
        setTimeout(() => this.setCopying(hash, false), 2000)
    }

    isCopying(hash: string) {
        return !!this.copying[hash]
    }

    setCopying(hash: string, value: boolean) {
        if (value) this.copying[hash] = true
        else delete this.copying[hash]
    }

}
