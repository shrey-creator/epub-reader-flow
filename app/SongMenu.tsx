import { Menu as HeadlessMenu, MenuButton, MenuList, MenuItem } from '@headlessui/react';

function SongMenu({ song }) {
  return (
    // ...
    <MenuButton>
      <ThreeDotsIcon />
      <HeadlessMenu>
        <MenuList>
          <MenuItem>Add to Playlist</MenuItem>
          <MenuItem>Share</MenuItem>
          // ...
        </MenuList>
      </HeadlessMenu>
    </MenuButton>
  );
}
