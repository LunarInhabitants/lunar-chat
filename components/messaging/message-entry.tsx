import ReactMarkdown from 'react-markdown';
import emojione from 'emojione';
import { ChannelMessageWithOwnerAndChannel } from '@/src/messages';
import remarkGfm from 'remark-gfm';

interface Props {
    message: ChannelMessageWithOwnerAndChannel;
}

export const MessageEntry = ({ message }: Props) => {
    const timestamp = new Date(message.createdAt);
    let markdownMessage = message.message
        .replace(/\n/gi, "\n\n"); // Markdown normally needs an extra newline to separate into different paragraphs, but to make message entry 
    // easier, we allow single lines to count.

    markdownMessage = emojione.shortnameToUnicode(markdownMessage);

    const messageIsOnlyEmoji = markdownMessage.replace(/[\p{Extended_Pictographic}\s\n]/ug, "").length === 0

    return (
        <div key={message.id} className="grid grid-cols-[3rem,1fr] md:grid-cols-[6rem,1fr] mt-2 text-gray-50 message-entry">
            <div className="flex items-center px-2 py-1 bg-gray-900 md:px-4 md:py-2">
                <img src={`/api/user/${message.ownerId}/icon`} alt="User" />
            </div>
            <div className="px-4 pt-1 pb-2 bg-gray-800">
                <div className={`flex flex-col md:flex-row md:gap-2 md:items-center ${messageIsOnlyEmoji ? `mb-0` : `mb-2`}`}>
                    <span className="font-bold">
                        {message.owner?.name ?? message.ownerId}
                    </span>
                    <time dateTime={timestamp.toISOString()} className="text-xs text-gray-400">
                        <span className="hidden md:inline-block">{timestamp.toLocaleString([], { dateStyle: "full", timeStyle: "medium" })}</span>
                        <span  className="md:hidden">{timestamp.toLocaleString([], { dateStyle: "short", timeStyle: "short" })}</span>
                    </time>
                </div>

                <ReactMarkdown className={`${messageIsOnlyEmoji ? `text-4xl` : ``}`}
                    linkTarget="_blank"
                    remarkPlugins={[remarkGfm]}
                    disallowedElements={["h1", "h2", "h3", "h4", "h5", "h6"]}
                    components={{
                        'img': ({ src, alt }) => <a href={src} target="_blank">{alt ?? src}</a>
                    }}
                >
                    {markdownMessage}
                </ReactMarkdown>
            </div>
        </div>
    );
}