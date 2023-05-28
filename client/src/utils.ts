export const isHTMLCanvasElement = (element: HTMLElement | null): element is HTMLCanvasElement => {
  return element?.tagName === 'CANVAS';
};
