interface CVAvatarProps {
  avatar?: string;
  className?: string;
}

export default function CVAvatar({ avatar, className = "" }: CVAvatarProps) {
  if (!avatar) return null;

  return (
    <div className={`cv-avatar ${className}`}>
      <img src={avatar} alt="Profile" />
    </div>
  );
}
