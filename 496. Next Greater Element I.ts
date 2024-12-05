// shitty brute force solution 
function nextGreaterElement1(nums1: number[], nums2: number[]): number[] {
    const ans = [];
    for (let i = 0; i < nums1.length; i++) {
        let j = 0
        while (nums1[i] !== nums2[j]) {
            j++;
        }
        while (j !== nums2.length && nums1[i] >= nums2[j]) {
            j++;
        }
        if (nums2[j] > nums1[i]) {
            ans.push(nums2[j]);
        } else {
            ans.push(-1);
        }
    }
    return ans;
};

//brute force but cleaner and readable
function nextGreaterElement2(nums1: number[], nums2: number[]): number[] {
    return nums1.map((num) => {
        //for each ele of nums1, serch in nums2
        let found = false;
        for (let i = 0; i < nums2.length; i++) {
            if (num === nums2[i]) found = true;
            if (found && nums2[i] > num) return nums2[i];
        }
        return -1;
    }
    )
}

//optimized
//using stack
//time: O(N+M)
//space: O(m)
function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
    const nextGreaterMap = new Map<number, number>();
    const stack:number[] = [];

    for(let num of nums2){
        //the current num could be the next larger of multiple previous vlaues
        while(stack.length && stack[stack.length-1] < num){
            nextGreaterMap.set(stack.pop()!, num);
        }
        stack.push(num);
    }
    return nums1.map((num)=> nextGreaterMap.get(num)?? -1);

}