import Image from "next/image";
import type { ReactNode } from "react";

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

export function AvatarStack({
  count = 3,
  className = "",
}: {
  count?: 3 | 4;
  className?: string;
}) {
  return (
    <div className={`avatar-stack ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <Image
          key={index}
          src={`/images/learner-${index + 1}.jpg`}
          alt=""
          width={40}
          height={40}
          className="avatar"
        />
      ))}
    </div>
  );
}

export function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      →
    </span>
  );
}

export function ResponsiveCopy({
  english,
  portuguese,
}: {
  english: string;
  portuguese: string;
}) {
  return (
    <>
      <span className="hidden md:inline">{english}</span>
      <span lang="pt-BR" className="md:hidden">
        {portuguese}
      </span>
    </>
  );
}
