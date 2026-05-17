interface IconProps {
  name: string;
  size?: number;
  width?: number;
  height?: number;
  className?: string;
}

export default function Icon({ name, size, width, height, className }: IconProps) {
  return (
    <svg
      width={width ?? size}
      height={height ?? size}
      className={className}
      aria-hidden='true'
      focusable='false'
    >
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
}
