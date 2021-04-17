import { EditorState } from 'draft-js';

import blockRenderMap from './blockRenderMap';
import keyBindingFn from './keyBindingFn';
import createHandleKeyCommand from './handleKeyCommand';
import createBlockRendererFn from './blockRendererFn';
import createHandlePastedFiles from './handlePastedFiles';
import decorators from './decorators';

type Props = {
  editorState: EditorState;
  setEditorState: (ar0: EditorState) => void;
  setIsEditorReadOnly: (arg0: boolean) => void;
  isEditorReadOnly: { value: boolean };
};

export const createCustomPlugin = ({
  editorState,
  setEditorState,
  setIsEditorReadOnly,
  isEditorReadOnly,
}: Props) => {
  const handleKeyCommand = createHandleKeyCommand(setEditorState);
  const blockRendererFn = createBlockRendererFn({
    setIsEditorReadOnly,
    editorState,
    setEditorState,
    isEditorReadOnly,
  });
  const handlePastedFiles = createHandlePastedFiles({
    editorState,
    setEditorState,
  });

  return {
    blockRenderMap,
    handleKeyCommand,
    keyBindingFn,
    blockRendererFn,
    handlePastedFiles,
  };
};

export default createCustomPlugin;
