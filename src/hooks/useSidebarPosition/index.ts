import { useEffect, useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';

export const useSidebarPosition = ({
  editorState,
}: {
  editorState: EditorState;
}) => {
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const [scale, setScale] = useState<number>(0);

  useEffect(() => {
    // Check from window object
    const windowSelection = window.getSelection();
    const windowFocusOffset = windowSelection?.focusOffset;
    const isThrereOffsetFromFocus = windowFocusOffset && windowFocusOffset > 0;

    // Check from draft.js selectionState
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const focusKey = selectionState.getFocusKey();
    const focusedBlock = contentState.getBlockForKey(focusKey);
    const focusedBlockText = focusedBlock.getText();
    const isThereTextOnBlock = focusedBlockText.length > 0;

    // If threre is any text on block, hide sidebar
    if (isThereTextOnBlock || isThrereOffsetFromFocus) {
      setScale(0);
    }
    const anchorNode = windowSelection?.anchorNode;

    // If  threre are no text and just 'span' ELEMENT_NODE exists -> set the span element top, left position and show sidebar
    if (anchorNode && anchorNode.ELEMENT_NODE && anchorNode.attributes) {
      const dataOffsetKey = anchorNode.attributes['data-offset-key']?.value;
      // Find the most parent node with same data-offset-key
      const blockNode = document.querySelector(
        `[data-offset-key="${dataOffsetKey}"]`
      );
      if (blockNode) {
        const blockNodeRect = blockNode.getBoundingClientRect();
        const { x, top } = blockNodeRect;
        setTop(top);
        setLeft(x);
        setScale(1);
      }
    }
  }, [editorState]);

  return { top, left, scale };
};