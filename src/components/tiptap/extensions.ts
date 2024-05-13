import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle, { TextStyleOptions } from '@tiptap/extension-text-style';
import StarterKit from '@tiptap/starter-kit';
import Youtube from '@tiptap/extension-youtube';
import Typography from '@tiptap/extension-typography';

export const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] } as Partial<TextStyleOptions> | undefined),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, 
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, 
    },
  }),
  Youtube.configure({
    inline: false,
    HTMLAttributes: {
      class: 'w-full aspect-video',
    },
  }),
  Typography,
];
