import "./Avatar.css";

interface AvatarProps {
  name?: string;
  imageUrl?: string;
  size?: "sm" | "md" | "lg";
}

const getInitials = (name = "User") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

const Avatar = ({ name = "User", imageUrl, size = "md" }: AvatarProps) => {
  return (
    <div className={`avatar avatar_${size}`} aria-label={name}>
      {imageUrl ? <img src={imageUrl} alt={name} /> : <span>{getInitials(name)}</span>}
    </div>
  );
};

export default Avatar;
