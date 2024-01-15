import { MultiChatSocket, MultiChatWindow, useMultiChatLogic } from 'react-chat-engine-advanced'

const ChatsPage = (props) => {
    const chatProps = useMultiChatLogic(
        '2102e4f2-fa97-4c99-9834-d79680c75be6',
        props.user.username,
        props.user.secret

    );
    return (
        <div style={{ height: '100vh ' }}>
            <MultiChatSocket {...chatProps} />
            <MultiChatWindow {...chatProps} style={{ height: '100%' }} />
        </div>
    )
}
export default ChatsPage