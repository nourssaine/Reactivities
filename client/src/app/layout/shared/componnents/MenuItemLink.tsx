import { MenuItem } from "@mui/material";
import type { ReactNode } from "react";
import { NavLink } from "react-router";

type Props = {
  children: ReactNode;
  to: string;
  onClick?: () => void;
};

export default function MenuItemLink({ children, to, onClick }: Props) {
  return (
    <MenuItem
      component={NavLink}
      to={to}
      onClick={onClick}
      sx={{
        fontSize: '1rem',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: 'inherit',
        '&.active': { color: 'yellow' }
      }}
    >
      {children}
    </MenuItem>
  );
}