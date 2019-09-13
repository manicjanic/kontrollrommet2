
// disabled, hidden, 

// Takes a base CSS text, and adds the proper CSS tag based on a status
export function cssModifier(base, status) {
    let classname = base
    if (status === "disabled") {
        classname += " disabled"
    }
    if (status === "hidden") {
        classname += " d-none"
    }
    return classname
}

