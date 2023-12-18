import { useEffect, useState } from "react";
import ExampleTheme from "../themes/ExampleTheme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
// import TreeViewPlugin from "../plugins/TreeViewPlugin";
import ToolbarPlugin from "../plugins/ToolbarPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import ListMaxIndentLevelPlugin from "../plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "../plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "../plugins/AutoLinkPlugin";
import { EditorState } from "lexical";
import { $generateHtmlFromNodes } from '@lexical/html';


function Placeholder() {
  return <div className="editor-placeholder">Tell us your Story...</div>;
}





export default function Editor({
  onPublish,
}: {
  onPublish: (html: string) => void;
}): JSX.Element  {
  const [html, setHtml] = useState('');
  const editorConfig = {
    namespace: "My-editor",
    theme: ExampleTheme,
    onError(error: Error) {
      throw error;
    },
  
  
    // Any custom nodes go here
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
    ],

  }
  function MYOnChangePlugin(props: {onChange: (editorState: EditorState) => void}):null {
    const [editor] = useLexicalComposerContext();
    const {onChange} = props;  
    useEffect(() => {
      return editor.registerUpdateListener(({ editorState }) => {
        onChange(editorState);
         editorState.read(()=>{
          const htmlString = $generateHtmlFromNodes(editor, null);
          setHtml(htmlString);
         })
  
       
      });
    }, [editor, onChange, setHtml]);
    return null;
  }
 

 

  return (
    <>
    <LexicalComposer initialConfig={editorConfig}>
      <div className=" px-1 min-[716px]:px-12 h-full w-full">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          {/* <TreeViewPlugin /> */}
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
      <MYOnChangePlugin
        onChange={(editorState) => editorState}
        
        />
    </LexicalComposer>
    <br/>
    <div className="my-3 ml-1 min-[716px]:ml-[48px]  w-fit inline  justify-center items-center gap-3">
        <button
          type="button"
          className="h-8 w-20 border rounded-lg border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white"
          onClick={() => onPublish(html)}
        >
          Save
        </button>
      </div>

  
    </>
  );
}
