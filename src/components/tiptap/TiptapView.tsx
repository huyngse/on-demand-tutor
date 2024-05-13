import { extensions } from './extensions';
import { EditorProvider } from '@tiptap/react';

const defaultContent = `
<h2>This is a example</h2>
`;

export default function TiptapView({ content = defaultContent }: { content?: string }) {
    return (
        <div className="tiptap overflow-auto ">
            <EditorProvider slotBefore={null} extensions={extensions} content={content} editable={false} >
                {null}
            </EditorProvider>
        </div>
    );
}
