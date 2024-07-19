

const bubbleSort = async (items) => {
    const size = items.length
    for (let i = 0; i < size; ++i) {
        for (let j = 0; j < size - i - 1; ++j) {
            if (abortOp) return
            items[j].style.backgroundColor = "red";
            await new Promise(resolve => setTimeout(resolve, timeDelay));
            const currentWidth = getWidth(items[j]);
            const nextWidth = getWidth(items[j + 1]);
            if (currentWidth > nextWidth) {
                items[j].style.width = `${nextWidth}px`;
                items[j + 1].style.width = `${currentWidth}px`;
            }
            items[j].style.backgroundColor = "gray";
        }
        items[size - 1 - i].style.backgroundColor = "green";
    }
}

const selectionSort = async (items) => {
    const size = items.length
    for (let i = 0; i < size - 1; ++i) {
        let maxIndex = i
        items[maxIndex].style.backgroundColor = "yellow"
        for (let j = i + 1; j < size; ++j) {
            if (abortOp) return
            items[j].style.backgroundColor = "red"
            await new Promise(resolve => setTimeout(resolve, timeDelay))
            if (getWidth(items[j]) < getWidth(items[maxIndex])) {
                items[maxIndex].style.backgroundColor = "gray"
                maxIndex = j;
                items[maxIndex].style.backgroundColor = "yellow"
            } else {
                items[j].style.backgroundColor = "gray"
            }
        }
        if (maxIndex !== i) {
            const temp = getWidth(items[i])
            items[i].style.width = `${getWidth(items[maxIndex])}px`
            items[maxIndex].style.width = `${temp}px`

        }
        items[maxIndex].style.backgroundColor = "gray"
        items[i].style.backgroundColor = "green"
    }
    items[size - 1].style.backgroundColor = "green"

}


const insertionSort = async (items) => {
    const size = items.length;
    items[0].style.backgroundColor = "green"
    for (let i = 1; i < size; ++i) {
        if (abortOp) return
        await new Promise(resolve => setTimeout(resolve, timeDelay))
        items[i].style.backgroundColor = "red"
        let current = i;
        while (current > 0 && getWidth(items[current]) < getWidth(items[current - 1])) {
            if (abortOp) return
            let temp = getWidth(items[current]);
            items[current].style.width = items[current - 1].style.width;
            items[current - 1].style.width = `${temp}px`;
            items[current - 1].style.backgroundColor = "yellow"
            await new Promise(resolve => setTimeout(resolve, timeDelay))
            items[current - 1].style.backgroundColor = "green"
            --current;
        }
        await new Promise(resolve => setTimeout(resolve, timeDelay))
        items[i].style.backgroundColor = "green"
    }
};


const partition = async (items, start, end) => {
    let pivot = getWidth(items[end]);
    let actual = start;
    for (let i = start; i < end; ++i) {
        if (abortOp) return
        if (getWidth(items[i]) <= pivot) {
            [items[i].style.width, items[actual].style.width] = [items[actual].style.width, items[i].style.width];
            actual++;
            items[actual - 1].style.backgroundColor = "yellow";
            items[i].style.backgroundColor = "red";
            await new Promise(resolve => setTimeout(resolve, timeDelay));
            items[actual - 1].style.backgroundColor = "gray";
            items[i].style.backgroundColor = "gray";
        }
    }
    [items[end].style.width, items[actual].style.width] = [items[actual].style.width, items[end].style.width];
    items[actual].style.backgroundColor = "green";
    return actual;
}

const quickSort = async (items, start = 0, end = items.length - 1) => {
    if (abortOp) return
    if (start < end) {
        let pivot = await partition(items, start, end, timeDelay);
        await quickSort(items, start, pivot - 1, timeDelay);
        await quickSort(items, pivot + 1, end, timeDelay);
    }
    try {
        items[start].style.backgroundColor = "green"
    } catch (err) {

    }
    try {
        items[end].style.backgroundColor = "green"
    } catch (err) {

    }
}


const merge = async (items, start, mid, end) => {
    if (abortOp) return
    const leftSize = mid - start + 1;
    const rightSize = end - mid;
    const leftArray = new Array(leftSize);
    const rightArray = new Array(rightSize);
    for (let i = 0; i < leftSize; i++) {
        leftArray[i] = items[start + i].style.width;
    }
    for (let j = 0; j < rightSize; j++) {
        rightArray[j] = items[mid + 1 + j].style.width;
    }

    let i = 0;
    let j = 0;
    let k = start;
    while (i < leftSize && j < rightSize) {
        if (abortOp) return
        if (parseInt(leftArray[i]) <= parseInt(rightArray[j])) {
            items[k].style.width = leftArray[i];
            i++;
        } else {
            items[k].style.width = rightArray[j];
            j++;
        }
        items[k].style.backgroundColor = "red";
        await new Promise(resolve => setTimeout(resolve, timeDelay));
        items[k].style.backgroundColor = "green"
        k++;
    }

    while (i < leftSize) {
        items[k].style.width = leftArray[i];
        items[k].style.backgroundColor = "red";
        await new Promise(resolve => setTimeout(resolve, timeDelay));
        items[k].style.backgroundColor = "green";
        i++;
        k++;
    }

    while (j < rightSize) {
        items[k].style.width = rightArray[j];
        items[k].style.backgroundColor = "red";
        await new Promise(resolve => setTimeout(resolve, timeDelay));
        items[k].style.backgroundColor = "green";
        j++;
        k++;
    }
};

const mergeSort = async (items, start = 0, end = items.length - 1) => {
    if (abortOp) return
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    await mergeSort(items, start, mid);
    await mergeSort(items, mid + 1, end);
    await merge(items, start, mid, end);
};


const algorithms = {
    BS: bubbleSort,
    SS: selectionSort,
    IS: insertionSort,
    QS: quickSort,
    MS: mergeSort
}




