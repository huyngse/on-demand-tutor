import { extensions } from './extensions';
import { EditorProvider } from '@tiptap/react';

const defaultContent = ``;

export default function TiptapView({ content = defaultContent }: { content?: string }) {
    return (
        <div className="tiptap overflow-auto ">
            <EditorProvider slotBefore={null} extensions={extensions} content={content} editable={false} >
                {null}
            </EditorProvider>
        </div>
    );
}
