import { useTodolistStore } from '@/stores/todolistStore';
import { SpeedDial } from '@rneui/themed';
import { useState } from 'react';

const ICON_COLOR = '#555555';
const DIAL_BG_COLOR = '#ffffff';

interface Props {
  toggleAddDialog: () => void;
  navigateToSettings: () => void;
}

export const FloatingActionButton = ({
  toggleAddDialog,
  navigateToSettings,
}: Props) => {
  const { deleteAllTasks, deleteCheckedTasks } = useTodolistStore();

  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <SpeedDial
      isOpen={open}
      icon={{ name: 'edit', color: ICON_COLOR }}
      openIcon={{ name: 'close', color: ICON_COLOR }}
      onOpen={() => setOpen(!open)}
      onClose={() => setOpen(!open)}
      overlayColor="rgba(0, 0, 0, 0.4)"
      color={DIAL_BG_COLOR}
    >
      <SpeedDial.Action
        icon={{ name: 'settings', color: ICON_COLOR }}
        title="Settings"
        onPress={() => {
          navigateToSettings();
          toggleOpen();
        }}
        color={DIAL_BG_COLOR}
      />
      <SpeedDial.Action
        icon={{ name: 'delete', color: ICON_COLOR }}
        title="Clear all tasks"
        onPress={() => {
          deleteAllTasks();
          toggleOpen();
        }}
        color={DIAL_BG_COLOR}
      />
      <SpeedDial.Action
        icon={{ name: 'check', color: ICON_COLOR }}
        title="Clear checked tasks"
        onPress={() => {
          deleteCheckedTasks();
          toggleOpen();
        }}
        color={DIAL_BG_COLOR}
      />
      <SpeedDial.Action
        icon={{ name: 'add', color: ICON_COLOR }}
        title="Add new task"
        onPress={() => {
          toggleAddDialog();
          toggleOpen();
        }}
        color={DIAL_BG_COLOR}
      />
    </SpeedDial>
  );
};
