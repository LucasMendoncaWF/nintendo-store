import './gameTag.scss';

interface Props {
  tagName: string;
}

export default function GameTag({ tagName }: Props) {
  return (
    <div title={tagName} className="game-tag">
      {tagName}
    </div>
  );
}
