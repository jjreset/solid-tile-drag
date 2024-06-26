export function isMouseEvent(event) {
  return event instanceof MouseEvent;
}

export function isTouchEvent(event) {
  return 'ontouchstart' in window && event.type.startsWith('touch');
}

export function convertIndexToString(rowIndex, colIndex) {
  return `${rowIndex}-${colIndex}`;
}

export function convertStringToIndex(indexString) {
  if (!indexString.includes('-')) {
    throw new Error('indexString must be in the format of "rowIndex-colIndex"');
  }

  return indexString.split('-').map(Number);
}

export function getTableCellElement(e) {
  let target;

  if (isTouchEvent(e) && e.touches) {
    const { clientX, clientY } = e.touches[0];
    target = document.elementFromPoint(clientX, clientY);
  } else if (isMouseEvent(e)) {
    target = e.target;
  }

  if (target instanceof HTMLTableCellElement && target.tagName === 'TD') {
    return target;
  }

  return null;
}

export function getTableCellIndex(e) {
  let rowIndex = null;
  let colIndex = null;

  const target = getTableCellElement(e);

  if (!target) {
    return null;
  }

  if (target.parentNode instanceof HTMLTableRowElement) {
    const tr = target.parentNode;

    rowIndex = tr.sectionRowIndex;

    const tds = tr.querySelectorAll('td');

    for (let i = 0; i < tds.length; i++) {
      if (tds[i] === target) {
        colIndex = i;
        break;
      }
    }
  }

  if (rowIndex === null || colIndex === null) {
    return null;
  }

  return { rowIndex, colIndex };
}
