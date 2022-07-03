function containsDuplicate2(nums: number[]): boolean {
    const numMap = {}

    for (let i of nums) {
        if (!numMap[i]) {
            numMap[i] = 1
        } else {
            return true
        }
    }

    return false
}
