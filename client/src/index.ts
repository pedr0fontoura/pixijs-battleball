import { Application } from 'pixi.js'

const isHTMLCanvasElement = (element: HTMLElement | null): element is HTMLCanvasElement => {
  return element?.tagName === 'CANVAS';
}

const view = document.getElementById('app')

if (!isHTMLCanvasElement(view)) {
  throw new Error('Failed to locate the application container')
}

const app = new Application({
  view,
  resizeTo: document.body,
  backgroundColor: '#72cce9'
});