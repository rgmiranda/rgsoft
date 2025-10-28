export function gaussJordan(matrix: number[][]): number[][] {
    if (!Array.isArray(matrix)) {
        throw new Error('Array of arrays expected');
    }
    const numRows = matrix.length;
    if (numRows === 0) {
        throw new Error('Empty array received');
    }
    if (!Array.isArray(matrix[0])) {
        throw new Error('Array of arrays expected');
    }
    const numCols = matrix[0].length;
    if (numCols === 0) {
        throw new Error('Empty array received');
    }
    
    const reduced : number[][] = matrix.map(row => [...row]);

    reduced.forEach((row, i) => {
        if (row.length !== numCols) {
            throw new Error(`Row ${i} not matching length`);
        }
    });

    const matrixSize = Math.min(numRows, numCols - 1);

    for (let i = 0; i < matrixSize; i++) {
        if (reduced[i][i] === 0) {
            let j = i + 1;
            let found = false;
            while (!found && j < numRows) {
                if (reduced[j][i] !== 0) {
                    [reduced[i], reduced[j]] = [reduced[j], reduced[i]]
                    found = true;
                }
                j++;
            }
            if (!found) {
                throw new Error(`No reductible value found on column ${i}`);
            }
        }
        
        for (let j  = i + 1; j < numRows; j++) {
            if (reduced[j][i] === 0) {
                continue;
            }
            const mult = - reduced[j][i] / reduced[i][i];
            for (let k = i; k < numCols; k++) {
                reduced[j][k] += mult * reduced[i][k];
            }
        }
    }

    for (let i = matrixSize - 1; i >= 0; i--) {
        for (let j = 0; j < i; j++) {
            if (reduced[j][i] === 0) {
                continue;
            }
            const mult = - reduced[j][i] / reduced[i][i];
            for (let k = i; k < numCols; k++) {
                reduced[j][k] += mult * reduced[i][k];
            }
        }
        reduced[i][numCols - 1] /= reduced[i][i];
        reduced[i][i] /= reduced[i][i];
    }
    return reduced;
}