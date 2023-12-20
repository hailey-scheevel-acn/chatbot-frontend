// Update this string to match your API uri (eg. '1.1.1.27/8080')
export const URISTRING: string = 'localhost';

export function getTime() {
  let daysOfWeek : Array<string> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  let now = new Date()
  let time = daysOfWeek[now.getDate()] + ' @ ' + now.getHours() + ':' + (now.getMinutes()<10?'0':'') + now.getMinutes()
  
  return time
}

// Enter your configuration options here, following the format of the example config
// All config items must have an id, configName, databaseName, and displayName, other fields can be added
// The id is arbitrary so it can be any number, but it must be unique within the bounds of the config options
export const configOptions = [
    { id: 1, configName: 'example_config', databaseName: 'MySQL Database 1', displayName: 'Example Configuration' },
    { id: 2, configName: 'example_config2', databaseName: 'PostgreSQL Database 2', displayName: 'Example Config 2' }
]

export default function typewriter(node: any, { delay = 0, speed = 50 }) {
  const textNodes = getAllTextNodes(node);
  if (!textNodes.length) {
      throw new Error(`This transition only works on elements with text nodes`);
  }

  let totalLength = 0;
  const ranges = textNodes.map(textNode => {
      const range = [totalLength, totalLength + textNode.textContent.length];
      totalLength += textNode.textContent.length;
      const text = textNode.textContent;
      textNode.textContent = '';
      return { textNode, range, text };
  });

  let currentRangeIndex = 0;
  function getCurrentRange(i: any) {
      while (ranges[currentRangeIndex].range[1] < i && currentRangeIndex < ranges.length) {
          const { textNode, text } = ranges[currentRangeIndex];
          textNode.textContent = text;
          currentRangeIndex++;
      }
      return ranges[currentRangeIndex];
  }
  const duration = totalLength * speed;

  return {
      delay,
      duration,
      tick: (t: number) => {
          const progress = ~~(totalLength * t);
          const { textNode, range, text } = getCurrentRange(progress);
          const [start, end] = range;
          const textLength = ((progress - start) / (end - start)) * text.length;
          textNode.textContent = text.slice(0, textLength);
      },
  };
}


function getAllTextNodes(node: { nodeType: number; hasChildNodes: () => any; childNodes: any; }) {
  if (node.nodeType === 3) {
      return [node];
  } else if (node.hasChildNodes()) {
      let list: any[] = [];
      for (let child of node.childNodes) {
          getAllTextNodes(child).forEach(textNode => list.push(textNode));
      }
      return list;
  }
  return [];
}