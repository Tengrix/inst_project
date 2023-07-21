type TextPropsType = {
    text: string;
    size?: string;
    weight?: string;
    color?: string;
};

export const Text = (props: TextPropsType) => {
    const { text, size, weight, color = 'white' } = props;
    return <p style={{ fontSize: `${size}px`, fontWeight: weight, color: color }}>{text}</p>;
};
