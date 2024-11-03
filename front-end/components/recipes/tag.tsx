type Props = {
    text: string;
};

const Tag: React.FC<Props> = ({ text }: Props) => {
    return (
        <span className="bg-white text-teal border border-teal px-3 py-1 rounded-full shadow">
            {text}
        </span>
    );
};

export default Tag;