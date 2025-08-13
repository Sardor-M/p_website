import { NotionBlockType } from '@/types/notions';
import { List, NotionBlock, OrderedList } from '@/components/NotionBlock';
import RichText from '@/components/RichText';

type NotionRendererProps = {
    content: NotionBlockType[] | null | undefined;
};

export default function NotionRenderer({ content }: NotionRendererProps) {
    if (!content) return null;

    const renderedContent = content.map((block) => <NotionBlock key={block.id} block={block} />);

    for (let i = 0; i < content.length; i++) {
        const block = content[i];
        const type = block.type;

        if (type === 'bulleted_list_item' || type === 'numbered_list_item') {
            const listItems = [];
            const listType = type;

            while (i < content.length && content[i].type === listType) {
                listItems.push(content[i]);
                i++;
            }
            i--;

            const ListContainer = listType === 'numbered_list_item' ? OrderedList : List;

            renderedContent.push(
                <ListContainer key={block.id}>
                    {listItems.map((item) => (
                        <li key={item.id}>
                            <RichText richTextArray={(item as any)[listType]?.rich_text} />
                        </li>
                    ))}
                </ListContainer>
            );
        } else {
            renderedContent.push(<NotionBlock key={block.id} block={block} />);
        }
    }

    return <>{renderedContent}</>;
}
