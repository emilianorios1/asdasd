import React, { ReactNode } from 'react';

interface ListItemProps {
  title: string;
  href: string;
  children: ReactNode;
}

export const ListItem: React.FC<ListItemProps> = ({ title, href, children }) => {
  return (
    <li>
      <a href={href}>{title}</a>
      <p>{children}</p>
    </li>
  );
};

export default ListItem;