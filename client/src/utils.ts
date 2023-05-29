export const isHTMLCanvasElement = (element: HTMLElement | null): element is HTMLCanvasElement => {
  return element?.tagName === 'CANVAS';
};

export const createMatrix = <T>(columns: number, rows: number): T[][] => {
  return Array(rows)
    .fill(null)
    .map(() => Array(columns).fill(null));
};
