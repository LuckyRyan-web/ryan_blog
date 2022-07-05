function isValid(s: string): boolean {
    if (s.length % 2 !== 0) {
        return false
    }

    const stack: string[] = []

    for (let i = 0; i < s.length; i++) {
        const check = s[i]

        if (['(', '[', '{'].includes(check)) {
            stack.push(check)
        } else {
            const top = stack[stack.length - 1]

            if (
                (top === '[' && check === ']') ||
                (top === '{' && check === '}') ||
                (top === '(' && check === ')')
            ) {
                stack.pop()
            } else {
                return false
            }
        }
    }

    return stack.length === 0
}
