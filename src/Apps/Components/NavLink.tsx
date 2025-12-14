import type { Ref } from 'react';


interface NavLinkProps {
  name: string;
  sectionRef: Ref<HTMLDivElement>;
  onClick: (ref: Ref<HTMLDivElement>, name: string) => void;
}

const NavLink = ({ name, sectionRef, onClick }: NavLinkProps) => {
  return (
    <button
      onClick={() => onClick(sectionRef, name.toLowerCase())}
      className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
    >
      {name}
    </button>
  );
};
export default NavLink;