import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function  DropdownYears() {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = currentYear; year >= 1900; year--) {
    years.push(year);
  }

  return (

    <DropdownMenu>
      <DropdownMenuTrigger>Open</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
          {years.map((year, index) => (
            <DropdownMenuItem key={index}>{year}</DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
