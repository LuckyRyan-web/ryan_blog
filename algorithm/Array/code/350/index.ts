/**
 * 简单的哈希表解法
 * 只需要存储数据到对象里面，然后再对 num2 进行遍历即可
 * @param nums1 
 * @param nums2 
 * @returns 
 */

function intersect(nums1: number[], nums2: number[]): number[] {
    const numObj = {}

    let res: number[] = []

    // 先调换位置，防止遍历 num1 存储到 map 的时候会遗漏
    if (nums1.length < nums2.length) {
        [nums1, nums2] = [nums2, nums1]
    }

    for (let i of nums1) {
        if (numObj[i]) {
            numObj[i]++
        } else {
            numObj[i] = 1
        }
    }

    for (let i of nums2) {
        const val = numObj[i]

        if (val > 0) {
            res.push(i)
            numObj[i]--
        }
    }

    return res
}
