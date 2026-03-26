export function tapOutside(node: Node, callback: (node: Event) => void) {
    return outside(node, "click", callback)
}

export function clickOutside(node: Node, callback: (node: Event) => void) {
    return outside(node, "mousedown", callback)
}

export function escape(node: Node, callback: (node: Event) => void) {
    return keyup(node, "Escape", callback)
}

function keyup(node: Node, key: KeyboardEvent["key"], callback: (node: Event) => void) {

    const handleKeyUp = (event: KeyboardEvent) => {
        if (event.key === key && !event.defaultPrevented) {
            callback(event)
        }
    }

    document.addEventListener("keyup", handleKeyUp)

    return {
        destroy() {
            document.removeEventListener("keyup", handleKeyUp)
        }
    }

}

function outside(node: Node, listener: string, callback: (node: Event) => void) {

    const handleClick = (event: Event) => {
        if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
            callback(event)
        }
    }

    document.addEventListener(listener, handleClick)

    return {
        destroy() {
            document.removeEventListener(listener, handleClick)
        }
    }

}
