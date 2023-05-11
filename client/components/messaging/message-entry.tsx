import ReactMarkdown from 'react-markdown';
import emojione from 'emojione';
import type { ChannelMessageWithOwnerAndChannel } from "lunarchat-shared/src/lunarchat";

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
        <div key={message.id} className="grid grid-cols-[6rem,1fr] mt-2 text-gray-50 message-entry">
            <div className="bg-gray-900 px-4 py-2 flex items-center">
                <img src={`/api/user/${message.ownerId}/icon`} alt="User" />
            </div>
            <div className="bg-gray-800 px-4 pt-1 pb-2">
                <div className={`flex gap-2 items-center ${messageIsOnlyEmoji ? `mb-0` : `mb-2`}`}>
                    <span className="font-bold">
                        {message.owner?.name ?? message.ownerId}
                    </span>
                    <time dateTime={timestamp.toISOString()} className="text-xs text-gray-400">
                        {timestamp.toLocaleString([], { dateStyle: "full", timeStyle: "medium" })}
                    </time>
                </div>
                
                <ReactMarkdown className={`${messageIsOnlyEmoji ? `text-4xl` : ``}`}>{markdownMessage}</ReactMarkdown>
            </div>
        </div>
    );
}